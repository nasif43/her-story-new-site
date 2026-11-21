import React from "react";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Heart,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { SisterSubPage } from "./SisterLibraryHub";

interface SisterLibraryZineMelaProps {
  onBack: () => void;
  onNavigate: (page: SisterSubPage) => void;
}

export const SisterLibraryZineMela: React.FC<SisterLibraryZineMelaProps> = () => {
  return (
    <div className="w-full text-on-surface font-serif-editorial">
      <main className="w-full max-w-4xl mx-auto px-gutter-mobile md:px-gutter-desktop py-space-xl flex flex-col gap-space-3xl text-on-surface">
        {/* 1. Hero & Festival Metadata Header */}
        <header className="flex flex-col gap-space-lg">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="px-space-xs py-space-3xs bg-[#ff1493] text-white font-label-stamp text-label-stamp font-bold uppercase tracking-wider stamp-rotate-left">
              [PRINT CRAFT // AUTONOMOUS FAIR]
            </span>
          </div>

          <h1 className="font-headline-lg md:font-display-hero text-headline-lg md:text-display-hero text-archival-indigo font-normal tracking-tight leading-[1.08] text-balance">
            DHAKA ZINE MELA &amp; SCENE
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed font-normal max-w-3xl">
            A non-commercial, community-held festival congregating independent
            self-publishers, sticker makers, subculture pamphleteers, and print activists.
          </p>

          {/* Logistics Placard / Meta Strip */}
          <div className="flex flex-wrap gap-space-sm items-center pt-space-xs">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container rounded shadow-sm border border-on-surface/15">
              <Calendar className="w-4 h-4 text-[#ff1493]" />
              <span className="font-label-code text-label-code text-archival-indigo font-bold">
                Last held March 2026
              </span>
            </div>
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container rounded shadow-sm border border-on-surface/15">
              <MapPin className="w-4 h-4 text-[#60725a]" />
              <span className="font-label-code text-label-code text-archival-indigo font-medium">
                Sister Library &amp; Goethe-Institut Dhaka
              </span>
            </div>
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-[#60725a] text-white rounded shadow-sm font-label-code text-label-code font-bold">
              <span>OPEN TO ALL • FREE ENTRY</span>
            </div>
          </div>
        </header>

        {/* 2. Primary Archival Image Plate */}
        <figure className="flex flex-col gap-space-xs group">
          <div className="relative w-full overflow-hidden rounded bg-surface-container-high aspect-[16/10] border-2 border-ink-black shadow-[3px_3px_0px_#1c1c16]">
            <img
              src="/images/dzm-archival.jpg"
              alt="Visitors reading independent handmade zines hung on the exhibition wall at Dhaka Zine Mela"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              loading="eager"
              decoding="async"
            />
          </div>
          <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-2xs px-space-xs pt-space-2xs text-on-surface-variant font-label-code text-label-code">
            <span className="text-primary font-bold">PHOTO: ARCHIVAL FILE / DHAKA</span>
            <span>EXHIBITION INSTALLATION // WALL DISPLAY</span>
          </figcaption>
        </figure>

        {/* 3. Curatorial Narrative & Founding Statement */}
        <section className="flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-primary px-space-xs py-space-3xs bg-primary-fixed rounded font-bold">
              Curatorial Statement
            </span>
            <div className="h-px flex-1 bg-surface-container-high" />
            <span className="font-label-code text-label-code text-on-surface-variant">
              FOLIO SEC. 02
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg md:gap-space-xl items-start">
            <div className="md:col-span-8 flex flex-col gap-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <h2 className="font-headline-md text-headline-md text-archival-indigo leading-snug font-serif">
                Why We Fold, Stitch &amp; Circulate: Print as Unsanctioned Memory
              </h2>
              <p>
                Creative freedom is something that you give yourself. Valuation is something you do yourself.
              </p>
              <p>
                Zines are born from a culture of responsible independence. As anarchistic tools they offer
                anonymity and resistance against authority. No permissions are given. No rules apply. No
                conditions are considered.
              </p>
              <p>
                With omnipresent online surveillance, hand-made, print-shop reproduced zines escape the
                data crawlers. Zines offer a dimension of freedom that exists only in hand-made things. Zines
                are a form of preservation of human eccentricities — not everything is for the masses, not
                everything needs to spread. Some things remain secret, some things are meant to be small.
                Zines allow for all things.
              </p>
              <p>
                THE ZINE MELA 2026 was hosted by Goethe-Institut Bangladesh from March 30–June 1. A natural
                collaboration between Anushah Alamgir of Colors Publishing and Sister Library (Dhaka). The mela
                showcased independent zine, poster, and book makers, and visitors were encouraged to make their own.
              </p>
              <p className="font-semibold text-on-surface">
                Co-creation is a messy, exciting, surprising process — there is no real destination, just an
                agreement to create judgement-free.
              </p>
            </div>

            {/* Aside Archival Note Card */}
            <aside className="md:col-span-4 bg-surface-container p-space-lg rounded border border-on-surface/20 shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between pb-space-xs border-b border-on-surface/15 font-label-code text-label-code">
                <span className="text-archival-indigo font-bold">MANIFESTO NOTES</span>
                <span className="text-[#ff1493] font-bold">REF // DZM</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Hand-bound, risograph printed, photocopied, folded by midnight lamplight. We preserve human
                eccentricities beyond digital surveillance and algorithmic feeds.
              </p>
              <div className="pt-space-xs border-t border-on-surface/15 flex flex-col gap-space-2xs font-label-code text-[11px] text-on-surface-variant">
                <div>• Autonomous paper circulation</div>
                <div>• Free and non-commercial</div>
                <div>• Sovereign print memory</div>
              </div>
            </aside>
          </div>
        </section>

        {/* 4. Press Feature: The Daily Star Article */}
        <section className="flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-[#2563eb] px-space-xs py-space-3xs bg-[#2563eb]/10 rounded font-bold">
              Dispatch Feature
            </span>
            <div className="h-px flex-1 bg-surface-container-high" />
            <span className="font-label-code text-label-code text-on-surface-variant">
              PRESS // THE DAILY STAR
            </span>
          </div>

          <article className="p-space-lg bg-surface-container rounded border-2 border-ink-black shadow-[3px_3px_0px_#1c1c16] flex flex-col gap-space-md">
            <div className="flex items-center justify-between flex-wrap gap-space-xs">
              <span className="font-label-code text-label-code text-[#ff1493] font-bold uppercase tracking-wider">
                CULTURE // BOOKS &amp; LITERATURE
              </span>
              <span className="px-space-xs py-space-3xs bg-[#2563eb] text-white font-label-stamp text-label-stamp rounded font-bold">
                Special Report
              </span>
            </div>

            <h3 className="font-headline-sm text-headline-sm text-archival-indigo leading-snug font-serif font-bold">
              <a
                className="hover:text-primary transition-colors underline decoration-riso-pink underline-offset-4"
                href="https://www.thedailystar.net/culture/books-literature/news/news/dhaka-zine-mela-2026-celebration-creativity-and-community-4196396"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dhaka Zine Mela 2026: A celebration of creativity and community
              </a>
            </h3>

            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-code text-label-code">
              <span className="text-archival-indigo font-medium">Sabrina Sazzad</span>
              <span>•</span>
              <span>June 11, 2026</span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              On June 6 and 7, 2026, at Goethe-Institut, Dhanmondi, Zine Mela Dhaka 2026 was held, organised
              by Sister Library (Dhaka) and Colors Publishing. The two-day event brought together independent
              artists, writers, and creators to celebrate self-publishing, artistic expression, and community
              engagement...
            </p>

            <blockquote className="border-t border-b border-surface-container-high py-space-xs font-title-editorial text-title-editorial text-archival-indigo italic leading-snug">
              <span className="text-riso-pink font-bold not-italic mr-space-2xs">“</span>
              Zine making is a spirit of independence and taking things into your own way. You can be your
              own editor and publisher—that is empowering.
              <span className="text-riso-pink font-bold not-italic ml-space-2xs">”</span>
              <footer className="pt-space-3xs font-label-code text-label-code text-on-surface-variant not-italic">
                — Katerina Don, HerStory Foundation
              </footer>
            </blockquote>

            <div className="pt-space-xs border-t border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs font-label-code text-label-code">
              <span className="text-on-surface-variant">The Daily Star • Archival Coverage</span>
              <a
                className="inline-flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-primary text-white rounded font-label-code text-label-code font-bold uppercase tracking-wider shadow-[2px_2px_0px_#1c1c16] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all self-start sm:self-auto"
                href="https://www.thedailystar.net/culture/books-literature/news/news/dhaka-zine-mela-2026-celebration-creativity-and-community-4196396"
                rel="noopener noreferrer"
                target="_blank"
              >
                Read Article on The Daily Star →
              </a>
            </div>
          </article>
        </section>

        {/* 5. Live Instagram Dispatches Feed */}
        <section className="flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-[#7e22ce] px-space-xs py-space-3xs bg-[#7e22ce]/15 rounded font-bold">
              Live Dispatches
            </span>
            <div className="h-px flex-1 bg-surface-container-high" />
            <span className="font-label-code text-label-code text-on-surface-variant">
              INSTAGRAM // @DHAKAZINEMELA
            </span>
          </div>

          <div className="p-space-lg bg-surface-container rounded border-2 border-ink-black shadow-[3px_3px_0px_#1c1c16] flex flex-col gap-space-lg">
            {/* Account Profile Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-md border-b border-surface-container-high">
              <div className="flex items-center gap-space-md min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full p-[2px] bg-primary">
                    <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-lowest flex items-center justify-center">
                      <img
                        alt="Dhaka Zine Mela Official Emblem"
                        className="w-full h-full object-cover rounded-full"
                        src="/images/dhaka-zine-mela-logo.png"
                      />
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-riso-pink text-white flex items-center justify-center text-[10px] font-bold border border-ink-black shadow-sm">
                    ★
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <a
                      className="font-headline-sm text-headline-sm text-archival-indigo hover:text-primary transition-colors font-bold"
                      href="https://www.instagram.com/dhakazinemela/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      @dhakazinemela
                    </a>
                    <span className="px-space-xs py-space-3xs bg-ink-black text-paper-cream font-label-stamp text-[10px] uppercase font-bold rounded">
                      FESTIVAL DISPATCH
                    </span>
                  </div>
                  <p className="font-body-xs text-xs text-on-surface-variant truncate">
                    Dhaka Zine Mela &amp; Scene • Independent Print Craft Fair
                  </p>
                  <div className="flex items-center gap-space-sm pt-space-3xs font-label-code text-xs text-on-surface-variant">
                    <span className="font-bold text-on-surface">48 posts</span>
                    <span>•</span>
                    <span className="font-bold text-on-surface">2.4k followers</span>
                    <span>•</span>
                    <span>Dhaka, BD</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href="https://www.instagram.com/dhakazinemela/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded font-label-code text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#1c1c16] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all"
                >
                  <span>Follow Archive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Instagram Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              {/* Tile 1 */}
              <a
                href="https://www.instagram.com/dhakazinemela/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded bg-surface-container-high border-2 border-ink-black shadow-[2px_2px_0px_#1c1c16]"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGIveT9k27_D_vsEUrrjpoUMfPyp4KBUe0YQVCJ01N9eWQqDWU2jSwgw_BPzzXmNtu1oNYTjyocStJ2X6y3AV6MSp14XPLGXdSol9U9F5SOufcEdm2n9ltZE0T3NQ_xm8EUGttmWz38YIRRGQ97hTnvox4KJ2Wrv1ELQmc9d4_8alDZH1LhVPFd7g1PRhq1pbBbm3v3Z8Hxfvbi9ocUCEgt7ov5JjOAn02RHGay-pgwEc-ZCL2CtydGA"
                  alt="Zine display table at Dhaka Zine Mela"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#1c1c16]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-space-sm flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between text-xs font-label-code">
                    <span className="inline-flex items-center gap-1 text-[#ff1493]">
                      <Heart className="w-3.5 h-3.5 fill-current" /> 420
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> 32
                    </span>
                  </div>
                  <p className="text-xs leading-snug line-clamp-3 text-white/90 font-serif-editorial">
                    Crowded tables of printed matter, photocopied leaflets, and Risograph prints at Goethe-Institut Dhaka.
                  </p>
                  <span className="font-label-code text-[10px] text-[#ff1493] uppercase tracking-widest font-bold">
                    View on Instagram ↗
                  </span>
                </div>
              </a>

              {/* Tile 2 */}
              <a
                href="https://www.instagram.com/dhakazinemela/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded bg-surface-container-high border-2 border-ink-black shadow-[2px_2px_0px_#1c1c16]"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtZu0oOXERkHBGRAICBowiHGt753HR29gGGta9KDbM74iVO1IV-k8q99S73Z9ukNu7yXrla6VKD-maOLfutB3ER7aBIY8XCQxcOawQsBmvtppx3_rBwdTMT6rd6YbqTGhqc-PUR60NnhFkL9qVkiZ4x74sAMKoSOsfhiYjytPy8UkTMn-eEvdnT3IrE7w_JCj4CxaAiqHJ6dnYUhyZcfjolJf-XMRlY9mUiTMlkNNt2FQMKFpK7aVgsw"
                  alt="Creators sharing and discussing independent handmade zines"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#1c1c16]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-space-sm flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between text-xs font-label-code">
                    <span className="inline-flex items-center gap-1 text-[#ff1493]">
                      <Heart className="w-3.5 h-3.5 fill-current" /> 890
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> 64
                    </span>
                  </div>
                  <p className="text-xs leading-snug line-clamp-3 text-white/90 font-serif-editorial">
                    Creators and readers in close conversation over accordion folds and hand-stitched pamphlets.
                  </p>
                  <span className="font-label-code text-[10px] text-[#ff1493] uppercase tracking-widest font-bold">
                    View on Instagram ↗
                  </span>
                </div>
              </a>

              {/* Tile 3 */}
              <a
                href="https://www.instagram.com/dhakazinemela/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded bg-surface-container-high border-2 border-ink-black shadow-[2px_2px_0px_#1c1c16]"
              >
                <img
                  src="/images/dhaka-zine-mela-logo.png"
                  alt="Official Dhaka Zine Mela logo illustration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#1c1c16]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-space-sm flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between text-xs font-label-code">
                    <span className="inline-flex items-center gap-1 text-[#ff1493]">
                      <Heart className="w-3.5 h-3.5 fill-current" /> 1.2k
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> 88
                    </span>
                  </div>
                  <p className="text-xs leading-snug line-clamp-3 text-white/90 font-serif-editorial">
                    Official emblem badge for Dhaka Zine Mela / Sister Library. Winged freedom in print!
                  </p>
                  <span className="font-label-code text-[10px] text-[#ff1493] uppercase tracking-widest font-bold">
                    View on Instagram ↗
                  </span>
                </div>
              </a>
            </div>

            <div className="pt-space-xs border-t border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs font-label-code text-label-code text-on-surface-variant">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-riso-pink inline-block animate-pulse" />
                <span className="font-bold text-archival-indigo">
                  Live updates, festival open calls &amp; community snapshots
                </span>
              </div>
              <a
                className="inline-flex items-center gap-space-2xs text-primary font-bold hover:underline"
                href="https://www.instagram.com/dhakazinemela/"
                rel="noopener noreferrer"
                target="_blank"
              >
                View all dispatches on Instagram →
              </a>
            </div>
          </div>
        </section>

        {/* 6. Post-Uprising Zine Making Reflection */}
        <section className="flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-[#ea580c] px-space-xs py-space-3xs bg-[#ea580c]/15 rounded font-bold">
              Memory Work
            </span>
            <div className="h-px flex-1 bg-surface-container-high" />
            <span className="font-label-code text-label-code text-on-surface-variant">
              COMMUNITY RETRIEVAL
            </span>
          </div>

          <div className="p-space-lg bg-surface-container rounded border-2 border-ink-black shadow-[3px_3px_0px_#1c1c16] flex flex-col gap-space-lg">
            <div className="flex flex-col gap-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-archival-indigo leading-snug font-serif font-bold">
                IN-ZINE: POST UPRISING ZINE MAKING REFLECTION
              </h3>
            </div>

            <div className="relative w-full overflow-hidden rounded bg-surface-container-high border-2 border-ink-black my-space-xs shadow-[3px_3px_0px_#1c1c16]">
              <img
                src="/images/dzm-post-uprising.jpg"
                alt="Participants gathered at Dhaka Zine Mela workshop creating zines"
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed font-serif-editorial">
              30 days after the July-August 2024 uprising in Bangladesh, we gathered to reflect and document
              the collective recall of the days of violence, police brutality, and terror that preceded regime
              change. Independent print became our sanctuary for unfiltered public grief and solidarity.
            </p>

            {/* Editorial Essay Feature from Daily Star */}
            <article className="p-space-md sm:p-space-lg bg-surface-container-lowest rounded border-2 border-ink-black shadow-[2px_2px_0px_#1c1c16] flex flex-col gap-space-sm">
              <div className="flex items-center justify-between flex-wrap gap-space-xs">
                <span className="font-label-code text-label-code text-riso-pink font-bold uppercase tracking-wider">
                  THE DAILY STAR // BOOKS &amp; LITERATURE — ESSAY
                </span>
                <span className="px-space-xs py-space-3xs bg-primary-fixed text-on-primary-fixed font-label-stamp text-label-stamp rounded font-bold">
                  Critical Essay
                </span>
              </div>

              <h4 className="font-headline-sm text-headline-sm text-archival-indigo leading-snug font-bold font-serif">
                <a
                  className="hover:text-primary transition-colors underline decoration-riso-pink underline-offset-4"
                  href="https://www.thedailystar.net/daily-star-books/news/it-has-be-print-3622471"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  It has to be print
                </a>
              </h4>

              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-code text-label-code">
                <span className="text-archival-indigo font-medium">By Amreeta Lethe</span>
                <span>•</span>
                <span>May 29, 2024</span>
              </div>

              <blockquote className="border-l-2 border-riso-pink pl-space-md my-space-2xs font-title-editorial text-title-editorial text-archival-indigo italic leading-relaxed">
                <span className="text-riso-pink font-bold not-italic mr-space-3xs">“</span>
                Zines, for instance, have long been a popular means of sharing experiences and making
                information accessible among various communities, by way of their self-published and
                non-commercial natures... The unrestrained potential zines hold, to be whatever one can dream
                them into being, is what makes them subversive.
                <span className="text-riso-pink font-bold not-italic ml-space-3xs">”</span>
              </blockquote>

              <div className="pt-space-xs border-t border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs font-label-code text-label-code">
                <span className="text-on-surface-variant">The Daily Star • Daily Star Books</span>
                <a
                  className="inline-flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-primary text-white rounded font-label-code text-label-code font-bold uppercase tracking-wider shadow-[2px_2px_0px_#1c1c16] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all self-start sm:self-auto"
                  href="https://www.thedailystar.net/daily-star-books/news/it-has-be-print-3622471"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Read Full Essay on The Daily Star →
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};
