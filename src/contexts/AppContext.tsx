import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type TextSize = "sm" | "md" | "lg" | "xl";

export type DemoUser = {
  id: string;
  name: string;
  phone?: string;
  state?: string;
  district?: string;
  village?: string;
};

export type Farm = {
  id: string;
  name: string;
  size: number;
  unit: "acre" | "hectare";
  location?: string;
  soilType?: string;
  irrigation?: string;
  crops: string[];
};

type AppState = {
  ready: boolean;
  isDemo: boolean;
  user: DemoUser | null;
  farms: Farm[];
  activeFarmId: string | null;
  textSize: TextSize;
  hasOnboarded: boolean;
};

type AppApi = AppState & {
  setDemo: (on: boolean) => void;
  setUser: (u: DemoUser | null) => void;
  addFarm: (f: Omit<Farm, "id">) => Farm;
  setActiveFarm: (id: string) => void;
  setTextSize: (s: TextSize) => void;
  setOnboarded: (v: boolean) => void;
  signOut: () => void;
};

const KEY = "farmwise.state.v1";

const DEFAULT_STATE: AppState = {
  ready: false,
  isDemo: false,
  user: null,
  farms: [],
  activeFarmId: null,
  textSize: "md",
  hasOnboarded: false,
};

const DEMO_STATE: Partial<AppState> = {
  isDemo: true,
  user: { id: "demo", name: "Ramesh", state: "Andhra Pradesh", district: "Guntur", village: "Tenali" },
  farms: [
    {
      id: "farm-1",
      name: "Home Field",
      size: 4.5,
      unit: "acre",
      location: "Tenali, Guntur",
      soilType: "Black soil",
      irrigation: "Drip",
      crops: ["Rice", "Cotton"],
    },
    {
      id: "farm-2",
      name: "North Plot",
      size: 2.0,
      unit: "acre",
      location: "Tenali, Guntur",
      soilType: "Red loam",
      irrigation: "Rainfed",
      crops: ["Chilli"],
    },
  ],
  activeFarmId: "farm-1",
  hasOnboarded: true,
};

const AppCtx = createContext<AppApi | null>(null);

function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw), ready: true };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(s: AppState) {
  try {
    const { ready: _ready, ...persist } = s;
    localStorage.setItem(KEY, JSON.stringify(persist));
  } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => ({ ...loadState(), ready: true }));

  useEffect(() => {
    document.documentElement.dataset.textSize = state.textSize;
  }, [state.textSize]);

  useEffect(() => {
    if (state.ready) saveState(state);
  }, [state]);

  const api = useMemo<AppApi>(() => ({
    ...state,
    setDemo: (on) =>
      setState((s) => on
        ? { ...s, ...DEMO_STATE, ready: true } as AppState
        : { ...DEFAULT_STATE, ready: true, textSize: s.textSize }),
    setUser: (user) => setState((s) => ({ ...s, user })),
    addFarm: (f) => {
      const farm: Farm = { ...f, id: `farm-${Date.now()}` };
      setState((s) => ({
        ...s,
        farms: [...s.farms, farm],
        activeFarmId: s.activeFarmId ?? farm.id,
      }));
      return farm;
    },
    setActiveFarm: (id) => setState((s) => ({ ...s, activeFarmId: id })),
    setTextSize: (textSize) => setState((s) => ({ ...s, textSize })),
    setOnboarded: (v) => setState((s) => ({ ...s, hasOnboarded: v })),
    signOut: () => setState({ ...DEFAULT_STATE, ready: true, textSize: state.textSize }),
  }), [state]);

  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
