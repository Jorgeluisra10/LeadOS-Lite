"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useMemo, useState } from "react";

export default function Header({ email }: { email: string | null }) {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <header className="border-b bg-background/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-lg font-semibold tracking-tight"
          >
            LeadOS Lite
          </Link>
          <nav className="hidden gap-4 md:flex">
            <Link
              className="text-sm text-muted-foreground hover:text-foreground"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:text-foreground"
              href="/leads"
            >
              Leads
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {email && (
            <span className="hidden text-sm text-muted-foreground md:inline">
              {email}
            </span>
          )}
          <Button variant="outline" onClick={logout} disabled={loading}>
            {loading ? "Saliendo..." : "Salir"}
          </Button>
        </div>
      </div>
    </header>
  );
}
