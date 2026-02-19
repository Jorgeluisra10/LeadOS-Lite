import { createSupabaseServer } from "@/lib/supabase/server";
import StatsCards from "@/components/leados/StatsCards";

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  // Por seguridad
  if (!userData.user) {
    return (
      <p className="text-sm text-muted-foreground">
        Sesión no válida. Vuelve a iniciar sesión.
      </p>
    );
  }

  const { data: leads, error } = await supabase
    .from("leads")
    .select("stage")
    .eq("owner_id", userData.user.id);

  if (error) {
    return <p className="text-sm text-destructive">Error: {error.message}</p>;
  }

  const total = leads?.length ?? 0;
  const countByStage = (stage: string) =>
    leads?.filter((l) => l.stage === stage).length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Vista rápida de tus leads por etapa.
        </p>
      </div>

      <StatsCards
        total={total}
        newCount={countByStage("new")}
        contacted={countByStage("contacted")}
        qualified={countByStage("qualified")}
        meeting={countByStage("meeting")}
      />
    </div>
  );
}
