"use client";

import { UpdateModalProps } from "@interfaces/updatemodal";
import { useState, useEffect } from "react";


const categories = ["Branding", "Digital", "Impresión", "Eventos", "Packaging"];

export default function UpdateModal({
    isOpen,
    onCancel,
    onSave,
    initialDescription,
    initialCategory,
}: UpdateModalProps) {
    const [description, setDescription] = useState(initialDescription);
    const [category, setCategory] = useState(initialCategory);

    useEffect(() => {
        setDescription(initialDescription);
        setCategory(initialCategory);
    }, [initialDescription, initialCategory]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Editar Imagen</h2>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Descripción</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Categoría</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                        <option value="">Seleccionar categoría</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSave(description, category)}
                        className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                    >
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    );
}
