import Section from '@/components/Section';
import Image from 'next/image';

const sectors = [
  'Retail',
  'International Distribution',
  'Technology',
  'Entertainment',
  'Human Resources',
  'Energy Efficiency',
  'Luxury Goods Trading',
  'Real Estate',
  'Jewellery Business',
  'Interior Design',
];

export default function Services() {
  return (
    <div className="text-justify">
      <Section title="Legal Consultancy Services – Our Offerings" className="py-8 md:py-10" titleClassName="text-3xl md:text-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6 text-black/90 leading-relaxed">
            <p>
              At BizProLex Legal, we provide tailored, precise, and cost effective legal solutions to corporates, SMEs, startups, and entrepreneurs operating across diverse sectors.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-5">
              {sectors.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full bg-gold px-5 py-2.5 text-base md:text-lg font-medium text-black shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>
            <p>
              Our services encompass drafting, vetting, and negotiation of business contracts, financing documentation, and comprehensive legal advisory across commercial and corporate matters. We also assist individuals and companies in resolving employment-related issues and offer testamentary and estate-planning solutions, including wills and succession documents.
            </p>
            <p>
              We cater to domestic clients in the UAE as well as international clients engaging in business transactions with UAE based companies. Our clientele extends across the UAE, Turkey, Jordan, India, and Ivory Coast, reflecting our capability in handling cross-border legal documentation and advisory.
            </p>
            <p>Client recommendations and references are available upon request.</p>
          </div>

          <div className="flex items-center justify-center -mt-4 ml-8">
            <div className="relative w-full h-96">
              <Image
                src="/fountain-pen-resting-signed-document-wax-seal-representing-contract-legal-agreement-409051338.webp"
                alt="Legal contract with fountain pen and wax seal"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg border border-black/20"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}