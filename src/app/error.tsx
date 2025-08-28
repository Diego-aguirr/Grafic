// app/error.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error('🔴 Error capturado:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-800 px-4 text-center">
            <h1 className="text-4xl font-bold text-pink-600 mb-4">¡Lo sentimos!</h1>
            <p className="text-lg mb-2">
                En este momento estamos presentando un inconveniente inesperado.
            </p>
            <p className="text-md mb-6 text-gray-600">
                Nuestro equipo ya está trabajando para solucionarlo. Por favor, intenta más tarde.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 transition"
                >
                    Reintentar
                </button>
                <Link
                    href="/"
                    className="border border-pink-600 text-pink-600 px-5 py-2 rounded hover:bg-pink-50 transition"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
