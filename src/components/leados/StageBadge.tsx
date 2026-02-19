import { Badge } from "@/components/ui/badge";

const map: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  new: { label: "Nuevo", variant: "secondary" },
  contacted: { label: "Contactado", variant: "outline" },
  qualified: { label: "Calificado", variant: "default" },
  meeting: { label: "Cita", variant: "default" },
  won: { label: "Cerrado", variant: "default" },
  lost: { label: "Perdido", variant: "destructive" },
};

export default function StageBadge({ stage }: { stage: string }) {
  const s = map[stage] ?? { label: stage, variant: "secondary" as const };
  return <Badge variant={s.variant}>{s.label}</Badge>;
}
