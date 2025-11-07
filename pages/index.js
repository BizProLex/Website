import { useCallback } from 'react';
import Hero from '@/components/Hero';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const handleLearnMore = useCallback(() => {
    router.push('/about');
  }, [router]);

  return (
    <>
      <Hero onLearnMore={handleLearnMore} />

      {/* Removed homepage About preview per request */}
    </>
  );
}
