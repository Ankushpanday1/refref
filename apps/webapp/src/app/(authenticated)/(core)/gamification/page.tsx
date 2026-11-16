"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import {
  IconDeviceGamepad2,
  IconTrophy,
  IconSparkles,
  IconDeviceMobile,
  IconCode,
  IconCheck,
  IconCopy,
  IconRotateLeft,
  IconCloudUpload,
  IconVolume,
  IconFlame,
  IconCoin,
  IconGift,
  IconCards,
  IconStars
} from "@tabler/icons-react";
import { toast } from "sonner";
import { getDefaultGamifyWidgets, GamifyWidget } from "@/lib/gamify-data";

export default function GamificationStudioPage() {
  const [widgets, setWidgets] = useState<GamifyWidget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<GamifyWidget | null>(null);
  const [activeTab, setActiveTab] = useState<"design" | "embed" | "json">("design");
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const previewMountRef = useRef<HTMLDivElement>(null);
  const soundEngineRef = useRef<any>(null);

  // Fetch initial widgets
  useEffect(() => {
    fetch("/api/gamify/widgets")
      .then((res) => res.json())
      .then((data) => {
        if (data.widgets && data.widgets.length > 0) {
          setWidgets(data.widgets);
          setSelectedWidget(data.widgets[0]);
        } else {
          const defs = getDefaultGamifyWidgets();
          setWidgets(defs);
          setSelectedWidget(defs[0]);
        }
      })
      .catch(() => {
        const defs = getDefaultGamifyWidgets();
        setWidgets(defs);
        setSelectedWidget(defs[0]);
      });
  }, []);

  // Initialize sound engine when SDK loaded
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).GamifySoundEngine && !soundEngineRef.current) {
      soundEngineRef.current = new (window as any).GamifySoundEngine(window.location.origin);
    }
  }, [sdkLoaded]);

  // Re-render preview whenever selectedWidget or config changes
  useEffect(() => {
    if (!selectedWidget || !previewMountRef.current) return;
    if (typeof window === "undefined" || !(window as any).GamifyWidgets) return;

    try {
      (window as any).GamifyWidgets.render(previewMountRef.current, selectedWidget, {
        baseUrl: window.location.origin,
        sound: soundEngineRef.current,
        onEvent: (name: string, meta: any) => {
          console.log("[Gamify Telemetry]", name, meta);
        }
      });
    } catch (e) {
      console.error("Error rendering gamify widget:", e);
    }
  }, [selectedWidget, sdkLoaded, activeTab]);

  const updateConfigValue = (key: string, value: any) => {
    if (!selectedWidget) return;
    const updated = {
      ...selectedWidget,
      config: {
        ...selectedWidget.config,
        [key]: value
      }
    };
    setSelectedWidget(updated);
  };

  const handleSave = async () => {
    if (!selectedWidget) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/gamify/widgets/${selectedWidget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: selectedWidget.config })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${selectedWidget.name} configuration deployed!`);
        // update list
        setWidgets((prev) => prev.map((w) => (w.id === selectedWidget.id ? data.widget : w)));
      } else {
        toast.error("Failed to save changes");
      }
    } catch {
      toast.error("Network error while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!selectedWidget) return;
    try {
      const res = await fetch(`/api/gamify/widgets/${selectedWidget.id}/reset`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSelectedWidget(data.widget);
        setWidgets((prev) => prev.map((w) => (w.id === selectedWidget.id ? data.widget : w)));
        toast.info("Reset to recording default");
      }
    } catch {
      toast.error("Could not reset widget");
    }
  };

  const copyEmbedCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Snippet copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const widgetIcons: Record<string, any> = {
    zepto_scratch: IconCards,
    mynaksh_checkin: IconFlame,
    instaastro_points: IconStars,
    paytm_chest_scratch: IconGift,
    paytm_spin_win: IconStars,
    duolingo_flow: IconSparkles,
    cred_wheel: IconCoin,
    cred_slot_machine: IconDeviceGamepad2,
    gamify_leaderboard: IconTrophy
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-white">
      {/* Required External Scripts for Lottie, Confetti & Gamify SDK */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="/gamify/sound-engine.js"
        strategy="lazyOnload"
      />
      <Script
        src="/gamify/widgets.js"
        strategy="lazyOnload"
        onLoad={() => setSdkLoaded(true)}
      />

      {/* Header Bar */}
      <header className="border-b border-white/10 px-8 py-5 flex items-center justify-between bg-[#0B0F19]">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <IconDeviceGamepad2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight text-white">RefRef Gamification Studio</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              9 Live Mechanics
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Turn referral rewards into dopamine hits: Scratch cards, 7-day streaks, slot machines, spin wheels &amp; leaderboards
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-white/5 p-1 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab("design")}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                activeTab === "design" ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Live Customizer
            </button>
            <button
              onClick={() => setActiveTab("embed")}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                activeTab === "embed" ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Embed SDK
            </button>
            <button
              onClick={() => setActiveTab("json")}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                activeTab === "json" ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              API Schema
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/20"
          >
            <IconCloudUpload className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save & Deploy"}
          </button>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* Left Column: 9 Mechanics Navigation */}
        <aside className="col-span-3 border-r border-white/10 bg-[#0A0D16] p-4 flex flex-col gap-2 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
            Mechanics Catalog
          </div>

          {widgets.map((w) => {
            const isSelected = selectedWidget?.id === w.id;
            const Icon = widgetIcons[w.type] || IconGift;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedWidget(w)}
                className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${
                  isSelected
                    ? "bg-purple-600/10 border-purple-500/50 shadow-lg shadow-purple-900/10"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg shrink-0 ${
                    isSelected ? "bg-purple-600 text-white" : "bg-white/5 text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold truncate ${
                        isSelected ? "text-purple-300" : "text-slate-200"
                      }`}
                    >
                      {w.name}
                    </span>
                  </div>
                  <div className="text-[10.5px] text-slate-500 truncate mt-0.5">{w.appSource}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9.5px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {w.stats.conversionRate} Conv
                    </span>
                    <span className="text-[9.5px] text-slate-400">{w.stats.claims} Claims</span>
                  </div>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Middle Column: Interactive Sandbox Phone Simulator */}
        <main className="col-span-5 bg-[#05070B] p-6 flex flex-col items-center justify-center border-r border-white/10 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full flex items-center justify-between max-w-[360px] mb-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-bold text-slate-300">
              <IconDeviceMobile className="w-4 h-4 text-purple-400" /> Live Interactive Simulator
            </span>
            <button
              onClick={handleReset}
              className="hover:text-white flex items-center gap-1 transition"
              title="Reset config to initial extracted APK defaults"
            >
              <IconRotateLeft className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Phone Frame Mockup */}
          <div className="relative shadow-2xl shadow-black rounded-[42px] border-[5px] border-[#222838] bg-[#0E1322] overflow-hidden w-[360px] h-[720px] flex flex-col">
            {/* Dynamic island / speaker notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 pointer-events-none" />

            {/* Mount for GamifyWidgets */}
            <div ref={previewMountRef} className="w-full h-full flex flex-col overflow-hidden" />
          </div>
        </main>

        {/* Right Column: Dynamic Form Customizer OR Embed Snippets */}
        <section className="col-span-4 bg-[#0A0D16] p-6 overflow-y-auto">
          {selectedWidget && activeTab === "design" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-black text-white">Customize {selectedWidget.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time property updates with instant rendering in sandbox
                </p>
              </div>

              {/* Dynamic Property Inputs based on selected widget */}
              <div className="space-y-4">
                {Object.entries(selectedWidget.config).map(([key, val]) => {
                  if (typeof val === "boolean") {
                    return (
                      <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <label className="text-xs font-bold text-slate-300 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="checkbox"
                          checked={val}
                          onChange={(e) => updateConfigValue(key, e.target.checked)}
                          className="w-4 h-4 accent-purple-500 rounded"
                        />
                      </div>
                    );
                  }

                  if (typeof val === "number") {
                    return (
                      <div key={key} className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="number"
                          value={val}
                          onChange={(e) => updateConfigValue(key, Number(e.target.value))}
                          className="w-full bg-[#121624] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                        />
                      </div>
                    );
                  }

                  if (typeof val === "string" && /^#[0-9A-Fa-f]{6}$/.test(val)) {
                    return (
                      <div key={key} className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={val}
                            onChange={(e) => updateConfigValue(key, e.target.value)}
                            className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer p-0"
                          />
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => updateConfigValue(key, e.target.value)}
                            className="flex-1 bg-[#121624] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase"
                          />
                        </div>
                      </div>
                    );
                  }

                  if (typeof val === "string") {
                    return (
                      <div key={key} className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => updateConfigValue(key, e.target.value)}
                          className="w-full bg-[#121624] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          )}

          {selectedWidget && activeTab === "embed" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-black text-white">Embed {selectedWidget.name} Anywhere</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Drop this script into Next.js, React, Shopify, or static HTML in 2 lines
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-purple-300">1. Script Tag Installation</div>
                <div className="relative bg-[#05070B] border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-300">
                  <button
                    onClick={() => copyEmbedCode(`<script src="${typeof window !== 'undefined' ? window.location.origin : 'https://refref.ai'}/gamify/gamify.js" data-api-key="pk_live_refref_9821"></script>`)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                    title="Copy"
                  >
                    {copied ? <IconCheck className="w-3.5 h-3.5 text-emerald-400" /> : <IconCopy className="w-3.5 h-3.5" />}
                  </button>
                  <pre className="overflow-x-auto whitespace-pre-wrap">
{`<script src="${typeof window !== 'undefined' ? window.location.origin : 'https://refref.ai'}/gamify/gamify.js" data-api-key="pk_live_refref_9821"></script>`}
                  </pre>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-purple-300">2. Launch as Popup Modal</div>
                <div className="relative bg-[#05070B] border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-300">
                  <button
                    onClick={() => copyEmbedCode(`const gamify = new Gamify();\ngamify.launchModal('${selectedWidget.id}');`)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                    title="Copy"
                  >
                    <IconCopy className="w-3.5 h-3.5" />
                  </button>
                  <pre className="overflow-x-auto whitespace-pre-wrap">
{`const gamify = new Gamify();
gamify.launchModal('${selectedWidget.id}', ${JSON.stringify(selectedWidget.config, null, 2)});`}
                  </pre>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-purple-300">3. Mount Inline Slot</div>
                <div className="relative bg-[#05070B] border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-300">
                  <button
                    onClick={() => copyEmbedCode(`gamify.mount('#slot-container', '${selectedWidget.id}');`)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                    title="Copy"
                  >
                    <IconCopy className="w-3.5 h-3.5" />
                  </button>
                  <pre className="overflow-x-auto whitespace-pre-wrap">
{`// Inside your React component / HTML container
<div id="slot-container"></div>

<script>
  gamify.mount('#slot-container', '${selectedWidget.id}');
</script>`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {selectedWidget && activeTab === "json" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white">REST API Schema</h3>
                  <p className="text-xs text-slate-400">GET /api/gamify/widgets/{selectedWidget.id}</p>
                </div>
                <button
                  onClick={() => copyEmbedCode(JSON.stringify(selectedWidget, null, 2))}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-xs font-bold text-white transition"
                >
                  <IconCopy className="w-3.5 h-3.5" /> Copy JSON
                </button>
              </div>

              <div className="bg-[#05070B] border border-white/10 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[600px]">
                <pre>{JSON.stringify(selectedWidget, null, 2)}</pre>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
