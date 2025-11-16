import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES } from '@/config/constants';

const navItems = [
  { name: 'Home', href: ROUTES.HOME },
  { name: 'About', href: ROUTES.ABOUT },
  { name: 'Services', href: ROUTES.SERVICES },
  { name: 'Our Team', href: ROUTES.TEAM },
  { name: 'Contact', href: ROUTES.CONTACT },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Always render a black top bar per request
  useEffect(() => {
    setScrolled(true);
  }, [router.pathname]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open]);

  // Calculate relative path prefix based on current route depth
  const getRelativePrefix = () => {
    const path = router.pathname;
    if (path.startsWith('/team/') && path !== '/team' && path !== '/team/') {
      return '../..'; // Team member pages are 2 levels deep
    }
    if (path === '/team' || path === '/team/' || 
        path.startsWith('/about') || path.startsWith('/services') || 
        path.startsWith('/contact') || path.startsWith('/thanks')) {
      return '..'; // Pages in subdirectories need one level up
    }
    return '.'; // Root pages
  };

  const relativePrefix = getRelativePrefix();

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 bg-black shadow-lg border-b border-gold/30`}>
      <nav className="container-px mx-auto flex h-16 items-center justify-between">
        {/* Desktop nav - now on the left */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={relativePrefix + item.href}
                className="text-white/90 hover:text-gold transition-colors font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo now on the right */}
        <Link href={relativePrefix + '/'} className="flex items-center">
          <img 
            src={relativePrefix + '/LOGO.png'} 
            alt="BizProLex Legal" 
            className="h-8 w-auto"
          />
        </Link>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:text-gold focus-visible:ring-gold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden bg-black border-t border-white/10 animate-slide-down">
            <div className="container-px py-4">
              {/* Logo at top of mobile menu */}
              <div className="flex justify-center mb-4">
                <Link href={relativePrefix + '/'} className="flex items-center" onClick={() => setOpen(false)}>
                  <img
                    src={relativePrefix + '/LOGO.png'}
                    alt="BizProLex Legal"
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={relativePrefix + item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-white/90 hover:text-gold hover:bg-white/5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </header>
  );
}
