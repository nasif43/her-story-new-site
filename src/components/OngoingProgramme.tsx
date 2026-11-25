import React from 'react';
import { ExternalLink, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { DREAM_ITEMS } from '../data/mockData';
import { DreamItem } from '../types';

interface OngoingProgrammeProps {
  onSelectDream: (dream: DreamItem) => void;
  onGoToLadyland: () => void;
}

export const OngoingProgramme: React.FC<OngoingProgrammeProps> = ({
  onSelectDream,
  onGoToLadyland
}) => {
  const ladylandItem = DREAM_ITEMS.find((d) => d.id === 'ladyland-2026') || DREAM_ITEMS[1];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-12 pt-8 pb-12 relative z-10">
      <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-white/15 overflow-hidden shadow-2xl transition-all">
        {/* Banner Picture - Clean with NO text overlay */}
        <div className="w-full overflow-hidden bg-black/40">
          <img
            alt="Project Ladyland 2026 - HerStory Foundation"
            className="w-full h-auto max-h-[500px] object-cover object-center transition-transform duration-700 hover:scale-[1.01]"
            src="/images/ladyland/tickify-ticket-head.jpg"
          />
        </div>

        {/* Show Info & Action Elements Under the Picture */}
        <div className="p-6 md:p-10 lg:p-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#ff45a2]/20 border border-[#ff45a2]/40 text-[#ffb0cd] font-sans-ui text-xs font-bold uppercase tracking-widest">
                ONGOING PROGRAMME
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00dbe9]/20 border border-[#00dbe9]/40 text-[#00dbe9] font-sans-ui text-xs font-bold uppercase tracking-widest hidden sm:inline-block">
                PARTICIPATORY THEATRE
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-sans-ui text-white/70">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#ff45a2]" />
                December 10 &amp; 11, 2026
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00dbe9]" />
                Bangladesh Shilpakala Academy
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
                Project Ladyland 2026
              </h2>

              <p className="font-serif-editorial text-base sm:text-lg text-white/90 leading-relaxed font-light">
                A participatory theatre production inspired by Sultana&rsquo;s Dream, the iconic short-story by Rokeya Sakhawat Hosein. Imagining Ladyland 121 years after Rokeya, the story invites the audience to decide if to grant men night rights or not.
              </p>

              <p className="font-sans-ui text-xs sm:text-sm text-white/70 leading-relaxed">
                Produced by HerStory Foundation with the support of UNDP and AUS. Originally created with the assistance of the British Council&rsquo;s Women of the World grant 2026.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3.5 w-full sm:w-auto">
              {/* Dec 10 Free Registration */}
              <div className="space-y-1.5">
                <p className="text-center font-sans-ui text-xs text-white/75">
                  Dec 10: Free show with English translation provided
                </p>
                <a
                  href="https://ladyland.tickify.live/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] bg-[#D64E0E] hover:bg-[#b53e08] text-white py-3.5 px-6 rounded-full font-sans-ui text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(214,78,14,0.4)] hover:shadow-[0_0_25px_rgba(214,78,14,0.6)] flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <span>DEC 10 • REGISTER (FREE)</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>

              {/* Dec 11 Buy Ticket Button */}
              <a
                href="https://tickify.live/o/tickify/project-ladyland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] bg-[#D64E0E] hover:bg-[#b53e08] text-white py-3.5 px-6 rounded-full font-sans-ui text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(214,78,14,0.4)] hover:shadow-[0_0_25px_rgba(214,78,14,0.6)] flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>DEC 11 • BUY TICKET</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>

              {/* Secondary Portal Link */}
              <button
                onClick={onGoToLadyland}
                className="w-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white py-3 px-6 rounded-full font-sans-ui text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Explore Ladyland Portal</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={() => onSelectDream(ladylandItem)}
                className="text-center font-sans-ui text-xs text-white/60 hover:text-white transition-colors cursor-pointer py-1"
              >
                View Production Details &amp; Background
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
