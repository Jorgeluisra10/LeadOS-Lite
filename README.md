# LeadOS Lite

LeadOS Lite is a minimal full-stack CRM built with Next.js 15, Supabase and TailwindCSS.

## 🚀 Features

- Authentication (Supabase Auth)
- Row Level Security (RLS)
- Full CRUD for leads
- Protected routes via middleware
- Dashboard with stage statistics
- Modern UI with shadcn/ui
- Server-side data fetching

## 🧱 Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Supabase (Postgres + Auth + RLS)
- TailwindCSS
- shadcn/ui

## 🔐 Security

- RLS policies ensure users can only access their own leads.
- Middleware protects private routes.

## ⚙️ Setup

1. Clone repo
2. Add `.env.local`:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=


3. Run:

npm install
npm run dev


## 📌 Purpose

This project demonstrates:
- Full-stack architecture
- Secure authentication
- Production-ready data modeling
- Clean component structure