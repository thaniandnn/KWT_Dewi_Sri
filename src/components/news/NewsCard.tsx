import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../../data/newsData';

export const NewsCard: React.FC<{ news: NewsItem }> = ({ news }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 group flex flex-col"
    >
      {/* Photo */}
      <div className="relative h-[160px] overflow-hidden bg-kwt-offwhite">
        <img 
          src={news.image} 
          alt={news.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Body — tighter padding */}
      <div className="px-5 py-4 flex flex-col gap-2 flex-grow">
        {/* Meta */}
        <div className="flex items-center gap-2">
          <span className="text-kwt-orange text-[10px] font-bold uppercase tracking-widest leading-none">
            {news.category}
          </span>
          <span className="text-gray-300 text-xs text-center leading-none">·</span>
          <span className="text-gray-400 text-[10px] uppercase leading-none">
            {news.date}
          </span>
          <span className="text-gray-300 text-xs text-center leading-none">·</span>
          <span className="text-gray-400 text-[10px] uppercase leading-none">
            {news.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-playfair text-base font-bold text-black leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-kwt-orange transition-colors">
          {news.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-[xs] leading-relaxed line-clamp-2 md:text-xs">
          {news.excerpt}
        </p>

        {/* Read Button */}
        <Link 
          to={`/news/${news.slug}`}
          className="inline-flex items-center gap-1 text-black text-[10px] font-bold uppercase tracking-widest hover:text-kwt-orange transition-colors mt-2 w-fit"
        >
          BACA
          <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};
