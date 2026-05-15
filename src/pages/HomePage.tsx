import React, { useState, useEffect } from 'react';
import { getPageSafe } from '../lib/cmsApi';
import type { CmsPage } from '../lib/types';
import { BlockRenderer } from '../components/blocks/BlockRenderer';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Calendar, 
  ShoppingBag, 
  Award, 
  MapPin, 
  Target, 
  ChevronRight, 
  ChevronLeft,
  Mail, 
  Phone, 
  Clock,
  Sparkles,
  Leaf,
  Shield,
  ArrowRight,
  Instagram
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { NewsCard } from '../components/news/NewsCard';
import { newsData } from '../data/newsData';

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&q=80",
    label: "Petani KWT Dewi Sri",
    tag: "Keluarga Petani"
  },
  {
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    label: "Panen Raya Bersama",
    tag: "Kegiatan"
  },
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    label: "Lahan Organik Dewi Sri",
    tag: "Pertanian"
  },
  {
    url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    label: "Hasil Tani Berkualitas",
    tag: "Produk"
  },
  {
    url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    label: "Sawah Subur Jawa Barat",
    tag: "Local Heritage"
  }
];

const HeroSection = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const y3 = useTransform(scrollY, [0, 500], [0, 200]);

  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent(prev => 
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const scrollToProfile = () => {
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative bg-black pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80" 
          alt="" 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Decorative Gradients */}
      <div className="absolute inset-0 z-[1]">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(240, 93, 35, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(197, 216, 109, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 60% 80%, rgba(240, 93, 35, 0.08) 0%, transparent 40%),
              transparent
            `
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
          }}
        />
        
        <motion.div 
          style={{ y: y3 }}
          className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-kwt-orange/5 to-transparent skew-y-12 origin-top-right opacity-30 -z-10" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            Berdaya Bersama <br />
            <span className="text-kwt-lime italic">Dewi Sri</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-dm mb-12 max-w-lg leading-relaxed">
            Menanam harapan, menuai masa depan. Kami adalah komunitas wanita tani yang berdedikasi untuk kedaulatan pangan dan kemandirian ekonomi melalui pertanian berkelanjutan.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              onClick={scrollToProfile}
              variant="primary" 
              className="bg-kwt-orange text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-700 hover:shadow-2xl hover:shadow-kwt-orange/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-500 flex items-center justify-center border-none"
            >
              Kenali Kami
            </Button>
            <Button 
              onClick={scrollToGallery}
              variant="outline" 
              className="group border-2 border-kwt-lime/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-kwt-lime hover:border-kwt-lime hover:text-black hover:-translate-y-1 active:scale-95 transition-all duration-500 flex items-center justify-center gap-3"
            >
              Lihat Galeri
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div
            className="relative w-full h-[320px] sm:h-[420px] lg:h-[560px] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/10 bg-black group/carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* SLIDES */}
            {carouselImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-[1200ms] cubic-bezier(0.4, 0, 0.2, 1) ${
                  index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                }`}
              >
                {/* Image Component with separate zoom transition */}
                <motion.div 
                  initial={{ scale: 1.1 }}
                  animate={index === current ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={img.url} 
                    alt={img.label} 
                    className="w-full h-full object-cover object-center scale-[1.02]"
                  />
                </motion.div>
                
                {/* Overlay Layers */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
                
                {/* Dynamic Light Flare */}
                <motion.div 
                  initial={{ opacity: 0, x: -100 }}
                  animate={index === current ? { opacity: 0.3, x: 200 } : { opacity: 0, x: -100 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute top-0 left-0 w-[600px] h-full bg-gradient-to-r from-white/20 via-transparent to-transparent -skew-x-12 blur-3xl z-20 pointer-events-none"
                />
                
                {/* Content with Parallax Effect */}
                <div className="absolute bottom-12 left-12 right-12 z-30">
                  <div className="max-w-md">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={index === current ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                      transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                      className="inline-flex items-center gap-2 mb-4"
                    >
                      <div className="w-8 h-[1px] bg-kwt-lime" />
                      <span className="text-kwt-lime text-[11px] font-black uppercase tracking-[0.4em]">
                        {img.tag}
                      </span>
                    </motion.div>
                    
                    <motion.h3 
                      initial={{ y: 30, opacity: 0 }}
                      animate={index === current ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="text-white font-playfair text-4xl md:text-5xl font-bold leading-[1.1] mb-2"
                    >
                      {img.label}
                    </motion.h3>
                    
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={index === current ? { y: 0, opacity: 0.6 } : { y: 10, opacity: 0 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="text-white text-xs font-medium tracking-[0.2em] uppercase italic"
                    >
                      {img.tag === 'Local Heritage' ? 'Warisan Leluhur yang Terjaga' : 'Dedikasi untuk Negeri'}
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}

            {/* ARROW PREV */}
            <motion.button
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrent(prev => prev === 0 ? carouselImages.length - 1 : prev - 1)}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white flex items-center justify-center hover:bg-kwt-orange hover:border-kwt-orange hover:text-white transition-all opacity-0 md:group-hover/carousel:opacity-100 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group/btn"
            >
              <ChevronLeft size={28} className="transition-transform group-hover/btn:-translate-x-1" />
            </motion.button>

            {/* ARROW NEXT */}
            <motion.button
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrent(prev => prev === carouselImages.length - 1 ? 0 : prev + 1)}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white flex items-center justify-center hover:bg-kwt-orange hover:border-kwt-orange hover:text-white transition-all opacity-0 md:group-hover/carousel:opacity-100 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group/btn"
            >
              <ChevronRight size={28} className="transition-transform group-hover/btn:translate-x-1" />
            </motion.button>


          </div>

          {/* INDICATOR DOTS */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className="group relative py-4"
              >
                <div className={`relative transition-all duration-500 rounded-full overflow-hidden ${
                  index === current 
                    ? 'w-12 h-1.5 bg-kwt-orange shadow-[0_0_20px_rgba(234,88,12,0.6)]' 
                    : 'w-2 h-1.5 bg-white/10 group-hover:bg-white/30'
                }`}>
                  {index === current && (
                    <motion.div 
                      layoutId="active-nav-shimmer"
                      className="absolute inset-0 bg-white/40 skew-x-12"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

        </motion.div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-0" />
    </section>
  );
};

const StatsBar = () => {
  const stats = [
    { label: 'Anggota Aktif', value: '50+', icon: Users },
    { label: 'Tahun Berdiri', value: '2018', icon: Calendar },
    { label: 'Produk UMKM', value: '12+', icon: ShoppingBag },
    { label: 'Penghargaan', value: '3+', icon: Award },
  ];

  return (
    <section className="bg-kwt-lime py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center text-kwt-maroon"
            >
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
  );
};

const ProfileSection = () => {
  const testimonials = [
    {
      id: 1,
      category: "Anggota Aktif",
      quote: "Bergabung dengan KWT Dewi Sri mengubah cara pandang saya tentang bertani. Saya belajar banyak hal baru dan kini lebih mandiri secara ekonomi.",
      name: "Ibu Suryati",
      role: "Anggota sejak 2019"
    },
    {
      id: 2,
      category: "Ketua Kelompok",
      quote: "Kami tidak hanya berkebun bersama, kami saling menguatkan. Setiap anggota membawa semangat yang luar biasa untuk kemajuan kelompok.",
      name: "Ibu Hj. Siti Aminah",
      role: "Ketua KWT Dewi Sri"
    },
    {
      id: 3,
      category: "Program Pelatihan",
      quote: "Pelatihan yang diberikan sangat bermanfaat. Saya jadi tahu cara mengolah hasil panen menjadi produk bernilai jual tinggi.",
      name: "Ibu Ratna",
      role: "Anggota sejak 2020"
    },
    {
      id: 4,
      category: "Dampak Ekonomi",
      quote: "Dulu saya hanya mengandalkan suami. Sekarang saya punya penghasilan sendiri dari hasil kebun dan produk olahan bersama kelompok.",
      name: "Ibu Wulandari",
      role: "Anggota sejak 2021"
    },
    {
      id: 5,
      category: "Kebersamaan",
      quote: "Yang paling berkesan adalah kebersamaannya. Kami seperti keluarga besar yang saling membantu dan mendukung satu sama lain.",
      name: "Ibu Nurhayati",
      role: "Anggota sejak 2018"
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="profile" className="relative bg-[#FBFBFA] pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-kwt-lime/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-kwt-orange/10 blur-[120px]" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Stacked Depth Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group w-full max-w-[480px] mx-auto lg:mx-0 order-2 lg:order-1 pr-6 pb-6 pt-2 lg:pt-0"
          >
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              {/* Layer 3 — paling belakang (dekoratif) */}
              <div className="absolute top-4 left-4 lg:top-8 lg:left-8 w-full h-full rounded-2xl bg-kwt-lime/30 border border-kwt-lime/40 transition-all duration-500 lg:group-hover:top-10 lg:group-hover:left-10" />

              {/* Layer 2 — tengah */}
              <div className="absolute top-2 left-2 lg:top-4 lg:left-4 w-full h-full rounded-2xl bg-kwt-orange/20 border border-kwt-orange/30 shadow-xl transition-all duration-500 lg:group-hover:top-5 lg:group-hover:left-5" />

              {/* Layer 1 — depan (foto utama) */}
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 transition-all duration-500 lg:group-hover:shadow-black/60">
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80" 
                  alt="Kegiatan KWT Dewi Sri" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay gradient bawah */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                {/* Label bawah foto */}
                <div className="absolute bottom-0 left-0 right-0 bg-kwt-orange px-4 py-3 lg:px-6 lg:py-4 flex items-center justify-between">
                  <span className="text-white text-xs lg:text-base font-bold font-playfair">
                    KWT Dewi Sri · Bojongsoang
                  </span>
                  <span className="text-white/80 text-[10px] lg:text-xs font-bold tracking-widest uppercase">Est. 2018</span>
                </div>
              </div>

              {/* Badge floating — pojok kanan atas */}
              <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 z-20 bg-black text-white px-3 py-1.5 lg:px-5 lg:py-2.5 rounded-full text-[10px] lg:text-sm font-bold uppercase tracking-widest border border-kwt-lime/40 shadow-xl">
                ✦ Sejak 2018
              </div>
            </div>
          </motion.div>

          {/* Right: Info Content with Carousel Slider */}
          <div className="flex flex-col order-1 lg:order-2 lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[3px] w-14 bg-kwt-orange" />
                <span className="text-kwt-orange text-sm font-black uppercase tracking-[0.6em]">The Collective</span>
                <div className="h-[1px] flex-1 bg-gray-100" />
              </div>

              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                Profil Kelompok <br />
                <span className="text-kwt-lime italic font-semibold">Wanita Tani</span>
              </h2>

              <p className="text-gray-500 font-dm text-base md:text-lg leading-relaxed mb-8 lg:mb-10 max-w-xl">
                Kelompok Wanita Tani (KWT) Dewi Sri 09 GBA 2 Bojongsoang, Kabupaten Bandung, merupakan komunitas perempuan pelaku UMKM yang aktif dalam memproduksi dan memasarkan hasil pertanian serta kerajinan lokal.
              </p>
            </motion.div>

            {/* Widget Carousel Slider */}
            <div className="relative min-h-[380px] sm:min-h-[340px] lg:min-h-[380px] mt-12 mb-20 lg:mt-0 lg:mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div className="relative overflow-hidden p-6 sm:p-8 lg:p-12 rounded-[28px] lg:rounded-[30px] bg-white border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] group cursor-default h-full flex flex-col justify-center">
                    <div className="relative z-10 flex flex-col gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-2 h-2 rounded-full bg-kwt-lime" />
                          <h4 className="font-dm text-xs font-black text-gray-400 uppercase tracking-[0.3em]">{testimonials[current].category}</h4>
                        </div>
                        <p className="font-playfair text-xl lg:text-2xl font-bold text-black leading-tight mb-6 italic">
                          "{testimonials[current].quote}"
                        </p>
                        
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                          {/* Avatar inisial — tanpa emoji */}
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-kwt-orange/15 flex items-center justify-center text-kwt-orange text-xs lg:text-sm font-bold shrink-0">
                            {testimonials[current].name.split(' ').slice(-1)[0].charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm lg:text-base font-semibold text-black">
                              {testimonials[current].name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {testimonials[current].role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="absolute -bottom-14 lg:-bottom-16 left-0 right-0 flex items-center justify-between px-2">
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-1.5 transition-all duration-500 rounded-full ${
                        index === current ? 'w-10 bg-kwt-orange' : 'w-2 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-3 lg:gap-4">
                  <button 
                    onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white bg-white transition-all shadow-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white bg-white transition-all shadow-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      label: "Lahan Pertanian Organik"
    },
    {
      url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
      label: "Panen Raya Bersama"
    },
    {
      url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      label: "Kebun Sayur Organik"
    },
    {
      url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
      label: "Pelatihan Pertanian"
    },
    {
      url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
      label: "Produk Olahan KWT"
    },
    {
      url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
      label: "Kegiatan Komunitas"
    }
  ];

  return (
    <section id="gallery" className="bg-black pt-8 pb-10 lg:pt-16 lg:pb-20 relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair text-5xl font-bold text-white mb-4"
        >
          Galeri Kegiatan
        </motion.h2>
        <p className="text-white/60 text-base max-w-xl mx-auto">
          Dokumentasi langkah nyata kami dalam memberdayakan komunitas dan menjaga kelestarian alam melalui berbagai program pertanian.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.slice(0, 6).map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-[220px] rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img 
                src={item.url} 
                alt={item.label} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300" />
              <p className="absolute bottom-4 left-4 text-white font-semibold text-sm drop-shadow-lg">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* TOMBOL LIHAT SEMUA KEGIATAN → /gallery */}
        <div className="flex justify-center mt-10">
          <Link to="/gallery">
            <button className="group inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3 rounded-full text-sm font-medium bg-transparent hover:bg-white/10 hover:border-white hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
              Lihat Semua Kegiatan
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const NewsSection = () => {
  const homeNews = newsData.slice(0, 3);

  return (
    <section id="news" className="bg-kwt-offwhite py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 lg:mb-10">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-kwt-maroon mb-4">Warta Terkini</h2>
          <p className="text-kwt-maroon/60 font-dm">Update terbaru mengenai program, prestasi, dan kegiatan harian anggota KWT Dewi Sri di lapangan.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {homeNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>

        <div className="flex justify-center mt-8 lg:mt-10">
          <Link to="/news">
            <button className="group inline-flex items-center gap-2 border border-kwt-maroon/40 text-kwt-maroon px-6 lg:px-8 py-2.5 lg:py-3 rounded-full text-sm font-medium bg-transparent hover:bg-kwt-maroon/5 hover:border-kwt-maroon hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
              Lihat Semua Berita
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="w-full bg-kwt-offwhite">
      <div className="w-full">

        {/* BANNER UTAMA */}
        <div className="bg-kwt-lime
                        px-6 lg:px-12 py-16 lg:py-24
                        text-center relative overflow-hidden">

          {/* Dekoratif background */}
          <div className="absolute inset-0 
                          bg-gradient-to-br
                          from-kwt-lime via-kwt-lime 
                          to-white/20" />
          <div className="absolute -top-20 -right-20
                          w-64 h-64 rounded-full
                          bg-white/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20
                          w-64 h-64 rounded-full
                          bg-kwt-orange/10 blur-3xl" />

          {/* Konten */}
          <div className="relative z-10 flex flex-col 
                          items-center gap-5">

            {/* Tag */}
            <div className="inline-flex items-center gap-2
                            bg-white/50 border border-white/60
                            px-4 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full 
                              bg-kwt-orange animate-pulse" />
              <span className="text-black/70 text-[10px] 
                               tracking-widest uppercase font-bold">
                Kontak Kami
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-playfair 
                           text-3xl sm:text-4xl lg:text-5xl
                           font-bold text-black leading-tight
                           max-w-xl">
              Hubungi KWT Dewi Sri
            </h2>

            {/* Subtext */}
            <p className="text-black/70 text-sm lg:text-base
                          leading-relaxed max-w-lg">
              Ingin memesan produk UMKM kami atau berkunjung untuk studi banding? 
              Silakan hubungi kami melalui saluran berikut.
            </p>

            {/* Tombol */}
            <div className="flex flex-col sm:flex-row 
                            items-center gap-3 mt-2 w-full sm:w-auto">
              <a href="https://wa.me/6282233430596"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2
                            bg-kwt-orange text-white
                            px-6 py-3 rounded-full
                            text-sm font-semibold
                            hover:bg-orange-600
                            hover:-translate-y-0.5
                            hover:shadow-xl
                            hover:shadow-kwt-orange/30
                            active:scale-95
                            transition-all duration-200
                            w-full sm:w-auto
                            justify-center">
                <Phone className="w-4 h-4" />
                Hubungi WhatsApp
              </a>

              <a href="https://www.instagram.com/kwtdewisri09"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2
                            bg-white text-black
                            px-6 py-3 rounded-full
                            text-sm font-semibold
                            hover:bg-white/90
                            hover:-translate-y-0.5
                            active:scale-95
                            transition-all duration-200
                            w-full sm:w-auto
                            justify-center">
                <Instagram className="w-4 h-4" />
                Ikuti Instagram
              </a>
            </div>

            {/* Info kontak kecil di bawah tombol */}
            <div className="flex flex-col sm:flex-row 
                            items-center gap-3 lg:gap-6
                            pt-6 border-t border-black/10
                            w-full justify-center mt-2">

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full
                                bg-white/40
                                flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-black/70" />
                </div>
                <span className="text-black/60 text-xs">
                  Jl. GBA 2 No.12, Cipagalo
                </span>
              </div>

              <div className="hidden sm:block w-px h-3 
                              bg-black/10" />

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full
                                bg-white/40
                                flex items-center justify-center">
                  <Phone className="w-3 h-3 text-black/70" />
                </div>
                <span className="text-black/60 text-xs">
                  0822-3343-0596
                </span>
              </div>

              <div className="hidden sm:block w-px h-3 
                              bg-black/10" />

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full
                                bg-white/40
                                flex items-center justify-center">
                  <Clock className="w-3 h-3 text-black/70" />
                </div>
                <span className="text-black/60 text-xs">
                  09.00 – selesai
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// Loading skeleton
// ─────────────────────────────────────────────
const PageSkeleton = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
    <div className="w-16 h-16 rounded-full border-4 border-kwt-lime border-t-transparent animate-spin" />
    <p className="text-white/40 text-sm tracking-widest uppercase">Memuat konten…</p>
  </div>
);

// ─────────────────────────────────────────────
// HomePage — CMS-driven, strict follow JSON
// ─────────────────────────────────────────────
export const HomePage = () => {
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    getPageSafe('home')
      .then((data) => {
        setPage(data);
        setLoading(false);
        if (!data) setUseFallback(true);
      })
      .catch(() => {
        setLoading(false);
        setUseFallback(true);
      });
  }, []);

  if (loading) return <PageSkeleton />;

  // ── CMS aktif & ada konten → render blok-blok dari CMS ──
  if (page && page.content && page.content.length > 0) {
    return <BlockRenderer blocks={page.content} />;
  }

  // ── Fallback: tampilan statis jika CMS kosong / gagal ──
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ProfileSection />
      <GallerySection />
      <NewsSection />
      <ContactSection />
    </>
  );
};
