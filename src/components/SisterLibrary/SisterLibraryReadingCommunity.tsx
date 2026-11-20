import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { SISTER_LIBRARY_ITEMS } from "../../data/mockData";
import { SisterSubPage } from "./SisterLibraryHub";

interface SisterLibraryReadingCommunityProps {
  onBack: () => void;
  onNavigate: (page: SisterSubPage) => void;
}

export const SisterLibraryReadingCommunity: React.FC<SisterLibraryReadingCommunityProps> = ({
  onBack,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [borrowRequested, setBorrowRequested] = useState<string | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(SISTER_LIBRARY_ITEMS.map((item) => item.category))),
  ];

  const filteredItems = SISTER_LIBRARY_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.curatorNote.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBorrow = (title: string) => {
    setBorrowRequested(title);
    setTimeout(() => setBorrowRequested(null), 4000);
  };

  return (
    <div className="w-full text-on-surface font-body-md animate-in fade-in duration-300">
      {/* Borrow Request Toast */}
      {borrowRequested && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c16] text-[#fdf9ef] border-2 border-[#ff1493] p-4 rounded-xs text-center font-label-code text-xs flex items-center justify-center gap-3 w-11/12 max-w-xl shadow-[4px_4px_0px_#ff1493] animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#ff1493] shrink-0" />
          <span>
            <strong className="block text-[#ff1493] mb-0.5">
              LOAN REQUEST REGISTERED
            </strong>
            "{borrowRequested}" has been logged in our physical ledger. Collect at the Pink Shelf in Goethe-Institut Dhaka.
          </span>
        </div>
      )}

      {/* RSVP Modal / Toast */}
      {rsvpSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c16] text-[#fdf9ef] border-2 border-[#ff7a00] p-4 rounded-xs text-center font-label-code text-xs flex items-center justify-center gap-3 w-11/12 max-w-md shadow-[4px_4px_0px_#ff7a00] animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#ff7a00] shrink-0" />
          <span>
            <strong className="block text-[#ff7a00] mb-0.5">SEAT RESERVED</strong>
            You are registered for the next Feminist Zine-Making Workshop!
          </span>
        </div>
      )}

      <main className="w-full max-w-max-content-width mx-auto px-4 md:px-gutter-desktop">
        {/* 1. Hero Broadsheet Grid */}
        <section className="py-space-3xl border-b border-on-surface/20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter-desktop items-start">
          {/* Left Column: Manifesto Headline & Archival Metrics */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between space-y-space-xl">
            <div className="space-y-space-md">
              <div className="flex items-center space-x-space-sm">
                <span className="font-label-code text-label-code text-[#ff1493] uppercase font-bold tracking-wider">
                  [Archival Ledger: 001]
                </span>
                <span className="text-outline">/</span>
                <span className="font-label-stamp text-label-stamp text-on-surface-variant uppercase">
                  Traveling Reading Room &amp; Publishing Press
                </span>
              </div>

              <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight leading-none">
                An evolving archive of women’s &amp; queer literature, hand-bound zines, and communal study.
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl pt-space-xs">
                Sister Library is an autonomous, non-institutional reading space holding over 3,400 self-published feminist tracts, risograph broadsides, out-of-print poetry, and radical pamphlets. We circulate ideas outside traditional market circuits.
              </p>
            </div>

            {/* Archival Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm py-space-sm border-y border-on-surface/20">
              <div className="bg-[#f1eee4] p-space-sm border border-on-surface/20">
                <p className="font-display-hero text-headline-md text-[#ff1493] font-bold">3,400+</p>
                <p className="font-label-code text-label-code text-on-surface-variant uppercase">Cataloged Works</p>
              </div>
              <div className="bg-[#f1eee4] p-space-sm border border-on-surface/20">
                <p className="font-display-hero text-headline-md text-[#7e22ce] font-bold">100%</p>
                <p className="font-label-code text-label-code text-on-surface-variant uppercase">Autonomous</p>
              </div>
              <div className="bg-[#f1eee4] p-space-sm border border-on-surface/20">
                <p className="font-display-hero text-headline-md text-[#ea580c] font-bold">28 Labs</p>
                <p className="font-label-code text-label-code text-on-surface-variant uppercase">Risograph Jam Editions</p>
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap gap-space-md pt-space-xs">
              <a
                href="#catalog"
                className="btn-press px-space-lg py-space-sm bg-[#ff1493] text-white font-body-md font-semibold border-2 border-on-surface block-shadow-dark flex items-center space-x-space-xs"
              >
                <span>Explore Lending Catalog →</span>
              </a>
              <a
                href="#manifesto"
                className="btn-press px-space-lg py-space-sm bg-[#ffffff] text-on-surface font-body-md font-medium border-2 border-on-surface block-shadow-dark flex items-center space-x-space-xs hover:bg-[#f1eee4]"
              >
                <span>Read The Manifesto</span>
              </a>
            </div>
          </div>

          {/* Right Column: Tactile Collage & Next Assemblage Card */}
          <div className="col-span-12 lg:col-span-5 relative mt-space-lg lg:mt-0">
            {/* Adhesive Paper Tape */}
            <div className="absolute -top-3 left-1/3 w-32 h-6 paper-tape z-20 stamp-rotate-left" />

            <div className="bg-[#fdf9ef]/95 backdrop-blur-md border-2 border-on-surface p-space-lg block-shadow-orange relative z-10">
              <div className="flex justify-between items-center border-b border-on-surface/20 pb-space-xs mb-space-md">
                <span className="font-label-code text-label-code text-[#ea580c] uppercase font-bold">
                  Next Assemblage
                </span>
                <span className="px-space-xs py-space-3xs bg-[#ea580c] text-white font-label-stamp text-label-stamp stamp-rotate-right uppercase font-bold">
                  Free &amp; Open
                </span>
              </div>

              {/* Featured Image with risograph style tone */}
              <div className="relative border border-on-surface overflow-hidden mb-space-md aspect-[4/3] bg-surface-container-high">
                <img
                  className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-95"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxt2I81Y8cbbvq5XuGqSOvOSdWKYpeHGpUuvNxqlj5nNc3zetdy3LJ0az2XTqNoz1DQ5T4S1x-B2II7wEE6AmQd1lqzBAkgtEOtFhnHnwilvPvy2lvi9gB84AGqp9-l0eq4VSwPfYh1NB6PWPFNVR9kZb8sBOlJb7uly1Ni_aNWcgWYA4Fc7uoULKqGJ-cn1WX1BjD2yfIZ4Qv2-knGg2wB8akQD0qDWd3IJVfuXo8Q0bodjHkY49Dfw"
                  alt="Feminist zine making workshop participants"
                />
                <div className="absolute inset-0 bg-[#ff1493]/20 pointer-events-none mix-blend-color" />
                <span className="absolute bottom-2 left-2 px-space-xs py-space-3xs bg-on-surface text-surface font-label-stamp text-label-stamp uppercase">
                  ARCHIVAL SNAPSHOT #412
                </span>
              </div>

              <div className="space-y-space-xs">
                <span className="font-label-code text-label-code text-[#ea580c] font-semibold">
                  SATURDAY, OCT 14 • 3:00 PM
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Feminist Zine-Making &amp; Oral Histories Workshop
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Facilitated by visiting archivists. Materials, soy-ink riso stencils, unbleached cartridge papers, and bookbinding thread provided. No prior experience needed.
                </p>
              </div>

              <div className="mt-space-md pt-space-xs border-t border-on-surface/20 flex justify-between items-center font-label-code text-label-code">
                <span className="text-outline">CAPACITY: 24 (RSVP OPEN)</span>
                <button
                  onClick={() => {
                    setRsvpSuccess(true);
                    setTimeout(() => setRsvpSuccess(false), 3500);
                  }}
                  className="text-[#ff1493] font-bold hover:underline cursor-pointer"
                >
                  Reserve a Chair →
                </button>
              </div>
            </div>

            {/* Archival Card Stash behind */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full bg-[#f1eee4] border border-on-surface -z-10 stamp-rotate-right" />
          </div>
        </section>

        {/* 2. Living Doctrine / Manifesto: Why We Read Women */}
        <section className="py-space-3xl border-b border-on-surface/20" id="manifesto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter-desktop items-center">
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-between space-y-space-lg">
              <div>
                <div className="flex items-center space-x-space-xs mb-space-2xs">
                  <span className="px-space-xs py-space-3xs bg-[#ff1493] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-left font-bold">
                    [MANIFESTO]
                  </span>
                  <span className="font-label-code text-label-code text-outline uppercase font-medium">
                    / Living Doctrine
                  </span>
                </div>
                <h2 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight leading-tight mt-space-2xs">
                  Why We Read Women.
                </h2>
                <div className="space-y-space-md pt-space-md font-body-lg text-body-lg text-on-surface-variant">
                  <p>
                    Sister Library is a space to celebrate female excellence, to unearth and amplify voices silenced by patriarchal canon, and to build an enduring collective memory through self-publishing, physical print, and mutual care.
                  </p>
                  <p>
                    We read women not as an addendum to literature, but as the foundational center of thought, rebellion, and world-making. Every zine, book, and conversation housed in our shelves is an act of resistance against erasure.
                  </p>
                  <blockquote className="border-l-4 border-[#ff1493] pl-space-md py-space-2xs italic font-display-hero text-headline-sm text-on-surface bg-[#ffffff]/60 backdrop-blur-xs">
                    “Reading together is our collective rebellion. When we gather, share, and archive our stories, we build autonomous futures.”
                  </blockquote>
                </div>
              </div>

              <div className="pt-space-md border-t border-on-surface/20 flex flex-wrap items-center justify-between gap-space-sm font-label-code text-label-code">
                <div className="flex items-center space-x-space-xs">
                  <span className="text-outline">Initiated by</span>
                  <span className="font-bold text-[#ff1493]">Aqui Thami</span>
                  <span className="text-outline">• Mumbai • Dhaka Branch</span>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 relative mt-space-lg lg:mt-0">
              <div className="bg-[#fdf9ef]/90 backdrop-blur-md border-2 border-on-surface p-space-sm block-shadow-pink relative z-10">
                <div className="relative border border-on-surface overflow-hidden aspect-[4/3] bg-surface-container">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKrF7OSYkpxQ-cIrZ9K8XgBJjhGaIRnvUsLU76vVAjGx1SVWQz116vKB10r9PCDxRU20nw9JkwA6xfyFqSbWJp5tOo-mhqtWic-kGrfJikJjtmTnYuzbuwEdFNN7iIsNbl0uffy8HlstqOCul53VvqPnOOCtv0DUeHWvgxQxrKnmwXlqjrxgNVwDztenmXyma8aCcAwdx_gP3cknqFy6ZosNjc40fNvLVolg01tkjNQ3KB0ySzqpqF9f6tyslMlmcPrunjrVzHqrYJ0Kw"
                    alt="Sister Library Reading Room and Feminist Zines Archive"
                  />
                  <div className="absolute inset-0 bg-[#ff1493]/15 pointer-events-none mix-blend-color" />
                </div>
                <div className="pt-space-xs mt-space-2xs flex items-center justify-between text-outline font-label-code text-label-code">
                  <span className="text-on-surface font-medium">BON BIBI - A FEMINIST READING</span>
                </div>
              </div>
              <div className="hidden sm:block absolute -bottom-3 -right-3 w-full h-full bg-[#f1eee4] border border-on-surface -z-10 stamp-rotate-right" />
            </div>
          </div>
        </section>

        {/* 3. The Pink Shelf & Visiting Etiquette */}
        <section className="py-space-3xl border-b border-on-surface/20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter-desktop items-start" id="visiting">
          <div className="col-span-12 lg:col-span-7 bg-[#fdf9ef]/90 backdrop-blur-md border-2 border-on-surface p-4 sm:p-space-lg md:p-space-xl block-shadow-purple space-y-space-lg">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#7e22ce] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-right font-bold">
                  THE PINK SHELF
                </span>
                <span className="font-label-code text-label-code text-outline font-medium">
                  GOETHE - INSTITUT LIBRARY
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Visiting, Hours &amp; Etiquette</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
                We operate as a safe, slow reading space open to all who respect feminist solidarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md font-body-sm">
              <div className="border border-on-surface/30 p-space-md bg-white/80">
                <span className="font-label-stamp text-label-stamp text-[#ff1493] uppercase font-bold block mb-space-2xs">
                  LIBRARY HOURS
                </span>
                <ul className="space-y-space-3xs font-label-code text-label-code text-on-surface">
                  <li className="flex justify-between"><span>Sat – Wed</span> <strong className="font-bold">10:00 AM – 6:00 PM</strong></li>
                  <li className="flex justify-between"><span>Thu – Fri</span> <strong className="font-bold">Sanctuary Quiet Hours</strong></li>
                </ul>
              </div>

              <div className="border border-on-surface/30 p-space-md bg-white/80">
                <span className="font-label-stamp text-label-stamp text-[#2563eb] uppercase font-bold block mb-space-2xs">
                  ROOM ETIQUETTE
                </span>
                <ul className="space-y-space-3xs font-label-code text-label-code text-on-surface-variant">
                  <li>• Handle riso prints by the spine</li>
                  <li>• Free photocopying for zine excerpts</li>
                  <li>• Open tea table &amp; quiet discussions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 bg-[#fdf9ef]/90 backdrop-blur-md border-2 border-on-surface p-space-xl block-shadow-blue space-y-space-md">
            <span className="px-space-xs py-space-3xs bg-[#2563eb] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-left font-bold inline-block">
              LOCATION // DHAKA
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Goethe-Institut Bangladesh
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Road 9 (new), House 10, Dhanmondi R/A, Dhaka 1205. Ask for the Pink Shelf in the library room.
            </p>
            <div className="pt-space-sm border-t border-on-surface/20 font-label-code text-label-code flex justify-between items-center">
              <span className="text-outline">Open Commons Access</span>
              <span className="text-[#2563eb] font-bold">Admission Free</span>
            </div>
          </div>
        </section>

        {/* 4. Living Catalogue & Lending Sanctuary */}
        <section className="py-space-3xl" id="catalog">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-space-xl pb-space-md border-b-2 border-on-surface/20">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#ff1493] text-white font-label-stamp text-label-stamp uppercase font-bold">
                  CATALOGUE
                </span>
                <span className="font-label-code text-label-code text-outline uppercase font-medium">
                  / Living Lending Collection
                </span>
              </div>
              <h2 className="font-display-hero text-headline-lg text-on-surface">
                Borrow Books &amp; Risograph Zines
              </h2>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80 bg-white border-2 border-on-surface px-4 py-2 flex items-center gap-2 shadow-[2px_2px_0px_#1c1c16]">
              <Search className="w-4 h-4 text-[#ff1493]" />
              <input
                type="text"
                placeholder="Search zines, theory, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-on-surface focus:outline-none placeholder:text-outline font-label-code"
              />
            </div>
          </div>

          {/* Category Filter Badges */}
          <div className="flex flex-wrap gap-2 mb-space-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[40px] px-3.5 py-2 text-xs font-label-code font-bold uppercase transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-[#ff1493] text-white border-on-surface shadow-[2px_2px_0px_#1c1c16]"
                    : "bg-white text-on-surface border-on-surface/30 hover:border-on-surface hover:bg-[#f1eee4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-gutter-desktop">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="bg-[#fdf9ef]/95 backdrop-blur-md border-2 border-on-surface p-space-md flex flex-col justify-between block-shadow-sm hover:-translate-y-1 transition-transform group"
              >
                <div>
                  <div className="aspect-[3/4] mb-space-sm overflow-hidden border border-on-surface/30 relative bg-[#f1eee4]">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={item.coverImage}
                    />
                    <span
                      className={`absolute top-2 right-2 font-label-stamp text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-on-surface ${
                        item.condition === "Available"
                          ? "bg-[#BAD687] text-[#1c1c16]"
                          : item.condition === "On Loan"
                          ? "bg-[#ea580c] text-white"
                          : "bg-[#ff1493] text-[#1c1c16]"
                      }`}
                    >
                      {item.condition}
                    </span>
                  </div>

                  <span className="font-label-stamp text-[10px] font-bold text-[#ff1493] uppercase tracking-wider block">
                    {item.category}
                  </span>

                  <h3 className="font-title-editorial text-title-editorial text-on-surface font-bold mt-1 leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-label-code text-xs text-on-surface-variant font-medium mt-0.5">
                    By {item.author}
                  </p>

                  <p className="text-xs text-on-surface-variant mt-3 bg-white p-2.5 border border-on-surface/20 italic font-serif">
                    "{item.curatorNote}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-on-surface/20 font-label-code text-xs flex items-center justify-between">
                  <span className="text-[10px] text-outline">
                    {item.donatedBy || "Sister Archive"}
                  </span>

                  <button
                    onClick={() => handleBorrow(item.title)}
                    className="min-h-[38px] bg-[#ff1493] hover:bg-[#e10080] text-[#1c1c16] px-3.5 py-2 font-black uppercase text-[11px] border border-on-surface shadow-[1px_1px_0px_#1c1c16] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    Request Loan
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-outline font-label-code text-sm">
              No archival works match "{searchQuery}" in category "{selectedCategory}".
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
