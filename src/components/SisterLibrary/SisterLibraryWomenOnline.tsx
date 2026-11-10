import React, { useState } from "react";
import {
  Terminal,
  ShieldCheck,
  Lock,
  Play,
  Radio,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { SisterSubPage } from "./SisterLibraryHub";

interface SisterLibraryWomenOnlineProps {
  onBack: () => void;
  onNavigate: (page: SisterSubPage) => void;
}

interface SalonSession {
  id: string;
  sessionNumber: string;
  duration: string;
  type: string;
  title: string;
  participants: string;
  youtubeId: string;
}

const SALON_SESSIONS: SalonSession[] = [
  {
    id: "session-1",
    sessionNumber: "SESSION 01",
    duration: "42:15 DURATION",
    type: "AUDIO/VIDEO STREAM",
    title: "Digital Storytelling & Vernacular Orality",
    participants:
      "Nasreen K., Samira A., Sister Library Dhaka Working Group",
    youtubeId: "R5O6ESu3EWM",
  },
  {
    id: "session-2",
    sessionNumber: "SESSION 02",
    duration: "58:30 DURATION",
    type: "LIVE PANEL RECORDING",
    title: "Cyber-Feminism & Data Sovereignty in South Asia",
    participants:
      "Farah Deeba, Tahmina R., Subcontinental Cyber Commons Caucus",
    youtubeId: "S8ozfFh9U4E",
  },
  {
    id: "session-3",
    sessionNumber: "SESSION 03",
    duration: "35:10 DURATION",
    type: "WORKSHOP ARCHIVE",
    title: "Zines to Screens: Hybrid Print & Online Counter-Circulation",
    participants:
      "Sister Library Print Studio, Labanya P., Riso Artisans Assembly",
    youtubeId: "S8ozfFh9U4E",
  },
];

export const SisterLibraryWomenOnline: React.FC<SisterLibraryWomenOnlineProps> = ({
  onBack,
  onNavigate,
}) => {
  const [activeSession, setActiveSession] = useState<SalonSession>(
    SALON_SESSIONS[0]
  );
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  return (
    <div className="w-full bg-[#0a0a0e] text-[#fdf9ef] font-serif-editorial min-h-screen">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0f1017] border-2 border-[#BAD687] text-white p-4 rounded-xl text-center font-sans-ui text-sm flex items-center justify-center gap-3 w-11/12 max-w-md shadow-[0_0_25px_rgba(186,214,135,0.3)] animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#BAD687] shrink-0" />
          <span>{feedbackToast}</span>
        </div>
      )}

      <main className="w-full max-w-4xl mx-auto px-gutter-mobile md:px-gutter-desktop py-space-xl flex flex-col gap-space-2xl text-surface relative z-10">
        {/* 1. Header Section & Ledger Header */}
        <header className="flex flex-col gap-space-md">
          {/* Accession Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-space-xs pb-space-xs border-b border-white/15 font-label-code text-label-code">
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-riso-pink animate-pulse" />
              <span className="tracking-widest text-[#BAD687] uppercase font-bold">
                DIGITAL ARCHIVE // SOUTH ASIA FEMINIST NETWORK
              </span>
            </div>
            <div className="text-white/60">
              NODE: BD.DHK // PROTOCOL: AFCC-SEC.04
            </div>
          </div>

          {/* Main Title & Cyber-Feminist Subheading */}
          <div className="flex flex-col gap-space-sm pt-space-xs">
            <div className="flex flex-wrap items-baseline gap-x-space-md">
              <h1 className="font-headline-lg text-headline-lg font-bold tracking-tight text-white drop-shadow-md">
                WOMEN ONLINE DOT BD
              </h1>
              <span className="font-label-code text-label-code text-marigold-ochre tracking-wider uppercase font-bold">
                [PODCAST &amp; CYBER COMMONS]
              </span>
            </div>
            <p className="font-title-editorial text-title-editorial text-[#c8cde0] font-normal leading-relaxed max-w-3xl font-serif-editorial">
              An investigation into the good, the bad, and the uncanny online realities of women in Bangladesh.
            </p>
          </div>

          {/* Cinematic Hero Video Header */}
          <div className="flex flex-col gap-space-2xs mt-space-md">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 group">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                src="https://www.youtube.com/embed/R5O6ESu3EWM?start=3342"
                title="Women Online Dot BD Archive Video"
              />
            </div>

            {/* Video Ledger Stamp & Caption */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-2xs px-space-2xs py-space-3xs font-label-code text-label-code text-white/70">
              <div className="flex items-center gap-space-xs">
                <span className="text-riso-pink font-bold">REC_DISPATCH #01</span>
                <span>•</span>
                <p className="line-clamp-1 text-white/90 font-serif-editorial">
                  Women Online Dot BD / Digital assembly, grassroots cyber-feminist oral history, and virtual salon broadcast.
                </p>
              </div>
              <span className="text-[#BAD687] font-semibold whitespace-nowrap">
                STATUS: RESTORED // STEREO
              </span>
            </div>
          </div>
        </header>

        {/* 2. Manifesto & Cyber-Feminist Curatorial Statement */}
        <section className="relative bg-[#10121a] rounded-lg p-space-lg md:p-space-xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col gap-space-md">
          <div className="flex items-center justify-between pb-space-xs border-b border-white/10 font-label-code text-label-code">
            <span className="text-marigold-ochre uppercase tracking-widest font-bold">
              CURATORIAL MEMORANDUM // VOL. 08
            </span>
            <Terminal className="w-5 h-5 text-white/50" />
          </div>

          <h2 className="font-headline-md text-headline-md text-white font-serif font-bold">
            Networked Autonomy: Women Online Dot BD
          </h2>

          <div className="space-y-space-md font-body-lg text-body-lg text-[#c8cde0] leading-relaxed font-serif-editorial">
            <p>
              Bangladesh has more than 128 million internet users; it is the most active Facebook user base and is huge on TikTok. The experience of women online is specific and in many instances, absurd.
            </p>
            <p>
              <strong className="text-white font-semibold">Women Online DotBD</strong> is a podcast episode produced by <em className="text-riso-pink not-italic font-semibold">HerStory Foundation</em>, a Dhaka-based feminist organisation with established credibility in cultural production and digital inclusion. The podcast investigates the actual, textured lives of women in Bangladesh on the internet; bringing to light the connection, the creativity, the income-generation, and solidarity (the good); the harassment, surveillance, and platform failure (the bad); and the digitally liminal, the unclassifiable, the uncanny experiences that do not fit either frame.
            </p>
          </div>

          {/* Network Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-md border-t border-white/15 font-label-code text-label-code">
            <div className="flex flex-col gap-space-3xs">
              <span className="text-white/50 uppercase text-[10px]">INFRASTRUCTURE</span>
              <span className="text-white font-bold">Autonomous Peer Mesh</span>
            </div>
            <div className="flex flex-col gap-space-3xs">
              <span className="text-white/50 uppercase text-[10px]">CURATORIAL HUBS</span>
              <span className="text-white font-bold">Sister Library × HerStory</span>
            </div>
            <div className="flex flex-col gap-space-3xs">
              <span className="text-white/50 uppercase text-[10px]">ACCESS TYPE</span>
              <span className="text-riso-pink font-bold">Unrestricted Sovereign</span>
            </div>
          </div>
        </section>

        {/* 3. Photo Documentation Embed (Archival Plate) */}
        <section className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between px-1 font-label-code text-label-code">
            <span className="tracking-widest text-white/60 uppercase">
              ARCHIVAL PLATE NO. 01 // VISUAL RECORD
            </span>
            <span className="text-marigold-ochre font-bold">
              SESSION REF: WOBD-DHK-23
            </span>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-white/20 bg-black/80 shadow-2xl group">
            <img
              alt="Digital discussion circle & community screening session under ambient glow"
              className="w-full h-auto max-h-[500px] object-cover filter contrast-[1.05]"
              src="https://lh3.googleusercontent.com/aida/AEtjO1V6GEjwEPXivzoMJjdeH8G7DbcPZVQYydSSo_2DCBvh-9DNea6-LU44HtbNjowA72HkfGM9CeSh4VL_nQehP5lCBZ6bOyyyEsAX_LNDnuFXl8tpplBV71sCyrXq9T-5kpEZXI6ExFZvgtEWOXt4ASpeOSYIF7Fzb4Ul1ucATqR1CTi9jhBg9fQ_tHUTgKAtZY0y4MpIGlmm8XSkMd9RRLz1cwvukv0mSF_eFcsMtUHhutikEhDjMKQOQqLm"
            />
            <div className="absolute bottom-0 inset-x-0 p-space-md bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
              <div className="flex flex-col gap-space-3xs">
                <span className="font-label-code text-label-code text-riso-pink uppercase font-bold">
                  DHAKA SALON // FIELD DOCUMENT
                </span>
                <p className="font-body-sm text-body-sm text-white font-serif-editorial">
                  Community screening circle and oral history transcription gathered under the incandescent reading lamp.
                </p>
              </div>
              <div className="font-label-code text-label-code text-white/70 whitespace-nowrap">
                ISO 1600 • 35MM RETRIEVAL
              </div>
            </div>
          </div>
        </section>

        {/* 4. Archival Video Dispatches & Program Transmissions */}
        <section className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1 pb-space-xs border-b border-white/15">
            <div className="flex items-center gap-2 font-label-code text-label-code">
              <span className="text-marigold-ochre uppercase tracking-widest font-bold">
                TRANSMISSION STREAM
              </span>
              <span>•</span>
              <span className="text-white/60">3 CATALOGED ENTRIES</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-white font-serif mt-1">
              Recorded Digital Salons &amp; Working Assemblies
            </h3>
          </div>

          {/* Session Cards */}
          <div className="flex flex-col gap-space-sm">
            {SALON_SESSIONS.map((session) => {
              const isSelected = activeSession.id === session.id;
              return (
                <article
                  key={session.id}
                  className={`p-space-md rounded-lg bg-[#10121a] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-space-md shadow-md ${
                    isSelected
                      ? "border-riso-pink shadow-[0_0_20px_rgba(255,20,147,0.25)]"
                      : "border-white/15 hover:border-white/35"
                  }`}
                >
                  <div className="flex items-start gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                      <Play className="w-4 h-4 text-riso-pink fill-current" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-space-xs font-label-code text-xs">
                        <span className="text-riso-pink font-bold">{session.sessionNumber}</span>
                        <span>•</span>
                        <span className="text-white/60">{session.duration}</span>
                        <span>•</span>
                        <span className="text-marigold-ochre font-semibold">{session.type}</span>
                      </div>
                      <h4 className="font-headline-sm text-base sm:text-lg font-bold text-white font-serif">
                        {session.title}
                      </h4>
                      <p className="text-xs text-[#c8cde0] font-serif-editorial">
                        Speakers: {session.participants}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-space-xs self-end sm:self-center">
                    <button
                      onClick={() => {
                        setActiveSession(session);
                        triggerToast(`Loaded transmission: ${session.sessionNumber}`);
                      }}
                      className={`px-4 py-2 font-label-code text-xs font-bold uppercase rounded-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-riso-pink text-white shadow-[2px_2px_0px_#ffffff]"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      }`}
                    >
                      {isSelected ? "Now Playing" : "Load Session"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
