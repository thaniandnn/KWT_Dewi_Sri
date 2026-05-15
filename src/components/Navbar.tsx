import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { Logo } from './Logo';
import { PinModal } from './PinModal';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (window.location.pathname === '/') {
        const sections = ['profile', 'gallery', 'contact'];
        let current = '';
        
        // Find which section we are currently in
        const scrollPosition = window.scrollY + 100; // offset
        
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;
            
            if (scrollPosition >= top && scrollPosition < bottom) {
              current = section;
              break;
            }
          }
        }
        
        // Edge case: when user reaches the absolute bottom of the page, highlight contact
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          current = 'contact';
        }
        
        // If at the very top, make sure it's empty (home active)
        if (window.scrollY < 100) {
          current = '';
        }
        
        setActiveSection(current);
      } else {
        setActiveSection('');
      }
    };

    handleScroll(); // Check once on mount

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const getIsActive = (path: string) => {
    if (path === '/') return location.pathname === '/' && activeSection === '';
    if (path.startsWith('/#')) {
      const section = path.substring(2);
      return location.pathname === '/' && activeSection === section;
    }
    return location.pathname.startsWith(path) && path !== '/';
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-kwt-orange/30 py-3' 
          : 'bg-black py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <Logo size="sm" className="group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
            <h1 className="font-playfair text-xl font-bold text-white leading-none mb-0.5 tracking-tight transition-colors group-hover:text-kwt-lime">Dewi Sri</h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-kwt-lime font-sans font-bold leading-none">Kelompok Wanita Tani</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {/* Home */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`relative px-4 py-2 font-sans text-sm font-bold tracking-tight transition-all duration-300 rounded-full group ${
              getIsActive('/') ? 'text-kwt-lime' : 'text-white/40 hover:text-white'
            }`}
          >
            <span className="relative z-10">Home</span>
            {getIsActive('/') && (
              <motion.div 
                layoutId="nav-bg"
                className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {!getIsActive('/') && (
              <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-kwt-lime/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
          </Link>

          {/* Profile */}
          <Link 
            to="/#profile" 
            onClick={() => handleLinkClick('/#profile')}
            className={`relative px-4 py-2 font-sans text-sm font-bold tracking-tight transition-all duration-300 rounded-full group ${
              getIsActive('/#profile') ? 'text-kwt-lime' : 'text-white/40 hover:text-white'
            }`}
          >
            <span className="relative z-10">Profile</span>
            {getIsActive('/#profile') && (
              <motion.div 
                layoutId="nav-bg"
                className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {!getIsActive('/#profile') && (
              <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-kwt-lime/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
          </Link>

          {/* Events Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setEventsOpen(true)}
            onMouseLeave={() => setEventsOpen(false)}
          >
            <button
              className={`relative flex items-center gap-1.5 px-4 py-2 font-sans text-sm font-bold tracking-tight transition-all duration-300 rounded-full group ${
                eventsOpen ? 'text-kwt-lime' : 'text-white/40 hover:text-white'
              }`}
            >
              <span className="relative z-10">Events</span>
              <ChevronDown
                className={`relative z-10 w-4 h-4 transition-transform duration-200 ${
                  eventsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {eventsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-w-[160px] py-2">
                    {/* Gallery */}
                    <Link
                      to="/#gallery"
                      onClick={() => {
                        setEventsOpen(false);
                        if (location.pathname === '/') {
                          document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="block px-5 py-3 font-sans text-sm font-bold tracking-tight text-gray-700 hover:text-kwt-orange hover:bg-gray-50 transition-all duration-150"
                    >
                      Gallery
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 mx-4" />

                    {/* News */}
                    <Link
                      to="/news"
                      onClick={() => setEventsOpen(false)}
                      className="block px-5 py-3 font-sans text-sm font-bold tracking-tight text-gray-700 hover:text-kwt-orange hover:bg-gray-50 transition-all duration-150"
                    >
                      News
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Us */}
          <Link 
            to="/#contact" 
            onClick={() => handleLinkClick('/#contact')}
            className={`relative px-4 py-2 font-sans text-sm font-bold tracking-tight transition-all duration-300 rounded-full group ${
              getIsActive('/#contact') ? 'text-kwt-lime' : 'text-white/40 hover:text-white'
            }`}
          >
            <span className="relative z-10">Contact Us</span>
            {getIsActive('/#contact') && (
              <motion.div 
                layoutId="nav-bg"
                className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {!getIsActive('/#contact') && (
              <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-kwt-lime/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
          </Link>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white overflow-hidden shadow-lg shadow-kwt-orange/20"
            onClick={() => setIsPinOpen(true)}
          >
            {/* Animated Gradient Background */}
            <motion.div 
              animate={{ 
                background: [
                  "linear-gradient(45deg, #EA580C, #F97316, #FB923C)",
                  "linear-gradient(45deg, #FB923C, #EA580C, #F97316)",
                  "linear-gradient(45deg, #F97316, #FB923C, #EA580C)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            />

            {/* Shimmer Sweep Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
              />
            </div>

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              AI Content 
              <motion.div
                animate={{ 
                  filter: ["drop-shadow(0 0 2px #fff)", "drop-shadow(0 0 8px #fff)", "drop-shadow(0 0 2px #fff)"],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 fill-white/20" />
              </motion.div>
            </span>

            {/* Border Highlight */}
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-2">
              {/* Home */}
              <Link 
                to="/" 
                className={`font-sans text-xl font-bold py-4 border-b border-white/5 transition-colors flex items-center justify-between group ${
                  getIsActive('/') ? 'text-kwt-orange' : 'text-white/80 hover:text-kwt-lime'
                }`}
                onClick={() => {
                  handleLinkClick('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>Home</span>
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${getIsActive('/') ? 'text-kwt-orange' : 'text-white/20'}`} />
              </Link>

              {/* Profile */}
              <Link 
                to="/#profile" 
                className={`font-sans text-xl font-bold py-4 border-b border-white/5 transition-colors flex items-center justify-between group ${
                  getIsActive('/#profile') ? 'text-kwt-orange' : 'text-white/80 hover:text-kwt-lime'
                }`}
                onClick={() => handleLinkClick('/#profile')}
              >
                <span>Profile</span>
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${getIsActive('/#profile') ? 'text-kwt-orange' : 'text-white/20'}`} />
              </Link>

              {/* Events Accordion */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
                  className="flex items-center justify-between w-full py-4 text-xl font-bold text-white/80 hover:text-kwt-lime transition-colors"
                >
                  <span>Events</span>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-200 ${mobileEventsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileEventsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-4 flex flex-col gap-2">
                        <Link 
                          to="/#gallery" 
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            if (location.pathname === '/') {
                              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="text-white/60 hover:text-kwt-lime py-3 text-lg flex items-center gap-3 transition-colors"
                        >
                          Gallery
                        </Link>
                        <Link 
                          to="/news" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-white/60 hover:text-kwt-lime py-3 text-lg flex items-center gap-3 transition-colors"
                        >
                          News
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Us */}
              <Link 
                to="/#contact" 
                className={`font-sans text-xl font-bold py-4 border-b border-white/5 transition-colors flex items-center justify-between group ${
                  getIsActive('/#contact') ? 'text-kwt-orange' : 'text-white/80 hover:text-kwt-lime'
                }`}
                onClick={() => handleLinkClick('/#contact')}
              >
                <span>Contact Us</span>
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${getIsActive('/#contact') ? 'text-kwt-orange' : 'text-white/20'}`} />
              </Link>

              <div className="pt-6">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative py-6 rounded-2xl overflow-hidden font-black uppercase tracking-widest text-sm text-white group"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsPinOpen(true);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-kwt-orange to-orange-400" />
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Buka AI Toolkit <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <PinModal 
        isOpen={isPinOpen} 
        onClose={() => setIsPinOpen(false)} 
      />
    </nav>
  );
};
