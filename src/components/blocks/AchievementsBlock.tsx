import React from 'react';
import { motion } from 'motion/react';
import type { FeaturesBlockData, RichTextBlockData } from '../../lib/types';

interface PrestasiItem {
  number: string;
  category: string;
  title: string;
  description: string;
  highlightText?: string;
  authorOrPartner?: string;
}

const DEFAULT_PRESTASI_LIST: PrestasiItem[] = [
  {
    number: '01',
    category: 'Riset Akademik · UNPAD',
    title: 'Penelitian Skripsi Sarjana Universitas Padjadjaran',
    description: 'Menjadi tempat penelitian mahasiswa yang menghasilkan kajian mengenai dinamika kelompok dan pemberdayaan KWT di wilayah perkotaan.',
    highlightText: '“ANALISIS DINAMIKA KELOMPOK PADA KWT DI PINGGIRAN KOTA (STUDI KASUS DI KWT DEWI SRI 09, DESA CIPAGALO, KABUPATEN BANDUNG)”',
    authorOrPartner: 'Oleh: Marifah Tursina (Mahasiswa UNPAD)',
  },
  {
    number: '02',
    category: 'Penghargaan Nasional · Innovillage',
    title: 'Penghargaan “Best Local Hero” Innovillage',
    description: 'Meraih penghargaan “Best Local Hero” Innovillage atas kontribusi nyata dalam pemberdayaan dan pengembangan pertanian perkotaan.',
    highlightText: 'Kolaborasi riset terapan bersama tim URBAN FLOW (Telkom University) dalam Lomba Innovillage se-Indonesia kerjasama PT. Danantara Indonesia.',
    authorOrPartner: 'Kolaborasi: Tim URBAN FLOW (Telkom University) & PT Danantara Indonesia',
  },
  {
    number: '03',
    category: 'Pemberdayaan Wilayah · RW 09',
    title: 'Pengembangan Jejaring Kebun Binaan RW 09',
    description: 'Membina dan mengembangkan kebun binaan di lingkungan RW 09 untuk memperluas manfaat ketahanan pangan dan kemandirian masyarakat.',
    highlightText: 'Pemberdayaan pekarangan dan fasilitas umum warga di berbagai titik lingkungan RW 09 Griya Bandung Asri 2.',
    authorOrPartner: 'Kader KWT Dewi Sri 09 & Warga RW 09',
  },
];

function getCategoryForPrestasi(title: string, index: number, labels?: string[], alamat?: string | null): string {
  if (labels && labels.length > 0) {
    return labels.join(' · ');
  }
  if (alamat) return alamat;

  const t = title.toLowerCase();
  if (t.includes('padjadjaran') || t.includes('unpad') || t.includes('skripsi')) {
    return 'Riset Akademik · UNPAD';
  }
  if (t.includes('innovillage') || t.includes('local hero') || t.includes('penghargaan')) {
    return 'Penghargaan Nasional · Innovillage';
  }
  if (t.includes('kebun binaan') || t.includes('rw 09') || t.includes('jejaring')) {
    return 'Pemberdayaan Wilayah · RW 09';
  }
  return `Prestasi 0${index + 1}`;
}

function getHighlightForPrestasi(title: string, index: number, linkUrl?: string | null): string | undefined {
  if (linkUrl && linkUrl.trim()) return linkUrl;

  const t = title.toLowerCase();
  if (t.includes('padjadjaran') || t.includes('skripsi')) {
    return '“ANALISIS DINAMIKA KELOMPOK PADA KWT DI PINGGIRAN KOTA (STUDI KASUS DI KWT DEWI SRI 09, DESA CIPAGALO, KABUPATEN BANDUNG)”';
  }
  if (t.includes('innovillage') || t.includes('local hero')) {
    return 'Kolaborasi riset terapan bersama tim URBAN FLOW (Telkom University) dalam Lomba Innovillage se-Indonesia kerjasama PT. Danantara Indonesia.';
  }
  if (t.includes('kebun binaan') || t.includes('rw 09')) {
    return 'Pemberdayaan pekarangan dan fasilitas umum warga di berbagai titik lingkungan RW 09 Griya Bandung Asri 2.';
  }
  return DEFAULT_PRESTASI_LIST[index]?.highlightText;
}

function getAuthorForPrestasi(title: string, index: number, iconUrl?: string | null): string | undefined {
  if (iconUrl && iconUrl.trim()) return iconUrl;

  const t = title.toLowerCase();
  if (t.includes('padjadjaran') || t.includes('skripsi')) {
    return 'Oleh: Marifah Tursina (Mahasiswa UNPAD)';
  }
  if (t.includes('innovillage') || t.includes('local hero')) {
    return 'Kolaborasi: Tim URBAN FLOW (Telkom University) & PT Danantara Indonesia';
  }
  if (t.includes('kebun binaan') || t.includes('rw 09')) {
    return 'Kader KWT Dewi Sri 09 & Warga RW 09';
  }
  return DEFAULT_PRESTASI_LIST[index]?.authorOrPartner;
}

interface AchievementsBlockProps {
  data?: FeaturesBlockData | RichTextBlockData | any;
}

export const AchievementsBlock: React.FC<AchievementsBlockProps> = ({ data }) => {
  // Normalize items from CMS (Features block format)
  let sectionTitle = 'Prestasi & Dampak Nyata';
  let sectionSubtitle = 'Pencapaian, kolaborasi, dan kontribusi nyata KWT Dewi Sri 09 bagi masyarakat.';
  let items: PrestasiItem[] = DEFAULT_PRESTASI_LIST;

  if (data) {
    if (data.title) sectionTitle = data.title;
    if (data.subtitle) sectionSubtitle = data.subtitle;

    if (Array.isArray(data.items) && data.items.length > 0) {
      items = data.items.map((item: any, idx: number) => {
        const num = String(idx + 1).padStart(2, '0');
        const title = item.title || `Prestasi ${idx + 1}`;
        const description = item.description || '';
        const category = getCategoryForPrestasi(title, idx, item.labels, item.alamat);
        const highlightText = getHighlightForPrestasi(title, idx, item.link_url);
        const authorOrPartner = getAuthorForPrestasi(title, idx, item.icon_url);

        return {
          number: num,
          category,
          title,
          description,
          highlightText,
          authorOrPartner,
        };
      });
    }
  }

  return (
    <section id="prestasi" className="relative bg-[#0D110E] text-white py-20 lg:py-28 overflow-hidden border-t border-white/10">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-kwt-lime/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-kwt-orange/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full mb-5"
          >
            <div className="w-2 h-2 rounded-full bg-kwt-lime animate-pulse" />
            <span className="text-kwt-lime text-xs font-black uppercase tracking-[0.35em]">
              Prestasi
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] mb-5 text-white"
          >
            {sectionTitle.includes('&') ? (
              <>
                {sectionTitle.split('&')[0]} & <span className="text-kwt-lime italic font-semibold">{sectionTitle.split('&')[1]}</span>
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
            className="text-white/70 font-dm text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {sectionSubtitle}
          </motion.p>
        </div>

        {/* ── 3 CLEAN & DESCRIPTIVE INTERACTIVE CARDS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-[#131914] rounded-[24px] p-8 border border-white/10 hover:border-kwt-lime/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] flex flex-col justify-between cursor-default"
            >
              <div>
                {/* Top Row: Category Tag + Number */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-kwt-lime bg-kwt-lime/10 border border-kwt-lime/25 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="font-playfair text-2xl font-bold text-white/30 group-hover:text-kwt-lime/60 transition-colors">
                    {item.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-playfair text-2xl font-bold text-white mb-4 leading-snug group-hover:text-kwt-lime transition-colors">
                  {item.title}
                </h3>

                {/* Main Description */}
                <p className="text-white/75 font-dm text-sm sm:text-base leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Highlight Quote Box */}
                {item.highlightText && (
                  <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 mb-4 group-hover:bg-white/[0.08] transition-colors">
                    <p className="font-playfair text-sm sm:text-base text-white/90 italic leading-relaxed">
                      {item.highlightText}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer info: Author or Partner */}
              {item.authorOrPartner && (
                <div className="pt-4 mt-2 border-t border-white/10 text-xs text-white/60 font-dm">
                  <span className="text-kwt-orange font-semibold">✦ </span>
                  {item.authorOrPartner}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
