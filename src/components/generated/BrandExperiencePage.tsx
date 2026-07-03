import * as React from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Menu, X, ArrowUpRight, ArrowRight, ChevronRight, ChevronDown, Facebook, Instagram, Linkedin, Twitter, Youtube, Zap, BarChart2, Globe, Layers, Star, Download, Phone } from 'lucide-react';
import { Header } from '../Header';

// ─── Reduced-motion detection ─────────────────────────────
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

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const RED = '#FC3637';
const DARK = '#0D0D0D';
const FOOTER_BG = '#0A0A0A';
const CHARCOAL = '#111111';
const WHITE = '#FFFFFF';

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItemData {
  id: string;
  label: string;
  href: string;
}
interface ServiceCategoryData {
  id: string;
  title: string;
  descriptor: string;
  items: string[];
}
interface FlagshipThemeData {
  id: string;
  number: string;
  title: string;
  teaser: string;
  description: string;
  subOfferings: string[];
  image: string;
}
interface EventSolutionData {
  id: string;
  title: string;
  items: string[];
}
interface SignatureOfferingData {
  id: string;
  name: string;
  description: string;
  image: string;
}
interface FooterLink {
  id: string;
  label: string;
  href: string;
}
interface TickerItem {
  id: string;
  text: string;
}
interface CreedPhrase {
  id: string;
  text: string;
}
interface StatItem {
  id: string;
  value: string;
  label: string;
}
interface AnchorNavItem {
  id: string;
  label: string;
  sectionId: string;
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
  name: 'Neo Mathebe',
  title: 'Lead: The Speakers Firm™ | Brand Experience & Strategic Programming',
  description: 'Neo Mathebe is a seasoned stakeholder engagement and brand experience specialist with extensive experience in designing high-impact conferences, executive summits, leadership platforms and thought leadership experiences. She leads speaker acquisition, programme development, strategic partnerships, and delegate engagement, ensuring world-class audience experiences and measurable stakeholder value.',
  image: '/Neo-Mathebe.JPG'
}, {
  id: 'f2',
  name: 'Bonnie Maponya',
  title: 'Acting Managing Executive | Strategic Operations & Delivery Excellence',
  description: 'Bonnie Maponya is an accomplished business operations and programme management executive with a strong track record in leading complex, multi-stakeholder projects. She oversees strategic planning, operational governance, commercial delivery, stakeholder management and project execution, ensuring seamless delivery and organisational excellence.',
  image: '/Bonnie-Maponya.jpg'
}, {
  id: 'f3',
  name: 'Taki Makananise',
  title: 'Event Technology & Digital Experience',
  description: 'Taki Makananise is an event technology specialist with expertise in digital event platforms, delegate management systems, registration technologies, audience engagement solutions and hybrid event experiences. He delivers technology-enabled event ecosystems that enhance attendee experience, operational efficiency, and event intelligence.',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
}, {
  id: 'f4',
  name: 'Vusimuzi Mdiniso',
  title: 'Technical Production & Live Experiences',
  description: 'Vusimuzi Mdiniso is a highly experienced technical production professional specialising in staging, audiovisual production, lighting, sound engineering, live broadcasting, and venue transformation. He leads technical execution for large-scale conferences, activations, exhibitions, and premium live experiences.',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80'
}, {
  id: 'f5',
  name: 'Romeo Lekalakala',
  title: 'Lead: Event Photography & Visual Storytelling',
  description: 'Romeo Lekalakala is an accomplished visual storyteller and event photographer with extensive experience capturing conferences, executive gatherings, corporate activations, and brand experiences. His work transforms moments into powerful visual assets that strengthen brand visibility, media impact and legacy documentation.',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80'
}, {
  id: 'f6',
  name: 'Koffi',
  title: 'Lead: Event Videography & Content Production',
  description: 'Koffi is an experienced videographer and content producer specialising in event films, brand storytelling, promotional content, executive interviews and digital-first media production. He creates compelling visual narratives that amplify audience engagement and extend event impact beyond the venue.',
  image: 'https://images.unsplash.com/photo-1519085185758-2ed33c5e6f6a?w=800&q=80'
}, {
  id: 'f7',
  name: 'Brian Manyasha',
  title: 'Creative Director | Experience Design & Brand Communications',
  description: 'Brian Manyasha is a strategic creative leader with expertise in event branding, experiential design, campaign development, visual communications and audience engagement. He develops immersive creative concepts that elevate brand experiences, strengthen storytelling and drive meaningful stakeholder connections.',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
}, {
  id: 'f8',
  name: 'Sizwe "Pastor" Mbhobho-Magwaza',
  title: 'Activations, Campaign Coordination & Brand Engagement',
  description: 'Sizwe "Pastor" Mbhobho-Magwaza is a seasoned experiential marketing, campaign coordination and brand engagement specialist with extensive experience in consumer engagement, roadshows, product launches, community activations, live events and audience mobilisation. An accomplished coordinator, master of ceremonies and entertainer, he combines operational excellence with exceptional audience connection to create memorable and impactful brand experiences. He leads the planning, coordination and execution of high-impact activation campaigns that drive visibility, participation, stakeholder engagement and measurable commercial outcomes.',
  image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80'
}, {
  id: 'f9',
  name: 'Lefa Masiza',
  title: 'Head: Activation Logistics & Operational Delivery',
  description: 'Lefa Masiza is a logistics and event operations professional with expertise in event infrastructure, activation deployment, supplier coordination, transportation management and on-site operations. He ensures flawless execution across complex experiential campaigns and large-scale events.',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80'
}, {
  id: 'f10',
  name: 'Anita Tirkey',
  title: 'Head: Talent, Speakers & VIP Relations',
  description: 'Anita is a talent management and speaker relations specialist with extensive experience securing high-profile speakers, moderators, entertainers, thought leaders and industry experts. She manages speaker engagement, protocol, talent logistics and VIP stakeholder experiences to deliver world-class programmes and exceptional audience value.',
  image: '/team_faculty/Anita-Tirkey.jpg'
}];

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItemData[] = [{
  id: 'n1',
  label: 'Home',
  href: '#'
}, {
  id: 'n2',
  label: 'Who We Are',
  href: '#'
}, {
  id: 'n3',
  label: 'Advisory',
  href: '#'
}, {
  id: 'n4',
  label: 'Platforms',
  href: '#'
}, {
  id: 'n5',
  label: 'Brand Experience',
  href: '#'
}, {
  id: 'n6',
  label: 'Media',
  href: '#'
}, {
  id: 'n7',
  label: 'Careers',
  href: '#'
}];
const TICKER_ITEMS: TickerItem[] = [{
  id: 't1',
  text: 'EXPERIENTIAL MARKETING'
}, {
  id: 't2',
  text: 'EVENTS & ACTIVATIONS'
}, {
  id: 't3',
  text: 'CONFERENCES & SUMMITS'
}, {
  id: 't4',
  text: 'HYBRID & VIRTUAL EVENTS'
}, {
  id: 't5',
  text: 'EVENT TECHNOLOGY'
}, {
  id: 't6',
  text: 'SPEAKER CURATION'
}, {
  id: 't7',
  text: 'SPONSORSHIP & EXHIBITIONS'
}, {
  id: 't8',
  text: 'ANALYTICS & IMPACT'
}];
const ANCHOR_NAV_ITEMS: AnchorNavItem[] = [{
  id: 'a1',
  label: 'Signature',
  sectionId: 'section-signature'
}, {
  id: 'a2',
  label: 'Services',
  sectionId: 'section-services'
}, {
  id: 'a3',
  label: 'Capabilities',
  sectionId: 'section-capabilities'
}, {
  id: 'a4',
  label: 'Solutions',
  sectionId: 'section-solutions'
}, {
  id: 'a5',
  label: 'Get in Touch',
  sectionId: 'section-cta'
}];
const SERVICE_CATEGORIES: ServiceCategoryData[] = [{
  id: 'cat1',
  title: 'Experience Strategy & Advisory',
  descriptor: 'Turn ambiguous briefs into winning event strategies.',
  items: ['Event Strategy & Consulting', 'Experience Design & Journey Mapping', 'Event Portfolio & Calendar Planning', 'Stakeholder Engagement Strategy', 'Brand Experience Architecture', 'Event ROI & Performance Framework Design']
}, {
  id: 'cat2',
  title: 'Creative, Branding & Marketing',
  descriptor: 'Unforgettable event identities that cut through the noise.',
  items: ['Event Concept & Theme Development', 'Brand Identity for Events', 'Creative Direction & Visual Design', 'Event Marketing Strategy', 'Audience Acquisition & Delegate Marketing', 'Social Media & Digital Campaigns']
}, {
  id: 'cat3',
  title: 'Strategic Communications, Media & Influence',
  descriptor: 'Amplify your event far beyond the venue walls.',
  items: ['Event PR & Media Relations', 'Media Partnerships & Accreditation', 'Influencer & Thought Leader Engagement', 'Live Coverage & Broadcasting', 'Post-Event Communications & Amplification', 'Crisis & Issues Management']
}, {
  id: 'cat4',
  title: 'Content, Programme & Speaker Curation',
  descriptor: 'World-class content that sparks conversation and drives attendance.',
  items: ['Conference Programme Design', 'Speaker Identification, Briefing & Management', 'Keynote & Panel Curation', 'Content Strategy & Editorial Planning', 'Moderator & Facilitator Engagement', 'Knowledge Product Development']
}, {
  id: 'cat5',
  title: 'Event Technology & Innovation',
  descriptor: 'Smarter events, powered by the right technology stack.',
  items: ['Event Management Platforms & Software', 'Mobile Event Apps', 'Live Streaming & Virtual Event Technology', 'AI-Powered Event Personalisation', 'Audience Engagement Tools (Polling, Q&A, Networking)', 'Event Data & Analytics Platforms']
}, {
  id: 'cat6',
  title: 'Design, Production & Technical Services',
  descriptor: 'Stage-ready production that leaves audiences speechless.',
  items: ['Stage Design & Set Build', 'AV Production & Technical Direction', 'Lighting, Sound & Visual Effects', 'Event Branding & Environmental Signage', 'Video Production & Live Streaming', 'Broadcast & Studio Production']
}, {
  id: 'cat7',
  title: 'Event Furniture, Decor & Infrastructure',
  descriptor: 'Premium environments that reflect your brand\'s stature.',
  items: ['Event Furniture & Seating Solutions', 'Premium Décor & Styling', 'Floral Design & Installations', 'Venue Dressing & Theming', 'Modular & Custom Structures', 'Green & Sustainable Event Infrastructure']
}, {
  id: 'cat8',
  title: 'Exhibitions, Sponsorship & Commercialisation',
  descriptor: 'Turn floor space into significant revenue and brand equity.',
  items: ['Exhibition & Trade Show Management', 'Sponsorship Strategy & Packaging', 'Sponsor Activation & Fulfilment', 'Exhibition Stand Design & Build', 'Commercialisation & Revenue Strategy', 'Trade & Consumer Show Production']
}, {
  id: 'cat9',
  title: 'Analytics, Measurement & Impact',
  descriptor: 'Prove the ROI of every event with data you can act on.',
  items: ['Event Performance Measurement', 'Delegate Feedback & Sentiment Analysis', 'Social Media Listening & Monitoring', 'ROI & Impact Reporting', 'Post-Event Evaluation & Insights', 'Data-Driven Event Optimisation']
}];
const FLAGSHIP_THEMES: FlagshipThemeData[] = [{
  id: 'ft1',
  number: '01',
  title: 'Conferences, Summits & Knowledge Platforms',
  teaser: 'World-class intellectual gatherings that shape industries.',
  description: 'From CEO convenings to national industry forums, we design, produce, and manage conferences and summits that combine exceptional content curation, world-class speakers, flawless AV production, and premium delegate experiences. Whether fully live, hybrid, or virtual, every format is delivered with precision.',
  subOfferings: ['End-to-End Conference Management', 'Conference & Summit Production', 'Hybrid & Virtual Event Solutions'],
  image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=800&auto=format&fit=crop'
}, {
  id: 'ft2',
  number: '02',
  title: 'Exhibitions, Trade Shows & Commercialisation',
  teaser: 'Revenue-generating event platforms at scale.',
  description: 'Turnkey management of exhibitions, trade shows, and expos — from floor planning and stand design to exhibitor management, sponsorship activation, and commercialisation strategy. We maximise visitor experience while delivering exceptional commercial returns for organisers and sponsors.',
  subOfferings: ['Exhibition & Trade Show Management', 'Sponsorship Strategy & Packaging', 'Sponsor Activation & Fulfilment'],
  image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=800&auto=format&fit=crop'
}, {
  id: 'ft3',
  number: '03',
  title: 'Brand Activations, Launches & Experiential Campaigns',
  teaser: 'Moments that make your brand impossible to forget.',
  description: 'High-impact brand activations, product launches, and experiential marketing campaigns that bring brands to life. From strategic concept through flawless execution, we create shareable moments that deepen engagement, drive commercial outcomes, and generate lasting earned media.',
  subOfferings: ['Brand Activation & Experiential Campaigns', 'Product & Service Launch Events', 'National Roadshows & Multi-City Campaigns'],
  image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop'
}, {
  id: 'ft4',
  number: '04',
  title: 'Awards, Galas & Recognition Programmes',
  teaser: 'Prestigious platforms that elevate industries and inspire excellence.',
  description: 'Design and delivery of prestigious awards ceremonies, industry recognition platforms, and gala events — from awards strategy, nominations management, and programme curation to full technical production, entertainment, and post-event amplification across media channels.',
  subOfferings: ['Awards & Recognition Programmes', 'VIP, Executive & Stakeholder Experiences', 'Community & Social Impact Activations'],
  image: 'https://images.unsplash.com/photo-1519671282429-b44660ead0a7?q=80&w=800&auto=format&fit=crop'
}, {
  id: 'ft5',
  number: '05',
  title: 'Community Engagement & Social Impact Activations',
  teaser: 'Purpose-driven events that change behaviour and build trust.',
  description: 'Purpose-driven community engagement events, social impact activations, and grassroots mobilisation campaigns — designed to build trust, shift behaviour, and create meaningful connections with communities. We also deliver bespoke white-glove experiences for VIP guests and executive stakeholders.',
  subOfferings: ['Community & Social Impact Activations', 'VIP & Executive Experiences', 'Stakeholder Engagement Platforms'],
  image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800&auto=format&fit=crop'
}];
const PIPELINE_STEPS: string[] = ['Strategy', 'Creative', 'Branding', 'Marketing', 'Communications', 'Media', 'Content', 'Speaker Curation', 'Technology', 'Production', 'Event Furniture', 'Exhibitions', 'Activations', 'Hospitality', 'Sponsorship', 'Analytics', 'Impact Measurement'];
const EVENT_SOLUTIONS: EventSolutionData[] = [{
  id: 'es1',
  title: 'Registration, Ticketing & Delegate Management',
  items: ['Online & Onsite Registration Platforms', 'Ticketing & Badge Management', 'Delegate Journey & Experience Design', 'CRM Integration & Data Management', 'Accreditation & Access Control', 'Delegate Communication & Engagement']
}, {
  id: 'es2',
  title: 'Hybrid, Virtual & Digital Events',
  items: ['Virtual Event Platform Management', 'Live Streaming & Broadcast Production', 'Digital Delegate Engagement', 'Virtual Networking & Matchmaking', 'On-Demand Content & Replay', 'Hybrid Event Technology Integration']
}, {
  id: 'es3',
  title: 'Event Marketing, Communications & Audience Growth',
  items: ['Event Brand Identity & Collateral', 'Delegate Acquisition & Marketing Campaigns', 'Email Marketing & Automation', 'Social Media Strategy & Content', 'PR & Media Engagement', 'Post-Event Content & Community Building']
}, {
  id: 'es4',
  title: 'Event Technology & Digital Experience',
  items: ['Mobile Event App Development & Management', 'Audience Response & Polling Systems', 'AI-Powered Networking & Matchmaking', 'Gamification & Interactive Experiences', 'Digital Signage & Wayfinding', 'Contactless & Cashless Event Technology']
}, {
  id: 'es5',
  title: 'Event Intelligence, Research & Analytics',
  items: ['Pre-Event Research & Audience Insights', 'Real-Time Event Analytics & Dashboards', 'Delegate Feedback & NPS Tracking', 'Social Listening & Media Monitoring', 'Post-Event Impact Reports', 'Benchmarking & Competitive Intelligence']
}, {
  id: 'es6',
  title: 'Travel, Hospitality & Delegate Logistics',
  items: ['Travel Management & Flight Coordination', 'Hotel & Accommodation Sourcing', 'Airport Transfers & Ground Transport', 'VIP Concierge & Guest Services', 'Venue Sourcing & Contract Negotiation', 'Delegate Hospitality Programmes']
}];
const SIGNATURE_OFFERINGS: SignatureOfferingData[] = [{
  id: 'sig1',
  name: 'EventInfluence',
  description: 'A strategic media, PR and influencer engagement solution that amplifies events beyond the room — generating earned media, social reach, and stakeholder influence before, during, and after the event.',
  image: 'https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=800&auto=format&fit=crop'
}, {
  id: 'sig2',
  name: 'EventCapital',
  description: 'A commercialisation and sponsorship strategy solution that transforms events into revenue-generating platforms — packaging sponsorship tiers, activating sponsor value, and maximising commercial returns.',
  image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop'
}, {
  id: 'sig3',
  name: 'EventExperience',
  description: 'A premium delegate experience design solution that transforms events into unforgettable, high-touch journeys — from arrival to departure, creating moments that inspire, connect, and leave lasting impressions.',
  image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop'
}, {
  id: 'sig4',
  name: 'EventGrowth',
  description: 'An audience acquisition and delegate growth solution combining digital marketing, content strategy, and community building to grow event audiences, increase registrations, and build loyal event communities.',
  image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop'
}, {
  id: 'sig5',
  name: 'EventIntelligence',
  description: 'A data and analytics solution that measures event performance, tracks audience engagement, analyses delegate feedback, and delivers actionable insights to optimise future events and demonstrate measurable ROI.',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
}, {
  id: 'sig6',
  name: 'EventLegacy',
  description: 'A post-event content and community legacy solution that captures, curates, and distributes event content — transforming live moments into enduring thought leadership assets and ongoing audience engagement.',
  image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop'
}];
const STATS_DATA: StatItem[] = [{
  id: 'st1',
  value: '120',
  label: 'Events Executed'
}, {
  id: 'st4',
  value: '98%',
  label: 'Client Satisfaction'
}];
const STAT_BAR_1: StatItem[] = [{
  id: 'sb1a',
  value: '120',
  label: 'Events Delivered'
}, {
  id: 'sb1b',
  value: '40+',
  label: 'Markets Served'
}, {
  id: 'sb1d',
  value: '15+',
  label: 'Years of Excellence'
}];
const STAT_BAR_2: StatItem[] = [{
  id: 'sb2a',
  value: '98%',
  label: 'Client Satisfaction'
}, {
  id: 'sb2b',
  value: '250k+',
  label: 'Delegates Served'
}, {
  id: 'sb2d',
  value: '100%',
  label: 'Black-Owned'
}];
const FOOTER_NAV: FooterLink[] = [{
  id: 'fn1',
  label: 'Home',
  href: '#'
}, {
  id: 'fn2',
  label: 'Who We Are',
  href: '#'
}, {
  id: 'fn3',
  label: 'Advisory',
  href: '#'
}, {
  id: 'fn4',
  label: 'Brand Experience',
  href: '#'
}, {
  id: 'fn5',
  label: 'Legacy Events',
  href: '#'
}, {
  id: 'fn6',
  label: 'Media',
  href: '#'
}, {
  id: 'fn7',
  label: 'Careers',
  href: '#'
}];
const FOOTER_SERVICES: FooterLink[] = [{
  id: 'fs1',
  label: 'Conferences & Summits',
  href: '#'
}, {
  id: 'fs2',
  label: 'Brand Activations',
  href: '#'
}, {
  id: 'fs3',
  label: 'National Roadshows',
  href: '#'
}, {
  id: 'fs4',
  label: 'Product Launches',
  href: '#'
}, {
  id: 'fs5',
  label: 'Awards Programmes',
  href: '#'
}, {
  id: 'fs6',
  label: 'Community Activations',
  href: '#'
}];
const FOOTER_LEGAL: FooterLink[] = [{
  id: 'fl1',
  label: 'Privacy Policy',
  href: '#'
}, {
  id: 'fl2',
  label: 'Terms of Service',
  href: '#'
}, {
  id: 'fl3',
  label: 'Cookie Policy',
  href: '#'
}, {
  id: 'fl4',
  label: 'POPIA Compliance',
  href: '#'
}];
const OFFICE_CITIES = ['Johannesburg', 'Cape Town', 'Nairobi', 'Lagos'];
const CREED_PHRASES: CreedPhrase[] = [{
  id: 'cp1',
  text: 'Strategy to Stage'
}, {
  id: 'cp2',
  text: 'Experiences That Move People'
}, {
  id: 'cp3',
  text: 'Events With Purpose'
}, {
  id: 'cp4',
  text: 'World-Class Production'
}, {
  id: 'cp5',
  text: 'Measurable Impact'
}, {
  id: 'cp6',
  text: 'Pan-African Excellence'
}];
const LOGO_PLACEHOLDERS = [{
  id: 'lp1',
  name: 'Standard Bank'
}, {
  id: 'lp2',
  name: 'MTN Group'
}, {
  id: 'lp3',
  name: 'Sasol'
}, {
  id: 'lp4',
  name: 'Nedbank'
}, {
  id: 'lp5',
  name: 'Vodacom'
}, {
  id: 'lp6',
  name: 'Absa Group'
}, {
  id: 'lp7',
  name: 'Investec'
}, {
  id: 'lp8',
  name: 'Old Mutual'
}];

// ─── Global styles ────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

  .be-page * { font-family: 'Inter', system-ui, sans-serif; }
  .be-page img { max-width: 100%; }

  /* ── Anchor nav hidden on very small screens to avoid overflow ── */
  .be-anchor-nav-wrap { display: flex; }
  @media (max-width: 479px) {
    .be-anchor-nav-wrap { display: none; }
  }

  /* ── Inline CTA: stack vertically on mobile ── */
  .be-inline-cta-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1280px;
    margin: 0 auto;
    padding: clamp(28px,4vw,48px) clamp(16px,5vw,96px);
  }
  @media (max-width: 767px) {
    .be-inline-cta-inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  /* ── Inline CTA buttons: full-width on mobile ── */
  .be-cta-btn-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    flex-shrink: 0;
  }
  @media (max-width: 767px) {
    .be-cta-btn-group {
      width: 100%;
      flex-direction: column;
    }
    .be-cta-btn-group a {
      width: 100%;
      justify-content: center;
    }
  }

  /* ── Stat bar: single column on mobile, 2-col on tablet ── */
  .be-stat-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
  }
  @media (max-width: 479px) {
    .be-stat-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
  @media (min-width: 1024px) {
    .be-stat-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }
  }

  /* ── Hero CTA buttons: stacked full-width on mobile ── */
  .be-hero-cta-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
  @media (max-width: 767px) {
    .be-hero-cta-group {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
      width: 100%;
    }
    .be-hero-cta-group > a {
      width: 100%;
      justify-content: center;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .be-hero-cta-group {
      gap: 16px;
    }
  }
  @media (min-width: 1024px) {
    .be-hero-cta-group {
      gap: 24px;
    }
  }

  /* ── Final CTA buttons: stacked full-width on mobile ── */
  .be-final-cta-btn-group {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  @media (max-width: 767px) {
    .be-final-cta-btn-group {
      flex-direction: column;
      gap: 12px;
    }
    .be-final-cta-btn-group > a {
      width: 100%;
      justify-content: center;
    }
  }

  /* ── Flagship accordion detail: stack on mobile ── */
  .be-flagship-detail {
    display: flex;
    flex-direction: row;
    gap: clamp(16px,2.5vw,28px);
    align-items: flex-start;
  }
  @media (max-width: 639px) {
    .be-flagship-detail {
      flex-direction: column;
    }
    .be-flagship-thumbnail {
      width: 100% !important;
      height: 160px !important;
    }
  }

  /* ── Services accordion expanded content indentation: no deep indent on mobile ── */
  .be-services-content {
    padding: 0 clamp(20px,2.5vw,28px) clamp(20px,2vw,28px);
    padding-left: calc(clamp(20px,2.5vw,28px) + 14px + clamp(22px,2vw,28px));
  }
  @media (max-width: 639px) {
    .be-services-content {
      padding: 0 16px 20px;
    }
  }

  /* ── Signature offering panel: stack vertically on mobile/tablet ── */
  .be-sig-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  @media (max-width: 1023px) {
    .be-sig-panel {
      grid-template-columns: 1fr;
    }
    .be-sig-panel-content {
      border-left: 1px solid rgba(252,54,55,0.25) !important;
      border-top: none !important;
    }
  }
  @media (max-width: 767px) {
    .be-sig-panel-img {
      height: 200px !important;
    }
    .be-sig-panel-img img {
      height: 200px !important;
    }
  }

  /* ── Pipeline marquee: reduced height and font on mobile ── */
  .be-pipeline-strip {
    height: 52px;
  }
  @media (max-width: 767px) {
    .be-pipeline-strip {
      height: 40px;
    }
    .be-pipeline-step-text {
      font-size: 11px !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
  }

  /* ── Trusted By logo strip: reduce logo height on mobile ── */
  .be-logo-item {
    height: 48px;
    min-width: 140px;
    margin-left: 32px;
    margin-right: 32px;
  }
  @media (max-width: 767px) {
    .be-logo-item {
      height: 32px;
      min-width: 100px;
      margin-left: 16px;
      margin-right: 16px;
    }
    .be-logo-item span {
      font-size: 10px !important;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .nav-link-be { position: relative; text-decoration: none; }
    .nav-link-be::after {
      content: ''; position: absolute; bottom: -3px; left: 0;
      width: 0; height: 1.5px; background: ${RED}; transition: width 0.3s ease;
    }
    .nav-link-be:hover::after { width: 100%; }

    @keyframes be-ticker {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .be-ticker-track { display: flex; width: max-content; animation: be-ticker 30s linear infinite; }

    @keyframes be-creed {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .be-creed-track { display: flex; width: max-content; animation: be-creed 55s linear infinite; }

    @keyframes be-pipeline {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .be-pipeline-track { display: flex; width: max-content; animation: be-pipeline 35s linear infinite; }

    .footer-soc-btn { transition: background-color 0.25s, border-color 0.25s, color 0.25s; }
    .footer-soc-btn:hover { background-color: ${RED} !important; border-color: ${RED} !important; color: #fff !important; }
    .footer-nav-link { position: relative; text-decoration: none; }
    .footer-nav-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1.5px; background: ${RED}; transition: width 0.3s ease;
    }
    .footer-nav-link:hover { color: #ffffff !important; }
    .footer-nav-link:hover::after { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .be-ticker-track { animation: none; }
    .be-creed-track { animation: none; }
    .be-pipeline-track { animation: none; }
  }
`;

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollY() {
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrollY;
}

// ─── FadeSlideUp helper ───────────────────────────────────────────────────────
const FadeSlideUp = ({
  children,
  delay = 0,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.15
  });
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 40
  }} animate={inView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 40
  }} transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
    delay
  }} className={className}>
    {children}
  </motion.div>;
};

// ─── Anchor Nav ───────────────────────────────────────────────────────────────
const AnchorNav = () => {
  const [activeSection, setActiveSection] = React.useState<string>('');
  const scrollY = useScrollY();
  const isVisible = scrollY > 600;
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ANCHOR_NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(item.sectionId);
        });
      }, {
        threshold: 0.25,
        rootMargin: '-80px 0px -50% 0px'
      });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  return <AnimatePresence>
    {isVisible && <motion.div initial={{
      opacity: 0,
      y: -12
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: -12
    }} transition={{
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1]
    }} className="be-anchor-nav-wrap" style={{
      position: 'fixed',
      top: '62px',
      left: 0,
      right: 0,
      zIndex: 45,
      justifyContent: 'center',
      padding: '8px 16px',
      pointerEvents: 'none'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(13,13,13,0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '999px',
        padding: '5px',
        pointerEvents: 'auto',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        overflowX: 'auto',
        maxWidth: '100%'
      }}>
        {ANCHOR_NAV_ITEMS.map(item => {
          const isActive = activeSection === item.sectionId;
          return <button key={item.id} onClick={() => scrollTo(item.sectionId)} style={{
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            border: 'none',
            background: isActive ? RED : 'transparent',
            color: isActive ? WHITE : 'rgba(255,255,255,0.55)',
            transition: 'background 0.25s, color 0.25s',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            {item.label}
          </button>;
        })}
      </div>
    </motion.div>}
  </AnimatePresence>;
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const scrollY = useScrollY();
  const reducedMotion = usePrefersReducedMotion();
  const heroParallaxY = reducedMotion ? 0 : scrollY * 0.4;
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setInView(true), 200);
    return () => clearTimeout(t);
  }, []);
  const S = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(30px)',
    transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
  });
  return <section style={{
    position: 'relative',
    width: '100%',
    minHeight: '100svh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    background: DARK,
    overflow: 'hidden'
  }}>
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: '-20%',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      <img src="/activations.JPG" alt="" style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        filter: 'brightness(0.55) grayscale(100%) contrast(1.1)',
        transform: `translateY(${heroParallaxY}px) scale(1.05)`,
        willChange: 'transform'
      }} />
    </div>
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.70) 50%, rgba(13,13,13,0.35) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(13,13,13,0.60) 0%, rgba(13,13,13,0.10) 40%, rgba(13,13,13,0.92) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.18) 0%, transparent 55%)',
      pointerEvents: 'none'
    }} />

    <div style={{
      position: 'relative',
      width: '100%',
      padding: 'clamp(80px, 8vh, 120px) clamp(16px, 5vw, 96px) clamp(40px, 5vh, 60px)',
      zIndex: 10,
      marginTop: 'auto'
    }}>
      <div style={S(100)} className="mb-4 md:mb-5 lg:mb-6">
        <div className="flex items-center gap-3 md:gap-4 mb-3">
          <div style={{
            width: '4px',
            height: 'clamp(32px,4vw,40px)',
            background: RED,
            borderRadius: '2px',
            flexShrink: 0
          }} />
          <p style={{
            fontSize: 'clamp(13px,1.5vw,16px)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.70)',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            maxWidth: 480
          }}>
            <span>Africa's leading events, experiential marketing &amp; brand activations practice. Designing, producing and scaling world-class experiences.</span>
          </p>
        </div>
      </div>

      <div style={S(200)}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5.5vw, 80px)',
          fontWeight: 600,
          color: WHITE,
          letterSpacing: '-0.05em',
          lineHeight: 0.95,
          textTransform: 'none',
          marginBottom: '0.15em'
        }}>
          <span style={{
            display: 'block'
          }}><span>Experiential Marketing,</span></span>
          <span style={{
            display: 'block'
          }}>
            <span>Events</span>
            <span style={{
              color: 'rgba(255,255,255,0.30)',
              margin: '0 0.15em'
            }}>&amp;</span>
            <span style={{
              color: RED
            }}>Activations</span>
          </span>
          <span style={{
            display: 'block',
            color: 'rgba(255,255,255,0.40)'
          }}><span>Practice</span></span>
        </h1>
      </div>

      {/* Hero CTA buttons — responsive via CSS class */}
      <div style={S(450)} className="be-hero-cta-group mt-4 md:mt-6 lg:mt-8">
        <a href="#section-signature" className="cta-primary group" onClick={e => {
          e.preventDefault();
          document.getElementById('section-signature')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}>
          <span>Explore Our Practice</span>
          <div className="cta-icon-container">
            <ArrowUpRight size={14} className="text-[#1E1E1E]" />
          </div>
        </a>
        <a href="/contact" className="cta-secondary group">
          <span>Partner With Us</span>
        </a>
      </div>
    </div>

    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      padding: 'clamp(12px,2vw,16px) clamp(16px,5vw,40px)',
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <p style={{
        color: 'rgba(255,255,255,0.50)',
        fontWeight: 500,
        fontSize: '12px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase'
      }}>
        <span>Experiential Marketing &amp; Events</span>
      </p>
      <p style={{
        color: RED,
        fontWeight: 700,
        fontSize: '11px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase'
      }} className="hidden sm:block">
        <span>Pan-African Events Practice</span>
      </p>
    </div>
  </section>;
};

// ─── Ticker ───────────────────────────────────────────────────────────────────
const TickerStrip = () => {
  const [isPaused, setIsPaused] = React.useState(false);
  const allItems = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return <div className="w-full overflow-hidden" style={{
    background: CHARCOAL,
    borderTop: `3px solid ${RED}`,
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingTop: 'clamp(14px,2vw,20px)',
    paddingBottom: 'clamp(14px,2vw,20px)'
  }} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
    <div className="be-ticker-track" style={{
      animationPlayState: isPaused ? 'paused' : 'running'
    }}>
      {allItems.map((item, idx) => <div key={`${item.id}-${idx}`} className="flex items-center shrink-0">
        <span style={{
          fontSize: 'clamp(10px,1.5vw,13px)',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: idx % 2 === 0 ? WHITE : 'rgba(255,255,255,0.40)',
          whiteSpace: 'nowrap',
          paddingLeft: 'clamp(12px,2vw,24px)',
          paddingRight: 'clamp(12px,2vw,24px)'
        }}>
          {item.text}
        </span>
        <span style={{
          color: RED,
          fontSize: '10px',
          marginLeft: '0.5rem',
          marginRight: '0.5rem'
        }}>◆</span>
      </div>)}
    </div>
  </div>;
};

// ─── Signature Offerings — Hero Showcase ─────────────────────────────────────
const SignatureOfferingsSection = () => {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.05
  });
  const [activeId, setActiveId] = React.useState<string>('sig1');
  const activeOffering = SIGNATURE_OFFERINGS.find(o => o.id === activeId) || SIGNATURE_OFFERINGS[0];
  return <section id="section-signature" ref={ref} style={{
    background: DARK,
    borderBottom: `1px solid rgba(252,54,55,0.12)`
  }}>
    {/* Intro */}
    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'clamp(56px,7vw,120px) clamp(16px,5vw,96px) clamp(32px,4vw,48px)'
    }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end">
        <div>
          <FadeSlideUp>
            <span style={{
              display: 'block',
              color: RED,
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Signature Products
            </span>
          </FadeSlideUp>
          <FadeSlideUp delay={0.06}>
            <h2 style={{
              fontSize: 'clamp(1.75rem,5vw,3.75rem)',
              fontWeight: 600,
              color: WHITE,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              margin: 0
            }}>
              <span style={{
                display: 'block'
              }}>Six Proprietary</span>
              <span style={{
                display: 'block',
                color: 'rgba(255,255,255,0.35)'
              }}>Solutions</span>
            </h2>
          </FadeSlideUp>
        </div>
        <FadeSlideUp delay={0.1}>
          <p style={{
            fontSize: 'clamp(15px,1.6vw,18px)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.60)',
            fontWeight: 400,
            margin: 0
          }}>
            Proprietary branded solutions engineered to amplify every dimension of event impact — from media influence and commercialisation to audience growth, experience design, intelligence, and legacy.
          </p>
        </FadeSlideUp>
      </div>
    </div>

    {/* Interactive showcase */}
    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 clamp(16px,5vw,96px) clamp(56px,7vw,96px)'
    }}>
      {/* Tab selectors */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '32px'
      }}>
        {SIGNATURE_OFFERINGS.map(offering => {
          const isAct = offering.id === activeId;
          return <button key={offering.id} onClick={() => setActiveId(offering.id)} style={{
            padding: '10px 20px',
            border: `1px solid ${isAct ? RED : 'rgba(255,255,255,0.12)'}`,
            background: isAct ? RED : 'transparent',
            color: isAct ? WHITE : 'rgba(255,255,255,0.55)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            cursor: 'pointer',
            transition: 'all 0.25s',
            whiteSpace: 'nowrap'
          }}>
            <span>{offering.name}</span>
            <span style={{
              color: isAct ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)',
              fontSize: '9px',
              fontWeight: 700,
              verticalAlign: 'super',
              marginLeft: '2px'
            }}>™</span>
          </button>;
        })}
      </div>

      {/* Active offering detail panel */}
      <AnimatePresence mode="wait">
        <motion.div key={activeId} initial={{
          opacity: 0,
          y: 16
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -8
        }} transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }} className="be-sig-panel">
          {/* Image */}
          <div className="be-sig-panel-img" style={{
            position: 'relative',
            height: '180px',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img src={activeOffering.image} alt={activeOffering.name} style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              filter: 'saturate(0.55) brightness(0.5)'
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, transparent 0%, rgba(13,13,13,0.6) 100%)'
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 60%, rgba(13,13,13,0.8) 100%)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px'
            }}>
              <span style={{
                display: 'inline-block',
                fontSize: 'clamp(20px,3vw,32px)',
                fontWeight: 900,
                letterSpacing: '-0.05em',
                color: RED,
                lineHeight: 1
              }}>
                {activeOffering.name}
              </span>
              <span style={{
                color: 'rgba(255,255,255,0.30)',
                fontSize: '10px',
                fontWeight: 700,
                verticalAlign: 'super',
                marginLeft: '3px'
              }}>™</span>
            </div>
          </div>

          {/* Content */}
          <div className="be-sig-panel-content" style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(252,54,55,0.25)',
            borderLeft: 'none',
            padding: 'clamp(28px,3vw,48px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '3px',
              background: RED
            }} />
            <p style={{
              fontSize: 'clamp(14px,1.5vw,17px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.75)',
              margin: 0
            }}>
              {activeOffering.description}
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {SIGNATURE_OFFERINGS.map(o => <button key={o.id} onClick={() => setActiveId(o.id)} style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: `1.5px solid ${o.id === activeId ? RED : 'rgba(255,255,255,0.25)'}`,
                background: o.id === activeId ? RED : 'transparent',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.2s'
              }} aria-label={`View ${o.name}`} />)}
            </div>
            <a href="/contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: RED,
              textDecoration: 'none'
            }}>
              <span>Explore {activeOffering.name}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </section>;
};

// ─── Value Proposition Section ────────────────────────────────────────────────
const ValuePropositionSection = () => {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.1
  });
  return <section ref={ref} style={{
    background: CHARCOAL,
    borderBottom: `1px solid rgba(252,54,55,0.12)`
  }}>
    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'clamp(56px,7vw,112px) clamp(16px,5vw,96px)'
    }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
        <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={inView ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: -30
        }} transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1]
        }}>
          <span style={{
            display: 'block',
            color: RED,
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            The Power of Experience
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem,4vw,3.5rem)',
            fontWeight: 600,
            color: WHITE,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: '1.5rem'
          }}>
            <span style={{
              display: 'block'
            }}>Designing Events</span>
            <span style={{
              display: 'block',
              color: 'rgba(255,255,255,0.40)'
            }}>That Drive Impact</span>
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}>
            <p style={{
              fontSize: 'clamp(14px,1.5vw,16px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)'
            }}>
              In today's experience-driven economy, events are no longer just gatherings — they are powerful platforms for building brands, mobilising communities, attracting capital, and strengthening reputation.
            </p>
            <p style={{
              fontSize: 'clamp(14px,1.5vw,16px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.60)'
            }}>
              EmpowaWorx designs, produces, and scales world-class conferences, summits, exhibitions, stakeholder platforms, and experiential engagements that deliver measurable economic and social impact.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {STATS_DATA.map((stat, idx) => <motion.div key={stat.id} initial={{
              opacity: 0,
              y: 20
            }} animate={inView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 20
            }} transition={{
              duration: 0.7,
              delay: 0.2 + idx * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }} style={{
              borderTop: `2px solid ${RED}`,
              paddingTop: '1rem'
            }}>
              <span style={{
                display: 'block',
                fontSize: 'clamp(1.5rem,3vw,2.5rem)',
                fontWeight: 700,
                color: RED,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '6px'
              }}>
                {stat.value}
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.40)'
              }}>
                {stat.label}
              </span>
            </motion.div>)}
          </div>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          scale: 0.92
        }} animate={inView ? {
          opacity: 1,
          scale: 1
        } : {
          opacity: 0,
          scale: 0.92
        }} transition={{
          duration: 0.9,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1]
        }} style={{
          position: 'relative'
        }}>
          <div style={{
            border: `1px solid rgba(252,54,55,0.25)`,
            padding: '6px',
            aspectRatio: '1'
          }}>
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" alt="World-class conference and events production" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'saturate(0.85)'
            }} />
          </div>
          <div aria-hidden="true" style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '180px',
            height: '180px',
            background: `rgba(252,54,55,0.07)`,
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }} />
        </motion.div>
      </div>
    </div>
  </section>;
};

// ─── Inline CTA Block ─────────────────────────────────────────────────────────
const InlineCTA = ({
  variant
}: {
  variant: 'talk' | 'deck';
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.3
  });
  return <div ref={ref} style={{
    background: 'rgba(252,54,55,0.06)',
    borderTop: `1px solid rgba(252,54,55,0.18)`,
    borderBottom: `1px solid rgba(252,54,55,0.18)`
  }}>
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={inView ? {
      opacity: 1,
      y: 0
    } : {
      opacity: 0,
      y: 20
    }} transition={{
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }} className="be-inline-cta-inner">
      <p style={{
        fontSize: 'clamp(15px,1.8vw,20px)',
        fontWeight: 600,
        color: WHITE,
        letterSpacing: '-0.02em',
        margin: 0,
        maxWidth: '560px'
      }}>
        {variant === 'talk' ? <span>Ready to create your next world-class experience? <span style={{
          color: RED
        }}>Let's build it together.</span></span> : <span>See the full scope of our capabilities. <span style={{
          color: RED
        }}>Download our capabilities deck.</span></span>}
      </p>
      <div className="be-cta-btn-group">
        {variant === 'talk' ? <a href="#section-cta" onClick={e => {
          e.preventDefault();
          document.getElementById('section-cta')?.scrollIntoView({
            behavior: 'smooth'
          });
        }} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: RED,
          color: WHITE,
          padding: '12px 24px',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'opacity 0.2s'
        }}>
          <Phone size={14} />
          <span>Let's Talk</span>
        </a> : <a href="/contact" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          border: `1.5px solid ${RED}`,
          color: RED,
          padding: '12px 24px',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          background: 'transparent',
          transition: 'background 0.2s, color 0.2s'
        }} onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = RED;
          (e.currentTarget as HTMLAnchorElement).style.color = WHITE;
        }} onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
          (e.currentTarget as HTMLAnchorElement).style.color = RED;
        }}>
          <Download size={14} />
          <span>Download Capabilities Deck</span>
        </a>}
      </div>
    </motion.div>
  </div>;
};

// ─── Stat Callout Bar ─────────────────────────────────────────────────────────
const StatCalloutBar = ({
  stats
}: {
  stats: StatItem[];
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.3
  });
  return <div ref={ref} style={{
    background: DARK,
    borderTop: `1px solid rgba(252,54,55,0.15)`,
    borderBottom: `1px solid rgba(252,54,55,0.15)`
  }}>
    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'clamp(32px,4vw,56px) clamp(16px,5vw,96px)'
    }}>
      <div className="be-stat-grid">
        {stats.map((stat, idx) => <motion.div key={stat.id} initial={{
          opacity: 0,
          y: 20
        }} animate={inView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 20
        }} transition={{
          duration: 0.6,
          delay: idx * 0.08,
          ease: [0.22, 1, 0.36, 1]
        }} style={{
          textAlign: 'center'
        }}>
          <span style={{
            display: 'block',
            fontSize: 'clamp(2rem,5vw,4rem)',
            fontWeight: 800,
            color: RED,
            letterSpacing: '-0.05em',
            lineHeight: 1,
            marginBottom: '8px'
          }}>
            {stat.value}
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)'
          }}>
            {stat.label}
          </span>
        </motion.div>)}
      </div>
    </div>
  </div>;
};

// ─── Services Section — Accordion ─────────────────────────────────────────────
const ServicesSection = () => {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.05
  });
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [showAll, setShowAll] = React.useState(false);
  const visibleCategories = showAll ? SERVICE_CATEGORIES : SERVICE_CATEGORIES.slice(0, 6);
  return <section id="section-services" ref={ref} style={{
    background: CHARCOAL,
    position: 'relative'
  }}>
    {/* Full-bleed section header */}
    <div style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(240px, 30vw, 420px)',
      overflow: 'hidden'
    }}>
      <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" alt="Professional event production and strategy" style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 40%',
        display: 'block',
        filter: 'saturate(0.6) brightness(0.45)'
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.55) 60%, rgba(17,17,17,1) 100%)'
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(24px,4vw,60px) clamp(16px,5vw,96px)'
      }}>
        <FadeSlideUp>
          <span style={{
            display: 'block',
            color: RED,
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            What We Do
          </span>
        </FadeSlideUp>
        <FadeSlideUp delay={0.08}>
          <h2 style={{
            fontSize: 'clamp(1.75rem,5vw,3.5rem)',
            fontWeight: 600,
            color: WHITE,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            maxWidth: '700px'
          }}>
            Full-Spectrum Event Services
          </h2>
        </FadeSlideUp>
        <FadeSlideUp delay={0.15}>
          <p style={{
            marginTop: '1.25rem',
            fontSize: 'clamp(14px,1.5vw,17px)',
            lineHeight: 1.5,
            color: WHITE,
            maxWidth: '700px',
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}>
            We help brands, organisations and governments design, produce and scale world-class experiences that build reputations, mobilise communities and deliver measurable impact.
          </p>
        </FadeSlideUp>
        <FadeSlideUp delay={0.2}>
          <p style={{
            marginTop: '0.75rem',
            fontSize: 'clamp(13px,1.3vw,15px)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '660px'
          }}>
            Nine specialist capability areas — each a complete practice in its own right, combining seamlessly into a single, end-to-end service architecture.
          </p>
        </FadeSlideUp>
      </div>
    </div>

    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'clamp(32px,4vw,56px) clamp(16px,5vw,96px) clamp(48px,5vw,80px)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}>
        {visibleCategories.map((cat, idx) => {
          const isOpen = openId === cat.id;
          return <motion.div key={cat.id} initial={{
            opacity: 0,
            y: 16
          }} animate={inView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 16
          }} transition={{
            duration: 0.6,
            delay: idx * 0.04,
            ease: [0.22, 1, 0.36, 1]
          }} style={{
            border: '1px solid',
            borderColor: isOpen ? RED : 'rgba(255,255,255,0.07)',
            background: isOpen ? 'rgba(252,54,55,0.04)' : 'rgba(255,255,255,0.02)',
            transition: 'border-color 0.3s, background 0.3s',
            overflow: 'hidden'
          }}>
            <button onClick={() => setOpenId(isOpen ? null : cat.id)} style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(16px,2vw,22px) clamp(16px,2.5vw,28px)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              gap: '12px',
              textAlign: 'left',
              minHeight: '56px'
            }} aria-expanded={isOpen}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                flexGrow: 1,
                minWidth: 0
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  color: isOpen ? RED : 'rgba(255,255,255,0.18)',
                  flexShrink: 0,
                  transition: 'color 0.3s'
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div style={{
                  minWidth: 0
                }}>
                  <span style={{
                    display: 'block',
                    fontSize: 'clamp(13px,1.4vw,16px)',
                    fontWeight: 700,
                    color: WHITE,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3
                  }}>
                    {cat.title}
                  </span>
                  {!isOpen && <span style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.40)',
                    marginTop: '3px',
                    lineHeight: 1.4
                  }}>
                    {cat.descriptor}
                  </span>}
                </div>
              </div>
              <div style={{
                flexShrink: 0,
                width: '32px',
                height: '32px',
                border: `1px solid ${isOpen ? RED : 'rgba(255,255,255,0.15)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.3s'
              }}>
                <motion.div animate={{
                  rotate: isOpen ? 180 : 0
                }} transition={{
                  duration: 0.3
                }}>
                  <ChevronDown size={14} color={isOpen ? RED : 'rgba(255,255,255,0.50)'} />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && <motion.div key="content" initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: 'auto',
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1]
              }} style={{
                overflow: 'hidden'
              }}>
                <div className="be-services-content">
                  <p style={{
                    fontSize: '13px',
                    color: RED,
                    fontWeight: 600,
                    marginBottom: '14px',
                    letterSpacing: '-0.01em'
                  }}>
                    {cat.descriptor}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{
                    gap: '8px'
                  }}>
                    {cat.items.map(item => <div key={item} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}>
                      <span style={{
                        color: RED,
                        fontSize: '9px',
                        marginTop: '4px',
                        flexShrink: 0
                      }}>◆</span>
                      <span style={{
                        fontSize: '12px',
                        lineHeight: 1.5,
                        color: 'rgba(255,255,255,0.65)'
                      }}>{item}</span>
                    </div>)}
                  </div>
                  <a href="/contact" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: RED,
                    textDecoration: 'none',
                    marginTop: '18px'
                  }}>
                    <span>Learn More</span>
                    <ChevronRight size={12} />
                  </a>
                </div>
              </motion.div>}
            </AnimatePresence>
          </motion.div>;
        })}
      </div>

      {/* Show all / show less toggle */}
      <div style={{
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <button onClick={() => setShowAll(prev => !prev)} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          border: `1px solid rgba(255,255,255,0.15)`,
          color: 'rgba(255,255,255,0.60)',
          background: 'transparent',
          padding: '10px 24px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'border-color 0.25s, color 0.25s'
        }} onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = RED;
          (e.currentTarget as HTMLButtonElement).style.color = RED;
        }} onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.60)';
        }}>
          <span>{showAll ? 'Show less' : `Show all ${SERVICE_CATEGORIES.length} service areas`}</span>
          <motion.div animate={{
            rotate: showAll ? 180 : 0
          }} transition={{
            duration: 0.3
          }}>
            <ChevronDown size={13} />
          </motion.div>
        </button>
      </div>
    </div>
  </section>;
};

// ─── End-to-End Capability Pipeline ──────────────────────────────────────────
const PipelineSection = () => {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.1
  });
  const allSteps = [...PIPELINE_STEPS, ...PIPELINE_STEPS];
  return <section ref={ref} style={{
    position: 'relative',
    borderTop: `1px solid rgba(252,54,55,0.12)`,
    overflow: 'hidden'
  }}>
    <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" alt="" aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
      filter: 'saturate(0.4) brightness(0.28)'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.80) 100%)'
    }} />
    <div style={{
      position: 'relative',
      zIndex: 2,
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'clamp(48px,6vw,96px) clamp(16px,5vw,96px) 0'
    }}>
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 30
      }} transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      }}>
        <span style={{
          display: 'block',
          color: RED,
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          End-to-End Capability
        </span>
        <h2 style={{
          fontSize: 'clamp(1.5rem,3.5vw,2.75rem)',
          fontWeight: 600,
          color: WHITE,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          marginBottom: 'clamp(40px,5vw,72px)',
          maxWidth: '600px'
        }}>
          <span style={{
            display: 'block'
          }}>From First Idea</span>
          <span style={{
            display: 'block',
            color: 'rgba(255,255,255,0.40)'
          }}>To Lasting Impact</span>
        </h2>
      </motion.div>
    </div>

    {/* Full-viewport-width marquee strip */}
    <motion.div initial={{
      opacity: 0
    }} animate={inView ? {
      opacity: 1
    } : {
      opacity: 0
    }} transition={{
      duration: 0.7,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }} className="be-pipeline-strip" style={{
      position: 'relative',
      zIndex: 2,
      width: '100%',
      overflow: 'hidden',
      background: RED,
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="be-pipeline-track">
        {allSteps.map((step, idx) => <div key={`ps-${idx}`} style={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <span className="be-pipeline-step-text" style={{
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: WHITE,
            whiteSpace: 'nowrap',
            paddingLeft: '28px',
            paddingRight: '28px'
          }}>
            {step}
          </span>
          <span style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '13px',
            fontWeight: 400,
            flexShrink: 0,
            marginRight: '4px'
          }}>→</span>
        </div>)}
      </div>
    </motion.div>

    <div style={{
      position: 'relative',
      zIndex: 2,
      height: 'clamp(40px,5vw,64px)'
    }} />
  </section>;
};

// ─── Flagship Capabilities — Accordion (5 consolidated themes) ────────────────
const FlagshipCapabilitiesSection = () => {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.05
  });
  const [openId, setOpenId] = React.useState<string | null>('ft1');
  return <section id="section-capabilities" ref={ref} style={{
    background: '#111111',
    borderTop: `1px solid rgba(252,54,55,0.12)`,
    position: 'relative'
  }}>
    {/* Hero image banner */}
    <div style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(200px, 25vw, 360px)',
      overflow: 'hidden'
    }}>
      <img src="https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=2070&auto=format&fit=crop" alt="World-class premium event production" style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 35%',
        display: 'block',
        filter: 'saturate(0.55) brightness(0.4)'
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.55) 60%, rgba(17,17,17,1) 100%)'
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(24px,4vw,56px) clamp(16px,5vw,96px)'
      }}>
        <FadeSlideUp>
          <span style={{
            display: 'block',
            color: RED,
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Core Capabilities
          </span>
        </FadeSlideUp>
        <FadeSlideUp delay={0.08}>
          <h2 style={{
            fontSize: 'clamp(1.75rem,5vw,3.5rem)',
            fontWeight: 600,
            color: WHITE,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            maxWidth: '600px'
          }}>
            5 Flagship Capability Themes
          </h2>
        </FadeSlideUp>
        <FadeSlideUp delay={0.15}>
          <p style={{
            marginTop: '1rem',
            fontSize: 'clamp(13px,1.4vw,15px)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '580px'
          }}>
            Ten service offerings consolidated into five powerful capability themes — each end-to-end, measurable, and scalable across any event format.
          </p>
        </FadeSlideUp>
      </div>
    </div>

    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'clamp(32px,4vw,56px) clamp(16px,5vw,96px) clamp(48px,5vw,80px)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}>
        {FLAGSHIP_THEMES.map((theme, idx) => {
          const isOpen = openId === theme.id;
          return <motion.div key={theme.id} initial={{
            opacity: 0,
            y: 20
          }} animate={inView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }} transition={{
            duration: 0.6,
            delay: idx * 0.07,
            ease: [0.22, 1, 0.36, 1]
          }} style={{
            border: '1px solid',
            borderColor: isOpen ? RED : 'rgba(255,255,255,0.07)',
            background: isOpen ? 'rgba(252,54,55,0.04)' : 'rgba(255,255,255,0.02)',
            transition: 'border-color 0.3s, background 0.3s',
            overflow: 'hidden'
          }}>
            <button onClick={() => setOpenId(isOpen ? null : theme.id)} style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(16px,2.5vw,26px) clamp(16px,2.5vw,32px)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              gap: '12px',
              textAlign: 'left',
              minHeight: '64px'
            }} aria-expanded={isOpen}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexGrow: 1,
                minWidth: 0
              }}>
                <span style={{
                  fontSize: 'clamp(1.2rem,2.5vw,2.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.06em',
                  color: isOpen ? RED : 'rgba(255,255,255,0.12)',
                  flexShrink: 0,
                  transition: 'color 0.3s',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  {theme.number}
                </span>
                <div style={{
                  minWidth: 0
                }}>
                  <span style={{
                    display: 'block',
                    fontSize: 'clamp(13px,1.6vw,18px)',
                    fontWeight: 700,
                    color: WHITE,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.2
                  }}>
                    {theme.title}
                  </span>
                  {!isOpen && <span style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.40)',
                    marginTop: '4px',
                    lineHeight: 1.4
                  }}>
                    {theme.teaser}
                  </span>}
                </div>
              </div>
              <div style={{
                flexShrink: 0,
                width: '32px',
                height: '32px',
                border: `1px solid ${isOpen ? RED : 'rgba(255,255,255,0.15)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.3s'
              }}>
                <motion.div animate={{
                  rotate: isOpen ? 180 : 0
                }} transition={{
                  duration: 0.3
                }}>
                  <ChevronDown size={15} color={isOpen ? RED : 'rgba(255,255,255,0.50)'} />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && <motion.div key="content" initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: 'auto',
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }} style={{
                overflow: 'hidden'
              }}>
                <div className="be-flagship-detail" style={{
                  padding: 'clamp(16px,2.5vw,28px) clamp(16px,2.5vw,32px) clamp(20px,2.5vw,32px)'
                }}>
                  {/* Compact thumbnail */}
                  <div className="be-flagship-thumbnail" style={{
                    flexShrink: 0,
                    width: '120px',
                    height: '120px',
                    overflow: 'hidden',
                    border: `1px solid rgba(252,54,55,0.20)`
                  }}>
                    <img src={theme.image} alt={theme.title} style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      filter: 'saturate(0.5) brightness(0.55)'
                    }} />
                  </div>
                  {/* Content */}
                  <div style={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    <p style={{
                      fontSize: 'clamp(13px,1.4vw,15px)',
                      lineHeight: 1.75,
                      color: 'rgba(255,255,255,0.65)',
                      margin: 0
                    }}>
                      {theme.description}
                    </p>
                    <div>
                      <p style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.30)',
                        marginBottom: '10px'
                      }}>
                        Included offerings
                      </p>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        {theme.subOfferings.map(sub => <div key={sub} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px'
                        }}>
                          <span style={{
                            color: RED,
                            fontSize: '9px',
                            marginTop: '4px',
                            flexShrink: 0
                          }}>◆</span>
                          <span style={{
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.60)',
                            lineHeight: 1.4
                          }}>{sub}</span>
                        </div>)}
                      </div>
                    </div>
                    <a href="/contact" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: RED,
                      textDecoration: 'none',
                      marginTop: '4px'
                    }}>
                      <span>Explore Full Capabilities</span>
                      <ChevronRight size={13} />
                    </a>
                  </div>
                </div>
              </motion.div>}
            </AnimatePresence>
          </motion.div>;
        })}
      </div>
    </div>
  </section>;
};

// ─── Event Solutions Section (6 tiles) ───────────────────────────────────────
const EventSolutionsSection = () => {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.05
  });
  const [hovered, setHovered] = React.useState<string | null>(null);
  const solutionIcons = [Layers, Globe, Zap, Star, BarChart2, ArrowRight];
  return <section id="section-solutions" ref={ref} style={{
    background: DARK,
    borderTop: `1px solid rgba(252,54,55,0.12)`
  }}>
    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'clamp(48px,6vw,96px) clamp(16px,5vw,96px) 0'
    }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 md:mb-16 lg:mb-20">
        <div>
          <FadeSlideUp>
            <span style={{
              display: 'block',
              color: RED,
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Integrated Solutions
            </span>
          </FadeSlideUp>
          <FadeSlideUp delay={0.08}>
            <h2 style={{
              fontSize: 'clamp(1.75rem,5vw,3.5rem)',
              fontWeight: 600,
              color: WHITE,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              maxWidth: '700px'
            }}>
              EmpowaWorx Event, Experience &amp; Engagement Solutions
            </h2>
          </FadeSlideUp>
          <FadeSlideUp delay={0.15}>
            <p style={{
              marginTop: '1.25rem',
              fontSize: 'clamp(14px,1.5vw,16px)',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '640px'
            }}>
              Six integrated solution sets that power every dimension of the modern event — from delegate registration to post-event intelligence.
            </p>
          </FadeSlideUp>
        </div>
        <FadeSlideUp delay={0.1}>
          <div style={{
            position: 'relative',
            aspectRatio: '16/9',
            overflow: 'hidden',
            border: `1px solid rgba(252,54,55,0.20)`
          }}>
            <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop" alt="Event engagement and technology solutions" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              filter: 'saturate(0.7) brightness(0.75)'
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(252,54,55,0.12) 0%, transparent 60%)'
            }} />
          </div>
        </FadeSlideUp>
      </div>
    </div>

    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 clamp(16px,5vw,96px) clamp(48px,6vw,96px)'
    }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {EVENT_SOLUTIONS.map((solution, idx) => {
          const isHov = hovered === solution.id;
          const IconComponent = solutionIcons[idx] || Layers;
          return <motion.div key={solution.id} initial={{
            opacity: 0,
            y: 28
          }} animate={inView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 28
          }} transition={{
            duration: 0.7,
            delay: idx * 0.08,
            ease: [0.22, 1, 0.36, 1]
          }} onMouseEnter={() => setHovered(solution.id)} onMouseLeave={() => setHovered(null)} style={{
            background: isHov ? 'rgba(252,54,55,0.05)' : 'rgba(255,255,255,0.02)',
            border: '1px solid',
            borderColor: isHov ? RED : 'rgba(255,255,255,0.07)',
            padding: 'clamp(20px,2.5vw,32px)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
            boxShadow: isHov ? `0 8px 40px rgba(252,54,55,0.10)` : 'none',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: `1px solid ${isHov ? RED : 'rgba(255,255,255,0.12)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.3s',
              flexShrink: 0
            }}>
              <IconComponent size={18} color={isHov ? RED : 'rgba(255,255,255,0.50)'} />
            </div>
            <h3 style={{
              fontSize: 'clamp(13px,1.3vw,15px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: WHITE,
              textTransform: 'none',
              lineHeight: 1.3,
              margin: 0
            }}>
              {solution.title}
            </h3>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
              flexGrow: 1
            }}>
              {solution.items.map(item => <li key={item} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <span style={{
                  color: RED,
                  fontSize: '10px',
                  marginTop: '3px',
                  flexShrink: 0
                }}>◆</span>
                <span style={{
                  fontSize: '12px',
                  lineHeight: 1.5,
                  color: 'rgba(255,255,255,0.55)'
                }}>{item}</span>
              </li>)}
            </ul>
          </motion.div>;
        })}
      </div>
    </div>
  </section>;
};

// ─── Logo Strip — Trusted By ──────────────────────────────────────────────────
const TrustedBySection = () => {
  const allLogos = [...LOGO_PLACEHOLDERS, ...LOGO_PLACEHOLDERS, ...LOGO_PLACEHOLDERS];
  return <div style={{
    background: '#F9F9F9',
    paddingTop: 'clamp(40px,5vw,64px)',
    paddingBottom: 'clamp(40px,5vw,64px)'
  }}>
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes trusted-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
        .trusted-track {
          display: flex;
          width: max-content;
          animation: trusted-marquee 30s linear infinite;
        }
        .trusted-logo-item {
          opacity: 0.5;
          transition: opacity 0.25s ease;
        }
        .trusted-logo-item:hover {
          opacity: 1;
        }
      `
    }} />

    {/* Label */}
    <p style={{
      textAlign: 'center',
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: '#AAAAAA',
      marginBottom: 'clamp(24px,3vw,36px)'
    }}>
      Trusted By
    </p>

    {/* Marquee wrapper with fade masks */}
    <div style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Left fade */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '80px',
        height: '100%',
        background: 'linear-gradient(to right, #F9F9F9 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />
      {/* Right fade */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80px',
        height: '100%',
        background: 'linear-gradient(to left, #F9F9F9 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      <div className="trusted-track">
        {allLogos.map((logo, idx) => <div key={`${logo.id}-${idx}`} className="trusted-logo-item be-logo-item" style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
          border: '1px solid #E0E0E0',
          background: '#FFFFFF',
          borderRadius: '4px'
        }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#888888',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}>
            {logo.name}
          </span>
        </div>)}
      </div>
    </div>
  </div>;
};

// ─── Flagship Practice Statement ─────────────────────────────────────────────
const FlagshipStatementSection = () => {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.15
  });
  return <section ref={ref} style={{
    position: 'relative',
    borderTop: `1px solid rgba(252,54,55,0.12)`,
    overflow: 'hidden'
  }}>
    <img src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2074&auto=format&fit=crop" alt="" aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 30%',
      display: 'block',
      filter: 'saturate(0.35) brightness(0.22)'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.88) 50%, rgba(13,13,13,0.75) 100%)'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 0% 50%, rgba(252,54,55,0.10) 0%, transparent 60%)'
    }} />

    <div style={{
      position: 'relative',
      zIndex: 2,
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'clamp(56px,8vw,140px) clamp(16px,5vw,96px)'
    }}>
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 30
      }} transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      }}>
        <span style={{
          display: 'block',
          color: RED,
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '24px'
        }}>
          Our Practice
        </span>
        <h2 style={{
          fontSize: 'clamp(1.5rem,4vw,3.5rem)',
          fontWeight: 600,
          color: WHITE,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          marginBottom: '2rem',
          maxWidth: '900px'
        }}>
          EmpowaWorx Events, Experiences, Engagement &amp; Influence Advisory
        </h2>
        <div style={{
          borderLeft: `3px solid ${RED}`,
          paddingLeft: 'clamp(20px,3vw,36px)',
          maxWidth: '860px'
        }}>
          <p style={{
            fontSize: 'clamp(15px,1.8vw,20px)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.72)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            margin: 0
          }}>
            Designing, producing and scaling world-class conferences, summits, exhibitions, stakeholder platforms and experiential engagements that build brands, mobilise communities, attract capital, strengthen reputation and deliver measurable economic and social impact.
          </p>
        </div>
      </motion.div>

      <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }} style={{
        marginTop: 'clamp(40px,6vw,72px)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {['Conferences & Summits', 'Exhibitions & Expos', 'Brand Activations', 'Experiential Marketing', 'Awards & Galas', 'Virtual & Hybrid Events', 'Community Activations', 'Executive Platforms'].map(tag => <span key={tag} style={{
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.55)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '8px 14px'
        }}>
          {tag}
        </span>)}
      </motion.div>
    </div>
  </section>;
};

// ─── Final CTA Section ────────────────────────────────────────────────────────
const FinalCTASection = () => {
  return <section id="section-cta" style={{
    position: 'relative',
    overflow: 'hidden'
  }}>
    <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop" alt="" aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
      filter: 'saturate(0.25) brightness(0.2)'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(13,13,13,0.78)'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(135deg, ${RED}50 0%, transparent 60%)`
    }} />

    <div style={{
      position: 'relative',
      zIndex: 2,
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'clamp(64px,9vw,120px) clamp(16px,5vw,96px)'
    }}>
      <FadeSlideUp>
        <span style={{
          display: 'block',
          color: RED,
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          Get in Touch
        </span>
      </FadeSlideUp>
      <FadeSlideUp delay={0.08}>
        <h2 style={{
          fontSize: 'clamp(2rem,6vw,5.5rem)',
          fontWeight: 600,
          color: WHITE,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          marginBottom: '1.5rem',
          maxWidth: '800px',
          textTransform: 'uppercase'
        }}>
          Ready to Lead with Influence and Impact?
        </h2>
      </FadeSlideUp>
      <FadeSlideUp delay={0.15}>
        <p style={{
          fontSize: 'clamp(14px,1.6vw,18px)',
          color: 'rgba(255,255,255,0.60)',
          lineHeight: 1.7,
          maxWidth: '560px',
          marginBottom: '2.5rem'
        }}>
          Partner with Africa's most trusted events and experiential marketing practice. Let's design your next world-class experience.
        </p>
      </FadeSlideUp>
      <FadeSlideUp delay={0.22}>
        <div className="be-final-cta-btn-group">
          <a href="/contact" className="cta-primary group">
            <span>Let's Talk</span>
            <div className="cta-icon-container">
              <Phone size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="/contact" className="cta-secondary group">
            <span>Download Capabilities Deck</span>
          </a>
        </div>
      </FadeSlideUp>
    </div>
  </section>;
};

// ─── Creed Marquee ────────────────────────────────────────────────────────────
const CreedMarquee = () => {
  const [isPaused, setIsPaused] = React.useState(false);
  const allItems = [...CREED_PHRASES, ...CREED_PHRASES];
  return <div style={{
    width: '100%',
    background: DARK,
    borderTop: `1px solid rgba(252,54,55,0.25)`,
    borderBottom: `1px solid rgba(252,54,55,0.25)`,
    overflow: 'hidden',
    paddingTop: 'clamp(20px,3vw,32px)',
    paddingBottom: 'clamp(20px,3vw,32px)'
  }} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
    <div className="be-creed-track" style={{
      animationPlayState: isPaused ? 'paused' : 'running'
    }}>
      {allItems.map((item, idx) => <div key={`${item.id}-${idx}`} className="flex items-center shrink-0">
        <span style={{
          fontSize: 'clamp(0.75rem,1.6vw,1.2rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.80)',
          whiteSpace: 'nowrap',
          paddingLeft: 'clamp(1rem,2vw,2rem)',
          paddingRight: 'clamp(1rem,2vw,2rem)'
        }}>
          {item.text}
        </span>
        <span style={{
          fontSize: '0.65rem',
          color: idx % 2 === 0 ? RED : '#C9963A',
          marginLeft: '0.75rem',
          marginRight: '0.75rem'
        }}>◆</span>
      </div>)}
    </div>
  </div>;
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const FooterComponent = () => {
  const footerRef = React.useRef<HTMLElement>(null);
  const colsRef = React.useRef<HTMLDivElement>(null);
  const footerInView = useInView(footerRef, {
    once: false,
    amount: 0.1
  });
  const colsInView = useInView(colsRef, {
    once: false,
    amount: 0.1
  });
  const S = (inViewParam: boolean, delay: number = 0): React.CSSProperties => ({
    opacity: inViewParam ? 1 : 0,
    transform: inViewParam ? 'none' : 'translateY(30px)',
    transition: `opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
  });
  const socialLinks = [{
    id: 'fb',
    label: 'Facebook',
    icon: <Facebook size={16} />,
    href: 'https://facebook.com/empowaworx'
  }, {
    id: 'ig',
    label: 'Instagram',
    icon: <Instagram size={16} />,
    href: 'https://instagram.com/empowaworx'
  }, {
    id: 'li',
    label: 'LinkedIn',
    icon: <Linkedin size={16} />,
    href: 'https://linkedin.com/company/empowaworx'
  }, {
    id: 'tw',
    label: 'X / Twitter',
    icon: <Twitter size={16} />,
    href: 'https://twitter.com/empowaworx'
  }, {
    id: 'yt',
    label: 'YouTube',
    icon: <Youtube size={16} />,
    href: 'https://youtube.com'
  }];
  return <footer ref={footerRef} style={{
    background: FOOTER_BG,
    color: WHITE,
    ...S(footerInView, 0)
  }}>
    <div style={{
      background: RED,
      padding: 'clamp(36px,6vw,80px) clamp(16px,6vw,96px)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <p style={{
        fontSize: 'clamp(22px,5vw,80px)',
        fontWeight: 700,
        color: WHITE,
        lineHeight: 0.95,
        letterSpacing: '-0.04em',
        maxWidth: 800,
        position: 'relative',
        zIndex: 1
      }}>
        TRANSFORMING BRANDS.<br />ONE EXPERIENCE AT A TIME.
      </p>
    </div>

    <CreedMarquee />

    <div style={{
      padding: 'clamp(40px,5vw,64px) clamp(16px,5vw,96px) clamp(32px,4vw,48px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: FOOTER_BG
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto'
      }}>
        <div ref={colsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-16">
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1" style={S(colsInView, 0)}>
            <div className="flex items-baseline gap-0.5">
              <span style={{
                fontSize: 'clamp(16px,2vw,20px)',
                fontWeight: 600,
                color: WHITE,
                letterSpacing: '-0.05em',
                lineHeight: 1
              }}>EMPOWAWORX</span>
              <span style={{
                color: RED,
                fontSize: '10px',
                fontWeight: 700,
                lineHeight: 1,
                verticalAlign: 'super'
              }}>™</span>
            </div>
            <p style={{
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '320px'
            }}>
              Africa's Leading Growth, Reputation, Influence &amp; Impact Advisory Firm™
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {socialLinks.map(s => <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="footer-soc-btn w-10 h-10 flex items-center justify-center border" style={{
                borderRadius: '50%',
                borderColor: 'rgba(255,255,255,0.20)',
                color: 'rgba(255,255,255,0.65)'
              }}>
                {s.icon}
              </a>)}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t" style={{
              borderColor: 'rgba(255,255,255,0.08)'
            }}>
              {OFFICE_CITIES.map(city => <span key={city} style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)'
              }}>
                {city}
              </span>)}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-5" style={S(colsInView, 80)}>
            <h5 style={{
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: RED,
              marginBottom: '4px'
            }}>
              Navigation
            </h5>
            {FOOTER_NAV.map(link => <a key={link.id} href={link.href} className="footer-nav-link" style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.70)',
              transition: 'color 0.2s'
            }}>
              {link.label}
            </a>)}
          </div>

          <div className="flex flex-col gap-4 md:gap-5" style={S(colsInView, 160)}>
            <h5 style={{
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: RED,
              marginBottom: '4px'
            }}>
              Services
            </h5>
            {FOOTER_SERVICES.map(link => <a key={link.id} href={link.href} className="footer-nav-link" style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.70)',
              transition: 'color 0.2s'
            }}>
              {link.label}
            </a>)}
          </div>

          <div className="flex flex-col gap-4 md:gap-5" style={S(colsInView, 240)}>
            <h5 style={{
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: RED,
              marginBottom: '4px'
            }}>
              Legal
            </h5>
            {FOOTER_LEGAL.map(link => <a key={link.id} href={link.href} className="footer-nav-link" style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.70)',
              transition: 'color 0.2s'
            }}>
              {link.label}
            </a>)}
            <div style={{
              marginTop: '8px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
              <p style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.40)',
                lineHeight: 1.6
              }}>
                info@empowaworx.co.za<br />
                +27 (0) 11 482 7256
              </p>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.10)',
          paddingTop: '1.75rem',
          paddingBottom: '1.25rem'
        }}>
          <div className="flex flex-col items-center gap-2">
            <p style={{
              fontSize: 'clamp(10px,1.5vw,11px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              textAlign: 'center'
            }}>
              <span>Trusted Advisors.</span>
              <span style={{
                color: RED
              }}> ◆ </span>
              <span>Influential Partners.</span>
              <span style={{
                color: RED
              }}> ◆ </span>
              <span>Impact Architects.</span>
            </p>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.10em',
              color: 'rgba(255,255,255,0.35)',
              textAlign: 'center'
            }}>
              © 2026 EmpowaWorx™. All Rights Reserved. 100% Black-owned Pan-African Advisory Firm.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>;
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const BrandExperiencePage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="be-page" style={{
    background: DARK,
    minHeight: '100vh',
    overflowX: 'clip',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  }}>
    <style dangerouslySetInnerHTML={{
      __html: GLOBAL_STYLES
    }} />

    {/* Film grain overlay */}
    <div aria-hidden="true" style={{
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: 0.04,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px'
    }} />

    <Header />
    {/* <AnchorNav /> */}

    <main>
      {/* 1. Hero */}
      <Hero />
      <TickerStrip />

      {/* 2. Signature Offerings — promoted to first position after hero */}
      <SignatureOfferingsSection />

      {/* 3. Value Proposition + Stats */}
      <ValuePropositionSection />

      {/* Inline CTA #1 */}
      <InlineCTA variant="talk" />

      {/* Stat Bar #1 */}
      <StatCalloutBar stats={STAT_BAR_1} />

      {/* 4. Services — accordion */}
      <ServicesSection />

      {/* Inline CTA #2 */}
      <InlineCTA variant="deck" />

      {/* 5. Pipeline */}
      <PipelineSection />

      {/* 6. Flagship capabilities — 5 consolidated themes, accordion */}
      <FlagshipCapabilitiesSection />

      {/* Stat Bar #2 */}
      <StatCalloutBar stats={STAT_BAR_2} />

      {/* 7. Event Solutions */}
      {/* <EventSolutionsSection /> */}

      {/* 8. Trusted By logo strip */}
      {/* <TrustedBySection /> */}

      {/* Inline CTA #3 */}
      <InlineCTA variant="talk" />

      {/* 9. Flagship practice statement */}
      <FlagshipStatementSection />

      {/* ── TEAM FACULTY ─── */}
      <section className="py-12 md:py-20 lg:py-32 px-4 md:px-8 lg:px-12 w-full overflow-hidden" style={{
        background: '#ffffff',
        display: 'none'
      }}>
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-5 md:gap-8">
            <div className="w-full md:max-w-xl">
              <Eyebrow>EmpowaWorx™ Experiential Marketing, Events &amp; Activations Practice</Eyebrow>
              <h2 className="font-semibold uppercase" style={{
                color: '#1A1A1A',
                fontSize: 'clamp(1.6rem, 4.5vw, 3.75rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.92,
                fontFamily: 'Inter, sans-serif',
                margin: 0
              }}>
                Principal Leadership &amp; Delivery Team
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
                {/* Image */}
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

          <div className="mt-12 md:mt-16 p-6 md:p-10 border-t border-[#1A1A1A]/10" style={{ background: '#F9F9F9' }}>
            <h4 style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#E63329',
              marginBottom: '12px',
              fontFamily: 'Inter, sans-serif'
            }}>
              Collective Value Proposition
            </h4>
            <p style={{
              color: '#555',
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.8,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400
            }}>
              The EmpowaWorx™ Experiential Marketing, Events &amp; Activations Practice brings together a multidisciplinary team of experienced professionals spanning strategy, creative, technology, production, activations, content, talent management and operational delivery. Collectively, the team designs and delivers premium conferences, summits, exhibitions, activations, leadership forums, stakeholder engagements and brand experiences that transform audiences into communities, engagement into influence, and experiences into measurable business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Final full-bleed CTA */}
      <FinalCTASection />
    </main>

    <FooterComponent />
  </div>;
};
