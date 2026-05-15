import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../../data/newsData';
import { Button } from '../ui/Button';

export const FeaturedNews: React.FC<{ news: NewsItem }> = ({ news }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-[380px_1fr] md:h-[280px] gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white mb-8 group"
    >
      {/* PHOTO LEFT */}
      <div className="relative h-48 md:h-full overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* CONTENT RIGHT */}
      <div className="flex flex-col justify-center gap-3 px-6 py-6 md:px-8">
        {/* Badge + Meta */}
        <div className="flex items-center gap-3">
          <span className="bg-kwt-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {news.category}
          </span>
          <span className="text-gray-400 text-xs">
            {news.date} · {news.readTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-playfair text-xl md:text-2xl font-bold text-black leading-snug group-hover:text-kwt-orange transition-colors">
          {news.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          {news.excerpt}
        </p>

        {/* Button */}
        <Link to={`/news/${news.slug}`}>
          <button className="group/btn inline-flex items-center gap-2 bg-black text-white text-xs font-medium px-5 py-2.5 rounded-full w-fit mt-1 hover:bg-kwt-orange transition-all duration-200">
            Baca Selengkapnya
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
