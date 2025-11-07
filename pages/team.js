import { motion } from 'framer-motion';
import Section from '@/components/Section';
import Link from 'next/link';

export default function Team() {
  return (
    <>
      <Section title="Our Team" className="pt-6 md:pt-8 pb-6" titleClassName="text-4xl md:text-5xl">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Sujata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-black/10 hover:border-gold/60 bg-white p-6 transition-colors flex flex-col"
          >
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 shrink-0 rounded-lg bg-black border border-black/20 flex items-center justify-center">
                <span className="text-white font-playfair text-lg">SD</span>
              </div>
              <div className="flex-1 min-h-0 pr-1">
                <h3 className="font-playfair text-2xl text-black">Sujata  Duge, LL.M.</h3>
                <p className="text-black/80">Managing Director</p>
                <ul className="mt-4 space-y-2 text-black/90 text-sm md:text-base list-disc pl-5">
                  <li>15+ years across capital markets, project finance, and corporate advisory</li>
                  <li>Advises on commercial/financing negotiations and employment matters</li>
                  <li>UAE sectors: consulting, retail, logistics, technology, real estate, entertainment</li>
                  <li>LL.M. International Financial Law, King’s College London</li>
                </ul>
                <Link href="/team/sujata" className="mt-5 inline-flex items-center text-black underline decoration-gold underline-offset-4 hover:text-gold font-medium">
                  Read full bio →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Kerem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-xl border border-black/10 hover:border-gold/60 bg-white p-6 transition-colors flex flex-col"
          >
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 shrink-0 rounded-lg bg-black border border-black/20 flex items-center justify-center">
                <span className="text-white font-playfair text-lg">KE</span>
              </div>
              <div className="flex-1 min-h-0 pr-1">
                <h3 className="font-playfair text-2xl text-black">Kerem Selahattin Ergün, LL.M</h3>
                <p className="text-black/80">Of Counsel</p>
                <ul className="mt-4 space-y-2 text-black/90 text-sm md:text-base list-disc pl-5">
                  <li>15+ years across litigation, M&A, employment, IP, entertainment</li>
                  <li>Strategic, results-driven counsel across transactional and litigation</li>
                  <li>Focus on the evolving esports law landscape</li>
                </ul>
                <Link href="/team/kerem" className="mt-5 inline-flex items-center text-black underline decoration-gold underline-offset-4 hover:text-gold font-medium">
                  Read full bio →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
