// components/BackToAdminButton.tsx
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
 

export default async function BackToAdminButton() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Verifica si el usuario logueado es el admin
    const adminEmail = process.env.SUPABASE_ADMIN_EMAIL;
    const isAdmin = user?.email === adminEmail;

    if (!isAdmin) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Link
                href="/dashboard"
                className="bg-pink-600 text-white px-4 py-2 rounded shadow hover:bg-pink-700 transition"
            >
                Volver a Admin
            </Link>
        </div>
    );
}
