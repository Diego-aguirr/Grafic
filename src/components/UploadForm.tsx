"use client";

import { useState } from "react";
 
import { uploadImage } from "@lib/helper/upload-image";
import { imageEvents } from "@lib/events/imgEvent";
import { createClient } from "@lib/supabase/client";

const supabase = createClient();

const categories = ["Branding", "Digital", "Impresión", "Eventos", "Packaging"];

export default function UploadForm() {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (!image) {
        setMessage("Por favor selecciona una imagen.");
        setLoading(false);
        return;
      }

      // Subir imagen a Supabase Storage
      const publicUrl = await uploadImage(image);

      // Guardar en tabla 'images'
      const { error } = await supabase.from("images").insert({
        url: publicUrl,
        description,
        category,
      });

      if (error) throw error;

      setMessage("Imagen subida exitosamente 🎉");

      // Notificamos al resto que se subió una imagen nueva
      imageEvents.dispatch();

      // Limpiar campos
      setImage(null);
      setDescription("");
      setCategory("");
    } catch (err) {
      if (err instanceof Error) {
        setMessage("Error al subir la imagen: " + err.message);
      } else {
        setMessage("Error al subir la imagen");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Subir Imagen</h2>

      {message && <p className="text-center text-sm text-teal-600">{message}</p>}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Imagen <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Ej: Diseño para CV moderno"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Categoría <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-700 hover:to-teal-600 transition-all disabled:opacity-50"
      >
        {loading ? "Subiendo..." : "Subir imagen"}
      </button>
    </form>
  );
}
