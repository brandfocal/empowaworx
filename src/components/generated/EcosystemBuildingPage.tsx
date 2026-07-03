import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, Network, Users, Briefcase, Layers, Handshake, TrendingUp, Globe, Award, LucideProps, Linkedin, Instagram } from 'lucide-react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = {
  red: '#FC3637',
  redDark: '#D92D2E',
  ink: '#111111',
  charcoal: '#1A1A1A',
  panel: '#111111',
  darkPanel: '#141414',
  footerBg: '#0A0A0A',
  white: '#FFFFFF',
  offWhite: '#F9F9F9',
  midGray: '#757575',
  border: '#E5E5E5',
  surface: '#F5F5F5'
};

// ─── Eyebrow Component ──────────────────────────────────
const Eyebrow = ({
  children,
  light = false
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <div className="mb-4">
    <p style={{
      color: light ? 'rgba(255,255,255,0.6)' : '#E63329',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      fontFamily: 'Inter, sans-serif',
      margin: 0
    }}>
      {children}
    </p>
  </div>
);

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ServiceData {
  id: string;
  title: string;
  teaser: string;
  services: string[];
  image: string;
}

interface FacultyMemberData {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

const FACULTY_MEMBERS: FacultyMemberData[] = [{
  id: 'f1',
  name: 'Mika Chauke',
  title: 'Lead Advisor: Ecosystem Building, Partnerships & Capital Mobilisation',
  description: 'Supports ecosystem design, strategic partnerships, coalition building, investor engagement, and collaborative platforms.',
  image: '/Mika-Chauke.jpg'
}, {
  id: 'f2',
  name: '[To Be Announced]',
  title: 'Director: Ecosystem Building, Partnerships & Capital Mobilisation',
  description: 'Leads large-scale alliances, investment dialogues, stakeholder mobilisation, capital sourcing strategy, and partnership governance.',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
}];
interface OutcomeData {
  id: string;
  title: string;
  icon: React.ReactElement<LucideProps>;
}
interface TagData {
  id: string;
  label: string;
}
interface FooterLinkData {
  id: string;
  label: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const TICKER_ITEMS: string[] = ['ECOSYSTEM BUILDING', 'STRATEGIC PARTNERSHIPS', 'CAPITAL MOBILISATION', 'STAKEHOLDER ALLIANCES', 'MULTI-STAKEHOLDER NETWORKS', 'INVESTMENT PLATFORMS', 'SHARED VALUE CREATION', 'INCLUSIVE GROWTH'];
const SERVICES: ServiceData[] = [
  {
    id: 'sv1',
    title: 'Partnership Strategy',
    teaser: 'Developing robust frameworks for high-impact strategic alliances.',
    services: ['Partnership Strategy Development', 'Strategic Partnership Advisory', 'Partnership Growth Frameworks', 'Stakeholder Alignment Strategies', 'Commercial Partnership Models', 'Partnership Governance & Optimisation'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80'
  },
  {
    id: 'sv2',
    title: 'Sponsorship & Funding Advisory',
    teaser: 'Mobilising resources through sophisticated positioning and engagement.',
    services: ['Sponsorship Strategy Development', 'Funding & Resource Mobilisation Advisory', 'Corporate Partnership Development', 'Development Finance Engagement', 'Sponsorship Acquisition & Management', 'Funding Readiness & Positioning'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
  },
  {
    id: 'sv3',
    title: 'Ecosystem Design',
    teaser: 'Architecting interconnected networks for collaborative innovation.',
    services: ['Ecosystem Strategy & Architecture', 'Stakeholder Ecosystem Mapping', 'Cross-Sector Collaboration Models', 'Public-Private Partnership Frameworks', 'Ecosystem Governance Structures', 'Collective Impact Platforms'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
  },
  {
    id: 'sv4',
    title: 'Industry Coalition Building',
    teaser: 'Unifying sector players to drive collective advocacy and impact.',
    services: ['Industry Coalition Development', 'Sector Collaboration Platforms', 'Strategic Alliance Development', 'Advocacy Coalitions', 'Industry Networks & Forums', 'Multi-Partner Initiatives'],
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80'
  },
  {
    id: 'sv5',
    title: 'Multi-Stakeholder Platforms',
    teaser: 'Convening influential leaders for high-level dialogue and action.',
    services: ['Leadership Forums & Dialogues', 'Executive Roundtables', 'Stakeholder Engagement Platforms', 'Economic Development Platforms', 'Public-Private Convenings', 'Strategic Collaboration Networks'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
  },
  {
    id: 'sv6',
    title: 'Investor Engagement',
    teaser: 'Connecting capital to opportunity through strategic introductions.',
    services: ['Investor Relations Support', 'Capital Mobilisation Strategies', 'Investor Readiness Advisory', 'Investor & Funder Introductions', 'Investment Forums & Roundtables', 'Development Finance Engagement'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80'
  },
  {
    id: 'sv7',
    title: 'Strategic Introductions',
    teaser: 'Brokering access to high-value networks and decision-makers.',
    services: ['Executive Introductions', 'Investor & Capital Introductions', 'Government & Policymaker Access', 'Industry & Market Access Connections', 'Strategic Relationship Facilitation', 'Opportunity Brokerage'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80'
  },
  {
    id: 'sv8',
    title: 'Opportunity Mapping & Partnership Activation',
    teaser: 'Identifying and activating untapped potential within ecosystems.',
    services: ['Opportunity Identification & Mapping', 'Partnership Activation & Management', 'Stakeholder Mobilisation', 'Market Access Facilitation', 'Partnership Performance Optimisation', 'Impact Measurement & Reporting'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
  }
];
const OUTCOMES: OutcomeData[] = [{
  id: 'o1',
  title: 'Increased Access to Capital, Funding and Investment Opportunities',
  icon: <TrendingUp size={20} />
}, {
  id: 'o2',
  title: 'Stronger Strategic Partnerships and High-Value Stakeholder Networks',
  icon: <Network size={20} />
}, {
  id: 'o3',
  title: 'Accelerated Business Growth, Market Access and Expansion',
  icon: <Briefcase size={20} />
}, {
  id: 'o4',
  title: 'Enhanced Influence Across Government, Industry and Investment Ecosystems',
  icon: <Globe size={20} />
}, {
  id: 'o5',
  title: 'Greater Stakeholder Alignment, Collaboration and Collective Impact',
  icon: <Users size={20} />
}, {
  id: 'o6',
  title: 'Increased Innovation, Resource Mobilisation and Knowledge Exchange',
  icon: <Layers size={20} />
}, {
  id: 'o7',
  title: 'Enhanced Economic Participation, Enterprise Development and Shared Value Creation',
  icon: <Handshake size={20} />
}, {
  id: 'o8',
  title: 'Sustainable Growth Enabled by Strategic Partnerships, Ecosystem Leadership and Capital Access',
  icon: <Award size={20} />
}];
const LEADER_TAGS: TagData[] = [{
  id: 'lt1',
  label: 'Growth Strategy'
}, {
  id: 'lt2',
  label: 'Executive Advisory'
}, {
  id: 'lt3',
  label: 'Capital Mobilisation'
}, {
  id: 'lt4',
  label: 'Thought Leadership'
}];
const HERO_TAGS: TagData[] = [{
  id: 'ht1',
  label: 'Partnership Strategy'
}, {
  id: 'ht2',
  label: 'Ecosystem Design'
}, {
  id: 'ht3',
  label: 'Capital Mobilisation'
}];
const STAT_ITEMS = [{
  stat: '12+',
  label: 'Years Building Ecosystems'
}, {
  stat: '200+',
  label: 'Strategic Partnerships'
}, {
  stat: 'R2B+',
  label: 'Capital Mobilised'
}];

// ─── Section Label ─────────────────────────────────────────────────────────────

// ─── SectionLabel Component ──────────────────────────────────

// ─── SectionLabel Component ──────────────────────────────────

// ─── SectionLabel Component ──────────────────────────────────
const SectionLabel = ({
  children,
  light = false
}: {
  children: React.ReactNode;
  light?: boolean;
}) => <div className="mb-4">
    <p style={{
      color: light ? 'rgba(255,255,255,0.6)' : '#FC3637',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.25em',
      textTransform: 'uppercase'
    }}>
      {children}
    </p>
  </div>;




// ─── Main Page ─────────────────────────────────────────────────────────────────

// ─── Reduced-motion detection ────────────────────────────
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



// ─── useScrollDirection ──────────────────────────────────────
function useScrollDirection() {
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrollY;
}

export const EcosystemBuildingPage = () => {
  const reducedMotion = usePrefersReducedMotion();
  const scrollY = useScrollDirection();
  const heroParallaxY = reducedMotion ? 0 : scrollY * 0.4;

  const doubledTicker = [...TICKER_ITEMS, ...TICKER_ITEMS];

  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const serviceRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  return <div className="w-full bg-white overflow-x-hidden" style={{
    fontFamily: 'Inter, sans-serif',
    color: B.charcoal
  }}>
    <Header />

    {/* ── HERO ──────────────────────────────────────────────────────── */}
    <section className="relative w-full overflow-hidden" style={{
      height: '100svh',
      minHeight: '600px',
      background: B.ink,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start'
    }}>
      {/* Full-bleed parallax background image */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: '-20%',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop" alt="" style={{
          width: '100%',
          height: '140%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
          filter: 'grayscale(1) brightness(0.55)',
          transform: `translateY(${heroParallaxY}px)`,
          willChange: 'transform'
        }} />
      </div>
      {/* Dark gradient overlay — top-to-bottom and left-to-right for legibility */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,8,8,0.55) 0%, rgba(10,8,8,0.30) 40%, rgba(10,8,8,0.78) 100%)',
        pointerEvents: 'none'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(10,8,8,0.65) 0%, rgba(10,8,8,0.20) 60%, transparent 100%)',
        pointerEvents: 'none'
      }} />
      {/* Subtle crimson vignette */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.12) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      <div className="relative z-10 w-full text-left" style={{
        paddingLeft: 'clamp(16px, 5vw, 80px)',
        paddingRight: 'clamp(16px, 5vw, 80px)',
        paddingBottom: 'clamp(32px, 5vh, 48px)'
      }}>
        <SectionLabel light>Strategic Advisory Capability</SectionLabel>
        <h1 style={{
          margin: '0 0 20px',
          padding: 0,
          fontWeight: 600,
          letterSpacing: '-0.055em',
          lineHeight: 0.93,
          fontSize: 'clamp(32px, 5.5vw, 80px)',
          color: B.white
        }}>
          <span style={{
            display: 'block'
          }}>{'Ecosystem Building,'}</span>
          <span style={{
            display: 'block'
          }}>
            <span style={{
              color: 'rgba(255,255,255,0.45)'
            }}>{'/ '}</span>
            <span>{'Partnerships &'}</span>
          </span>
          <span style={{
            display: 'block',
            color: B.red
          }}>{'Capital Mobilisation.'}</span>
        </h1>
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4" style={{
          marginTop: '28px',
          marginBottom: '28px'
        }}>
          <a href="/contact" className="cta-primary group h-[48px]">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#advisory-ecosystem-philosophy" className="cta-secondary group h-[48px]">
            <span>Our Advisory Work</span>
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {HERO_TAGS.map(tag => <span key={tag.id} style={{
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '6px 14px',
            color: 'rgba(255,255,255,0.5)',

            fontSize: '9.5px',
            letterSpacing: '0.12em',
            fontWeight: 700
          }}>
            {tag.label}
          </span>)}
        </div>
      </div>
    </section>

    {/* ── TICKER ────────────────────────────────────────────────────── */}
    <div className="w-full py-[14px] overflow-hidden" style={{ background: B.red }}>
      <div className="ticker-track">
        {doubledTicker.map((text, i) => <div key={i} className="flex items-center shrink-0 px-7">
          <span className="text-white" style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.22em',

          }}>
            {text}
          </span>
          <span className="ml-7 text-white text-xs">◆</span>
        </div>)}
      </div>
    </div>

    {/* ── VALUE PROPOSITION ─────────────────────────────────────────── */}
    <section id="advisory-ecosystem-philosophy" style={{
      background: B.white,
      padding: 'clamp(60px, 10vw, 140px) 0'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 xl:gap-28 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-4">
            <Eyebrow>Advisory Scope</Eyebrow>
            <h2
              className="font-semibold mb-6 md:mb-8"
              style={{
                color: B.charcoal,
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                letterSpacing: '-0.035em',
                lineHeight: 0.92,
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Building powerful ecosystems to mobilise capital
            </h2>
            <div className="space-y-5 md:space-y-6">
              <p
                style={{
                  color: B.midGray,
                  fontSize: 'clamp(15px, 1.5vw, 17px)',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                In an increasingly complex and interconnected global economy, achieving sustainable growth, innovation, and social impact requires powerful ecosystems, strategic partnerships, and coalition alliances.
              </p>
              <p
                style={{
                  color: B.midGray,
                  fontSize: 'clamp(15px, 1.5vw, 17px)',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Our strategic ecosystem advisory connects brands, governments, developers, and investors to build coalitions that unlock resources, facilitate market entry, and mobilise capital at scale.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{
            opacity: 0,
            y: 28
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.12
          }}>
            <div style={{
              background: B.offWhite,
              borderLeft: `3px solid ${B.red}`,
              padding: 'clamp(28px, 4.5vw, 56px)',
              boxShadow: '0 2px 24px rgba(0,0,0,0.06)'
            }}>
              <p style={{
                color: B.charcoal,
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                fontWeight: 400,
                lineHeight: 1.75,
                fontStyle: 'italic',
                marginBottom: '32px'
              }}>
                "Competitive advantage increasingly depends on the ability to convene
                stakeholders, build trusted partnerships, access strategic networks, attract
                investment, influence ecosystems, and create shared value at scale. Our role is
                to be the architect of these connections."
              </p>
              <div className="flex items-center gap-4">
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: B.charcoal,
                  flexShrink: 0
                }} />
                <div>
                  <p style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',

                    color: B.charcoal,
                    marginBottom: '4px'
                  }}>
                    EmpowaWorx Strategy Board
                  </p>
                  <p style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',

                    color: B.midGray
                  }}>
                    Ecosystem Advisory Division
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-8 gap-px" style={{
              border: `1px solid ${B.border}`,
              background: B.border
            }}>
              {STAT_ITEMS.map(item => <div key={item.stat} style={{
                background: B.white,
                padding: 'clamp(16px, 2.5vw, 24px) clamp(12px, 2vw, 20px)'
              }}>
                <div style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: B.charcoal,
                  lineHeight: 1
                }}>{item.stat}</div>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',

                  color: B.midGray,
                  marginTop: '8px',
                  lineHeight: 1.4
                }}>{item.label}</div>
              </div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── ADVISORY CAPABILITIES ──────────────────────────────────────── */}
    <section style={{
      background: B.ink,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div aria-hidden="true" className="pointer-events-none select-none hidden lg:block" style={{
        position: 'absolute',
        top: '-24px',
        right: '-24px',
        fontSize: 'clamp(120px, 14vw, 200px)',
        fontWeight: 700,
        letterSpacing: '-0.06em',
        lineHeight: 1,

        color: 'rgba(255,255,255,0.03)',
        whiteSpace: 'nowrap',
        userSelect: 'none'
      }}>
        CAPABILITIES
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{
        paddingTop: 'clamp(60px, 10vw, 140px)',
        paddingBottom: 'clamp(40px, 7vw, 80px)'
      }}>
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end">
          <div>
            <SectionLabel light>Advisory Services</SectionLabel>
            <h2 style={{
              fontWeight: 600,
              letterSpacing: '-0.055em',
              lineHeight: 0.9,
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              color: B.white,

              marginBottom: '0'
            }}>
              <span style={{
                display: 'block'
              }}>Our Advisory</span>
              <span style={{
                display: 'block',
                color: B.red
              }}>Capabilities</span>
            </h2>
          </div>
          <div className="lg:text-right" style={{
            maxWidth: '360px'
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 'clamp(14px, 1.2vw, 15px)',
              fontWeight: 400,
              lineHeight: 1.7,
              marginBottom: '20px'
            }}>
              A comprehensive suite of strategic services designed to architect, mobilise, and
              optimise high-value ecosystems.
            </p>
            <div className="flex lg:justify-end items-center gap-3">
              <div style={{
                width: '32px',
                height: '1px',
                background: B.red
              }} />
              <span style={{
                color: B.red,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',

              }}>
                08 Service Pillars
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {SERVICES.map((category, idx) => (
          <div
            key={category.id}
            ref={el => { serviceRefs.current[idx] = el; }}
            className="overflow-hidden transition-all duration-300"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              scrollMarginTop: '150px',
              backgroundColor: (expandedService === idx || hoveredService === idx) ? '#1A1A1A' : 'transparent',
              backgroundImage: expandedService === idx ? `linear-gradient(rgba(26, 26, 26, 0.94), rgba(26, 26, 26, 0.94)), url(${category.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: (expandedService === idx || hoveredService === idx) ? B.white : B.white
            }}
            onMouseEnter={() => setHoveredService(idx)}
            onMouseLeave={() => setHoveredService(null)}
          >
            <button
              onClick={() => {
                const next = expandedService === idx ? null : idx;
                setExpandedService(next);
                if (next !== null) {
                  setTimeout(() => {
                    const element = serviceRefs.current[next];
                    if (element) {
                      const rect = element.getBoundingClientRect();
                      const absoluteTop = rect.top + window.pageYOffset;
                      window.scrollTo({
                        top: absoluteTop - 150,
                        behavior: 'smooth'
                      });
                    }
                  }, 100);
                }
              }}
              className="w-full text-left group"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
            >
              <div className="flex items-center justify-between transition-colors duration-200" style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: 'clamp(16px, 4vw, 48px)',
                paddingRight: 'clamp(16px, 3vw, 32px)',
                borderBottom: `1px solid rgba(255,255,255,0.06)`
              }}>
                <div className="flex items-center gap-4 md:gap-6 lg:gap-10 flex-1 min-w-0">
                  <span style={{
                    color: (expandedService === idx || hoveredService === idx) ? B.red : 'rgba(255,255,255,0.2)',
                    fontSize: 'clamp(0.85rem, 2.5vw, 1.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    flexShrink: 0,
                    transition: 'color 0.25s',
                    fontVariantNumeric: 'tabular-nums'
                  }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 style={{
                      color: (expandedService === idx || hoveredService === idx) ? B.red : B.white,
                      fontSize: 'clamp(0.95rem, 2.2vw, 1.6rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      transition: 'color 0.25s ease',
                      marginBottom: '4px'
                    }}>
                      {category.title}
                    </h3>
                    <p style={{
                      color: (expandedService === idx || hoveredService === idx) ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)',
                      fontSize: 'clamp(12px, 1.2vw, 14px)',
                      fontWeight: 400,
                      lineHeight: 1.5
                    }}>
                      {category.teaser}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center justify-center ml-3 md:ml-6 transition-all duration-200" style={{
                  width: '36px',
                  height: '36px',
                  background: expandedService === idx ? B.red : 'rgba(255,255,255,0.06)',
                  color: expandedService === idx ? B.white : 'rgba(255,255,255,0.5)'
                }}>
                  {expandedService === idx ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </div>
            </button>
            <AnimatePresence>
              {expandedService === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
                  className="overflow-hidden"
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderBottom: '1px solid rgba(252,54,55,0.12)'
                  }}
                >
                  <div style={{
                    padding: 'clamp(16px, 3vw, 36px) clamp(16px, 4vw, 64px)',
                    paddingLeft: 'clamp(40px, 9vw, 108px)'
                  }}>
                    <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-3">
                      {category.services.map((svc, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div style={{ width: '16px', height: '1px', background: B.red, flexShrink: 0 }} />
                          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(12px, 1.2vw, 14px)', fontWeight: 500, lineHeight: 1.55 }}>
                            {svc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div style={{
        height: 'clamp(48px, 8vw, 96px)'
      }} />
    </section>

    {/* ── COMMERCIAL OUTCOMES ────────────────────────────────────────── */}
    <section style={{
      background: B.white,
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(60px, 10vw, 140px) 0'
    }}>
      <div aria-hidden="true" className="pointer-events-none select-none hidden lg:block" style={{
        position: 'absolute',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '28vw',
        fontWeight: 700,
        letterSpacing: '-0.06em',
        lineHeight: 1,
        color: B.border,
        userSelect: 'none'
      }}>
        08
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
          opacity: 0,
          y: 24
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.55
        }} className="mb-12 md:mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <SectionLabel>Value Creation</SectionLabel>
            <h2 style={{
              fontWeight: 600,
              letterSpacing: '-0.05em',
              lineHeight: 0.9,
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              color: B.charcoal,

            }}>
              <span style={{
                display: 'block'
              }}>Commercial</span>
              <span style={{
                display: 'block',
                color: B.red
              }}>Outcomes</span>
            </h2>
            <div style={{
              width: '48px',
              height: '3px',
              background: B.red,
              marginTop: '24px'
            }} />
          </div>
          <p style={{
            color: B.midGray,
            fontSize: 'clamp(14px, 1.4vw, 17px)',
            fontWeight: 400,
            lineHeight: 1.65,
            maxWidth: '520px',
            marginTop: '20px'
          }}>
            We deliver measurable business value through strategic ecosystem alignment and
            sophisticated capital mobilisation.
          </p>
        </motion.div>

        <div style={{
          borderTop: `1px solid ${B.border}`
        }}>
          {OUTCOMES.map((outcome, idx) => <motion.div key={outcome.id} initial={{
            opacity: 0,
            y: 12
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.05,
            duration: 0.4
          }} className="group flex items-start gap-0 cursor-default" style={{
            borderBottom: `1px solid ${B.border}`
          }}>
            {/* Number column */}
            <div className="flex-shrink-0 flex items-center justify-center transition-colors duration-200" style={{
              width: 'clamp(48px, 9vw, 96px)',
              paddingTop: '24px',
              paddingBottom: '24px',
              borderRight: `1px solid ${B.border}`
            }}>
              <span style={{
                fontSize: 'clamp(0.85rem, 2vw, 1.35rem)',
                fontWeight: 700,
                color: B.border,
                letterSpacing: '-0.04em',
                transition: 'color 0.25s'
              }} onMouseEnter={e => {
                (e.currentTarget as HTMLSpanElement).style.color = B.red;
              }} onMouseLeave={e => {
                (e.currentTarget as HTMLSpanElement).style.color = B.border;
              }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 items-center justify-between gap-4 md:gap-6 transition-colors duration-200" style={{
              padding: 'clamp(16px, 3vw, 36px) clamp(14px, 4vw, 48px)'
            }} onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = B.offWhite;
            }} onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'transparent';
            }}>
              <div style={{
                flex: 1
              }}>
                <div className="flex items-center gap-3 mb-2" style={{
                  opacity: 0.45
                }}>
                  <div style={{
                    width: '20px',
                    height: '1px',
                    background: B.red
                  }} />
                  <span style={{
                    color: B.red,
                    fontSize: '9.5px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',

                  }}>
                    OUTCOME {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 style={{
                  fontWeight: 600,
                  fontSize: 'clamp(13px, 1.8vw, 19px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                  color: B.charcoal,
                  maxWidth: '680px'
                }}>
                  {outcome.title}
                </h4>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center transition-all duration-200 group-hover:scale-110" style={{
                width: '44px',
                height: '44px',
                background: B.surface,
                color: B.red
              }}>
                {React.cloneElement(outcome.icon as React.ReactElement<LucideProps>)}
              </div>
            </div>
          </motion.div>)}
        </div>
      </div>
    </section>

    {/* ── EXECUTIVE LEADERSHIP ───────────────────────────────────────── */}
    <section style={{
      background: B.charcoal,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="flex flex-col lg:flex-row" style={{
        minHeight: 'clamp(480px, 60vw, 680px)'
      }}>
        {/* Image column */}
        <motion.div initial={{
          opacity: 0,
          scale: 1.04
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.75,
          ease: [0.22, 0.61, 0.36, 1]
        }} className="relative w-full lg:w-[45%] flex-shrink-0" style={{
          minHeight: 'clamp(280px, 45vw, 420px)'
        }}>
          <img src="/simphiwe-masiza.jpg" alt="Simphiwe Masiza — Founder &amp; Group CEO" className="w-full h-full object-cover" style={{
            filter: 'grayscale(100%) brightness(0.75)',
            display: 'block'
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: B.red
          }} />
        </motion.div>

        {/* Text column */}
        <div className="flex flex-col justify-center flex-1" style={{
          padding: 'clamp(40px, 8vw, 100px) clamp(20px, 6vw, 80px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div aria-hidden="true" className="pointer-events-none select-none" style={{
            position: 'absolute',
            bottom: '-16px',
            right: '-16px',
            fontSize: 'clamp(60px, 12vw, 160px)',
            fontWeight: 700,
            letterSpacing: '-0.06em',
            lineHeight: 1,

            color: 'rgba(255,255,255,0.03)',
            whiteSpace: 'nowrap',
            userSelect: 'none'
          }}>
            MASIZA
          </div>

          <motion.div initial={{
            opacity: 0,
            x: 32
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.15
          }} className="flex flex-col gap-6 lg:gap-7" style={{
            position: 'relative'
          }}>
            <div>
              <SectionLabel light>Executive Leadership</SectionLabel>
              <h2 style={{
                fontWeight: 600,
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                fontSize: 'clamp(2.2rem, 6vw, 5rem)',

                color: B.white,
                marginBottom: '12px'
              }}>
                <span style={{
                  display: 'block'
                }}>Simphiwe</span>
                <span style={{
                  display: 'block',
                  color: B.red
                }}>Masiza</span>
              </h2>
              <p style={{
                fontSize: '10.5px',
                fontWeight: 700,
                letterSpacing: '0.18em',

                color: 'rgba(255,255,255,0.35)'
              }}>
                Founder &amp; Group CEO
              </p>
            </div>

            <div style={{
              width: '48px',
              height: '2px',
              background: B.red
            }} />

            <p style={{
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '460px'
            }}>
              Led by Simphiwe Masiza, who provides strategic leadership across the
              EmpowaWorx™ ecosystem, including growth strategy, stakeholder influence,
              ecosystem building, executive advisory, partnership development, capital
              mobilisation, and thought leadership.
            </p>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {LEADER_TAGS.map(tag => <div key={tag.id} className="flex items-center gap-2" style={{
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '8px 12px md:14px'
              }}>
                <div style={{
                  width: '5px',
                  height: '5px',
                  background: B.red,
                  flexShrink: 0
                }} />
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',

                  color: 'rgba(255,255,255,0.6)'
                }}>
                  {tag.label}
                </span>
              </div>)}
            </div>

            <button className="flex items-center gap-3 group w-fit transition-all duration-200" style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              marginTop: '4px'
            }} onMouseEnter={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              const span = btn.querySelector('span') as HTMLSpanElement;
              if (span) span.style.color = B.red;
            }} onMouseLeave={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              const span = btn.querySelector('span') as HTMLSpanElement;
              if (span) span.style.color = 'rgba(255,255,255,0.55)';
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',

                color: 'rgba(255,255,255,0.55)',
                borderBottom: '1px solid rgba(255,255,255,0.15)',
                paddingBottom: '2px',
                transition: 'color 0.2s'
              }}>
                View Profile &amp; Leadership Portfolio
              </span>
              <ArrowUpRight size={16} style={{
                color: B.red,
                flexShrink: 0
              }} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── TEAM FACULTY ─── */}
    <section className="py-12 md:py-20 lg:py-32 px-4 md:px-8 lg:px-12 w-full overflow-hidden" style={{
      background: '#ffffff',
      display: 'none'
    }}>
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-5 md:gap-8">
          <div className="w-full md:max-w-xl">
            <Eyebrow>The Faculty</Eyebrow>
            <h2 className="font-semibold uppercase" style={{
              color: '#1A1A1A',
              fontSize: 'clamp(1.6rem, 4.5vw, 3.75rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>
              Strategic Advisors &amp; Lead Experts
            </h2>
          </div>
          <p className="md:text-right" style={{
            color: '#757575',
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            fontWeight: 400,
            lineHeight: 1.8,
            fontFamily: 'Inter, sans-serif',
            maxWidth: '340px'
          }}>
            Our team combines data-driven insights with deep-rooted cultural connections across the African continent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 w-full">
          {FACULTY_MEMBERS.map(member => <div key={member.id} className="group transition-all w-full overflow-hidden" style={{
            border: '1px solid rgba(26,26,26,0.06)'
          }} onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(252,54,55,0.2)'} onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,26,26,0.06)'}>
            <div className="flex flex-col sm:grid sm:grid-cols-5 h-full">
              <div className="sm:col-span-2 overflow-hidden aspect-square">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" style={{
                  display: 'block'
                }} />
              </div>
              {/* Content */}
              <div className="sm:col-span-3 p-5 md:p-7 flex flex-col justify-start" style={{
                background: '#ffffff'
              }}>
                <h3 className="font-semibold uppercase mb-1" style={{
                  color: '#1A1A1A',
                  fontSize: 'clamp(1rem, 2.5vw, 1.65rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {member.name}
                </h3>
                <p className="pb-4 mb-4 md:mb-5" style={{
                  color: '#E63329',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                  borderBottom: '1px solid rgba(252,54,55,0.1)',
                  lineHeight: 1.5
                }}>
                  {member.title}
                </p>
                <p style={{
                  color: '#757575',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <span>&ldquo;</span><span>{member.description}</span><span>&rdquo;</span>
                </p>
                <div className="mt-5 sm:mt-6 flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(0,0,0,0.05)',
                    color: '#1A1A1A'
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = '#E63329';
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = '#1A1A1A';
                  }}>
                    <Linkedin size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(0,0,0,0.05)',
                    color: '#1A1A1A'
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = '#E63329';
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = '#1A1A1A';
                  }}>
                    <Instagram size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </section>

    {/* ── CLOSING CTA ─── */}
    <section className="relative overflow-hidden py-14 md:py-20 lg:py-32 w-full" style={{
      background: B.red,
      color: B.white
    }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        background: `radial-gradient(circle at 80% 20%, ${B.red}, transparent 50%)`
      }} />

      <div className="max-w-[1440px] mx-auto text-center relative z-10">
        <h2 className="font-semibold leading-none mb-10 md:mb-12" style={{
          color: B.white,
          fontSize: 'clamp(2rem, 8vw, 7rem)',
          letterSpacing: '-0.035em',
          lineHeight: 0.9,
          fontFamily: 'Inter, sans-serif'
        }}>
          <span>Ready to Architect{' '}</span>
          <span style={{
            color: B.white,
            fontStyle: 'italic'
          }}>Your Strategic</span>
          <span>{' '}Ecosystem?</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <a href="/contact" className="cta-primary group h-[56px] min-w-[200px]" style={{ background: B.white, color: B.red }}>
            <span>Partner With Us</span>
            <div className="cta-icon-container" style={{ background: B.red }}>
              <ArrowUpRight size={14} className="text-white" />
            </div>
          </a>
          <a href="#advisory-ecosystem-philosophy" className="cta-secondary group h-[56px] min-w-[180px]" style={{ borderColor: B.white, color: B.white }}>
            <span>View Advisory Work</span>
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>;
};
