/**
 * GamifySDK (Trophy.so style embeddable client SDK)
 * Usage:
 *   <script src="http://localhost:4000/sdk/gamify.js" data-api-key="pk_live_duo_9821"></script>
 *   <script>
 *     const gamify = new Gamify();
 *     gamify.identify('usr_101', { plan: 'pro' });
 *     gamify.mount('#reward-container', 'zepto_scratch_01');
 *     // OR launch in popup modal:
 *     gamify.launchModal('paytm_spin_05');
 *   </script>
 */
(function (window, document) {
  'use strict';

  class Gamify {
    constructor(options = {}) {
      this.apiKey = options.apiKey || this._getScriptApiKey() || 'pk_live_duo_9821';
      this.endpoint = options.endpoint || this._getEndpoint();
      this.user = null;
      this._depsLoaded = false;
      this._injectStyles();
    }

    _getScriptApiKey() {
      const script = document.currentScript || document.querySelector('script[data-api-key]');
      return script ? script.getAttribute('data-api-key') : null;
    }

    _getEndpoint() {
      const script = document.currentScript || document.querySelector('script[src*="gamify.js"]');
      if (script && script.src) {
        return new URL(script.src).origin;
      }
      return 'http://localhost:4000';
    }

    _injectStyles() {
      if (document.getElementById('gamify-sdk-styles')) return;
      const style = document.createElement('style');
      style.id = 'gamify-sdk-styles';
      style.textContent = `
        .gamify-overlay {
          position: fixed; inset: 0;
          background: rgba(8, 10, 16, 0.85);
          backdrop-filter: blur(8px);
          z-index: 999999;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
        }
        .gamify-overlay.active { opacity: 1; pointer-events: auto; }
        .gamify-modal-wrap { position: relative; transform: scale(0.92); transition: transform 0.25s ease; }
        .gamify-overlay.active .gamify-modal-wrap { transform: scale(1); }
        .gamify-close-btn {
          position: absolute; top: -14px; right: -14px; z-index: 99;
          background: #1E293B; border: 2px solid #334155; color: #FFF;
          width: 34px; height: 34px; border-radius: 50%; cursor: pointer;
          font-size: 18px; display: flex; align-items: center; justify-content: center;
        }
      `;
      document.head.appendChild(style);
    }

    _loadScript(src) {
      return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    async _ensureDependencies() {
      if (this._depsLoaded && window.GamifyWidgets && window.GamifySoundEngine && window.GamifyStickers) return;
      const loaders = [];
      if (!window.GamifySoundEngine) loaders.push(this._loadScript(`${this.endpoint}/sdk/sound-engine.js`));
      if (!window.GamifyWidgets) loaders.push(this._loadScript(`${this.endpoint}/sdk/widgets.js`));
      if (!window.GamifyStickers) loaders.push(this._loadScript(`${this.endpoint}/sdk/stickers.js`));
      await Promise.all(loaders);
      this._depsLoaded = true;
    }

    async identify(userId, traits = {}) {
      this.user = { userId, ...traits };
      try {
        const res = await fetch(`${this.endpoint}/api/v1/users/identify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': this.apiKey },
          body: JSON.stringify({ userId, traits }),
        });
        return await res.json();
      } catch (err) {
        return { success: true, offline: true };
      }
    }

    async getWidgetConfig(widgetId) {
      const res = await fetch(`${this.endpoint}/api/v1/widgets/${widgetId}`, {
        headers: { 'x-api-key': this.apiKey }
      });
      return await res.json();
    }

    async recordEvent(eventName, metadata = {}) {
      try {
        const res = await fetch(`${this.endpoint}/api/v1/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': this.apiKey },
          body: JSON.stringify({
            userId: this.user ? this.user.userId : 'anonymous',
            event: eventName,
            metadata,
          }),
        });
        return await res.json();
      } catch (_) {
        return { success: false };
      }
    }

    async mount(selectorOrEl, widgetId, overrideConfig = {}) {
      await this._ensureDependencies();
      const target = typeof selectorOrEl === 'string' ? document.querySelector(selectorOrEl) : selectorOrEl;
      if (!target) throw new Error('[GamifySDK] Target element not found');
      const data = await this.getWidgetConfig(widgetId);
      if (!data || !data.widget) throw new Error('[GamifySDK] Widget not found: ' + widgetId);
      const widget = {
        ...data.widget,
        config: { ...data.widget.config, ...overrideConfig }
      };
      window.GamifyWidgets.render(target, widget, {
        baseUrl: this.endpoint,
        onEvent: (ev, meta) => this.recordEvent(ev, meta)
      });
      return widget;
    }

    async launchModal(widgetId, overrideConfig = {}) {
      const overlay = document.createElement('div');
      overlay.className = 'gamify-overlay';
      overlay.innerHTML = `
        <div class="gamify-modal-wrap">
          <button class="gamify-close-btn">&times;</button>
          <div class="gamify-mount-slot"></div>
        </div>
      `;
      document.body.appendChild(overlay);
      const slot = overlay.querySelector('.gamify-mount-slot');
      const close = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 250);
      };
      overlay.querySelector('.gamify-close-btn').onclick = close;
      overlay.onclick = (e) => { if (e.target === overlay) close(); };

      await this.mount(slot, widgetId, overrideConfig);
      requestAnimationFrame(() => overlay.classList.add('active'));
      return { close };
    }

    async unlockSticker(stickerId, opts = {}) {
      await this._ensureDependencies();
      if (!window.GamifyStickers) throw new Error('Sticker engine failed to load');
      const sound = opts.sound || new window.GamifySoundEngine(this.endpoint);
      return window.GamifyStickers.unlock(stickerId, {
        baseUrl: this.endpoint,
        sound,
        ...opts
      });
    }

    async openStickerAlbum(opts = {}) {
      await this._ensureDependencies();
      if (!window.GamifyStickers) throw new Error('Sticker engine failed to load');
      const sound = opts.sound || new window.GamifySoundEngine(this.endpoint);
      return window.GamifyStickers.openAlbum({
        baseUrl: this.endpoint,
        sound,
        ...opts
      });
    }

    async getStickers() {
      await this._ensureDependencies();
      return window.GamifyStickers ? window.GamifyStickers.getAll() : [];
    }

    async getUserStickers() {
      await this._ensureDependencies();
      return window.GamifyStickers ? window.GamifyStickers.getUserStickers() : {};
    }
  }

  window.Gamify = Gamify;
})(window, document);
