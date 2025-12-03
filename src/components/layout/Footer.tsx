import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white mb-4 block">
              AHZ Consultancy<span className="text-accent">.</span>
            </Link>
            <p className="text-slate-400 max-w-sm">
              Your trusted partner for Study, Work, and Visit visa services. 
              We make your global dreams a reality.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Sitemap</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Social</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Agency Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
