import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "LeadOS Lite",
  description: "CRM full-stack con Next.js + Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
