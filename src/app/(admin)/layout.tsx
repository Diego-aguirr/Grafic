import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/interfaces/database";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser(); // 🔐 más seguro

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <section className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto p-4">{children}</div>
    </section>
  );
}
