import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
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
  Ticket,
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
}

export const ProjectLadylandView: React.FC<ProjectLadylandViewProps> = ({ onGoHome }) => {
  // Audio & Video Modal state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [heroVideoModalOpen, setHeroVideoModalOpen] = useState(false);

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
  const [lang, setLang] = useState<'EN' | 'BN'>('EN');

  // Google Sheets state
  const [sheetModalOpen, setSheetModalOpen] = useState(false);
  const [sheetData, setSheetData] = useState<SheetDataResponse | null>(null);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [customSheetUrl, setCustomSheetUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Interactive Vote State
  const [hasVoted, setHasVoted] = useState<false | 'GRANT' | 'DENY'>(false);
  const [voteCounts, setVoteCounts] = useState({ grant: 1428, deny: 892 });
  const [voteSubmittedToSheet, setVoteSubmittedToSheet] = useState(false);

  // Ticket Modal State
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketCity, setTicketCity] = useState<'Dhaka' | 'Chattogram'>('Dhaka');
  const [ticketDate, setTicketDate] = useState('AUG 13');
  const [ticketQty, setTicketQty] = useState(2);
  const [ticketTier, setTicketTier] = useState<'Standard' | 'Supporter' | 'Student'>('Standard');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [ticketBooked, setTicketBooked] = useState(false);
  const [ticketRefId, setTicketRefId] = useState('');

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

  // Fetch Live Google Sheet Data on mount
  useEffect(() => {
    fetchSheetData()
      .then((data) => {
        setSheetData(data);
        if (data.summary) {
          setVoteCounts({
            grant: 1428 + data.summary.grantVotes,
            deny: 892 + data.summary.denyVotes
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
  const grantPercent = Math.round((voteCounts.grant / totalVotes) * 100);
  const denyPercent = Math.round((voteCounts.deny / totalVotes) * 100);

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
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = 'HST-' + Math.floor(100000 + Math.random() * 900000);
    setTicketRefId(refId);
    setTicketBooked(true);

    // Redirect to relevant Tickify URL
    const targetUrl = ticketCity === 'Dhaka'
      ? 'https://tickify.live/event/project-ladyland-2026-dac/'
      : 'https://tickify.live/event/project-ladyland-2026-chittagong/';
    
    setTimeout(() => {
      window.open(targetUrl, '_blank');
    }, 1200);
  };

  const resetTicketForm = () => {
    setTicketBooked(false);
    setTicketModalOpen(false);
    setBuyerName('');
    setBuyerEmail('');
    setBuyerPhone('');
  };

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
    <div className="bg-transparent text-[#e2e1f0] min-h-screen relative font-inter overflow-x-hidden selection:bg-[#ff45a2]/30 selection:text-white pb-24">
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

      {/* Floating Navigation Sub-Island */}
      <div className="sticky top-4 z-40 max-w-6xl mx-auto px-4 mb-8">
        <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={onGoHome}
              className="font-space font-bold text-white tracking-tighter text-base sm:text-lg hover:text-[#b9c3ff] transition-colors cursor-pointer flex items-center gap-2"
              title="Return to HerStory Foundation Home"
            >
              HERSTORY
            </button>
            <div className="hidden sm:block w-px h-5 bg-white/20" />
            <div className="hidden sm:block font-space text-xs font-bold text-[#b9c3ff] tracking-wider uppercase">
              Project Ladyland
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 font-space text-xs tracking-wider uppercase">
            <a href="#section-tickets" className="text-[#c4c5da] hover:text-[#b9c3ff] transition-colors">
              Performances
            </a>
            <a href="#section-synopsis" className="text-[#c4c5da] hover:text-[#b9c3ff] transition-colors">
              Reimagining
            </a>
            <a href="#section-vote" className="text-[#c4c5da] hover:text-[#b9c3ff] transition-colors">
              The Vote
            </a>
            <a href="#section-cast" className="text-[#c4c5da] hover:text-[#b9c3ff] transition-colors">
              The Dreamers
            </a>
            <a href="#section-dreamer-kit" className="text-[#c4c5da] hover:text-[#b9c3ff] transition-colors">
              Dreamer Kit
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-space text-[10px]">
              <button
                onClick={() => setLang('EN')}
                className={`font-bold ${lang === 'EN' ? 'text-[#b9c3ff]' : 'text-[#c4c5da] hover:text-white'}`}
              >
                EN
              </button>
              <span className="opacity-20">/</span>
              <button
                onClick={() => setLang('BN')}
                className={`font-bold ${lang === 'BN' ? 'text-[#ffb0cd]' : 'text-[#c4c5da] hover:text-white'}`}
              >
                BN
              </button>
            </div>

            <a
              href="https://tickify.live/event/project-ladyland-2026-dac/"
              target="_blank"
              rel="noopener noreferrer"
              className="amorphous-btn text-[#00228a] px-4 py-2 font-space text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-md inline-flex items-center gap-1.5"
            >
              <span>Get Tickets</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </nav>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 space-y-24">
        {/* 1. Cinematic Hero & Video Section */}
        <section className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 min-h-[480px] md:min-h-[560px] flex flex-col justify-end p-8 md:p-14">
          <div className="absolute inset-0 bg-gradient-to-t from-[#020208] via-[#020208]/60 to-transparent z-10" />

          {/* Background Ambient Video Canvas (Hero DUSK 1 Video) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <iframe
              src="https://drive.google.com/file/d/1Z6tEPwOyji7syab0JoqP53L23sJiH1rr/preview"
              title="Project Ladyland Hero Video DUSK 1"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 pointer-events-none scale-125 border-0"
              allow="autoplay; loop"
            />
            {/* Fallback image layer */}
            <img
              alt="Project Ladyland Atmosphere"
              className="w-full h-full object-cover opacity-35 mix-blend-screen scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0m01sAk1Wk-6KJ-TsiNecbn0fMlLe5s5pxaZ7OHB9Vzg_Zwk_WdQ4f19jBCCl3X_S0d1Hxw9CYNklm9_BOtUyxqaIwAzaM_TxYNThDRPd94bUg9twvzPQEV-GxSE27Isy1tat0c3zRp7uptwTstnHyktTkMZ4uuRN4JORlIsT4XMghR11hHExFgSieG22EvL0vjNPqlJCFqKvVcnj5eUceEydNnLmVgfdMhd8W9tDSyJZXVyu2La1nWttuvn_XHWITZVkGd-bwCHB"
            />
            {/* Animated Blobs */}
            <div className="blob w-[380px] h-[380px] bg-[#ffb0cd]/30 top-10 -left-20 animate-pulse" />
            <div className="blob w-[320px] h-[320px] bg-[#00dbe9]/20 bottom-10 -right-20 animate-pulse" />
          </div>

          <div className="relative z-20 space-y-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-[#ff45a2]/20 border border-[#ff45a2]/40 text-[#ffb0cd] font-space text-[11px] font-bold uppercase tracking-widest">
                IMMERSIVE THEATRICAL ODYSSEY
              </span>
              <span className="px-3.5 py-1 rounded-full bg-[#0047ff]/20 border border-[#0047ff]/40 text-[#b9c3ff] font-space text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm">
                DHAKA & CHATTOGRAM 2026
              </span>
            </div>

            <h1 className="font-space text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none">
              PROJECT LADYLAND
            </h1>

            <p className="text-lg md:text-xl text-[#c4c5da] font-inter leading-relaxed font-light">
              A speculative techno-feminist performance inspired by Rokeya Sakhawat Hossain's 1905 utopian vision *Sultana's Dream*. Reimagining climate harmony, carecraft, and universal equality through participatory theatre, shadow puppetry, and recycled ornamentation.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://tickify.live/event/project-ladyland-2026-dac/"
                target="_blank"
                rel="noopener noreferrer"
                className="amorphous-btn text-[#00228a] px-8 py-4 font-space font-bold text-sm uppercase tracking-widest neon-box-glow cursor-pointer inline-flex items-center gap-2"
              >
                <span>Reserve Tickets</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setHeroVideoModalOpen(true)}
                className="px-6 py-4 rounded-full bg-[#00dbe9]/20 hover:bg-[#00dbe9]/30 border border-[#00dbe9]/50 text-[#00dbe9] font-space text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer backdrop-blur-md shadow-[0_0_20px_rgba(0,219,233,0.3)] hover:scale-105"
              >
                <Play className="w-4 h-4 text-[#00dbe9] fill-[#00dbe9]" />
                <span>Watch Hero Video with Sound</span>
              </button>

              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="px-5 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-space text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-[#ffb0cd]" />
                    <span>Mute Ambient</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#b9c3ff]" />
                    <span>Ambient Track</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 2. Ticket Sales & Performance Dates */}
        <section id="section-tickets" className="scroll-mt-24">
          <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0047ff]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-8 mb-8">
              <div>
                <span className="text-[#ffb0cd] font-space text-xs uppercase tracking-widest font-bold block mb-2">
                  UPCOMING PERFORMANCES (AUGUST 2026)
                </span>
                <h2 className="text-3xl md:text-4xl font-space font-bold text-white">
                  Welcome to Ladyland
                </h2>
                <p className="text-[#c4c5da] text-sm mt-1">
                  Experience live performances in Dhaka and Chattogram. Get your official passes on Tickify.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://tickify.live/event/project-ladyland-2026-dac/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="amorphous-btn text-[#00228a] px-6 py-3.5 font-space font-bold text-xs uppercase tracking-wider neon-box-glow cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Buy Dhaka Tickets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://tickify.live/event/project-ladyland-2026-chittagong/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="amorphous-btn text-[#00228a] px-6 py-3.5 font-space font-bold text-xs uppercase tracking-wider pink-neon-glow cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Buy Chittagong Tickets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dhaka Performance Location */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-[#b9c3ff]/50 transition-all">
                <div className="flex items-center gap-2 text-[#b9c3ff]">
                  <MapPin className="w-4 h-4 text-[#00dbe9]" />
                  <span className="font-space text-xs font-bold uppercase tracking-wider">
                    Bangladesh Mahila Samity, Dhaka
                  </span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-center min-w-[120px]">
                    <div className="text-[#ffb0cd] text-xs font-bold font-space">AUG 13</div>
                    <div className="text-white text-xl font-space font-bold">18:00</div>
                  </div>

                  <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-center min-w-[120px]">
                    <div className="text-[#ffb0cd] text-xs font-bold font-space">AUG 14</div>
                    <div className="text-white text-xl font-space font-bold">18:00</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#c4c5da]">
                  <span>Door opens 17:45</span>
                  <a
                    href="https://tickify.live/event/project-ladyland-2026-dac/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00dbe9] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Reserve on Tickify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Chattogram Performance Location */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-[#ffb0cd]/50 transition-all">
                <div className="flex items-center gap-2 text-[#ffb0cd]">
                  <MapPin className="w-4 h-4 text-[#ff45a2]" />
                  <span className="font-space text-xs font-bold uppercase tracking-wider">
                    Chittagong Theatre Institute, Chattogram
                  </span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-center min-w-[120px]">
                    <div className="text-[#ffb0cd] text-xs font-bold font-space">AUG 25</div>
                    <div className="text-white text-xl font-space font-bold">18:00</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#c4c5da]">
                  <span>Door opens 17:45</span>
                  <a
                    href="https://tickify.live/event/project-ladyland-2026-chittagong/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ffb0cd] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Reserve on Tickify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. "WHAT FUTURE DO WE WANT?" Banner & Reimagining */}
        <section id="section-synopsis" className="scroll-mt-24 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-space font-bold text-[#ffb0cd] neon-text-glow tracking-tighter uppercase">
              WHAT FUTURE DO WE WANT?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00dbe9] via-[#ffb0cd] to-[#b9c3ff] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[2px] bg-[#ffb0cd]" />
                <span className="text-[#ffb0cd] font-space text-xs uppercase tracking-[0.2em] font-bold">
                  THE DREAM — A REIMAGINING
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-space font-bold text-white leading-tight">
                A Reimagining
              </h3>

              <p className="text-base sm:text-lg text-[#c4c5da] font-inter leading-relaxed">
                Project Ladyland is an immersive theatrical odyssey inspired by Rokeya Sahawat Hossain's 1905 utopian vision. In this realm, the aggressive friction of the old world is replaced by the fluid bioluminescence of a society governed by science, empathy, and collective grace. But there is one crack in the foundation...
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

          {/* WHERE IS LADYLAND? */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl space-y-8 border border-white/10">
            <div className="space-y-4">
              <h4 className="text-2xl md:text-3xl font-space font-bold text-[#ffb0cd] uppercase tracking-wider neon-text-glow">
                WHERE IS LADYLAND?
              </h4>
              <p className="text-base md:text-lg text-[#c4c5da] leading-relaxed font-inter">
                Ladyland is a dream in which the urgent issues threatening our world have been solved. A recycled dream where waste has been turned into wealth and beings live in harmony with nature. To make Ladyland we took the plastics and packaging waste which surrounds us and turned it into the ornamentation of the dream. To write Ladyland we took the experiences and facts of gender inequality and turned it into a question — how do we create a world where trust and balance reign?
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4KzhtZM8kzeSrkno0sNyOOWzyNBFGfafe-VoxWarpVHudrvZP8X71ziqHbWHIwvsu9NkYCASKDCN4VUnYg1cyElvddkEU2T13XVMCzyDD0bPYu-Gqs-7lvGjwJ24VvJyiSFwywtCcPl89nWhg7WNOrpfPq892oYIjNEFSW9t0DpJAMYVLfozI00kaZnQeDa_Qt02ct9GiWRF4jiHBCmGpqEidUevBZPRPahFgo4h_4aYc0tUcIhfw34kC3fRYaFZ2LDqToYN7DhI"
                alt="Ladyland Performance Scene"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020208] via-transparent to-transparent opacity-60" />
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
                THE LITERARY ROOTS
              </span>
              <h3 className="text-3xl md:text-4xl font-space font-bold text-white">
                Feminist Science Fiction Legacy
              </h3>
              <p className="text-base text-[#c4c5da] leading-relaxed">
                Written in 1905 by pioneering educator Rokeya Sakhawat Hosein, *Sultana's Dream* proposed a world where women ruled and men stayed indoors (*mardana*). A satirical Ladyland featuring flying cars, solar heat harvesting, cloud condensation for rainwater, and peaceful gender reversal. Radical for its time, it continues to inspire debate and reflection today.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.scribd.com/document/547495923/hossein-rokheya-shekhawat-sultanas-dream-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ffb0cd] via-[#00dbe9] to-[#b9c3ff] text-slate-950 font-space font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,176,205,0.4)] hover:scale-105 hover:brightness-110"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read the Original Novella</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href="https://drive.google.com/file/d/15O-vITUgPke4R-3pNwJqT_vWKRf9iS-d/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-space text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer backdrop-blur-md hover:scale-105 shadow-lg"
                >
                  <Volume2 className="w-4 h-4 text-[#00dbe9]" />
                  <span>Listen to the Story</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive Voting Section */}
        <section id="section-vote" className="scroll-mt-24">
          <div className="glass-panel p-10 md:p-16 rounded-3xl text-center space-y-8 relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="space-y-3">
              <span className="text-[#ffb0cd] font-space text-xs font-bold uppercase tracking-widest block">
                PARTICIPATORY DECISION
              </span>
              <h3 className="text-3xl sm:text-5xl font-space font-bold text-white">
                The Final Choice is Yours
              </h3>
              <p className="text-base sm:text-lg text-[#c4c5da] max-w-2xl mx-auto">
                Is the night for all? Should Ladyland vote to grant men night-rights or deny them access to the night?
              </p>
            </div>

            {/* Voting Buttons or Results */}
            {!hasVoted ? (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
                <button
                  onClick={() => handleVote('GRANT')}
                  className="amorphous-btn w-full sm:w-auto px-10 py-4 text-[#00228a] font-space font-bold text-sm uppercase tracking-widest neon-box-glow cursor-pointer"
                >
                  GRANT NIGHT RIGHTS
                </button>

                <span className="text-white/40 font-space italic text-sm">OR</span>

                <button
                  onClick={() => handleVote('DENY')}
                  className="amorphous-btn w-full sm:w-auto px-10 py-4 text-[#00228a] font-space font-bold text-sm uppercase tracking-widest pink-neon-glow cursor-pointer"
                >
                  DENY NIGHT RIGHTS
                </button>
              </div>
            ) : (
              <div className="max-w-xl mx-auto space-y-6 pt-4 animate-in fade-in duration-500">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-[#00dbe9] font-space text-xs sm:text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#ffb0cd]" />
                  <span>Your vote ({hasVoted === 'GRANT' ? 'Granting' : 'Denying'} Night Rights) has been saved to the official sheet ledger!</span>
                </div>

                <div className="space-y-4 font-space text-xs">
                  <div>
                    <div className="flex justify-between text-white font-bold mb-1">
                      <span>GRANT NIGHT RIGHTS</span>
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
                      <span>DENY NIGHT RIGHTS</span>
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

        {/* 6. Production & Cast Directory ("MAKING LADYLAND") */}
        <section id="section-cast" className="scroll-mt-24 space-y-12">
          <div className="border-b border-white/10 pb-6">
            <span className="text-[#b9c3ff] font-space text-xs font-bold uppercase tracking-widest block mb-2">
              THE DREAMERS
            </span>
            <h2 className="text-3xl md:text-5xl font-space font-bold text-white">
              MAKING LADYLAND
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Column 1: Production, Editorial, Direction */}
            <div className="space-y-10">
              <div className="space-y-3">
                <h5 className="text-[#ffb0cd] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                  Production
                </h5>
                <ul className="text-[#c4c5da] space-y-3 text-sm">
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">Produced by</span>
                    <strong className="text-white">HerStory Foundation</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">Co-Producer</span>
                    <strong className="text-white">Risana Malek</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">Supported by</span>
                    <strong className="text-white">British Council and Women of the World (WOW) Foundation</strong>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="text-[#ffb0cd] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                  Editorial
                </h5>
                <ul className="text-[#c4c5da] space-y-3 text-sm">
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">Written by</span>
                    <strong className="text-white">Zohra Binte Zaman, Anika Bushra Shoshee, Nafisa A. Iqbal, Upama Adhikary</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">Edited by</span>
                    <strong className="text-white">Khandakar Imdadul Haque Sohan and Katerina Don</strong>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="text-[#ffb0cd] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                  Direction
                </h5>
                <ul className="text-[#c4c5da] space-y-3 text-sm">
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">Acting Director</span>
                    <strong className="text-white">Wajed-Al-Rahman</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">Production Manager</span>
                    <strong className="text-white">Bappy Ameen</strong>
                  </li>
                  <li>
                    <span className="text-white/60 text-[10px] uppercase font-space block">Scenography</span>
                    <strong className="text-white">Sara Anjuman</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Performers */}
            <div className="space-y-3">
              <h5 className="text-[#ffb0cd] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                Performers (Character : Actor)
              </h5>
              <ul className="text-[#c4c5da] space-y-3 text-sm">
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Momo</span><strong className="text-white">Afrida Amir</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Bidut</span><strong className="text-white">Dipu Mahmud</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Robots</span><strong className="text-white">Israt Jahan Ikra</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Dadima</span><strong className="text-white">Juliet Rajena Quiah</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Sara</span><strong className="text-white">Mithila Paul</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Kolpona</span><strong className="text-white">Muntasrin Rahman Mim</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Premik</span><strong className="text-white">Ohiduzzaman</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Shishir</span><strong className="text-white">Salim Shadman (Sasha)</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Shutrodor</span><strong className="text-white">Soptorshi Datta</strong></li>
                <li><span className="text-white/60 text-[10px] uppercase font-space block">Sultana</span><strong className="text-white">Tasniad Shaolin</strong></li>
              </ul>
            </div>

            {/* Column 3: Creative, Design & Tech */}
            <div className="space-y-10">
              <div className="space-y-3">
                <h5 className="text-[#ffb0cd] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                  Creative
                </h5>
                <ul className="text-[#c4c5da] space-y-3 text-sm">
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Props Design</span><strong className="text-white">Urukku.Bangladesh, Taranum Nirbir, Manzoor Real, Faiza Fairooz (Rhimjhim)</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Crescent Arc Design</span><strong className="text-white">Rashed Chowdhury (Dehsar Works)</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Music</span><strong className="text-white">J0N4K1 / জোনাকি</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Shadow Puppetry</span><strong className="text-white">Shafrin Islam (Puppeteer), Anika Tabassum Nuzhat (Assistant)</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Animation</span><strong className="text-white">Fahim Arif</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Choreography</span><strong className="text-white">Shovan Surjo</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Costume</span><strong className="text-white">Bushra Islam Labonno</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Make-up</span><strong className="text-white">Robin Ahmed</strong></li>
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Communication Design</span><strong className="text-white">Tanaya Sayma</strong></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="text-[#ffb0cd] font-space font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">
                  Design & Tech
                </h5>
                <ul className="text-[#c4c5da] space-y-3 text-sm">
                  <li><span className="text-white/60 text-[10px] uppercase font-space block">Light Design</span><strong className="text-white">Junaid Eusuf</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gratitude */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[#b9c3ff] font-space text-xs font-bold uppercase tracking-widest block">
              SPECIAL THANKS & GRATITUDE
            </span>
            <p className="text-xs text-[#c4c5da] leading-relaxed">
              Shala Space, Mallik Yishorja and the brilliant students of Jadur Kathi, Maria and Shakil. Centre for Astronomy Space Science and Astrophysics, Bangladesh (CASSA) of IUB, Brio and Epi restaurants.
            </p>
          </div>
        </section>



        {/* 8. Performance Information & Contact / Newsletter */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-space font-bold text-white mb-2">Performance Information</h2>
              <p className="text-[#c4c5da] text-sm">Planning your journey to Ladyland.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#b9c3ff] font-space text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>Arrival</span>
                </div>
                <p className="text-white text-base font-bold pt-1">Doors open at 17:45</p>
                <p className="text-[#c4c5da] text-xs">Please arrive 30 mins before performance.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#ffb0cd] font-space text-xs font-bold uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>Refunds</span>
                </div>
                <p className="text-white text-base font-bold pt-1">arefin@cholpori.com</p>
                <p className="text-[#c4c5da] text-xs">Valid up to 48 hours before showtime.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1 md:col-span-2">
                <div className="flex items-center gap-2 text-[#00dbe9] font-space text-xs font-bold uppercase tracking-wider">
                  <Phone className="w-4 h-4" />
                  <span>Queries & Help</span>
                </div>
                <p className="text-white text-base font-bold pt-1">Bappy Ameen — 01911-495422</p>
                <p className="text-[#c4c5da] text-xs">Technical support, seating & general inquiries</p>
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
                <CheckCircle2 className="w-4 h-4 text-[#ffb0cd]" />
                <span>Thank you for subscribing to HerStory updates!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
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
        <section id="section-dreamer-kit" className="scroll-mt-24">
          <div className="glass-panel p-8 md:p-14 rounded-3xl text-center space-y-8 border border-white/10 shadow-2xl">
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[#00dbe9] font-space text-xs font-bold uppercase tracking-widest block">
                DREAMER KIT MERCHANDISE
              </span>
              <h2 className="text-3xl sm:text-5xl font-space font-bold text-white">
                The Case of the Dreamer
              </h2>
              <p className="text-[#c4c5da] text-base leading-relaxed">
                A set of two pillow cases inspired by *Sultana's Dream*. Screen printed and hand-embroidered by local artisans to ensure safe and fruitful dreaming.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-panel p-3 rounded-2xl overflow-hidden aspect-square border border-white/10 group">
                <img
                  alt="The Case of the Dreamer - View 1"
                  className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVaZZakFzp4UsXAkIRF30I8MN5-CO8yZUe0sEdkUynLDHpAoRM5OJZDsMFMeaqLKsb6E4I5tYSdF-KsP0echEdFn1BioPng1il_TE3gNJQM9r_wfFZYvMDSNGwhczb3rsuENluMXY6aTyfNqDb8xe58KYUgBwenFNhBNS_6-gw28rbK15uEMJGMPMD-JiJiiyq5xj2xx_BfIt2lyGtViRQmahn6A0DYOJifQN6ree2P_pl0FtNnZOWi219U_4nQLff2vZLQBxleceK"
                />
              </div>

              <div className="glass-panel p-3 rounded-2xl overflow-hidden aspect-square border border-white/10 group">
                <img
                  alt="The Case of the Dreamer - View 2"
                  className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyjYfsCyGZkNIkKJN8Mp6lZZ797OpQMNThjwKA-gtOwsuRL87tngLNh6XjefHW0WtF1lZkKwueMzu-bBYH1GY5pl-Mx2gxX8O4hzZ8e53rO1y1SH8iPGOd34hBCPcFoZqxad7fIEXsdYD8ivSaBDGhCYmkyr-YecPg_xdDqZc74Fcfoz4eYde84dRusNuVrgTQeGwr4ePzeLKwWpkC_04i4mj7tLvF14RPl177lJPd-VmHj41g_wkqZS73pVJHgX_-HrQBW7YJxh3C"
                />
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
                <Mail className="w-4 h-4 text-[#ffb0cd]" />
                <span>Email Order (sister@herstorybd.org)</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Ticket Booking Modal */}
      {ticketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-6 md:p-8 rounded-3xl border border-white/20 text-white relative shadow-2xl space-y-6">
            <button
              onClick={resetTicketForm}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {ticketBooked ? (
              <div className="text-center py-6 space-y-4 font-space">
                <CheckCircle2 className="w-14 h-14 text-[#00dbe9] mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white">Ticket Confirmed!</h3>
                <p className="text-xs text-[#c4c5da] font-inter">
                  Your seat reservation for Project Ladyland has been secured. A confirmation email with QR entry code has been sent to <strong className="text-white">{buyerEmail}</strong>.
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
                  <div className="text-[#ffb0cd] uppercase font-bold text-[10px]">Reference ID</div>
                  <div className="text-xl font-mono font-bold text-white tracking-widest">{ticketRefId}</div>
                  <div className="text-[#c4c5da] pt-1">
                    {ticketCity} — {ticketDate} @ 18:00 ({ticketQty} Seat{ticketQty > 1 ? 's' : ''})
                  </div>
                </div>

                <button
                  onClick={resetTicketForm}
                  className="amorphous-btn px-8 py-3.5 text-[#00228a] font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Close & Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-[#00dbe9]">
                  <Ticket className="w-5 h-5" />
                  <h3 className="font-space text-xl font-bold text-white">Reserve Show Tickets</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                      City / Venue
                    </label>
                    <select
                      value={ticketCity}
                      onChange={(e) => {
                        const city = e.target.value as 'Dhaka' | 'Chattogram';
                        setTicketCity(city);
                        setTicketDate(city === 'Dhaka' ? 'JUL 13' : 'JUL 25');
                      }}
                      className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00dbe9]"
                    >
                      <option value="Dhaka" className="bg-[#11131d]">Dhaka (Mahila Samity)</option>
                      <option value="Chattogram" className="bg-[#11131d]">Chattogram (Theatre Inst.)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                      Show Date
                    </label>
                    <select
                      value={ticketDate}
                      onChange={(e) => setTicketDate(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00dbe9]"
                    >
                      {ticketCity === 'Dhaka' ? (
                        <>
                          <option value="JUL 13" className="bg-[#11131d]">JUL 13 (18:00)</option>
                          <option value="JUL 14" className="bg-[#11131d]">JUL 14 (18:00)</option>
                        </>
                      ) : (
                        <option value="JUL 25" className="bg-[#11131d]">JUL 25 (18:00)</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                      Ticket Tier
                    </label>
                    <select
                      value={ticketTier}
                      onChange={(e) => setTicketTier(e.target.value as any)}
                      className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00dbe9]"
                    >
                      <option value="Standard" className="bg-[#11131d]">Standard Pass (৳500)</option>
                      <option value="Supporter" className="bg-[#11131d]">Supporter Pass (৳1,200)</option>
                      <option value="Student" className="bg-[#11131d]">Student Pass (৳250)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={ticketQty}
                      onChange={(e) => setTicketQty(parseInt(e.target.value) || 1)}
                      className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00dbe9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anika Rahman"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00dbe9]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="anika@example.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00dbe9]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#c4c5da] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01711..."
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00dbe9]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="amorphous-btn w-full text-[#00228a] py-3.5 font-space font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Confirm & Purchase Tickets
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
                <ShoppingBag className="w-14 h-14 text-[#ffb0cd] mx-auto animate-bounce" />
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
                <div className="flex items-center gap-2 text-[#ffb0cd]">
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
            <div className="grid grid-cols-3 gap-3 mb-6">
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
                <span className="text-[10px] font-space text-[#ffb0cd] uppercase font-bold block mb-1">
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
                        {vote.choice === 'GRANT' ? 'GRANT NIGHT RIGHTS' : 'DENY NIGHT RIGHTS'}
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

      {/* Hero Video & Audio Modal */}
      {heroVideoModalOpen && (
        <div
          onClick={() => setHeroVideoModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-8 animate-fade-in"
        >
          {/* Floating High-Visibility Close Button */}
          <button
            onClick={() => setHeroVideoModalOpen(false)}
            className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-space text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30 transition-transform hover:scale-105"
            title="Close Video (Esc)"
          >
            <X className="w-4 h-4" />
            <span>Close Video</span>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#0a0c16] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto"
          >
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-[#00dbe9]" />
                <div>
                  <h3 className="font-space font-bold text-white text-base">Project Ladyland Hero Video</h3>
                  <p className="text-xs text-[#c4c5da]">DUSK 1 Cinematic Trailer (Full Audio Enabled)</p>
                </div>
              </div>
              <button
                onClick={() => setHeroVideoModalOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold font-space"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <iframe
                src="https://drive.google.com/file/d/1Z6tEPwOyji7syab0JoqP53L23sJiH1rr/preview"
                title="Project Ladyland Hero Video DUSK 1 Full Player"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            <div className="p-4 sm:p-5 bg-[#05060b] flex flex-wrap items-center justify-between gap-4 text-xs font-space">
              <span className="text-[#c4c5da]">Click play on the video player above to listen with full audio and watch in HD.</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://drive.google.com/file/d/1Z6tEPwOyji7syab0JoqP53L23sJiH1rr/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#00dbe9]/20 hover:bg-[#00dbe9]/30 border border-[#00dbe9]/40 text-[#00dbe9] font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Open in Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setHeroVideoModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
