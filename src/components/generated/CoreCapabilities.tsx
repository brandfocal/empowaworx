import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

// --- DATA ---
interface Service {
  id: string;
  category: string;
  featured?: boolean;
  services: string[];
  description: string;
}
const SERVICES_DATA: Service[] = [{
  id: 'svc1',
  category: 'Strategic Marketing, Growth & Commercial Advisory',
  featured: true,
  services: ['Strategic Marketing Advisory', 'Integrated Marketing Strategy', 'Growth Strategy Development', 'Go-to-Market Strategy', 'Demand Generation Strategy', 'Market Expansion Strategy', 'Customer Acquisition Strategy', 'Customer Retention & Loyalty Strategy', 'Product & Service Marketing Strategy', 'Customer Journey Strategy', 'Market Research & Consumer Insights', 'Marketing Transformation Programmes', 'Commercial Growth Strategy', 'Revenue Acceleration Programmes', 'Marketing Operating Model Design'],
  description: 'Helping organisations identify growth opportunities, unlock new markets, strengthen customer acquisition and accelerate revenue performance through intelligence-led marketing and growth strategies.'
}, {
  id: 'svc2',
  category: 'Brand Strategy, Positioning & Market Leadership',
  services: ['Brand Strategy Development', 'Brand Purpose & Vision Development', 'Brand Architecture & Portfolio Strategy', 'Brand Positioning & Differentiation', 'Brand Identity Systems', 'Corporate Brand Development', 'Employer Branding Strategy', 'Executive & Personal Branding', 'Brand Repositioning Programmes', 'Customer Value Proposition Development', 'Brand Equity Development', 'Brand Governance Frameworks', 'Category Leadership Strategy', 'Market Positioning Strategy', 'Brand Growth Programmes'],
  description: 'Defining and distilling brand essence to create powerful market positioning and enduring brand leadership.'
}, {
  id: 'svc3',
  category: 'Creative Strategy, Storytelling & Campaign Innovation',
  services: ['Creative Strategy Development', 'Creative Direction', 'Integrated Campaign Strategy', 'Campaign Concept Development', 'Strategic Narrative Development', 'Brand Storytelling', 'Content Strategy Development', 'Consumer Engagement Campaigns', 'Behaviour Change Campaigns', 'Purpose-Led Campaigns', 'Public Awareness Campaigns', 'Creative Content Production', 'Campaign Innovation Programmes', 'Marketing Communications Campaigns', 'Multi-Channel Campaign Development'],
  description: 'Transforming complex messages into compelling narratives and high-impact creative campaigns.'
}, {
  id: 'svc4',
  category: 'Digital Marketing, AI & Marketing Intelligence',
  services: ['Digital Marketing Strategy', 'AI-Powered Marketing Solutions', 'Marketing Automation Solutions', 'Customer Data Strategy', 'Marketing Analytics & Intelligence', 'Predictive Audience Intelligence', 'Conversion Rate Optimisation (CRO)', 'Lead Generation Systems', 'Marketing Technology Advisory', 'Campaign Attribution & Measurement', 'Performance Dashboards', 'Customer Analytics', 'Audience Intelligence', 'Marketing Intelligence Reporting', 'Marketing ROI Optimisation'],
  description: 'Leveraging data science and artificial intelligence to drive digital performance and marketing ROI.'
}, {
  id: 'svc5',
  category: 'Commercial Growth, Customer Experience & Loyalty',
  services: ['Commercial Growth Strategy', 'Customer Experience Strategy', 'Customer Experience Optimisation', 'Customer Retention Programmes', 'Loyalty & Advocacy Programmes', 'Customer Value Enhancement', 'Sales Enablement Programmes', 'Partner Marketing Programmes', 'Channel Marketing Strategy', 'Market Penetration Strategy', 'Commercialisation Strategy', 'Lead Nurturing Systems', 'Cross-Selling & Upselling Strategies', 'Revenue Optimisation Programmes', 'Growth Acceleration Initiatives'],
  description: 'Optimising every touchpoint of the customer journey to drive retention and commercial growth.'
}, {
  id: 'svc6',
  category: 'Marketing Intelligence, Analytics & Insights',
  services: ['Marketing Intelligence', 'Consumer Intelligence', 'Customer Insights', 'Market Research', 'Competitive Intelligence', 'Audience Sentiment Analysis', 'Brand Health Measurement', 'Campaign Effectiveness Measurement', 'Market Share Analysis', 'Customer Experience Measurement', 'Marketing Analytics', 'Performance Dashboards', 'Impact Measurement & Reporting', 'Strategic Recommendations', 'Continuous Improvement Programmes'],
  description: 'Delivering deep actionable insights through robust measurement and analytical frameworks.'
}];

// --- HELPERS ---

const SectionHeader = () => {
  return <motion.header initial={{
    opacity: 0,
    y: 30
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: "-100px"
  }} transition={{
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1]
  }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[2px] bg-[#FC3637]" />
          <span className="text-[#FC3637] text-[11px] font-bold tracking-[0.2em] uppercase">
            CORE CAPABILITIES
          </span>
        </div>
        <h2 className="text-white font-semibold tracking-[-0.02em] leading-[1.1] text-clamp-h2">
          Integrated Practice Disciplines
        </h2>
      </div>
      
      <div className="md:max-w-[400px]">
        <p className="text-white/50 text-[14px] leading-relaxed md:text-right">
          A comprehensive suite of strategic, creative and performance marketing solutions designed for market leadership.
        </p>
      </div>
    </motion.header>;
};
interface TabProps {
  item: Service;
  isActive: boolean;
  onClick: () => void;
}
const CategoryTab = ({
  item,
  isActive,
  onClick
}: TabProps) => {
  return <button onClick={onClick} className={cn("w-full text-left py-5 px-6 flex flex-col gap-2 transition-all duration-300 border-b border-white/5 relative group cursor-pointer overflow-hidden", isActive ? "bg-[#FC3637]/[0.06] border-l-[3px] border-l-[#FC3637] pl-[26px]" : "hover:bg-white/[0.025] border-l-[3px] border-l-transparent")}>
      <div className="flex items-center justify-between w-full">
        <span className={cn("text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200", isActive ? "text-white" : "text-white/45 group-hover:text-white/80")}>
          {item.category}
        </span>
        <div className="flex items-center gap-3">
          <span className="bg-[#FC3637]/[0.12] text-[#FC3637] text-[10px] font-bold px-2 py-0.5 rounded-full">
            {item.services.length.toString().padStart(2, '0')}
          </span>
          <ChevronRight className={cn("w-4 h-4 transition-transform duration-300", isActive ? "text-[#FC3637] rotate-90" : "text-white/20 group-hover:translate-x-1")} />
        </div>
      </div>
      
      <AnimatePresence>
        {isActive && item.featured && <motion.p initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} className="text-white/40 text-[12px] italic leading-snug pr-8">
            {item.description}
          </motion.p>}
      </AnimatePresence>
    </button>;
};
const ServiceItem = ({
  name
}: {
  name: string;
}) => {
  return <div className="flex items-center gap-3 py-3 border-b border-white/5 group">
      <motion.div whileHover={{
      scale: 1.5
    }} className="w-1 h-1 rounded-full bg-[#FC3637] flex-shrink-0" />
      <span className="text-[14px] text-white/80 leading-relaxed transition-colors duration-200 group-hover:text-white">
        {name}
      </span>
    </div>;
};

// --- MAIN COMPONENT ---

export const CoreCapabilities = () => {
  const [activeId, setActiveId] = React.useState(SERVICES_DATA[0].id);
  const activeService = SERVICES_DATA.find(s => s.id === activeId) || SERVICES_DATA[0];
  const activeIndex = SERVICES_DATA.findIndex(s => s.id === activeId);
  return <section className="w-full bg-[#111111] overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-clamp-x py-clamp-y">
        <SectionHeader />
        
        <div className="flex flex-col lg:flex-row gap-0 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
          
          {/* LEFT PANEL: Tabs */}
          <div className="lg:w-1/2 bg-[#0D0D0D] border-b lg:border-b-0 lg:border-r border-white/5">
            {/* Mobile Header Scroll */}
            <div className="lg:hidden overflow-x-auto no-scrollbar flex border-b border-white/5 bg-[#0D0D0D] sticky top-0 z-10">
              {SERVICES_DATA.map(item => <button key={item.id} onClick={() => setActiveId(item.id)} className={cn("flex-shrink-0 px-6 py-4 text-[11px] font-bold uppercase tracking-widest transition-all", activeId === item.id ? "text-[#FC3637] border-b-2 border-[#FC3637] bg-[#FC3637]/5" : "text-white/40 hover:text-white/70")}>
                  {item.id.replace('svc', '0')}
                </button>)}
            </div>
            
            {/* Desktop Tab List */}
            <div className="hidden lg:block divide-y divide-white/5">
              {SERVICES_DATA.map(item => <CategoryTab key={item.id} item={item} isActive={activeId === item.id} onClick={() => setActiveId(item.id)} />)}
            </div>
          </div>
          
          {/* RIGHT PANEL: Content */}
          <div className="lg:w-1/2 bg-[#111111] p-8 md:p-12 min-h-[500px] flex flex-col">
            <div className="flex items-center gap-4 pb-6 border-b border-white/10 mb-8">
              <span className="text-[#FC3637] font-mono text-[18px] font-bold">
                {(activeIndex + 1).toString().padStart(2, '0')} / {SERVICES_DATA.length.toString().padStart(2, '0')}
              </span>
              <h3 className="text-white text-[18px] font-bold leading-tight">
                {activeService.category}
              </h3>
            </div>
            
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div key={activeId} initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} exit={{
                opacity: 0,
                x: -20
              }} transition={{
                duration: 0.35,
                ease: "easeOut"
              }} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                  {activeService.services.map((svc, i) => <ServiceItem key={`${activeId}-${i}`} name={svc} />)}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <AnimatePresence>
              {activeService.featured && <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="mt-12 pt-8 border-t border-white/[0.06]">
                  <p className="text-white/35 text-[14px] italic leading-relaxed">
                    {activeService.description}
                  </p>
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <style>{`
        .text-clamp-h2 {
          font-size: clamp(2rem, 5vw, 3.5rem);
        }
        .px-clamp-x {
          padding-left: clamp(20px, 6vw, 96px);
          padding-right: clamp(20px, 6vw, 96px);
        }
        .py-clamp-y {
          padding-top: clamp(48px, 8vw, 108px);
          padding-bottom: clamp(48px, 8vw, 108px);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>;
};
