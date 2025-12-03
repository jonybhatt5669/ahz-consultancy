import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Layout>
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Let's discuss how we can help your business grow.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-lg text-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                  <p className="text-slate-600">hello@agency.com</p>
                  <p className="text-slate-600">support@agency.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-lg text-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                  <p className="text-slate-600">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-lg text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Office</h3>
                  <p className="text-slate-600">
                    123 Business Avenue, Suite 100<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-slate-900 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">Ready to start?</h3>
              <p className="text-slate-300 mb-6">
                Schedule a free consultation with our experts today.
              </p>
              <Button variant="primary" className="bg-white text-slate-900 hover:bg-slate-100 w-full">
                Book a Call
              </Button>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all",
                        errors.name ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"
                      )}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all",
                        errors.email ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"
                      )}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none",
                      errors.message ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"
                    )}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
