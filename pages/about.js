import Section from '@/components/Section';

export default function About() {
  return (
    <>
      <Section title="About Us">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6 text-black/90 leading-relaxed">
            <p>
              BizProLex Legal is a forward-thinking legal consultancy based in the UAE, dedicated to empowering corporates, SMEs, startups and individuals with practical and effective business legal solutions. Our mission is to simplify commercial documentation and compliance while redefining how businesses approach legal challenges enabling operations that are both efficient and compliant.
            </p>
            <p>
              Although a young and dynamic legal consultancy firm, BizProLex Legal has rapidly established its presence across diverse sectors including retail, entertainment, human resources, real estate, energy efficiency, accountancy companies and luxury funding etc.. Our tailored, solution-oriented approach has consistently delivered measurable results, helping clients enhance growth, mitigate risks and strengthen operational efficiency.
            </p>
            <p>
              We assist UAE based companies and international clients engaging in business transactions with UAE based entities, providing legal support across mainland and free zones, including JAFZA, DIFC and ADGM in areas such as employment, commercial and corporate matters.
            </p>
            <p>
              For litigation, criminal and family-law cases we collaborate with reputed local law firms, ensuring our clients have access to end-to-end legal support.
            </p>
            <p>
              At BizProLex Legal, we value collaboration and believe in building partnerships that foster mutual success. Our commitment lies in delivering timely, cost effective and business focused legal solutions, guided by integrity, responsiveness and a deep understanding of our clients’ commercial objectives.
            </p>
          </div>
          <div className="relative w-full h-96">
            <div className="absolute inset-0 rounded-lg border border-black/10 bg-gradient-to-br from-black to-black flex items-center justify-center">
              <span className="text-white/80 font-playfair text-xl">Founder Image Placeholder</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Team link removed as Our Team is now in the top navigation */}
    </>
  );
}
