"use client";

import { useMemo, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setMsg(null);

    try {
      if (!email || !password) {
        setMsg("Completa email y contraseña.");
        return;
      }

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMsg(
          "Cuenta creada. Si tu proyecto requiere confirmación de email, revisa tu correo.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = "/dashboard";
      }
    } catch (e: any) {
      setMsg(e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </CardTitle>
          <CardDescription>LeadOS Lite (Next.js + Supabase)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {msg && <p className="text-sm text-muted-foreground">{msg}</p>}

          <Button className="w-full" onClick={submit} disabled={loading}>
            {loading
              ? "Procesando..."
              : mode === "login"
                ? "Entrar"
                : "Crear cuenta"}
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))}
          >
            {mode === "login" ? "Crear cuenta" : "Ya tengo cuenta"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
