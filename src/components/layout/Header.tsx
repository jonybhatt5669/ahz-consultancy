import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAnimation } from '../../context/AnimationContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { animationsEnabled } = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          AHZ Consultancy<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                location.pathname === item.path ? 'text-accent' : 'text-slate-600'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden"
            >
              <nav className="flex flex-col p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'py-3 px-4 text-sm font-medium transition-colors hover:bg-slate-50 rounded-md',
                      location.pathname === item.path ? 'text-accent bg-slate-50' : 'text-slate-600'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
