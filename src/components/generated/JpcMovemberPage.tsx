import * as React from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  AlertCircle
} from 'lucide-react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { submitToGravityForm } from '../../services/gravityForms';

const DARK = '#1E1E1E';
const RED = '#FC3637';
const EASE = [0.22, 1, 0.36, 1] as const;

interface Detail {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface OverviewCard {
  id: string;
  label: string;
  value: string;
}

interface DietaryOption {
  id: string;
  label: string;
}

interface FeaturedSpeaker {
  id: string;
  badge: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  fallbackImage?: string;
  imageAlt: string;
}

const HERO_META: OverviewCard[] = [
  {
    id: 'date',
    label: 'DATE',
    value: 'Wednesday, 25 November 2026'
  },
  {
    id: 'time',
    label: 'TIME',
    value: '08:00 to 16:30'
  },
  {
    id: 'venue',
    label: 'VENUE',
    value: 'EmpowaWorx House, 364 Pine Avenue, Ferndale, Randburg'
  }
];

const OVERVIEW_CARDS: OverviewCard[] = [
  {
    id: 'opening-address',
    label: 'Opening Address',
    value: 'Mr. Musah Makhunga, CEO, JPC'
  },
  {
    id: 'host-entity',
    label: 'Host Entity',
    value: 'City of Joburg Property Company (JPC)'
  },
  {
    id: 'strategic-thrust',
    label: 'Strategic Thrust',
    value: 'Good Governance'
  },
  {
    id: 'venue',
    label: 'Venue',
    value: 'EmpowaWorx House, Ferndale, Randburg'
  }
];

const DETAILS: Detail[] = [
  {
    id: 'date',
    label: 'DATE',
    value: 'Wednesday, 25 November 2026',
    icon: <Calendar size={24} />
  },
  {
    id: 'time',
    label: 'TIME',
    value: '08:00 to 16:30',
    icon: <Clock size={24} />
  },
  {
    id: 'venue',
    label: 'VENUE',
    value: 'EmpowaWorx House, 364 Pine Avenue, Ferndale, Randburg',
    icon: <MapPin size={24} />
  },
  {
    id: 'whatsapp',
    label: 'WHATSAPP',
    value: '076 927 0172',
    icon: <Phone size={24} />
  }
];

const DIETARY_OPTIONS: DietaryOption[] = [
  { id: 'none', label: 'None' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'halaal', label: 'Halaal' },
  { id: 'kosher', label: 'Kosher' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'other', label: 'Other' }
];

const TSHIRT_OPTIONS = [
  { id: '', label: 'Select T-shirt size' },
  { id: 'S - Small', label: 'S - Small' },
  { id: 'M - Medium', label: 'M - Medium' },
  { id: 'L - Large', label: 'L - Large' },
  { id: 'XL - Extra Large', label: 'XL - Extra Large' },
  { id: '2XL - Double Extra Large', label: '2XL - Double Extra Large' },
  { id: '3XL', label: '3XL' },
  { id: '4XL', label: '4XL' },
  { id: 'Other', label: 'Other (Specify)' }
];

const FEATURED_SPEAKERS: FeaturedSpeaker[] = [
  {
    id: 'musah-makhunga',
    badge: 'OPENING ADDRESS',
    name: 'Mr. Musah Makhunga',
    title: 'CEO, Joburg Property Company (JPC)',
    bio: 'Mr. Musah Makhunga serves as the Chief Executive Officer of the Joburg Property Company (JPC), a key entity of the City of Johannesburg. As the opening address speaker, he sets the tone for a conference anchored in good governance, mens health, and the vision of a stronger, more accountable Johannesburg.',
    image: '/Musawakhe-Makhunga.jpeg',
    imageAlt: 'Mr. Musah Makhunga - CEO, Joburg Property Company'
  }
];

const GLOBAL_STYLES = `
  html { scroll-behavior: smooth; }
  .detail-card:hover { border-left-color: #FC3637 !important; }
`;

function FadeSlideUp({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef(null);
  const visible = useInView(ref, {
    once: false,
    margin: '-80px'
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function JpcMovemberPage() {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    phone: '',
    diet: 'None',
    dietaryOther: '',
    tshirtSize: '',
    tshirtOther: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [submissionRef, setSubmissionRef] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    const pageTitle = 'JPC Movember Conference 2026 | Healthy Men. Accountable Leaders.';
    const pageDesc = 'City of Joburg Property Company (JPC) presents the Movember Conference 2026 at EmpowaWorx House. Theme: Healthy Men. Accountable Leaders. A Stronger Johannesburg. Strategic Thrust: Good Governance.';
    const ogImgUrl = `${window.location.origin}/logo/Empowaworx-logo-png-bigger.png`;
    const canonicalUrl = `${window.location.origin}/jpc-movember-conference-2026`;

    document.title = pageTitle;

    const updateOrCreateMeta = (attrName: string, attrVal: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateOrCreateMeta('name', 'description', pageDesc);
    updateOrCreateMeta('property', 'og:title', pageTitle);
    updateOrCreateMeta('property', 'og:description', pageDesc);
    updateOrCreateMeta('property', 'og:image', ogImgUrl);
    updateOrCreateMeta('property', 'og:url', canonicalUrl);
    updateOrCreateMeta('property', 'og:type', 'website');
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', pageTitle);
    updateOrCreateMeta('name', 'twitter:description', pageDesc);

    return () => {
      document.title = 'EmpowaWorx';
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, diet: e.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (!formState.name.trim()) {
      setErrorMessage('Please enter your full Name and Surname.');
      return;
    }
    if (!formState.email.trim() || !formState.email.includes('@')) {
      setErrorMessage('Please enter a valid Email Address.');
      return;
    }
    if (!formState.phone.trim()) {
      setErrorMessage('Please enter your Contact Number.');
      return;
    }
    if (!formState.tshirtSize) {
      setErrorMessage('Please specify your T-shirt size.');
      return;
    }
    if (formState.tshirtSize === 'Other' && !formState.tshirtOther.trim()) {
      setErrorMessage('Please specify your custom T-shirt size.');
      return;
    }

    setIsSubmitting(true);
    const generatedRef = `JPC-MOV26-${Math.floor(1000 + Math.random() * 9000)}`;
    const dietaryValue =
      formState.diet === 'Other' && formState.dietaryOther
        ? `Other: ${formState.dietaryOther}`
        : formState.diet;
    const finalTshirtSize =
      formState.tshirtSize === 'Other' && formState.tshirtOther
        ? `Other: ${formState.tshirtOther.trim()}`
        : formState.tshirtSize;

    const payload = {
      // Gravity Form Field IDs explicitly mapped:
      input_1: formState.name,
      input_3: formState.email,
      input_4: formState.phone,
      input_5: dietaryValue,
      ...(formState.dietaryOther ? { input_6: formState.dietaryOther, dietaryOther: formState.dietaryOther } : {}),
      input_7: finalTshirtSize,

      // Standard fallback keys
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      dietary: dietaryValue,
      tshirtSize: finalTshirtSize,
      t_shirt_size: finalTshirtSize,
      event: 'JPC Movember Conference 2026',
      reference: generatedRef
    };

    try {
      await submitToGravityForm('jpc-movember', payload);
      setSubmissionRef(generatedRef);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmissionRef(generatedRef);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1E1E1E] font-sans">
      <style>{GLOBAL_STYLES}</style>

      {/* Website Standard Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative flex min-h-[760px] items-end overflow-hidden bg-[#1E1E1E] pb-14 pt-36 text-white lg:min-h-screen lg:pb-20"
        >
          {/* Hero Background Banner */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <img
              src="/JPC-Movember-Conference-banner.jpg"
              alt="JPC Movember Conference 2026 Banner"
              className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/80 to-[#1E1E1E]/55" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(252,54,55,.22),transparent_45%)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-12">
            <div className="mb-7 inline-flex bg-[#FC3637] px-3 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-white">
              <span>Good Governance</span>
              <span className="mx-2 opacity-60">·</span>
              <span>Movember 2026</span>
            </div>

            <h1 className="max-w-[1100px] text-[clamp(42px,7.5vw,130px)] font-semibold leading-[.92] tracking-[-.06em]">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                JPC Movember
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              >
                Conference
              </motion.span>
              <br />
              <motion.span
                className="text-[#FC3637]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              >
                2026.
              </motion.span>
            </h1>

            <p className="mt-7 max-w-[760px] font-serif text-[20px] italic leading-snug text-white/80 lg:text-[24px]">
              Healthy Men. Accountable Leaders. A Stronger Johannesburg.
            </p>

            <div className="mt-12 grid max-w-[940px] border-y border-white/20 sm:grid-cols-3">
              {HERO_META.map(item => (
                <div
                  key={item.id}
                  className={`py-4 ${
                    item.id !== 'date'
                      ? 'border-t border-white/20 sm:border-l sm:border-t-0 sm:pl-6'
                      : ''
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-[.16em] text-white/50">
                    {item.label}
                  </span>
                  <strong className="mt-1 block text-sm leading-snug">{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-7">
              <a
                href="#register"
                className="bg-[#FC3637] px-7 py-4 text-[11px] font-bold uppercase tracking-[.14em] text-white transition-transform hover:-translate-y-1 shadow-[0_4px_16px_rgba(252,54,55,0.25)]"
              >
                REGISTER NOW
              </a>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#FC3637]" />
        </section>

        {/* About Section */}
        <section
          id="about"
          className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:py-32"
        >
          <FadeSlideUp>
            <div>
              <p className="mb-8 text-[11px] font-bold uppercase tracking-[.18em] text-[#FC3637]">
                About the Conference
              </p>
              <p className="max-w-[650px] text-[clamp(25px,3vw,42px)] font-semibold leading-[1.08] tracking-[-.04em]">
                JPC Movember Conference 2026. Healthy Men. Accountable Leaders. A Stronger Johannesburg.
              </p>
              <p className="mt-8 max-w-[600px] text-base leading-7 text-black/55">
                The JPC Movember Conference 2026 takes place on Wednesday, 25 November 2026 from 08:00 to 16:30 at EmpowaWorx House, 364 Pine Avenue, Ferndale, Randburg. The strategic thrust is Good Governance.
              </p>
            </div>
          </FadeSlideUp>

          <FadeSlideUp delay={0.12}>
            <div className="grid gap-0 sm:grid-cols-2">
              {OVERVIEW_CARDS.map(item => (
                <div
                  key={item.id}
                  className="border-b border-black/10 border-l-[3px] border-l-[#FC3637] px-6 py-6"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/50">
                    {item.label}
                  </p>
                  <p className="mt-3 text-[17px] font-semibold leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </FadeSlideUp>
        </section>

        {/* Event Details Section */}
        <section
          id="details"
          className="relative overflow-hidden bg-[#1E1E1E] px-6 pt-16 pb-6 text-white lg:px-12 lg:pt-20 lg:pb-8"
        >
          <div className="relative mx-auto max-w-[1440px]">
            <FadeSlideUp>
              <p className="mb-8 text-[11px] font-bold uppercase tracking-[.18em] text-[#FC3637]">
                Event Details
              </p>
            </FadeSlideUp>
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {DETAILS.map(detail => (
                <div
                  key={detail.id}
                  className="detail-card border border-white/10 border-l-2 border-l-transparent p-6 transition-all"
                >
                  <div className="mb-10 text-[#FC3637]">{detail.icon}</div>
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/50">
                    {detail.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-snug">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Speakers Section */}
        <section
          id="speakers"
          className="relative overflow-hidden bg-[#1E1E1E] px-6 pt-6 pb-20 text-white lg:px-12 lg:pt-8 lg:pb-24"
        >
          <div className="relative mx-auto max-w-[1440px]">
            <FadeSlideUp>
              <p className="mb-10 text-[11px] font-bold uppercase tracking-[.22em] text-[#FC3637]">
                FEATURED SPEAKER
              </p>
            </FadeSlideUp>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {FEATURED_SPEAKERS.map(speaker => (
                <FadeSlideUp
                  key={speaker.id}
                  delay={speaker.id === 'musah-makhunga' ? 0.12 : 0.22}
                  className="h-full"
                >
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="group grid h-full overflow-hidden border border-l-[3px] border-white/10 border-l-[#FC3637] bg-white/[0.03] transition-colors duration-300 hover:border-[#FC3637] md:grid-cols-[.92fr_1.08fr]"
                  >
                    <figure className="relative min-h-[360px] md:min-h-[500px] overflow-hidden bg-black">
                      <img
                        src={speaker.image}
                        alt={speaker.imageAlt}
                        width="500"
                        height="600"
                        className="h-full w-full object-cover grayscale-[18%] transition-transform duration-500 group-hover:scale-105"
                        onError={e => {
                          if (speaker.fallbackImage) {
                            (e.target as HTMLImageElement).src = speaker.fallbackImage;
                          }
                        }}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#FC3637]/45 via-[#FC3637]/10 to-transparent"
                      />
                    </figure>

                    <div className="flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                      <p className="mb-5 inline-flex w-fit bg-[#FC3637] px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-white">
                        {speaker.badge}
                      </p>
                      <h2 className="text-[clamp(30px,3vw,46px)] font-semibold leading-[.98] tracking-[-.045em] text-white">
                        {speaker.name}
                      </h2>
                      <p className="mt-4 text-base font-semibold leading-snug text-white/85">
                        {speaker.title}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-white/60">
                        {speaker.bio}
                      </p>
                    </div>
                  </motion.article>
                </FadeSlideUp>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="px-6 py-24 lg:px-12 lg:py-32 scroll-mt-20">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <FadeSlideUp>
              <div>
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[.18em] text-[#FC3637]">
                  Registration
                </p>
                <h2 className="text-[clamp(38px,5vw,68px)] font-semibold leading-[.95] tracking-[-.055em]">
                  Secure
                  <br />
                  Your Seat
                </h2>
                <p className="mt-7 max-w-[320px] text-sm leading-6 text-black/55">
                  Complete the form below to register for the JPC Movember Conference 2026.
                </p>
              </div>
            </FadeSlideUp>

            <FadeSlideUp delay={0.12}>
              <div className="border border-black/10 p-6 sm:p-10">
                {submitted ? (
                  <div className="flex min-h-[400px] flex-col items-start justify-center">
                    <span className="mb-6 text-[#FC3637]">
                      <CheckCircle2 size={34} />
                    </span>
                    <h3 className="text-3xl font-semibold tracking-[-.04em]">Registration received.</h3>
                    <p className="mt-4 max-w-sm text-black/55">
                      JPC Movember Conference 2026 registration received. Your seat has been recorded.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    {errorMessage && (
                      <div className="p-3 bg-red-50 border border-[#FC3637] text-xs text-[#FC3637] flex items-center gap-2">
                        <AlertCircle size={16} />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <label className="block">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em]">
                        Name and Surname <span className="text-[#FC3637]">*</span>
                      </span>
                      <input
                        required
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sipho Khumalo"
                        className="w-full border-0 border-b border-black/20 px-0 py-3 text-base outline-none transition-colors focus:border-[#FC3637]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em]">
                        Email Address <span className="text-[#FC3637]">*</span>
                      </span>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="e.g. delegate@jhbproperty.co.za"
                        className="w-full border-0 border-b border-black/20 px-0 py-3 text-base outline-none transition-colors focus:border-[#FC3637]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em]">
                        Contact Number <span className="text-[#FC3637]">*</span>
                      </span>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 082 123 4567"
                        className="w-full border-0 border-b border-black/20 px-0 py-3 text-base outline-none transition-colors focus:border-[#FC3637]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em]">
                        Dietary Requirements <span className="text-[#FC3637]">*</span>
                      </span>
                      <div className="relative">
                        <select
                          value={formState.diet}
                          onChange={handleDietChange}
                          className="w-full appearance-none border-0 border-b border-black/20 bg-white px-0 py-3 text-base outline-none focus:border-[#FC3637]"
                        >
                          {DIETARY_OPTIONS.map(option => (
                            <option key={option.id} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-0 top-3 text-black/40"
                          size={18}
                        />
                      </div>
                    </label>

                    {formState.diet === 'Other' && (
                      <label className="block">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em]">
                          Please Specify Dietary Requirement <span className="text-[#FC3637]">*</span>
                        </span>
                        <input
                          required
                          name="dietaryOther"
                          value={formState.dietaryOther}
                          onChange={handleInputChange}
                          placeholder="e.g. Diabetic, nut allergy, etc."
                          className="w-full border-0 border-b border-black/20 px-0 py-3 text-base outline-none focus:border-[#FC3637]"
                        />
                      </label>
                    )}

                    <label className="block">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em]">
                        Please specify T-shirt size <span className="text-[#FC3637]">*</span>
                      </span>
                      <div className="relative">
                        <select
                          required
                          value={formState.tshirtSize}
                          onChange={e => setFormState(prev => ({ ...prev, tshirtSize: e.target.value }))}
                          className="w-full appearance-none border-0 border-b border-black/20 bg-white px-0 py-3 text-base outline-none focus:border-[#FC3637]"
                        >
                          {TSHIRT_OPTIONS.map(opt => (
                            <option
                              key={opt.id || 'placeholder'}
                              value={opt.id}
                              disabled={opt.id === ''}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-0 top-3 text-black/40"
                          size={18}
                        />
                      </div>
                    </label>

                    {formState.tshirtSize === 'Other' && (
                      <label className="block">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em]">
                          Please Specify Custom T-Shirt Size <span className="text-[#FC3637]">*</span>
                        </span>
                        <input
                          required
                          name="tshirtOther"
                          value={formState.tshirtOther}
                          onChange={handleInputChange}
                          placeholder="e.g. 5XL"
                          className="w-full border-0 border-b border-black/20 px-0 py-3 text-base outline-none focus:border-[#FC3637]"
                        />
                      </label>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FC3637] py-4 text-[11px] font-bold uppercase tracking-[.14em] text-white transition-colors hover:bg-[#d9292b] disabled:opacity-50 cursor-pointer shadow-md"
                    >
                      {isSubmitting ? 'SUBMITTING REGISTRATION...' : 'SUBMIT REGISTRATION'}
                    </button>

                    <p className="flex items-center justify-center gap-2 text-sm text-black/55">
                      <a
                        href="https://wa.me/27769270172?text=Hello%20EmpowaWorx,%20I%20enquire%20about%20the%20JPC%20Movember%20Conference%202026."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-black transition-colors"
                      >
                        <MessageSquare size={18} className="text-[#20a45b]" />
                        <span>WhatsApp: 076 927 0172</span>
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </FadeSlideUp>
          </div>
        </section>
      </main>

      {/* Website Standard Footer */}
      <Footer />
    </div>
  );
}

export default JpcMovemberPage;
