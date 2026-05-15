import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, Facebook, Mail, 
  Phone, Clock, MapPin 
} from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="bg-black py-14">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ===== DESKTOP: 4 KOLOM | MOBILE: STACK ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-4 
                        gap-10 lg:gap-8 mb-10">

          {/* KOLOM 1 — Logo bulat besar + deskripsi + sosmed */}
          <div className="flex flex-col 
                          items-start lg:items-start gap-5">

            {/* Logo bulat — seperti referensi KHB */}
            <div className="w-20 h-20 rounded-full 
                            bg-white/10 border border-white/20
                            flex items-center justify-center
                            overflow-hidden">
              <Logo size="lg" />
            </div>

            <p className="text-white/60 text-sm leading-relaxed
                          max-w-[260px]">
              Kelompok Wanita Tani (KWT) Dewi Sri 09 GBA 2 
              Bojongsoang, komunitas perempuan pelaku UMKM 
              yang aktif dalam memproduksi dan memasarkan 
              hasil pertanian serta kerajinan lokal.
            </p>

            {/* Sosmed — icon circle seperti referensi */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/kwtdewisri09?igsh=NWE4NjBuaDc5cW1w"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full 
                           border border-white/20
                           flex items-center justify-center 
                           text-white/70
                           hover:border-kwt-orange
                           hover:text-kwt-orange
                           transition-all duration-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#"
                className="w-10 h-10 rounded-full 
                           border border-white/20
                           flex items-center justify-center 
                           text-white/70
                           hover:border-kwt-orange
                           hover:text-kwt-orange
                           transition-all duration-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="mailto:info@kwtdewisri.id"
                className="w-10 h-10 rounded-full 
                           border border-white/20
                           flex items-center justify-center 
                           text-white/70
                           hover:border-kwt-orange
                           hover:text-kwt-orange
                           transition-all duration-200">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* KOLOM 2 — Navigasi */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base">
              Navigasi
            </h3>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Home',       href: '/' },
                { label: 'Profile',    href: '/#profile' },
                { label: 'Gallery',    href: '/gallery' },
                { label: 'News',       href: '/news' },
                { label: 'Contact Us', href: '/#contact' },
              ].map(item => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-white/50 text-sm 
                             hover:text-white
                             transition-colors duration-200 
                             w-fit">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* KOLOM 3 — Hubungi Kami */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base">
              Hubungi Kami
            </h3>
            <div className="flex flex-col gap-5">

              {/* Telepon */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full 
                                border border-white/20
                                flex items-center justify-center 
                                shrink-0">
                  <Phone className="w-3.5 h-3.5 text-kwt-lime" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] 
                                uppercase tracking-widest mb-1">
                    Telepon / WhatsApp
                  </p>
                  <a href="tel:+6282233430596"
                     className="text-white/80 text-sm 
                                hover:text-kwt-lime 
                                transition-colors">
                    0822-3343-0596
                  </a>
                </div>
              </div>

              {/* Jam */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full 
                                border border-white/20
                                flex items-center justify-center 
                                shrink-0">
                  <Clock className="w-3.5 h-3.5 text-kwt-lime" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] 
                                uppercase tracking-widest mb-1">
                    Jam Layanan
                  </p>
                  <p className="text-white/80 text-sm">
                    Senin – Minggu<br />
                    09.00 – selesai WIB
                  </p>
                </div>
              </div>

              {/* Alamat */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full 
                                border border-white/20
                                flex items-center justify-center 
                                shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-kwt-lime" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] 
                                uppercase tracking-widest mb-1">
                    Alamat
                  </p>
                  <p className="text-white/80 text-sm 
                                leading-relaxed">
                    Jl. GBA 2 No.12 Bl. C5,<br />
                    Cipagalo, Kec. Bojongsoang,<br />
                    Kabupaten Bandung, 40287
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* KOLOM 4 — Lokasi Kami + Maps */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base">
              Lokasi Kami
            </h3>

            {/* Maps embed */}
            <div className="rounded-2xl overflow-hidden 
                            border border-white/15
                            h-[180px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.15!2d107.6312!3d-6.9897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9001ef0611d%3A0x4e378d50ff51a8ab!2sTaman%20Edukasi%20kwt%20Dewi%20Sri%2009!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi KWT Dewi Sri"
              />
            </div>

            {/* Buka di Google Maps */}
            <a 
              href="https://maps.app.goo.gl/eAafWiRfwqvmkD889"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2
                         text-kwt-lime text-xs font-medium
                         hover:text-white 
                         transition-colors duration-200 
                         w-fit">
              <MapPin className="w-3.5 h-3.5" />
              Buka di Google Maps
            </a>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row 
                          justify-between items-center gap-3
                          text-center md:text-left">
            <p className="text-white/30 text-xs">
              © 2026 KWT Dewi Sri 09. 
              All Rights Reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};


