import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="flex-grow pt-20" // pt-20 to account for fixed header
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};
