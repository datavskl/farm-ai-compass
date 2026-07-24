import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

type BeforeInstall = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const KEY = "farmwise.install.dismissed";

export function InstallPrompt() {
  const { t } = useTranslation();
  const [ev, setEv] = useState<BeforeInstall | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(KEY);
    const handler = (e: Event) => {
      e.preventDefault();
      setEv(e as BeforeInstall);
      if (!dismissed) setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
  }, []);

  if (!visible || !ev) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-4 inset-x-3 lg:inset-x-auto lg:right-4 z-40 max-w-sm">
      <div className="card-elevated p-4 flex items-start gap-3">
        <div className="rounded-xl bg-primary-soft p-2">
          <Download className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{t("common.install")}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{t("common.installHint")}</div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={async () => { await ev.prompt(); setVisible(false); }}>
              {t("common.install")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { localStorage.setItem(KEY, "1"); setVisible(false); }}>
              {t("actions.skip")}
            </Button>
          </div>
        </div>
        <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
