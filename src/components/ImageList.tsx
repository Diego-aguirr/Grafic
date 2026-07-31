"use client";

import { useState, useEffect } from "react";
import ConfirmModal from "./ui/ConfirmModal";
import UpdateModal from "./ui/UpdateModal";
import { imageEvents } from "@lib/events/imgEvent";
import Image from "next/image";

interface ImageItem {
  id: string;
  url: string;
  description: string;
  category: string;
  createdAt: string;
}

export default function ImageList() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ id: string; url: string } | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/images");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    const unsubscribe = imageEvents.subscribe(() => {
      fetchImages();
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!selectedImage) return;

    try {
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedImage.id, url: selectedImage.url }),
      });

      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== selectedImage.id));
        setSelectedImage(null);
      } else {
        alert("Error al eliminar la imagen");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error al eliminar";
      alert(errorMessage);
    }
  };

  const handleUpdate = async (id: string, description: string, category: string) => {
    try {
      const res = await fetch("/api/images", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, description, category }),
      });

      if (res.ok) {
        fetchImages();
        setIsUpdateOpen(false);
        setEditingImage(null);
      } else {
        alert("Error al actualizar la imagen");
      }
    } catch {
      alert("Error al actualizar la imagen");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Imágenes subidas</h2>

      {loading && <p className="text-gray-500">Cargando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={img.url}
              alt={img.description}
              className="w-full h-48 object-cover"
              width={300}
              height={300}
            />
            <div className="p-4 space-y-1">
              <p className="text-gray-800 text-sm">{img.description}</p>
              <p className="text-xs text-teal-600 font-medium">{img.category}</p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setEditingImage(img);
                    setIsUpdateOpen(true);
                  }}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => setSelectedImage({ id: img.id, url: img.url })}
                  className="text-sm text-red-600 hover:underline cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={!!selectedImage}
        onCancel={() => setSelectedImage(null)}
        onConfirm={handleDelete}
        title="¿Eliminar imagen?"
        message="¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer."
      />

      {editingImage && (
        <UpdateModal
          isOpen={isUpdateOpen}
          onCancel={() => {
            setIsUpdateOpen(false);
            setEditingImage(null);
          }}
          onSave={(desc, cat) => handleUpdate(editingImage.id, desc, cat)}
          initialDescription={editingImage.description}
          initialCategory={editingImage.category}
        />
      )}
    </div>
  );
}
