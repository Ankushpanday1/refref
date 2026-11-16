export interface GamifyWidget {
  id: string;
  type: string;
  name: string;
  appSource: string;
  status: 'active' | 'draft' | 'archived';
  config: Record<string, any>;
  stats: {
    impressions: number;
    claims: number;
    conversionRate: string;
  };
}

export function getDefaultGamifyWidgets(): GamifyWidget[] {
  return [
    {
      id: "zepto_scratch_01",
      type: "zepto_scratch",
      name: "Zepto Purple Scratch Card",
      appSource: "Zepto (Metallic Foil & Reveal Chime)",
      status: "active",
      config: {
        headerEyebrow: "Congratulations",
        headerTitle: "Get Your Reward Inside!",
        foilTopColor: "#DF7DFF",
        foilBottomColor: "#7E35C6",
        brandWatermark: "zepto",
        brandBadge: "uni•",
        rewardTitle: "Lifetime Free Rupay Card",
        rewardSubtitle: "5% back on Zepto + 1% back on UPI!",
        rewardFootnote: "No minimum spends",
        couponCode: "NO CODE NEEDED",
        ctaColor: "#F93262",
        ctaText: "Claim now",
        scratchThresholdPercent: 45,
        soundEnabled: true
      },
      stats: { impressions: 5420, claims: 4312, conversionRate: "79.6%" }
    },
    {
      id: "mynaksh_checkin_02",
      type: "mynaksh_checkin",
      name: "MyNaksh Daily Streak & Rewards Hub",
      appSource: "MyNaksh (1:1 Native App & Sunburst Modal)",
      status: "active",
      config: {
        initialView: "rewards_hub",
        title: "Keep Your Streak Alive!",
        subtitle: "Collect your daily rewards here",
        currencySymbol: "₹",
        walletBalance: 30,
        dayRewards: [5, 7, 9, 11, 13, 15, 17],
        activeDay: 1,
        referralBonus: 50,
        referralCode: "R8HKBD",
        mantraName: "Mars Mantra",
        mantraChant: "Om Am Angarakaya Namah",
        mantraReward: 1,
        highlightColor: "#22C55E",
        ctaColor: "#16A34A",
        ctaText: "Refer a friend",
        soundEnabled: true
      },
      stats: { impressions: 3290, claims: 2481, conversionRate: "75.4%" }
    },
    {
      id: "instaastro_points_03",
      type: "instaastro_points",
      name: "InstaAstro Points & 7-Day Stepper",
      appSource: "InstaAstro (Streak Stepper & +50 Toast)",
      status: "active",
      config: {
        initialView: "hub",
        startingPoints: 150,
        streakBonusPoints: 70,
        accentColor: "#FFC700",
        progressColor: "#22C55E",
        soundEnabled: true
      },
      stats: { impressions: 4180, claims: 3123, conversionRate: "74.7%" }
    },
    {
      id: "paytm_chest_04",
      type: "paytm_chest_scratch",
      name: "Paytm Card-to-Chest Coin Odometer",
      appSource: "Paytm Cashback (Flip Card & Rolling Odometer)",
      status: "active",
      config: {
        cardTheme: "maroon",
        startingCoins: 135,
        rewardCoins: 31,
        soundEnabled: true
      },
      stats: { impressions: 3890, claims: 2950, conversionRate: "75.8%" }
    },
    {
      id: "paytm_spin_05",
      type: "paytm_spin_win",
      name: "Paytm Spin & Win (Yellow Starburst)",
      appSource: "Paytm Spin & Win (4-Point Starburst Blast)",
      status: "active",
      config: {
        spinsLeft: 2,
        starburstColor: "#F59E0B",
        soundEnabled: true
      },
      stats: { impressions: 6200, claims: 5310, conversionRate: "85.6%" }
    },
    {
      id: "duolingo_flow_06",
      type: "duolingo_flow",
      name: "Duolingo 4-Stage Gamification Flow",
      appSource: "Duolingo (Lesson -> Streak -> Goal -> Rare Chest)",
      status: "active",
      config: {
        startStep: 1,
        themeColor: "#58CC02",
        xpEarned: 15,
        accuracy: 94,
        durationText: "1:42",
        streakCount: 7,
        lottieTier: "gold",
        soundEnabled: true
      },
      stats: { impressions: 8430, claims: 7120, conversionRate: "84.5%" }
    },
    {
      id: "cred_wheel_07",
      type: "cred_wheel",
      name: "CRED Spin the Wheel (Luxury Partner)",
      appSource: "CRED Rewards (ScreenRecording 11-16)",
      status: "active",
      config: {
        titleScript: "spin",
        titleSerif: "the wheel",
        partnerName: "BOMBAY SHAVING COMPANY",
        coins: 560052,
        cashback: 77,
        tickets: 4,
        spinCostCoins: 3000,
        segments: [
          { label: "2-in-1 trimmer at ₹899", color: "#D946EF", text: "#1E1B18", price: 899 },
          { label: "2-in-1 trimmer at ₹999", color: "#F97316", text: "#1E1B18", price: 999 },
          { label: "2-in-1 trimmer at ₹1,099", color: "#84CC16", text: "#1E1B18", price: 1099 },
          { label: "2-in-1 trimmer at ₹1,199", color: "#06B6D4", text: "#1E1B18", price: 1199 }
        ],
        couponCode: "CRED899",
        rewardImage: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80",
        soundEnabled: true
      },
      stats: { impressions: 5800, claims: 4920, conversionRate: "84.8%" }
    },
    {
      id: "cred_slot_09",
      type: "cred_slot_machine",
      name: "CRED 3D Arcade Slot Machine",
      appSource: "CRED Jackpot (ScreenRecording 11-16)",
      status: "active",
      config: {
        eyebrow: "win jackpot or get 30% off your next uber intercity ride",
        coins: 563052,
        cashback: 77,
        spinCost: 9000,
        spinsLeft: 9,
        maxSpins: 10,
        playersCount: "43,745",
        rewardTitle: "30% off your next uber intercity ride, up to ₹500",
        couponCode: "UBER30",
        soundEnabled: true
      },
      stats: { impressions: 7120, claims: 5890, conversionRate: "82.7%" }
    },
    {
      id: "gamify_leaderboard_08",
      type: "gamify_leaderboard",
      name: "Triple Podium Gamified Leaderboard",
      appSource: "Competitive Tier Leaderboard (Region / National / Global)",
      status: "active",
      config: {
        title: "Leaderboard",
        activeTab: "Region",
        tabs: ["Region", "National", "Global"],
        metricLabel: "PTS",
        topThree: [
          { rank: 1, name: "Eiden", username: "@username", score: 2430, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", color: "#F59E0B" },
          { rank: 2, name: "Jackson", username: "@username", score: 1847, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", color: "#38BDF8" },
          { rank: 3, name: "Emma Aria", username: "@username", score: 1674, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", color: "#22C55E" }
        ],
        listPlayers: [
          { rank: 4, name: "Sebastian", username: "@username", score: 1124, trend: "up", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" },
          { rank: 5, name: "Jason", username: "@username", score: 875, trend: "down", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
          { rank: 6, name: "Natalie", username: "@username", score: 774, trend: "up", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" },
          { rank: 7, name: "Serenity", username: "@username", score: 723, trend: "up", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" }
        ],
        soundEnabled: true
      },
      stats: { impressions: 6120, claims: 4890, conversionRate: "79.9%" }
    }
  ];
}

// In-memory cache for fast updates
let currentWidgets: GamifyWidget[] = getDefaultGamifyWidgets();

export function getGamifyWidgets(): GamifyWidget[] {
  return currentWidgets;
}

export function getGamifyWidgetById(id: string): GamifyWidget | undefined {
  return currentWidgets.find(w => w.id === id);
}

export function updateGamifyWidget(id: string, config: Record<string, any>): GamifyWidget | null {
  const idx = currentWidgets.findIndex(w => w.id === id);
  if (idx === -1) return null;
  currentWidgets[idx].config = { ...currentWidgets[idx].config, ...config };
  return currentWidgets[idx];
}

export function resetGamifyWidget(id: string): GamifyWidget | null {
  const defaults = getDefaultGamifyWidgets();
  const def = defaults.find(w => w.id === id);
  if (!def) return null;
  const idx = currentWidgets.findIndex(w => w.id === id);
  if (idx !== -1) {
    currentWidgets[idx] = JSON.parse(JSON.stringify(def));
    return currentWidgets[idx];
  }
  return null;
}
