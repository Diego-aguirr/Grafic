"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@lib/supabase/client";

const supabase = createClient();

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setIsLoading(true);

    try {
      const { data: loginData, error: loginErr } =
        await supabase.auth.signInWithPassword({ email, password });

      let user = loginData.user;

      if (loginErr || !user) {
        // Verificar si hay admins
        const { data: admins } = await supabase
          .from("admin_profiles")
          .select("id");

        if (!admins || admins.length === 0) {
          setInfo("Registrando como primer administrador...");

          const { data: signUpData, error: signUpErr } =
            await supabase.auth.signUp({ email, password });

          if (signUpErr || !signUpData.user) throw signUpErr;

          user = signUpData.user;

          // 🔹 Validación segura para evitar undefined
          if (!user.id) throw new Error("El usuario no tiene un ID válido");

          await supabase.from("admin_profiles").insert({
            id: user.id,
            email: user.email ?? "",
          });

          // Reintentar login
          const { error: reloginErr, data: reloginData } =
            await supabase.auth.signInWithPassword({ email, password });

          if (reloginErr || !reloginData.user) throw reloginErr;

          user = reloginData.user;
        } else {
          throw loginErr;
        }
      }

      // 🔹 Segunda validación por seguridad
      if (!user?.id) throw new Error("El usuario no tiene un ID válido");

      const { data: profile, error: profErr } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profErr || !profile) {
        await supabase.auth.signOut();
        throw new Error("No tienes permisos de administrador");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError((err as Error).message || "Error de autenticación");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setInfo("");

    if (!email) {
      setError("Por favor, ingresa tu correo electrónico");
      return;
    }

    setIsLoading(true);

    try {
      const { error: resetErr } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/update-password`,
        });

      if (resetErr) throw resetErr;

      setInfo("Revisa tu correo para restablecer la contraseña.");
    } catch (err) {
      setError((err as Error).message || "Error de autenticación");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto p-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Correo electrónico
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          required
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
        />
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contraseña
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          required
          placeholder="********"
          autoComplete="current-password"
        />
      </div>

      {/* Mensajes */}
      {error && (
        <p className="text-red-500 text-sm text-center font-medium">{error}</p>
      )}
      {info && (
        <p className="text-teal-600 text-sm text-center font-medium">{info}</p>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-700 hover:to-teal-600 focus:ring-2 focus:ring-teal-500 transition-all disabled:opacity-50"
      >
        {isLoading ? "Procesando..." : "Ingresar"}
      </button>

      {/* Recuperar contraseña */}
      <p
        onClick={handlePasswordReset}
        className="text-center text-sm text-teal-600 hover:underline cursor-pointer select-none"
      >
        ¿Olvidaste tu contraseña?
      </p>
    </form>
  );
}
