import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Instagram, Twitter, Facebook, Youtube, CheckCircle, AlertCircle } from 'lucide-react';
import { submitToGravityForm } from '../services/gravityForms';

const OFFICE_CITIES: string[] = [];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function useBidirectionalInView(threshold = 0.1) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const prevScrollY = React.useRef(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY >= prevScrollY.current;
      prevScrollY.current = currentScrollY;
      if (entry.isIntersecting) {
        setInView(true);
      } else {
        const rect = entry.boundingClientRect;
        const isAboveViewport = rect.bottom < 0;
        if (!scrollingDown || isAboveViewport) {
          setInView(false);
        }
      }
    }, {
      threshold
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export const Footer = () => {
  const { ref: footerColsRef, inView: footerColsInView } = useBidirectionalInView(0.1);
  const reducedMotion = usePrefersReducedMotion();

  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStatusMessage(null);
    setIsSuccess(null);

    try {
      const res = await submitToGravityForm('newsletter', {
        input_1: email
      });

      if (res.isSuccess) {
        setIsSuccess(true);
        setStatusMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setIsSuccess(false);
        setStatusMessage(res.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setIsSuccess(false);
      setStatusMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const S = (inView: boolean, delay: number = 0, duration: number = 0.6) => ({
    opacity: inView || reducedMotion ? 1 : 0,
    transform: inView || reducedMotion ? 'none' : 'translateY(30px)',
    transition: `opacity ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
  }) as React.CSSProperties;

  return (
    <footer className="px-6 md:px-24 pt-16 pb-12" style={{
      background: '#0D0D0D',
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-[1600px] mx-auto">
        <div ref={footerColsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-6" style={S(footerColsInView, 0, 0.6)}>
            <a href="/" className="flex items-center group">
              <img 
                src="/logo/Empowaworx-logo-png-bigger.png" 
                alt="EmpowaWorx Logo" 
                className="h-10 w-auto object-contain brightness-0 invert" 
              />
            </a>
            <p className="text-[13px] font-medium leading-relaxed" style={{
              color: 'rgba(255,255,255,0.55)'
            }}>
              Africa's Leading Growth, Reputation, Influence &amp; Impact Advisory Firm™
            </p>
            {/* Office strip */}
            <div className="flex flex-col gap-1 pt-2 border-t" style={{
              borderColor: 'rgba(255,255,255,0.08)'
            }}>
              {OFFICE_CITIES.map(city => (
                <span key={city} className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{
                  color: 'rgba(255,255,255,0.28)'
                }}>
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-5" style={S(footerColsInView, 80, 0.6)}>
            <h5 className="text-[10px] font-bold tracking-[0.22em] uppercase mb-1" style={{
              color: '#9B1B30'
            }}>Navigation</h5>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Who We Are', href: '/about' },
                { label: 'Proprietary Platforms', href: '/platforms' },
                { label: 'Media & Gallery', href: '/gallery' },
                { label: 'Legacy Events', href: '/legacy' },
                { label: 'Careers', href: '/careers' },
                { label: 'Upcoming Events', href: '/upcoming' },
                { label: 'Contact Us', href: '/contact' }
              ].map(link => (
                <a key={link.label} href={link.href} className="footer-nav-link text-[13px] font-medium transition-colors duration-200" style={{
                  color: 'rgba(255,255,255,0.55)'
                }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col gap-5" style={S(footerColsInView, 160, 0.6)}>
            <h5 className="text-[10px] font-bold tracking-[0.22em] uppercase mb-1" style={{
              color: '#9B1B30'
            }}>Connect</h5>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-white/40" />
                <a href="tel:+27111000000" className="text-[13px] font-medium transition-colors duration-200 footer-contact-link" style={{
                  color: 'rgba(255,255,255,0.55)'
                }}>
                  +27 (0) 11 482 7210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-white/40" />
                <div className="flex flex-col">
                  <a href="mailto:info@empowaworx.co.za" className="text-[13px] font-medium transition-colors duration-200 footer-contact-link" style={{
                    color: 'rgba(255,255,255,0.55)'
                  }}>
                    info@empowaworx.co.za
                  </a>
                  <a href="mailto:talent@empowaworx.co.za" className="text-[13px] font-medium transition-colors duration-200 footer-contact-link" style={{
                    color: 'rgba(255,255,255,0.55)'
                  }}>
                    talent@empowaworx.co.za
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-white/40 shrink-0 mt-0.5" />
                <span className="text-[13px] font-medium leading-relaxed" style={{
                  color: 'rgba(255,255,255,0.55)'
                }}>
                  364 Pine Avenue,<br />
                  Ferndale, Randburg, 2196
                </span>
              </div>
            </div>
          </div>

          {/* Column 4 — Newsletter / Social */}
          <div className="flex flex-col gap-5" style={S(footerColsInView, 240, 0.6)}>
            <h5 className="text-[10px] font-bold tracking-[0.22em] uppercase mb-1" style={{
              color: '#9B1B30'
            }}>Ecosystem Updates</h5>
            <p className="text-[12px] font-medium leading-relaxed" style={{
              color: 'rgba(255,255,255,0.4)'
            }}>
              Subscribe to receive insights, summit highlights, and platform opportunities across the African continent.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 bg-white/5 border border-white/10 px-4 py-2 text-[13px] text-white focus:outline-none focus:border-[#9B1B30] transition-colors disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#9B1B30] text-white px-4 py-2 text-[13px] font-semibold hover:bg-[#b0223b] transition-colors disabled:opacity-50 flex items-center justify-center min-w-[76px]"
                >
                  {isSubmitting ? (
                    <>
                      <style>{`
                        @keyframes dot-bounce {
                          0%, 100% { transform: translateY(0); opacity: 0.3; }
                          50% { transform: translateY(-3px); opacity: 1; }
                        }
                        .loading-dot {
                          display: inline-block;
                          width: 4px;
                          height: 4px;
                          border-radius: 50%;
                          background-color: currentColor;
                          animation: dot-bounce 1.4s infinite ease-in-out both;
                        }
                        .loading-dot:nth-child(1) { animation-delay: -0.32s; }
                        .loading-dot:nth-child(2) { animation-delay: -0.16s; }
                      `}</style>
                      <span className="flex items-center justify-center gap-1">
                        <span className="loading-dot" />
                        <span className="loading-dot" />
                        <span className="loading-dot" />
                      </span>
                    </>
                  ) : (
                    'Join'
                  )}
                </button>
              </div>
              {statusMessage && (
                <div 
                  className="flex items-center gap-2 mt-2 font-semibold"
                  style={{
                    color: isSuccess ? '#4ADE80' : '#FCA5A5',
                    fontSize: '11px'
                  }}
                >
                  {isSuccess ? (
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 animate-bounce" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}
            </form>
            <div className="flex items-center gap-3 mt-2">
              {[
                { icon: <Linkedin size={15} />, href: 'https://www.linkedin.com/in/empowaworx-pty-ltd-948035185/', label: 'EmpowaWorx™ on LinkedIn' },
                { icon: <Instagram size={15} />, href: 'https://www.instagram.com/empowaworx?igsh=ZW1mMnM1bDNjdjQ2', label: '@empowaworx' },
                { icon: <Twitter size={15} />, href: 'https://x.com/empowaworxevent?s=21', label: '@empowaworx' },
                { icon: <Facebook size={15} />, href: 'https://www.facebook.com/share/1C9KjWUUMw/?mibextid=wwXIfr', label: 'EmpowaWorx on Facebook' },
                { icon: <Youtube size={15} />, href: 'https://www.youtube.com/@empowaworx6407', label: 'EmpowaWorx on YouTube' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
                  style={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.55)'
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t" style={{
          borderColor: 'rgba(255,255,255,0.06)'
        }}>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em]" style={{
            color: 'rgba(255,255,255,0.28)'
          }}>
            © 2026 EmpowaWorx™. All Rights Reserved.&nbsp;&nbsp;100% Black-owned Pan-African Advisory Firm.
          </p>
          <div className="flex gap-6 text-[11px] font-semibold uppercase tracking-[0.14em]">
            <a href="/privacy" className="hover:text-white transition-colors" style={{
              color: 'rgba(255,255,255,0.28)'
            }}>Privacy Policy</a>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
            <a href="/terms" className="hover:text-white transition-colors" style={{
              color: 'rgba(255,255,255,0.28)'
            }}>Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
