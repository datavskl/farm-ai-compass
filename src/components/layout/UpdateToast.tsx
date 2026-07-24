import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function UpdateToast() {
  const { t } = useTranslation();
  useEffect(() => {
    const onUpdate = () => {
      toast(t("common.updateAvailable"), {
        action: { label: t("common.reload"), onClick: () => location.reload() },
        duration: 10000,
      });
    };
    window.addEventListener("farmwise:sw-update", onUpdate);
    return () => window.removeEventListener("farmwise:sw-update", onUpdate);
  }, [t]);
  return null;
}
