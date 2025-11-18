import Section from '@/components/Section';
import Image from 'next/image';

export default function Team() {
  return (
    <>
      <Section title="Our Team" className="pt-6 md:pt-8 pb-6" titleClassName="text-4xl md:text-5xl">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Sujata */}
          <div className="rounded-xl border border-black/10 hover:border-gold/60 bg-white p-6 transition-colors flex flex-col animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-black border border-black/20">
                <Image
                  src="/Sujata.jpeg"
                  alt="Sujata Duge"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair text-2xl text-black">Sujata  Duge, LL.M.</h3>
                <p className="text-black/80">Managing Director</p>

                <div className="mt-4 space-y-3 text-black/90 leading-relaxed text-justify">
                  <p>
                    Sujata Duge advises clients on key commercial and financing agreements, business operations, and employment matters. With over 15 years of experience in capital markets, project finance, and corporate advisory, she brings commercial insight and international legal training to support businesses navigating complex regulatory and transactional landscapes in the UAE and beyond.
                  </p>
                  <p>
                    Her UAE practice includes advising on, drafting, and negotiating contracts across sectors such as consulting, mall management, logistics, retail, distribution, technology, real estate, luxury goods trading &amp; financing, perfumery, and entertainment. She has worked with major financial institutions and boutique law firms on capital market transactions, covering private placements, IPOs, rights issues, equity/debt transactions, project finance, corporate lending, restructuring, M&amp;A and cross-border advisory.
                  </p>
                  <p>
                    Sujata holds an LLM in International Financial Law from King's College London and has completed the DIFC Laws Certificate Programme 2025 to deepen her expertise in the common law framework of the DIFC laws and courts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kerem */}
          <div className="rounded-xl border border-black/10 hover:border-gold/60 bg-white p-6 transition-colors flex flex-col animate-fade-in-delay">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-black border border-black/20">
                <Image
                  src="/Kerem.jpeg"
                  alt="Kerem Selahattin Ergün"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair text-2xl text-black">Kerem Selahattin Ergün, LL.M</h3>
                <p className="text-black/80">Of Counsel</p>

                <div className="mt-4 space-y-3 text-black/90 leading-relaxed text-justify">
                  <p>
                    Kerem is a highly experienced lawyer with over 15 years in the legal profession, specializing in a diverse range of practice areas, including commercial litigation, mergers and acquisitions, employment law, intellectual property law, entertainment law, and the rapidly evolving field of esports law. His extensive background in these areas allows him to provide strategic, results-driven legal advice to clients across various industries. Kerem's commitment to excellence and deep understanding of complex legal frameworks ensure that his clients receive the highest level of representation and support in navigating both transactional and litigation matters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}