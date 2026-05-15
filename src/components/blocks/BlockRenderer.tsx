import React from 'react';
import type { CmsBlock } from '../../lib/types';
import { HeroBlock } from './HeroBlock';
import { NewsCard } from '../news/NewsCard';
import { newsData } from '../../data/newsData';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../lib/cmsApi';
import type {
  HeroBlockData,
  RichTextBlockData,
  ContactsBlockData,
  GalleryBlockData,
  FeaturesBlockData,
  FaqBlockData,
  TestimonialsBlockData,
  TeamMembersBlockData,
  DynamicPostFeedBlockData,
  ActivitySliderBlockData
} from '../../lib/types';

// ---------- Fallback untuk block yang belum diimplementasi ----------

const PlaceholderBlock: React.FC<{ block: CmsBlock }> = ({ block }) => (
  <section className="py-16 px-6 bg-kwt-offwhite border-b border-gray-100">
    <div className="max-w-4xl mx-auto text-center">
      <span className="inline-block bg-kwt-lime/30 text-kwt-maroon text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
        Block: {block.type}
      </span>
      <p className="text-gray-400 text-sm">Komponen untuk blok tipe <code className="bg-gray-100 px-1 rounded">{block.type}</code> sedang dalam pengembangan.</p>
    </div>
  </section>
);

// ---------- RichText Block ----------

const RichTextBlock: React.FC<{ data: RichTextBlockData }> = ({ data }) => (
  <section className="py-16 px-6 bg-kwt-offwhite">
    <div
      className="max-w-4xl mx-auto prose prose-lg prose-headings:font-playfair prose-headings:text-kwt-maroon"
      dangerouslySetInnerHTML={{ __html: data.content ?? '' }}
    />
  </section>
);

// ---------- Contacts Block ----------

const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16">
    <path fill="currentColor" d="M12.2 10c-1.1-.1-1.7 1.4-2.5 1.8C8.4 12.5 6 10 6 10S3.5 7.6 4.1 6.3c.5-.8 2-1.4 1.9-2.5c-.1-1-2.3-4.6-3.4-3.6C.2 2.4 0 3.3 0 5.1c-.1 3.1 3.9 7 3.9 7c.4.4 3.9 4 7 3.9c1.8 0 2.7-.2 4.9-2.6c1-1.1-2.5-3.3-3.6-3.4z"/>
  </svg>
);

const IconInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const IconLocation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
    <path fill="currentColor" d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4a2 2 0 0 0 0 4z"/>
  </svg>
);

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
    <path fill="currentColor" d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8.414l2.7 2.7-1.414 1.414L9 10.586V5h2v4.586z"/>
  </svg>
);

const ContactsBlock: React.FC<{ data: ContactsBlockData }> = ({ data }) => {
  const d = data as any;
  const socialLinks: { platform: string; url: string }[] = d.social_links ?? [];
  // Fallback values match what's in CMS (in case CMS publish hasn't propagated yet)
  const phoneNumbers: string[] = d.phone_numbers?.length ? d.phone_numbers : ['0822-3343-0596'];
  const addresses: string[] = d.addresses?.length ? d.addresses : ['Jl. GBA 2 No.12, Cipagalo'];
  const workingHours: string = d.working_hours || '09.00 – selesai';

  const whatsappLink = socialLinks.find(s => s.platform.toLowerCase().includes('whatsapp'));
  const instagramLink = socialLinks.find(s => s.platform.toLowerCase().includes('instagram'));

  return (
    <section id="contact" className="w-full">
      <div className="bg-kwt-lime px-6 lg:px-12 py-16 lg:py-24 text-center relative overflow-hidden">
        {/* Subtle decorative blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-kwt-orange/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-5 max-w-2xl mx-auto">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/50 border border-white/60 px-4 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-kwt-orange animate-pulse" />
            <span className="text-black/70 text-[10px] tracking-widest uppercase font-bold">Kontak Kami</span>
          </div>

          {/* Title */}
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
            {d.title || 'Hubungi KWT Dewi Sri'}
          </h2>

          {/* Subtitle */}
          <p className="text-black/60 text-sm lg:text-base leading-relaxed max-w-md">
            Ingin memesan produk UMKM kami atau berkunjung untuk studi banding? Silakan hubungi kami melalui saluran berikut.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
            {whatsappLink && (
              <a
                href={whatsappLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-kwt-orange text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-kwt-orange/30 active:scale-95 transition-all duration-200"
              >
                <IconPhone />
                Hubungi WhatsApp
              </a>
            )}
            {instagramLink && (
              <a
                href={instagramLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold border border-black/10 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all duration-200"
              >
                <IconInstagram />
                Ikuti Instagram
              </a>
            )}
          </div>

          {/* Divider + Info bar */}
          <div className="w-full border-t border-black/10 pt-6 mt-1 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
            {addresses.map((addr, i) => (
              <React.Fragment key={`addr-${i}`}>
                <div className="flex items-center gap-2 text-black/50">
                  <IconLocation />
                  <span className="text-xs">{addr}</span>
                </div>
                <span className="hidden sm:block text-black/20 mx-4">|</span>
              </React.Fragment>
            ))}
            {phoneNumbers.map((ph, i) => (
              <React.Fragment key={`ph-${i}`}>
                <div className="flex items-center gap-2 text-black/50">
                  <IconPhone />
                  <span className="text-xs">{ph}</span>
                </div>
                <span className="hidden sm:block text-black/20 mx-4">|</span>
              </React.Fragment>
            ))}
            <div className="flex items-center gap-2 text-kwt-orange">
              <IconClock />
              <span className="text-xs font-medium">{workingHours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Gallery Block ----------

const GalleryBlock: React.FC<{ data: GalleryBlockData }> = ({ data }) => {
  const images = data.images && data.images.length > 0 ? data.images : (data.items ?? []);
  return (
    <section id="gallery" className="py-20 px-6 bg-black">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        {data.title && (
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">{data.title}</h2>
        )}
        {data.subtitle && (
          <p className="text-gray-400 font-dm text-sm md:text-base leading-relaxed">
            {data.subtitle}
          </p>
        )}
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.slice(0, 6).map((img, i) => (
          <div key={img.id ?? i} className="relative h-[240px] md:h-[280px] rounded-2xl overflow-hidden cursor-pointer group">
            <img src={img.url} alt={img.caption ?? img.alt_text ?? ''} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-300" />
            {img.caption && (
              <p className="absolute bottom-6 left-6 text-white font-bold text-sm md:text-base drop-shadow-lg tracking-wide">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/gallery">
          <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white hover:text-black transition-all duration-300 group">
            Lihat Semua Kegiatan
            <span className="transition-transform duration-300 group-hover:translate-x-1">›</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

// ---------- Features Block ----------

const FeaturesBlock: React.FC<{ data: FeaturesBlockData }> = ({ data }) => (
  <section className="py-20 px-6 bg-kwt-offwhite">
    {data.title && <h2 className="font-playfair text-4xl font-bold text-kwt-maroon text-center mb-12">{data.title}</h2>}
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
      {(data.items ?? []).map((item, i) => (
        <div key={item.id ?? i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="font-playfair text-xl font-bold text-kwt-maroon mb-3">{item.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

// ---------- FAQ Block ----------

const FaqBlock: React.FC<{ data: FaqBlockData }> = ({ data }) => {
  const [open, setOpen] = React.useState<string | null>(null);
  return (
    <section className="py-20 px-6 bg-white">
      {data.title && <h2 className="font-playfair text-4xl font-bold text-kwt-maroon text-center mb-12">{data.title}</h2>}
      <div className="max-w-3xl mx-auto space-y-4">
        {(data.items ?? []).map((item, i) => (
          <div key={item.id ?? i} className="border border-gray-200 rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === item.id ? null : item.id)} className="w-full text-left px-6 py-5 font-semibold text-kwt-maroon flex justify-between items-center">
              {item.question}
              <span className="text-kwt-orange text-xl">{open === item.id ? '−' : '+'}</span>
            </button>
            {open === item.id && <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{item.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------- Testimonials Block (Profile + Slider) ----------

const TestimonialsBlock: React.FC<{ data: TestimonialsBlockData }> = ({ data }) => {
  const [current, setCurrent] = React.useState(0);
  const testimonials = data.items && data.items.length > 0 ? data.items : [
    { id: '1', category: "Anggota Aktif", quote: "Bergabung dengan KWT Dewi Sri mengubah cara pandang saya tentang bertani. Saya belajar banyak hal baru dan kini lebih mandiri secara ekonomi.", name: "Ibu Suryati", role: "Anggota sejak 2019" },
    { id: '2', category: "Ketua Kelompok", quote: "Kami tidak hanya berkebun bersama, kami saling menguatkan. Setiap anggota membawa semangat yang luar biasa untuk kemajuan kelompok.", name: "Ibu Hj. Siti Aminah", role: "Ketua KWT Dewi Sri" },
    { id: '3', category: "Program Pelatihan", quote: "Pelatihan yang diberikan sangat bermanfaat. Saya jadi tahu cara mengolah hasil panen menjadi produk bernilai jual tinggi.", name: "Ibu Ratna", role: "Anggota sejak 2020" },
    { id: '4', category: "Dampak Ekonomi", quote: "Dulu saya hanya mengandalkan suami. Sekarang saya punya penghasilan sendiri dari hasil kebun dan produk olahan bersama kelompok.", name: "Ibu Wulandari", role: "Anggota sejak 2021" },
    { id: '5', category: "Kebersamaan", quote: "Yang paling berkesan adalah kebersamaannya. Kami seperti keluarga besar yang saling membantu dan mendukung satu sama lain.", name: "Ibu Nurhayati", role: "Anggota sejak 2018" }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="profile" className="relative bg-[#FBFBFA] pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-kwt-lime/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-kwt-orange/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Stacked Depth Frame */}
          <div className="relative group w-full max-w-[480px] mx-auto lg:mx-0 order-2 lg:order-1 pr-6 pb-6 pt-2 lg:pt-0">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              <div className="absolute top-4 left-4 lg:top-8 lg:left-8 w-full h-full rounded-2xl bg-kwt-lime/30 border border-kwt-lime/40 transition-all duration-500 lg:group-hover:top-10 lg:group-hover:left-10" />
              <div className="absolute top-2 left-2 lg:top-4 lg:left-4 w-full h-full rounded-2xl bg-kwt-orange/20 border border-kwt-orange/30 shadow-xl transition-all duration-500 lg:group-hover:top-5 lg:group-hover:left-5" />
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 transition-all duration-500 lg:group-hover:shadow-black/60">
                <img 
                  src={(data as any).image ?? "/foto-anggota-kwt-dewisri.jpg"} 
                  alt="Kegiatan KWT Dewi Sri" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 bg-kwt-orange px-4 py-3 lg:px-6 lg:py-4 flex items-center justify-between">
                  <span className="text-white text-xs lg:text-base font-bold font-playfair">KWT Dewi Sri · Bojongsoang</span>
                  <span className="text-white/80 text-[10px] lg:text-xs font-bold tracking-widest uppercase">Est. 2018</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 z-20 bg-black text-white px-3 py-1.5 lg:px-5 lg:py-2.5 rounded-full text-[10px] lg:text-sm font-bold uppercase tracking-widest border border-kwt-lime/40 shadow-xl">
                ✦ Sejak 2018
              </div>
            </div>
          </div>

          {/* Right: Info Content with Carousel Slider */}
          <div className="flex flex-col order-1 lg:order-2 lg:pl-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[3px] w-14 bg-kwt-orange" />
                <span className="text-kwt-orange text-sm font-black uppercase tracking-[0.6em]">The Collective</span>
                <div className="h-[1px] flex-1 bg-gray-100" />
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                <span className="text-black">Profil Kelompok</span><br /><span className="text-kwt-lime italic font-semibold">Wanita Tani</span>
              </h2>
              <p className="text-gray-500 font-dm text-base md:text-lg leading-relaxed mb-8 lg:mb-10 max-w-xl">
                Kelompok Wanita Tani (KWT) Dewi Sri 09 GBA 2 Bojongsoang, Kabupaten Bandung, merupakan komunitas perempuan pelaku UMKM yang aktif dalam memproduksi dan memasarkan hasil pertanian serta kerajinan lokal.
              </p>
            </div>

            {/* Widget Carousel Slider */}
            <div className="relative min-h-[380px] sm:min-h-[340px] lg:min-h-[380px] mt-12 mb-20 lg:mt-0 lg:mb-8">
              <div className="absolute inset-0">
                <div className="relative overflow-hidden p-6 sm:p-8 lg:p-12 rounded-[28px] lg:rounded-[30px] bg-white border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] group cursor-default h-full flex flex-col justify-center">
                  <div className="relative z-10 flex flex-col gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-kwt-lime" />
                        <h4 className="font-dm text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
                          {(testimonials[current] as any).category || "Testimonial"}
                        </h4>
                      </div>
                      <p className="font-playfair text-xl lg:text-2xl font-bold text-black leading-tight mb-6 italic">
                        "{testimonials[current].content || testimonials[current].quote}"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-kwt-orange/15 flex items-center justify-center text-kwt-orange text-xs lg:text-sm font-bold shrink-0">
                          {(testimonials[current].author_name || testimonials[current].name || 'A').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm lg:text-base font-semibold text-black">{testimonials[current].author_name || testimonials[current].name || 'Anonim'}</p>
                          <p className="text-xs text-gray-400">{testimonials[current].author_role || testimonials[current].role || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="absolute -bottom-14 lg:-bottom-16 left-0 right-0 flex items-center justify-between px-2 z-20">
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button key={index} onClick={() => setCurrent(index)} className={`h-1.5 transition-all duration-500 rounded-full ${index === current ? 'w-10 bg-kwt-orange' : 'w-2 bg-gray-200'}`} />
                  ))}
                </div>
                <div className="flex gap-3 lg:gap-4">
                  <button onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white bg-white transition-all shadow-sm">
                    <span className="text-xl leading-none">‹</span>
                  </button>
                  <button onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white bg-white transition-all shadow-sm">
                    <span className="text-xl leading-none">›</span>
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

// ---------- Team Members Block ----------

const TeamMembersBlock: React.FC<{ data: TeamMembersBlockData }> = ({ data }) => (
  <section className="py-20 px-6 bg-white">
    {data.title && <h2 className="font-playfair text-4xl font-bold text-kwt-maroon text-center mb-12">{data.title}</h2>}
    <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6">
      {(data.members ?? []).map((member, i) => (
        <div key={member.id ?? i} className="text-center">
          {member.photo
            ? <img src={member.photo} alt={member.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
            : <div className="w-24 h-24 rounded-full bg-kwt-orange/15 flex items-center justify-center text-kwt-orange text-2xl font-bold mx-auto mb-4">{member.name.charAt(0)}</div>
          }
          <h3 className="font-semibold text-kwt-maroon">{member.name}</h3>
          {member.role && <p className="text-sm text-gray-400">{member.role}</p>}
        </div>
      ))}
    </div>
  </section>
);

// ---------- Dynamic Post Feed Block ----------

const DynamicPostFeedBlock: React.FC<{ data: DynamicPostFeedBlockData }> = ({ data }) => {
  // Always cap at 3 so the home page shows exactly 1 row of cards
  const limit = Math.min(data.limit ?? 3, 3);
  
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        
        const mappedPosts = fetchedPosts.map(post => {
          // Parse tanggal
          const dateObj = new Date(post.created_at);
          const formattedDate = !isNaN(dateObj.getTime()) 
            ? dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
            : 'Tanggal tidak diketahui';
            
          let excerpt = post.excerpt || '';
          let image = post.featured_image || 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&q=80';
          let tags = ['Berita'];

          if (Array.isArray(post.content) && post.content.length > 0) {
            if (post.content[0].excerpt) excerpt = post.content[0].excerpt;
            if (post.content[0].featured_image) image = post.content[0].featured_image;
            if (post.content[0].tags) tags = post.content[0].tags.split(',').map((t: string) => t.trim());
          } else if (typeof post.content === 'string') {
            try {
              const parsed = JSON.parse(post.content);
              if (Array.isArray(parsed) && parsed.length > 0) {
                if (parsed[0].excerpt) excerpt = parsed[0].excerpt;
                if (parsed[0].featured_image) image = parsed[0].featured_image;
                if (parsed[0].tags) tags = parsed[0].tags.split(',').map((t: string) => t.trim());
              }
            } catch(e) {}
          }
            
          return {
            id: post.id.toString(),
            title: post.title,
            slug: post.slug,
            excerpt: excerpt,
            image: image,
            date: formattedDate,
            category: 'ARTIKEL', // Default fallback karena format tags belum terstandarisasi di CmsPost
            readTime: '3 MENIT BACA'
          };
        });

        // Filter by category if specified in block data
        let filtered = mappedPosts;
        if (data.category && data.category.toLowerCase() !== 'semua') {
          filtered = filtered.filter(p => p.category.toLowerCase() === data.category?.toLowerCase());
        }

        setPosts(filtered.slice(0, limit));
      } catch (error) {
        console.error('[DynamicPostFeedBlock] Failed to fetch posts:', error);
        // Fallback to static data
        setPosts(newsData.slice(0, limit));
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [limit, data.category]);

  if (loading) {
    return (
      <section className="bg-kwt-offwhite py-24 px-6 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-kwt-maroon border-t-transparent rounded-full animate-spin"></div>
          <p className="text-kwt-maroon/60 font-dm text-sm">Memuat artikel terbaru...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="bg-kwt-offwhite py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 lg:mb-12 text-center max-w-2xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-kwt-maroon mb-4">
            {data.title || "Warta Terkini"}
          </h2>
          <p className="text-kwt-maroon/60 font-dm text-sm md:text-base leading-relaxed">
            {data.subtitle || "Update terbaru mengenai program, prestasi, dan kegiatan harian anggota KWT Dewi Sri di lapangan."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">Belum ada artikel yang diterbitkan.</p>
          )}
        </div>

        <div className="flex justify-center mt-10 lg:mt-12">
          <Link to="/news">
            <button className="group inline-flex items-center gap-3 border border-kwt-maroon/30 text-kwt-maroon px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase bg-transparent hover:bg-kwt-maroon hover:text-white hover:border-kwt-maroon hover:-translate-y-1 active:scale-95 transition-all duration-300">
              Lihat Semua Berita
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ---------- Main BlockRenderer ----------

interface BlockRendererProps {
  blocks: CmsBlock[];
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Belum ada konten yang dikonfigurasi.</p>
      </div>
    );
  }

  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case 'hero': {
            const activitySliderBlock = blocks.find(b => b.type === 'activity-slider' || b.type === 'activity_slider');
            return <HeroBlock key={block.id} data={block.data as HeroBlockData} activityData={activitySliderBlock?.data as ActivitySliderBlockData} />;
          }

          case 'rich_text':
            return <RichTextBlock key={block.id} data={block.data as RichTextBlockData} />;

          case 'contacts':
            return <ContactsBlock key={block.id} data={block.data as ContactsBlockData} />;

          case 'gallery':
            return <GalleryBlock key={block.id} data={block.data as GalleryBlockData} />;

          case 'features':
            return <FeaturesBlock key={block.id} data={block.data as FeaturesBlockData} />;

          case 'faq':
            return <FaqBlock key={block.id} data={block.data as FaqBlockData} />;

          case 'testimonials':
            return <TestimonialsBlock key={block.id} data={block.data as TestimonialsBlockData} />;

          case 'team_members':
            return <TeamMembersBlock key={block.id} data={block.data as TeamMembersBlockData} />;

          case 'dynamic-post-feed':
          case 'dynamic_post_feed':
            return <DynamicPostFeedBlock key={block.id} data={block.data as DynamicPostFeedBlockData} />;

          case 'activity-slider':
          case 'activity_slider':
            // Activity slider is rendered inside HeroBlock, so we don't render it as a standalone block.
            return null;

          case 'profile_tabs':
          default:
            return <PlaceholderBlock key={block.id} block={block} />;
        }
      })}
    </>
  );
};
