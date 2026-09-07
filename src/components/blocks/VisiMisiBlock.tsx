import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Target, 
  Sprout, 
  Leaf, 
  Home, 
  TrendingUp, 
  ShoppingBag, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import type { RichTextBlockData } from '../../lib/types';

interface VisiMisiBlockProps {
  data: RichTextBlockData;
  programsData?: Array<{
    id: string;
    headline: string;
    sub_headline?: string;
    labels?: string[];
  }>;
}

const DEFAULT_VISI = 'Menjadi Kelompok Wanita Tani yang mandiri, inovatif, dan berkelanjutan dalam mewujudkan ketahanan pangan serta pemberdayaan ekonomi perempuan.';

const DEFAULT_MISI = [
  'Mengoptimalkan pemanfaatan lahan fasilitas umum menjadi kawasan pertanian produktif.',
  'Mengoptimalkan pekarangan rumah dengan pertanian perkotaan (urban farming).',
  'Mengembangkan budidaya tanaman pangan, tanaman organik, dan Tanaman Obat Keluarga (TOGA).',
  'Menghijaukan lahan tidur jadi kebun produktif.',
  'Meningkatkan ekonomi, ketrampilan dan kapasitas anggota melalui pelatihan serta kerjasama dengan berbagai pihak.',
  'Menjadi wadah pengembangan UMKM perempuan di lingkungan RW 09.',
  'Menumbuhkan kesadaran masyarakat terhadap pentingnya pertanian, lingkungan, dan ketahanan pangan.'
];

const MISI_ICONS = [
  Sprout,
  Home,
  Leaf,
  Sparkles,
  TrendingUp,
  ShoppingBag,
  HeartHandshake
];

function parseVisiMisiContent(html?: string) {
  if (!html) return { visi: DEFAULT_VISI, misi: DEFAULT_MISI };

  const cleanText = html
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(h[1-6]|p|li|div)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim();

  const visiRegex = /visi\s*([\s\S]*?)(?=misi|$)/i;
  const misiRegex = /misi\s*([\s\S]*)$/i;

  const visiMatch = cleanText.match(visiRegex);
  const misiMatch = cleanText.match(misiRegex);

  let visi = '';
  if (visiMatch && visiMatch[1]) {
    visi = visiMatch[1]
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ');
  }

  const misi: string[] = [];
  if (misiMatch && misiMatch[1]) {
    const lines = misiMatch[1].split('\n').map(s => s.trim()).filter(Boolean);
    let currentPoint = '';

    for (const line of lines) {
      if (line.startsWith('-') || line.startsWith('•') || /^\d+[\.\)]/.test(line)) {
        if (currentPoint) {
          misi.push(currentPoint.trim());
        }
        currentPoint = line.replace(/^[-•\d\.\)]+\s*/, '');
      } else {
        if (currentPoint) {
          currentPoint += ' ' + line;
        } else {
          currentPoint = line;
        }
      }
    }
    if (currentPoint) {
      misi.push(currentPoint.trim());
    }
  }

  return {
    visi: visi || DEFAULT_VISI,
    misi: misi.length > 0 ? misi : DEFAULT_MISI
  };
}

export const VisiMisiBlock: React.FC<VisiMisiBlockProps> = ({ data, programsData }) => {
  const { visi, misi } = parseVisiMisiContent(data?.content);

  return (
    <section id="visi-misi" className="relative bg-[#F7F7F2] py-20 lg:py-32 overflow-hidden border-t border-gray-100/60">
      {/* Background Decorative Gradients & Pattern */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-kwt-lime/20 blur-[140px]" />
        <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-kwt-orange/15 blur-[140px]" />
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` 
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-white border border-gray-200/80 px-5 py-2 rounded-full shadow-sm mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-kwt-orange animate-pulse" />
            <span className="text-kwt-orange text-xs font-black uppercase tracking-[0.4em]">
              Direction & Purpose
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.15] mb-6"
          >
            Visi & Misi <br />
            <span className="text-[#8da136] italic font-semibold">Komitmen Berkelanjutan</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 font-dm text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Prinsip dan langkah nyata kami dalam membangun kemandirian ekonomi, kedaulatan pangan, dan kelestarian lingkungan hidup bagi masyarakat.
          </motion.p>
        </div>

        {/* ── CARD VISI (FEATURED HERO CARD) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 lg:mb-20 rounded-[32px] overflow-hidden bg-black text-white p-8 sm:p-12 lg:p-16 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.3)] border border-white/10"
        >
          {/* Decorative Backdrops */}
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-kwt-lime/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-kwt-orange/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left badge & title */}
            <div className="lg:col-span-4 flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
                <Compass className="w-4 h-4 text-kwt-lime" />
                <span className="text-kwt-lime text-xs font-bold uppercase tracking-widest">
                  Visi Utama
                </span>
              </div>
              <h3 className="font-playfair text-3xl sm:text-4xl font-bold leading-tight text-white">
                Arah Pandang <br />
                <span className="text-white/70 font-normal italic">Masa Depan</span>
              </h3>
              <div className="w-12 h-1 bg-kwt-orange rounded-full mt-1" />
            </div>

            {/* Right quote */}
            <div className="lg:col-span-8 bg-white/5 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/10">
              <p className="font-playfair text-xl sm:text-2xl lg:text-3xl font-medium leading-snug text-white/95 italic">
                "{visi}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── MISI GRID (ACTION PILLARS) ── */}
        <div className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-kwt-orange" />
              <h3 className="font-dm text-xs sm:text-sm font-black text-gray-400 uppercase tracking-[0.3em]">
                7 Langkah Misi Strategis
              </h3>
            </div>
            <div className="h-[1px] flex-1 bg-gray-200 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {misi.map((item, index) => {
              const IconComponent = MISI_ICONS[index % MISI_ICONS.length] || CheckCircle2;
              const formattedNumber = String(index + 1).padStart(2, '0');

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="group relative bg-white p-7 sm:p-8 rounded-[24px] border border-gray-100 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(240,93,35,0.15)] hover:border-kwt-orange/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon & Number Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-kwt-lime/20 text-[#677b19] flex items-center justify-center group-hover:bg-kwt-orange group-hover:text-white transition-all duration-300 shadow-sm">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="font-playfair text-2xl font-bold text-gray-200 group-hover:text-kwt-orange/30 transition-colors duration-300">
                        {formattedNumber}
                      </span>
                    </div>

                    {/* Mission Text */}
                    <p className="text-gray-700 font-dm text-sm sm:text-base leading-relaxed group-hover:text-black transition-colors">
                      {item}
                    </p>
                  </div>

                  {/* Bottom subtle accent line */}
                  <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-kwt-orange to-kwt-lime rounded-full mt-6 transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── ADDITIONAL PROGRAMS & COLLABORATION HIGHLIGHTS (IF PRESENT IN CMS) ── */}
        {programsData && programsData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-gray-200/80">
            {programsData.map((prog, pIdx) => {
              const isCollab = prog.headline.toLowerCase().includes('kolaborasi');
              return (
                <motion.div
                  key={prog.id || pIdx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pIdx * 0.15, duration: 0.6 }}
                  className="bg-white p-8 sm:p-10 rounded-[28px] border border-gray-100 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.06)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      {isCollab ? (
                        <div className="w-10 h-10 rounded-xl bg-kwt-orange/15 text-kwt-orange flex items-center justify-center">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-kwt-lime/25 text-[#677b19] flex items-center justify-center">
                          <Target className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-black tracking-widest uppercase text-gray-400">
                          {isCollab ? 'Kemitraan & Sinergi' : 'Fokus Program'}
                        </span>
                        <h4 className="font-playfair text-2xl font-bold text-black">
                          {prog.headline}
                        </h4>
                      </div>
                    </div>

                    {prog.sub_headline && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 font-dm">
                        {prog.sub_headline}
                      </p>
                    )}

                    {prog.labels && prog.labels.length > 0 && (
                      <div className="flex flex-wrap gap-2.5 mt-4">
                        {prog.labels.map((lbl, lIdx) => (
                          <span
                            key={lIdx}
                            className="inline-flex items-center gap-2 bg-[#F7F7F2] border border-gray-200/70 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold hover:border-kwt-orange/40 hover:bg-kwt-orange/5 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-kwt-orange shrink-0" />
                            {lbl}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
