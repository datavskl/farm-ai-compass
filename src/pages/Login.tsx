import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import iconUrl from "/app-icon.png";
import { ArrowLeft, Phone, Mail } from "lucide-react";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser, setDemo, hasOnboarded } = useApp();

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitPhone = () => {
    if (!/^\d{10}$/.test(phone)) { toast.error("Enter a valid 10-digit number"); return; }
    setOtpSent(true);
    toast.success("OTP sent to +91 " + phone + " (demo: 123456)");
  };
  const verifyOtp = () => {
    if (otp !== "123456") { toast.error("Invalid OTP (try 123456 in demo)"); return; }
    setUser({ id: "u-" + phone, name: "Farmer", phone });
    toast.success(t("auth.verify"));
    navigate(hasOnboarded ? "/app" : "/onboarding");
  };
  const submitEmail = () => {
    if (!email || !password) { toast.error("Enter email and password"); return; }
    setUser({ id: "u-" + email, name: email.split("@")[0] });
    toast.success(t("auth.welcome"));
    navigate(hasOnboarded ? "/app" : "/onboarding");
  };

  return (
    <div className="min-h-dscreen flex flex-col bg-gradient-to-b from-primary-soft/40 to-background">
      <header className="p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-muted" aria-label="Back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <LanguageSwitcher />
      </header>

      <main className="flex-1 flex items-start justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <img src={iconUrl} alt="" width={64} height={64} className="h-16 w-16 rounded-2xl mx-auto shadow-soft" />
            <h1 className="mt-4 text-2xl font-bold">{t("auth.welcome")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("auth.welcomeSub")}</p>
          </div>

          <div className="card-elevated p-5">
            <Tabs defaultValue="phone">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="phone"><Phone className="h-4 w-4 mr-1.5" />{t("auth.phoneTab")}</TabsTrigger>
                <TabsTrigger value="email"><Mail className="h-4 w-4 mr-1.5" />{t("auth.emailTab")}</TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4 pt-4">
                {!otpSent ? (
                  <>
                    <div className="space-y-1.5">
                      <Label>{t("auth.phoneLabel")}</Label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 rounded-md border bg-muted/50 text-sm font-medium">+91</div>
                        <Input inputMode="numeric" maxLength={10} placeholder={t("auth.phonePh")}
                          value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} />
                      </div>
                    </div>
                    <Button className="w-full h-12 rounded-xl" onClick={submitPhone}>{t("auth.sendOtp")}</Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <Label>{t("auth.otpLabel")}</Label>
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          {[0,1,2,3,4,5].map((i) => <InputOTPSlot key={i} index={i} />)}
                        </InputOTPGroup>
                      </InputOTP>
                      <p className="text-xs text-muted-foreground">Demo OTP: <b>123456</b></p>
                    </div>
                    <Button className="w-full h-12 rounded-xl" onClick={verifyOtp}>{t("auth.verify")}</Button>
                    <button type="button" onClick={() => setOtpSent(false)} className="text-xs text-primary underline">
                      Change number
                    </button>
                  </>
                )}
              </TabsContent>

              <TabsContent value="email" className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <Label>{t("auth.email")}</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("auth.password")}</Label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button className="w-full h-12 rounded-xl" onClick={submitEmail}>{t("actions.continue")}</Button>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-4 text-center">
            <Button variant="link" className="text-sm" onClick={() => { setDemo(true); navigate("/app"); }}>
              {t("actions.tryDemo")}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
