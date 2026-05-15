import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Users, Calendar, ShoppingBag, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import type { HeroBlockData, ActivitySliderBlockData } from '../../lib/types';

interface HeroBlockProps {
  data: HeroBlockData;
  activityData?: ActivitySliderBlockData;
}

const FALLBACK_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&q=80', label: 'Petani KWT Dewi Sri', tag: 'Keluarga Petani' },
  { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80', label: 'Panen Raya Bersama', tag: 'Kegiatan' },
  { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', label: 'Lahan Organik Dewi Sri', tag: 'Pertanian' },
];

const DEFAULT_STATS = [
  { label: 'Anggota Aktif', value: '50+', icon: Users },
  { label: 'Tahun Berdiri', value: '2018', icon: Calendar },
  { label: 'Produk UMKM', value: '12+', icon: ShoppingBag },
  { label: 'Penghargaan', value: '3+', icon: Award },
];

export const HeroBlock: React.FC<HeroBlockProps> = ({ data, activityData }) => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Background hero: ambil dari background_image CMS hero block
  const bgImage = data.background_image
    || 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=1600&q=80';

  // Carousel kanan: pakai activityData jika ada, fallback ke FALLBACK_IMAGES
  let carouselImages = FALLBACK_IMAGES;
  if (activityData && activityData.activities && activityData.activities.length > 0) {
    carouselImages = activityData.activities.map(act => ({
      url: act.image || FALLBACK_IMAGES[0].url,
      label: act.title || '',
      tag: activityData.title || 'Kegiatan'
    }));
  }

  // Stats dari CMS jika nilai tidak kosong, fallback ke default
  const hasStats = data.stats?.some((s) => s.value && s.value.trim() !== '');
  const cmsStats = hasStats
    ? data.stats!.filter((s) => s.value?.trim()).map((s, i) => ({
        label: s.label,
        value: s.value,
        icon: DEFAULT_STATS[i]?.icon ?? Users,
      }))
    : DEFAULT_STATS;

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [isHovered, carouselImages.length]);

  const scrollToProfile = () => document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToGallery = () => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ── Hero Section ── */}
      <section id="home" className="relative bg-black pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* Parallax Background — dari CMS hero background_image */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 opacity-50 pointer-events-none">
          <img src={bgImage} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        {/* Decorative Gradients */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 20% 50%, rgba(240,93,35,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(197,216,109,0.1) 0%, transparent 50%)` }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              {data.headline?.includes('Dewi Sri') ? (
                <>
                  {data.headline.replace('Dewi Sri', '').trim()}{' '}
                  <span className="text-kwt-lime italic">Dewi Sri</span>
                </>
              ) : (
                data.headline
              )}
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-dm mb-12 max-w-lg leading-relaxed">
              {data.sub_headline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button onClick={scrollToProfile} variant="primary" className="bg-kwt-orange text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-700 hover:shadow-2xl hover:shadow-kwt-orange/40 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center border-none">
                Kenali Kami
              </Button>
              <Button onClick={scrollToGallery} variant="outline" className="group border-2 border-kwt-lime/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-kwt-lime hover:border-kwt-lime hover:text-black hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-3">
                Lihat Galeri
              </Button>
            </div>
          </motion.div>

          {/* Right: Carousel */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative group">
            <div
              className="relative w-full h-[320px] sm:h-[420px] lg:h-[560px] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/10 bg-black group/carousel"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {carouselImages.map((img, index) => (
                <div key={index} className={`absolute inset-0 transition-all duration-[1200ms] ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}>
                  <motion.div initial={{ scale: 1.1 }} animate={index === current ? { scale: 1 } : { scale: 1.1 }} transition={{ duration: 6, ease: 'linear' }} className="absolute inset-0">
                    <img src={img.url} alt={img.label} referrerPolicy="no-referrer" className="w-full h-full object-cover object-center" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
                  <div className="absolute bottom-12 left-12 right-12 z-30">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={index === current ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="inline-flex items-center gap-2 mb-4">
                      <div className="w-8 h-[1px] bg-kwt-lime" />
                      <span className="text-kwt-lime text-[11px] font-black uppercase tracking-[0.4em]">{img.tag}</span>
                    </motion.div>
                    <motion.h3 initial={{ y: 30, opacity: 0 }} animate={index === current ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-white font-playfair text-4xl md:text-5xl font-bold leading-[1.1] mb-2">
                      {img.label}
                    </motion.h3>
                  </div>
                </div>
              ))}

              {/* Arrows */}
              <motion.button whileHover={{ scale: 1.1, x: -4 }} whileTap={{ scale: 0.9 }} onClick={() => setCurrent((p) => (p === 0 ? carouselImages.length - 1 : p - 1))} className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white flex items-center justify-center hover:bg-kwt-orange hover:border-kwt-orange transition-all opacity-0 md:group-hover/carousel:opacity-100">
                <ChevronLeft size={28} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1, x: 4 }} whileTap={{ scale: 0.9 }} onClick={() => setCurrent((p) => (p === carouselImages.length - 1 ? 0 : p + 1))} className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white flex items-center justify-center hover:bg-kwt-orange hover:border-kwt-orange transition-all opacity-0 md:group-hover/carousel:opacity-100">
                <ChevronRight size={28} />
              </motion.button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {carouselImages.map((_, index) => (
                <button key={index} onClick={() => setCurrent(index)} className="group relative py-4">
                  <div className={`relative transition-all duration-500 rounded-full overflow-hidden ${index === current ? 'w-12 h-1.5 bg-kwt-orange shadow-[0_0_20px_rgba(234,88,12,0.6)]' : 'w-2 h-1.5 bg-white/10 group-hover:bg-white/30'}`} />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-0" />
      </section>

      {/* ── Stats Bar (dari CMS atau fallback) ── */}
      <section id="stats" className="bg-kwt-lime py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cmsStats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="text-center text-kwt-maroon">
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 opacity-40 text-kwt-maroon" />
                </div>
                <h3 className="font-playfair text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-sm font-dm opacity-60 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
