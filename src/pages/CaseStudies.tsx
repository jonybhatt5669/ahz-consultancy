import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

const categories = ['All', 'Study', 'Work', 'Visit'];

const caseStudies = [
  {
    id: 1,
    title: 'Masters in UK',
    category: 'Study',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    description: 'Helping a student secure admission and scholarship at a top UK university.',
    details: 'We guided the student through the entire application process, including SOP review and visa interview preparation, resulting in a £5,000 scholarship.',
  },
  {
    id: 2,
    title: 'Skilled Worker Visa - Canada',
    category: 'Work',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    description: 'Successful migration of a software engineer to Toronto.',
    details: 'Our team assisted with the Express Entry profile creation, document verification, and final visa application, ensuring a smooth transition for the client and their family.',
  },
  {
    id: 3,
    title: 'Family Visit to Australia',
    category: 'Visit',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800',
    description: 'Reuniting parents with their children in Sydney.',
    details: 'We handled the complex documentation required for a long-term visitor visa, allowing the parents to spend quality time with their grandchildren.',
  },
  {
    id: 4,
    title: 'MBA in USA',
    category: 'Study',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    description: 'Admission to an Ivy League business school.',
    details: 'Comprehensive support for GMAT preparation, essay writing, and interview coaching led to an acceptance letter from a prestigious US university.',
  },
  {
    id: 5,
    title: 'Healthcare Worker - UK',
    category: 'Work',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    description: 'Placing a nurse in a leading NHS hospital.',
    details: 'We facilitated the recruitment process, NMC registration, and visa application, helping the client start their dream job in the UK healthcare system.',
  },
  {
    id: 6,
    title: 'Europe Tour Visa',
    category: 'Visit',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
    description: 'Schengen visa for a multi-country European tour.',
    details: 'We provided a detailed itinerary and financial documentation support, resulting in a quick approval for a 30-day multi-entry visa.',
  },
];

export const CaseStudies: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null);

  const filteredCases = filter === 'All' 
    ? caseStudies 
    : caseStudies.filter(c => c.category === filter);

  return (
    <Layout>
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Read about how we've helped individuals achieve their dreams of going abroad.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={filter === cat ? 'primary' : 'outline'}
              onClick={() => setFilter(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredCases.map(item => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  tags={[item.category]}
                  className="h-full"
                  onClick={() => setSelectedCase(item)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        title={selectedCase?.title}
      >
        {selectedCase && (
          <div>
            <img 
              src={selectedCase.image} 
              alt={selectedCase.title} 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div className="prose max-w-none">
              <h3 className="text-lg font-bold mb-2">Challenge & Solution</h3>
              <p className="text-slate-600 mb-4">{selectedCase.details}</p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-900">Category:</span> {selectedCase.category}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};
