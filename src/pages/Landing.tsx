import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useApp } from "@/contexts/AppContext";
import iconUrl from "/app-icon.png";
import {
  CloudSun, Leaf, ScanLine, TrendingUp, Wallet, CalendarDays,
  Sparkles, ShieldCheck, Wifi,
} from "lucide-react";

const features = [
  { icon: CloudSun,     titleKey: "nav.weather",     descKey: "featWeather" },
  { icon: Leaf,         titleKey: "nav.soil",        descKey: "featSoil" },
  { icon: ScanLine,     titleKey: "nav.disease",     descKey: "featDisease" },
  { icon: TrendingUp,   titleKey: "nav.prices",      descKey: "featPrices" },
  { icon: Wallet,       titleKey: "nav.accounting",  descKey: "featAcc" },
  { icon: CalendarDays, titleKey: "nav.tasks",       descKey: "featTasks" },
];

const descs: Record<string, string> = {
  featWeather: "15-day forecast, rain alerts and irrigation advice.",
  featSoil: "Read your Soil Health Card and get fertilizer plans.",
  featDisease: "Scan a leaf with your camera to detect diseases.",
  featPrices: "Live mandi prices and best-market recommendations.",
  featAcc: "Track income, expenses, loans and crop-wise profit.",
  featTasks: "Plan sowing, spraying, harvest with reminders.",
};

export default function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setDemo } = useApp();

  return (
    <div className="min-h-dscreen bg-gradient-to-b from-primary-soft/40 via-background to-background">
      <header className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={iconUrl} alt="" width={40} height={40} className="h-10 w-10 rounded-xl shadow-soft" />
          <div>
            <div className="text-lg font-bold">{t("app.name")}</div>
            <div className="text-[11px] text-muted-foreground -mt-0.5">{t("app.tagline")}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>{t("actions.signIn")}</Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-6 pb-12 grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div className="chip bg-primary-soft text-primary w-fit">
            <Sparkles className="h-3.5 w-3.5" /> AI for Indian farmers
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
            Grow smarter with{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">FarmWise AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Your pocket agronomist — weather, soil, disease diagnosis, market prices, tasks and
            accounting. In English, हिंदी and తెలుగు.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="lg" onClick={() => navigate("/login")} className="rounded-full h-12 px-6 shadow-glow">
              {t("actions.getStarted")}
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-6"
              onClick={() => { setDemo(true); navigate("/app"); }}>
              {t("actions.tryDemo")}
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Private & secure</div>
            <div className="flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5 text-primary" /> Works offline</div>
            <div className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-primary" /> Voice & multi-language</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
          <div className="relative card-elevated p-6 grid grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f.titleKey} className="rounded-2xl bg-primary-soft/60 p-4">
                <div className="rounded-xl bg-white w-10 h-10 flex items-center justify-center shadow-soft">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-3 font-semibold text-sm">{t(f.titleKey)}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{descs[f.descKey]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FarmWise AI · Built for Indian farmers
      </footer>
    </div>
  );
}
