// ✅ Componente: src/components/UpdatePasswordForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@lib/supabase/client";

const supabase = createClient();


export default function UpdatePasswordForm() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const router = useRouter();

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setInfo("");

        const { error: updateError } = await supabase.auth.updateUser({
            password,
        });

        if (updateError) {
            setError("Error al actualizar la contraseña.");
        } else {
            setInfo("Contraseña actualizada. Redirigiendo...");
            setTimeout(() => router.push("/login"), 2000);
        }
    };

    return (
        <form
            onSubmit={handleUpdatePassword}
            className="max-w-md mx-auto mt-12 space-y-6 bg-white p-6 shadow rounded-lg"
        >
            <h2 className="text-2xl font-bold text-center text-gray-900">
                Actualiza tu Contraseña
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {info && <p className="text-green-600 text-center">{info}</p>}

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
                Actualizar Contraseña
            </button>
        </form>
    );
}
