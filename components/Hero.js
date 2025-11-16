import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { ANIMATION_CONFIG } from '@/config/constants';

export default function Hero({ onLearnMore }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Memoize particles to prevent recreation on every render
  const particles = useMemo(() => {
    return [...Array(ANIMATION_CONFIG.particleCount)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: ANIMATION_CONFIG.particleMinDuration + Math.random() * (ANIMATION_CONFIG.particleMaxDuration - ANIMATION_CONFIG.particleMinDuration),
      delay: Math.random() * ANIMATION_CONFIG.particleMaxDelay,
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section
      className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: 'url(/Landing-Page-BG.jpg)' }}
      id="home"
    >
      {/* Dynamic overlay with mouse tracking */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), 
                       linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)`
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            transition: { duration: 0.3 }
          }}
        >
          BizProLex Legal
        </motion.h1>

        <motion.p 
          className="mt-4 max-w-2xl text-white/90 text-lg sm:text-xl"
          variants={itemVariants}
        >
          Specialised Legal Consultancy in the UAE
        </motion.p>

        <motion.div 
          className="mt-10"
          variants={itemVariants}
        >
          <motion.button
            onClick={onLearnMore}
            className="rounded-md bg-gold px-6 py-3 font-medium text-black shadow-sm"
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 20px 40px rgba(255, 215, 0, 0.3)',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
