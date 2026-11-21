import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  FileText,
  Download,
  Layers,
} from "lucide-react";
import { SISTER_LIBRARY_ITEMS } from "../../data/mockData";
import { SisterSubPage } from "./SisterLibraryHub";

interface SisterLibraryReadingCommunityProps {
  onBack: () => void;
  onNavigate: (page: SisterSubPage) => void;
}

interface ZineItem {
  id: string;
  code: string;
  category: "Manifestos" | "Broadsides" | "Manuals" | "Field Notes";
  roomStatus: string;
  roomStatusColor: string;
  volumeBadge: string;
  volumeBadgeBg: string;
  title: string;
  desc: string;
  specs: string;
  actionText: string;
  imageUrl: string;
  imageAlt: string;
}

const ZINE_ITEMS: ZineItem[] = [
  {
    id: "zine-1",
    code: "ZINE-SL-084",
    category: "Manifestos",
    roomStatus: "2 COPIES IN ROOM",
    roomStatusColor: "text-[#ff1493]",
    volumeBadge: "Vol. 04",
    volumeBadgeBg: "bg-[#ff1493] text-white",
    title: "Kitchen Table Manifestos: Domestic Resistance",
    desc: "A collaborative collection of essays, recipes, and strike posters interrogating unpaid reproductive labor and neighborhood kitchens as radical organizing sites.",
    specs: "36 pages • Riso 2-color",
    actionText: "Read Excerpt →",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBf0-fueAeJ7oQbxy9svqIn6wNcWojjDzqjyd8exGFc_zPThALBPcJex7TViiQq-QzTPllmQr-GNTPGoQo_c8hReYrbZZJfD7zXdgQiZq1kIMjuCT7TRqfKXm2txTAhdtVbngtQWSPZfu5M8Vlfva0HtcUvY8UG-7hWUQgBwGX1xlklu1SXc8wUp7YXQgFUSOEIIHfNz3a6H0_ooyLboThFBncKowutlGwX0ZkvGL45CQ9HmglPWhRkA",
    imageAlt: "A close-up studio shot of a two-color risograph zine cover featuring bold abstract feminist linework printed in scarlet red and archival navy blue ink onto thick cream recycled paper.",
  },
  {
    id: "zine-2",
    code: "ZINE-SL-091",
    category: "Broadsides",
    roomStatus: "CIRCULATING",
    roomStatusColor: "text-[#2563eb]",
    volumeBadge: "Anthology",
    volumeBadgeBg: "bg-[#2563eb] text-white",
    title: "Echoes of Dissent: Feminist Poetry 1970–Present",
    desc: "Trilingual anthology gathering radical verse from student protests, Dalit feminist tracts, and anti-authoritarian underground broadsheets.",
    specs: "52 pages • Hand-bound",
    actionText: "Request Copy →",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7o7tCzu69_BDZlnG1fvsRO-QBM8joTRlCexJ-dW8XUGtcjKbFgDnpKhw5deS5gpMsT8hd5s0kSNnr49lHAmEn2VPWTubjupNDPIkIvm3lQKPLWJa17zWPAgL9u5tkPCSjTvWJijfdowTxUUNolgsBO5PTXbw868UDrxxPFMrua3EZc2nlnXYegnQ1HkRxl6ZrDk0ZvMtFHspZKafV80PxyR8qLiPF2H7bYsMFgDiDKp9UXTHB4Cr_KA",
    imageAlt: "Artisanal hand-bound pamphlet with exposed singer-sewn spine stitches lying flat on an unpolished wooden library desk.",
  },
  {
    id: "zine-3",
    code: "ZINE-SL-102",
    category: "Manifestos",
    roomStatus: "ROOM ONLY",
    roomStatusColor: "text-[#ea580c]",
    volumeBadge: "Manual",
    volumeBadgeBg: "bg-[#ea580c] text-white",
    title: "How to Bind a Collective Memory: A Manual",
    desc: "Step-by-step DIY guide to saddle stitching, pamphlet sewing, drum-leaf binding, and stenciling for community organizers on zero budget.",
    specs: "24 pages • Unbleached",
    actionText: "Download PDF →",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDo3Bvtom5TvSNTp6mowo3vmgexKgRgEN3lwXZS6t5TgQodKxIAfxfr-dukYckW6NQRNjUjOlDnZAanFSotubRRNS8MlLpNSME4fy_4f4TW_Bq1tjCtxRuWut_fvqYUEQNtQ59i--9l8967INg-Qh-Wzv-WuZDyF4Aca11wipg8oPGYHRoN98a91yfNtwvS2dMwqxvVlXJvfZXWgTOglwWQXUhNC_jzYxAuTVZgvlnPq-4ZeFKvnHwANQ",
    imageAlt: "Overhead flatlay photograph of a DIY bookbinding instruction manual open on a worktable with bone folders and linen binding thread.",
  },
  {
    id: "zine-4",
    code: "ZINE-SL-118",
    category: "Broadsides",
    roomStatus: "COMMUNITY CART",
    roomStatusColor: "text-[#7e22ce]",
    volumeBadge: "Dispatch",
    volumeBadgeBg: "bg-[#7e22ce] text-white",
    title: "Field Notes from the Travelling Cart",
    desc: "Cartographic logs from our wheeled library's journey through public train concourses, community gardens, and textile worker neighborhoods.",
    specs: "Accordion Fold • 18 panels",
    actionText: "Read Excerpt →",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTHdAxWqo8C23Zyyhp8_4kCBayY_0pkjZqZba-7hfO6wOLEzOsWCmmAeRPnZ8P2IbvhViwZVJrhO_SRneK_IpF0PxKmwL4XT16Fm3Bc_qBvF41P9SuZACBWou7u1gJuesugWVGp373owX3vf4q3Bp8BfT5ReCxRftxggHBgCbotZneGWwanw_TatSkXcf80FizLLaB-dTun3OGAqXs07VBcApee4cdBEBs3XRglfKEKiTlEFCq-UUVMw",
    imageAlt: "Editorial visual of an accordion-fold field journal laid open across a weathered metal cart shelf.",
  },
];

interface AssemblyItem {
  id: string;
  assemblyNo: string;
  dateBadge: string;
  badgeColor: string;
  attendees: string;
  category: "Reading Circles" | "Risograph Workshops" | "Film & Screenings" | "Symposia";
  title: string;
  desc: string;
  artifactText: string;
  recapText: string;
}

const ASSEMBLY_ITEMS: AssemblyItem[] = [
  {
    id: "assembly-072",
    assemblyNo: "Assembly #072",
    dateBadge: "SEP 28, 2024 • RECORDED",
    badgeColor: "text-[#ff1493]",
    attendees: "42 Attendees",
    category: "Risograph Workshops",
    title: "Radical Printmaking & Street Posters",
    desc: "A five-hour intensive on low-cost stencil printing, wheat-paste composition, and rapid reproduction of protest solidarity graphics.",
    artifactText: "Poster PDF (6 MB)",
    recapText: "Recap & Photos →",
  },
  {
    id: "assembly-071",
    assemblyNo: "Assembly #071",
    dateBadge: "SEP 12, 2024 • AUDIO ARCHIVE",
    badgeColor: "text-[#2563eb]",
    attendees: "31 Attendees",
    category: "Reading Circles",
    title: "South Asian Women Writers Circle: On Care & Resistance",
    desc: "Close communal reading of Rokeya Sakhawat Hossain and Ismat Chughtai with open discussion on friendship as political sanctuary.",
    artifactText: "Audio Recording (1h 14m)",
    recapText: "Syllabus →",
  },
  {
    id: "assembly-070",
    assemblyNo: "Assembly #070",
    dateBadge: "AUG 20, 2024 • TRANSCRIPT",
    badgeColor: "text-[#d9822b]",
    attendees: "58 Attendees",
    category: "Symposia",
    title: "Archiving from the Margins: Grassroots Libraries Symposium",
    desc: "Panel discussion with community archivists from Kathmandu, Colombo, and London discussing physical preservation against digital precarity.",
    artifactText: "Transcript",
    recapText: "Field Notes →",
  },
  {
    id: "assembly-069",
    assemblyNo: "Assembly #069",
    dateBadge: "JUL 15, 2024 • ZINE RELEASE",
    badgeColor: "text-[#ff1493]",
    attendees: "36 Attendees",
    category: "Risograph Workshops",
    title: "Midnight Poetry & Risograph Jam",
    desc: "Open-mic gathering under kerosene lanterns followed by live overnight compilation and printing of a 28-contributor collective zine.",
    artifactText: "Anthology Zine",
    recapText: "Gallery →",
  },
];

export const SisterLibraryReadingCommunity: React.FC<SisterLibraryReadingCommunityProps> = ({
  onBack,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [zineFilter, setZineFilter] = useState<string>("All");
  const [assemblyFilter, setAssemblyFilter] = useState<string>("All");
  const [borrowRequested, setBorrowRequested] = useState<string | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

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

  const filteredZines = ZINE_ITEMS.filter((item) => {
    if (zineFilter === "All") return true;
    if (zineFilter === "Manifestos") return item.category === "Manifestos";
    if (zineFilter === "Broadsides") return item.category === "Broadsides";
    return true;
  });

  const filteredAssemblies = ASSEMBLY_ITEMS.filter((item) => {
    if (assemblyFilter === "All") return true;
    return item.category === assemblyFilter;
  });

  const handleBorrow = (title: string) => {
    setBorrowRequested(title);
    setTimeout(() => setBorrowRequested(null), 4000);
  };

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
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

      {/* Action Notice Toast */}
      {actionNotice && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c16] text-[#fdf9ef] border-2 border-[#2563eb] p-4 rounded-xs text-center font-label-code text-xs flex items-center justify-center gap-3 w-11/12 max-w-md shadow-[4px_4px_0px_#2563eb] animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#2563eb] shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      <main className="w-full max-w-max-content-width mx-auto px-4 md:px-gutter-desktop">
        {/* 1. Hero Broadsheet Grid */}
        <section className="py-space-3xl border-b border-on-surface/20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter-desktop items-start" id="overview">
          {/* Left Column: Manifesto Headline & Archival Metrics */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between space-y-space-xl">
            <div className="space-y-space-md">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="px-2.5 py-0.5 bg-[#ff1493] text-white font-label-stamp text-xs uppercase font-black tracking-wider rounded-xs shadow-[2px_2px_0px_#1c1c16]">
                  PINK SHELF
                </span>
                <span className="font-label-code text-label-code text-[#ff1493] uppercase font-bold tracking-wider">
                  [Archival Ledger: 001]
                </span>
                <span className="text-outline">/</span>
                <span className="font-label-stamp text-label-stamp text-on-surface-variant uppercase">
                  Autonomous Feminist Reading Room &amp; Lending Library
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

            {/* Hero Quick Jump CTAs */}
            <div className="flex flex-wrap gap-space-md pt-space-xs">
              <a
                href="#catalog"
                className="btn-press px-space-lg py-space-sm bg-[#ff1493] text-white font-body-md font-semibold border-2 border-on-surface block-shadow-dark flex items-center space-x-space-xs hover:bg-[#e10080] transition-colors"
              >
                <span>Explore Lending Catalog →</span>
              </a>
              <a
                href="#zines"
                className="btn-press px-space-md py-space-sm bg-[#ffffff] text-on-surface font-body-md font-medium border-2 border-on-surface block-shadow-dark flex items-center space-x-space-xs hover:bg-[#f1eee4] transition-colors"
              >
                <span>Publications &amp; Riso Press →</span>
              </a>
              <a
                href="#events"
                className="btn-press px-space-md py-space-sm bg-[#ffffff] text-on-surface font-body-md font-medium border-2 border-on-surface block-shadow-dark flex items-center space-x-space-xs hover:bg-[#f1eee4] transition-colors"
              >
                <span>Past Assemblies →</span>
              </a>
              <a
                href="#pink-shelf"
                className="btn-press px-space-md py-space-sm bg-[#ffffff] text-on-surface font-body-md font-medium border-2 border-on-surface block-shadow-dark flex items-center space-x-space-xs hover:bg-[#f1eee4] transition-colors"
              >
                <span>Visiting &amp; Hours →</span>
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

        {/* 2. Section: Publications & The Risograph Press (#zines) */}
        <section className="py-space-3xl border-b border-on-surface/20" id="zines">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-4">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#1d2a44] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-left font-bold">
                  Press Catalog
                </span>
                <span className="font-label-code text-label-code text-outline uppercase font-medium">
                  / Physical Editions &amp; PDFs
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-serif">
                Publications &amp; The Risograph Press
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs max-w-xl">
                Hand-printed, self-published, and distributed on unbleached newsprint. Available for reading room loans, trade, or sliding-scale acquisition.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-space-sm font-label-code text-label-code flex-wrap gap-2">
              <button
                onClick={() => setZineFilter("All")}
                className={`px-space-xs py-space-2xs border transition-colors cursor-pointer ${
                  zineFilter === "All"
                    ? "border-on-surface bg-[#ff1493] text-white font-bold shadow-[2px_2px_0px_#1c1c16]"
                    : "border-on-surface/30 bg-white text-on-surface hover:bg-[#f1eee4]"
                }`}
              >
                All Prints (142)
              </button>
              <button
                onClick={() => setZineFilter("Manifestos")}
                className={`px-space-xs py-space-2xs border transition-colors cursor-pointer ${
                  zineFilter === "Manifestos"
                    ? "border-on-surface bg-[#ff1493] text-white font-bold shadow-[2px_2px_0px_#1c1c16]"
                    : "border-on-surface/30 bg-white text-on-surface hover:bg-[#f1eee4]"
                }`}
              >
                Manifestos
              </button>
              <button
                onClick={() => setZineFilter("Broadsides")}
                className={`px-space-xs py-space-2xs border transition-colors cursor-pointer ${
                  zineFilter === "Broadsides"
                    ? "border-on-surface bg-[#ff1493] text-white font-bold shadow-[2px_2px_0px_#1c1c16]"
                    : "border-on-surface/30 bg-white text-on-surface hover:bg-[#f1eee4]"
                }`}
              >
                Broadsides
              </button>
            </div>
          </div>

          {/* Zine Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
            {filteredZines.map((zine) => (
              <article
                key={zine.id}
                className="bg-[#fdf9ef]/95 backdrop-blur-md border border-on-surface p-space-md flex flex-col justify-between block-shadow-sm hover:-translate-y-1 transition-transform group"
              >
                <div>
                  <div className="flex justify-between items-center text-outline font-label-stamp text-label-stamp border-b border-on-surface/15 pb-space-2xs mb-space-sm">
                    <span>{zine.code}</span>
                    <span className={`font-bold ${zine.roomStatusColor}`}>
                      {zine.roomStatus}
                    </span>
                  </div>

                  <div className="h-64 bg-surface-container border border-on-surface/20 mb-space-sm overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={zine.imageUrl}
                      alt={zine.imageAlt}
                    />
                    <span
                      className={`absolute top-2 right-2 px-space-xs py-space-3xs font-label-stamp text-label-stamp uppercase font-bold ${zine.volumeBadgeBg}`}
                    >
                      {zine.volumeBadge}
                    </span>
                  </div>

                  <h3 className="font-title-editorial text-title-editorial text-on-surface font-semibold mb-space-2xs leading-snug">
                    {zine.title}
                  </h3>

                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-space-md">
                    {zine.desc}
                  </p>
                </div>

                <div className="pt-space-sm border-t border-on-surface/15 flex justify-between items-center font-label-code text-label-code">
                  <span className="text-on-surface-variant">{zine.specs}</span>
                  <button
                    onClick={() => triggerNotice(`Archival item ${zine.code} selected. Excerpt loaded.`)}
                    className="text-[#ff1493] hover:underline font-bold cursor-pointer"
                  >
                    {zine.actionText}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Section: Past Gatherings & Public Assemblies (#events) */}
        <section className="py-space-3xl border-b border-on-surface/20" id="events">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#ff1493] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-right font-bold">
                  Archival Ledger
                </span>
                <span className="font-label-code text-label-code text-outline uppercase font-medium">
                  / Logged Assemblies
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-serif">
                Past Gatherings &amp; Public Assemblies
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-2xs">
                Every circle produces an artifact: an audio tape, a collective riso broadside, or an annotated reading syllabus deposited into the permanent room archives.
              </p>
            </div>

            {/* Assembly Filter Tags */}
            <div className="flex flex-wrap gap-space-2xs font-label-code text-label-code">
              {[
                "All",
                "Reading Circles",
                "Risograph Workshops",
                "Symposia",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setAssemblyFilter(category)}
                  className={`px-space-sm py-space-2xs text-xs font-bold transition-colors cursor-pointer border ${
                    assemblyFilter === category
                      ? "bg-[#ff1493] text-white border-on-surface shadow-[2px_2px_0px_#1c1c16]"
                      : "bg-[#f1eee4] text-on-surface-variant border-on-surface/20 hover:bg-[#e8e4d8]"
                  }`}
                >
                  {category === "All" ? "All Gatherings" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Events Ledger Table / Grid */}
          <div className="border-2 border-on-surface bg-[#fdf9ef] divide-y divide-on-surface/20 block-shadow-sm">
            {filteredAssemblies.map((assembly) => (
              <div
                key={assembly.id}
                className="p-space-lg grid grid-cols-12 gap-4 lg:gap-gutter-desktop items-center hover:bg-[#f5f0e2] transition-colors"
              >
                <div className="col-span-12 md:col-span-3">
                  <span
                    className={`font-label-stamp text-label-stamp font-bold block ${assembly.badgeColor}`}
                  >
                    {assembly.dateBadge}
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    {assembly.assemblyNo} • {assembly.attendees}
                  </span>
                </div>

                <div className="col-span-12 md:col-span-6 space-y-space-3xs">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-serif font-bold">
                    {assembly.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant font-serif-editorial">
                    {assembly.desc}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-3 flex justify-start md:justify-end items-center space-x-space-sm">
                  <button
                    onClick={() => triggerNotice(`Document retrieval: ${assembly.artifactText}`)}
                    className="px-space-sm py-space-2xs border border-on-surface bg-[#f1eee4] text-body-sm hover:bg-[#ff1493] hover:text-white font-label-code text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {assembly.artifactText}
                  </button>
                  <button
                    onClick={() => triggerNotice(`Viewing gallery archives for ${assembly.assemblyNo}`)}
                    className="text-[#ff1493] hover:underline font-body-sm font-medium font-label-code text-xs cursor-pointer"
                  >
                    {assembly.recapText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ledger Archive Pagination / Expansion CTA */}
          <div className="mt-space-lg flex flex-col sm:flex-row justify-between items-center gap-3 text-on-surface-variant font-label-code text-label-code">
            <span>Showing {filteredAssemblies.length} of 72 Recorded Assemblies</span>
            <div className="px-space-md py-space-xs border border-on-surface bg-[#f1eee4] block-shadow-sm text-on-surface font-semibold inline-flex items-center space-x-space-2xs">
              <span>2019–2026 Permanent Room Archives</span>
            </div>
          </div>
        </section>

        {/* 4. Section: Visiting, Hours & Etiquette (id="pink-shelf") */}
        <section className="py-space-3xl border-b border-on-surface/20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter-desktop items-start" id="pink-shelf">
          <div className="col-span-12 lg:col-span-7 bg-[#fdf9ef]/90 backdrop-blur-md border-2 border-on-surface p-4 sm:p-space-lg md:p-space-xl block-shadow-pink space-y-space-lg">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#ff1493] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-right font-bold">
                  THE PINK SHELF
                </span>
                <span className="font-label-code text-label-code text-outline font-medium">
                  GOETHE-INSTITUT LIBRARY
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-serif">Visiting, Hours &amp; Etiquette</h2>
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
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold font-serif">
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

        {/* 5. Section: Pink Shelf Living Lending Collection (#catalog) */}
        <section className="py-space-3xl" id="catalog">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-space-xl pb-space-md border-b-2 border-on-surface/20">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#ff1493] text-white font-label-stamp text-label-stamp uppercase font-bold">
                  CATALOGUE
                </span>
                <span className="font-label-code text-label-code text-outline uppercase font-medium">
                  / Pink Shelf Living Lending Collection
                </span>
              </div>
              <h2 className="font-display-hero text-headline-lg text-on-surface font-serif">
                Pink Shelf Living Lending Collection
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

export { SisterLibraryReadingCommunity as SisterLibraryPinkShelf };
