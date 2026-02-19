"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import LeadFormDialog from "@/components/leados/LeadFormDialog";
import LeadsTable from "@/components/leados/LeadsTable";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type Lead = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  source: string | null;
  budget: number | null;
  stage: string;
  notes: string | null;
};

export default function LeadsPageClient() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const fetchLeads = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setLeads([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("leads")
      .select("id,name,email,phone,city,source,budget,stage,notes")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) setLeads(data as Lead[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = leads.filter((l) => {
    const s =
      `${l.name} ${l.email ?? ""} ${l.phone ?? ""} ${l.city ?? ""} ${l.source ?? ""}`.toLowerCase();
    return s.includes(q.toLowerCase().trim());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground">
            CRUD completo con Supabase + filtros.
          </p>
        </div>
        <LeadFormDialog mode="create" onDone={fetchLeads} />
      </div>

      <Card>
        <CardContent className="p-4">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, email, ciudad..."
          />
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <LeadsTable leads={filtered} onRefresh={fetchLeads} />
      )}
    </div>
  );
}
