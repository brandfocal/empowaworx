import React, { useState, useEffect } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Lock, AlertCircle, User, Building2, Briefcase, CheckCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { submitToGravityForm } from '../../services/gravityForms';

type TabType = 'general' | 'client' | 'partnership';
interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  isTextArea?: boolean;
  options?: string[];
  error?: string;
  value: string;
  animIndex?: number;
  colSpan?: 'full' | 'half';
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}
interface SectionDividerProps {
  label: string;
  animIndex?: number;
}

// --- Static Data ---

const OFFICES = [{
  city: 'JOHANNESBURG',
  region: 'South Africa HQ',
  address: '1 Discovery Place, Sandton, 2196'
}, {
  city: 'CAPE TOWN',
  region: 'South Africa',
  address: '1 Silo, V&A Waterfront, 8001'
}, {
  city: 'NAIROBI',
  region: 'East Africa',
  address: 'Westlands Business Park, Nairobi'
}, {
  city: 'LAGOS',
  region: 'West Africa',
  address: 'Victoria Island, Lagos'
}];
const TABS = [{
  id: 'general',
  label: 'General',
  fullLabel: 'General Enquiry'
}, {
  id: 'client',
  label: 'Client',
  fullLabel: 'Client Enquiry'
}, {
  id: 'partnership',
  label: 'Partnership',
  fullLabel: 'Partnership Enquiry'
}];
const TAB_META: Record<TabType, {
  title: string;
  desc: string;
  responseNote: string;
}> = {
  general: {
    title: 'General Enquiry',
    desc: "For questions, media, press, or anything else — drop us a line and we'll point you in the right direction.",
    responseNote: 'We typically respond within 1–2 business days.'
  },
  client: {
    title: 'Client Enquiry',
    desc: 'Ready to brief us on a project or campaign? Share your goals, budget, and timeline and our team will be in touch.',
    responseNote: 'Our client team responds within 1 business day.'
  },
  partnership: {
    title: 'Partnership Enquiry',
    desc: 'Explore strategic alliances, joint ventures, media partnerships, and more. Tell us about your organisation and ambitions.',
    responseNote: 'Our Partnerships team reviews submissions within 3–5 business days.'
  }
};
const PARTNERSHIP_STEPS = [{
  num: 1,
  label: 'Contact',
  desc: 'Your personal details'
}, {
  num: 2,
  label: 'Organisation',
  desc: 'About your company'
}, {
  num: 3,
  label: 'Project',
  desc: 'Partnership goals'
}];
const GENERAL_STEPS = [{
  num: 1,
  label: 'Contact',
  desc: 'Your details'
}, {
  num: 2,
  label: 'Enquiry',
  desc: 'Enquiry details'
}];
const CLIENT_STEPS = [{
  num: 1,
  label: 'Contact',
  desc: 'Your details'
}, {
  num: 2,
  label: 'Organisation',
  desc: 'About your company'
}, {
  num: 3,
  label: 'Project',
  desc: 'Project brief'
}];
const SUBJECT_OPTIONS = ['General Enquiry', 'Media / Press', 'Speaking Opportunity', 'Partnerships', 'Other'];

// --- Hooks ---

const useScrollDirection = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrollY;
};

const useScrollProgress = () => {
  const {
    scrollYProgress
  } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return scaleX;
};
const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

// --- Framer Motion Variants ---

const fieldVariants = {
  hidden: {
    opacity: 0,
    y: 14
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      delay: i * 0.06,
      ease: 'easeOut'
    }
  })
};
const shakeVariants = {
  shake: {
    x: [0, -6, 6, -6, 6, 0],
    transition: {
      duration: 0.4
    }
  },
  idle: {
    x: 0
  }
};
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.28,
      ease: 'easeIn'
    }
  }
};
const stepVariants = {
  hidden: {
    opacity: 0,
    x: 24
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: {
      duration: 0.28,
      ease: 'easeIn'
    }
  }
};
const successVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 24
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -16,
    transition: {
      duration: 0.28
    }
  }
};

// --- Africa Watermark SVG ---

const AfricaWatermark = ({
  className
}: {
  className?: string;
}) => <svg viewBox="0 0 500 550" className={cn('pointer-events-none', className)} fill="currentColor" aria-hidden="true">
    <path d="M260.6,1.4c-6.1,1.4-14.7,6.8-19.1,11.9c-4.4,5.1-7.8,11.4-9.3,16.8c-1.3,4.4-1.3,16.3-0.1,20.8c1.3,4.9,4.4,11.2,6.9,14.3 c2.6,3.1,4.4,5.8,4.1,6.1c-0.2,0.3-4.8-1.5-10.1-4c-12-5.7-22.1-8.2-34.9-8.7c-17.7-0.7-33.4,2.9-45.7,10.6 c-9.9,6.2-18.7,14.7-25.1,24.4c-2.4,3.7-4.4,7.4-4.5,8.2c-0.1,0.8-1.3,2.7-2.6,4.3c-1.7,2.1-3.6,5.6-5.8,10.7 c-2,4.8-2.6,5.6-5.4,7.1c-1.7,0.9-4.7,1.8-6.6,1.9c-3.1,0.2-16.7,2.8-22,4.2c-15.6,4.3-29.3,10.3-40,17.4c-3.9,2.6-7.5,5.1-7.9,5.5 c-0.4,0.4-3,1-5.7,1.3c-2.8,0.3-6.6,1.3-8.6,2.3c-4,2-11.8,9.4-14.7,14c-1.3,2.1-3,4.4-3.7,5.1c-1.4,1.4-13.8,25.2-13.8,26.5 c0,0.5,2.4,3.2,5.4,6c7.7,7.1,10.6,10.2,14.2,14.9c4,5.3,4.4,5.6,9.1,7.1c2.8,0.9,7,2,9.3,2.6c2.3,0.6,4.2,1.3,4.2,1.6 c0,0.3-4.1,6.1-9,12.8c-15,20.4-25.3,37.5-30.8,51.3c-2,5-2.2,6.2-2.3,15.5c-0.1,10.7,0.2,12.6,2.5,17.4c5.1,11,11,18.4,18.5,23.3 c4.8,3.1,9.4,5.2,16,7.5c7.7,2.7,11.2,4.4,21.7,11.1c11.2,7.2,18.9,13.9,28.8,25.2c10.4,11.8,19,20,30,28.8 c14.2,11.3,26.1,19.2,36.4,24.3c3.8,1.9,7.5,3.6,8.2,3.8c2.1,0.6,21.2,15.9,23.1,18.5c1,1.5,4.7,4.8,8.2,7.4 c13.4,9.8,23.4,24,34.4,49c3.3,7.5,4,8.6,6.3,9.1c1.3,0.3,3.7,1.1,5.2,1.8c3.2,1.5,4.2,1.7,10.8,2.7c15.7,2.2,26.5,10.8,32.7,25.9 c2.3,5.6,2.5,6.5,2.7,13.5c0.2,6.4,0.1,8.1-0.9,12c-1.8,7.6-1.8,13,0.1,21.3c2.7,11.6,4,15.3,6,17.1c3.2,2.8,7,3.1,13.6,1.2 c4.7-1.3,16.9-6.3,25.4-10.4c16.1-7.7,26.4-15.8,32.1-25.2c2.7-4.5,7.9-14.1,10-18.4c2.8-5.8,4.1-7.8,7.3-11.6 c6.6-7.8,13.6-14,20-17.7c4.6-2.6,9.1-3.9,13.7-3.9c10.4,0,19.3,5.9,23.3,15.5c2.4,5.7,2.4,16.5,0.1,22.2 c-1.6,4.1-4.9,9.4-7.5,12.3c-2,2.1-2.2,2.6-1,2.8c0.8,0.2,3.1,1.1,5.3,2c7.6,3.1,14.6,7.5,19.4,12.3c2.7,2.7,3.3,2.9,7.4,2.7 c3.5-0.1,5.3-0.5,7.4-1.6c4.6-2.5,13.5-12.8,15.4-17.8c0.8-2.1,1.5-5.5,1.6-7.6c0.1-5,3-11.8,5.4-12.8c1-0.4,1.8-1,1.8-1.4 c0-0.4,3.1-4.7,6.9-9.5c10.1-12.8,21.6-23.7,32-30.1c3.8-2.3,11.2-5.7,16.4-7.4c5.1-1.7,10-3.6,10.8-4.3c1.5-1.1,4.1-8.3,5.1-13.8 c0.9-4.8,1.4-6.3,2.6-8c1.7-2.3,2.1-11.5,0.7-16c-1.3-4.5-5.1-12.2-8-16c-3-3.8-5.7-11.1-7.6-19.8c-2.3-10.6-2.6-13.7-2.3-28 c0.2-12,0.6-15.6,2.2-18.9c1-2.1,1.9-4.8,2.1-6c0.3-1.6,1.4-2.2,7-4c12-3.8,21-12.1,28.8-26.6c4.3-8,9.7-15.5,13.8-19.1 c2.2-2,6.1-4.6,8.6-5.8c6.6-3.1,10.8-7.1,12.6-12c3.4-9.2,2.3-19.1-3.6-30.1c-1.4-2.6-1.5-3.1-0.9-4.8c0.8-2,0.8-5.7,0-7.7 c-0.6-1.5-0.6-3,0.1-4.6c0.6-1.3,0.8-3.4,0.5-4.6c-0.3-1.3-1-3.6-1.6-5.2c-0.6-1.6-1-3.6-1-4.5c0-0.8-0.8-3.3-1.8-5.5 c-1.5-3.3-1.8-4.7-1.8-9.2c0-3.7,0.3-6.2,0.9-7.9c1.6-4.5,0.5-8.8-3.6-13.4c-1.7-1.8-3.3-4.2-3.6-5.4c-1-3.1,1-10.8,4.7-18.1 c3.6-6.9,5.2-11.7,5.7-17c0.8-9,0.1-12.4-3.7-18.4c-4.4-6.8-5.3-9.5-5.3-16.1c0-4.6,0.3-6.7,1.4-9c2-4.5,2.3-7,1.4-11.5 c-0.8-3.8-1.5-5.1-3.5-6.7c-1.3-1-4-2.1-6-2.5c-4.3-0.8-5.8-2.4-5.8-5.7c0-2.3-1.2-5.4-3.1-8.1c-1.7-2.3-4.1-5-5.3-6 c-3.3-2.6-5.1-7.1-5.1-12.6c0-6-2-12.1-5.6-17.1c-4.3-5.9-4.7-6.8-4.9-13.8c-0.2-11.1-2.1-16.1-10-25.9 c-9.9-12.2-22.5-23.9-32.9-30.3c-6.8-4.2-12.6-10.4-14.8-15.6c-1.6-3.7-2-14.9-0.8-22.4c1-5.7,0.8-7.8-0.5-10.5 c-1-2.1-2.8-5.3-3.8-7.1c-1.8-3-2-4.4-1.6-8.2c0.3-2.6,0.2-5.8-0.3-7.2c-1-2.6-8.7-13.3-13.3-18.4c-7.2-7.8-13.4-12.5-24-17.9 c-11.8-6-21.7-10-27.1-11.1c-3.1-0.7-6.4-1.6-7.3-2.1c-1.1-0.6-5.3-1.1-11.6-1.5C313.7,2,271.8-1.1,260.6,1.4z" />
  </svg>;

// --- Section Divider ---

const SectionDivider = ({
  label,
  animIndex = 0
}: SectionDividerProps) => <motion.div className="col-span-1 md:col-span-2 flex items-center gap-4 pt-4 pb-2" custom={animIndex} variants={fieldVariants} initial="hidden" animate="visible">
    <span className="text-[11px] font-black uppercase tracking-widest text-[#AAAAAA] whitespace-nowrap flex-shrink-0">
      {label}
    </span>
    <hr className="flex-1 border-0 border-t border-[#E8E8E8]" />
  </motion.div>;

// --- Enhanced FormField ---

const FormField = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  required = false,
  isTextArea = false,
  options = [],
  error,
  value,
  animIndex = 0,
  colSpan = 'half',
  onChange
}: FormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  // On mobile every field is full width; on md+ respect colSpan
  const wrapperClass = cn('flex flex-col w-full', colSpan === 'full' ? 'col-span-1 md:col-span-2' : 'col-span-1');
  // Enhanced visibility: font-normal, higher contrast border (#A3A099), darker placeholder (#666666)
  const inputBase = cn(
    'w-full bg-white border rounded-[2px] px-4 h-12 text-base md:text-[15px] font-normal text-[#111111] focus:outline-none',
    'transition-all duration-200 ease-in-out',
    'placeholder:text-[#666666]',
    error ? 'border-[#CC0000]' : isFocused ? 'border-[#FC3637]' : 'border-[#A3A099] hover:border-[#444444]'
  );
  const inputStyle: React.CSSProperties = error ? {
    boxShadow: '0 0 0 3px rgba(204,0,0,0.16)'
  } : isFocused ? {
    boxShadow: '0 0 0 3px rgba(252,54,55,0.16)'
  } : {
    boxShadow: 'none'
  };
  const selectColor: React.CSSProperties = {
    color: value ? '#111111' : '#666666'
  };
  return <motion.div className={wrapperClass} custom={animIndex} variants={fieldVariants} initial="hidden" animate="visible">
    <div className="w-5 h-[1px] mb-2" style={{
      background: 'rgba(252,54,55,0.65)'
    }} />
    <label htmlFor={id} className={cn('uppercase text-[11px] font-bold tracking-[0.15em] mb-2.5 transition-colors duration-200 ease-in-out leading-snug', isFocused || error ? 'text-[#FC3637]' : 'text-[#333333]')}>
      <span>{label}</span>
      {required && <span className="ml-1 text-[#FC3637]">*</span>}
    </label>

    {isTextArea ? <textarea id={id} name={id} placeholder={placeholder} required={required} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className={cn('w-full bg-white border rounded-[2px] px-4 py-3.5 text-base md:text-[15px] font-normal text-[#111111] focus:outline-none', 'transition-all duration-200 ease-in-out placeholder:text-[#666666] min-h-[140px] resize-none', error ? 'border-[#CC0000]' : isFocused ? 'border-[#FC3637]' : 'border-[#A3A099] hover:border-[#444444]')} style={{
      ...inputStyle,
      scrollbarColor: '#E0E0E0 #FFFFFF'
    }} /> : options.length > 0 ? <div className="relative">
      <select id={id} name={id} required={required} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className={cn(inputBase, 'appearance-none cursor-pointer pr-10')} style={{
        ...inputStyle,
        ...selectColor
      }}>
        <option value="" disabled style={{
          color: '#666666'
        }}>
          {placeholder || 'Select an option'}
        </option>
        {options.map(opt => <option key={opt} value={opt} style={{
          color: '#111111',
          background: '#FFFFFF'
        }}>
          {opt}
        </option>)}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[#FC3637]" />
    </div> : <input type={type} id={id} name={id} placeholder={placeholder} required={required} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className={inputBase} style={inputStyle} />}

    {error && <motion.div initial={{
      opacity: 0,
      y: -4
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex items-center gap-2 mt-2 mb-1 bg-red-50 border-l-2 border-red-500 pl-2.5 py-1.5 rounded-r-[2px]">
      <AlertCircle className="w-4 h-4 text-[#CC0000] flex-shrink-0" />
      <span className="text-[#CC0000] text-[12px] font-semibold uppercase tracking-[0.08em]">{error}</span>
    </motion.div>}
  </motion.div>;
};

// --- Office Card ---

const OfficeCard = ({
  city,
  address,
  region,
  index
}: {
  city: string;
  address: string;
  region: string;
  index: number;
}) => <motion.div initial={{
  opacity: 0,
  y: 30
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} transition={{
  delay: index * 0.1,
  duration: 0.5
}} whileHover={{
  scale: 1.02
}} className="group bg-[#1A1A1A] border-t-[3px] border-[#FC3637] p-6 md:p-8 transition-all duration-300" style={{
  willChange: 'transform'
}}>
    <div className="mb-5 md:mb-6">
      <MapPin className="w-5 h-5 text-[#FC3637]" />
    </div>
    <h4 className="text-white font-semibold text-xl md:text-2xl tracking-tighter mb-2 uppercase">{city}</h4>
    <p className="text-[#FC3637] text-[11px] uppercase tracking-[0.2em] font-black mb-3 md:mb-4">{region}</p>
    <p className="text-[#888888] text-sm leading-relaxed max-w-[200px]">{address}</p>
  </motion.div>;

// --- Success Panel ---

const SuccessPanel = ({
  tab,
  onReset
}: {
  tab: TabType;
  onReset: () => void;
}) => {
  const messages: Record<TabType, {
    heading: string;
    body: string;
  }> = {
    general: {
      heading: 'Message Sent!',
      body: "Thank you for reaching out. We've received your message and will get back to you within 1–2 business days."
    },
    client: {
      heading: 'Enquiry Received!',
      body: 'Thank you for your interest in working with us. Our client team will review your brief and be in touch within 1 business day.'
    },
    partnership: {
      heading: 'Partnership Submitted!',
      body: "Thank you for exploring a partnership with EmpowaWorx™. Our partnerships team will review your submission within 3–5 business days."
    }
  };
  const {
    heading,
    body
  } = messages[tab];
  return <motion.div key="success" variants={successVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center text-center py-12 md:py-20 px-4 md:px-8">
    <motion.div initial={{
      scale: 0,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} transition={{
      delay: 0.2,
      type: 'spring',
      stiffness: 200,
      damping: 18
    }} className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FC3637]/10 flex items-center justify-center mb-6 md:mb-8">
      <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-[#FC3637]" />
    </motion.div>

    <motion.h3 initial={{
      opacity: 0,
      y: 12
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.35,
      duration: 0.4
    }} className="text-[#111111] font-semibold text-3xl md:text-[clamp(1.8rem,4vw,2.8rem)] tracking-tighter mb-4">
      {heading}
    </motion.h3>

    <motion.p initial={{
      opacity: 0,
      y: 12
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.45,
      duration: 0.4
    }} className="text-[#555555] text-[15px] leading-relaxed max-w-md mb-10 md:mb-12 px-2">
      {body}
    </motion.p>

    <motion.button initial={{
      opacity: 0,
      y: 12
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.55,
      duration: 0.4
    }} onClick={onReset} whileHover={{
      backgroundColor: '#111111'
    }} whileTap={{
      scale: 0.97
    }} className="group flex items-center gap-3 bg-[#1E1E1E] text-white font-bold text-[12px] tracking-[0.2em] px-6 md:px-8 py-4 rounded-[2px] uppercase transition-all duration-200 min-h-[44px]">
      <RotateCcw className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-90" />
      <span>Send Another Message</span>
    </motion.button>
  </motion.div>;
};

// --- Main Page Component ---

export const ContactUsPage = () => {
  usePageMeta({
    title: "Contact Us - Partner with EmpowaWorx",
    description: "Get in touch with our team for general enquiries, client briefs, and strategic partnerships. Let's collaborate for socio-economic impact across Africa."
  });
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [generalStep, setGeneralStep] = useState(1);
  const [clientStep, setClientStep] = useState(1);
  const [shakeForm, setShakeForm] = useState(false);
  const [submittedTab, setSubmittedTab] = useState<TabType | null>(null);
  const [partnerStep, setPartnerStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollProgress = useScrollProgress();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const windowWidth = useWindowWidth();
  const scrollY = useScrollDirection();
  const [generalForm, setGeneralForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    referral: ''
  });
  const [clientForm, setClientForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    service: '',
    description: '',
    budget: '',
    timeline: '',
    referral: ''
  });
  const [partnershipForm, setPartnershipForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    country: '',
    industry: '',
    type: '',
    objectives: '',
    valueAdd: '',
    website: '',
    linkedin: '',
    nextStep: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, tab: TabType) => {
    const {
      name,
      value
    } = e.target;
    if (tab === 'general') setGeneralForm(prev => ({
      ...prev,
      [name]: value
    })); else if (tab === 'client') setClientForm(prev => ({
      ...prev,
      [name]: value
    })); else if (tab === 'partnership') setPartnershipForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      const newErrors = {
        ...errors
      };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };
  const validateGeneralStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!generalForm.firstName) newErrors.firstName = 'First name is required';
      if (!generalForm.lastName) newErrors.lastName = 'Last name is required';
      if (!generalForm.email) newErrors.email = 'Email is required';
    } else if (step === 2) {
      if (!generalForm.subject) newErrors.subject = 'Subject is required';
      if (!generalForm.message) newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateClientStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!clientForm.firstName) newErrors.firstName = 'First name is required';
      if (!clientForm.lastName) newErrors.lastName = 'Last name is required';
      if (!clientForm.email) newErrors.email = 'Email is required';
    } else if (step === 2) {
      if (!clientForm.company) newErrors.company = 'Organisation is required';
      if (!clientForm.jobTitle) newErrors.jobTitle = 'Job title is required';
    } else if (step === 3) {
      if (!clientForm.service) newErrors.service = 'Service area is required';
      if (!clientForm.description) newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validatePartnershipStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!partnershipForm.firstName) newErrors.firstName = 'First name is required';
      if (!partnershipForm.lastName) newErrors.lastName = 'Last name is required';
      if (!partnershipForm.email) newErrors.email = 'Email is required';
    } else if (step === 2) {
      if (!partnershipForm.company) newErrors.company = 'Organisation is required';
      if (!partnershipForm.jobTitle) newErrors.jobTitle = 'Job title is required';
    } else if (step === 3) {
      if (!partnershipForm.type) newErrors.type = 'Partnership type is required';
      if (!partnershipForm.objectives) newErrors.objectives = 'Objectives are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleGeneralNext = () => {
    if (validateGeneralStep(generalStep)) {
      setErrors({});
      setGeneralStep(s => Math.min(s + 1, 2));
    } else {
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 450);
    }
  };
  const handleGeneralBack = () => {
    setErrors({});
    setGeneralStep(s => Math.max(s - 1, 1));
  };
  const handleClientNext = () => {
    if (validateClientStep(clientStep)) {
      setErrors({});
      setClientStep(s => Math.min(s + 1, 3));
    } else {
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 450);
    }
  };
  const handleClientBack = () => {
    setErrors({});
    setClientStep(s => Math.max(s - 1, 1));
  };
  const handlePartnershipNext = () => {
    if (validatePartnershipStep(partnerStep)) {
      setErrors({});
      setPartnerStep(s => Math.min(s + 1, 3));
    } else {
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 450);
    }
  };
  const handlePartnershipBack = () => {
    setErrors({});
    setPartnerStep(s => Math.max(s - 1, 1));
  };
  const handleSubmit = async (e: React.FormEvent, tab: TabType) => {
    e.preventDefault();
    let valid = false;
    if (tab === 'general') {
      if (!validateGeneralStep(2)) {
        setShakeForm(true);
        setTimeout(() => setShakeForm(false), 450);
        return;
      }
      valid = true;
    } else if (tab === 'client') {
      if (!validateClientStep(3)) {
        setShakeForm(true);
        setTimeout(() => setShakeForm(false), 450);
        return;
      }
      valid = true;
    } else if (tab === 'partnership') {
      if (!validatePartnershipStep(3)) {
        setShakeForm(true);
        setTimeout(() => setShakeForm(false), 450);
        return;
      }
      valid = true;
    }
    if (valid) {
      setIsSubmitting(true);
      let res;
      if (tab === 'general') {
        const payload = {
          "input_1.3": generalForm.firstName,
          "input_1.6": generalForm.lastName,
          "input_2": generalForm.email,
          "input_4": generalForm.phone,
          "input_5": generalForm.company,
          "input_6": generalForm.subject,
          "input_7": generalForm.referral,
          "input_3": generalForm.message
        };
        res = await submitToGravityForm('general', payload);
      } else if (tab === 'client') {
        const payload = {
          "input_1.3": clientForm.firstName,
          "input_1.6": clientForm.lastName,
          "input_3": clientForm.email,
          "input_4": clientForm.phone,
          "input_6": clientForm.company,
          "input_7": clientForm.jobTitle,
          "input_8": clientForm.service,
          "input_9": clientForm.budget,
          "input_10": clientForm.timeline,
          "input_11": clientForm.description
        };
        res = await submitToGravityForm('client', payload);
      } else if (tab === 'partnership') {
        const payload = {
          "input_1.3": partnershipForm.firstName,
          "input_1.6": partnershipForm.lastName,
          "input_3": partnershipForm.email,
          "input_4": partnershipForm.phone,
          "input_5": partnershipForm.company,
          "input_6": partnershipForm.jobTitle,
          "input_7": partnershipForm.country,
          "input_8": partnershipForm.industry,
          "input_9": partnershipForm.website,
          "input_10": partnershipForm.linkedin,
          "input_11": partnershipForm.type,
          "input_12": partnershipForm.nextStep,
          "input_13": partnershipForm.objectives,
          "input_14": partnershipForm.valueAdd
        };
        res = await submitToGravityForm('partnership', payload);
      }
      setIsSubmitting(false);
      if (res.isSuccess) {
        setSubmittedTab(tab);
      } else {
        setErrors({ submitError: res.message || "Failed to submit. Please try again." });
        setShakeForm(true);
        setTimeout(() => setShakeForm(false), 450);
      }
    } else {
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 450);
    }
  };
  const handleReset = () => {
    setSubmittedTab(null);
    setErrors({});
    if (activeTab === 'general') {
      setGeneralForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        referral: ''
      });
      setGeneralStep(1);
    } else if (activeTab === 'client') {
      setClientForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        service: '',
        description: '',
        budget: '',
        timeline: '',
        referral: ''
      });
      setClientStep(1);
    } else {
      setPartnershipForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        country: '',
        industry: '',
        type: '',
        objectives: '',
        valueAdd: '',
        website: '',
        linkedin: '',
        nextStep: ''
      });
      setPartnerStep(1);
    }
  };
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSubmittedTab(null);
    setErrors({});
    setGeneralStep(1);
    setClientStep(1);
    setPartnerStep(1);
  };
  const currentTabMeta = TAB_META[activeTab];
  const isSuccess = submittedTab === activeTab;

  // --- Submit Button (full-width on mobile, auto on md+) ---
  const SubmitButton = ({
    label
  }: {
    label: string;
  }) => <div className="col-span-1 md:col-span-2 mt-6 md:mt-8">
      <motion.button type="submit" disabled={isSubmitting} variants={shakeVariants} animate={shakeForm ? 'shake' : 'idle'} whileHover={{
        backgroundColor: isSubmitting ? '#FC3637' : '#C02020',
        boxShadow: '0 8px 28px rgba(204,0,0,0.28)'
      }} whileTap={{
        scale: isSubmitting ? 1 : 0.98
      }} className="group flex items-center justify-center gap-3 bg-[#FC3637] text-white font-bold text-[13px] tracking-[0.18em] w-full h-14 rounded-[2px] uppercase transition-all duration-200 ease-in-out disabled:opacity-75 disabled:cursor-not-allowed" style={{
        boxShadow: '0 4px 16px rgba(252,54,55,0.20)'
      }}>
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
            <span className="flex items-center gap-1">
              Submitting
              <span className="loading-dot ml-1" />
              <span className="loading-dot" />
              <span className="loading-dot" />
            </span>
          </>
        ) : (
          <span>{label}</span>
        )}
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
      </motion.button>
      {errors.submitError && (
        <div className="flex items-center gap-2 mt-3 text-red-500 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0 animate-bounce" />
          <span>{errors.submitError}</span>
        </div>
      )}
      <div className="flex items-center gap-2 mt-3.5">
        <Lock className="w-3 h-3 text-[#AAAAAA] flex-shrink-0" />
        <p className="text-[#AAAAAA] text-[11px] tracking-wide">Your information is never shared with third parties.</p>
      </div>
    </div>;
  return <div className="relative w-full min-h-screen bg-white overflow-x-hidden font-sans text-[#1E1E1E] selection:bg-[#FC3637] selection:text-white">
    <Header />

    <main>
      {/* ─── Section 1: Hero ─── */}
      <section className="relative min-h-[600px] md:h-screen md:min-h-[700px] w-full bg-[#111111] flex flex-col justify-end px-4 sm:px-8 md:px-16 pb-12 md:pb-[clamp(48px,8vw,80px)] overflow-hidden">
        {/* Full-bleed parallax background image */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          inset: '-20%',
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          <img src="/DSC_3092.JPG" alt="EmpowaWorx Workspace" style={{
            width: '100%',
            height: '140%',
            objectFit: 'cover',
            objectPosition: 'center bottom',
            display: 'block',
            filter: 'grayscale(1) brightness(0.45)',
            transform: `translateY(${scrollY * 0.4}px)`,
            willChange: 'transform'
          }} />
        </div>
        {/* Dark gradient overlays */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,8,8,0.55) 0%, rgba(10,8,8,0.30) 40%, rgba(10,8,8,0.78) 100%)',
          pointerEvents: 'none'
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.18) 0%, transparent 52%)',
          pointerEvents: 'none'
        }} />

        <div className="relative z-10 max-w-[1200px] w-full pt-16 md:pt-0">
          <h1 className="text-[clamp(44px,7.5vw,110px)] font-semibold text-white leading-[0.95] tracking-[-0.06em] mb-6 md:mb-10">
            <motion.span initial={{
              opacity: 0,
              y: 40
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7,
              delay: 0.2
            }} className="block">
              Let's start a
            </motion.span>
            <motion.span initial={{
              opacity: 0,
              y: 40
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7,
              delay: 0.32
            }} className="block">
              conversation
            </motion.span>
            <motion.span initial={{
              opacity: 0,
              y: 40
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7,
              delay: 0.44
            }} className="block text-[#FC3637]">
              with us.
            </motion.span>
          </h1>

          <motion.button initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.9
          }} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-4 bg-[#FC3637] text-white font-black text-[13px] tracking-widest px-8 md:px-10 py-4 md:py-5 rounded-sm hover:bg-[#e02d2d] transition-all duration-300 uppercase shadow-2xl shadow-[#FC3637]/30 min-h-[52px]">
            <span>Explore Partnerships</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </motion.button>
        </div>

        <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 1.2
        }} className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2" aria-hidden="true">
          <motion.div animate={{
            scaleY: [1, 1.6, 1],
            opacity: [0.4, 1, 0.4]
          }} transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut'
          }} className="w-[1px] h-12 bg-white origin-top" />
        </motion.div>
      </section>

      {/* ─── Section 2: Contact Info Strip ─── */}
      <section className="py-12 md:py-20 px-4 sm:px-8 md:px-16" style={{
        background: '#0D0D0D',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <span className="text-[#FC3637] text-[10px] font-black tracking-[0.3em] uppercase block mb-4">REACH OUT</span>
            <h2 className="text-white font-semibold text-3xl md:text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] tracking-tighter">
              Get in touch
            </h2>
            <p className="text-[#666666] font-light text-[15px] mt-4 max-w-md mx-auto leading-relaxed">
              We'd love to hear from you. Reach out through any of the channels below.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x" style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.06)'
          }}>
            {/* HQ */}
            <motion.div initial={{
              opacity: 0,
              y: 24
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0
            }} whileHover={{
              backgroundColor: '#111111'
            }} className="flex-1 flex items-start gap-5 md:gap-6 p-6 md:p-10 transition-colors duration-200 cursor-default">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{
                border: '1px solid #FC3637'
              }}>
                <MapPin className="w-5 h-5 text-[#FC3637]" />
              </div>
              <div>
                <div className="w-6 h-[1px] bg-[#FC3637] mb-3" />
                <p className="text-white font-semibold text-[11px] tracking-[0.15em] uppercase mb-2">Headquarters</p>
                <p className="text-[#888888] font-light text-[15px] leading-snug">364 Pine Avenue,<br />Ferndale, Randburg, 2196</p>
              </div>
            </motion.div>
            {/* Email */}
            <motion.div initial={{
              opacity: 0,
              y: 24
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.12
            }} whileHover={{
              backgroundColor: '#111111'
            }} className="flex-1 flex items-start gap-5 md:gap-6 p-6 md:p-10 transition-colors duration-200 cursor-default">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{
                border: '1px solid #FC3637'
              }}>
                <Mail className="w-5 h-5 text-[#FC3637]" />
              </div>
              <div>
                <div className="w-6 h-[1px] bg-[#FC3637] mb-3" />
                <p className="text-white font-semibold text-[11px] tracking-[0.15em] uppercase mb-2">Email Us</p>
                <p className="text-[#888888] font-light text-[15px] break-all">
                  info@empowaworx.co.za<br />
                  talent@empowaworx.co.za
                </p>
              </div>
            </motion.div>
            {/* Phone */}
            <motion.div initial={{
              opacity: 0,
              y: 24
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.24
            }} whileHover={{
              backgroundColor: '#111111'
            }} className="flex-1 flex items-start gap-5 md:gap-6 p-6 md:p-10 transition-colors duration-200 cursor-default">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{
                border: '1px solid #FC3637'
              }}>
                <Phone className="w-5 h-5 text-[#FC3637]" />
              </div>
              <div>
                <div className="w-6 h-[1px] bg-[#FC3637] mb-3" />
                <p className="text-white font-semibold text-[11px] tracking-[0.15em] uppercase mb-2">Call Us</p>
                <p className="text-[#888888] font-light text-[15px]">+27 (0) 11 482 7210</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Forms Section ─── */}
      <section id="contact-form-section" className="relative w-full py-12 md:py-24 lg:py-36" style={{
        background: '#F5F4F2'
      }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-[100px]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20">

            {/* Left sticky column — visible at md+ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="hidden md:block md:w-56 lg:w-[32%] flex-shrink-0"
            >
              <div className="sticky top-[88px]">
                <span className="text-[#FC3637] text-[11px] font-black tracking-[0.3em] uppercase block mb-5">REACH OUT</span>
                <h2 className="text-[#111111] font-semibold text-[clamp(1.6rem,3vw,3.5rem)] leading-[0.9] tracking-tighter mb-10">
                  How can <br /> we help <br /> you?
                </h2>
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{
                    opacity: 0,
                    y: 12
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} exit={{
                    opacity: 0,
                    y: -8
                  }} transition={{
                    duration: 0.35
                  }}>
                    <p className="text-[#111111] font-black text-[13px] tracking-[0.15em] uppercase mb-3">
                      {currentTabMeta.title}
                    </p>
                    <p className="text-[#333333] text-[14px] leading-relaxed mb-8 max-w-[280px]">
                      {currentTabMeta.desc}
                    </p>
                    <div className="flex items-start gap-3">
                      <div className="w-[2px] min-h-[40px] bg-[#FC3637] mt-1 flex-shrink-0" />
                      <p className="text-[#888888] text-[12px] italic leading-relaxed">{currentTabMeta.responseNote}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right form column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="flex-1 min-w-0"
            >
              {/* Mobile heading */}
              <div className="md:hidden mb-8">
                <span className="text-[#FC3637] text-[11px] font-black tracking-[0.3em] uppercase block mb-4">REACH OUT</span>
                <h2 className="text-[#111111] font-semibold text-4xl leading-[0.9] tracking-tighter">
                  How can we help you?
                </h2>
              </div>

              {/* Tab Bar — horizontally scrollable on mobile */}
              <div className="sticky top-[60px] md:top-[72px] z-20 border-b mb-6 md:mb-10 overflow-x-auto scrollbar-hide" style={{
                background: '#F5F4F2',
                borderBottomColor: '#E0DDD9'
              }}>
                <div className="flex gap-0 min-w-max">
                  {TABS.map(tab => <button key={tab.id} onClick={() => handleTabChange(tab.id as TabType)} className={cn('relative py-4 md:py-5 px-4 md:px-6 text-[13px] md:text-[15px] uppercase transition-all duration-200 ease-in-out whitespace-nowrap min-h-[44px]', activeTab === tab.id ? 'text-[#111111] font-bold' : 'text-[#AAAAAA] font-normal hover:text-[#666666]')}>
                    {activeTab === tab.id && <motion.span layoutId="tabPill" className="absolute inset-0 rounded-t-[2px]" style={{
                      background: 'rgba(252,54,55,0.06)'
                    }} transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 38
                    }} />}
                    {/* Short label on mobile, full label on md+ */}
                    <span className="relative z-10 sm:hidden">{tab.label}</span>
                    <span className="relative z-10 hidden sm:inline">{tab.fullLabel}</span>
                    {activeTab === tab.id && <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{
                      background: 'linear-gradient(to right, #FC3637, #C02020)'
                    }} transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 38
                    }} />}
                  </button>)}
                </div>
              </div>

              {/* Form Card */}
              <div className="min-h-[500px] md:min-h-[600px]">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} variants={cardVariants} initial="hidden" animate="visible" exit="exit">
                    <div className="rounded-[3px] overflow-hidden" style={{
                      background: '#FFFFFF',
                      border: '1px solid #E0E0E0',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                      borderTop: '3px solid #FC3637'
                    }}>
                      <AnimatePresence mode="wait">
                        {isSuccess ? <SuccessPanel key="success" tab={activeTab} onReset={handleReset} /> : <motion.div key="form" initial={{
                          opacity: 0
                        }} animate={{
                          opacity: 1
                        }} exit={{
                          opacity: 0
                        }} transition={{
                          duration: 0.2
                        }} className="p-4 sm:p-6 md:p-12">
                          {/* ── General Form (Progressive Disclosure) ── */}
                          {activeTab === 'general' && <form onSubmit={e => handleSubmit(e, 'general')} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Progress Indicator */}
                            <motion.div className="col-span-1 md:col-span-2 mb-8 md:mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                              <div className="flex items-center">
                                {GENERAL_STEPS.map((step, idx) => <div key={step.num} className="flex items-center">
                                  <div className="flex items-center gap-2 sm:gap-2.5">
                                    <div className={cn('w-9 h-9 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 flex-shrink-0', generalStep > step.num ? 'bg-[#FC3637] text-white' : generalStep === step.num ? 'bg-[#FC3637] text-white ring-4 ring-[#FC3637]/20' : 'bg-[#F0EFED] text-[#AAAAAA] border border-[#E0E0E0]')}>
                                      {generalStep > step.num ? <CheckCircle className="w-4 h-4" /> : step.num === 1 ? <User className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                                    </div>
                                    <div className="hidden sm:flex flex-col">
                                      <span className={cn('text-[11px] font-black uppercase tracking-[0.12em] transition-colors duration-300', generalStep >= step.num ? 'text-[#111111]' : 'text-[#AAAAAA]')}>
                                        {step.label}
                                      </span>
                                      <span className="text-[10px] text-[#AAAAAA] tracking-wide hidden md:block">
                                        {step.desc}
                                      </span>
                                    </div>
                                  </div>
                                  {idx < GENERAL_STEPS.length - 1 && <div className="h-[1px] w-6 sm:w-10 md:w-12 mx-2 sm:mx-3 flex-shrink-0 transition-colors duration-500" style={{ background: generalStep > step.num ? '#FC3637' : '#E0E0E0' }} />}
                                </div>)}
                              </div>
                            </motion.div>

                            {/* Step Fields */}
                            <AnimatePresence mode="wait">
                              {generalStep === 1 && <motion.div key="g-step-1" className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                <SectionDivider label="Step 1 — Your Details" animIndex={0} />
                                <FormField animIndex={1} label="First Name" id="firstName" required colSpan="half" value={generalForm.firstName} onChange={e => handleInputChange(e, 'general')} error={errors.firstName} />
                                <FormField animIndex={2} label="Last Name" id="lastName" required colSpan="half" value={generalForm.lastName} onChange={e => handleInputChange(e, 'general')} error={errors.lastName} />
                                <FormField animIndex={3} label="Email Address" id="email" type="email" required colSpan="half" placeholder="you@yourcompany.com" value={generalForm.email} onChange={e => handleInputChange(e, 'general')} error={errors.email} />
                                <FormField animIndex={4} label="Phone Number" id="phone" colSpan="half" placeholder="011 482 7210" value={generalForm.phone} onChange={e => handleInputChange(e, 'general')} />
                                <FormField animIndex={5} label="Organisation / Company" id="company" colSpan="full" placeholder="Your organisation name" value={generalForm.company} onChange={e => handleInputChange(e, 'general')} />
                                <div className="col-span-1 md:col-span-2 flex justify-end mt-6 md:mt-8">
                                  <motion.button type="button" onClick={handleGeneralNext} variants={shakeVariants} animate={shakeForm ? 'shake' : 'idle'} whileHover={{ backgroundColor: '#C02020', boxShadow: '0 8px 28px rgba(204,0,0,0.28)' }} whileTap={{ scale: 0.98 }} className="group flex items-center gap-2 bg-[#FC3637] text-white font-bold text-[12px] md:text-[13px] tracking-[0.18em] px-6 md:px-10 py-3.5 md:py-4 rounded-[2px] uppercase transition-all duration-200 ease-in-out min-h-[48px]" style={{ boxShadow: '0 4px 16px rgba(252,54,55,0.20)' }}>
                                    <span>Continue to Enquiry</span>
                                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                  </motion.button>
                                </div>
                              </motion.div>}

                              {generalStep === 2 && <motion.div key="g-step-2" className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                <SectionDivider label="Step 2 — Your Enquiry" animIndex={0} />
                                <FormField animIndex={1} label="Subject" id="subject" required colSpan="half" options={SUBJECT_OPTIONS} placeholder="Select a subject" value={generalForm.subject} onChange={e => handleInputChange(e, 'general')} error={errors.subject} />
                                <FormField animIndex={2} label="How did you hear about us?" id="referral" colSpan="half" options={['Google / Search', 'Social Media', 'Referral', 'Event or Conference', 'Media / Press', 'Other']} value={generalForm.referral} onChange={e => handleInputChange(e, 'general')} />
                                <FormField animIndex={3} label="Message" id="message" required isTextArea colSpan="full" placeholder="Tell us how we can help you..." value={generalForm.message} onChange={e => handleInputChange(e, 'general')} error={errors.message} />
                                <div className="col-span-1 md:col-span-2 flex items-center justify-between mt-6 md:mt-8 gap-3">
                                  <motion.button type="button" onClick={handleGeneralBack} whileHover={{ backgroundColor: '#EBEBEB' }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 border border-[#E0E0E0] bg-white text-[#555555] font-bold text-[12px] tracking-[0.15em] px-4 sm:px-6 py-3.5 rounded-[2px] uppercase transition-all duration-200 min-h-[48px]">
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Back</span>
                                  </motion.button>
                                  <SubmitButton label="Send Message" />
                                </div>
                              </motion.div>}
                            </AnimatePresence>
                          </form>}

                          {/* ── Client Form (Progressive Disclosure) ── */}
                          {activeTab === 'client' && <form onSubmit={e => handleSubmit(e, 'client')} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Progress Indicator */}
                            <motion.div className="col-span-1 md:col-span-2 mb-8 md:mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                              <div className="flex items-center">
                                {CLIENT_STEPS.map((step, idx) => <div key={step.num} className="flex items-center">
                                  <div className="flex items-center gap-2 sm:gap-2.5">
                                    <div className={cn('w-9 h-9 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 flex-shrink-0', clientStep > step.num ? 'bg-[#FC3637] text-white' : clientStep === step.num ? 'bg-[#FC3637] text-white ring-4 ring-[#FC3637]/20' : 'bg-[#F0EFED] text-[#AAAAAA] border border-[#E0E0E0]')}>
                                      {clientStep > step.num ? <CheckCircle className="w-4 h-4" /> : step.num === 1 ? <User className="w-3.5 h-3.5" /> : step.num === 2 ? <Building2 className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                                    </div>
                                    <div className="hidden sm:flex flex-col">
                                      <span className={cn('text-[11px] font-black uppercase tracking-[0.12em] transition-colors duration-300', clientStep >= step.num ? 'text-[#111111]' : 'text-[#AAAAAA]')}>
                                        {step.label}
                                      </span>
                                      <span className="text-[10px] text-[#AAAAAA] tracking-wide hidden md:block">
                                        {step.desc}
                                      </span>
                                    </div>
                                  </div>
                                  {idx < CLIENT_STEPS.length - 1 && <div className="h-[1px] w-6 sm:w-10 md:w-12 mx-2 sm:mx-3 flex-shrink-0 transition-colors duration-500" style={{ background: clientStep > step.num ? '#FC3637' : '#E0E0E0' }} />}
                                </div>)}
                              </div>
                            </motion.div>

                            {/* Step Fields */}
                            <AnimatePresence mode="wait">
                              {clientStep === 1 && <motion.div key="c-step-1" className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                <SectionDivider label="Step 1 — Your Details" animIndex={0} />
                                <FormField animIndex={1} label="First Name" id="firstName" required colSpan="half" value={clientForm.firstName} onChange={e => handleInputChange(e, 'client')} error={errors.firstName} />
                                <FormField animIndex={2} label="Last Name" id="lastName" required colSpan="half" value={clientForm.lastName} onChange={e => handleInputChange(e, 'client')} error={errors.lastName} />
                                <FormField animIndex={3} label="Email Address" id="email" type="email" required colSpan="half" placeholder="you@yourcompany.com" value={clientForm.email} onChange={e => handleInputChange(e, 'client')} error={errors.email} />
                                <FormField animIndex={4} label="Phone Number" id="phone" colSpan="half" placeholder="011 482 7210" value={clientForm.phone} onChange={e => handleInputChange(e, 'client')} />
                                <div className="col-span-1 md:col-span-2 flex justify-end mt-6 md:mt-8">
                                  <motion.button type="button" onClick={handleClientNext} variants={shakeVariants} animate={shakeForm ? 'shake' : 'idle'} whileHover={{ backgroundColor: '#C02020', boxShadow: '0 8px 28px rgba(204,0,0,0.28)' }} whileTap={{ scale: 0.98 }} className="group flex items-center gap-2 bg-[#FC3637] text-white font-bold text-[12px] md:text-[13px] tracking-[0.18em] px-6 md:px-10 py-3.5 md:py-4 rounded-[2px] uppercase transition-all duration-200 ease-in-out min-h-[48px]" style={{ boxShadow: '0 4px 16px rgba(252,54,55,0.20)' }}>
                                    <span>Continue to Organisation</span>
                                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                  </motion.button>
                                </div>
                              </motion.div>}

                              {clientStep === 2 && <motion.div key="c-step-2" className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                <SectionDivider label="Step 2 — About Your Organisation" animIndex={0} />
                                <FormField animIndex={1} label="Organisation / Company" id="company" required colSpan="half" placeholder="Your organisation name" value={clientForm.company} onChange={e => handleInputChange(e, 'client')} error={errors.company} />
                                <FormField animIndex={2} label="Job Title" id="jobTitle" required colSpan="half" placeholder="e.g. Marketing Director" value={clientForm.jobTitle} onChange={e => handleInputChange(e, 'client')} error={errors.jobTitle} />
                                <div className="col-span-1 md:col-span-2 flex items-center justify-between mt-6 md:mt-8 gap-3">
                                  <motion.button type="button" onClick={handleClientBack} whileHover={{ backgroundColor: '#EBEBEB' }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 border border-[#E0E0E0] bg-white text-[#555555] font-bold text-[12px] tracking-[0.15em] px-4 sm:px-6 py-3.5 rounded-[2px] uppercase transition-all duration-200 min-h-[48px]">
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Back</span>
                                  </motion.button>
                                  <motion.button type="button" onClick={handleClientNext} variants={shakeVariants} animate={shakeForm ? 'shake' : 'idle'} whileHover={{ backgroundColor: '#C02020', boxShadow: '0 8px 28px rgba(204,0,0,0.28)' }} whileTap={{ scale: 0.98 }} className="group flex items-center gap-2 bg-[#FC3637] text-white font-bold text-[12px] md:text-[13px] tracking-[0.18em] px-6 md:px-10 py-3.5 md:py-4 rounded-[2px] uppercase transition-all duration-200 ease-in-out min-h-[48px]" style={{ boxShadow: '0 4px 16px rgba(252,54,55,0.20)' }}>
                                    <span>Continue to Project</span>
                                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                  </motion.button>
                                </div>
                              </motion.div>}

                              {clientStep === 3 && <motion.div key="c-step-3" className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                <SectionDivider label="Step 3 — Project Brief" animIndex={0} />
                                <FormField animIndex={1} label="Service Area of Interest" id="service" required colSpan="full" options={['Strategic Communications and PR', 'Brand Experience and Activations', 'Public Affairs and Policy', 'ESG and Impact Advisory', 'Digital, AI and Performance Marketing', 'Executive Influence and Thought Leadership', 'Influencer Marketing and Creator Economy', 'Ecosystem Building and Partnerships', 'Strategic Creative Marketing and Brand', 'Trust, Reputation and Corporate Affairs', 'Legacy Events', 'Other']} value={clientForm.service} onChange={e => handleInputChange(e, 'client')} error={errors.service} />
                                <FormField animIndex={2} label="Estimated Budget Range" id="budget" colSpan="half" placeholder="Select budget range" options={['Under R500K', 'R500K – R1M', 'R1M – R5M', 'R5M – R10M', 'R10M+', 'Prefer not to say']} value={clientForm.budget} onChange={e => handleInputChange(e, 'client')} />
                                <FormField animIndex={3} label="Preferred Engagement Timeline" id="timeline" colSpan="half" options={['Immediate (within 1 month)', 'Short-term (1–3 months)', 'Medium-term (3–6 months)', 'Long-term (6+ months)', 'Exploring options']} value={clientForm.timeline} onChange={e => handleInputChange(e, 'client')} />
                                <FormField animIndex={4} label="Project / Campaign Description" id="description" required isTextArea colSpan="full" placeholder="Describe your project, goals, and any key constraints..." value={clientForm.description} onChange={e => handleInputChange(e, 'client')} error={errors.description} />
                                <div className="col-span-1 md:col-span-2 flex items-center justify-between mt-6 md:mt-8 gap-3">
                                  <motion.button type="button" onClick={handleClientBack} whileHover={{ backgroundColor: '#EBEBEB' }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 border border-[#E0E0E0] bg-white text-[#555555] font-bold text-[12px] tracking-[0.15em] px-4 sm:px-6 py-3.5 rounded-[2px] uppercase transition-all duration-200 min-h-[48px]">
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Back</span>
                                  </motion.button>
                                  <SubmitButton label="Submit Enquiry" />
                                </div>
                              </motion.div>}
                            </AnimatePresence>
                          </form>}

                          {/* ── Partnership Form (Progressive Disclosure) ── */}
                          {activeTab === 'partnership' && <form onSubmit={e => handleSubmit(e, 'partnership')} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Progress Indicator — compact on mobile */}
                            <motion.div className="col-span-1 md:col-span-2 mb-8 md:mb-10" initial={{
                              opacity: 0,
                              y: 10
                            }} animate={{
                              opacity: 1,
                              y: 0
                            }} transition={{
                              duration: 0.4
                            }}>
                              <div className="flex items-center">
                                {PARTNERSHIP_STEPS.map((step, idx) => <div key={step.num} className="flex items-center">
                                  <div className="flex items-center gap-2 sm:gap-2.5">
                                    <div className={cn('w-9 h-9 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 flex-shrink-0', partnerStep > step.num ? 'bg-[#FC3637] text-white' : partnerStep === step.num ? 'bg-[#FC3637] text-white ring-4 ring-[#FC3637]/20' : 'bg-[#F0EFED] text-[#AAAAAA] border border-[#E0E0E0]')}>
                                      {partnerStep > step.num ? <CheckCircle className="w-4 h-4" /> : step.num === 1 ? <User className="w-3.5 h-3.5" /> : step.num === 2 ? <Building2 className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                                    </div>
                                    {/* Step labels hidden on xs, shown on sm+ */}
                                    <div className="hidden sm:flex flex-col">
                                      <span className={cn('text-[11px] font-black uppercase tracking-[0.12em] transition-colors duration-300', partnerStep >= step.num ? 'text-[#111111]' : 'text-[#AAAAAA]')}>
                                        {step.label}
                                      </span>
                                      <span className="text-[10px] text-[#AAAAAA] tracking-wide hidden md:block">
                                        {step.desc}
                                      </span>
                                    </div>
                                  </div>
                                  {idx < PARTNERSHIP_STEPS.length - 1 && <div className="h-[1px] w-6 sm:w-10 md:w-12 mx-2 sm:mx-3 flex-shrink-0 transition-colors duration-500" style={{
                                    background: partnerStep > step.num ? '#FC3637' : '#E0E0E0'
                                  }} />}
                                </div>)}
                              </div>
                            </motion.div>

                            {/* Step Fields */}
                            <AnimatePresence mode="wait">
                              {/* Step 1: Contact Details */}
                              {partnerStep === 1 && <motion.div key="p-step-1" className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                <SectionDivider label="Step 1 — Your Details" animIndex={0} />
                                <FormField animIndex={1} label="First Name" id="firstName" required colSpan="half" value={partnershipForm.firstName} onChange={e => handleInputChange(e, 'partnership')} error={errors.firstName} />
                                <FormField animIndex={2} label="Last Name" id="lastName" required colSpan="half" value={partnershipForm.lastName} onChange={e => handleInputChange(e, 'partnership')} error={errors.lastName} />
                                <FormField animIndex={3} label="Email Address" id="email" type="email" required colSpan="half" placeholder="you@yourcompany.com" value={partnershipForm.email} onChange={e => handleInputChange(e, 'partnership')} error={errors.email} />
                                <FormField animIndex={4} label="Phone Number" id="phone" colSpan="half" placeholder="000 000 0000" value={partnershipForm.phone} onChange={e => handleInputChange(e, 'partnership')} />
                                <div className="col-span-1 md:col-span-2 flex justify-end mt-6 md:mt-8">
                                  <motion.button type="button" onClick={handlePartnershipNext} variants={shakeVariants} animate={shakeForm ? 'shake' : 'idle'} whileHover={{
                                    backgroundColor: '#C02020',
                                    boxShadow: '0 8px 28px rgba(204,0,0,0.28)'
                                  }} whileTap={{
                                    scale: 0.98
                                  }} className="group flex items-center gap-2 bg-[#FC3637] text-white font-bold text-[12px] md:text-[13px] tracking-[0.18em] px-6 md:px-10 py-3.5 md:py-4 rounded-[2px] uppercase transition-all duration-200 ease-in-out min-h-[48px]" style={{
                                    boxShadow: '0 4px 16px rgba(252,54,55,0.20)'
                                  }}>
                                    <span>Continue to Organisation</span>
                                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                  </motion.button>
                                </div>
                              </motion.div>}

                              {/* Step 2: Organisation */}
                              {partnerStep === 2 && <motion.div key="p-step-2" className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                <SectionDivider label="Step 2 — About Your Organisation" animIndex={0} />
                                <FormField animIndex={1} label="Organisation / Company" id="company" required colSpan="half" placeholder="Your organisation name" value={partnershipForm.company} onChange={e => handleInputChange(e, 'partnership')} error={errors.company} />
                                <FormField animIndex={2} label="Job Title / Role" id="jobTitle" required colSpan="half" placeholder="e.g. CEO, Head of Partnerships" value={partnershipForm.jobTitle} onChange={e => handleInputChange(e, 'partnership')} error={errors.jobTitle} />
                                <FormField animIndex={3} label="Country / Region" id="country" colSpan="half" placeholder="e.g. South Africa" value={partnershipForm.country} onChange={e => handleInputChange(e, 'partnership')} />
                                <FormField animIndex={4} label="Industry / Sector" id="industry" colSpan="half" placeholder="e.g. Financial Services" value={partnershipForm.industry} onChange={e => handleInputChange(e, 'partnership')} />
                                <FormField animIndex={5} label="Organisation Website" id="website" colSpan="half" placeholder="https://yourcompany.com" value={partnershipForm.website} onChange={e => handleInputChange(e, 'partnership')} />
                                <FormField animIndex={6} label="LinkedIn Profile URL" id="linkedin" colSpan="half" placeholder="https://linkedin.com/in/yourprofile" value={partnershipForm.linkedin} onChange={e => handleInputChange(e, 'partnership')} />
                                <div className="col-span-1 md:col-span-2 flex items-center justify-between mt-6 md:mt-8 gap-3">
                                  <motion.button type="button" onClick={handlePartnershipBack} whileHover={{
                                    backgroundColor: '#EBEBEB'
                                  }} whileTap={{
                                    scale: 0.97
                                  }} className="flex items-center gap-2 border border-[#E0E0E0] bg-white text-[#555555] font-bold text-[12px] tracking-[0.15em] px-4 sm:px-6 py-3.5 rounded-[2px] uppercase transition-all duration-200 min-h-[48px]">
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Back</span>
                                  </motion.button>
                                  <motion.button type="button" onClick={handlePartnershipNext} variants={shakeVariants} animate={shakeForm ? 'shake' : 'idle'} whileHover={{
                                    backgroundColor: '#C02020',
                                    boxShadow: '0 8px 28px rgba(204,0,0,0.28)'
                                  }} whileTap={{
                                    scale: 0.98
                                  }} className="group flex items-center gap-2 bg-[#FC3637] text-white font-bold text-[12px] md:text-[13px] tracking-[0.18em] px-5 md:px-10 py-3.5 md:py-4 rounded-[2px] uppercase transition-all duration-200 ease-in-out min-h-[48px]" style={{
                                    boxShadow: '0 4px 16px rgba(252,54,55,0.20)'
                                  }}>
                                    <span>Continue to Project</span>
                                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                  </motion.button>
                                </div>
                              </motion.div>}

                              {/* Step 3: Project & Partnership Details */}
                              {partnerStep === 3 && <motion.div key="p-step-3" className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                <SectionDivider label="Step 3 — Project & Partnership Details" animIndex={0} />
                                <FormField animIndex={1} label="Partnership Type" id="type" required colSpan="half" options={['Strategic Alliance', 'Joint Venture', 'Referral Partnership', 'Technology Partnership', 'Media Partnership', 'Sponsorship', 'Investment / Funding', 'Academic / Research Partnership', 'Government / Public Sector Partnership', 'Other']} value={partnershipForm.type} onChange={e => handleInputChange(e, 'partnership')} error={errors.type} />
                                <FormField animIndex={2} label="Preferred Next Step" id="nextStep" colSpan="half" options={['Introductory Call', 'Meeting / Presentation', 'Send a Proposal', 'Receive Our Partnership Deck', 'Other']} value={partnershipForm.nextStep} onChange={e => handleInputChange(e, 'partnership')} />
                                <FormField animIndex={3} label="Partnership Objectives" id="objectives" required isTextArea colSpan="full" placeholder="Describe what you hope to achieve through this partnership..." value={partnershipForm.objectives} onChange={e => handleInputChange(e, 'partnership')} error={errors.objectives} />
                                <FormField animIndex={4} label="What does your organisation bring to the partnership?" id="valueAdd" isTextArea colSpan="full" placeholder="Share your organisation's strengths, assets, and unique contributions..." value={partnershipForm.valueAdd} onChange={e => handleInputChange(e, 'partnership')} />
                                <div className="col-span-1 md:col-span-2 flex items-center justify-between mt-6 md:mt-8 gap-3">
                                  <motion.button type="button" onClick={handlePartnershipBack} whileHover={{
                                    backgroundColor: '#EBEBEB'
                                  }} whileTap={{
                                    scale: 0.97
                                  }} className="flex items-center gap-2 border border-[#E0E0E0] bg-white text-[#555555] font-bold text-[12px] tracking-[0.15em] px-4 sm:px-6 py-3.5 rounded-[2px] uppercase transition-all duration-200 min-h-[48px]">
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Back</span>
                                  </motion.button>
                                  <motion.button type="submit" disabled={isSubmitting} variants={shakeVariants} animate={shakeForm ? 'shake' : 'idle'} whileHover={{
                                    backgroundColor: isSubmitting ? '#FC3637' : '#C02020',
                                    boxShadow: isSubmitting ? 'none' : '0 8px 28px rgba(204,0,0,0.28)'
                                  }} whileTap={{
                                    scale: isSubmitting ? 1 : 0.98
                                  }} className="group flex items-center gap-2 md:gap-3 bg-[#FC3637] text-white font-bold text-[12px] md:text-[13px] tracking-[0.15em] md:tracking-[0.18em] px-4 sm:px-6 md:px-10 py-3.5 md:py-4 rounded-[2px] uppercase transition-all duration-200 ease-in-out min-h-[48px] disabled:opacity-75 disabled:cursor-not-allowed" style={{
                                    boxShadow: '0 4px 16px rgba(252,54,55,0.20)'
                                  }}>
                                    {isSubmitting ? (
                                      <span className="flex items-center gap-1">
                                        Submitting
                                        <span className="loading-dot ml-1" />
                                        <span className="loading-dot" />
                                        <span className="loading-dot" />
                                      </span>
                                    ) : (
                                      <>
                                        <span className="hidden sm:inline">Submit Partnership Enquiry</span>
                                        <span className="sm:hidden">Submit</span>
                                      </>
                                    )}
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                                  </motion.button>
                                </div>
                                <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-3">
                                  <Lock className="w-3 h-3 text-[#AAAAAA] flex-shrink-0" />
                                  <p className="text-[#AAAAAA] text-[11px] tracking-wide">
                                    Your information is never shared with third parties.
                                  </p>
                                </div>
                              </motion.div>}
                            </AnimatePresence>
                          </form>}
                        </motion.div>}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Map Location ─── */}
      <section className="bg-[#0D0D0D] py-12 md:py-24 lg:py-36 px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-14 text-center md:text-left">
            <span className="text-[#FC3637] text-[11px] font-bold tracking-[0.3em] uppercase block mb-4">OUR LOCATION</span>
            <h2 className="text-white font-semibold text-3xl md:text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] tracking-tighter">
              Where to find us
            </h2>
          </div>
          <div className="w-full h-[450px] rounded-[4px] overflow-hidden border border-white/10 relative shadow-2xl bg-[#111]">
            <iframe
              title="EmpowaWorx Headquarters Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.5684497678385!2d27.99478147696228!3d-26.08051797715053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957351659779df%3A0xb35a0f2ee4bc752a!2s364%20Pine%20Ave%2C%20Ferndale%2C%20Randburg%2C%202196%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1718840000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ─── Section 5: Pre-Footer CTA ─── */}
      <section className="relative py-16 md:py-24 lg:py-36 px-4 sm:px-8 flex items-center justify-center text-center overflow-hidden bg-[#1E1E1E]">
        {/* Background Image with overlay */}
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <img
            src="/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-2.jpg"
            alt="Collaboration background"
            className="w-full h-full object-cover filter brightness-[0.22] saturate-[0.8]"
          />
        </div>
        <AfricaWatermark className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[120%] opacity-[0.03] text-white z-10" />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <h2 className="text-white font-semibold text-[clamp(2.8rem,10vw,9rem)] leading-[0.88] tracking-tighter mb-8 md:mb-10">
            <span className="block">Ready to</span>
            <span className="block text-[#FC3637]">work together?</span>
          </h2>
          <p className="text-white/65 text-sm md:text-[clamp(14px,1.5vw,18px)] max-w-[580px] mx-auto mb-10 md:mb-14 leading-relaxed px-2">
            Join the growing family of organisations, leaders and brands that trust EmpowaWorx™ to deliver impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <motion.button whileHover={{
              scale: 1.05
            }} onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center justify-center gap-4 bg-[#FC3637] text-white font-black text-[13px] tracking-widest w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-sm hover:shadow-2xl hover:shadow-[#FC3637]/45 transition-all duration-300 uppercase min-h-[52px]">
              <span>Start a Conversation</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </motion.button>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>;
};
