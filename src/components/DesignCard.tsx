"use client";

import { DesignCardProps } from "@/interfaces/designcard";
import { motion } from "framer-motion";
import Image from "next/image";

export const DesignCard = ({ design }: DesignCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative aspect-square">
        <Image
          src={design.image}
          alt={design.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end p-6">
          <div className="translate-y-8 group-hover:translate-y-0 transition-transform">
            <h3 className="text-xl font-bold text-white mb-2">
              {design.title}
            </h3>
            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {design.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <span className="text-sm font-medium text-teal-600">
          {design.category}
        </span>
      </div>
    </motion.div>
  );
};
