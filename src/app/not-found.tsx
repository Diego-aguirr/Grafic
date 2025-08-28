

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#faf3f5] text-gray-800 px-4 text-center">
            <h1 className="text-5xl font-extrabold text-pink-600 mb-4">Ups... no encontramos lo que buscas</h1>
            <p className="text-lg mb-2">
                Puede que el enlace esté roto o que la página ya no exista.
            </p>
            <p className="text-md mb-6 text-gray-600">
                Pero no te preocupes, tenemos mucho para mostrarte.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/"
                    className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 transition"
                >
                    Volver al inicio
                </Link>
                <Link
                    href="/ourdesigns"
                    className="border border-pink-600 text-pink-600 px-5 py-2 rounded hover:bg-pink-50 transition"
                >
                    Ver nuestros diseños
                </Link>
                
            </div>
        </div>
    );
}
