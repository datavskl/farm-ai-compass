import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { useTranslation } from "react-i18next";

export function OfflineBanner() {
  const { t } = useTranslation();
  const [online, setOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  if (online) return null;
  return (
    <div className="bg-warning/15 text-warning-foreground border-b border-warning/30">
      <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center gap-2 text-xs font-medium">
        <WifiOff className="h-3.5 w-3.5" /> {t("common.offline")}
      </div>
    </div>
  );
}
