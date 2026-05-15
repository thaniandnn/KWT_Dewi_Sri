import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ChevronLeft } from 'lucide-react';
import { galleryData } from '../data/galleryData';

const GalleryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = galleryData.find((g) => g.slug === slug) as any;

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F2]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Kegiatan tidak ditemukan</h2>
          <Link to="/gallery" className="text-kwt-orange hover:underline">Kembali ke Galeri</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F2] min-h-screen pt-[72px]">
      {/* HERO SECTION */}
      <section className="relative h-[420px] lg:h-[520px]">
        <img 
          src={item.image} 
          alt={item.label || (item as any).title} 
          className="w-full h-full object-cover object-center" 
        />
        
        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Konten di atas foto */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-16 pb-10 z-10">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-xs font-bold tracking-widest uppercase mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <Link to="/gallery" className="hover:text-white transition-colors">Galeri Kegiatan</Link>
              <span>›</span>
              <span className="text-white truncate max-w-[200px]">
                {item.label || (item as any).title}
              </span>
            </div>

            {/* Badge kategori */}
            <span className="bg-kwt-orange text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {item.category}
            </span>

            {/* Judul */}
            <h1 className="font-playfair text-3xl lg:text-5xl font-bold text-white mt-3 max-w-3xl leading-tight">
              {item.label || item.title}
            </h1>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex flex-wrap gap-6">
          {item.date && (
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Calendar className="w-4 h-4 text-kwt-lime" />
              <span>{item.date}</span>
            </div>
          )}

          {item.location && (
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4 text-kwt-lime" />
              <span>{item.location}</span>
            </div>
          )}

          {item.participants && (
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Users className="w-4 h-4 text-kwt-lime" />
              <span>{item.participants}</span>
            </div>
          )}
        </div>
      </div>

      {/* KONTEN ARTIKEL */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <article 
          className="prose prose-lg max-w-none
            prose-h2:font-playfair 
            prose-h2:text-2xl 
            prose-h2:font-bold 
            prose-h2:text-black
            prose-h2:mt-8 prose-h2:mb-3
            prose-p:text-gray-600 
            prose-p:leading-relaxed
            prose-p:text-base"
          dangerouslySetInnerHTML={{ __html: item.content || `<p>${item.label || item.title}</p>` }} 
        />
      </div>

      {/* GALERI FOTO KEGIATAN */}
      {item.images && item.images.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <h3 className="font-playfair text-2xl font-bold text-black mb-6">
            Dokumentasi Kegiatan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {item.images.map((img: string, i: number) => (
              <div key={i} className="relative h-[200px] rounded-xl overflow-hidden">
                <img 
                  src={img} 
                  alt={`Dokumentasi ${i+1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAGS */}
      {item.tags && item.tags.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 pb-8 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Tags:</span>
          {item.tags.map((tag: string) => (
            <span key={tag} className="text-xs border border-gray-300 text-gray-500 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* TOMBOL KEMBALI */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <Link to="/gallery">
          <button className="inline-flex items-center gap-2 border border-black text-black px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all duration-200">
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Galeri
          </button>
        </Link>
      </div>

      {/* KEGIATAN LAINNYA */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-playfair text-2xl font-bold text-black mb-8">
            Kegiatan Lainnya
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryData
              .filter(g => g.slug !== item.slug)
              .slice(0, 3)
              .map(g => (
                <div 
                  key={g.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group flex flex-col"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={g.image}
                      alt={g.label || (g as any).title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <span className="inline-block bg-kwt-orange/10 text-kwt-orange text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                      {g.category}
                    </span>
                    <h3 className="font-playfair text-lg font-bold text-black leading-snug group-hover:text-kwt-orange transition-colors">
                      {g.label || (g as any).title}
                    </h3>
                    <Link to={`/gallery/${g.slug}`}>
                      <button className="mt-2 bg-kwt-orange text-white px-5 py-2.5 rounded-xl text-sm font-medium w-fit hover:bg-orange-600 hover:-translate-y-0.5 transition-all duration-200">
                        View More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetailPage;
