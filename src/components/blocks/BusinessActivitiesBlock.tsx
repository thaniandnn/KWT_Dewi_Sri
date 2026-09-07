import React from 'react';
import { motion } from 'motion/react';
import type { FeaturesBlockData, RichTextBlockData } from '../../lib/types';

interface ActivityPillar {
  number: string;
  tag: string;
  tagBadge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  accentColor: string;
}

const DEFAULT_ACTIVITIES: ActivityPillar[] = [
  {
    number: '01',
    tag: 'Budidaya Berkelanjutan',
    tagBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    title: 'Budidaya Tanaman',
    subtitle: 'Hidroponik, Aquaponik & Tanaman Organik',
    description: 'Menanam sayuran hidroponik, aquaponik, dan organik (aneka tanaman sayuran dan TOGA) di Taman Edukasi Kebun KWT Dewi Sri serta pemanfaatan lahan kosong / Fasum RT di wilayah komplek GBA 2 RW 09.',
    highlights: [
      'Sayuran Hidroponik',
      'Sistem Aquaponik',
      'Tanaman Organik & TOGA',
      'Pemanfaatan Fasum RT',
    ],
    accentColor: 'from-emerald-500 to-lime-500',
  },
  {
    number: '02',
    tag: 'Hilirisasi & UMKM',
    tagBadge: 'bg-orange-50 text-kwt-orange border-orange-200/80',
    title: 'Pengolahan Pangan',
    subtitle: 'Produksi Makanan & Minuman Sehat Hasil Kebun',
    description: 'Memproduksi olahan sehat berkualitas dari hasil kebun, seperti minuman jus segar, keripik bayam renyah, serta aneka olahan minuman dan makanan bergizi untuk meningkatkan ekonomi anggota.',
    highlights: [
      'Minuman Jus Segar',
      'Keripik Bayam Renyah',
      'Olahan Pangan Sehat',
      'Produk UMKM Lokal',
    ],
    accentColor: 'from-kwt-orange to-amber-500',
  },
  {
    number: '03',
    tag: 'Edutourism & Riset',
    tagBadge: 'bg-amber-50 text-amber-800 border-amber-200/80',
    title: 'Edukasi dan Wisata',
    subtitle: 'Sarana Belajar Masyarakat & Laboratorium Riset',
    description: 'Menjadikan kebun KWT sebagai lokasi edutourisme bagi masyarakat dan sekolah, sarana pelatihan pertanian perkotaan, serta pusat riset dan penelitian mahasiswa.',
    highlights: [
      'Lokasi Edutourisme',
      'Kunjungan Sekolah',
      'Tempat Penelitian Kampus',
      'Pelatihan Pertanian',
    ],
    accentColor: 'from-amber-500 to-lime-600',
  },
];

interface BusinessActivitiesBlockProps {
  data?: FeaturesBlockData | RichTextBlockData | any;
}

export const BusinessActivitiesBlock: React.FC<BusinessActivitiesBlockProps> = ({ data }) => {
  let sectionTitle = 'Bidang Usaha & Kegiatan Utama';
  let sectionSubtitle = 'Tiga fokus utama KWT Dewi Sri 09 dalam memajukan kemandirian pangan, pengembangan produk UMKM, dan sarana edukasi masyarakat.';
  let items: ActivityPillar[] = DEFAULT_ACTIVITIES;

  if (data) {
    if (data.title) sectionTitle = data.title;
    if (data.subtitle) sectionSubtitle = data.subtitle;

    if (Array.isArray(data.items) && data.items.length > 0) {
      items = data.items.map((item: any, idx: number) => {
        const fallback = DEFAULT_ACTIVITIES[idx % DEFAULT_ACTIVITIES.length];
        const num = String(idx + 1).padStart(2, '0');
        const labels = item.labels && item.labels.length > 0 ? item.labels : fallback.highlights;

        return {
          number: num,
          tag: item.alamat || fallback.tag,
          tagBadge: fallback.tagBadge,
          title: item.title || fallback.title,
          subtitle: item.link_url || fallback.subtitle,
          description: item.description || fallback.description,
          highlights: labels,
          accentColor: fallback.accentColor,
        };
      });
    }
  }

  return (
    <section id="bidang-usaha" className="relative bg-[#F8F8F3] py-20 lg:py-32 overflow-hidden border-t border-gray-200/70">
      
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/3 left-[-5%] w-[500px] h-[500px] rounded-full bg-kwt-lime/20 blur-[130px]" />
        <div className="absolute bottom-1/4 right-[-5%] w-[500px] h-[500px] rounded-full bg-kwt-orange/15 blur-[140px]" />
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` 
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-white border border-gray-200/90 px-5 py-2 rounded-full shadow-sm mb-5"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-kwt-orange animate-pulse" />
            <span className="text-kwt-orange text-xs font-black uppercase tracking-[0.35em]">
              Pilar Program
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.15] mb-5"
          >
            {sectionTitle.includes('&') ? (
              <>
                {sectionTitle.split('&')[0]} & <br className="hidden sm:inline" />
                <span className="text-[#8da136] italic font-semibold">{sectionTitle.split('&')[1]}</span>
              </>
            ) : sectionTitle.includes('DAN') ? (
              <>
                {sectionTitle.split('DAN')[0]} <br className="hidden sm:inline" />
                <span className="text-[#8da136] italic font-semibold">& {sectionTitle.split('DAN')[1]}</span>
              </>
            ) : (
              sectionTitle
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 font-dm text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {sectionSubtitle}
          </motion.p>
        </div>

        {/* ── 3 PILLARS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.55 }}
              className="group relative bg-white rounded-[28px] p-8 sm:p-10 border border-gray-200/90 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_50px_-12px_rgba(240,93,35,0.18)] hover:border-kwt-orange/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Tag Pill + Number */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${item.tagBadge}`}>
                    {item.tag}
                  </span>
                  <span className="font-playfair text-3xl font-bold text-gray-300 group-hover:text-kwt-orange/40 transition-colors">
                    {item.number}
                  </span>
                </div>

                {/* Main Title */}
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 leading-snug group-hover:text-kwt-orange transition-colors">
                  {item.title}
                </h3>

                {/* Subtitle */}
                {item.subtitle && (
                  <p className="text-xs font-bold uppercase tracking-wider text-[#8da136] mb-4 font-dm">
                    {item.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-gray-600 font-dm text-sm sm:text-base leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Highlight Chips */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 mb-4">
                    {item.highlights.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="inline-flex items-center gap-1.5 bg-[#F7F7F2] border border-gray-200/80 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-xl group-hover:bg-kwt-orange/5 group-hover:border-kwt-orange/30 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-kwt-orange shrink-0" />
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Decorative Accent Bar */}
              <div className={`w-0 group-hover:w-full h-1 bg-gradient-to-r ${item.accentColor} rounded-full mt-4 transition-all duration-500`} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
