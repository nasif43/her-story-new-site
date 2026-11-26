import React, { useState, useEffect } from 'react';
import { PhotoCarousel } from './Carousel';
import { TRANSLATIONS } from '../data/translations';
import {
  Calendar,
  MapPin,
  Ticket,
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  Instagram,
  Vote,
  Heart,
  ShieldCheck,
  FileSpreadsheet,
  Copy,
  Check,
  UserCheck
} from 'lucide-react';
import {
  submitVoteToSheet,
  submitSignupToSheet,
  submitOrderToSheet,
  fetchSheetData,
  signInWithGoogle,
  createGoogleSheet,
  SheetDataResponse
} from '../lib/googleSheets';

interface ProjectLadylandViewProps {
  onGoHome?: () => void;
  lang?: 'EN' | 'BN';
  onSetLang?: (lang: 'EN' | 'BN') => void;
}

export const ProjectLadylandView: React.FC<ProjectLadylandViewProps> = ({
  onGoHome,
  lang: externalLang,
  onSetLang: externalSetLang
}) => {
  // Audio & Video Modal state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [heroVideoModalOpen, setHeroVideoModalOpen] = useState(false);

  // Real Novella Audio Player state
  const [novellaAudioPlaying, setNovellaAudioPlaying] = useState(false);
  const [novellaAudioOpen, setNovellaAudioOpen] = useState(false);
  const [novellaAudioTime, setNovellaAudioTime] = useState(0);
  const [novellaAudioDuration, setNovellaAudioDuration] = useState(0);
  const [novellaVolume, setNovellaVolume] = useState(0.85);
  const [novellaMuted, setNovellaMuted] = useState(false);
  const novellaAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggleNovellaAudio = () => {
    if (!novellaAudioRef.current) return;
    if (novellaAudioPlaying) {
      novellaAudioRef.current.pause();
    } else {
      setNovellaAudioOpen(true);
      novellaAudioRef.current.play().catch(err => console.warn('Audio play failed:', err));
    }
  };

  const formatAudioTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    const audio = novellaAudioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setNovellaAudioTime(audio.currentTime);
    const onLoadedMetadata = () => setNovellaAudioDuration(audio.duration || 0);
    const onEnded = () => setNovellaAudioPlaying(false);
    const onPlay = () => setNovellaAudioPlaying(true);
    const onPause = () => setNovellaAudioPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHeroVideoModalOpen(false);
        setSheetModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Web Audio Ambient Synthesizer
  useEffect(() => {
    if (!isPlayingAudio) return;

    let ctx: AudioContext | null = null;
    let osc1: OscillatorNode | null = null;
    let osc2: OscillatorNode | null = null;
    let gain: GainNode | null = null;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        ctx = new AudioCtx();
        osc1 = ctx.createOscillator();
        osc2 = ctx.createOscillator();
        gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(220, ctx.currentTime); // A3 drone
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(329.63, ctx.currentTime); // E4 harmonic

        gain.gain.setValueAtTime(0.04, ctx.currentTime); // gentle ambient sound

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
      }
    } catch (e) {
      console.warn('Audio Context:', e);
    }

    return () => {
      try {
        if (osc1) osc1.stop();
        if (osc2) osc2.stop();
        if (ctx) ctx.close();
      } catch (e) {}
    };
  }, [isPlayingAudio]);

  // Language state
  const [internalLang, setInternalLang] = useState<'EN' | 'BN'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toUpperCase();
      if (urlLang === 'BN' || urlLang === 'EN') {
        return urlLang;
      }
    }
    return 'BN';
  });

  const lang = externalLang || internalLang;

  const handleSetLang = (newLang: 'EN' | 'BN') => {
    if (externalSetLang) {
      externalSetLang(newLang);
    } else {
      setInternalLang(newLang);
    }
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Google Sheets state
  const [sheetModalOpen, setSheetModalOpen] = useState(false);
  const [sheetData, setSheetData] = useState<SheetDataResponse | null>(null);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [customSheetUrl, setCustomSheetUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Interactive Vote State
  const [hasVoted, setHasVoted] = useState<false | 'GRANT' | 'DENY'>(false);
  const [voteCounts, setVoteCounts] = useState({ grant: 0, deny: 0 });
  const [voteSubmittedToSheet, setVoteSubmittedToSheet] = useState(false);

  // Ticket Modal State
  
  
  
  
  
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  
  

  // Dreamer Kit Modal State
  const [kitModalOpen, setKitModalOpen] = useState(false);
  const [kitName, setKitName] = useState('');
  const [kitAddress, setKitAddress] = useState('');
  const [kitPhone, setKitPhone] = useState('');
  const [kitEmail, setKitEmail] = useState('');
  const [kitQty, setKitQty] = useState(1);
  const [kitOrdered, setKitOrdered] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
    const [expandedPillow, setExpandedPillowState] = useState<string | null>(null);

  useEffect(() => {
        (window as any).setExpandedPillow = setExpandedPillowState;
    return () => {
            delete (window as any).setExpandedPillow;
    };
  }, []);


  // Fetch Live Google Sheet Data on mount
  useEffect(() => {
    fetchSheetData()
      .then((data) => {
        setSheetData(data);
        if (data.summary) {
          setVoteCounts({
            grant: data.summary.grantVotes,
            deny: data.summary.denyVotes
          });
        }
      })
      .catch((err) => console.log('Sheet API:', err));
  }, []);

  // Handle voting and save to response sheet
  const handleVote = async (choice: 'GRANT' | 'DENY') => {
    if (hasVoted) return;
    setHasVoted(choice);
    const newGrant = choice === 'GRANT' ? voteCounts.grant + 1 : voteCounts.grant;
    const newDeny = choice === 'DENY' ? voteCounts.deny + 1 : voteCounts.deny;
    setVoteCounts({ grant: newGrant, deny: newDeny });
    setVoteSubmittedToSheet(true);

    try {
      const res = await submitVoteToSheet(choice, googleUser?.email || 'web-voter');
      if (res?.spreadsheetUrl) {
        setCustomSheetUrl(res.spreadsheetUrl);
      }
      const updated = await fetchSheetData();
      setSheetData(updated);
    } catch (e) {
      console.log('Saved to sheet buffer:', choice);
    }
  };

  const totalVotes = voteCounts.grant + voteCounts.deny;
  const grantPercent = totalVotes > 0 ? Math.round((voteCounts.grant / totalVotes) * 100) : 0;
  const denyPercent = totalVotes > 0 ? Math.round((voteCounts.deny / totalVotes) * 100) : 0;

  // Handle Google Sign-In and Sheet Creation
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      setGoogleUser(result.user);
    } catch (err: any) {
      console.error('Google Auth Failed:', err);
    }
  };

  const handleCreateCustomSheet = async () => {
    if (!googleUser) {
      await handleGoogleSignIn();
    }
    try {
      setIsCreatingSheet(true);
      const res = await createGoogleSheet('Project Ladyland Responses - HerStory Foundation');
      if (res.spreadsheetUrl) {
        setCustomSheetUrl(res.spreadsheetUrl);
      }
      const updated = await fetchSheetData();
      setSheetData(updated);
    } catch (err: any) {
      console.error('Sheet creation error:', err);
    } finally {
      setIsCreatingSheet(false);
    }
  };

  // Handle ticket booking
  // Handle Kit Order — activates email directed to sister@herstorybd.org & logs to Google Sheet
  const handleKitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setKitOrdered(true);

    try {
      await submitOrderToSheet({
        name: kitName,
        email: kitEmail,
        address: kitAddress,
        phone: kitPhone,
        qty: kitQty
      });
      const updated = await fetchSheetData();
      setSheetData(updated);
    } catch (err) {}

    // Trigger email client to sister@herstorybd.org
    const mailSubject = encodeURIComponent(`Order - The Case of the Dreamer (${kitQty} set${kitQty > 1 ? 's' : ''})`);
    const mailBody = encodeURIComponent(
      `Hello HerStory Team,\n\nI would like to order "The Case of the Dreamer" pillow case set.\n\nOrder Details:\nName: ${kitName}\nQuantity: ${kitQty} set(s)\nDelivery Address: ${kitAddress}\nPhone: ${kitPhone}\nEmail: ${kitEmail || 'N/A'}\n\nThank you!`
    );
    window.location.href = `mailto:sister@herstorybd.org?subject=${mailSubject}&body=${mailBody}`;
  };

  // Direct trigger email for Order
  const triggerDirectOrderEmail = () => {
    const mailSubject = encodeURIComponent('Order - The Case of the Dreamer');
    const mailBody = encodeURIComponent('Hi HerStory Team,\n\nI am interested in ordering "The Case of the Dreamer" pillow case set (৳2,500/set). Please provide payment and delivery details.\n\nName:\nDelivery Address:\nPhone:\n');
    window.location.href = `mailto:sister@herstorybd.org?subject=${mailSubject}&body=${mailBody}`;
  };

  // Handle Newsletter — logs email to Google Sheet
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);

    try {
      await submitSignupToSheet(newsletterEmail);
      const updated = await fetchSheetData();
      setSheetData(updated);
    } catch (e) {}

    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  // Scroll effect for atmosphere background
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollPercent(window.scrollY / total);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-transparent text-[#e2e1f0] min-h-screen relative font-inter overflow-x-hidden pb-24">
      {/* Atmospheric Dynamic Background Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000 ease-in-out"
        style={{
          background:
            scrollPercent < 0.25
              ? 'radial-gradient(circle at 50% 20%, rgba(255, 176, 205, 0.15) 0%, rgba(2, 2, 8, 0.45) 70%)'
              : scrollPercent < 0.65
              ? 'radial-gradient(circle at 50% 50%, rgba(0, 219, 233, 0.15) 0%, rgba(17, 19, 29, 0.5) 75%)'
              : 'radial-gradient(circle at 50% 80%, rgba(185, 195, 255, 0.15) 0%, rgba(2, 2, 8, 0.55) 80%)'
        }}
      />


      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 pt-8 sm:pt-10 md:pt-12 space-y-16 sm:space-y-20">
        {/* Section 1: Hero Image */}
        <section className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#0a0c16]">
          <img
            src="/images/ladyland/tickify-ticket-head.jpg"
            alt="Project Ladyland 2026 - HerStory Foundation"
            className="w-full h-auto object-contain mx-auto block"
          />
        </section>

        {/* Section 2: Narrative & Performance Details (matching home page design language) */}
        <section id="section-story" className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-6 sm:p-10 md:p-12 bg-[#0a0c16]/90 shadow-2xl">
          <div className="relative z-20 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Badge, Title & Body Text */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="px-4 py-1 rounded-full bg-[#ff45a2]/20 border border-[#ff45a2]/40 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space text-xs sm:text-sm font-bold uppercase tracking-widest">
                    {TRANSLATIONS.hero_immersive[lang]}
                  </span>

                  {/* Language Toggle */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 font-space text-xs sm:text-sm shadow-inner">
                    <button
                      onClick={() => handleSetLang('EN')}
                      className={`min-h-[36px] px-2.5 flex items-center justify-center font-bold transition-colors cursor-pointer rounded-full ${
                        lang === 'EN'
                          ? 'text-[#b9c3ff] bg-white/10 drop-shadow-[0_0_8px_rgba(185,195,255,0.8)]'
                          : 'text-white/60 hover:text-white'
                      }`}
                      aria-label="Switch to English"
                    >
                      EN
                    </button>
                    <span className="opacity-30">/</span>
                    <button
                      onClick={() => handleSetLang('BN')}
                      className={`min-h-[36px] px-2.5 flex items-center justify-center font-bold transition-colors cursor-pointer rounded-full ${
                        lang === 'BN'
                          ? 'text-white bg-white/10 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                          : 'text-white/60 hover:text-white'
                      }`}
                      aria-label="Switch to Bangla"
                    >
                      বাংলা
                    </button>
                  </div>
                </div>

                <h1 className="font-space text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ffb0cd] to-[#00dbe9] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-tight">
                  {TRANSLATIONS.hero_title[lang]}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/95 font-inter leading-relaxed font-light drop-shadow-md">
                  {TRANSLATIONS.hero_description[lang]}
                </p>
              </div>

              {/* Right Column: Upcoming Performances Ticket Card */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 sm:p-7 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[#00dbe9] font-space text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      {lang === 'EN' ? 'Upcoming Performances' : 'আসন্ন প্রদর্শনীসমূহ'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ff45a2]/20 border border-[#ff45a2]/30 text-white text-[10px] font-space font-bold uppercase tracking-wider">
                      Live Shows
                    </span>
                  </div>

                  {/* Dec 10 Free Show */}
                  <div className="space-y-3.5 pb-4 border-b border-white/10">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-[#b9c3ff] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white/70 text-[11px] uppercase font-space block tracking-wider">
                          {lang === 'EN' ? 'Date' : 'তারিখ'}
                        </span>
                        <span className="text-white font-bold text-sm sm:text-base">
                          {lang === 'EN' ? 'December 10, 2026' : '১০ ডিসেম্বর, ২০২৬'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-center text-xs text-white/80 font-inter">
                        {lang === 'EN'
                          ? 'Free show with English translation provided'
                          : 'ফ্রি প্রদর্শনী • ইংরেজি অনুবাদসহ'}
                      </p>
                      <a
                        href="https://ladyland.tickify.live/register"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[48px] text-center justify-center bg-gradient-to-r from-[#ff45a2] to-[#D64E0E] hover:from-[#ff5eb0] hover:to-[#e55a17] text-white px-6 py-3.5 rounded-full font-space font-bold text-sm uppercase tracking-widest border border-white/30 shadow-[0_0_24px_rgba(255,69,162,0.45)] hover:shadow-[0_0_32px_rgba(255,69,162,0.65)] cursor-pointer inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
                      >
                        <span>{lang === 'EN' ? 'REGISTER (DEC 10)' : 'নিবন্ধন (১০ ডিসেম্বর)'}</span>
                        <ExternalLink className="w-4 h-4 shrink-0" />
                      </a>
                    </div>
                  </div>

                  {/* Dec 11 Paid Show */}
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-[#b9c3ff] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-white/70 text-[11px] uppercase font-space block tracking-wider">
                            {lang === 'EN' ? 'Date & Time' : 'তারিখ ও সময়'}
                          </span>
                          <span className="text-white font-bold text-sm sm:text-base">
                            {TRANSLATIONS.next_perf_datetime[lang]}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#ffb0cd] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-white/70 text-[11px] uppercase font-space block tracking-wider">
                            {lang === 'EN' ? 'Venue' : 'ভেন্যু'}
                          </span>
                          <span className="text-white font-bold text-sm sm:text-base">
                            {TRANSLATIONS.next_perf_venue[lang]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://tickify.live/o/tickify/project-ladyland"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[48px] text-center justify-center bg-gradient-to-r from-[#ff45a2] to-[#D64E0E] hover:from-[#ff5eb0] hover:to-[#e55a17] text-white px-6 py-3.5 rounded-full font-space font-bold text-sm uppercase tracking-widest border border-white/30 shadow-[0_0_24px_rgba(255,69,162,0.45)] hover:shadow-[0_0_32px_rgba(255,69,162,0.65)] cursor-pointer inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <span>{lang === 'EN' ? 'BUY TICKET (DEC 11)' : 'টিকিট কাটুন (১১ ডিসেম্বর)'}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Ambient design layers */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            <div className="blob w-[380px] h-[380px] bg-[#ffb0cd]/20 top-10 -left-20 animate-pulse" />
            <div className="blob w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] bg-[#00dbe9]/10 bottom-10 -right-8 sm:-right-20 animate-pulse" />
          </div>
        </section>

        {/* Section 3: Performance Video Trailer */}
        <section id="section-video" className="scroll-mt-24 space-y-6 max-w-5xl mx-auto w-full">
          <div className="space-y-2">
            <span className="text-[#ffb0cd] font-space text-xs font-bold uppercase tracking-widest block">
              {lang === 'EN' ? 'OFFICIAL PREVIEW' : 'অফিসিয়াল প্রিভিউ'}
            </span>
            <h2 className="font-space text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {lang === 'EN' ? 'Project Ladyland 1905 Preview' : 'প্রজেক্ট লেডিল্যান্ড ১৯০৫ প্রিভিউ'}
            </h2>
          </div>
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
            <iframe
              className="w-full h-full border-0 absolute inset-0"
              src="https://www.youtube.com/embed/DpHQS6kx9mM"
              title="Project Ladyland 1905 Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Repeated Ticket CTAs after Video */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <p className="text-center md:text-left text-xs text-white/85 font-inter">
                {lang === 'EN'
                  ? 'Dec 10 • Free show with English translation provided'
                  : '১০ ডিসেম্বর • ফ্রি প্রদর্শনী (ইংরেজি অনুবাদসহ)'}
              </p>
              <a
                href="https://ladyland.tickify.live/register"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] text-center justify-center bg-gradient-to-r from-[#ff45a2] to-[#D64E0E] hover:from-[#ff5eb0] hover:to-[#e55a17] text-white px-6 py-3.5 rounded-full font-space font-bold text-sm uppercase tracking-widest border border-white/30 shadow-[0_0_24px_rgba(255,69,162,0.45)] hover:shadow-[0_0_32px_rgba(255,69,162,0.65)] cursor-pointer inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>{lang === 'EN' ? 'REGISTER (DEC 10)' : 'নিবন্ধন (১০ ডিসেম্বর)'}</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-center md:text-left text-xs text-white/85 font-inter">
                {lang === 'EN'
                  ? 'Dec 11, 7:00 PM • Bangladesh Shilpakala Academy'
                  : '১১ ডিসেম্বর, সন্ধ্যা ৭টা • বাংলাদেশ শিল্পকলা একাডেমি'}
              </p>
              <a
                href="https://tickify.live/o/tickify/project-ladyland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] text-center justify-center bg-gradient-to-r from-[#ff45a2] to-[#D64E0E] hover:from-[#ff5eb0] hover:to-[#e55a17] text-white px-6 py-3.5 rounded-full font-space font-bold text-sm uppercase tracking-widest border border-white/30 shadow-[0_0_24px_rgba(255,69,162,0.45)] hover:shadow-[0_0_32px_rgba(255,69,162,0.65)] cursor-pointer inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>{lang === 'EN' ? 'BUY TICKET (DEC 11)' : 'টিকিট কাটুন (১১ ডিসেম্বর)'}</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </section>

        {/* Section 4: Archival Photo Gallery */}
        <section id="section-gallery" className="scroll-mt-24 mb-16 space-y-6 relative">
          <div className="max-w-7xl mx-auto space-y-2">
            <span className="text-[#00dbe9] font-space text-xs font-bold uppercase tracking-widest block">
              {lang === 'EN' ? 'PRODUCTION STILLS' : 'প্রযোজনা স্থিরচিত্র'}
            </span>
            <h2 className="font-space text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {lang === 'EN' ? 'Image Gallery' : 'ছবি গ্যালারি'}
            </h2>
          </div>
          <PhotoCarousel images={Array.from({length: 25}, (_, i) => `/images/carousel/Project Ladyland 2026_PC Shadab Shahrokh Hai for HerStory Foundation_${i+1}.jpg`)} />
        </section>


        {/* 3. "WHAT FUTURE DO WE WANT?" Banner & Reimagining */}
        <section id="section-synopsis" className="scroll-mt-24 space-y-16">
          <div className="py-12 px-6 rounded-3xl bg-gradient-to-r from-[#ff45a2]/20 via-[#00dbe9]/20 to-[#b9c3ff]/20 border border-white/15 text-center relative overflow-hidden backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-space font-bold text-white tracking-widest uppercase glow-text">
              {TRANSLATIONS.future_question[lang]}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space text-xs font-bold uppercase tracking-widest block">
                {TRANSLATIONS.dream_reimagining[lang]}
              </span>
              <h3 className="text-3xl md:text-4xl font-space font-bold text-white">
                {TRANSLATIONS.reimagining_title[lang]}
              </h3>
              <p className="text-base md:text-lg text-[#c4c5da] leading-relaxed">
                {TRANSLATIONS.reimagining_desc[lang]}
              </p>
              {/* Bengali Poem Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-serif-editorial text-center shadow-lg">
                <p className="text-xl md:text-2xl italic leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-[#b9c3ff] via-[#00dbe9] to-[#ffb0cd] animate-pulse">
                  সুলতানা দেখেন স্বপ্নে নারীর-ও ক্ষমতা,<br />
                  পুরুষ থাকে ঘরে বন্দী, মনে বড় ব্যথা।<br />
                  শতবছর পরে চলেন নতুন করে দেখি<br />
                  ভেদাভেদ ঘুঁচল, নাকি রয়ে গেল এক-ই।<br />
                  চলেন তবে পালা শুরু করি এইক্ষণে<br />
                  অনুমতি দেন যদি এই অভাজনে।
                </p>
                <span className="text-xs font-space text-[#c4c5da] uppercase tracking-widest block pt-2">
                  — Prologue Verse, Project Ladyland
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#ffb0cd]/10 blur-2xl rounded-full" />
              <div className="glass-panel p-3 rounded-2xl relative aspect-square rotate-2 overflow-hidden border border-white/20 shadow-2xl">
                <img
                  alt="Ladyland Atmosphere Performance"
                  className="w-full h-full object-cover rounded-xl opacity-90 hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0m01sAk1Wk-6KJ-TsiNecbn0fMlLe5s5pxaZ7OHB9Vzg_Zwk_WdQ4f19jBCCl3X_S0d1Hxw9CYNklm9_BOtUyxqaIwAzaM_TxYNThDRPd94bUg9twvzPQEV-GxSE27Isy1tat0c3zRp7uptwTstnHyktTkMZ4uuRN4JORlIsT4XMghR11hHExFgSieG22EvL0vjNPqlJCFqKvVcnj5eUceEydNnLmVgfdMhd8W9tDSyJZXVyu2La1nWttuvn_XHWITZVkGd-bwCHB"
                />
              </div>
            </div>
          </div>

          {/* {TRANSLATIONS.where_title[lang]} */}
          </section>
        
        <section id="section-vote" className="scroll-mt-24">
          <div className="glass-panel p-5 sm:p-10 md:p-16 rounded-3xl text-center space-y-8 relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="space-y-3">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space text-xs font-bold uppercase tracking-widest block">
                {TRANSLATIONS.participatory_decision[lang]}
              </span>
              <h3 className="text-3xl sm:text-5xl font-space font-bold text-white">
                {TRANSLATIONS.final_choice[lang]}
              </h3>
              <p className="text-base sm:text-lg text-[#c4c5da] max-w-2xl mx-auto">
                {TRANSLATIONS.vote_question[lang]}
              </p>
            </div>

            {/* Voting Buttons or Results */}
            {!hasVoted ? (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
                <button
                  onClick={() => handleVote('GRANT')}
                  className="amorphous-btn w-full sm:w-auto px-10 py-4 text-[#00228a] font-space font-bold text-sm uppercase tracking-widest neon-box-glow cursor-pointer"
                >
                  {TRANSLATIONS.vote_grant[lang]}
                </button>

                <span className="text-white/40 font-space italic text-sm">{TRANSLATIONS.vote_or[lang]}</span>

                <button
                  onClick={() => handleVote('DENY')}
                  className="amorphous-btn w-full sm:w-auto px-10 py-4 text-[#00228a] font-space font-bold text-sm uppercase tracking-widest pink-neon-glow cursor-pointer"
                >
                  {TRANSLATIONS.vote_deny[lang]}
                </button>
              </div>
            ) : (
              <div className="max-w-xl mx-auto space-y-6 pt-4 animate-in fade-in duration-500">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-[#00dbe9] font-space text-xs sm:text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  <span>Your vote ({hasVoted === 'GRANT' ? 'Granting' : 'Denying'} Night Rights) has been saved to the official sheet ledger!</span>
                </div>

                <div className="space-y-4 font-space text-xs">
                  <div>
                    <div className="flex justify-between text-white font-bold mb-1">
                      <span>{TRANSLATIONS.vote_grant[lang]}</span>
                      <span>{grantPercent}% ({voteCounts.grant} votes)</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00dbe9] to-[#b9c3ff] transition-all duration-1000"
                        style={{ width: `${grantPercent}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white font-bold mb-1">
                      <span>{TRANSLATIONS.vote_deny[lang]}</span>
                      <span>{denyPercent}% ({voteCounts.deny} votes)</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff45a2] to-[#ffb0cd] transition-all duration-1000"
                        style={{ width: `${denyPercent}%` }}
                      />
                    </div>
                  </div>
                </div>


              </div>
            )}
          </div>
        </section>
        
        <section className="scroll-mt-24 space-y-16">
          <div className="glass-panel p-8 md:p-12 rounded-3xl space-y-8 border border-white/10">
            <div className="space-y-4">
              <h4 className="text-2xl md:text-3xl font-space font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] uppercase tracking-wider neon-text-glow">
                {TRANSLATIONS.where_title[lang]}
              </h4>
              <p className="text-base md:text-lg text-[#c4c5da] leading-relaxed font-inter">
                {TRANSLATIONS.where_desc[lang]}
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
              <img
                src="/ladyland-header.png"
                alt="Project Ladyland Shadow Puppet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020208] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </section>
        
        
        {/* PRESS SECTION */}
        <section className="scroll-mt-24 mb-16">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-3xl font-space font-bold text-white mb-8 neon-text-glow">Press & Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="https://www.nutshelltoday.com/article/project-ladyland-sultana-reboot" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-transform hover:-translate-y-2 block overflow-hidden group">
                <div className="aspect-video w-full overflow-hidden">
                  <img src="https://www.nutshelltoday.com/article/project-ladyland-sultana-reboot/opengraph-image?v=2026-08-17T06%3A54%3A51.334Z" alt="Lucid Dreaming" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h4 className="text-[#00dbe9] font-space font-bold text-lg mb-2 leading-tight">Lucid Dreaming</h4>
                  <p className="text-xs text-[#c4c5da] uppercase font-space">Nutshell Today</p>
                </div>
              </a>
              <a href="https://www.tbsnews.net/splash/project-ladyland-sultana-dreams-again-121-years-later-1515161" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-transform hover:-translate-y-2 block overflow-hidden group">
                <div className="aspect-video w-full overflow-hidden">
                  <img src="https://www.tbsnews.net/sites/default/files/styles/social_share/public/images/2026/08/14/project_ladyland_2026_pc_shadab_shahrokh_hai_for_herstory_foundation_2.jpg" alt="Project Ladyland: Sultana dreams again" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h4 className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space font-bold text-lg mb-2 leading-tight">Project Ladyland: Sultana dreams again, 121 years later</h4>
                  <p className="text-xs text-[#c4c5da] uppercase font-space">The Business Standard</p>
                </div>
              </a>
              <a href="https://tob.news/in-lady-land-the-tables-turn/" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-transform hover:-translate-y-2 block overflow-hidden group">
                <div className="aspect-video w-full overflow-hidden">
                  <img src="https://tob.news/wp-content/uploads/2026/08/Project-Lady-Land-1.jpg" alt="In Lady Land, the tables turn" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h4 className="text-[#b9c3ff] font-space font-bold text-lg mb-2 leading-tight">In Lady Land, the tables turn</h4>
                  <p className="text-xs text-[#c4c5da] uppercase font-space">TOB News</p>
                </div>
              </a>
              <a href="https://www.newagebd.net/post/theatre/309897/project-ladyland-2026-satirises-sunset-law" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-transform hover:-translate-y-2 block overflow-hidden group">
                <div className="aspect-video w-full overflow-hidden">
                  <img src="https://outspoken.newagebd.com/files/img/202608/b1bacf8a49cf087ba58de1275dd2e7be_og.jpg" alt="Project Ladyland 2026 satirises Sunset Law" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h4 className="text-[#ff45a2] font-space font-bold text-lg mb-2 leading-tight">Project Ladyland 2026 satirises Sunset Law</h4>
                  <p className="text-xs text-[#c4c5da] uppercase font-space">New Age</p>
                </div>
              </a>
            </div>
          </div>
        </section>
    
        
        <section id="section-dreamer-kit" className="scroll-mt-24">
          <div className="glass-panel p-8 md:p-14 rounded-3xl text-center space-y-8 border border-white/10 shadow-2xl">
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[#00dbe9] font-space text-xs font-bold uppercase tracking-widest block">
                {TRANSLATIONS.merchandise_tag[lang]}
              </span>
              <h2 className="text-3xl sm:text-5xl font-space font-bold text-white">
                The Case of the Dreamer
              </h2>
              <p className="text-[#c4c5da] text-base leading-relaxed">
                A set of two pillow cases inspired by <i>Sultana's Dream</i>. Screen printed and hand-embroidered by local artisans to ensure safe and fruitful dreaming.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              <div className="glass-panel p-2 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer" onClick={() => (window as any).setExpandedPillow("/images/pillow-cases/Pillow Case 1.png")}>
                <img src="/images/pillow-cases/Pillow Case 1.png" className="w-full h-[400px] object-cover rounded-xl opacity-90 group-hover:scale-[1.02] transition-transform duration-500" alt="Main Pillow Case" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-panel p-2 rounded-xl overflow-hidden border border-white/10 group cursor-pointer" onClick={() => (window as any).setExpandedPillow("/images/pillow-cases/Pillow Case 2.png")}>
                  <img src="/images/pillow-cases/Pillow Case 2.png" className="w-full h-32 md:h-48 object-cover rounded-lg opacity-90 group-hover:scale-105 transition-transform duration-500" alt="Pillow Case 2" />
                </div>
                <div className="glass-panel p-2 rounded-xl overflow-hidden border border-white/10 group cursor-pointer" onClick={() => (window as any).setExpandedPillow("/images/pillow-cases/Pillow Case 3.png")}>
                  <img src="/images/pillow-cases/Pillow Case 3.png" className="w-full h-32 md:h-48 object-cover rounded-lg opacity-90 group-hover:scale-105 transition-transform duration-500" alt="Pillow Case 3" />
                </div>
                <div className="glass-panel p-2 rounded-xl overflow-hidden border border-white/10 group cursor-pointer" onClick={() => (window as any).setExpandedPillow("/images/pillow-cases/Pillow 4.png")}>
                  <img src="/images/pillow-cases/Pillow 4.png" className="w-full h-32 md:h-48 object-cover rounded-lg opacity-90 group-hover:scale-105 transition-transform duration-500" alt="Pillow Case 4" />
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={() => setKitModalOpen(true)}
                className="amorphous-btn px-10 py-4 text-[#00228a] font-space font-bold text-sm uppercase tracking-widest neon-box-glow cursor-pointer"
              >
                Order Dreamer Kit (৳2,500)
              </button>

              <button
                onClick={triggerDirectOrderEmail}
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-space text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <Mail className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span>Email Order (sister@herstorybd.org)</span>
              </button>
            </div>
          </div>
        </section>


        {/* 4. Literary Roots (Sultana's Dream 1905) */}
        <section id="section-literary" className="glass-panel p-8 md:p-12 rounded-3xl border-l-4 border-l-[#00dbe9]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] bg-[#11131d] rounded-2xl shadow-2xl relative overflow-hidden p-6 border border-white/10 flex flex-col justify-end">
                <img
                  alt="Sultana's Dream Cover"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYyfIiPA95gwkd9_Eh52dVZPN_DRkrun9CUzpOk1xzQD3OxEN1l0bxe6N_VdoSRlftR5ly1GM7duzwtBtyyI3AAxPZUZFcytyUHu0rdiKuceVWjeUyCWM9KVXLRxDg8An4pCP5Up0AlaOBJeur31NIXHKPb6oV2c-iKsDryzrqFyEy94cHbvuBKN298amArLC58oiObInJ7v95EF53zRBb6ry5d5HQsV976qOkHh1LhIByv90--U6oYbD0pxvVLYm8HUmiyb95nQ"
                />
                <div className="relative z-10 bg-[#020208]/80 p-4 rounded-xl backdrop-blur-md text-center border border-white/10">
                  <div className="text-white font-space font-bold text-lg">Sultana's Dream</div>
                  <div className="w-8 h-1 bg-[#00dbe9] mx-auto my-2 rounded-full" />
                  <div className="text-[#c4c5da] text-xs italic">Rokeya Sakhawat Hosein (1905)</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <span className="text-[#00dbe9] font-space text-xs font-bold uppercase tracking-widest block">
                {TRANSLATIONS.literary_roots[lang]}
              </span>
              <h3 className="text-3xl md:text-4xl font-space font-bold text-white">
                {TRANSLATIONS.legacy_title[lang]}
              </h3>
              <p className="text-base text-[#c4c5da] leading-relaxed">
                {lang === 'EN' ? (
                  <>Written in 1905 by pioneering educator Rokeya Sakhawat Hosein, <i>Sultana's Dream</i> proposed a world where women ruled and men stayed indoors (<i>mardana</i>). A satirical Ladyland featuring flying cars, solar heat harvesting, cloud condensation for rainwater, and peaceful gender reversal. Radical for its time, it continues to inspire debate and reflection today.</>
                ) : (
                  TRANSLATIONS.legacy_desc.BN
                )}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.scribd.com/document/547495923/hossein-rokheya-shekhawat-sultanas-dream-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ffb0cd] via-[#00dbe9] to-[#b9c3ff] text-slate-950 font-space font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,176,205,0.4)] hover:scale-105 hover:brightness-110"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{TRANSLATIONS.read_novella[lang]}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={toggleNovellaAudio}
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-space text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer backdrop-blur-md hover:scale-105 shadow-lg"
                >
                  {novellaAudioPlaying ? (
                    <Pause className="w-4 h-4 text-[#00dbe9] animate-pulse" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#00dbe9]" />
                  )}
                  <span>
                    {novellaAudioPlaying
                      ? (lang === 'EN' ? "Pause Story Audio" : "অডিও থামান")
                      : TRANSLATIONS.listen_story[lang]}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive Voting Section */}
        

        {/* 6. Production & Cast Directory ("{TRANSLATIONS.making_ladyland[lang]}") */}
        <section id="section-cast" className="scroll-mt-24 space-y-12">
          <div className="border-b border-white/10 pb-6">
            <span className="text-[#b9c3ff] font-space text-xs font-bold uppercase tracking-widest block mb-2">
              {TRANSLATIONS.dreamers_title[lang]}
            </span>
            <h2 className="text-3xl md:text-5xl font-space font-bold text-white">
              {TRANSLATIONS.making_ladyland[lang]}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Column 1: Production, Editorial, Direction */}
            <div className="space-y-10">
              <div className="space-y-3">
                <h5 className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                  {TRANSLATIONS.production_title[lang]}
                </h5>
                <ul className="text-[#c4c5da] space-y-3 text-sm">
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.produced_by[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.org_herstory_foundation[lang]}</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.supported_by[lang]}</span>
                    <strong className="text-white block">{TRANSLATIONS.org_british_council_wow[lang]}</strong>
                    <strong className="text-white block mt-1">{TRANSLATIONS.org_undp_aus[lang]}</strong>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                  {TRANSLATIONS.editorial_title[lang]}
                </h5>
                <ul className="text-[#c4c5da] space-y-3 text-sm">
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.inspired_by[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.work_sultanas_dream[lang]}</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.written_by[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.person_zohra[lang]}</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.co_writers[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.person_co_writers[lang]}</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.edited_by[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.person_editors[lang]}</strong>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                  {TRANSLATIONS.direction_title[lang]}
                </h5>
                <ul className="text-[#c4c5da] space-y-3 text-sm">
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.production_vision[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.person_katerina[lang]}</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.choreography_direction[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.person_shovan[lang]}</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.original_staging_director[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.person_wajed[lang]}</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.production_manager[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.person_bappy[lang]}</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.co_producer[lang]}</span>
                    <strong className="text-white">{TRANSLATIONS.person_sohan[lang]}</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Performers */}
            <div className="space-y-3">
              <h5 className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                {TRANSLATIONS.cast_title[lang]}
              </h5>
              <ul className="text-[#c4c5da] space-y-3 text-sm">
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_sultana[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_sultana[lang]}</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_sutrodor[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_sutrodor[lang]}</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_sara[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_sara[lang]}</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_shishir[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_shishir[lang]}</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_robots[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_robots[lang]}</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_dadima[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_dadima[lang]}</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_kolpona[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_kolpona[lang]}</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_bidut[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_bidut[lang]}</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_motmo[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_motmo[lang]}</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.cast_taj[lang]}</span><strong className="text-white">{TRANSLATIONS.cast_name_taj[lang]}</strong></li>
              </ul>
            </div>

            {/* Column 3: Creative, Design & Tech */}
            <div className="space-y-10">
              <div className="space-y-3">
                <h5 className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                  {TRANSLATIONS.ladyland_prod_title[lang]}
                </h5>
                <ul className="text-[#c4c5da] space-y-3 text-sm">
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.art_direction[lang]}</span><strong className="text-white">{TRANSLATIONS.person_hridita[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.props_design[lang]}</span><strong className="text-white">{TRANSLATIONS.person_props[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.light_design[lang]}</span><strong className="text-white">{TRANSLATIONS.person_junaid[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.crescent_arc_design[lang]}</span><strong className="text-white">{TRANSLATIONS.person_crescent[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.music[lang]}</span><strong className="text-white">{TRANSLATIONS.person_music[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.composition[lang]}</span><strong className="text-white">{TRANSLATIONS.person_death_weil[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.shadow_puppeteer[lang]}</span><strong className="text-white">{TRANSLATIONS.person_shafrin[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.shadow_puppet_assistant[lang]}</span><strong className="text-white">{TRANSLATIONS.person_anika_tabassum[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.animation[lang]}</span><strong className="text-white">{TRANSLATIONS.person_fahim[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.costume[lang]}</span><strong className="text-white">{TRANSLATIONS.person_bushra[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.makeup[lang]}</span><strong className="text-white">{TRANSLATIONS.person_robin[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.stage_assistants[lang]}</span><strong className="text-white">{TRANSLATIONS.person_stage_assistants[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.communication_design[lang]}</span><strong className="text-white">{TRANSLATIONS.person_tanaya[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.volunteer_coordination[lang]}</span><strong className="text-white">{TRANSLATIONS.person_senin[lang]}</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">{TRANSLATIONS.videography[lang]}</span><strong className="text-white">{TRANSLATIONS.person_hamid[lang]}</strong></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div>
              <span className="text-[#b9c3ff] font-space text-xs font-bold uppercase tracking-widest block mb-1">
                {TRANSLATIONS.gratitude_title[lang]}
              </span>
              <p className="text-xs text-[#c4c5da] leading-relaxed">
                {TRANSLATIONS.gratitude_desc[lang]}
              </p>
            </div>
            <div className="border-t border-white/5 pt-3">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space text-xs font-bold uppercase tracking-widest block mb-1">
                {TRANSLATIONS.volunteers_title[lang]}
              </span>
              <p className="text-xs text-[#c4c5da] leading-relaxed">
                {TRANSLATIONS.volunteers_desc[lang]}
              </p>
            </div>
          </div>
        </section>



        {/* 8. Performance Information & Contact / Newsletter */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-space font-bold text-white mb-2">{TRANSLATIONS.perf_info_title[lang]}</h2>
              <p className="text-[#c4c5da] text-sm">{TRANSLATIONS.perf_info_desc[lang]}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#b9c3ff] font-space text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>{TRANSLATIONS.arrival_title[lang]}</span>
                </div>
                <p className="text-white text-base font-bold pt-1">{TRANSLATIONS.arrival_time[lang]}</p>
                <p className="text-[#c4c5da] text-xs">{TRANSLATIONS.arrival_desc[lang]}</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-space text-xs font-bold uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>{TRANSLATIONS.refunds_title[lang]}</span>
                </div>
                <p className="text-white text-base font-bold pt-1">arefin@cholpori.com</p>
                <p className="text-[#c4c5da] text-xs">{TRANSLATIONS.refunds_desc[lang]}</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1 md:col-span-2">
                <div className="flex items-center gap-2 text-[#00dbe9] font-space text-xs font-bold uppercase tracking-wider">
                  <Phone className="w-4 h-4" />
                  <span>{TRANSLATIONS.queries_title[lang]}</span>
                </div>
                <p className="text-white text-base font-bold pt-1">Bappy Ameen — 01911-495422</p>
                <p className="text-[#c4c5da] text-xs">{TRANSLATIONS.queries_desc[lang]}</p>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="glass-panel p-8 rounded-3xl space-y-6 border border-white/10">
            <h4 className="text-2xl font-space font-bold text-white">Stay in the Loop</h4>
            <p className="text-xs text-[#c4c5da]">
              Subscribe for tour updates, rehearsal diaries, and archive releases from HerStory Foundation.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 rounded-xl bg-white/10 border border-[#00dbe9] text-[#00dbe9] font-space text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span>Thank you for subscribing to HerStory updates!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder={TRANSLATIONS.newsletter_placeholder[lang]}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-xs focus:outline-none focus:border-[#b9c3ff]"
                />
                <button
                  type="submit"
                  className="amorphous-btn w-full text-[#00228a] py-3.5 font-space font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Subscribe to HerStory
                </button>
              </form>
            )}

            <div className="flex justify-center pt-2">
              <a
                href="https://www.instagram.com/herstorybd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00dbe9] hover:text-[#b9c3ff] transition-colors flex items-center gap-2 text-xs font-space font-bold uppercase tracking-wider"
              >
                <Instagram className="w-5 h-5" />
                <span>Follow @herstorybd</span>
              </a>
            </div>
          </div>
        </section>

        {/* 9. DREAMER KIT: "The Case of the Dreamer" */}

        {/* Final Repeated Ticket CTAs at End of Page */}
        <section className="scroll-mt-24">
          <div className="p-6 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-[#00dbe9] font-space text-xs font-bold uppercase tracking-widest block">
                {lang === 'EN' ? 'LIVE SHOWS • DECEMBER 10 & 11' : 'সরাসরি প্রদর্শনী • ১০ ও ১১ ডিসেম্বর'}
              </span>
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-white">
                {lang === 'EN' ? 'Reserve Your Seat in Ladyland' : 'লেডিল্যান্ডে আপনার আসন নিশ্চিত করুন'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end max-w-4xl mx-auto">
              <div className="space-y-2">
                <p className="text-center text-xs text-white/85 font-inter">
                  {lang === 'EN'
                    ? 'Dec 10 • Free show with English translation provided'
                    : '১০ ডিসেম্বর • ফ্রি প্রদর্শনী (ইংরেজি অনুবাদসহ)'}
                </p>
                <a
                  href="https://ladyland.tickify.live/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] text-center justify-center bg-gradient-to-r from-[#ff45a2] to-[#D64E0E] hover:from-[#ff5eb0] hover:to-[#e55a17] text-white px-6 py-3.5 rounded-full font-space font-bold text-sm uppercase tracking-widest border border-white/30 shadow-[0_0_24px_rgba(255,69,162,0.45)] hover:shadow-[0_0_32px_rgba(255,69,162,0.65)] cursor-pointer inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <span>{lang === 'EN' ? 'REGISTER (DEC 10)' : 'নিবন্ধন (১০ ডিসেম্বর)'}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-center text-xs text-white/85 font-inter">
                  {lang === 'EN'
                    ? 'Dec 11, 7:00 PM • Bangladesh Shilpakala Academy'
                    : '১১ ডিসেম্বর, সন্ধ্যা ৭টা • বাংলাদেশ শিল্পকলা একাডেমি'}
                </p>
                <a
                  href="https://tickify.live/o/tickify/project-ladyland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] text-center justify-center bg-gradient-to-r from-[#ff45a2] to-[#D64E0E] hover:from-[#ff5eb0] hover:to-[#e55a17] text-white px-6 py-3.5 rounded-full font-space font-bold text-sm uppercase tracking-widest border border-white/30 shadow-[0_0_24px_rgba(255,69,162,0.45)] hover:shadow-[0_0_32px_rgba(255,69,162,0.65)] cursor-pointer inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <span>{lang === 'EN' ? 'BUY TICKET (DEC 11)' : 'টিকিট কাটুন (১১ ডিসেম্বর)'}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Dreamer Kit Order Modal */}
      {kitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-md w-full p-6 md:p-8 rounded-3xl border border-white/20 text-white relative shadow-2xl space-y-6">
            <button
              onClick={() => {
                setKitModalOpen(false);
                setKitOrdered(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {kitOrdered ? (
              <div className="text-center py-6 space-y-4 font-space">
                <ShoppingBag className="w-14 h-14 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white">Order Placed!</h3>
                <p className="text-xs text-[#c4c5da] font-inter">
                  Thank you for supporting HerStory Foundation. Your order for <strong className="text-white">The Case of the Dreamer</strong> pillow case set ({kitQty} set{kitQty > 1 ? 's' : ''}) has been placed.
                </p>
                <p className="text-xs text-[#00dbe9]">
                  We will contact you via phone ({kitPhone}) to confirm courier delivery in Bangladesh.
                </p>

                <button
                  onClick={() => {
                    setKitModalOpen(false);
                    setKitOrdered(false);
                  }}
                  className="amorphous-btn px-8 py-3.5 text-[#00228a] font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleKitSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="font-space text-xl font-bold text-white">Order Dreamer Kit</h3>
                </div>

                <p className="text-xs text-[#c4c5da]">
                  Hand-embroidered & screen-printed pillow case set (৳2,500 / set).
                </p>

                <div>
                  <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nusrat Jahan"
                    value={kitName}
                    onChange={(e) => setKitName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#ffb0cd]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Road, Thana, District"
                    value={kitAddress}
                    onChange={(e) => setKitAddress(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#ffb0cd]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017..."
                      value={kitPhone}
                      onChange={(e) => setKitPhone(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#ffb0cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                      Sets Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={kitQty}
                      onChange={(e) => setKitQty(parseInt(e.target.value) || 1)}
                      className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#ffb0cd]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="amorphous-btn w-full text-[#00228a] py-3.5 font-space font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Submit Order (৳{kitQty * 2500})
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Google Sheet Live Ledger Modal */}
      {sheetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass-panel max-w-3xl w-full p-6 md:p-8 rounded-3xl border border-emerald-500/30 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSheetModalOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <span className="text-emerald-400 font-space text-[11px] font-bold uppercase tracking-widest block">
                  Official Response Ledger
                </span>
                <h3 className="text-2xl font-space font-bold text-white">
                  Google Sheets Integration
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#c4c5da] mb-6 leading-relaxed">
              All audience votes, newsletter registrations, and Dreamer Kit orders from Project Ladyland are synchronized directly to Google Sheets using the Google Sheets API.
            </p>

            {/* Direct Google Sheet Link Banner */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-space font-bold uppercase text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Live Spreadsheet Link
                </span>
                <span className="text-[10px] font-space text-emerald-400/80 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Google Sheets API Active
                </span>
              </div>

              <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/10">
                <input
                  type="text"
                  readOnly
                  value={customSheetUrl || sheetData?.spreadsheetUrl || 'https://docs.google.com/spreadsheets/d/1Ladyland_Project_Official_Ledger_2026/edit'}
                  className="bg-transparent text-xs text-white/90 font-mono w-full focus:outline-none"
                />
                <button
                  onClick={() => {
                    const url = customSheetUrl || sheetData?.spreadsheetUrl || 'https://docs.google.com/spreadsheets/d/1Ladyland_Project_Official_Ledger_2026/edit';
                    navigator.clipboard.writeText(url);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2500);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-space font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <a
                  href={customSheetUrl || sheetData?.spreadsheetUrl || 'https://docs.google.com/spreadsheets/d/1Ladyland_Project_Official_Ledger_2026/edit'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-space text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Open Google Sheet in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {!googleUser ? (
                  <button
                    onClick={handleGoogleSignIn}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-space text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <UserCheck className="w-4 h-4 text-[#00dbe9]" />
                    <span>Sign in with Google</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCreateCustomSheet}
                      disabled={isCreatingSheet}
                      className="px-4 py-2.5 rounded-xl bg-indigo-500/30 hover:bg-indigo-500/40 border border-indigo-400/40 text-indigo-200 font-space text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-300" />
                      <span>{isCreatingSheet ? 'Creating Sheet...' : 'Create Sheet in My Drive'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Live Tally Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-space text-[#b9c3ff] uppercase font-bold block mb-1">
                  Total Votes
                </span>
                <span className="text-2xl font-space font-bold text-white">
                  {totalVotes}
                </span>
                <div className="text-[10px] text-white/50 mt-0.5">
                  Grant: {voteCounts.grant} | Deny: {voteCounts.deny}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-space text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] uppercase font-bold block mb-1">
                  Registrations
                </span>
                <span className="text-2xl font-space font-bold text-white">
                  {sheetData?.summary?.totalSignups || 2}
                </span>
                <div className="text-[10px] text-white/50 mt-0.5">
                  Newsletter list
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-space text-[#00dbe9] uppercase font-bold block mb-1">
                  Kit Orders
                </span>
                <span className="text-2xl font-space font-bold text-white">
                  {sheetData?.summary?.totalOrders || 1}
                </span>
                <div className="text-[10px] text-white/50 mt-0.5">
                  Dreamer Kit sets
                </div>
              </div>
            </div>

            {/* Live Submissions Ledger Table */}
            <div className="space-y-3">
              <h4 className="font-space text-xs font-bold uppercase text-white/80 tracking-wider flex items-center gap-2">
                <Vote className="w-4 h-4 text-emerald-400" />
                <span>Recent Votes Logged to Google Sheet</span>
              </h4>

              <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden text-xs">
                <div className="grid grid-cols-3 p-3 bg-white/5 font-space font-bold text-[11px] text-[#c4c5da] border-b border-white/10">
                  <span>Timestamp</span>
                  <span>Vote Decision</span>
                  <span>Source</span>
                </div>
                <div className="divide-y divide-white/5 max-h-48 overflow-y-auto">
                  {(sheetData?.votes || []).slice(0, 6).map((vote, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-3 text-white/80 items-center">
                      <span className="font-mono text-[10px] text-white/50">
                        {new Date(vote.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className={`font-space font-bold ${vote.choice === 'GRANT' ? 'text-[#00dbe9]' : 'text-[#ff45a2]'}`}>
                        {vote.choice === 'GRANT' ? TRANSLATIONS.vote_grant[lang] : TRANSLATIONS.vote_deny[lang]}
                      </span>
                      <span className="text-white/40 text-[11px] truncate">
                        {vote.userEmail || 'Ladyland Portal'}
                      </span>
                    </div>
                  ))}
                  {(!sheetData?.votes || sheetData.votes.length === 0) && (
                    <div className="p-4 text-center text-white/40 text-xs">
                      No votes recorded in session yet. Submit a vote to see it recorded live!
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSheetModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-space text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Ledger View
              </button>
            </div>
          </div>
        </div>
      )}


      
      {/* Expanded Pillow Case Modal */}
      {expandedPillow && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 animate-in fade-in" onClick={() => setExpandedPillowState(null)}>
          <button 
            onClick={() => setExpandedPillowState(null)}
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          <img src={expandedPillow} className="max-w-full max-h-[85vh] object-contain rounded-lg" alt="Expanded Pillow" />
        </div>
      )}


      {/* Floating Audio Story Player & Pill */}
      {!novellaAudioOpen && (
        <button
          type="button"
          onClick={() => {
            setNovellaAudioOpen(true);
            if (!novellaAudioPlaying && novellaAudioRef.current) {
              novellaAudioRef.current.play().catch(() => {});
            }
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#020208]/90 hover:bg-[#11131d] border border-[#00dbe9]/60 p-3 pr-5 rounded-full shadow-[0_0_25px_rgba(0,219,233,0.35)] backdrop-blur-md transition-all hover:scale-105 hover:border-[#00dbe9] group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#00dbe9]/20 flex items-center justify-center text-[#00dbe9] group-hover:bg-[#00dbe9] group-hover:text-black transition-colors">
            {novellaAudioPlaying ? <Pause className="w-5 h-5 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-space text-xs font-bold uppercase tracking-wider text-white hidden sm:block">
              {lang === 'EN' ? "Listen to Sultana's Dream" : "সুলতানার স্বপ্ন শুনুন"}
            </span>
            <span className="text-[10px] text-[#00dbe9] font-mono hidden sm:block">
              {novellaAudioPlaying ? "Now Playing (On-Site)" : "Narrated by Zareen Azmi"}
            </span>
          </div>
        </button>
      )}

      {/* Floating Docked Audio Player Widget */}
      {novellaAudioOpen && (
        <aside
          aria-label="Novella Audio Player"
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] bg-[#070913]/95 border border-[#00dbe9]/50 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,219,233,0.25)] backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full bg-[#00dbe9] ${novellaAudioPlaying ? 'animate-pulse' : ''}`} />
              <span className="font-space text-[11px] font-bold tracking-wider uppercase text-[#00dbe9]">
                Sultana's Dream (1905)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <a
                href="/audio/sultanas-dream-audio.mp3"
                download="sultanas-dream-audio.mp3"
                title="Download MP3"
                className="px-2 py-0.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono"
              >
                MP3 ↓
              </a>
              <button
                type="button"
                onClick={() => setNovellaAudioOpen(false)}
                className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Minimize player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-xs text-white/90 font-medium truncate mb-2">
            Novella Reading — Narrated by Zareen Azmi
          </div>

          {/* Scrubber / Progress */}
          <div className="space-y-1 mb-3">
            <input
              type="range"
              min={0}
              max={novellaAudioDuration || 100}
              value={novellaAudioTime}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setNovellaAudioTime(val);
                if (novellaAudioRef.current) novellaAudioRef.current.currentTime = val;
              }}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00dbe9]"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/60">
              <span>{formatAudioTime(novellaAudioTime)}</span>
              <span>{formatAudioTime(novellaAudioDuration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleNovellaAudio}
                className="w-10 h-10 rounded-full bg-[#00dbe9] text-black hover:bg-[#6ef5ff] flex items-center justify-center transition-transform hover:scale-105 font-bold shadow-md cursor-pointer"
              >
                {novellaAudioPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
              </button>
              <span className="text-xs font-space text-white/80">
                {novellaAudioPlaying ? "Playing" : "Paused"}
              </span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (novellaAudioRef.current) {
                    const newMuted = !novellaMuted;
                    setNovellaMuted(newMuted);
                    novellaAudioRef.current.muted = newMuted;
                  }
                }}
                className="text-white/70 hover:text-white cursor-pointer"
              >
                {novellaMuted || novellaVolume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00dbe9]" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={novellaMuted ? 0 : novellaVolume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setNovellaVolume(v);
                  setNovellaMuted(false);
                  if (novellaAudioRef.current) {
                    novellaAudioRef.current.volume = v;
                    novellaAudioRef.current.muted = false;
                  }
                }}
                className="w-16 h-1 bg-white/20 rounded appearance-none cursor-pointer accent-[#00dbe9]"
              />
            </div>
          </div>
        </aside>
      )}

      {/* Hidden Native Audio Element */}
      <audio
        ref={novellaAudioRef}
        src="/audio/sultanas-dream-audio.mp3"
        preload="metadata"
      />

    </div>
  );
};
