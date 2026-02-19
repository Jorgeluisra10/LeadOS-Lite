import Header from "@/components/leados/Header";
import { createSupabaseServer } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen">
      <Header email={data.user?.email ?? null} />
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
