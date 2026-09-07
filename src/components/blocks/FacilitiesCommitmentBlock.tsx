import React from 'react';
import { motion } from 'motion/react';
import type { FeaturesBlockData, RichTextBlockData } from '../../lib/types';
import { cleanRichTextHtml } from './ProfileBlock';

interface FacilitiesCommitmentBlockProps {
  facilitiesData?: FeaturesBlockData;
  commitmentData?: RichTextBlockData;
}

const DEFAULT_FACILITIES = [
  {
    title: 'Green House (GH) Melon',
    description: 'Rumah kaca khusus untuk budidaya melon dengan perlindungan optimal dari hama serta pengendalian iklim mikro yang presisi.',
  },
  {
    title: 'Instalasi Hidroponik',
    description: 'Sarana budidaya tanaman dengan sistem hidroponik memanfaatkan sirkulasi air bernutrisi tinggi untuk hasil panen segar dan higienis.',
  },
  {
    title: 'Sistem Aquaponik',
    description: 'Sistem budidaya terpadu antara ikan dan tanaman hidroponik dalam ekosistem sirkular alami yang saling memberi nutrisi organik.',
  },
  {
    title: 'Sistem Penyiraman Otomatis',
    description: 'Mendukung perawatan dan penyiraman tanaman secara otomatis berbasis jadwal dan kebutuhan kelembaban.',
  },
  {
    title: 'Gazebo',
    description: 'Tempat berkumpul, berdiskusi, dan sarana pelatihan keterampilan bagi anggota kelompok maupun masyarakat.',
  },
  {
    title: 'Taman Edukasi',
    description: 'Sarana pembelajaran pertanian bagi masyarakat, pelajar, dan generasi muda untuk mengenal pertanian perkotaan.',
  },
];

const TAG_MAP: Record<string, { tag: string; badgeStyle: string }> = {
  'green house': { tag: 'Fasilitas Unggulan', badgeStyle: 'bg-orange-50 text-kwt-orange border-orange-200/60' },
  'hidroponik': { tag: 'Modern Farming', badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' },
  'aquaponik': { tag: 'Simbiosis Alami', badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200/60' },
  'penyiraman': { tag: 'Smart Irrigation', badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200/60' },
  'irigasi': { tag: 'Smart Irrigation', badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200/60' },
  'gazebo': { tag: 'Ruang Komunal', badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200/60' },
  'taman': { tag: 'Sarana Edukasi', badgeStyle: 'bg-lime-50 text-[#5f7413] border-lime-200/60' },
  'edukasi': { tag: 'Sarana Edukasi', badgeStyle: 'bg-lime-50 text-[#5f7413] border-lime-200/60' },
};

const DEFAULT_BADGES = [
  { tag: 'Fasilitas Unggulan', badgeStyle: 'bg-orange-50 text-kwt-orange border-orange-200/60' },
  { tag: 'Modern Farming', badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' },
  { tag: 'Simbiosis Alami', badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200/60' },
  { tag: 'Smart Irrigation', badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200/60' },
  { tag: 'Ruang Komunal', badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200/60' },
  { tag: 'Sarana Edukasi', badgeStyle: 'bg-lime-50 text-[#5f7413] border-lime-200/60' },
];

function getBadgeForFacility(title: string, index: number) {
  const lower = title.toLowerCase();
  for (const [key, val] of Object.entries(TAG_MAP)) {
    if (lower.includes(key)) {
      return val;
    }
  }
  return DEFAULT_BADGES[index % DEFAULT_BADGES.length];
}

function parseCommitmentContent(html?: string) {
  const fallbackParagraphs = [
    'KWT Dewi Sri 09 berkomitmen untuk terus menjadi pusat pembelajaran, pemberdayaan perempuan, pengembangan UMKM, serta pelopor ketahanan pangan berbasis masyarakat.',
    'Melalui semangat gotong royong dan kolaborasi, kami berharap mampu menciptakan lingkungan yang hijau, produktif, mandiri, dan bermanfaat bagi generasi sekarang maupun yang akan datang.'
  ];

  if (!html) {
    return {
      title: 'Komitmen',
      paragraphs: fallbackParagraphs
    };
  }

  const cleaned = cleanRichTextHtml(html);

  // Extract heading if present
  const hMatch = cleaned.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  let title = 'Komitmen';
  if (hMatch && hMatch[1]) {
    const extracted = hMatch[1].replace(/<[^>]+>/g, '').trim();
    if (extracted) title = extracted;
  }

  // Extract paragraphs from <p> tags
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const paragraphs: string[] = [];
  let match;
  while ((match = pRegex.exec(cleaned)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (text) {
      paragraphs.push(text);
    }
  }

  // If no <p> tags found, split by newline
  if (paragraphs.length === 0) {
    const rawLines = cleaned
      .replace(/<[^>]+>/g, '\n')
      .split('\n')
      .map(s => s.trim())
      .filter(s => s && s.toLowerCase() !== title.toLowerCase());
    if (rawLines.length > 0) {
      return { title, paragraphs: rawLines };
    }
  }

  return {
    title,
    paragraphs: paragraphs.length > 0 ? paragraphs : fallbackParagraphs
  };
}

export const FacilitiesCommitmentBlock: React.FC<FacilitiesCommitmentBlockProps> = ({
  facilitiesData,
  commitmentData,
}) => {
  // Normalize Facilities Items from CMS
  const rawItems = facilitiesData?.items && facilitiesData.items.length > 0
    ? facilitiesData.items
    : DEFAULT_FACILITIES;

  const facilities = rawItems.map((item, idx) => {
    const title = item.title || `Fasilitas 0${idx + 1}`;
    // If title is short (like "Green House") and description has the full name (like "Green House (GH) Melon"), format neatly
    const description = item.description || '';
    const badge = getBadgeForFacility(title + ' ' + description, idx);
    const number = String(idx + 1).padStart(2, '0');

    return {
      id: (item as any).id || `facility-${idx}`,
      number,
      title,
      description,
      tag: badge.tag,
      badgeStyle: badge.badgeStyle,
    };
  });

  // Section titles from CMS
  const sectionTitle = facilitiesData?.title || 'Fasilitas';
  const sectionSubtitle = facilitiesData?.subtitle || 'Untuk menunjang berbagai kegiatan, KWT Dewi Sri 09 memiliki berbagai fasilitas pendukung.';

  // Parse Commitment from CMS Rich Text
  const commitment = parseCommitmentContent(commitmentData?.content);

  return (
    <section id="fasilitas-komitmen" className="relative bg-[#FBFBFA] py-20 lg:py-28 overflow-hidden border-t border-gray-100/60">
      
      {/* Background Ambience & Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-32 right-[-10%] w-[500px] h-[500px] rounded-full bg-kwt-orange/15 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-kwt-lime/20 blur-[140px]" />
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
            className="inline-flex items-center gap-3 bg-white border border-gray-200/80 px-5 py-2 rounded-full shadow-sm mb-5"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-kwt-orange animate-pulse" />
            <span className="text-kwt-orange text-xs font-black uppercase tracking-[0.35em]">
              Fasilitas Kebun
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.15] mb-5"
          >
            {sectionTitle} <br />
            <span className="text-[#8da136] italic font-semibold">KWT Dewi Sri 09</span>
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

        {/* ── FASILITAS GRID (6 CLEAN CARDS, NO ICONS) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              className="group relative bg-white rounded-[24px] p-7 sm:p-8 border border-gray-200/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_-12px_rgba(240,93,35,0.15)] hover:border-kwt-orange/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top: Tag Pill + Number */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-[11px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full border ${facility.badgeStyle}`}>
                    {facility.tag}
                  </span>
                  <span className="font-playfair text-2xl font-bold text-gray-300 group-hover:text-kwt-orange/50 transition-colors">
                    {facility.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-kwt-orange transition-colors">
                  {facility.title}
                </h3>

                {/* Description */}
                {facility.description && (
                  <p className="text-gray-600 font-dm text-sm sm:text-base leading-relaxed">
                    {facility.description}
                  </p>
                )}
              </div>

              {/* Bottom Subtle Accent Bar on Hover */}
              <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-kwt-orange to-[#8da136] rounded-full mt-6 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* ── KOMITMEN SECTION (SIMPLE, CLEAN & ELEGANT) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white rounded-[28px] p-8 sm:p-12 lg:p-14 border border-gray-200/90 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          {/* Subtle Left Accent Line */}
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-kwt-orange to-[#8da136]" />

          <div className="max-w-4xl mx-auto">
            {/* Header Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-kwt-orange animate-pulse" />
              <span className="text-kwt-orange text-xs font-black uppercase tracking-[0.35em]">
                {commitment.title}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight mb-8">
              {commitment.title} <span className="text-[#8da136] italic font-semibold">KWT Dewi Sri 09</span>
            </h3>

            {/* Paragraphs */}
            <div className="space-y-5 font-dm">
              {commitment.paragraphs.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-normal"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
