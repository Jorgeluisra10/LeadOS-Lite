"use client";

import { useMemo, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const stages = [
  { value: "new", label: "Nuevo" },
  { value: "contacted", label: "Contactado" },
  { value: "qualified", label: "Calificado" },
  { value: "meeting", label: "Cita" },
  { value: "won", label: "Cerrado" },
  { value: "lost", label: "Perdido" },
];

export default function LeadFormDialog({
  mode,
  lead,
  onDone,
}: {
  mode: "create" | "edit";
  lead?: Lead;
  onDone: () => void;
}) {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(lead?.name ?? "");
  const [email, setEmail] = useState(lead?.email ?? "");
  const [phone, setPhone] = useState(lead?.phone ?? "");
  const [city, setCity] = useState(lead?.city ?? "");
  const [source, setSource] = useState(lead?.source ?? "web");
  const [budget, setBudget] = useState(lead?.budget?.toString() ?? "");
  const [stage, setStage] = useState(lead?.stage ?? "new");
  const [notes, setNotes] = useState(lead?.notes ?? "");

  const submit = async () => {
    setLoading(true);
    try {
      if (!name.trim()) throw new Error("El nombre es obligatorio.");

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) throw new Error("Sesión inválida. Vuelve a iniciar sesión.");

      const payload = {
        owner_id: user.id,
        name: name.trim(),
        email: email.trim() || null,
        phone: phone.trim() || null,
        city: city.trim() || null,
        source: source?.trim() || "web",
        budget: budget ? Number(budget) : null,
        stage,
        notes: notes.trim() || null,
      };

      if (mode === "create") {
        const { error } = await supabase.from("leads").insert(payload);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("leads")
          .update(payload)
          .eq("id", lead!.id);
        if (error) throw error;
      }

      setOpen(false);
      onDone();
    } catch (e: any) {
      alert(e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button>Nuevo lead</Button>
        ) : (
          <Button variant="outline" size="sm">
            Editar
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Crear lead" : "Editar lead"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Nombre *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@email.com"
              />
            </div>
            <div className="grid gap-2">
              <Label>Teléfono</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+54..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Ciudad</Label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="CDMX / Buenos Aires..."
              />
            </div>
            <div className="grid gap-2">
              <Label>Presupuesto</Label>
              <Input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="150000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Fuente</Label>
              <Input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="web / whatsapp / referido"
              />
            </div>
            <div className="grid gap-2">
              <Label>Etapa</Label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una etapa" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Notas</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contexto rápido del lead..."
            />
          </div>

          <Button onClick={submit} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
