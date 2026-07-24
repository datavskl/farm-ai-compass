import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { SUPPORTED_LANGS } from "@/i18n";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, MapPin, Sprout, CheckCircle2 } from "lucide-react";

const STATES = ["Andhra Pradesh","Telangana","Karnataka","Tamil Nadu","Maharashtra","Punjab","Haryana","Uttar Pradesh","Bihar","Gujarat","Madhya Pradesh","Rajasthan","West Bengal","Odisha","Kerala"];
const IRRIGATION = ["Rainfed","Canal","Borewell","Drip","Sprinkler","Flood"];
const SOIL = ["Not sure","Black soil","Red soil","Alluvial","Loam","Sandy","Clay"];
const CROPS = ["Rice","Wheat","Cotton","Sugarcane","Maize","Groundnut","Chilli","Tomato","Onion","Turmeric","Soybean","Pulses"];

const TOTAL = 4;

export default function Onboarding() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setUser, user, addFarm, setOnboarded } = useApp();

  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.name ?? "");
  const [lang, setLang] = useState(i18n.language);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [farmName, setFarmName] = useState("Home Field");
  const [size, setSize] = useState("2");
  const [unit, setUnit] = useState<"acre" | "hectare">("acre");
  const [irrigation, setIrrigation] = useState(IRRIGATION[0]);
  const [soil, setSoil] = useState(SOIL[0]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const toggleCrop = (c: string) =>
    setSelectedCrops((cs) => cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]);

  const canNext = () => {
    if (step === 1) return name.trim().length >= 2;
    if (step === 2) return state && village.trim().length > 0;
    if (step === 3) return farmName && Number(size) > 0;
    return selectedCrops.length > 0;
  };

  const finish = () => {
    setUser({ ...(user ?? { id: "u-" + Date.now() }), name, state, district, village });
    addFarm({ name: farmName, size: Number(size), unit, location: `${village}, ${district}`, soilType: soil, irrigation, crops: selectedCrops });
    setOnboarded(true);
    toast.success("All set! Welcome to FarmWise.");
    navigate("/app");
  };

  return (
    <div className="min-h-dscreen flex flex-col bg-gradient-to-b from-primary-soft/40 to-background">
      <header className="p-4 flex items-center justify-between">
        <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="p-2 rounded-full hover:bg-muted" aria-label="Back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="text-sm text-muted-foreground">{t("onboarding.step", { n: step, total: TOTAL })}</div>
        <LanguageSwitcher compact />
      </header>

      <div className="px-4"><Progress value={(step / TOTAL) * 100} className="h-1.5" /></div>

      <main className="flex-1 p-4 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-1">{t("onboarding.title")}</h1>
          <p className="text-sm text-muted-foreground mb-6">A few quick details so we can personalize everything.</p>

          <div className="card-elevated p-5 space-y-4">
            {step === 1 && (<>
              <div className="space-y-1.5">
                <Label>{t("onboarding.name")}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ramesh Kumar" />
              </div>
              <div className="space-y-1.5">
                <Label>{t("onboarding.language")}</Label>
                <Select value={lang} onValueChange={(v) => { setLang(v); i18n.changeLanguage(v); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_LANGS.map((l) => (
                      <SelectItem key={l.code} value={l.code}>{l.native} — {l.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>)}

            {step === 2 && (<>
              <div className="space-y-1.5">
                <Label>{t("onboarding.state")}</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>{STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>{t("onboarding.district")}</Label>
                  <Input value={district} onChange={(e) => setDistrict(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("onboarding.village")}</Label>
                  <Input value={village} onChange={(e) => setVillage(e.target.value)} />
                </div>
              </div>
              <Button type="button" variant="outline" className="w-full"
                onClick={() => {
                  if (!navigator.geolocation) { toast.error("GPS not available"); return; }
                  navigator.geolocation.getCurrentPosition(
                    () => toast.success("Location captured"),
                    () => toast.error("Could not access GPS"),
                  );
                }}>
                <MapPin className="h-4 w-4 mr-2" /> {t("onboarding.useGps")}
              </Button>
            </>)}

            {step === 3 && (<>
              <div className="space-y-1.5">
                <Label>{t("onboarding.farmName")}</Label>
                <Input value={farmName} onChange={(e) => setFarmName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>{t("onboarding.size")}</Label>
                  <Input type="number" min={0} step={0.1} value={size} onChange={(e) => setSize(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("onboarding.unit")}</Label>
                  <Select value={unit} onValueChange={(v: "acre" | "hectare") => setUnit(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acre">Acre</SelectItem>
                      <SelectItem value="hectare">Hectare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>{t("onboarding.irrigation")}</Label>
                <Select value={irrigation} onValueChange={setIrrigation}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{IRRIGATION.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>{t("onboarding.soil")}</Label>
                <Select value={soil} onValueChange={setSoil}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{SOIL.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </>)}

            {step === 4 && (<>
              <div className="space-y-2">
                <Label>{t("onboarding.currentCrops")}</Label>
                <div className="flex flex-wrap gap-2">
                  {CROPS.map((c) => {
                    const on = selectedCrops.includes(c);
                    return (
                      <button key={c} type="button" onClick={() => toggleCrop(c)}
                        className={
                          "px-3 py-1.5 rounded-full text-sm border transition-colors " +
                          (on ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted")
                        }>
                        {on && <CheckCircle2 className="inline h-3.5 w-3.5 mr-1" />}{c}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground pt-1">Pick at least one crop to continue.</p>
              </div>
            </>)}
          </div>

          <div className="mt-4 flex gap-2">
            {step > 1 && <Button variant="ghost" className="flex-1" onClick={() => setStep(step - 1)}>{t("actions.back")}</Button>}
            {step < TOTAL ? (
              <Button className="flex-1 h-12 rounded-xl" disabled={!canNext()} onClick={() => setStep(step + 1)}>
                {t("actions.next")} <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button className="flex-1 h-12 rounded-xl" disabled={!canNext()} onClick={finish}>
                <Sprout className="h-4 w-4 mr-1.5" /> {t("onboarding.finish")}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
