import { motion } from 'framer-motion';

export default function Hero({ onLearnMore }) {
  return (
    <section
      className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: 'url(/LANDING-PAGE-BG.jpg)' }}
      id="home"
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white"
        >
          BizProLex Legal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="mt-4 max-w-2xl text-white/90 text-lg sm:text-xl"
        >
          Specialised Legal Consultancy in the UAE
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="mt-10"
        >
          <button
            onClick={onLearnMore}
            className="rounded-md bg-gold px-6 py-3 font-medium text-black shadow-sm hover:shadow-lg transition-shadow"
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
