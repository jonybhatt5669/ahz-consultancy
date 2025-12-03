import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useAnimation } from '../../context/AnimationContext';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ title, description, image, tags, className, onClick }) => {
  const { animationsEnabled } = useAnimation();

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer',
        className
      )}
      whileHover={animationsEnabled ? { y: -5 } : {}}
      onClick={onClick}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map(tag => (
              <span key={tag} className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
