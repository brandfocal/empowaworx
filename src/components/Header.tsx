import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

export interface SubMenuItem {
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  subItems?: SubMenuItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'Who We Are', href: '/about' },
  { 
    id: 'advisory', 
    label: 'What We Do', 
    href: '/advisory',
    subItems: [
      { label: 'Strategic Communications, PR, Reputation & Media', href: '/advisory-comms' },
      { label: 'Experiential Marketing, Events & Activations Practice', href: '/advisory-brand' },
      { label: 'Executive Influence, Thought Leadership & Speaker Bureau', href: '/advisory-influence' },
      { label: 'Influencer Marketing, Creator Economy & Cultural Influence', href: '/advisory-influencer' },
      { label: 'Strategic Creative Marketing, Brand & Advertising', href: '/advisory-marketing' },
      { label: 'ESG, Impact & Economic Development Advisory', href: '/advisory-esg' },
      { label: 'Digital, AI, Content & Performance Marketing', href: '/advisory-digital' }
    ]
  },
  { id: 'platforms', label: 'Proprietary Platforms', href: '/platforms' },
  { id: 'legacy', label: 'Legacy Events', href: '/legacy' },
  { id: 'gallery', label: 'Media & Gallery', href: '/gallery' },
  { id: 'upcoming', label: 'Upcoming Events', href: '/upcoming' },
  { id: 'careers', label: 'Careers', href: '/careers' },
];

const VALID_PATHS = ['/about', '/platforms', '/advisory-trust', '/advisory-marketing', '/advisory-comms', '/advisory-brand', '/advisory-esg', '/advisory-digital', '/advisory-influence', '/advisory-influencer', '/advisory-ecosystem', '/legacy', '/gallery', '/careers', '/upcoming', '/contact'];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = React.useState<string | null>(null);
  const [currentPath, setCurrentPath] = React.useState(() => typeof window !== 'undefined' ? window.location.pathname || '/' : '/');

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Run initially
    onScroll();

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate-changed', handleLocationChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate-changed', handleLocationChange);
    };
  }, []);

  return (
    <header className="relative">
      {/* ── NAVIGATION ─── */}
      <nav className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-24 flex items-center justify-between',
        isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-[#1E1E1E]/8 py-4' : 'bg-transparent py-6'
      )}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
          className="flex items-center gap-1"
        >
          <a href="/" className="flex items-center group">
            <img 
              src="/logo/Empowaworx-logo-png-bigger.png" 
              alt="EmpowaWorx Logo" 
              className={cn('h-9 w-auto object-contain transition-all duration-300', !isScrolled && 'brightness-0 invert')} 
            />
          </a>
        </motion.div>
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item, idx) => {
            const isLinkable = VALID_PATHS.includes(item.href);
            const hasDropdown = !!item.subItems;
            const isActive = item.id !== 'advisory' && (item.href === currentPath || (item.subItems && item.subItems.some(sub => sub.href === currentPath && sub.href !== '#')));

            return (
              <motion.div
                key={item.id}
                className="relative py-2"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.5, ease: EASE_SMOOTH }}
                onMouseEnter={() => hasDropdown && setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {hasDropdown ? (
                  <span
                    className={cn(
                      'text-[13px] font-medium transition-colors tracking-[-0.01em] flex items-center gap-1.5 cursor-default select-none',
                      isActive 
                        ? 'text-[#FC3637]' 
                        : isScrolled ? 'text-[#1E1E1E]/60 hover:text-[#1E1E1E]' : 'text-white hover:text-white/80'
                    )}
                  >
                    <span>{item.label}</span>
                    <svg 
                      className={cn(
                        "w-3 h-3 transition-transform duration-250 opacity-70",
                        hoveredItem === item.id ? "rotate-180" : ""
                      )} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                ) : isLinkable ? (
                  <a
                    href={item.href}
                    className={cn(
                      'nav-link-animated text-[13px] font-medium transition-colors tracking-[-0.01em] flex items-center gap-1.5',
                      isActive 
                        ? 'text-[#FC3637] nav-active' 
                        : isScrolled ? 'text-[#1E1E1E]/60 hover:text-[#1E1E1E] nav-dark' : 'text-white hover:text-white/80 nav-light'
                    )}
                  >
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <span
                    className={cn(
                      'text-[13px] font-medium tracking-[-0.01em] flex items-center gap-1.5 cursor-default opacity-40 select-none',
                      isScrolled ? 'text-[#1E1E1E]' : 'text-white'
                    )}
                  >
                    <span>{item.label}</span>
                  </span>
                )}
                {hasDropdown && item.subItems && (
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: EASE_SMOOTH }}
                        className={cn(
                          'absolute top-full left-0 mt-2 w-[340px] p-2 shadow-2xl z-50 flex flex-col gap-0.5 border rounded-none',
                          isScrolled ? 'bg-white border-[#1E1E1E]/8' : 'bg-[#111111] border-white/10'
                        )}
                      >
                        {item.subItems.map((sub, sIdx) => {
                          const isSubLinkable = VALID_PATHS.includes(sub.href);
                          const isSubActive = sub.href === currentPath;
                          return isSubLinkable ? (
                            <a
                              key={sIdx}
                              href={sub.href}
                              className={cn(
                                'group flex items-center px-4 py-2.5 transition-all duration-150 border-l-2 text-left',
                                isSubActive ? 'border-[#FC3637] bg-[#FC3637]/5' : 'border-transparent hover:border-[#FC3637]/60',
                                isScrolled 
                                  ? 'hover:bg-[#F5F5F5] text-[#1E1E1E]' 
                                  : 'hover:bg-white/5 text-white'
                              )}
                            >
                              <span className={cn(
                                'text-[12px] font-semibold leading-snug tracking-tight transition-colors duration-150',
                                isSubActive
                                  ? 'text-[#FC3637]'
                                  : isScrolled ? 'text-[#1E1E1E]/80 group-hover:text-[#FC3637]' : 'text-white/80 group-hover:text-[#FC3637]'
                              )}>
                                {sub.label}
                              </span>
                            </a>
                          ) : (
                            <div
                              key={sIdx}
                              className={cn(
                                'flex items-center px-4 py-2.5 text-left opacity-30 cursor-default select-none border-l-2 border-transparent',
                                isScrolled ? 'text-[#1E1E1E]' : 'text-white'
                              )}
                            >
                              <span className="text-[12px] font-semibold leading-snug tracking-tight">
                                {sub.label}
                              </span>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
          <motion.a
            href="/contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="group relative flex items-center gap-3 bg-[#FC3637] px-6 py-3 h-[44px] overflow-hidden transition-transform active:scale-95"
          >
            <span className="relative z-10 text-white font-semibold text-[13px] tracking-tight">Get In Touch</span>
            <div className="relative z-10 w-4 h-4 bg-white flex items-center justify-center transform transition-transform group-hover:rotate-45">
              <ArrowUpRight size={11} className="text-[#1E1E1E]" />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          </motion.a>
        </div>
        <button
          className={cn('lg:hidden p-2', isScrolled ? 'text-[#1E1E1E]' : 'text-white')}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-start py-20 px-8 overflow-y-auto"
          >
            <button
              className="absolute top-6 right-6 text-[#1E1E1E]"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={28} />
            </button>
            <div className="w-full flex flex-col gap-6 items-center py-6">
              {NAV_ITEMS.map((item) => {
                const isLinkable = VALID_PATHS.includes(item.href);
                const hasDropdown = !!item.subItems;
                const isActive = item.id !== 'advisory' && (item.href === currentPath || (item.subItems && item.subItems.some(sub => sub.href === currentPath && sub.href !== '#')));

                return (
                  <div key={item.id} className="w-full flex flex-col items-center">
                    {hasDropdown ? (
                      <>
                        <button
                          onClick={() => setMobileExpandedItem(mobileExpandedItem === item.id ? null : item.id)}
                          className={cn(
                            "text-2xl font-semibold hover:text-[#FC3637] transition-colors tracking-[-0.04em] flex items-center gap-2",
                            isActive ? "text-[#FC3637]" : "text-[#1E1E1E]"
                          )}
                        >
                          <span>{item.label}</span>
                          <svg 
                            className={cn("w-5 h-5 transition-transform duration-200", mobileExpandedItem === item.id ? "rotate-180" : "")} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {mobileExpandedItem === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="flex flex-col items-center gap-3 mt-3 overflow-hidden w-full bg-neutral-50 py-3"
                            >
                              {item.subItems?.map((sub, sIdx) => {
                                const isSubLinkable = VALID_PATHS.includes(sub.href);
                                const isSubActive = sub.href === currentPath;
                                return isSubLinkable ? (
                                  <a
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={cn(
                                      "text-sm font-semibold hover:text-[#FC3637] transition-colors text-center px-4",
                                      isSubActive ? "text-[#FC3637]" : "text-[#1E1E1E]/70"
                                    )}
                                  >
                                    {sub.label}
                                  </a>
                                ) : (
                                  <span
                                    key={sIdx}
                                    className="text-sm font-semibold text-[#1E1E1E]/30 text-center px-4 cursor-default select-none"
                                  >
                                    {sub.label}
                                  </span>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : isLinkable ? (
                      <a
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "text-2xl font-semibold hover:text-[#FC3637] transition-colors tracking-[-0.04em]",
                          isActive ? "text-[#FC3637]" : "text-[#1E1E1E]"
                        )}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span
                        className="text-2xl font-semibold text-[#1E1E1E]/30 tracking-[-0.04em] cursor-default select-none"
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <a
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full mt-4 bg-[#FC3637] text-white py-4 text-sm font-semibold tracking-[-0.01em] text-center shrink-0"
            >
              Get In Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
