import Section from '@/components/Section';

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
    <>
      <Section title="Legal Consultancy Services – Our Offerings" className="py-8 md:py-10" titleClassName="text-3xl md:text-4xl">
        <div className="grid grid-cols-1 gap-6 items-start">
          <div className="space-y-6 text-black/90 leading-relaxed max-w-3xl">
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
        </div>
      </Section>
    </>
  );
}
