import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';

const team = [
  {
    name: 'Sarah Jenkins',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'David Chen',
    role: 'Head of Strategy',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Elena Rodriguez',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Michael Ross',
    role: 'Lead Consultant',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
  },
];

const milestones = [
  { year: '2015', title: 'Founded', description: 'Started with a mission to simplify student admissions.' },
  { year: '2017', title: 'Global Expansion', description: 'Opened offices in London and Toronto.' },
  { year: '2019', title: 'Service Diversification', description: 'Launched work permit and immigration services.' },
  { year: '2021', title: '5,000+ Success Stories', description: 'Celebrated helping over 5,000 clients go abroad.' },
  { year: '2023', title: 'Award Winning', description: 'Recognized as the "Best Education Consultancy" of the year.' },
];

export const About: React.FC = () => {
  return (
    <Layout>
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About AHZ Consultancy</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We are dedicated to helping you navigate the complexities of international travel, study, and work.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 overflow-hidden rounded-full w-48 h-48 mx-auto border-4 border-slate-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-slate-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Our Journey</h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-700" />
            
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-center justify-between mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="w-5/12" />
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-slate-900 z-10" />
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="text-accent font-bold text-xl block mb-1">{item.year}</span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
