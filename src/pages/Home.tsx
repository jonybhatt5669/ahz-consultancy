import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Slider } from '../components/features/Slider';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const sliderItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Study Abroad',
    subtitle: 'Secure your future at top universities worldwide. Expert guidance for admissions and scholarships.',
    cta: 'Explore Universities',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600',
    title: 'Work Overseas',
    subtitle: 'Unlock global career opportunities. Comprehensive support for skilled migration and work permits.',
    cta: 'Check Eligibility',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1600',
    title: 'Visit the World',
    subtitle: 'Experience new cultures and destinations. Hassle-free tourist and family visit visa processing.',
    cta: 'Start Your Journey',
  },
];

const services = [
  {
    title: 'Student Visas',
    description: 'End-to-end support for university applications, SOP writing, and visa interviews.',
    tags: ['Admissions', 'Scholarships', 'Visa'],
  },
  {
    title: 'Work Permits',
    description: 'Guidance for skilled workers, employer sponsorship, and temporary work visas.',
    tags: ['Skilled Migration', 'Sponsorship', 'Permits'],
  },
  {
    title: 'Tourist Visas',
    description: 'Seamless processing for holiday makers, family visits, and business travel.',
    tags: ['Tourism', 'Business', 'Family'],
  },
];

export const Home: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      <section className="relative">
        <Slider items={sliderItems} />
      </section>

      <section className="py-24 bg-white services-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive visa and immigration solutions tailored to your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <Card
                  title={service.title}
                  description={service.description}
                  tags={service.tags}
                  className="h-full"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      <section ref={parallaxRef} className="relative py-32 overflow-hidden bg-slate-900 text-white">
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
        />
        <div className="relative container mx-auto px-4 text-center z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Go Global?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Start your application today and take the first step towards your international dreams.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};
