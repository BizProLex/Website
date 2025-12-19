import Section from '@/components/Section';
import { CONTACT_INFO } from '@/config/constants';
import Image from 'next/image';

export default function Contact() {
  return (
    <>
      <Section title="Contact" titleClassName="text-4xl md:text-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8">
          <div className="space-y-5 text-black/90 text-left text-lg md:text-xl">
            <p><strong>M:</strong> +971 567449815</p>
            <p><strong>E:</strong> <a className="text-black underline" href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a></p>
            <p><strong>Web:</strong> <a className="text-black underline" href={CONTACT_INFO.website} target="_blank" rel="noreferrer">{CONTACT_INFO.website}</a></p>
            <p><strong>LinkedIn:</strong> <a className="text-black underline" href={CONTACT_INFO.linkedIn} target="_blank" rel="noreferrer">linkedin.com/in/sujataduge</a></p>
          </div>

          <div className="flex items-center justify-center -mt-4 lg:mt-0">
            <div className="relative w-full max-w-2xl">
              <Image
                src="/contactus.png"
                alt="Contact us"
                width={1000}
                height={750}
                className="w-full h-auto object-cover rounded-lg border border-black/20"
                priority
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
