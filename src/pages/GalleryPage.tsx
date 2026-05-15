import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { getPageSafe } from '../lib/cmsApi';

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    getPageSafe('home')
      .then((page) => {
        if (!page) return;
        const galleryBlock = (page.content as any[]).find((b: any) => b.type === 'gallery');
        if (!galleryBlock) return;
        const rawImages: any[] = galleryBlock.data?.images ?? galleryBlock.data?.items ?? [];
        const mapped: GalleryImage[] = rawImages.map((img: any, i: number) => ({
          id: img.id ?? String(i),
          url: img.url ?? '',
          caption: img.caption ?? img.label ?? '',
          category: img.category ?? img.tag ?? 'Umum',
        }));
        setImages(mapped);
      })
      .catch((err) => console.error('[GalleryPage] fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  // Unique categories
  const categories = useMemo(() => {
    const cats = new Set(images.map((img) => img.category).filter(Boolean));
    return ['Semua', ...Array.from(cats)];
  }, [images]);

  const filtered = activeFilter === 'Semua'
    ? images
    : images.filter((img) => img.category === activeFilter);

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      {/* PAGE HEADER */}
      <div className="bg-black pt-32 pb-10 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold tracking-widest uppercase mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Galeri Kegiatan</span>
          </div>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white mb-3">
            Galeri Kegiatan
          </h1>
          <p className="text-white/50 text-base">
            Dokumentasi program dan kegiatan KWT Dewi Sri
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="sticky top-[64px] z-40 bg-black/95 backdrop-blur-md border-b border-white/10 py-4 px-4 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-4 lg:px-5 py-2 rounded-full text-[11px] lg:text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 ${
                  activeFilter === cat
                    ? 'bg-kwt-lime text-black border border-kwt-lime'
                    : 'bg-transparent text-white border border-white/40 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PHOTO GRID */}
      <div className="bg-black min-h-screen py-8 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-10 h-10 border-4 border-kwt-lime border-t-transparent rounded-full animate-spin" />
              <p className="text-white/40 text-sm">Memuat galeri...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-[240px] lg:h-[260px] rounded-2xl overflow-hidden cursor-pointer group"
                    onMouseEnter={() => setHoveredId(photo.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
                      {photo.category && photo.category !== 'Umum' && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{
                            opacity: hoveredId === photo.id ? 1 : 0,
                            y: hoveredId === photo.id ? 0 : 4,
                          }}
                          transition={{ duration: 0.2 }}
                          className="mb-1.5"
                        >
                          <span className="bg-kwt-lime text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                            {photo.category}
                          </span>
                        </motion.div>
                      )}
                      <p className="text-white font-semibold text-base leading-tight drop-shadow-lg">
                        {photo.caption}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/40 text-base">
                Belum ada foto dalam kategori ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;


