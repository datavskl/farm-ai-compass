import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import {
  CloudSun, Droplets, Wind, Thermometer, AlertTriangle, ScanLine, Leaf, Bot,
  TrendingUp, Wallet, CalendarDays, Sprout, ArrowRight, Landmark, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const quickActions = [
  { key: "scanDisease", icon: ScanLine, to: "/app/disease",    color: "bg-rose-100 text-rose-600" },
  { key: "addSoil",     icon: Leaf,     to: "/app/soil",       color: "bg-emerald-100 text-emerald-600" },
  { key: "askAi",       icon: Bot,      to: "/app/ai",         color: "bg-violet-100 text-violet-600" },
  { key: "checkPrices", icon: TrendingUp, to: "/app/market",   color: "bg-amber-100 text-amber-600" },
  { key: "addExpense",  icon: Wallet,   to: "/app/accounting", color: "bg-blue-100 text-blue-600" },
  { key: "addTask",     icon: CalendarDays, to: "/app/tasks",  color: "bg-teal-100 text-teal-600" },
];

const alerts = [
  { level: "high",   title: "Heavy rain in 48 hours", body: "22mm expected Thu evening — postpone spraying." },
  { level: "medium", title: "Pest risk: leaf folder", body: "Elevated risk in rice fields this week." },
  { level: "low",    title: "Wheat prices ↑ 4%",     body: "Guntur mandi average up over 7 days." },
];

const crops = [
  { name: "Rice",   stage: "Flowering",      sowing: "12 Jun", harvest: "18 Oct", health: 86 },
  { name: "Cotton", stage: "Boll formation", sowing: "3 Jul",  harvest: "22 Nov", health: 74 },
];

const tasks = [
  { title: "Irrigate Home Field", time: "6:00 AM", done: false, tag: "Irrigation" },
  { title: "Apply urea — Rice",   time: "9:30 AM", done: false, tag: "Fertilizer" },
  { title: "Check market prices", time: "5:00 PM", done: true,  tag: "Market" },
];

const schemes = [
  { title: "PM-KISAN",           note: "₹6,000/yr income support", eligible: true },
  { title: "PMFBY Crop Insurance", note: "Kharif enrollment open", eligible: true },
];

const aiRecs = [
  { title: "Skip evening irrigation", body: "Rain likely tonight — save water and avoid runoff." },
  { title: "Top-dress N at panicle",  body: "Rice at flowering — 25 kg/acre urea recommended." },
];

function AlertBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    high: "bg-destructive/15 text-destructive border-destructive/20",
    medium: "bg-warning/15 text-warning-foreground border-warning/30",
    low: "bg-info/15 text-info border-info/20",
  };
  return <span className={`chip border ${map[level]}`}>{level}</span>;
}

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, farms, activeFarmId } = useApp();
  const farm = farms.find((f) => f.id === activeFarmId) ?? farms[0];

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div>
        <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}</div>
        <h1 className="text-2xl font-bold mt-0.5">{t("home.greeting", { name: user?.name ?? "Farmer" })}</h1>
        {farm && (
          <div className="text-sm text-muted-foreground mt-0.5">
            {farm.name} · {farm.size} {farm.unit} {farm.location && `· ${farm.location}`}
          </div>
        )}
      </div>

      {/* Weather hero */}
      <div className="rounded-3xl overflow-hidden shadow-elevated bg-gradient-sky text-white p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs opacity-90">{t("home.todaysWeather")}</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-bold">28°</span>
              <span className="text-sm opacity-90">Partly cloudy</span>
            </div>
            <div className="text-xs opacity-90 mt-1">Perfect window for field work · light breeze</div>
          </div>
          <CloudSun className="h-16 w-16 opacity-90" />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
          {[
            { icon: Thermometer, label: "Feels", val: "30°" },
            { icon: Droplets,    label: "Humidity", val: "65%" },
            { icon: Wind,        label: "Wind", val: "12 km/h" },
            { icon: CloudSun,    label: "Rain", val: "15%" },
          ].map((s) => (
            <div key={s.label} className="bg-white/15 rounded-xl p-2.5 backdrop-blur-sm">
              <s.icon className="h-4 w-4 mb-1" />
              <div className="opacity-80 text-[10px]">{s.label}</div>
              <div className="font-semibold">{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts carousel */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" /> {t("home.criticalAlerts")}
          </h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-3 px-3 snap-x">
          {alerts.map((a) => (
            <article key={a.title} className="min-w-[260px] snap-start card-elevated p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-sm">{a.title}</span>
                <AlertBadge level={a.level} />
              </div>
              <p className="text-xs text-muted-foreground">{a.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="text-base font-semibold mb-2">{t("home.quickActions")}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickActions.map((a) => (
            <button key={a.key} onClick={() => navigate(a.to)}
              className="card-flat p-3 flex flex-col items-center gap-2 hover:shadow-soft transition-shadow">
              <span className={`h-11 w-11 rounded-2xl flex items-center justify-center ${a.color}`}>
                <a.icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-medium text-center leading-tight">{t(`quick.${a.key}`)}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Crops + Tasks */}
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold">{t("home.yourCrops")}</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/app/farms")}>View all <ArrowRight className="h-3.5 w-3.5 ml-1" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {crops.map((c) => (
              <article key={c.name} className="card-elevated p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-primary-soft p-2"><Sprout className="h-4 w-4 text-primary" /></div>
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.stage}</div>
                    </div>
                  </div>
                  <Badge className={c.health >= 80 ? "bg-success" : "bg-warning text-warning-foreground"}>{c.health}%</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-muted-foreground">
                  <div>Sown: <span className="text-foreground font-medium">{c.sowing}</span></div>
                  <div>Harvest: <span className="text-foreground font-medium">{c.harvest}</span></div>
                </div>
                <Progress value={c.health} className="h-1.5 mt-3" />
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold">{t("home.todaysTasks")}</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/app/tasks")}>Open <ArrowRight className="h-3.5 w-3.5 ml-1" /></Button>
          </div>
          <div className="card-elevated divide-y">
            {tasks.map((task) => (
              <div key={task.title} className="p-3 flex items-center gap-3">
                <input type="checkbox" defaultChecked={task.done} className="h-4 w-4 accent-primary" />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.title}</div>
                  <div className="text-[11px] text-muted-foreground">{task.time} · {task.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Soil + Market + Yield */}
      <div className="grid gap-4 lg:grid-cols-3">
        <article className="card-elevated p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2"><Leaf className="h-4 w-4 text-primary" /> {t("home.soilSnapshot")}</h3>
            <Badge variant="secondary">72 / 100</Badge>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            {[["pH", "6.8", "Optimal", "text-success"],
              ["Nitrogen (N)", "Low", "Add urea", "text-warning"],
              ["Organic C", "0.62%", "Medium", "text-info"]].map(([k, v, note, cls]) => (
              <div key={k as string} className="flex justify-between">
                <span className="text-muted-foreground">{k}</span>
                <span><span className="font-semibold">{v}</span> <span className={cls as string}>· {note}</span></span>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => navigate("/app/soil")}>Open Soil Health</Button>
        </article>

        <article className="card-elevated p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> {t("home.marketSnapshot")}</h3>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            {[["Rice",   "₹ 2,340/qtl", "+2.1%"],
              ["Cotton", "₹ 7,850/qtl", "+4.4%"],
              ["Chilli", "₹ 18,200/qtl", "-1.2%"]].map(([k, v, chg]) => (
              <div key={k as string} className="flex justify-between">
                <span className="text-muted-foreground">{k}</span>
                <span><span className="font-semibold">{v}</span> <span className={(chg as string).startsWith("-") ? "text-destructive" : "text-success"}> {chg}</span></span>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => navigate("/app/market")}>Open Market</Button>
        </article>

        <article className="card-elevated p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> {t("home.yieldProfit")}</h3>
          </div>
          <div className="mt-3 space-y-1">
            <div className="text-2xl font-bold">₹ 1,42,500</div>
            <div className="text-xs text-muted-foreground">Projected net · this season</div>
            <div className="mt-2 flex gap-4 text-[11px] text-muted-foreground">
              <span>Yield: <b className="text-foreground">2,850 kg</b></span>
              <span>Cost: <b className="text-foreground">₹ 68,200</b></span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => navigate("/app/accounting")}>Open Accounting</Button>
        </article>
      </div>

      {/* Schemes + AI recs */}
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="card-elevated p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2"><Landmark className="h-4 w-4 text-primary" /> {t("home.schemes")}</h3>
          <ul className="mt-3 space-y-2">
            {schemes.map((s) => (
              <li key={s.title} className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.note}</div>
                </div>
                {s.eligible && <Badge className="bg-success">Eligible</Badge>}
              </li>
            ))}
          </ul>
        </article>

        <article className="card-elevated p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> {t("home.aiRecs")}</h3>
          <ul className="mt-3 space-y-3">
            {aiRecs.map((r) => (
              <li key={r.title} className="flex gap-3">
                <div className="rounded-xl bg-primary-soft h-9 w-9 shrink-0 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.body}</div>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => navigate("/app/ai")}>
            <Bot className="h-4 w-4 mr-1.5" /> Ask a question
          </Button>
        </article>
      </div>
    </div>
  );
}
