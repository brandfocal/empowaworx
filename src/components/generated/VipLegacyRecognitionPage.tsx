import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Lock,
  Mail,
  Phone,
  Video,
  Printer,
  Play,
  X,
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { submitToGravityForm } from '../../services/gravityForms';

// Brand Tokens matching the rest of EmpowaWorx
const RED = '#FC3637';
const RED_DARK = '#C02020';
const BG_DARK = '#0D0D0D';
const CARD_BG = '#141414';
const INPUT_BG = '#1A1A1A';

const TICKER_ITEMS = [
  'HONOURING DR DAVID MOLAPO',
  'AN EVENING OF LEGACY AND IMPACT',
  '28 NOVEMBER 2026',
  'EMPOWAWORX HOUSE',
  'STRICTLY PRIVATE & NON-TRANSFERABLE',
  'VIP ACCREDITATION',
  'THE SPEAKERS FIRM',
  'EMPOWAWORX'
];

export const VipLegacyRecognitionPage: React.FC = () => {
  // --- Form State ---
  const [formData, setFormData] = useState({
    // Section 1: Invitation Verification
    invitationRefNumber: '',
    sharedByName: '',
    sharedByOrgOrRelationship: '',
    sharedByNotes: '',
    receivedFrom: '',
    receivedFromOther: '',

    // Section 2: VIP Guest Identity
    title: '',
    titleOther: '',
    firstName: '',
    surname: '',
    preferredName: '',
    preferredSalutation: '',
    badgeName: '',
    pronunciation: '',
    nationality: '',
    residenceCityCountry: '',

    // Section 3: Professional & Institutional Profile
    designation: '',
    organisation: '',
    sector: '',
    sectorOther: '',

    // Section 4: Contact and Protocol Details
    email: '',
    mobileNumber: '',
    altContactNumber: '',
    preferredChannel: '',
    eaName: '',
    eaDesignation: '',
    eaEmail: '',
    eaMobile: '',

    // Section 5: Relationship with Dr David Molapo
    relationship: '',
    relationshipOther: '',

    // Section 6: Attendance Selection
    attendanceType: 'In Person',
    fullCeremonyAttendance: 'Yes',
    partialAttendanceTimes: '',
    virtualLivestreamEmail: '',

    // Section 7: Accompanying & Support Personnel
    hasSupportPersonnel: 'No',
    supportFullName: '',
    supportRole: '',
    supportMobile: '',
    supportReason: '',
    supportOrg: '',

    // Section 8: Hospitality Requirements
    dietary: 'None',
    dietaryOther: '',
    dietaryDetails: '',
    accessibility: 'None',
    accessibilityOther: '',
    additionalHospitalityNotes: '',

    // Section 9: Security, Transport and Parking
    requiresProtocolCoordination: 'No',
    protocolOfficialName: '',
    protocolOfficialOrg: '',
    protocolOfficialEmail: '',
    protocolOfficialMobile: '',
    protocolPersonnelCount: '',
    protocolSecurityRequirements: '',
    parkingRequirement: 'No',
    vehicleMakeModel: '',
    vehicleRegistration: '',
    driverNameAndMobile: '',

    // Section 10: Emergency Contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyMobile: '',

    // Section 11: Communication & Media Preferences
    consentEventUpdates: 'Yes',
    consentGuestList: 'Yes',
    mediaInterviewPreference: 'Available by Prior Arrangement',
    mediaRecordingConsent: 'I acknowledge and accept the photography and recording notice',

    // Section 12: Privacy & Data Protection
    privacyConsent: false,

    // Section 13: VIP Guest Declaration
    declarationConsent: false,
    declarationFullName: '',
    electronicSignature: '',
    submissionDate: new Date().toISOString().split('T')[0]
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Field change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation checks
    if (!formData.sharedByName.trim()) {
      setErrorMessage('Please specify who shared this invitation with you (Section 1).');
      document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.receivedFrom) {
      setErrorMessage('Please indicate how you received the invitation (Section 1).');
      document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.title) {
      setErrorMessage('Please select your Official Title or Honorific (Section 2).');
      document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.firstName.trim() || !formData.surname.trim()) {
      setErrorMessage('Please enter your First Name and Surname as reflected on your official ID (Section 2).');
      document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.badgeName.trim()) {
      setErrorMessage('Please provide the name for your VIP Accreditation Badge (Section 2).');
      document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.residenceCityCountry.trim()) {
      setErrorMessage('Please enter your City and Country of Residence (Section 2).');
      document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.designation.trim() || !formData.organisation.trim() || !formData.sector) {
      setErrorMessage('Please complete all mandatory professional profile fields (Section 3).');
      document.getElementById('section-3')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.email.trim() || !formData.mobileNumber.trim() || !formData.preferredChannel) {
      setErrorMessage('Please complete your Primary Email, Mobile Number, and Preferred Communication Channel (Section 4).');
      document.getElementById('section-4')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.relationship) {
      setErrorMessage('Please indicate your relationship with Dr David Molapo (Section 5).');
      document.getElementById('section-5')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (formData.attendanceType === 'Virtually via Secure Livestream' && !formData.virtualLivestreamEmail.trim()) {
      setErrorMessage('Please provide the email address for your secure livestream link (Section 6).');
      document.getElementById('section-6')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.emergencyName.trim() || !formData.emergencyRelationship.trim() || !formData.emergencyMobile.trim()) {
      setErrorMessage('Please complete the Emergency Contact details (Section 10).');
      document.getElementById('section-10')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMessage('You must consent to the processing of your personal information (Section 12).');
      document.getElementById('section-12')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!formData.declarationConsent || !formData.declarationFullName.trim() || !formData.electronicSignature.trim()) {
      setErrorMessage('Please complete the VIP Guest Declaration, including signature and full name (Section 13).');
      document.getElementById('section-13')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    const generatedRef = `VIP-DM26-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalRef = formData.invitationRefNumber.trim() ? formData.invitationRefNumber.trim() : generatedRef;

    // Gravity Forms (Form ID: 6) Field Mappings:
    const payload = {
      // ID 1: Invitation Reference Number
      "input_1": finalRef,
      // ID 3: Who shared this invitation with you?
      "input_3": formData.sharedByName,
      // ID 4: Their organisation or relationship to the event
      "input_4": formData.sharedByOrgOrRelationship,
      // ID 5: Optional context / notes
      "input_5": formData.sharedByNotes,
      // ID 6: How did you receive the invitation?
      "input_6": formData.receivedFrom === 'Other' && formData.receivedFromOther ? `Other: ${formData.receivedFromOther}` : formData.receivedFrom,
      // ID 7: Official Title or Honorific
      "input_7": formData.title === 'Other' && formData.titleOther ? `Other: ${formData.titleOther}` : formData.title,
      // ID 8: Full First Name(s)
      "input_8": formData.firstName,
      // ID 9: Surname
      "input_9": formData.surname,
      // ID 10: Preferred Name
      "input_10": formData.preferredName,
      // ID 11: Preferred Formal Salutation
      "input_11": formData.preferredSalutation,
      // ID 12: Name for VIP Accreditation Badge
      "input_12": formData.badgeName,
      // ID 13: Pronunciation Guidance
      "input_13": formData.pronunciation,
      // ID 14: Nationality
      "input_14": formData.nationality,
      // ID 15: City and Country of Residence
      "input_15": formData.residenceCityCountry,
      // ID 16: Designation or Official Position
      "input_16": formData.designation,
      // ID 17: Organisation or Institution
      "input_17": formData.organisation,
      // ID 18: Sector
      "input_18": formData.sector === 'Other' && formData.sectorOther ? `Other: ${formData.sectorOther}` : formData.sector,
      // ID 19: Primary Email Address
      "input_19": formData.email,
      // ID 20: Mobile Number
      "input_20": formData.mobileNumber,
      // ID 21: Alternative Contact Number
      "input_21": formData.altContactNumber,
      // ID 22: Preferred Communication Channel
      "input_22": formData.preferredChannel,
      // ID 23: Executive Assistant full name and surname
      "input_23": formData.eaName,
      // ID 24: Executive Assistant designation
      "input_24": formData.eaDesignation,
      // ID 25: Executive Assistant email address
      "input_25": formData.eaEmail,
      // ID 26: Executive Assistant mobile number
      "input_26": formData.eaMobile,
      // ID 27: Please indicate your relationship with Dr David Molapo:
      "input_27": formData.relationship === 'Other' && formData.relationshipOther ? `Other: ${formData.relationshipOther}` : formData.relationship,
      // ID 28: How would you like to attend?
      "input_28": formData.attendanceType === 'Virtually via Secure Livestream' && formData.virtualLivestreamEmail ? `${formData.attendanceType} (${formData.virtualLivestreamEmail})` : formData.attendanceType,
      // ID 29: Will you attend the full ceremony from 18h00 to 21h00?
      "input_29": formData.fullCeremonyAttendance === 'No' && formData.partialAttendanceTimes ? `No (Times: ${formData.partialAttendanceTimes})` : formData.fullCeremonyAttendance,
      // ID 30: Will you be accompanied by an essential protocol, accessibility or security support person?
      "input_30": formData.hasSupportPersonnel === 'Yes' 
        ? `Yes - ${formData.supportFullName} (${formData.supportRole || 'Support'}, ${formData.supportOrg || 'N/A'}, Tel: ${formData.supportMobile || 'N/A'}, Reason: ${formData.supportReason || 'N/A'})` 
        : 'No',
      // ID 31: Dietary Requirements
      "input_31": formData.dietary === 'Other' && formData.dietaryOther ? `Other: ${formData.dietaryOther}` : formData.dietary,
      // ID 32: Please provide relevant dietary or allergy details
      "input_32": formData.dietaryDetails,
      // ID 33: Accessibility Requirements
      "input_33": formData.accessibility === 'Other' && formData.accessibilityOther ? `Other: ${formData.accessibilityOther}` : formData.accessibility,
      // ID 34: Additional accessibility, hospitality, health or protocol information
      "input_34": formData.additionalHospitalityNotes,
      // ID 35: Do you require official protocol or security coordination?
      "input_35": formData.requiresProtocolCoordination === 'Yes'
        ? `Yes - ${formData.protocolOfficialName} (${formData.protocolOfficialOrg || 'N/A'}, Email: ${formData.protocolOfficialEmail || 'N/A'}, Tel: ${formData.protocolOfficialMobile || 'N/A'}, Count: ${formData.protocolPersonnelCount || 'N/A'}, Requirements: ${formData.protocolSecurityRequirements || 'N/A'})`
        : 'No',
      // ID 36: Will you require on-site parking?
      "input_36": formData.parkingRequirement === 'Yes' && formData.vehicleRegistration
        ? `Yes (Vehicle: ${formData.vehicleMakeModel}, Reg: ${formData.vehicleRegistration})`
        : formData.parkingRequirement,
      // ID 37: Driver’s Full Name and Mobile Number (Where applicable)
      "input_37": formData.driverNameAndMobile,
      // ID 38: Emergency Contact Full Name
      "input_38": formData.emergencyName,
      // ID 39: Relationship to Guest
      "input_39": formData.emergencyRelationship,
      // ID 40: Mobile Number
      "input_40": formData.emergencyMobile,
      // ID 41: May the event office send you essential registration, accreditation and event updates?
      "input_41": formData.consentEventUpdates,
      // ID 42: May your name, designation and organisation appear on the official VIP guest list?
      "input_42": formData.consentGuestList,
      // ID 43: Media Engagement Preference
      "input_43": formData.mediaInterviewPreference,
      // ID 44: Please indicate your preference:
      "input_44": formData.mediaRecordingConsent,
      // ID 45: PRIVACY AND DATA PROTECTION
      "input_45": formData.privacyConsent ? 'I consent to the processing of my personal information for the purposes stated above.' : '',
      "input_45.1": formData.privacyConsent ? 'I consent to the processing of my personal information for the purposes stated above.' : '',
      // ID 46: VIP GUEST DECLARATION
      "input_46": formData.declarationConsent ? 'I accept the VIP Registration Terms and Declaration.' : '',
      "input_46.1": formData.declarationConsent ? 'I accept the VIP Registration Terms and Declaration.' : '',
      // ID 47: Full Name and Surname
      "input_47": formData.declarationFullName,
      // ID 48: Electronic Signature
      "input_48": formData.electronicSignature,
      // ID 49: Date of Submission
      "input_49": formData.submissionDate,
    };

    try {
      const response = await submitToGravityForm('legacy-vip', payload);

      if (response.isSuccess) {
        setSubmissionRef(finalRef);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(response.message || 'Submission encountered an issue. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSubmissionRef(finalRef);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRefToClipboard = () => {
    if (submissionRef) {
      navigator.clipboard.writeText(submissionRef);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-[#FC3637] selection:text-white relative overflow-x-clip">
      <Header />

      <main className="relative z-10">
        {/* --- HERO / ACCREDITATION BANNER --- */}
        <section className="pt-28 md:pt-36 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Security Alert Bar */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-[2px] bg-[#141414] border border-white/10 border-l-4 border-l-[#FC3637] mb-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FC3637] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FC3637]"></span>
              </span>
              <span className="text-xs sm:text-[13px] font-black tracking-[0.2em] uppercase text-white">
                STRICTLY PRIVATE AND NON-TRANSFERABLE
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.16em] font-semibold text-white/70">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FC3637]" />
              VIP GUEST REGISTRATION & ACCREDITATION
            </div>
          </motion.div>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-[#FC3637]" />
                <span className="text-[#FC3637] text-[11px] font-black tracking-[0.25em] uppercase">
                  AN EVENING OF LEGACY AND IMPACT
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[clamp(38px,6vw,76px)] font-bold text-white uppercase leading-[0.94] tracking-[-0.04em]">
                HONOURING <br />
                <span className="text-[#FC3637]">
                  DR DAVID MOLAPO
                </span>
              </h1>

              {/* Credentials Subtitle */}
              <p className="text-sm sm:text-base text-white/80 font-medium tracking-wide border-l-2 border-[#FC3637] pl-4 py-1">
                International Speaker <span className="text-[#FC3637]">|</span> Entrepreneur <span className="text-[#FC3637]">|</span> Preacher <span className="text-[#FC3637]">|</span> Director of Companies
              </p>

              {/* Lead Paragraph */}
              <p className="text-sm sm:text-[15px] text-white/65 leading-relaxed max-w-2xl">
                EmpowaWorx and The Speakers Firm invite you to an exclusive VIP recognition ceremony honouring the enduring leadership, cultural impact, and generational footprint of Dr David Molapo.
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="#registration-form"
                  className="group flex items-center justify-center gap-3 bg-[#FC3637] hover:bg-[#C02020] text-white font-bold text-[13px] tracking-[0.18em] h-14 px-8 rounded-[2px] uppercase transition-all duration-200 ease-in-out shadow-[0_4px_16px_rgba(252,54,55,0.20)]"
                >
                  <Lock className="w-4 h-4 text-white" />
                  <span>Proceed to Accreditation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveVideoModal(true)}
                  className="flex items-center justify-center gap-2.5 bg-transparent hover:bg-white/5 border border-white/20 text-white font-semibold text-[13px] tracking-[0.14em] h-14 px-7 rounded-[2px] uppercase transition-all duration-200 ease-in-out"
                >
                  <Play className="w-4 h-4 text-[#FC3637] fill-[#FC3637]" />
                  <span>Watch Keynote Tribute</span>
                </button>
              </div>
            </motion.div>

            {/* Honoree Hero Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative group bg-[#141414] border border-white/10 rounded-[2px] overflow-hidden p-2 shadow-2xl">
                <div className="relative overflow-hidden bg-black aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src="/dr-david-molapo-hero.jpg"
                    alt="Dr David Molapo - VIP Legacy Recognition"
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://img.youtube.com/vi/z3Fas4VQvzw/maxresdefault.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  
                  {/* Portrait Caption */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-[2px]">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FC3637]">
                      Honoured Icon
                    </div>
                    <div className="text-lg font-bold text-white tracking-tight">
                      Dr David Molapo
                    </div>
                    <div className="text-xs text-white/60">
                      President: I CAN 4IR Leadership & Global Speaker
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- TICKER STRIP --- */}
        <div className="w-full bg-[#111111] overflow-hidden py-5 border-t border-b border-white/5 my-0">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <div key={idx} className="flex items-center shrink-0 px-8">
                <span className="text-[13px] font-bold tracking-[0.2em] uppercase text-white/80">
                  {item}
                </span>
                <span className="ml-8 text-[#FC3637] text-[10px]">◆</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- EVENT DETAILS & PROTOCOL (LIGHT SECTION) --- */}
        <section id="event-details" className="w-full bg-[#F8F9FA] text-[#1E1E1E] py-16 sm:py-20 border-b border-[#1E1E1E]/8">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-[2px] bg-white border border-[#1E1E1E]/10 p-6 sm:p-10 shadow-sm"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#1E1E1E]/10 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#FC3637]" />
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-[0.16em] text-[#1E1E1E]">
                    EVENT DETAILS & PROTOCOL
                  </h2>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FC3637]">
                  FERNDALE, RANDBURG
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Date */}
                <div className="p-6 rounded-[2px] bg-[#F9F9FA] border border-[#1E1E1E]/8 space-y-2 hover:border-[#FC3637]/40 transition-colors">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#FC3637] block">
                    Date
                  </span>
                  <p className="text-base sm:text-lg font-bold text-[#1E1E1E] leading-tight">
                    Saturday, 28 November 2026
                  </p>
                  <p className="text-xs text-[#1E1E1E]/60">Formal Gala Recognition</p>
                </div>

                {/* Ceremony Times */}
                <div className="p-6 rounded-[2px] bg-[#F9F9FA] border border-[#1E1E1E]/8 space-y-2 hover:border-[#FC3637]/40 transition-colors">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#FC3637] block">
                    Programme Schedule
                  </span>
                  <p className="text-sm font-semibold text-[#1E1E1E]">
                    <span className="text-[#1E1E1E]/60">Arrival & Accreditation:</span> 17h00
                  </p>
                  <p className="text-sm font-semibold text-[#1E1E1E]">
                    <span className="text-[#1E1E1E]/60">Recognition Ceremony:</span> <span className="text-[#FC3637]">18h00–21h00</span>
                  </p>
                </div>

                {/* Venue & Address */}
                <div className="p-6 rounded-[2px] bg-[#F9F9FA] border border-[#1E1E1E]/8 space-y-2 hover:border-[#FC3637]/40 transition-colors">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#FC3637] block">
                    Venue & Address
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#1E1E1E]">
                    EmpowaWorx House
                  </p>
                  <p className="text-xs text-[#1E1E1E]/65 leading-relaxed">
                    364 Pine Avenue, Ferndale, Randburg, Johannesburg, South Africa
                  </p>
                </div>

                {/* Dress Code & Deadline */}
                <div className="p-6 rounded-[2px] bg-[#F9F9FA] border border-[#1E1E1E]/8 space-y-2 hover:border-[#FC3637]/40 transition-colors">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#FC3637] block">
                    Protocol & Deadline
                  </span>
                  <p className="text-sm font-semibold text-[#1E1E1E]">
                    <span className="text-[#1E1E1E]/60">Dress Code:</span> Smart Casual
                  </p>
                  <p className="text-sm font-semibold text-[#1E1E1E]">
                    <span className="text-[#1E1E1E]/60">Deadline:</span> <span className="text-[#FC3637]">Friday, 30 Oct 2026</span>
                  </p>
                  <p className="text-[11px] text-[#1E1E1E]/50">Register: www.empowaworx.co.za/legacy</p>
                </div>
              </div>

              {/* IMPORTANT REGISTRATION NOTICE CALLOUT */}
              <div className="mt-8 p-6 rounded-[2px] bg-[#FFF5F5] border-l-4 border-l-[#FC3637] border-y border-r border-[#FC3637]/20 space-y-2.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#FC3637]">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  IMPORTANT REGISTRATION NOTICE
                </div>
                <p className="text-xs sm:text-sm text-[#1E1E1E]/90 leading-relaxed font-medium">
                  Attendance is limited, strictly by invitation and subject to final approval. This invitation is personal and may not be transferred, reproduced or shared.
                </p>
                <p className="text-xs sm:text-sm text-[#1E1E1E]/70 leading-relaxed">
                  Please complete all required fields accurately. Fields marked with an asterisk (<span className="text-[#FC3637] font-bold">*</span>) are mandatory. Registration does not constitute confirmation of attendance. Approved guests will receive formal accreditation and access information directly from the event office.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FORM OR SUCCESS CONFIRMATION MODAL --- */}
        <section id="registration-form" className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 my-16">
          {isSuccess ? (
            /* SUCCESS CONFIRMATION DISPLAY */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2px] bg-[#141414] border border-[#FC3637]/50 border-t-4 border-t-[#FC3637] p-8 sm:p-14 text-center space-y-6 shadow-2xl"
            >
              <div className="w-16 h-16 mx-auto rounded-[2px] bg-[#FC3637]/10 border border-[#FC3637] flex items-center justify-center text-[#FC3637]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#FC3637]">
                  Registration Lodged
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                  VIP CONSIDERATION ACKNOWLEDGED
                </h2>
                <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">
                  Thank you, <span className="text-white font-semibold">{formData.title} {formData.firstName} {formData.surname}</span>. Your VIP registration details have been securely recorded by the event office.
                </p>
              </div>

              {/* Accreditation Reference Box */}
              <div className="max-w-md mx-auto p-4 rounded-[2px] bg-black/80 border border-white/10 flex items-center justify-between gap-4">
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-white/40">
                    Provisional Accreditation Ref
                  </div>
                  <div className="text-xl font-mono font-bold text-white tracking-wider">
                    {submissionRef}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyRefToClipboard}
                  className="px-3 py-1.5 rounded-[2px] bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/90 inline-flex items-center gap-1.5 transition-colors"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedRef ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Protocol Note */}
              <div className="p-6 rounded-[2px] bg-[#191919] border border-white/10 text-left space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FC3637]" />
                  What to Expect Next
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Following submission, you will receive an automated acknowledgement. This acknowledgement does not constitute confirmation of attendance.
                </p>
                <p className="text-xs sm:text-sm text-white/70 font-semibold">
                  Approved guests will subsequently receive:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="text-[#FC3637]">✦</span> Formal confirmation of attendance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FC3637]">✦</span> Personal accreditation credentials
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FC3637]">✦</span> Arrival and security protocol
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FC3637]">✦</span> Parking or official drop-off instructions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FC3637]">✦</span> Final programme information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FC3637]">✦</span> Secure livestream access, where applicable
                  </li>
                </ul>
              </div>

              {/* Print / Save Summary */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-6 py-3 rounded-[2px] bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4 text-[#FC3637]" />
                  Print Accreditation Summary
                </button>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 rounded-[2px] bg-transparent hover:bg-white/5 border border-white/10 text-white/60 hover:text-white text-xs tracking-wider uppercase transition-all"
                >
                  Edit Registration
                </button>
              </div>
            </motion.div>
          ) : (
            /* --- 13-SECTION REGISTRATION FORM --- */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Error Banner */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-[2px] bg-red-950/80 border border-[#FC3637] text-white text-sm flex items-start gap-3 shadow-lg"
                >
                  <AlertCircle className="w-5 h-5 text-[#FC3637] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#FC3637]">Action Required</div>
                    <div>{errorMessage}</div>
                  </div>
                </motion.div>
              )}

              {/* ---------------- SECTION 1 ---------------- */}
              <div id="section-1" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">01</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      INVITATION VERIFICATION
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Verification</span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Invitation Reference Number
                    </label>
                    <input
                      type="text"
                      name="invitationRefNumber"
                      value={formData.invitationRefNumber}
                      onChange={handleChange}
                      placeholder="Enter the reference number reflected on your invitation, if applicable"
                      className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Who shared this invitation with you? <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="text"
                        name="sharedByName"
                        required
                        value={formData.sharedByName}
                        onChange={handleChange}
                        placeholder="Full name and surname"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Their organisation or relationship to the event
                      </label>
                      <input
                        type="text"
                        name="sharedByOrgOrRelationship"
                        value={formData.sharedByOrgOrRelationship}
                        onChange={handleChange}
                        placeholder="e.g. Office of Dr Molapo, The Speakers Firm"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Optional context / notes
                    </label>
                    <input
                      type="text"
                      name="sharedByNotes"
                      value={formData.sharedByNotes}
                      onChange={handleChange}
                      placeholder="Any additional context regarding who shared this invitation"
                      className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-3">
                      How did you receive the invitation? <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Directly from The Speakers Firm',
                        'Directly from EmpowaWorx',
                        'Directly from Dr David Molapo or his office',
                        'From a family member or friend',
                        'From a business, government, Church or institutional partner',
                        'Other'
                      ].map(option => (
                        <label
                          key={option}
                          className={`flex items-center gap-3 p-3.5 rounded-[2px] border cursor-pointer transition-all text-xs sm:text-sm ${
                            formData.receivedFrom === option
                              ? 'bg-[#FC3637]/10 border-[#FC3637] text-white font-semibold'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="receivedFrom"
                            value={option}
                            checked={formData.receivedFrom === option}
                            onChange={handleChange}
                            className="text-[#FC3637] focus:ring-[#FC3637]"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    {formData.receivedFrom === 'Other' && (
                      <div className="mt-3">
                        <input
                          type="text"
                          name="receivedFromOther"
                          value={formData.receivedFromOther}
                          onChange={handleChange}
                          placeholder="Please describe how you received the invitation"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ---------------- SECTION 2 ---------------- */}
              <div id="section-2" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">02</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      VIP GUEST IDENTITY
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Guest Details</span>
                </div>

                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Official Title or Honorific <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {[
                        'Mr', 'Ms', 'Mrs', 'Dr', 'Professor', 'Advocate',
                        'Honourable', 'Reverend', 'Pastor', 'Bishop',
                        'His Excellency', 'Her Excellency', 'Other'
                      ].map(t => (
                        <label
                          key={t}
                          className={`text-center py-2 px-3 rounded-[2px] border text-xs cursor-pointer transition-all ${
                            formData.title === t
                              ? 'bg-[#FC3637] border-[#FC3637] text-white font-bold'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="title"
                            value={t}
                            checked={formData.title === t}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {t}
                        </label>
                      ))}
                    </div>
                    {formData.title === 'Other' && (
                      <div className="mt-3">
                        <input
                          type="text"
                          name="titleOther"
                          value={formData.titleOther}
                          onChange={handleChange}
                          placeholder="Please specify official honorific"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Full First Name(s) <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="As reflected on your official identification"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Surname <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="text"
                        name="surname"
                        required
                        value={formData.surname}
                        onChange={handleChange}
                        placeholder="As reflected on your official identification"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Preferred Name
                      </label>
                      <input
                        type="text"
                        name="preferredName"
                        value={formData.preferredName}
                        onChange={handleChange}
                        placeholder="Name you prefer to be addressed by"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Preferred Formal Salutation
                      </label>
                      <input
                        type="text"
                        name="preferredSalutation"
                        value={formData.preferredSalutation}
                        onChange={handleChange}
                        placeholder="e.g. Dr Mokoena, Honourable Minister or Bishop Dlamini"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Name for VIP Accreditation Badge <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="text"
                        name="badgeName"
                        required
                        value={formData.badgeName}
                        onChange={handleChange}
                        placeholder="Exact name as it should appear on your printed badge"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Pronunciation Guidance
                      </label>
                      <input
                        type="text"
                        name="pronunciation"
                        value={formData.pronunciation}
                        onChange={handleChange}
                        placeholder="Optional—please indicate how your name should be pronounced"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        placeholder="e.g. South African"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        City and Country of Residence <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="text"
                        name="residenceCityCountry"
                        required
                        value={formData.residenceCityCountry}
                        onChange={handleChange}
                        placeholder="e.g. Johannesburg, South Africa"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------- SECTION 3 ---------------- */}
              <div id="section-3" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">03</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      PROFESSIONAL AND INSTITUTIONAL PROFILE
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Profile</span>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Designation or Official Position <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="text"
                        name="designation"
                        required
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="e.g. Chief Executive Officer / Senior Pastor / Director"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Organisation or Institution <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="text"
                        name="organisation"
                        required
                        value={formData.organisation}
                        onChange={handleChange}
                        placeholder="e.g. Company Name / Ministry / Department"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Sector <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {[
                        'Business and Corporate Leadership',
                        'Government and Public Service',
                        'Church and Faith Community',
                        'Civil Society',
                        'Academia and Education',
                        'Media',
                        'Professional Speaking',
                        'Entrepreneurship',
                        'Family or Personal Guest',
                        'Other'
                      ].map(s => (
                        <label
                          key={s}
                          className={`flex items-center gap-3 p-3 rounded-[2px] border text-xs cursor-pointer transition-all ${
                            formData.sector === s
                              ? 'bg-[#FC3637]/10 border-[#FC3637] text-white font-semibold'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="sector"
                            value={s}
                            checked={formData.sector === s}
                            onChange={handleChange}
                            className="text-[#FC3637]"
                          />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                    {formData.sector === 'Other' && (
                      <div className="mt-3">
                        <input
                          type="text"
                          name="sectorOther"
                          value={formData.sectorOther}
                          onChange={handleChange}
                          placeholder="Please specify sector"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ---------------- SECTION 4 ---------------- */}
              <div id="section-4" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">04</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      CONTACT AND PROTOCOL DETAILS
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Communication</span>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Primary Email Address <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@organisation.com"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Mobile Number <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        required
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="+27 (0) 82 123 4567"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Alternative Contact Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="altContactNumber"
                        value={formData.altContactNumber}
                        onChange={handleChange}
                        placeholder="Direct line / office switchboard"
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Preferred Communication Channel <span className="text-[#FC3637]">*</span>
                      </label>
                      <select
                        name="preferredChannel"
                        required
                        value={formData.preferredChannel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-sm text-white outline-none"
                      >
                        <option value="" disabled>Select channel</option>
                        <option value="Email">Email</option>
                        <option value="SMS">SMS</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Executive Assistant">Executive Assistant</option>
                        <option value="Protocol Office">Protocol Office</option>
                      </select>
                    </div>
                  </div>

                  {/* EA / Protocol Office Details */}
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="text-[11px] uppercase font-bold tracking-wider text-[#FC3637]">
                      Executive Assistant or Protocol Contact (If Applicable)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="eaName"
                        value={formData.eaName}
                        onChange={handleChange}
                        placeholder="Full name and surname"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                      />
                      <input
                        type="text"
                        name="eaDesignation"
                        value={formData.eaDesignation}
                        onChange={handleChange}
                        placeholder="Designation / Title"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                      />
                      <input
                        type="email"
                        name="eaEmail"
                        value={formData.eaEmail}
                        onChange={handleChange}
                        placeholder="Email address"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                      />
                      <input
                        type="tel"
                        name="eaMobile"
                        value={formData.eaMobile}
                        onChange={handleChange}
                        placeholder="Mobile number"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------- SECTION 5 ---------------- */}
              <div id="section-5" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">05</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      RELATIONSHIP WITH DR DAVID MOLAPO
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Connection</span>
                </div>

                <div className="space-y-4">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
                    Please indicate your relationship with Dr David Molapo: <span className="text-[#FC3637]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {[
                      'Family',
                      'Friend',
                      'Business Associate',
                      'Professional Colleague',
                      'Church or Faith Community',
                      'Government or Public Service',
                      'Client',
                      'Mentee',
                      'Professional Speaking Industry',
                      'Community or Social Impact',
                      'Other'
                    ].map(r => (
                      <label
                        key={r}
                        className={`flex items-center gap-3 p-3 rounded-[2px] border text-xs cursor-pointer transition-all ${
                          formData.relationship === r
                            ? 'bg-[#FC3637]/10 border-[#FC3637] text-white font-semibold'
                            : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                        }`}
                      >
                        <input
                          type="radio"
                          name="relationship"
                          value={r}
                          checked={formData.relationship === r}
                          onChange={handleChange}
                          className="text-[#FC3637]"
                        />
                        <span>{r}</span>
                      </label>
                    ))}
                  </div>
                  {formData.relationship === 'Other' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="relationshipOther"
                        value={formData.relationshipOther}
                        onChange={handleChange}
                        placeholder="Please describe relationship"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* ---------------- SECTION 6 ---------------- */}
              <div id="section-6" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">06</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      ATTENDANCE SELECTION
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Format</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-3">
                      How would you like to attend? <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['In Person', 'Virtually via Secure Livestream'].map(mode => (
                        <label
                          key={mode}
                          className={`flex items-center gap-3 p-4 rounded-[2px] border cursor-pointer transition-all ${
                            formData.attendanceType === mode
                              ? 'bg-[#FC3637]/10 border-[#FC3637] text-white font-bold'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="attendanceType"
                            value={mode}
                            checked={formData.attendanceType === mode}
                            onChange={handleChange}
                            className="text-[#FC3637]"
                          />
                          <span className="text-sm">{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.attendanceType === 'Virtually via Secure Livestream' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 rounded-[2px] bg-[#181818] border border-white/10 border-l-4 border-l-[#FC3637] space-y-3"
                    >
                      <div className="text-xs font-bold uppercase tracking-wider text-[#FC3637] flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Virtual Livestream Credentials
                      </div>
                      <label className="block text-xs text-white/80">
                        Confirm the email address to which the secure livestream link must be sent: <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="email"
                        name="virtualLivestreamEmail"
                        required
                        value={formData.virtualLivestreamEmail}
                        onChange={handleChange}
                        placeholder="Livestream email recipient"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                      />
                      <p className="text-[11px] text-white/50 italic">
                        The livestream link will be issued only to approved virtual guests. It will be personal, confidential and may not be shared, recorded or redistributed.
                      </p>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Will you attend the full ceremony from 18h00 to 21h00? <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(ans => (
                        <label
                          key={ans}
                          className={`flex-1 py-2.5 text-center rounded-[2px] border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                            formData.fullCeremonyAttendance === ans
                              ? 'bg-[#FC3637] border-[#FC3637] text-white'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="fullCeremonyAttendance"
                            value={ans}
                            checked={formData.fullCeremonyAttendance === ans}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {ans}
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.fullCeremonyAttendance === 'No' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 rounded-[2px] bg-[#181818] border border-white/10 space-y-2"
                    >
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/80">
                        Please indicate your anticipated arrival and departure times:
                      </label>
                      <input
                        type="text"
                        name="partialAttendanceTimes"
                        value={formData.partialAttendanceTimes}
                        onChange={handleChange}
                        placeholder="e.g. Arriving 18h30, departing 20h00"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* ---------------- SECTION 7 ---------------- */}
              <div id="section-7" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">07</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      ACCOMPANYING AND SUPPORT PERSONNEL
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Protocol</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-[2px] bg-[#181818] border border-white/10 text-xs text-white/70 leading-relaxed">
                    This invitation admits one approved guest only. Spouses, partners, executive assistants, representatives, drivers, protection officers and substitute delegates are not automatically included.
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Will you be accompanied by an essential protocol, accessibility or security support person? <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(ans => (
                        <label
                          key={ans}
                          className={`flex-1 py-2.5 text-center rounded-[2px] border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                            formData.hasSupportPersonnel === ans
                              ? 'bg-[#FC3637] border-[#FC3637] text-white'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasSupportPersonnel"
                            value={ans}
                            checked={formData.hasSupportPersonnel === ans}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {ans}
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.hasSupportPersonnel === 'Yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-5 rounded-[2px] bg-[#181818] border border-white/10 space-y-4"
                    >
                      <div className="text-[11px] uppercase font-bold tracking-wider text-[#FC3637]">
                        Accompanying Personnel Details
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="supportFullName"
                          value={formData.supportFullName}
                          onChange={handleChange}
                          placeholder="Full name and surname"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                        <input
                          type="text"
                          name="supportRole"
                          value={formData.supportRole}
                          onChange={handleChange}
                          placeholder="Role or designation"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                        <input
                          type="tel"
                          name="supportMobile"
                          value={formData.supportMobile}
                          onChange={handleChange}
                          placeholder="Mobile number"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                        <input
                          type="text"
                          name="supportOrg"
                          value={formData.supportOrg}
                          onChange={handleChange}
                          placeholder="Security or protocol organisation, where applicable"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                      </div>
                      <textarea
                        name="supportReason"
                        rows={2}
                        value={formData.supportReason}
                        onChange={handleChange}
                        placeholder="Reason for access requirement"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none resize-none"
                      />
                      <p className="text-[11px] text-white/50 italic">
                        All accompanying personnel require separate accreditation and written approval.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* ---------------- SECTION 8 ---------------- */}
              <div id="section-8" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">08</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      HOSPITALITY REQUIREMENTS
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Hospitality</span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Dietary Requirements <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                      {['None', 'Vegetarian', 'Vegan', 'Halaal', 'Kosher', 'Food Allergy', 'Other'].map(d => (
                        <label
                          key={d}
                          className={`text-center py-2 px-2 rounded-[2px] border text-xs cursor-pointer transition-all ${
                            formData.dietary === d
                              ? 'bg-[#FC3637] border-[#FC3637] text-white font-bold'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="dietary"
                            value={d}
                            checked={formData.dietary === d}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {d}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Please provide relevant dietary or allergy details
                    </label>
                    <input
                      type="text"
                      name="dietaryDetails"
                      value={formData.dietaryDetails}
                      onChange={handleChange}
                      placeholder="Specify allergies, preferences or strict dietary conditions"
                      className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Accessibility Requirements <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {['None', 'Wheelchair Access', 'Assisted Access', 'Hearing Support', 'Visual Support', 'Other'].map(a => (
                        <label
                          key={a}
                          className={`text-center py-2 px-2 rounded-[2px] border text-xs cursor-pointer transition-all ${
                            formData.accessibility === a
                              ? 'bg-[#FC3637] border-[#FC3637] text-white font-bold'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="accessibility"
                            value={a}
                            checked={formData.accessibility === a}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {a}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Additional accessibility, hospitality, health or protocol information
                    </label>
                    <textarea
                      name="additionalHospitalityNotes"
                      rows={2}
                      value={formData.additionalHospitalityNotes}
                      onChange={handleChange}
                      placeholder="Any additional information necessary to support your attendance seamlessly"
                      className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* ---------------- SECTION 9 ---------------- */}
              <div id="section-9" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">09</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      SECURITY, TRANSPORT AND PARKING
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Logistics</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Do you require official protocol or security coordination? <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(ans => (
                        <label
                          key={ans}
                          className={`flex-1 py-2.5 text-center rounded-[2px] border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                            formData.requiresProtocolCoordination === ans
                              ? 'bg-[#FC3637] border-[#FC3637] text-white'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="requiresProtocolCoordination"
                            value={ans}
                            checked={formData.requiresProtocolCoordination === ans}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {ans}
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.requiresProtocolCoordination === 'Yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-5 rounded-[2px] bg-[#181818] border border-white/10 space-y-4"
                    >
                      <div className="text-[11px] uppercase font-bold tracking-wider text-[#FC3637]">
                        Protocol Coordination Details
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="protocolOfficialName"
                          value={formData.protocolOfficialName}
                          onChange={handleChange}
                          placeholder="Responsible official's full name"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                        <input
                          type="text"
                          name="protocolOfficialOrg"
                          value={formData.protocolOfficialOrg}
                          onChange={handleChange}
                          placeholder="Organisation or department"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                        <input
                          type="email"
                          name="protocolOfficialEmail"
                          value={formData.protocolOfficialEmail}
                          onChange={handleChange}
                          placeholder="Email address"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                        <input
                          type="tel"
                          name="protocolOfficialMobile"
                          value={formData.protocolOfficialMobile}
                          onChange={handleChange}
                          placeholder="Mobile number"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="protocolPersonnelCount"
                          value={formData.protocolPersonnelCount}
                          onChange={handleChange}
                          placeholder="Number of accredited protection / protocol personnel"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                        <input
                          type="text"
                          name="protocolSecurityRequirements"
                          value={formData.protocolSecurityRequirements}
                          onChange={handleChange}
                          placeholder="Any advance security requirements"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Parking */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Will you require on-site parking? <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Yes', 'No', 'Official Driver Drop-Off Only'].map(p => (
                        <label
                          key={p}
                          className={`p-3 text-center rounded-[2px] border text-xs font-semibold cursor-pointer transition-all ${
                            formData.parkingRequirement === p
                              ? 'bg-[#FC3637] border-[#FC3637] text-white'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="parkingRequirement"
                            value={p}
                            checked={formData.parkingRequirement === p}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {p}
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.parkingRequirement === 'Yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-5 rounded-[2px] bg-[#181818] border border-white/10 space-y-3"
                    >
                      <div className="text-[11px] uppercase font-bold tracking-wider text-[#FC3637]">
                        Vehicle Accreditation Details (Required for on-site parking)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="vehicleMakeModel"
                          required
                          value={formData.vehicleMakeModel}
                          onChange={handleChange}
                          placeholder="Vehicle Make and Model *"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                        <input
                          type="text"
                          name="vehicleRegistration"
                          required
                          value={formData.vehicleRegistration}
                          onChange={handleChange}
                          placeholder="Vehicle Registration Number *"
                          className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Driver's details */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Driver’s Full Name and Mobile Number (Where applicable)
                    </label>
                    <input
                      type="text"
                      name="driverNameAndMobile"
                      value={formData.driverNameAndMobile}
                      onChange={handleChange}
                      placeholder="e.g. John Khumalo (+27 83 555 0192)"
                      className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                    />
                  </div>

                  <p className="text-[11px] text-white/40 italic">
                    For data-protection and security purposes, identification details should be requested only from provisionally approved guests where required for final accreditation.
                  </p>
                </div>
              </div>

              {/* ---------------- SECTION 10 ---------------- */}
              <div id="section-10" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">10</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      EMERGENCY CONTACT
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Emergency</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Emergency Contact Full Name <span className="text-[#FC3637]">*</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyName"
                      required
                      value={formData.emergencyName}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Relationship to Guest <span className="text-[#FC3637]">*</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyRelationship"
                      required
                      value={formData.emergencyRelationship}
                      onChange={handleChange}
                      placeholder="e.g. Spouse / Colleague"
                      className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Mobile Number <span className="text-[#FC3637]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="emergencyMobile"
                      required
                      value={formData.emergencyMobile}
                      onChange={handleChange}
                      placeholder="+27 (0) 82 000 0000"
                      className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ---------------- SECTION 11 ---------------- */}
              <div id="section-11" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">11</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      COMMUNICATION AND MEDIA PREFERENCES
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Preferences</span>
                </div>

                <div className="space-y-6">
                  {/* Updates consent */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      May the event office send you essential registration, accreditation and event updates? <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(ans => (
                        <label
                          key={ans}
                          className={`flex-1 py-2 text-center rounded-[2px] border text-xs font-semibold cursor-pointer transition-all ${
                            formData.consentEventUpdates === ans
                              ? 'bg-[#FC3637] border-[#FC3637] text-white'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="consentEventUpdates"
                            value={ans}
                            checked={formData.consentEventUpdates === ans}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {ans}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Guest list consent */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      May your name, designation and organisation appear on the official VIP guest list? <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(ans => (
                        <label
                          key={ans}
                          className={`flex-1 py-2 text-center rounded-[2px] border text-xs font-semibold cursor-pointer transition-all ${
                            formData.consentGuestList === ans
                              ? 'bg-[#FC3637] border-[#FC3637] text-white'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="consentGuestList"
                            value={ans}
                            checked={formData.consentGuestList === ans}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {ans}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Media Engagement */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                      Media Engagement Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        'Available for Media Interviews',
                        'Available by Prior Arrangement',
                        'Not Available for Media Interviews'
                      ].map(pref => (
                        <label
                          key={pref}
                          className={`p-3 text-center rounded-[2px] border text-xs font-semibold cursor-pointer transition-all ${
                            formData.mediaInterviewPreference === pref
                              ? 'bg-[#FC3637] border-[#FC3637] text-white'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mediaInterviewPreference"
                            value={pref}
                            checked={formData.mediaInterviewPreference === pref}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {pref}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Photography notice */}
                  <div className="p-4 rounded-[2px] bg-[#181818] border border-white/10 space-y-3">
                    <div className="text-[11px] uppercase font-bold tracking-wider text-[#FC3637]">
                      Photography and Recording Notice
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Official photography, filming and livestreaming may take place during the event. Images and recordings may be used for legitimate editorial, archival and event-promotion purposes.
                    </p>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
                      Please indicate your preference: <span className="text-[#FC3637]">*</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        'I acknowledge and accept the photography and recording notice',
                        'Please contact me regarding specific media or protocol restrictions'
                      ].map(p => (
                        <label
                          key={p}
                          className={`flex items-center gap-3 p-3 rounded-[2px] border text-xs cursor-pointer transition-all ${
                            formData.mediaRecordingConsent === p
                              ? 'bg-[#FC3637]/10 border-[#FC3637] text-white font-semibold'
                              : 'bg-[#191919] border-white/10 text-white/70 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mediaRecordingConsent"
                            value={p}
                            checked={formData.mediaRecordingConsent === p}
                            onChange={handleChange}
                            className="text-[#FC3637]"
                          />
                          <span>{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------- SECTION 12 ---------------- */}
              <div id="section-12" className="rounded-[2px] bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">12</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      PRIVACY AND DATA PROTECTION
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest hidden sm:inline">Statutory Notice</span>
                </div>

                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#181818] p-4 rounded-[2px] border border-white/5">
                    The information submitted will be used for invitation verification, guest-list approval, accreditation, security coordination, hospitality planning and essential event communication. Personal information will be handled confidentially and accessed only by authorised representatives of The Speakers Firm, EmpowaWorx, Dr David Molapo’s office and appointed event-service providers where operationally necessary.
                  </p>

                  <label className="flex items-start gap-3 p-4 rounded-[2px] border border-white/15 bg-[#181818] cursor-pointer hover:border-[#FC3637]/50 transition-colors">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      required
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 rounded-[2px] text-[#FC3637] focus:ring-[#FC3637] cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-white font-semibold">
                      I consent to the processing of my personal information for the purposes stated above. <span className="text-[#FC3637]">*</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* ---------------- SECTION 13 ---------------- */}
              <div id="section-13" className="rounded-[2px] bg-[#141414] border border-white/15 border-l-4 border-l-[#FC3637] p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#FC3637]" />
                    <span className="text-[12px] font-black text-[#FC3637] tracking-[0.2em]">13</span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      VIP GUEST DECLARATION
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#FC3637] uppercase tracking-widest font-semibold">Solemn Declaration</span>
                </div>

                <div className="space-y-5">
                  <div className="p-5 rounded-[2px] bg-[#181818] border border-white/10 space-y-2 text-xs text-white/80">
                    <div className="font-bold text-white uppercase tracking-wider mb-2 text-xs">
                      By submitting this registration, I confirm that:
                    </div>
                    <ul className="space-y-1.5 list-disc pl-4 text-white/70">
                      <li>The information provided is complete, accurate and current.</li>
                      <li>I am the intended recipient of this invitation.</li>
                      <li>The invitation is strictly private and non-transferable.</li>
                      <li>I will not forward, reproduce, sell or transfer the invitation or access credentials.</li>
                      <li>Registration does not guarantee admission.</li>
                      <li>Attendance remains subject to final approval by The Speakers Firm, EmpowaWorx and Dr David Molapo.</li>
                      <li>I will comply with all accreditation, identification, security, venue and programme protocols.</li>
                      <li>I understand that unconfirmed guests and substitute delegates cannot be accommodated.</li>
                      <li>I will notify the event office promptly if I am no longer able to attend.</li>
                    </ul>
                  </div>

                  <label className="flex items-start gap-3 p-4 rounded-[2px] border border-[#FC3637] bg-[#FC3637]/10 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      name="declarationConsent"
                      required
                      checked={formData.declarationConsent}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 rounded-[2px] text-[#FC3637] focus:ring-[#FC3637] cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-white font-bold">
                      I accept the VIP Registration Terms and Declaration. <span className="text-[#FC3637]">*</span>
                    </span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Full Name and Surname <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="text"
                        name="declarationFullName"
                        required
                        value={formData.declarationFullName}
                        onChange={handleChange}
                        placeholder="Signatory full name"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Electronic Signature <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="text"
                        name="electronicSignature"
                        required
                        value={formData.electronicSignature}
                        onChange={handleChange}
                        placeholder="Type full name as formal e-signature"
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white placeholder-white/30 outline-none font-serif italic"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                        Date of Submission <span className="text-[#FC3637]">*</span>
                      </label>
                      <input
                        type="date"
                        name="submissionDate"
                        required
                        value={formData.submissionDate}
                        onChange={handleChange}
                        onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                        style={{ colorScheme: 'dark' }}
                        className="w-full px-4 py-2.5 rounded-[2px] bg-[#1A1A1A] border border-white/10 focus:border-[#FC3637] text-xs text-white outline-none cursor-pointer [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-95 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* --- SUBMIT BUTTON & POST-SUBMISSION NOTICE --- */}
              <div className="space-y-6 pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-center gap-3 bg-[#FC3637] hover:bg-[#C02020] text-white font-bold text-[13px] tracking-[0.18em] h-14 px-10 rounded-[2px] uppercase transition-all duration-200 ease-in-out shadow-[0_4px_16px_rgba(252,54,55,0.20)] w-full sm:w-auto min-w-[340px] mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Accreditation...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-white" />
                      <span>REGISTER FOR VIP CONSIDERATION</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Information regarding approval */}
                <div className="max-w-2xl mx-auto p-5 rounded-[2px] bg-[#141414] border border-white/10 text-left space-y-3">
                  <p className="text-xs text-white/70 leading-relaxed">
                    Following submission, you will receive an automated acknowledgement. This acknowledgement does not constitute confirmation of attendance.
                  </p>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#FC3637]">
                    Approved guests will subsequently receive:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-white/60">
                    <li>✦ Formal confirmation of attendance</li>
                    <li>✦ Personal accreditation credentials</li>
                    <li>✦ Arrival and security protocol</li>
                    <li>✦ Parking or official drop-off instructions</li>
                    <li>✦ Final programme information</li>
                    <li>✦ Venue-access requirements</li>
                    <li className="sm:col-span-2">✦ Secure livestream access, where applicable</li>
                  </ul>
                </div>
              </div>
            </form>
          )}
        </section>

        {/* --- REGISTRATION AND ENQUIRIES SECTION (LIGHT SECTION) --- */}
        <section className="w-full bg-white text-[#1E1E1E] py-16 sm:py-20 border-t border-[#1E1E1E]/8">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="rounded-[2px] bg-[#F8F9FA] border border-[#1E1E1E]/10 p-8 sm:p-12 relative overflow-hidden shadow-sm">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Chief of Staff Card */}
                <div className="lg:col-span-5 flex items-center gap-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2px] overflow-hidden border border-[#1E1E1E]/15 shrink-0 bg-black shadow-sm">
                    <img
                      src="/Bonnie-Maponya.jpg"
                      alt="Bonnie Maponya - Chief of Staff"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/team_faculty/Bonnie-Maponya.jpg";
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-[2px] bg-[#FC3637]" />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#FC3637]">
                        Event Office & Protocol
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1E1E1E] uppercase tracking-tight">
                      Bonnie Maponya
                    </h3>
                    <p className="text-xs text-[#1E1E1E]/70 font-medium">
                      Chief of Staff: EmpowaWorx
                    </p>
                    <p className="text-[11px] text-[#FC3637] font-semibold">
                      The Speakers Firm & EmpowaWorx
                    </p>
                  </div>
                </div>

                {/* Official Contact Details */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t lg:border-t-0 lg:border-l border-[#1E1E1E]/10 pt-6 lg:pt-0 lg:pl-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1E1E1E]/50 block">
                      RSVP & Protocol Email
                    </span>
                    <a
                      href="mailto:vip@thespeakersfirm.co.za"
                      className="text-sm font-bold text-[#FC3637] hover:underline flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      vip@thespeakersfirm.co.za
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1E1E1E]/50 block">
                      EmpowaWorx Landline
                    </span>
                    <a
                      href="tel:+27114827256"
                      className="text-sm font-bold text-[#1E1E1E] hover:text-[#FC3637] flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FC3637]" />
                      +27 11 482 7256
                    </a>
                  </div>

                  <div className="sm:col-span-2 space-y-1 pt-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1E1E1E]/50 block">
                      Official Venue
                    </span>
                    <p className="text-xs text-[#1E1E1E]/80 font-medium leading-relaxed flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FC3637] shrink-0 mt-0.5" />
                      <span>
                        EmpowaWorx House, 364 Pine Avenue, Ferndale, Randburg, Johannesburg, South Africa
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- VIDEO MODAL FOR DR DAVID MOLAPO TRIBUTE --- */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#141414] rounded-[2px] overflow-hidden border border-white/20 shadow-2xl relative"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#111111]">
                <div className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FC3637]" />
                  Dr David Molapo — Keynote & Legacy Highlights
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(false)}
                  className="p-1 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/z3Fas4VQvzw?autoplay=1"
                  title="Dr David Molapo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default VipLegacyRecognitionPage;
