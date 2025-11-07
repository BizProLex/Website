import Section from '@/components/Section';
import Link from 'next/link';

export default function Thanks() {
  return (
    <Section title="Thank You" titleClassName="text-4xl md:text-5xl">
      <div className="max-w-2xl text-black/90 space-y-4">
        <p>Your message has been sent. We will get back to you shortly.</p>
        <Link href="/" className="inline-flex items-center text-black underline decoration-gold underline-offset-4 hover:text-gold font-medium">
          Back to Home →
        </Link>
      </div>
    </Section>
  );
}

