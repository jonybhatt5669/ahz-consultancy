import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAnimation } from '../../context/AnimationContext';

interface SliderItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  cta?: string;
  ctaLink?: string;
}

interface SliderProps {
  items: SliderItem[];
  autoplay?: boolean;
  interval?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  animationProfile?: 'subtle' | 'dramatic';
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  items,
  autoplay = true,
  interval = 5000,
  loop = true,
  showDots = true,
  showArrows = true,
  animationProfile = 'dramatic',
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { animationsEnabled } = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1 === items.length ? (loop ? 0 : prev) : prev + 1));
  }, [items.length, loop]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? (loop ? items.length - 1 : prev) : prev - 1));
  }, [items.length, loop]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay
  useEffect(() => {
    if (autoplay && animationsEnabled) {
      timerRef.current = setInterval(nextSlide, interval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, interval, nextSlide, animationsEnabled]);

  // GSAP Text Reveal
  useEffect(() => {
    if (!animationsEnabled || !textRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      if (animationProfile === 'dramatic') {
        tl.fromTo('.slide-title', 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        )
        .fromTo('.slide-subtitle',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo('.slide-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.6'
        );
      } else {
        tl.fromTo('.slide-content',
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: 'power2.inOut' }
        );
      }
    }, textRef);

    return () => ctx.revert();
  }, [currentIndex, animationProfile, animationsEnabled]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (_: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      nextSlide();
    } else if (swipe > swipeConfidenceThreshold) {
      prevSlide();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-[600px] overflow-hidden bg-slate-900 group", className)}
      onMouseEnter={() => timerRef.current && clearInterval(timerRef.current)}
      onMouseLeave={() => {
        if (autoplay && animationsEnabled) timerRef.current = setInterval(nextSlide, interval);
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={animationsEnabled ? slideVariants : {}}
          initial={animationsEnabled ? "enter" : "center"}
          animate="center"
          exit={animationsEnabled ? "exit" : "exit"} // Keep exit for smooth transition even if reduced motion is preferred, or simplify
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${items[currentIndex].image})` }}
          >
            <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
          </div>

          {/* Content */}
          <div 
            ref={textRef}
            className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-12"
          >
            <div className="max-w-3xl slide-content">
              <h2 className="slide-title text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                {items[currentIndex].title}
              </h2>
              <p className="slide-subtitle text-xl text-slate-200 mb-8 max-w-2xl">
                {items[currentIndex].subtitle}
              </p>
              {items[currentIndex].cta && (
                <div className="slide-cta">
                  <button className="bg-accent text-white px-8 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors">
                    {items[currentIndex].cta}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm z-20 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm z-20 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-white w-8" 
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
