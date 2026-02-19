import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        LeadOS Lite
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Un mini CRM full-stack para demostrar autenticación, base de datos,
        filtros y dashboards.
      </p>

      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/login">Entrar</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
