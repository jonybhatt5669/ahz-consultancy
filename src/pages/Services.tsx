import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';

const allServices = [
  {
    title: 'University Admissions',
    description: 'Expert guidance on selecting universities, courses, and preparing successful applications.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Scholarship Assistance',
    description: 'Identifying and applying for scholarships to reduce your financial burden.',
    image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Skilled Worker Visas',
    description: 'Assistance with points-based systems, skills assessments, and visa applications.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Business Immigration',
    description: 'Solutions for entrepreneurs and investors looking to establish businesses abroad.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Family Sponsorship',
    description: 'Reuniting families through spousal, parent, and child visa programs.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Tourist & Visit Visas',
    description: 'Hassle-free processing for short-term stays, holidays, and business trips.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
  },
];

export const Services: React.FC = () => {
  return (
    <Layout>
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            Comprehensive visa and immigration services designed to make your journey seamless.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                title={service.title}
                description={service.description}
                image={service.image}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
