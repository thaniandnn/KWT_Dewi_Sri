import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPosts } from '../lib/cmsApi';
import { FeaturedNews } from '../components/news/FeaturedNews';
import { NewsCard } from '../components/news/NewsCard';
import { Pagination } from '../components/news/Pagination';

// Strip &nbsp; so text wraps properly
const sanitizeHtml = (html: string): string =>
  html.replace(/&nbsp;/gi, ' ').replace(/\u00A0/g, ' ');

interface MappedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  featured?: boolean;
  tags?: string[];
}

const mapPost = (post: any): MappedPost => {
  const dateObj = new Date(post.created_at);
  const formattedDate = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    : '';

  let excerpt = post.excerpt || '';
  let image = post.featured_image || 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&q=80';
  let tags: string[] = [];
  let readTime = '3 MENIT BACA';

  if (Array.isArray(post.content) && post.content.length > 0) {
    if (post.content[0].excerpt) excerpt = post.content[0].excerpt;
    if (post.content[0].featured_image) image = post.content[0].featured_image;
    if (post.content[0].tags) tags = post.content[0].tags.split(',').map((t: string) => t.trim());
    if (post.content[0].reading_time) readTime = `${post.content[0].reading_time} MENIT BACA`;
  } else if (typeof post.content === 'string') {
    try {
      const parsed = JSON.parse(post.content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (parsed[0].excerpt) excerpt = parsed[0].excerpt;
        if (parsed[0].featured_image) image = parsed[0].featured_image;
        if (parsed[0].tags) tags = parsed[0].tags.split(',').map((t: string) => t.trim());
        if (parsed[0].reading_time) readTime = `${parsed[0].reading_time} MENIT BACA`;
      }
    } catch (e) {}
  }

  return {
    id: post.id.toString(),
    title: post.title,
    slug: post.slug,
    excerpt: sanitizeHtml(excerpt),
    image,
    date: formattedDate,
    category: post.category || 'Artikel',
    readTime,
    tags,
  };
};

export const NewsPage = () => {
  const [allNews, setAllNews] = useState<MappedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const ITEMS_PER_PAGE = 6;

  // Fetch from CMS
  useEffect(() => {
    getPosts()
      .then((posts) => setAllNews(posts.map(mapPost)))
      .catch((err) => console.error('[NewsPage] fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  // Unique categories from CMS data
  const categories = useMemo(() => {
    const cats = new Set(allNews.map((n) => n.category));
    return ['Semua', ...Array.from(cats)];
  }, [allNews]);

  const filteredNews = useMemo(() => {
    return allNews.filter((news) => {
      const matchesCategory = activeCategory === 'Semua' || news.category === activeCategory;
      const matchesSearch =
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allNews, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const featuredNews = allNews[0];

  const handleFilterChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-kwt-maroon pt-40 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-kwt-lime transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Berita Terkini</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
            Berita Terkini
          </h1>
          <div className="w-24 h-1.5 bg-kwt-orange mb-6" />
          <p className="text-white/60 text-lg font-dm max-w-2xl leading-relaxed">
            Ikuti perjalanan kami dalam memberdayakan masyarakat melalui pertanian dan inovasi digital.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-kwt-lime/5 rounded-full blur-3xl -mr-20 -mt-20" />
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 px-4 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          <div className="w-full lg:w-auto overflow-hidden">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`whitespace-nowrap px-4 lg:px-5 py-2 rounded-full text-[11px] lg:text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 ${
                    activeCategory === category
                      ? 'bg-black text-white'
                      : 'bg-kwt-offwhite text-gray-500 hover:bg-gray-200 hover:text-black'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full lg:w-auto group shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-3.5 h-3.5 text-gray-400 group-focus-within:text-black transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full lg:w-72 bg-kwt-offwhite border border-transparent rounded-full py-2 pl-9 pr-4 outline-none focus:border-black focus:bg-white transition-all font-sans text-[11px] lg:text-xs"
            />
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-4 border-kwt-maroon border-t-transparent rounded-full animate-spin" />
            <p className="text-kwt-maroon/60 font-dm text-sm">Memuat berita dari CMS...</p>
          </div>
        ) : (
          <>
            {/* Featured News */}
            {currentPage === 1 && activeCategory === 'Semua' && searchQuery === '' && featuredNews && (
              <FeaturedNews news={featuredNews} />
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="py-20 text-center">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="font-playfair text-2xl font-bold text-kwt-maroon mb-2">Berita tidak ditemukan</h3>
                <p className="text-kwt-maroon/60">Coba gunakan kata kunci atau kategori lain.</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
};
