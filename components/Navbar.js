import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
  { name: 'Services', href: '/services/' },
  { name: 'Our Team', href: '/team/' },
  { name: 'Contact', href: '/contact/' },
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

  // Get the appropriate href for each navigation item based on current path
  const getNavHref = (itemHref) => {
    const path = router.pathname;
    
    // If we're on a team member page (/team/kerem/ or /team/sujata/)
    if (path === '/team/kerem' || path === '/team/sujata' || path === '/team/kerem/' || path === '/team/sujata/') {
      // "Our Team" from a team member page should go to the main team page (..)
      if (itemHref === '/team/') return '../';
      // Home should go to root (../../)
      if (itemHref === '/') return '../../';
      // About, Services, Contact should go up 2 levels (../../)
      return '../../' + itemHref.slice(1);
    }
    
    // If we're on the main team page (/team/)
    if (path === '/team' || path === '/team/') {
      // "Our Team" should stay on same page
      if (itemHref === '/team/') return './team/';
      // Home should go to root
      if (itemHref === '/') return '../';
      // Other pages go up one level
      return '../' + itemHref.slice(1);
    }
    
    // Default: use current directory
    return '.' + itemHref;
  };

  // Get the appropriate path for logo and home link
  const getBasePath = () => {
    const path = router.pathname;
    if (path === '/team/kerem' || path === '/team/sujata' || path === '/team/kerem/' || path === '/team/sujata/') {
      return '../..';
    }
    if (path === '/team' || path === '/team/') {
      return '..';
    }
    return '.';
  };

  const basePath = getBasePath();

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 bg-black shadow-lg border-b border-gold/30`}>
      <nav className="container-px mx-auto flex h-16 items-center justify-between">
        <Link href={basePath + '/'} className="flex items-center">
          <img 
            src={basePath + '/LOGO.png'} 
            alt="BizProLex Legal" 
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={getNavHref(item.href)}
                className="text-white/90 hover:text-gold transition-colors font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

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
            <ul className="container-px py-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={getNavHref(item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-white/90 hover:text-gold hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </header>
  );
}
