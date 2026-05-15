
export interface GalleryPhoto {
  id: number;
  slug: string;
  label: string;
  category: string;
  image: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    slug: "lahan-pertanian-organik",
    label: "Lahan Pertanian Organik",
    category: "Pertanian",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
  },
  {
    id: 2,
    slug: "panen-raya-bersama",
    label: "Panen Raya Bersama",
    category: "Pertanian",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80"
  },
  {
    id: 3,
    slug: "kebun-sayur-organik",
    label: "Kebun Sayur Organik",
    category: "Pertanian",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
  },
  {
    id: 4,
    slug: "pelatihan-pertanian",
    label: "Pelatihan Pertanian",
    category: "Pelatihan",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
  },
  {
    id: 5,
    slug: "produk-olahan-kwt",
    label: "Produk Olahan KWT",
    category: "Program Unggulan",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80"
  },
  {
    id: 6,
    slug: "kegiatan-komunitas",
    label: "Kegiatan Komunitas",
    category: "Kolaborasi",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80"
  },
  {
    id: 7,
    slug: "sistem-hidroponik-gba",
    label: "Sistem Hidroponik GBA",
    category: "Pengabdian Masyarakat",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: 8,
    slug: "workshop-digital-marketing",
    label: "Workshop Digital Marketing",
    category: "Pelatihan",
    image: "https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?w=800&q=80"
  },
  {
    id: 9,
    slug: "panen-padi-organik",
    label: "Panen Padi Organik",
    category: "Pertanian",
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=800&q=80"
  },
  {
    id: 10,
    slug: "pengolahan-hasil-tani",
    label: "Pengolahan Hasil Tani",
    category: "Program Unggulan",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
  },
  {
    id: 11,
    slug: "kerjasama-komunitas",
    label: "Kerjasama Komunitas",
    category: "Kolaborasi",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80"
  },
  {
    id: 12,
    slug: "kebun-pekarangan-rumah",
    label: "Kebun Pekarangan Rumah",
    category: "Pengabdian Masyarakat",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80"
  },
];

export const galleryData = galleryPhotos;

export const galleryCategories = [
  'Semua',
  'Pengabdian Masyarakat',
  'Pelatihan',
  'Pertanian',
  'Program Unggulan',
  'Kolaborasi',
];
