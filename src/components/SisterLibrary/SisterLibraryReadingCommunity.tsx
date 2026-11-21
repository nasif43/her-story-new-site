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
  ArrowRight,
  QrCode,
  Users,
  Camera,
  MessageCircle,
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
    imageAlt: "Risograph zine cover featuring bold abstract feminist linework printed in scarlet red and archival navy blue ink onto thick cream recycled paper.",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBC6g4iP9Rz0hIqGz84XU1X-u91U_zX4-Bw9w6g7h8_i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2",
    imageAlt: "Risograph map fold-out showing traveling library route coordinates across South Asian communities.",
  },
];

export const SisterLibraryReadingCommunity: React.FC<SisterLibraryReadingCommunityProps> = ({
  onBack,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [zineFilter, setZineFilter] = useState("All");
  const [borrowRequested, setBorrowRequested] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const categories = [
    "All",
    "Feminist Theory",
    "Poetry & Plays",
    "Ecofeminism",
    "Memoir & Diaries",
    "Radical Pedagogies",
  ];

  const filteredBooks = SISTER_LIBRARY_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
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

  const handleBorrowRequest = (bookTitle: string) => {
    setBorrowRequested(bookTitle);
    setTimeout(() => setBorrowRequested(null), 4000);
  };

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="w-full text-on-surface font-body-md animate-in fade-in duration-300 bg-[#fdf9ef]">
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

      {/* Action Notice Toast */}
      {actionNotice && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c16] text-[#fdf9ef] border-2 border-[#2563eb] p-4 rounded-xs text-center font-label-code text-xs flex items-center justify-center gap-3 w-11/12 max-w-md shadow-[4px_4px_0px_#2563eb] animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#2563eb] shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      <main className="w-full max-w-max-content-width mx-auto px-4 md:px-gutter-desktop">
        {/* ─────────────────────────────────────────────────────────────
            1. HERO & MANIFESTO HEADER (EXACT STITCH SPEC)
            ───────────────────────────────────────────────────────────── */}
        <section className="pt-space-3xl pb-space-2xl w-full" id="overview">
          <div className="flex flex-col gap-space-md w-full max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-3 bg-[#ff1493] inline-block shadow-[1px_1px_0px_#1d2a44]" />
              <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-[#1d2a44] font-bold">
                Decentralized Library Network
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1d2a44] tracking-tight font-medium leading-[1.08] w-full">
              The Pink Shelves:{" "}
              <span className="italic font-normal text-[#ff1493]">Radical Reading</span>{" "}
              for academic institutions, cultural organisations or personal libraries
            </h1>

            {/* Subheading */}
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl pt-space-xs leading-relaxed">
              Sister Library’s Pink Shelves curate women’s and non-binary voices to amplify and boost visibility. If you have a space you want to paint pink, we are here to support you in the radicalisation.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-md">
              <a
                href="#host-shelf"
                className="inline-flex items-center gap-space-xs bg-[#ff1493] text-white font-label-stamp text-xs uppercase px-space-lg py-space-sm shadow-[3px_3px_0px_#1d2a44] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer font-bold"
              >
                <BookOpen className="w-4 h-4" />
                <span>Host a Pink Shelf</span>
              </a>

              <a
                href="#whatsapp-circle"
                className="inline-flex items-center gap-space-xs bg-[#1d2a44] text-[#fdf9ef] font-label-stamp text-xs uppercase px-space-lg py-space-sm shadow-[3px_3px_0px_#ff1493] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer font-bold"
              >
                <Users className="w-4 h-4" />
                <span>Join WHATSAPP Reading Community</span>
              </a>

              <a
                href="#catalog"
                className="inline-flex items-center gap-space-xs bg-white text-[#1d2a44] border border-[#1d2a44]/30 font-label-stamp text-xs uppercase px-space-md py-space-sm shadow-[2px_2px_0px_#1d2a44] hover:bg-[#f1eee4] transition-all cursor-pointer"
              >
                <span>Browse Lending Stacks ↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            2. CURATORIAL VISUAL SHOWCASE PLATE (EXACT STITCH SPEC)
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-md w-full">
          <div className="bg-[#f7f3e9] p-space-md sm:p-space-lg shadow-[6px_6px_0px_#1d2a44] border border-[#1d2a44]/20">
            {/* Archival Plate Header Stamp */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm mb-space-sm bg-white p-space-sm shadow-[2px_2px_0px_#1d2a44] border border-[#1d2a44]/20">
              <div className="flex items-center gap-space-sm font-label-stamp text-xs">
                <span className="px-2 py-0.5 bg-[#ff1493] text-white font-bold">PLATE REF // PS-2026-DHAKA</span>
                <span className="text-[#1d2a44] font-bold">PHYSICAL INSTANCE: SISTER LIBRARY ARCHIVE</span>
              </div>
              <div className="flex items-center gap-space-md font-label-code text-xs text-on-surface-variant">
                <span>FINISH: HOT PINK ACRYLIC ON SOLID TEAK</span>
                <span className="hidden md:inline">•</span>
                <span className="text-[#ff1493] font-bold">HAND-NUMBERED SHELF ID: 014</span>
              </div>
            </div>

            {/* Main Showcase Photograph */}
            <div className="relative w-full overflow-hidden bg-[#1d2a44] shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] border border-[#1d2a44]">
              <img
                src="/images/pink-shelf/pink-shelf-hero.jpg"
                alt="Sister Library Pink Shelf loaded with colorful feminist literature, handmade zines, posters, and reading room armchairs"
                className="w-full h-auto max-h-[640px] object-cover filter saturate-110"
              />
              {/* Live Stamped Tag Overlay */}
              <div className="absolute bottom-4 left-4 bg-white/95 p-space-sm shadow-[3px_3px_0px_#ff1493] backdrop-blur-sm max-w-sm hidden sm:flex flex-col gap-1 border border-[#1d2a44]/20">
                <span className="font-label-stamp text-xs text-[#ff1493] uppercase font-bold">
                  Reading list 2026
                </span>
                <p className="font-body-sm text-xs text-[#1d2a44] leading-snug">
                  Sister Library Reading List composed in partnership with our beloved Bookworm
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            3. HOW TO HOST A PINK SHELF & JOIN THE CIRCLES (3-STEP MANIFESTO)
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-2xl w-full" id="host-shelf">
          <div className="flex flex-col gap-space-xs mb-space-xl">
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-3 bg-[#ff1493] inline-block shadow-[1px_1px_0px_#1d2a44]" />
              <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-[#1d2a44] font-bold">
                COMMUNITY BLUEPRINT // AUTONOMOUS HUBS
              </span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-4xl text-[#1d2a44] tracking-tight font-medium">
              How to Host a Pink Shelf &amp; Join the Circles
            </h2>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-3xl pt-space-3xs leading-relaxed">
              Bringing feminist literature into your community is a straightforward, collaborative process. Through an easy application, Sister Library equips each host with an autonomous starter kit, including curated feminist texts and full documentation to support independent stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md w-full">
            {/* Step 01 */}
            <div className="bg-[#ece8de] p-space-lg shadow-[4px_4px_0px_#1d2a44] border border-[#1d2a44]/20 flex flex-col justify-between gap-space-md">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between border-b border-[#1d2a44]/15 pb-space-xs">
                  <span className="font-label-stamp text-xs uppercase text-[#ff1493] font-bold">
                    STEP 01 // SHELVING
                  </span>
                  <BookOpen className="w-5 h-5 text-[#1d2a44]" />
                </div>
                <h3 className="font-headline-md text-xl text-[#1d2a44] font-bold">
                  Host a Pink Shelf
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Setting up a Pink Shelf is an easy, grassroots process. Collectives, cafes, studios, or individuals apply, and upon confirmation Sister Library sends an autonomous starter kit containing feminist literature, zines, an accession stamp, and circulation materials to kickstart your local space.
                </p>
              </div>
              <div className="pt-space-xs">
                <a
                  href="https://forms.gle/S9UpUo4aFwYFxmkJ6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-space-xs w-full bg-[#ff1493] text-white font-label-stamp text-xs uppercase px-space-md py-space-sm shadow-[3px_3px_0px_#1d2a44] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all font-bold cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Pink Shelf Application Form</span>
                </a>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-[#ece8de] p-space-lg shadow-[4px_4px_0px_#1d2a44] border border-[#1d2a44]/20 flex flex-col justify-between gap-space-md" id="whatsapp-circle">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between border-b border-[#1d2a44]/15 pb-space-xs">
                  <span className="font-label-stamp text-xs uppercase text-[#ff1493] font-bold">
                    STEP 02 // CIRCLES
                  </span>
                  <MessageCircle className="w-5 h-5 text-[#1d2a44]" />
                </div>
                <h3 className="font-headline-md text-xl text-[#1d2a44] font-bold">
                  WhatsApp Reading Community
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  A dedicated community circle where members share readings, reflections, meeting reminders, reading circle coordinates, and spontaneous feminist book recommendations.
                </p>
              </div>
              <div className="flex flex-col items-center gap-space-xs pt-space-xs">
                <div className="p-space-xs bg-white border border-[#1d2a44]/15 shadow-[2px_2px_0px_#1d2a44] max-w-[180px] w-full flex flex-col items-center">
                  <img
                    src="/images/pink-shelf/whatsapp-qr.png"
                    alt="WhatsApp Reading Community QR Code"
                    className="w-full h-auto object-contain"
                  />
                  <span className="font-label-stamp text-[10px] uppercase text-[#1d2a44] pt-space-3xs text-center font-bold">
                    Scan to Join WhatsApp Circle
                  </span>
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-[#ece8de] p-space-lg shadow-[4px_4px_0px_#1d2a44] border border-[#1d2a44]/20 flex flex-col justify-between gap-space-md">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between border-b border-[#1d2a44]/15 pb-space-xs">
                  <span className="font-label-stamp text-xs uppercase text-[#ff1493] font-bold">
                    STEP 03 // DISPATCHES
                  </span>
                  <Users className="w-5 h-5 text-[#1d2a44]" />
                </div>
                <h3 className="font-headline-md text-xl text-[#1d2a44] font-bold">
                  Facebook Community
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  A central space for reading lists, creative opportunities, open calls, and live Sister Library updates and gatherings across regional nodes and participating library circles.
                </p>
              </div>
              <div className="pt-space-xs">
                <a
                  href="https://www.facebook.com/groups/944131136078290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-space-xs w-full bg-[#1d2a44] text-[#fdf9ef] font-label-stamp text-xs uppercase px-space-md py-space-sm shadow-[3px_3px_0px_#ff1493] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all font-bold cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Join Facebook Group</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. COMMUNITY ARCHIVE // UNIVERSITY CHAPTER (IUB PINK SHELF)
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-2xl w-full">
          <div className="flex flex-col gap-space-xs mb-space-xl">
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-3 bg-[#ff1493] inline-block shadow-[1px_1px_0px_#1d2a44]" />
              <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-[#1d2a44] font-bold">
                COMMUNITY ARCHIVE // UNIVERSITY CHAPTER
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="max-w-3xl">
                <h2 className="font-headline-lg text-2xl sm:text-4xl text-[#1d2a44] tracking-tight font-medium">
                  Independent University Bangladesh (IUB) Pink Shelf
                </h2>
                <p className="font-body-md text-sm sm:text-base text-on-surface-variant pt-space-xs leading-relaxed">
                  Visible, radical and caring. The IUB Pink Shelf in the IUB Library is curated by Sister Library and cared for by the IUB librarians with the guidance of Associate Prof. Marufa Akter at the Dept. of Global Studies and Governance.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-space-2xs bg-[#ece8de] px-space-sm py-space-xs border border-[#1d2a44]/20 font-label-code text-xs text-[#1d2a44]">
                <Camera className="w-4 h-4 text-[#ff1493]" />
                <span className="font-bold">6 ARCHIVAL PLATES</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-space-xl w-full">
            {/* Plate 1: Hero Wide */}
            <div className="flex flex-col gap-space-xs">
              <div className="relative overflow-hidden bg-[#1d2a44] shadow-[4px_4px_0px_#1d2a44] border border-[#1d2a44]">
                <img
                  src="/images/pink-shelf/iub-inauguration.jpg"
                  alt="IUB Campus Group Inauguration with IUB, Goethe Institut and HerStory Foundation representatives"
                  className="w-full h-auto object-cover max-h-[520px] filter saturate-110"
                />
              </div>
              <p className="font-label-code text-xs text-on-surface-variant pt-space-3xs font-medium">
                IUB Campus Group Inauguration with IUB, Goethe Institut and HerStory Foundation representatives.
              </p>
            </div>

            {/* Plates 2 & 3: 2-column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
              <div className="md:col-span-7 flex flex-col gap-space-xs">
                <div className="relative overflow-hidden bg-[#1d2a44] shadow-[4px_4px_0px_#1d2a44] border border-[#1d2a44]">
                  <img
                    src="/images/pink-shelf/dr-marufa.jpg"
                    alt="Dr. Marufa delivering remarks"
                    className="w-full h-[360px] object-cover filter saturate-110"
                  />
                </div>
                <p className="font-label-code text-xs text-on-surface-variant pt-space-3xs font-medium">
                  Dr. Marufa delivers remarks at the Sister Library Pink Shelf launch
                </p>
              </div>

              <div className="md:col-span-5 flex flex-col gap-space-xs">
                <div className="relative overflow-hidden bg-[#1d2a44] shadow-[4px_4px_0px_#1d2a44] border border-[#1d2a44]">
                  <img
                    src="/images/pink-shelf/niaz-zareen.jpg"
                    alt="Prof. Niaz Zaman and Zareen Mahmud Hosein"
                    className="w-full h-[360px] object-cover filter saturate-110"
                  />
                </div>
                <p className="font-label-code text-xs text-on-surface-variant pt-space-3xs font-medium">
                  Prof. Niaz Zaman &amp; Zareen Mahmud Hosein at the shelf installation
                </p>
              </div>
            </div>

            {/* Stewardship Section: Plates 4, 5, 6 */}
            <div className="flex flex-col gap-space-md pt-space-lg border-t border-[#1d2a44]/15">
              <div className="flex flex-col gap-space-3xs">
                <span className="font-label-stamp text-xs uppercase tracking-widest text-[#ff1493] font-bold">
                  COMMUNITY VOICES // STEWARDSHIP
                </span>
                <h3 className="font-headline-md text-xl text-[#1d2a44] font-bold">
                  Mentors &amp; Librarians
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="relative h-[320px] overflow-hidden bg-[#1d2a44] shadow-[3px_3px_0px_#1d2a44] border border-[#1d2a44]">
                    <img
                      src="/images/pink-shelf/niaz-zaman.jpg"
                      alt="Prof. Niaz Zaman"
                      className="w-full h-full object-cover filter saturate-110"
                    />
                  </div>
                  <p className="font-label-code text-xs text-on-surface-variant pt-space-3xs font-medium">
                    Prof. Niaz Zaman — Writer, scholar &amp; patron
                  </p>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <div className="relative h-[320px] overflow-hidden bg-[#1d2a44] shadow-[3px_3px_0px_#1d2a44] border border-[#1d2a44]">
                    <img
                      src="/images/pink-shelf/khurshida-jahan.jpg"
                      alt="Ms. Khurshida Jahan"
                      className="w-full h-full object-cover filter saturate-110"
                    />
                  </div>
                  <p className="font-label-code text-xs text-on-surface-variant pt-space-3xs font-medium">
                    Ms. Khurshida Jahan — Library archives steward
                  </p>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <div className="relative h-[320px] overflow-hidden bg-[#1d2a44] shadow-[3px_3px_0px_#1d2a44] border border-[#1d2a44]">
                    <img
                      src="/images/pink-shelf/humayun-kabir.jpg"
                      alt="Mr. Humayun Kabir"
                      className="w-full h-full object-cover filter saturate-110"
                    />
                  </div>
                  <p className="font-label-code text-xs text-on-surface-variant pt-space-3xs font-medium">
                    Mr. Humayun Kabir — Faculty &amp; campus librarian
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. FOUNDATIONAL WORD QUOTE BANNER (EXACT STITCH SPEC)
            ───────────────────────────────────────────────────────────── */}
        <section className="w-full bg-[#ff1493] text-white py-space-2xl px-4 sm:px-gutter-desktop shadow-[inset_0_4px_12px_rgba(0,0,0,0.1)] rounded-xs my-space-xl">
          <div className="max-w-max-content-width mx-auto flex flex-col md:flex-row items-center justify-between gap-space-xl">
            <div className="flex flex-col gap-space-xs max-w-3xl">
              <span className="font-label-stamp text-xs uppercase tracking-widest text-[#fdf9ef]/80 font-bold">
                Foundational Word //{" "}
                <a
                  href="https://www.platform-mag.com/literature/aqui-thami.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80 transition-opacity"
                >
                  Aqui Thami, Platform Magazine
                </a>
              </span>
              <p className="font-headline-lg text-lg sm:text-2xl font-normal italic leading-snug">
                “The Sister Library was one of the spaces that I created where I felt I was absolutely at peace, and then I see that reflected with many other people who come and visit. A lot of times when women come, they’re in tears because it is the first time they’re in a space like that.”
              </p>
              <div className="pt-space-2xs">
                <a
                  href="https://www.platform-mag.com/literature/aqui-thami.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-label-code text-xs text-[#fdf9ef] underline hover:text-[#1d2a44] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Read Full Conversation in Platform Magazine</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. PHYSICAL LENDING CATALOG & BOOK SEARCH
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-3xl border-b border-on-surface/20" id="catalog">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-4">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#ff1493] text-white font-label-stamp text-xs uppercase font-bold shadow-[2px_2px_0px_#1d2a44]">
                  Physical Lending Catalog
                </span>
                <span className="font-label-code text-label-code text-outline uppercase font-medium">
                  / Stacks Available in Dhaka
                </span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-4xl text-[#1d2a44] font-serif">
                Browse the Circulating Stacks
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant max-w-xl mt-space-2xs">
                Every title is available for loan without commercial membership or security deposits. Browse, request, and collect directly from the Pink Shelf.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search catalog by title, author, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-on-surface bg-white text-on-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#ff1493] block-shadow-sm"
              />
              <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-space-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-label-code text-xs uppercase font-bold tracking-wider transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-[#ff1493] text-white border-on-surface shadow-[2px_2px_0px_#1d2a44]"
                    : "bg-white text-on-surface border-on-surface/30 hover:bg-[#f1eee4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.slice(0, 9).map((book) => (
              <div
                key={book.id}
                className="bg-white border-2 border-on-surface p-space-md block-shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-space-xs">
                    <span className="px-2 py-0.5 bg-[#f1eee4] text-[#1d2a44] font-label-stamp text-[10px] font-bold border border-[#1d2a44]/20 uppercase">
                      {book.category}
                    </span>
                    <span className="font-label-code text-[11px] text-[#ff1493] font-bold">
                      {book.status}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-lg text-[#1d2a44] font-serif font-bold mb-1">
                    {book.title}
                  </h3>
                  <p className="font-label-code text-xs text-on-surface-variant mb-space-xs">
                    By {book.author} ({book.year})
                  </p>
                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-3 mb-space-sm">
                    {book.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-space-sm">
                    {book.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-[#f7f3e9] text-[#1d2a44] font-label-code text-[10px] border border-[#1d2a44]/15"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-space-xs border-t border-on-surface/15 flex justify-between items-center font-label-code text-xs">
                  <span className="text-on-surface-variant">LOC: {book.location}</span>
                  <button
                    onClick={() => handleBorrowRequest(book.title)}
                    className="text-[#ff1493] font-bold hover:underline cursor-pointer"
                  >
                    Borrow Book →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7. PUBLICATIONS & RISOGRAPH PRINTS (PRESS CATALOG)
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-3xl border-b border-on-surface/20" id="zines">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-4">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#1d2a44] text-white font-label-stamp text-xs uppercase font-bold shadow-[2px_2px_0px_#ff1493]">
                  Press Catalog
                </span>
                <span className="font-label-code text-label-code text-outline uppercase font-medium">
                  / Physical Editions &amp; Broadsides
                </span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-4xl text-[#1d2a44] font-serif">
                Publications &amp; The Risograph Press
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant mt-space-2xs max-w-xl">
                Hand-printed, self-published, and distributed on unbleached newsprint. Available for reading room loans, trade, or community circulation.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-space-sm font-label-code text-xs flex-wrap gap-2">
              {["All", "Manifestos", "Broadsides"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setZineFilter(filter)}
                  className={`px-3 py-1.5 border transition-colors cursor-pointer font-bold ${
                    zineFilter === filter
                      ? "border-on-surface bg-[#ff1493] text-white shadow-[2px_2px_0px_#1c1c16]"
                      : "border-on-surface/30 bg-white text-on-surface hover:bg-[#f1eee4]"
                  }`}
                >
                  {filter === "All" ? "All Prints (142)" : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredZines.map((zine) => (
              <article
                key={zine.id}
                className="bg-white border-2 border-on-surface p-space-md flex flex-col justify-between block-shadow-sm hover:-translate-y-1 transition-transform group"
              >
                <div>
                  <div className="flex justify-between items-center text-outline font-label-stamp text-[11px] border-b border-on-surface/15 pb-space-2xs mb-space-sm">
                    <span>{zine.code}</span>
                    <span className={`font-bold ${zine.roomStatusColor}`}>
                      {zine.roomStatus}
                    </span>
                  </div>

                  <div className="h-56 bg-surface-container border border-on-surface/20 mb-space-sm overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={zine.imageUrl}
                      alt={zine.imageAlt}
                    />
                    <span
                      className={`absolute top-2 right-2 px-space-xs py-space-3xs font-label-stamp text-[10px] uppercase font-bold ${zine.volumeBadgeBg}`}
                    >
                      {zine.volumeBadge}
                    </span>
                  </div>

                  <h3 className="font-title-editorial text-base text-[#1d2a44] font-bold mb-space-2xs leading-snug">
                    {zine.title}
                  </h3>

                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-3 mb-space-md">
                    {zine.desc}
                  </p>
                </div>

                <div className="pt-space-sm border-t border-on-surface/15 flex justify-between items-center font-label-code text-xs">
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
      </main>
    </div>
  );
};

export { SisterLibraryReadingCommunity as SisterLibraryPinkShelf };
