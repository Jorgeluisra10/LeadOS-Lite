"use client";

import { useMemo, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StageBadge from "./StageBadge";
import LeadFormDialog from "./LeadFormDialog";

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

export default function LeadsTable({
  leads,
  onRefresh,
}: {
  leads: Lead[];
  onRefresh: () => void;
}) {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const remove = async (id: string) => {
    const ok = confirm("¿Eliminar este lead?");
    if (!ok) return;

    setDeletingId(id);
    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
      onRefresh();
    } catch (e: any) {
      alert(e?.message ?? "Error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.map((l) => (
            <TableRow key={l.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{l.name}</span>
                  {l.source && (
                    <span className="text-xs text-muted-foreground">
                      Fuente: {l.source}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {l.email ?? "—"}
                  <div className="text-xs text-muted-foreground">
                    {l.phone ?? ""}
                  </div>
                </div>
              </TableCell>
              <TableCell>{l.city ?? "—"}</TableCell>
              <TableCell>
                <StageBadge stage={l.stage} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <LeadFormDialog mode="edit" lead={l} onDone={onRefresh} />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(l.id)}
                    disabled={deletingId === l.id}
                  >
                    {deletingId === l.id ? "Eliminando..." : "Eliminar"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {leads.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                No hay leads todavía.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
