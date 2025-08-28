// app/login/page.tsx

import LoginForm from "@components/LoginForm";


export default function LoginPage() {
  return (
    <section className="bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Iniciar Sesión
        </h2>
        <LoginForm />
      </div>
    </section>
  );
}
