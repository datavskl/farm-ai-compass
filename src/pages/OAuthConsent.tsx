import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const load = async () => {
    if (!authorizationId) return setError("Missing authorization_id");
    const { data: sess } = await supabase.auth.getSession();
    if (!sess.session) {
      setNeedsAuth(true);
      return;
    }
    setNeedsAuth(false);
    setAccount(sess.session.user.email ?? sess.session.user.phone ?? null);
    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) return setError(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) {
      window.location.href = immediate;
      return;
    }
    setDetails(data);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationId]);

  const signIn = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setError(error.message);
    setError(null);
    void load();
  };

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  };

  return (
    <main className="min-h-dvh flex items-center justify-center p-4 bg-gradient-to-b from-primary-soft/40 to-background">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-soft">
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

        {needsAuth ? (
          <>
            <h1 className="text-xl font-bold">Sign in to continue</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to your FarmWise AI account to authorize this connection.
            </p>
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="c-email">Email</Label>
                <Input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="c-pass">Password</Label>
                <Input id="c-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button className="w-full" disabled={busy} onClick={signIn}>Sign in</Button>
            </div>
          </>
        ) : !details ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <>
            <h1 className="text-xl font-bold">
              Connect {details.client?.name ?? "an app"} to FarmWise AI
            </h1>
            {account && (
              <p className="mt-1 text-sm text-muted-foreground">Signed in as {account}</p>
            )}
            <p className="mt-4 text-sm">
              This lets {details.client?.name ?? "this client"} call FarmWise AI's enabled tools as you.
            </p>
            {details.client?.redirect_uri && (
              <p className="mt-2 text-xs text-muted-foreground break-all">
                Redirects to {details.client.redirect_uri}
              </p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              This does not bypass this app's permissions or backend policies.
            </p>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1" disabled={busy} onClick={() => decide(true)}>Approve</Button>
              <Button className="flex-1" variant="outline" disabled={busy} onClick={() => decide(false)}>
                Cancel connection
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
