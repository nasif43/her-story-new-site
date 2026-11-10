import React, { useState } from "react";
import { Sparkles, FileText } from "lucide-react";
import { SisterSubPage } from "./SisterLibraryHub";

interface SisterLibraryAiTheatreProps {
  onBack: () => void;
  onNavigate: (page: SisterSubPage) => void;
}

export const SisterLibraryAiTheatre: React.FC<SisterLibraryAiTheatreProps> = ({
  onBack,
  onNavigate,
}) => {
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [manifestoOpen, setManifestoOpen] = useState(false);

  return (
    <div className="w-full bg-[#0c0d10] text-[#f4f0e7] font-serif-editorial min-h-screen">
      {/* Action Toolbar — Prompt Score + Manifesto (Back handled by SubNav) */}
      <div className="max-w-max-content-width mx-auto px-gutter-mobile lg:px-gutter-desktop pt-6 pb-4 flex flex-wrap items-center justify-end gap-2 border-b border-white/10 mb-6">
        <button
          onClick={() => setTranscriptOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#ff1493]/20 hover:bg-[#ff1493]/30 text-[#ff1493] border border-[#ff1493]/50 text-xs font-label-code font-semibold transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Prompt Score</span>
        </button>
        <button
          onClick={() => setManifestoOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-marigold-ochre/20 hover:bg-marigold-ochre/30 text-marigold-ochre border border-marigold-ochre/50 text-xs font-label-code font-semibold transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Manifesto</span>
        </button>
      </div>

      <main className="w-full max-w-max-content-width mx-auto px-gutter-desktop pt-6">
        <div className="flex flex-col w-full relative">
          {/* Section 0: Primary Cinematic Video Showcase */}
          <section className="w-full pt-space-xs pb-space-lg">
            <div className="relative w-full rounded-lg overflow-hidden bg-[#0a0b0f]/90 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-riso-pink via-marigold-ochre to-[#7b2cbf] z-20" />

              <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://drive.google.com/file/d/1zaxMp51X439hnj51tyMa5yL8jOyLBHkr/preview"
                  allow="fullscreen"
                  allowFullScreen
                />
                <div className="absolute bottom-0 left-0 right-0 p-space-sm bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-space-2xs z-20 pointer-events-none">
                  <div className="w-full bg-white/20 h-1 rounded overflow-hidden">
                    <div className="bg-gradient-to-r from-riso-pink to-marigold-ochre h-full w-[46%] shadow-[0_0_8px_#ff1493]" />
                  </div>
                  <div className="flex items-center justify-between font-label-code text-label-code text-surface-variant/90 pt-space-3xs">
                    <span className="flex items-center gap-space-2xs">
                      <span className="w-2 h-2 rounded-full bg-riso-pink inline-block animate-pulse" />
                      FEED: STEREO NEURAL RESYNTHESIS
                    </span>
                    <span>CH. 01 / 02 [SURROUND ENCODE]</span>
                  </div>
                </div>
              </div>

              <div className="p-space-lg bg-[#0d0e14]/95 backdrop-blur-md grid grid-cols-12 gap-space-md items-center border-t border-white/10">
                <div className="col-span-12 lg:col-span-8 space-y-space-xs">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="font-label-code text-label-code text-riso-pink font-bold">
                      COMMISSIONED BY HERSTORY FOUNDATION &amp; GOETHE-INSTITUT
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-surface-bright leading-tight font-serif">
                    STIMULATING EMOTIONAL RESPONSE WITH ARTIFICIAL ACTORS
                  </h2>
                  <p className="font-body-md text-body-md text-[#c8cde0] leading-relaxed max-w-3xl font-serif-editorial">
                    A performance of the Venn diagram of love, technology, and misogyny. What would you do to fill the gaps left open by an absent partner?
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-space-xs justify-end">
                  <a
                    className="flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-riso-pink text-white font-label-code text-label-code font-bold uppercase rounded-xs shadow-[2px_2px_0px_#ffffff] hover:bg-[#e10080] transition-colors"
                    href="#score-archive"
                  >
                    Explore Performance Archive ↓
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: Forum Theatre & Public Sentiment */}
          <section className="w-full py-space-xl border-t border-white/10" id="score-archive">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-xl">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-surface-bright font-serif">
                  Forum Theatre to Uncover Public Sentiment
                </h2>
                <p className="font-body-md text-body-md text-[#c8cde0] mt-space-2xs max-w-2xl font-serif-editorial">
                  Theatre as a form of public opinion research and service announcement.
                </p>
              </div>

              <div className="flex items-center gap-space-xs overflow-x-auto pb-space-2xs font-label-code text-label-code">
                <span className="px-space-sm py-space-2xs rounded bg-[#13151d] text-surface-bright border border-white/20 font-bold">
                  AI MAFIA BF
                </span>
                <span className="px-space-sm py-space-2xs rounded bg-[#13151d] text-surface-bright border border-white/20 font-bold">
                  MY AIBFF
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
              {/* Card 1: AI Mafia BF */}
              <div className="flex flex-col space-y-space-md">
                <div className="flex items-center justify-between p-space-sm bg-[#14161d] border border-white/15 rounded-lg">
                  <div className="flex items-center gap-space-2xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-riso-pink animate-pulse" />
                    <h3 className="font-headline-sm text-headline-sm text-surface-bright font-serif">
                      AI Mafia BF
                    </h3>
                  </div>
                  <span className="font-label-code text-label-code text-riso-pink bg-riso-pink/15 px-space-2xs py-0.5 rounded border border-riso-pink/40 font-bold">
                    NODE // 01
                  </span>
                </div>

                <article className="flex flex-col bg-[#0f1017]/90 backdrop-blur-md rounded-lg overflow-hidden border border-white/15 hover:border-riso-pink/60 transition-all duration-300 shadow-lg group">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      className="w-full h-full border-0 absolute inset-0 z-10"
                      src="https://www.youtube.com/embed/18XGnfbH8yc?start=173"
                      title="Algorithmic Risography: Latent Space Printmaking"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md bg-[#0f1017]">
                    <div className="space-y-space-xs">
                      <div className="font-label-code text-label-code text-marigold-ochre font-bold">
                        LONELINESS AND ARTIFICIAL INTELLIGENCE
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-surface-bright font-serif group-hover:text-riso-pink transition-colors">
                        ARTIFICIAL ROMANCE &amp; REAL FIDELITY
                      </h4>
                      <p className="font-body-sm text-body-sm text-[#c8cde0] line-clamp-3 font-serif-editorial">
                        When does the artificial become real danger? How are boundaries regulated for women vs. men? Who holds the right to privacy and intimacy?
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              {/* Card 2: MY AIBFF */}
              <div className="flex flex-col space-y-space-md">
                <div className="flex items-center justify-between p-space-sm bg-[#14161d] border border-white/15 rounded-lg">
                  <div className="flex items-center gap-space-2xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-marigold-ochre animate-pulse" />
                    <h3 className="font-headline-sm text-headline-sm text-surface-bright font-serif">
                      MY AIBFF
                    </h3>
                  </div>
                  <span className="font-label-code text-label-code text-marigold-ochre bg-white/10 px-space-2xs py-0.5 rounded border border-white/15 font-bold">
                    NODE // 02
                  </span>
                </div>

                <article className="flex flex-col bg-[#0f1017]/90 backdrop-blur-md rounded-lg overflow-hidden border border-white/15 hover:border-marigold-ochre/60 transition-all duration-300 shadow-lg group">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      className="w-full h-full border-0 absolute inset-0 z-10"
                      src="https://drive.google.com/file/d/1zaxMp51X439hnj51tyMa5yL8jOyLBHkr/preview"
                      allow="fullscreen"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md bg-[#0f1017]">
                    <div className="space-y-space-xs">
                      <div className="font-label-code text-label-code text-marigold-ochre font-bold">
                        ADOLESCENCE &amp; ARTIFICIAL FRIENDSHIP
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-surface-bright font-serif group-hover:text-marigold-ochre transition-colors">
                        FUN IS MY LOVE LANGUAGE
                      </h4>
                      <p className="font-body-sm text-body-sm text-[#c8cde0] line-clamp-3 font-serif-editorial">
                        No one plans to become addicted. It just happens when something feels good, you do it over and over again.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Section 2: Collective Covenant */}
          <section className="w-full py-space-xl border-t border-white/10 mb-space-2xl">
            <div className="grid grid-cols-12 gap-space-xl items-start">
              <div className="col-span-12 lg:col-span-7 space-y-space-md">
                <div className="inline-flex items-center gap-space-2xs px-space-xs py-space-3xs bg-[#191d29] rounded border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-riso-pink inline-block animate-pulse" />
                  <span className="font-label-stamp text-label-stamp text-surface-bright uppercase font-bold">
                    COLLECTIVE COVENANT // VER. 3.0
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-surface-bright font-serif">
                  Measuring the Temprature in the Room
                </h2>
                <p className="font-body-md text-body-md text-[#c8cde0] leading-relaxed font-serif-editorial">
                  As the lines between our online and offline lives blur, the impact of hybrid existence is mediated by gender and orientation. Moral policing, consent beyond the physical, and image agency are hot topics discussed in the forum.
                </p>
                <div className="space-y-space-sm pt-space-xs">
                  <div className="p-space-md rounded bg-[#10121a] border border-white/15 flex gap-space-sm">
                    <span className="font-label-code text-label-code text-riso-pink font-bold">01.</span>
                    <div className="space-y-space-3xs">
                      <h4 className="font-body-md text-body-md font-semibold text-surface-bright">
                        CONSENT
                      </h4>
                      <p className="font-body-sm text-body-sm text-[#c8cde0] font-serif-editorial">
                        Understanding that consent must be sought not just for the physical, but for the digital extension of the body. Images, profiles, and personal data are all governed by sovereign ownership.
                      </p>
                    </div>
                  </div>

                  <div className="p-space-md rounded bg-[#10121a] border border-white/15 flex gap-space-sm">
                    <span className="font-label-code text-label-code text-riso-pink font-bold">02.</span>
                    <div className="space-y-space-3xs">
                      <h4 className="font-body-md text-body-md font-semibold text-surface-bright">
                        EQUALITY
                      </h4>
                      <p className="font-body-sm text-body-sm text-[#c8cde0] font-serif-editorial">
                        Advocating for equitable access to technology and safety protocols. Acknowledging disparities in digital literacy and mediating conversations to bridge the ethics of usage.
                      </p>
                    </div>
                  </div>

                  <div className="p-space-md rounded bg-[#10121a] border border-white/15 flex gap-space-sm">
                    <span className="font-label-code text-label-code text-riso-pink font-bold">03.</span>
                    <div className="space-y-space-3xs">
                      <h4 className="font-body-md text-body-md font-semibold text-surface-bright">
                        SHAME-FREE
                      </h4>
                      <p className="font-body-sm text-body-sm text-[#c8cde0] font-serif-editorial">
                        Shame-free, critical discussion of technology as emotional support without patriarchal stigma.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-5">
                <div className="relative bg-[#0f1017] rounded-lg overflow-hidden border border-white/15 shadow-xl group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuABlpJltCnLB9EtgrPeccAzj2jA91qKRruHFMAL4roK0I7jtgr7d6GzD5Z4LvWy1g8CZ0KN7UD9m_jOFn739rbEHekcvh4vq52FA26ZU04IWzI8G1fmAkjdwSj5hlkvFTxe8vsV0z75HCcsKndEv-RmibDLcVh1mSHLVN5hUlDSvtNingtK_ACpYjvz9kI9RbQE1YOBQxSwyhxM1f2K2foIw-PGWPJmwYOeHknkSDjYUn29aDwZK5-cvg"
                      alt="AI Mafia Boyfriend performance gathering"
                      className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-space-sm left-space-sm flex items-center gap-space-2xs bg-black/80 px-space-sm py-space-2xs rounded border border-white/15">
                      <span className="w-2.5 h-2.5 rounded-full bg-riso-pink animate-pulse" />
                      <span className="font-label-stamp text-label-stamp text-surface-bright tracking-widest uppercase">
                        ARCHIVE RECORD // GATHERING
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md border-t border-white/15 space-y-space-2xs bg-[#10121a]">
                    <div className="font-label-code text-label-code text-marigold-ochre uppercase font-bold">
                      COMMUNITY FORUM
                    </div>
                    <p className="font-body-sm text-body-sm text-[#c8cde0] font-serif-editorial">
                      Interactive bots, audience votes, and scripted chaos exploring AI intimacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Transcript Modal */}
          {transcriptOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-2xl bg-[#0f1118] border border-white/20 rounded-lg p-space-lg shadow-2xl space-y-space-md max-h-[870px] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-space-sm">
                  <div>
                    <span className="font-label-stamp text-label-stamp text-riso-pink uppercase font-bold">
                      DOCUMENT REF: SL-TR-2025-01
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-surface-bright font-serif">
                      Performance Transcript &amp; Prompt Score
                    </h3>
                  </div>
                  <button
                    aria-label="Close modal"
                    className="text-surface-variant hover:text-white p-space-2xs cursor-pointer"
                    onClick={() => setTranscriptOpen(false)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
                <div className="font-label-code text-body-sm text-[#c8cde0] space-y-space-sm bg-black/50 p-space-md rounded border border-white/10">
                  <p className="text-marigold-ochre font-bold">[TIMECODE 00:04:12 // PROMPT INPUT]</p>
                  <p className="italic text-surface-variant">
                    "Reconstruct the voices of three anonymous female typesetters from 1970s Chittagong. Strip colonial phonemes. Let the ink bleed across the vocal cords."
                  </p>
                  <p className="text-riso-pink font-bold mt-space-sm">[NEURAL SYNTHESIS OUTPUT]</p>
                  <p className="leading-relaxed">
                    "We do not replicate; we resist. The machine does not remember what was never recorded, yet in the empty margin of the book, our collective pulse remains legible..."
                  </p>
                </div>
                <div className="flex justify-end gap-space-sm pt-space-xs">
                  <button
                    className="px-space-md py-space-2xs text-body-sm text-surface-variant hover:text-white cursor-pointer"
                    onClick={() => setTranscriptOpen(false)}
                    type="button"
                  >
                    Close
                  </button>
                  <a
                    className="px-space-md py-space-2xs bg-riso-pink text-white font-body-sm font-semibold rounded hover:bg-[#e10080]"
                    href="https://www.youtube.com/watch?v=S8ozfFh9U4E"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Watch Video Scene
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Manifesto Modal */}
          {manifestoOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-2xl bg-[#0f1118] border border-white/20 rounded-lg p-space-lg shadow-2xl space-y-space-md max-h-[870px] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-space-sm">
                  <div>
                    <span className="font-label-stamp text-label-stamp text-marigold-ochre uppercase font-bold">
                      MANIFESTO DECLARATION
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-surface-bright font-serif">
                      Sister Library Computational Manifesto
                    </h3>
                  </div>
                  <button
                    aria-label="Close modal"
                    className="text-surface-variant hover:text-white p-space-2xs cursor-pointer"
                    onClick={() => setManifestoOpen(false)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
                <div className="font-body-md text-body-md text-[#c8cde0] space-y-space-sm leading-relaxed font-serif-editorial">
                  <p>
                    We do not surrender our libraries to corporate scraper engines. Generative neural networks are tools of collective remembrance only when operated by the communities whose voices they synthesize.
                  </p>
                  <p>
                    Through risograph ink, physical gatherings, and intentional machine friction, we affirm that memory is somatic, communal, and radically alive.
                  </p>
                </div>
                <div className="flex justify-end pt-space-xs">
                  <button
                    className="px-space-md py-space-2xs bg-riso-pink text-white font-body-sm font-semibold rounded cursor-pointer hover:bg-[#e10080]"
                    onClick={() => setManifestoOpen(false)}
                    type="button"
                  >
                    Acknowledge &amp; Return
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
