import Section from '@/components/Section';
import { CONTACT_INFO } from '@/config/constants';

export default function Contact() {
  return (
    <>
      <Section title="Contact">
        <div className="mt-8">
          <div className="space-y-4 text-black/90 text-left">
            <p><strong>M:</strong> +971 567449815</p>
            <p><strong>E:</strong> <a className="text-black underline" href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a></p>
            <p><strong>Web:</strong> <a className="text-black underline" href={CONTACT_INFO.website} target="_blank" rel="noreferrer">{CONTACT_INFO.website}</a></p>
            <p><strong>LinkedIn:</strong> <a className="text-black underline" href={CONTACT_INFO.linkedIn} target="_blank" rel="noreferrer">linkedin.com/in/sujataduge</a></p>
          </div>
        </div>
      </Section>
    </>
  );
}