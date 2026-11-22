import React from "react";
import { SisterSubPage } from "./SisterLibraryHub";

interface SisterLibraryAiTheatreProps {
  onBack: () => void;
  onNavigate: (page: SisterSubPage) => void;
}

export const SisterLibraryAiTheatre: React.FC<SisterLibraryAiTheatreProps> = ({
  onBack,
  onNavigate,
}) => {
  return (
    <div className="w-full bg-[#0c0d10] text-[#f4f0e7] font-serif-editorial min-h-screen">
      <main className="w-full max-w-max-content-width mx-auto px-4 md:px-gutter-desktop pt-8">
        <div className="flex flex-col w-full relative">
          {/* Section 0: Primary Cinematic Video Showcase */}
          <section className="w-full pt-space-xs pb-space-lg">
            <div className="relative w-full rounded-lg overflow-hidden bg-[#0a0b0f]/90 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-riso-pink via-marigold-ochre to-[#7b2cbf] z-20" />

              <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                <video
                  className="w-full h-full object-cover absolute inset-0 z-10"
                  src="/videos/ai-theatre-primary.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  title="Stimulating Emotional Response with Artificial Actors"
                />
              </div>

              <div className="px-4 py-2.5 bg-black/80 border-t border-white/10 flex items-center justify-between font-label-code text-[11px] text-[#c8cde0]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-riso-pink inline-block animate-pulse" />
                  FEED: STEREO NEURAL RESYNTHESIS — COMMISSIONED RECORDING
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-white/60">CH. 01 / 02 [SURROUND ENCODE]</span>
              </div>

              <div className="p-4 sm:p-space-lg bg-[#0d0e14]/95 backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center border-t border-white/10">
                <div className="col-span-12 lg:col-span-8 space-y-space-xs">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="font-label-code text-label-code text-riso-pink font-bold">
                      COMMISSIONED BY HERSTORY FOUNDATION &amp; GOETHE-INSTITUT
                    </span>
                  </div>
                  <h1 className="font-headline-md text-headline-md text-surface-bright leading-tight font-serif">
                    STIMULATING EMOTIONAL RESPONSE WITH ARTIFICIAL ACTORS
                  </h1>
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
                    <video
                      className="w-full h-full object-cover absolute inset-0 z-10"
                      src="/videos/ai-theatre-node2.mp4"
                      poster="/images/ai-theatre-node2-poster.png"
                      controls
                      playsInline
                      preload="metadata"
                      title="Node 02: Fun is My Love Language"
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
                    <div className="pt-space-xs flex items-center justify-between border-t border-white/10">
                      <a
                        href="/videos/ai-theatre-node2.mp4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-marigold-ochre hover:underline inline-flex items-center gap-1 font-label-code"
                      >
                        Stream Full Quality Recording ↗
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Section 2: Collective Covenant */}
          <section className="w-full py-space-xl border-t border-white/10 mb-space-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
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
        </div>
      </main>
    </div>
  );
};
