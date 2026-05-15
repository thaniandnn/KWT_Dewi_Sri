import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Calendar, Clock, User, Share2, Copy, ArrowLeft } from 'lucide-react';
import { NewsCard } from '../components/news/NewsCard';
import { Button } from '../components/ui/Button';
import { getPostBySlug, getPosts } from '../lib/cmsApi';

// Clean &nbsp; entities that prevent text wrapping
const sanitizeHtml = (html: string): string =>
  html.replace(/&nbsp;/gi, ' ').replace(/\u00A0/g, ' ');

export const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [newsItem, setNewsItem] = useState<any>(null);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        setLoading(true);
        const post = await getPostBySlug(slug);
        if (!post) {
          setError(true);
          return;
        }

        // Map post
        const dateObj = new Date(post.created_at);
        const formattedDate = !isNaN(dateObj.getTime()) 
          ? dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
          : 'Tanggal tidak diketahui';
          
        let actualContent = '';
        let tags = ['Info', 'KWT Dewi Sri'];
        let excerpt = post.excerpt || '';
        let image = post.featured_image || 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&q=80';
        let readTime = '5 MENIT BACA';
        
        if (Array.isArray(post.content) && post.content.length > 0) {
          const block = post.content[0];
          // Support both article (body_content) and event (event_description) formats
          actualContent = sanitizeHtml(block.body_content || block.event_description || '');
          if (block.tags) tags = block.tags.split(',').map((t: string) => t.trim());
          if (block.event_labels) tags = block.event_labels.split(',').map((t: string) => t.trim());
          if (block.excerpt) excerpt = block.excerpt;
          if (block.featured_image) image = block.featured_image;
          if (block.reading_time) readTime = `${block.reading_time} MENIT BACA`;
        } else if (typeof post.content === 'string') {
          try {
            const parsed = JSON.parse(post.content);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const block = parsed[0];
              actualContent = sanitizeHtml(block.body_content || block.event_description || '');
              if (block.tags) tags = block.tags.split(',').map((t: string) => t.trim());
              if (block.event_labels) tags = block.event_labels.split(',').map((t: string) => t.trim());
              if (block.excerpt) excerpt = block.excerpt;
              if (block.featured_image) image = block.featured_image;
              if (block.reading_time) readTime = `${block.reading_time} MENIT BACA`;
            } else {
              actualContent = sanitizeHtml(post.content);
            }
          } catch(e) {
            actualContent = sanitizeHtml(post.content);
          }
        }
          
        const mappedPost = {
          id: post.id.toString(),
          title: post.title,
          slug: post.slug,
          excerpt: excerpt,
          content: actualContent,
          image: image,
          date: formattedDate,
          category: (post.category || 'Artikel').toUpperCase(),
          readTime,
          tags: tags
        };
        
        setNewsItem(mappedPost);

        // Fetch related
        const allPosts = await getPosts();
        const mappedRelated = allPosts
          .filter(p => p.id !== post.id)
          .map(p => {
            let pExcerpt = p.excerpt || '';
            let pImage = p.featured_image || 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&q=80';
            
            if (Array.isArray(p.content) && p.content.length > 0) {
              if (p.content[0].excerpt) pExcerpt = p.content[0].excerpt;
              if (p.content[0].featured_image) pImage = p.content[0].featured_image;
            } else if (typeof p.content === 'string') {
              try {
                const parsed = JSON.parse(p.content);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  if (parsed[0].excerpt) pExcerpt = parsed[0].excerpt;
                  if (parsed[0].featured_image) pImage = parsed[0].featured_image;
                }
              } catch(e) {}
            }

            return {
              id: p.id.toString(),
              title: p.title,
              slug: p.slug,
              excerpt: pExcerpt,
              image: pImage,
              date: new Date(p.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
              category: 'ARTIKEL',
              readTime: '3 MENIT BACA'
            };
          });
          
        setRelatedNews(mappedRelated.slice(0, 3));
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-kwt-offwhite">
        <div className="w-10 h-10 border-4 border-kwt-maroon border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-kwt-maroon/60 font-dm">Memuat berita...</p>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-kwt-offwhite">
        <h1 className="font-playfair text-4xl font-bold mb-4">Berita Tidak Ditemukan</h1>
        <p className="mb-8">Maaf, artikel yang Anda cari tidak tersedia.</p>
        <Link to="/news">
          <Button variant="maroon">Kembali ke Berita</Button>
        </Link>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link berhasil disalin ke clipboard!');
  };

  return (
    <div className="bg-kwt-offwhite min-h-screen">
      {/* Header Section */}
      <section className="bg-kwt-maroon pt-40 pb-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-kwt-lime transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/news" className="hover:text-kwt-lime transition-colors">Berita</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white truncate max-w-[200px] md:max-w-none">{newsItem.title}</span>
          </div>

          <span className="inline-block px-3 py-1 bg-kwt-orange text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-6">
            {newsItem.category}
          </span>
          
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {newsItem.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm font-dm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-kwt-lime" />
              <span>{newsItem.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-kwt-lime" />
              <span>{newsItem.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-kwt-lime" />
              <span>Tim KWT Dewi Sri</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {newsItem.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-kwt-orange/10 rounded-full blur-3xl -mr-20 -mt-20" />
      </section>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
          <img 
            src={newsItem.image} 
            alt={newsItem.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <article 
            className="prose prose-lg max-w-none 
              prose-headings:font-sans prose-headings:text-black
              prose-h1:text-3xl md:prose-h1:text-[2rem] prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-0 prose-h1:leading-tight
              prose-h2:text-2xl md:prose-h2:text-[1.5rem] prose-h2:font-bold prose-h2:mb-3 prose-h2:mt-8
              prose-p:font-sans prose-p:text-base md:prose-p:text-[1rem] prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3
              prose-ul:list-none prose-ul:pl-0 prose-ul:mb-6
              prose-li:relative prose-li:pl-6 prose-li:mb-1 prose-li:font-sans prose-li:text-base md:prose-li:text-[1rem] prose-li:text-gray-700
              prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-2 prose-li:before:top-[10px] prose-li:before:w-1.5 prose-li:before:h-1.5 prose-li:before:bg-gray-400 prose-li:before:rounded-full
              prose-strong:font-bold prose-strong:text-black
              prose-blockquote:border-l-4 prose-blockquote:border-kwt-orange prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-500 prose-blockquote:my-6"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-kwt-maroon/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-kwt-maroon/40 uppercase tracking-widest">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {newsItem.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-kwt-maroon/5 text-kwt-maroon text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-kwt-maroon/40 uppercase tracking-widest">Bagikan:</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white border border-kwt-maroon/5 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm">
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="w-10 h-10 rounded-full bg-white border border-kwt-maroon/5 flex items-center justify-center text-kwt-maroon hover:bg-kwt-maroon hover:text-white transition-all shadow-sm"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link to="/news">
              <Button variant="outline" className="!text-kwt-maroon !border-kwt-maroon/20 hover:!bg-kwt-maroon hover:!text-white">
                <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related News */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-playfair text-3xl font-bold text-kwt-maroon mb-12 text-center">Berita Lainnya</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
