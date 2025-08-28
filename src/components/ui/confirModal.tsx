// components/ui/ConfirmModal.tsx
"use client";

import { ConfirmModalProps } from "@interfaces/modal";




export default function ConfirmModal({
    isOpen,
    title = "¿Estás seguro?",
    message = "Esta acción no se puede deshacer.",
    onCancel,
    onConfirm,
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600">{message}</p>
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );

}
