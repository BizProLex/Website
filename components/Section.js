import { motion } from 'framer-motion';

export default function Section({ id, title, children, className = '', titleClassName = '' }) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      <div className="container-px mx-auto max-w-6xl">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className={`font-playfair text-3xl sm:text-4xl text-black ${titleClassName}`}
          >
            {title}
          </motion.h2>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className={title ? 'mt-6' : ''}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
