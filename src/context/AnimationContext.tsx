import React, { createContext, useContext, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface AnimationContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimationsEnabled(false);
    }
  }, [prefersReducedMotion]);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
