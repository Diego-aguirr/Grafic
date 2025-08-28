// src/components/NavbarWrapper.tsx
export const dynamic = "force-dynamic";


import { createClient } from "@lib/supabase/server";
import Navbar from "./Navbar";


export default async function NavbarWrapper() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isAdmin = user?.email === process.env.ADMIN_EMAIL;

    return <Navbar isAdmin={!!isAdmin} />;
}
