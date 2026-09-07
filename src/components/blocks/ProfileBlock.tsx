import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { RichTextBlockData, TestimonialsBlockData } from '../../lib/types';

interface ProfileBlockProps {
  richTextData?: RichTextBlockData;
  testimonialsData?: TestimonialsBlockData;
}

const DEFAULT_TESTIMONIALS = [
  {
    id: '1',
    category: 'Ketua Kelompok',
    quote: 'Kami tidak hanya berkebun bersama, kami saling menguatkan. Setiap anggota membawa semangat yang luar biasa untuk kemajuan kelompok.',
    name: 'Ibu Hj. Siti Aminah',
    role: 'Ketua KWT Dewi Sri',
  },
  {
    id: '2',
    category: 'Kebersamaan',
    quote: 'Yang paling berkesan adalah kebersamaannya. Kami seperti keluarga besar yang saling membantu dan mendukung satu sama lain.',
    name: 'Ibu Nurhayati',
    role: 'Anggota sejak 2018',
  },
  {
    id: '3',
    category: 'Dampak Ekonomi',
    quote: 'Dulu saya hanya mengandalkan suami. Sekarang saya punya penghasilan sendiri dari hasil kebun dan produk olahan bersama kelompok.',
    name: 'Ibu Wulandari',
    role: 'Anggota sejak 2018',
  },
  {
    id: '4',
    category: 'Anggota Aktif',
    quote: 'Bergabung dengan KWT Dewi Sri mengubah cara pandang saya tentang bertani. Saya belajar banyak hal baru dan kini lebih mandiri secara ekonomi.',
    name: 'Ibu Suryati',
    role: 'Anggota sejak 2019',
  },
];

// Clean empty tags, non-breaking spaces, and merge broken multiline paragraphs into unified paragraphs
export const cleanRichTextHtml = (html: string): string => {
  if (!html) return '';

  // Standardize spaces and nbsp
  let normalized = html
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00A0/g, ' ')
    .trim();

  // Empty p tags (like <p></p> or <p><br></p> or <p> </p>) represent paragraph breaks between blocks
  const PARA_BREAK = '___PARAGRAPH_BREAK___';
  normalized = normalized.replace(/<p>(\s|<br\s*\/?>)*<\/p>/gi, PARA_BREAK);

  // Split by paragraph break
  const chunks = normalized.split(PARA_BREAK);

  const processedChunks = chunks.map((chunk) => {
    const trimmedChunk = chunk.trim();
    if (!trimmedChunk) return null;

    // Check if chunk has <p> tags
    if (/<p[\s>]/i.test(trimmedChunk)) {
      const pMatches: string[] = [];
      const regex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(trimmedChunk)) !== null) {
        const inner = match[1].trim();
        if (inner && inner !== '<br>' && inner !== '<br/>') {
          pMatches.push(inner);
        }
      }

      // Extract non-<p> content (e.g. <h1>, <h2>, etc.)
      const nonPContent = trimmedChunk.replace(/<p[^>]*>[\s\S]*?<\/p>/gi, '').trim();

      if (pMatches.length > 0) {
        // Merge lines into single cohesive paragraph, joining with space and cleaning up extra whitespace
        const mergedText = pMatches.join(' ').replace(/\s+/g, ' ').trim();
        const mergedParagraph = `<p>${mergedText}</p>`;
        return nonPContent ? `${nonPContent}\n${mergedParagraph}` : mergedParagraph;
      }
      return nonPContent || null;
    }
    return trimmedChunk;
  }).filter(Boolean);

  return processedChunks.join('\n');
};

export const ProfileBlock: React.FC<ProfileBlockProps> = ({
  richTextData,
  testimonialsData,
}) => {
  // Testimonials normalization
  const rawItems = testimonialsData?.items && testimonialsData.items.length > 0
    ? testimonialsData.items
    : DEFAULT_TESTIMONIALS;

  const testimonials = rawItems.map((item: any, idx: number) => ({
    id: item.id || String(idx),
    category: testimonialsData?.title || item.category || item.author_role || 'Testimonial',
    quote: item.content || item.quote || '',
    name: item.author_name || item.name || 'Anonim',
    role: item.author_role || item.role || 'Anggota KWT Dewi Sri',
    image: item.author_image || item.image || null,
  })).filter(t => t.quote.trim() !== '');

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Image handling: from richTextData images if provided, or testimonialsData image, or local static asset
  let photoUrl = '/foto-anggota-kwt-dewisri.jpg';
  if (richTextData?.images && richTextData.images.length > 0) {
    const firstImg = richTextData.images[0];
    if (typeof firstImg === 'string' && firstImg.trim() !== '') {
      photoUrl = firstImg;
    } else if (typeof firstImg === 'object' && firstImg !== null && 'url' in firstImg && typeof (firstImg as any).url === 'string') {
      photoUrl = (firstImg as any).url;
    }
  }

  // Content handling
  const rawContent = richTextData?.content || '';
  const cleanedContent = cleanRichTextHtml(rawContent);
  const hasHeadingInContent = /<h[1-6]/i.test(cleanedContent);

  return (
    <section id="profile" className="relative bg-[#FBFBFA] pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-kwt-lime/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-kwt-orange/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Stacked Depth Frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group w-full max-w-[480px] mx-auto lg:mx-0 order-2 lg:order-1 pr-6 pb-6 pt-2 lg:pt-0"
          >
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              {/* Layer 3 — background decorative lime frame */}
              <div className="absolute top-4 left-4 lg:top-8 lg:left-8 w-full h-full rounded-2xl bg-kwt-lime/30 border border-kwt-lime/40 transition-all duration-500 lg:group-hover:top-10 lg:group-hover:left-10" />

              {/* Layer 2 — middle decorative orange frame */}
              <div className="absolute top-2 left-2 lg:top-4 lg:left-4 w-full h-full rounded-2xl bg-kwt-orange/20 border border-kwt-orange/30 shadow-xl transition-all duration-500 lg:group-hover:top-5 lg:group-hover:left-5" />

              {/* Layer 1 — main photo */}
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 transition-all duration-500 lg:group-hover:shadow-black/60">
                <img
                  src={photoUrl}
                  alt="Kegiatan KWT Dewi Sri"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                {/* Bottom banner on photo */}
                <div className="absolute bottom-0 left-0 right-0 bg-kwt-orange px-4 py-3 lg:px-6 lg:py-4 flex items-center justify-between">
                  <span className="text-white text-xs lg:text-base font-bold font-playfair">
                    KWT Dewi Sri · Bojongsoang
                  </span>
                  <span className="text-white/80 text-[10px] lg:text-xs font-bold tracking-widest uppercase">
                    Est. 2018
                  </span>
                </div>
              </div>

              {/* Floating badge top right */}
              <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 z-20 bg-black text-white px-3 py-1.5 lg:px-5 lg:py-2.5 rounded-full text-[10px] lg:text-sm font-bold uppercase tracking-widest border border-kwt-lime/40 shadow-xl">
                ✦ Sejak 2018
              </div>
            </div>
          </motion.div>

          {/* Right Column: Info Content & Rich Text & Testimonial Slider */}
          <div className="flex flex-col order-1 lg:order-2 lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Badge "THE COLLECTIVE" */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[3px] w-14 bg-kwt-orange" />
                <span className="text-kwt-orange text-sm font-black uppercase tracking-[0.6em]">
                  The Collective
                </span>
                <div className="h-[1px] flex-1 bg-gray-100" />
              </div>

              {/* Rich Text from CMS */}
              {cleanedContent ? (
                <div className="rich-text-profile mb-8 lg:mb-10 max-w-xl">
                  {!hasHeadingInContent && (
                    <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                      Profil Kelompok <br />
                      <span className="text-[#8da136] italic font-semibold">Wanita Tani</span>
                    </h2>
                  )}
                  <div
                    dangerouslySetInnerHTML={{ __html: cleanedContent }}
                  />
                </div>
              ) : (
                <>
                  <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                    Profil Kelompok <br />
                    <span className="text-[#8da136] italic font-semibold">Wanita Tani</span>
                  </h2>
                  <p className="text-gray-500 font-dm text-base md:text-lg leading-relaxed mb-8 lg:mb-10 max-w-xl">
                    Kelompok Wanita Tani (KWT) Dewi Sri 09 GBA 2 Bojongsoang, Kabupaten Bandung, merupakan komunitas perempuan pelaku UMKM yang aktif dalam memproduksi dan memasarkan hasil pertanian serta kerajinan lokal.
                  </p>
                </>
              )}
            </motion.div>

            {/* Testimonials Slider Widget */}
            {testimonials.length > 0 && (
              <div className="relative min-h-[300px] sm:min-h-[280px] lg:min-h-[300px] mt-4 mb-16 lg:mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 40, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10 rounded-[28px] lg:rounded-[30px] bg-white border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] group cursor-default h-full flex flex-col justify-center">
                      <div className="relative z-10 flex flex-col gap-5">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-2 rounded-full bg-kwt-lime" />
                            <h4 className="font-dm text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
                              {testimonials[current].category}
                            </h4>
                          </div>
                          
                          <p className="font-playfair text-lg sm:text-xl lg:text-2xl font-bold text-black leading-snug mb-5 italic">
                            "{testimonials[current].quote}"
                          </p>

                          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                            {testimonials[current].image ? (
                              <img
                                src={testimonials[current].image!}
                                alt={testimonials[current].name}
                                className="w-9 h-9 lg:w-10 lg:h-10 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-kwt-orange/15 flex items-center justify-center text-kwt-orange text-xs lg:text-sm font-bold shrink-0">
                                {testimonials[current].name.trim().split(' ').slice(-1)[0].charAt(0).toUpperCase()}
                              </div>
                            )}
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
                <div className="absolute -bottom-12 lg:-bottom-14 left-0 right-0 flex items-center justify-between px-2">
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                        className={`h-1.5 transition-all duration-500 rounded-full ${
                          index === current ? 'w-10 bg-kwt-orange' : 'w-2 bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                      aria-label="Previous testimonial"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black bg-white transition-all shadow-sm active:scale-95"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
                      aria-label="Next testimonial"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black bg-white transition-all shadow-sm active:scale-95"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
