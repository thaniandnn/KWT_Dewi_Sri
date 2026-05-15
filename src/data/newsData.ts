export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  featured: boolean;
  tags: string[];
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    slug: "peluncuran-ai-content-generator",
    title: "Peluncuran AI Content Generator untuk UMKM Petani",
    category: "Program",
    date: "15 April 2026",
    readTime: "3 menit baca",
    excerpt: "KWT Dewi Sri resmi memperkenalkan tools digital marketing berbasis AI untuk membantu petani memasarkan produknya secara online.",
    content: `
      <h2>Inovasi Digital untuk Petani Lokal</h2>
      <p>KWT Dewi Sri kembali mengukir sejarah dengan meluncurkan sebuah platform digital yang revolusioner. Platform ini bertujuan untuk menjembatani kesenjangan teknologi di kalangan petani tradisional.</p>
      <p>Platform bernama KontenGo ini dirancang khusus untuk membantu anggota KWT dalam membuat konten pemasaran yang menarik tanpa harus menjadi ahli desain atau copywriting.</p>
      <h2>Fitur Unggulan KontenGo</h2>
      <p>Beberapa fitur yang tersedia antara lain:</p>
      <ul>
        <li>Generate caption otomatis dari foto produk</li>
        <li>Template desain poster promosi yang mudah digunakan</li>
        <li>Jadwal posting otomatis ke berbagai media sosial</li>
      </ul>
      <h2>Respon Anggota</h2>
      <p>Para anggota KWT menyambut antusias peluncuran ini. Mereka merasa lebih percaya diri untuk mempromosikan hasil panen dan produk olahan mereka ke pasar yang lebih luas.</p>
    `,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
    featured: true,
    tags: ["AI", "Digital", "UMKM", "Inovasi"]
  },
  {
    id: 2,
    slug: "penghargaan-kwt-terbaik-provinsi",
    title: "Raih Penghargaan KWT Terbaik Tingkat Provinsi",
    category: "Penghargaan",
    date: "28 Maret 2026",
    readTime: "2 menit baca",
    excerpt: "Dedikasi selama 8 tahun akhirnya diakui oleh Dinas Pertanian Jawa Barat dengan penghargaan bergengsi.",
    content: `
      <h2>Penghargaan Bergengsi dari Provinsi</h2>
      <p>Setelah berjuang selama delapan tahun membangun komunitas tani yang kuat dan mandiri, KWT Dewi Sri akhirnya dinobatkan sebagai Kelompok Wanita Tani Terbaik.</p>
      <h2>Proses Penilaian</h2>
      <p>Tim penilai dari Dinas Pertanian Provinsi Jawa Barat melakukan kunjungan lapangan selama tiga hari untuk memverifikasi program kerja, manajemen keuangan, dan dampak sosial yang dihasilkan oleh kelompok kami.</p>
      <h2>Rencana ke Depan</h2>
      <p>Dengan penghargaan ini, KWT Dewi Sri semakin termotivasi untuk menjadi percontohan bagi kelompok tani lain di seluruh Indonesia.</p>
    `,
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1200&q=80",
    featured: false,
    tags: ["Penghargaan", "Prestasi", "Provinsi"]
  },
  {
    id: 3,
    slug: "panen-raya-padi-organik",
    title: "Panen Raya Padi Organik Varietas Unggul",
    category: "Panen",
    date: "10 Maret 2026",
    readTime: "4 menit baca",
    excerpt: "Hasil panen musim ini meningkat 20% dibandingkan tahun lalu berkat penerapan teknologi pupuk hayati.",
    content: `
      <h2>Musim Panen yang Menggembirakan</h2>
      <p>Seluruh anggota KWT Dewi Sri berkumpul untuk merayakan hasil panen yang memuaskan. Hamparan padi menguning menjadi bukti nyata kerja keras kolektif kami.</p>
      <h2>Teknologi Pupuk Hayati Mandiri</h2>
      <p>Kunci keberhasilan panen kali ini adalah penerapan pupuk hayati yang dikembangkan sendiri oleh tim riset internal kelompok menggunakan bahan-bahan organik lokal.</p>
      <h2>Target Tahun Depan</h2>
      <p>Dengan hasil ini, KWT menargetkan peningkatan 30% pada musim tanam berikutnya dengan memperluas lahan garapan organik.</p>
    `,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    featured: false,
    tags: ["Panen", "Organik", "Pertanian"]
  },
  {
    id: 4,
    slug: "workshop-branding-umkm",
    title: "Workshop Digital Branding untuk Produk Olahan",
    category: "Pelatihan",
    date: "05 Maret 2026",
    readTime: "3 menit baca",
    excerpt: "Meningkatkan nilai jual produk olahan melalui kemasan dan branding yang lebih profesional.",
    content: `
      <h2>Nilai Tambah melalui Branding</h2>
      <p>Produk berkualitas membutuhkan kemasan yang mampu bercerita. Inilah fokus utama dari workshop digital branding kali ini.</p>
      <p>Kami mengundang pakar desain komunikasi visual untuk membimbing ibu-ibu dalam menentukan identitas visual produk mereka.</p>
    `,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80",
    featured: false,
    tags: ["Branding", "UMKM", "Desain"]
  },
  {
    id: 5,
    slug: "kunjungan-studi-banding-jateng",
    title: "Kunjungan Studi Banding dari KWT Jawa Tengah",
    category: "Kegiatan",
    date: "25 Februari 2026",
    readTime: "5 menit baca",
    excerpt: "Berbagi pengalaman dalam mengelola lumbung pangan dan sistem keuangan kelompok.",
    content: `
      <h2>Kolaborasi antar Wilayah</h2>
      <p>Kami merasa terhormat menerima kunjungan dari rekan-rejoin KWT Jawa Tengah. Pertemuan ini menjadi ajang tukar pikiran yang sangat produktif.</p>
      <p>Fokus pembicaraan berkisar pada manajemen lumbung pangan desa dan bagaimana menjaga loyalitas anggota melalui sistem bagi hasil yang adil.</p>
    `,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=1200&q=80",
    featured: false,
    tags: ["Studi Banding", "Kolaborasi", "Networking"]
  },
  {
    id: 6,
    slug: "inovasi-pupuk-cair-limbah-dapur",
    title: "Inovasi Pupuk Cair dari Limbah Dapur",
    category: "Program",
    date: "15 Februari 2026",
    readTime: "3 menit baca",
    excerpt: "Mengubah sampah menjadi berkah melalui teknik fermentasi sederhana yang murah dan efektif.",
    content: `
      <h2>Zero Waste Farming</h2>
      <p>Program baru ini mengajak setiap rumah tangga anggota untuk memisahkan sampah organik guna dijadikan pupuk cair berkualitas tinggi.</p>
      <p>Limbah sayuran dan buah difermentasi selama 14 hari menghasilkan nutrisi tanaman yang sangat kaya akan unsur hara mikro.</p>
    `,
    image: "https://images.unsplash.com/photo-1615814117229-303973950e9f?w=1200&q=80",
    featured: false,
    tags: ["Inovasi", "Pupuk", "Zero Waste"]
  }
];
