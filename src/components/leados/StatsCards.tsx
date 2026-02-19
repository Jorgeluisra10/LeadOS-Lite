import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({
  total,
  newCount,
  contacted,
  qualified,
  meeting,
}: {
  total: number;
  newCount: number;
  contacted: number;
  qualified: number;
  meeting: number;
}) {
  const items = [
    { title: "Total leads", value: total },
    { title: "Nuevos", value: newCount },
    { title: "Contactados", value: contacted },
    { title: "Calificados", value: qualified },
    { title: "Cita", value: meeting },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((it) => (
        <Card key={it.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {it.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{it.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
