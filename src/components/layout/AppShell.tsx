import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home, Sprout, Bot, TrendingUp, User, LayoutDashboard, MapPin, CloudSun,
  Leaf, CalendarDays, ScanLine, Wallet, Package, Landmark, Users, Cpu, Bell,
  Settings as SettingsIcon, Menu, ChevronDown,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import iconUrl from "/app-icon.png";
import { OfflineBanner } from "./OfflineBanner";
import { UpdateToast } from "./UpdateToast";
import { InstallPrompt } from "./InstallPrompt";

const bottomTabs = [
  { to: "/app",         icon: Home,       key: "home" },
  { to: "/app/farms",   icon: Sprout,     key: "myFarm" },
  { to: "/app/ai",      icon: Bot,        key: "ai" },
  { to: "/app/market",  icon: TrendingUp, key: "market" },
  { to: "/app/profile", icon: User,       key: "profile" },
] as const;

const sidebarSections = [
  {
    label: "main",
    items: [
      { to: "/app",              icon: LayoutDashboard, key: "dashboard" },
      { to: "/app/farms",        icon: MapPin,          key: "farms" },
      { to: "/app/weather",      icon: CloudSun,        key: "weather" },
      { to: "/app/soil",         icon: Leaf,            key: "soil" },
      { to: "/app/crop-planner", icon: CalendarDays,    key: "cropPlanner" },
      { to: "/app/disease",      icon: ScanLine,        key: "disease" },
      { to: "/app/market",       icon: TrendingUp,      key: "prices" },
    ],
  },
  {
    label: "ops",
    items: [
      { to: "/app/tasks",       icon: CalendarDays, key: "tasks" },
      { to: "/app/accounting",  icon: Wallet,       key: "accounting" },
      { to: "/app/inventory",   icon: Package,      key: "inventory" },
    ],
  },
  {
    label: "more",
    items: [
      { to: "/app/schemes",       icon: Landmark,    key: "schemes" },
      { to: "/app/community",     icon: Users,       key: "community" },
      { to: "/app/sensors",       icon: Cpu,         key: "sensors" },
      { to: "/app/notifications", icon: Bell,        key: "notifications" },
      { to: "/app/settings",      icon: SettingsIcon, key: "settings" },
    ],
  },
] as const;

function Brand() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2.5">
      <img src={iconUrl} alt="" width={36} height={36}
        className="h-9 w-9 rounded-xl shadow-soft" />
      <div className="leading-tight">
        <div className="text-[15px] font-bold tracking-tight">{t("app.name")}</div>
        <div className="text-[11px] text-muted-foreground">{t("app.tagline")}</div>
      </div>
    </div>
  );
}

function FarmSelector() {
  const { farms, activeFarmId, setActiveFarm } = useApp();
  const active = farms.find((f) => f.id === activeFarmId) ?? farms[0];
  if (!active) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 rounded-full text-sm h-9">
          <Sprout className="h-4 w-4 text-primary" />
          <span className="max-w-[9rem] truncate font-medium">{active.name}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[12rem]">
        <DropdownMenuLabel>Your farms</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {farms.map((f) => (
          <DropdownMenuItem key={f.id} onSelect={() => setActiveFarm(f.id)}
            className={f.id === active.id ? "font-semibold text-primary" : ""}>
            <Sprout className="mr-2 h-4 w-4" />
            <span className="truncate">{f.name}</span>
            <span className="ml-auto text-xs text-muted-foreground">{f.size} {f.unit}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation();
  return (
    <nav className="flex-1 overflow-y-auto p-3 space-y-4">
      {sidebarSections.map((section) => (
        <div key={section.label}>
          <div className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {section.label === "main" ? "Main" : section.label === "ops" ? "Operations" : "More"}
          </div>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === "/app"} onClick={onNavigate}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-soft text-primary"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground",
                  )}>
                  <item.icon className="h-4 w-4" />
                  <span>{t(`nav.${item.key}`)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function AppShell() {
  const { t } = useTranslation();
  const { isDemo } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = bottomTabs.find((tab) =>
    tab.to === "/app"
      ? location.pathname === "/app" || location.pathname === "/app/"
      : location.pathname.startsWith(tab.to));

  return (
    <div className="min-h-dscreen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border/60 bg-card">
        <div className="p-4 border-b border-border/60"><Brand /></div>
        <SidebarNav />
        <div className="p-3 border-t border-border/60 flex items-center justify-between">
          <LanguageSwitcher />
          {isDemo && <span className="chip bg-accent/20 text-accent-foreground">{t("common.demo")}</span>}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border/60 safe-top">
          <div className="flex items-center gap-2 px-3 sm:px-4 h-14">
            {/* Mobile menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu" className="rounded-full">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 flex flex-col">
                  <SheetHeader className="p-4 border-b border-border/60 text-left">
                    <SheetTitle className="p-0"><Brand /></SheetTitle>
                  </SheetHeader>
                  <SidebarNav onNavigate={() => (document.activeElement as HTMLElement)?.blur()} />
                </SheetContent>
              </Sheet>
            </div>

            <div className="lg:hidden flex-shrink-0">
              <button onClick={() => navigate("/app")} className="flex items-center gap-2">
                <img src={iconUrl} alt="" width={28} height={28} className="h-7 w-7 rounded-lg" />
                <span className="font-bold text-sm">{t("app.name")}</span>
              </button>
            </div>

            <div className="hidden lg:block"><FarmSelector /></div>

            <div className="flex-1" />

            <div className="lg:hidden"><FarmSelector /></div>
            <LanguageSwitcher compact />
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate("/app/notifications")} aria-label={t("nav.notifications")}>
              <Bell className="h-5 w-5" />
            </Button>
          </div>
          <OfflineBanner />
        </header>

        {/* Content */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-6">
          <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 lg:px-6 py-4">
            <Outlet />
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-card/95 backdrop-blur border-t border-border/60 safe-bottom">
          <ul className="grid grid-cols-5">
            {bottomTabs.map((tab) => {
              const active = activeTab?.to === tab.to;
              return (
                <li key={tab.to}>
                  <NavLink to={tab.to} end={tab.to === "/app"}
                    className="flex flex-col items-center justify-center gap-0.5 h-16 relative"
                    aria-label={t(`nav.${tab.key}`)}>
                    <span className={cn(
                      "flex h-9 w-14 items-center justify-center rounded-full transition-colors",
                      active ? "bg-primary-soft text-primary" : "text-muted-foreground",
                    )}>
                      <tab.icon className="h-5 w-5" />
                    </span>
                    <span className={cn("text-[10px] font-medium", active ? "text-primary" : "text-muted-foreground")}>
                      {t(`nav.${tab.key}`)}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <UpdateToast />
      <InstallPrompt />
    </div>
  );
}
