'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'

interface EditFormProps {
    id: string;
    category: string;
    description: string;
    onUpdated: () => void;
}

export default function EditForm({ id, category, description, onUpdated }: EditFormProps) {
    const [newCategory, setNewCategory] = useState(category);
    const [newDescription, setNewDescription] = useState(description);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('images')
            .update({ category: newCategory, description: newDescription })
            .eq('id', id);

        setLoading(false);

        if (error) {
            alert('Hubo un error al actualizar.');
            console.error(error);
        } else {
            alert('Actualizado correctamente.');
            onUpdated();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 space-y-6 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Editar imagen</h2>

            <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoría
                </label>
                <input
                    id="category"
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    placeholder="Ej: CV, Logo, Tarjeta..."
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción
                </label>
                <textarea
                    id="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={3}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    placeholder="Breve descripción del diseño..."
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-teal-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            >
                {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
        </form>
    );
}
