import React from "react";

export type SisterSubPage = "hub" | "ai-theatre" | "zine-mela" | "women-online" | "reading-community";

interface SisterLibraryHubProps {
  onNavigate: (page: SisterSubPage) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

interface BranchProgram {
  id: SisterSubPage;
  code: string;
  tag?: string;
  title: string;
  desc: string;
  date: string;
  actionText: string;
  accentColor: string;
  hoverColorClass: string;
  shadowClass: string;
  imageUrl: string;
  imageAlt: string;
  aspectClass: string;
}

interface SidePressArticle {
  outlet: string;
  date: string;
  title: string;
  preview: string;
  url: string;
  accentColor: string;
}

interface RecordingItem {
  id: string;
  title: string;
  year: string;
  desc: string;
  duration: string;
  videoId: string;
  url: string;
  badgeColor: string;
  linkColor: string;
  hoverColorClass: string;
  imageAlt: string;
}

const BRANCH_PROGRAMS: BranchProgram[] = [
  {
    id: "zine-mela",
    code: "ZINE-FAIR-26",
    title: "DHAKA ZINE MELA",
    desc: "A collection of makers coming together to share, make, and workshop.",
    date: "JUNE 2026",
    actionText: "SEE MORE →",
    accentColor: "#ff1493",
    hoverColorClass: "group-hover:text-[#ff1493]",
    shadowClass: "block-shadow-pink",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxntmqUHyj1W2MN30VdNBh9hD_ARk-3dUVdnq212qRZ6PXwdVnbsFnR4IuUDGa0Bf0WhA0pP_Hnvv1jVZt3VmlWdgfg_oc-cKRwn_ulOBMfRlrsmUyfgmg1bHZZpAX6H3EJVWoMhuzA5GtPXgne9YsiKJccwNuvw4ZPHICZPM8CB5eXIUn8Nfpmc-DwlJyl1zzkRKt0w8opz7LwVrAvm3UdNBnKWE0WV6AMmxm-5lBvs0-yDI2c5omgO1WIFeU63pzzZyU6-O4tqOTfig",
    imageAlt: "A close-up studio shot of a two-color risograph zine cover featuring bold abstract feminist linework printed in scarlet red and archival navy blue ink onto thick cream recycled paper with visible tactile grain and deckled edges.",
    aspectClass: "h-auto",
  },
  {
    id: "women-online",
    code: "PODCAST-EP1",
    tag: "ORAL ARCHIVE",
    title: "WOMEN ONLINE DOTBD",
    desc: "A podcast about the good, the bad The good, the bad and the uncanny of online Bangladesh, as seen through the female lens.",
    date: "2025",
    actionText: "Listen here →",
    accentColor: "#7e22ce",
    hoverColorClass: "group-hover:text-[#7e22ce]",
    shadowClass: "block-shadow-purple",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfV4TCj1LrrTAThZx5zzp4TxG76xR9FU62G2eProVN-F6WDRYDN048l8bAH_v9UP_FqBKxoaxN8EbVGFgbcJQ3JDB0krAKPUFKrHZClleRF9xWxNtCjjaZ5_TaymZBpLnDotit_0ykifJrsGYyXYhlsjiXTPjUBGDl6NBNtW71sKS2ZWRd4YzLLpBjh3HVWjKKkQnLr-pUhk8C_bCsf6PYXfdyCKZkdjDaO342_b6CxG3uNjs2aPBnl-XyiIyX7d0G5_vd8MEh9qyhV7s",
    imageAlt: "Artisanal hand-bound pamphlet with exposed singer-sewn spine stitches lying flat on an unpolished wooden library desk.",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "ai-theatre",
    code: "THEATRE-DOC",
    tag: "PERFORMANCE",
    title: "AI MAFIA BOYFRIEND & MY AI BFF",
    desc: "Exploring the joys and perils of human - AI relationships through theatre of the oppressed.",
    date: "2025, 2026",
    actionText: "Learn more →",
    accentColor: "#ea580c",
    hoverColorClass: "group-hover:text-[#ea580c]",
    shadowClass: "block-shadow-orange",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQuW-SBW81BLi4eEzSz-aLO6t-DjEK_BnlNuamE1wQrHOokJxxJkHO-Z32Yjo9vezyRiDefSaBzzzrHztd575A411UISqBKTBRSpA-uKwVkxo0ePXHjyeQU0dQCLnpTcRzN9l9OrxamdT5GxA15pY74VFsdowtI8g3xv2JlBL4tAMEUupNhcoXWeyJ5_cqJon1CLhJsjXn_EM27eJvVKANph8vKEhKg4KDQvCgK_okN6QVAI1iimIQC_2_ON1aET99vy1_W-CsGOjp1Lo",
    imageAlt: "Overhead flatlay photograph of a DIY bookbinding instruction manual open on a worktable with bone folders, linen binding thread, awls, and folded signatures of newsprint paper.",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "reading-community",
    code: "ZINE-SL-118",
    tag: "COMMUNITY CART",
    title: "READING TOGETHER",
    desc: "Reading lists, discussions and knowledge exchange through out the years.",
    date: "2020-",
    actionText: "Library →",
    accentColor: "#2563eb",
    hoverColorClass: "group-hover:text-[#2563eb]",
    shadowClass: "block-shadow-blue",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr7nuyECUjGTtMwjPXGyiWAuIPDgDCiaazviCRX5AMb-1JrVYKoCS67h9fGsv5NJ3ueHsMXokYuJTuK9Ha1z2xjZHaHBJZm8zF3y1jAEDKvWqi9OGS6ZQjwRMErhHZsgYfYmtYgCb7VDgqt4eF8hwKe1G0bGhC1RsNff_9oDuoKAbpLDsgSYKgULbrLMxdCkbF4rkxNtYcsPStQgVwGULEF3gjJm4atlTBuMOqMprZs63Rl4dbn89WlMO2pGaFKpccP_2pwsB6kOtuowE",
    imageAlt: "Editorial visual of an accordion-fold field journal laid open across a weathered metal cart shelf.",
    aspectClass: "aspect-[3/4]",
  },
];

const SIDE_PRESS_ARTICLES: SidePressArticle[] = [
  {
    outlet: "THE DAILY STAR",
    date: "MAR 2025",
    title: "The Pink Shelf at IUB",
    preview: '"I am a crazy woman," stated Dr Niaz Zaman, at the inauguration of Sister Library IUB Campus Pink Shelf  on February 26. "In the past, wherever I travelled, I spent a lot of time in libraries. A library is not just a place for books, it is a happening place. And today I am glad that the Pink Shelf is a bright corner in the IUB library."',
    url: "https://www.thedailystar.net/books-literature/news/the-pink-shelf-iub-3845046",
    accentColor: "#7e22ce",
  },
  {
    outlet: "THE DAILY STAR",
    date: "JUL 2025",
    title: "Bon Bibi reimagined: A feminist tale from the Sundarbans",
    preview: "The soft trill of a flute floated in the air of the hall—redolent of rural Bengal. The audience settled in for what would be an enchanting dramatisation of a folk legend told through a feminist lens.",
    url: "https://www.thedailystar.net/books-literature/news/bon-bibi-reimagined-feminist-tale-sundarbans-3931571",
    accentColor: "#ff1493",
  },
  {
    outlet: "THE DAILY STAR",
    date: "JAN 2024",
    title: "Creating sisterhood through Literature",
    preview: 'There was an ensemble of authors who had infinite creativity, and they captured the audience\'s attention from the get-go. The first writer, Amreeta Lethe, read an excerpt from her essay titled "Where have all the women gone?" She challenged the lack of female writers in the educational curriculum because discussions about female authors in literary canons were rare and dominated by men.',
    url: "https://www.thedailystar.net/daily-star-books/news/creating-sisterhood-through-literature-3530411",
    accentColor: "#ea580c",
  },
];

const RECORDING_CARDS: RecordingItem[] = [
  {
    id: "mother-language-day",
    title: "Mother Language Day: Mro, Chakma, Marma, Tripura",
    year: "2023",
    desc: "Bonanter Chayai, written by Shuvarani Tripura read by Ena Tripura. Poem by chief priest of Kramadharma Lengyang Mro read by Run Key Mro. Marma poem by Ki Ki A was read by Malaching Marma. Chakma poem Irukh Dinot read by Purna Chakma.",
    duration: "18:24",
    videoId: "FUvIinp9pJM",
    url: "https://www.youtube.com/watch?v=FUvIinp9pJM",
    badgeColor: "#ff7a00",
    linkColor: "#ff1493",
    hoverColorClass: "hover:text-[#ff7a00]",
    imageAlt: "A brightly lit workshop tabletop viewed from above showing colorful soy ink bottles, translucent stencil films, and a two-drum risograph printer being loaded with sunflower yellow and deep scarlet drums by printmaker hands.",
  },
  {
    id: "bon-bibi",
    title: "Feminist Retelling of Bon Bibi Jahuranama",
    year: "2025",
    desc: "ফোকলোর এক্সপিডিশন বাংলাদেশ (এফইবি), একটি স্বাধীন গবেষণা প্রতিষ্ঠান, তাদের প্রথম পাবলিক ইভেন্টে সুন্দরবনের অধিষ্ঠাত্রী দেবী ও রক্ষক বনবিবির গল্প তুলে ধরেছে। সিস্টার লাইব্রেরি-এর সাথে যৌথ উদ্যোগ ও গ্যেটে ইনস্টিটিউট-এর সহযোগিতায় এফইবি-এর এই মঞ্চায়নে বনবিবি জহুরানামা কিংবদন্তি উঠে এসেছে ভিন্ন এক আঙ্গিকে। একে দেখা হয়েছে বিভিন্ন নারীবাদী তাত্ত্বিক লেন্সে এবং ব্যাখ্যা করা হয়েছে বাংলাদেশের বর্তমান প্রেক্ষাপটে।",
    duration: "34:10",
    videoId: "9COOK3kAG0w",
    url: "https://www.youtube.com/watch?v=9COOK3kAG0w",
    badgeColor: "#7e22ce",
    linkColor: "#7e22ce",
    hoverColorClass: "hover:text-[#7e22ce]",
    imageAlt: "A lively community panel discussion with four cultural workers seated on timber benches in a cozy reading room. Posters, zine racks, and potted indoor ferns decorate the background under soft warm daylight.",
  },
  {
    id: "rupjalal",
    title: "Reading Nawab Faizunessa's Rupjalal with translator Fayeza Hasanat",
    year: "2020",
    desc: "Prince Jalal, falls deeply in love with Rupbanu, a merchant’s daughter and a captive of Fortas the giant. Jalal has to undertake a long and perilous journey to find and destroy Rupbanu’s captor. Along the way, he fights demons, ogres, suffers imprisonment, marries a princess to earn his freedom...",
    duration: "12:45",
    videoId: "ORHKREAEJrc",
    url: "https://www.youtube.com/watch?v=ORHKREAEJrc",
    badgeColor: "#2563eb",
    linkColor: "#2563eb",
    hoverColorClass: "hover:text-[#2563eb]",
    imageAlt: "A handheld cinematic shot of an artisanal yellow wooden traveling book cart being wheeled through a crowded lively outdoor urban neighborhood market street.",
  },
];

export const SisterLibraryHub: React.FC<SisterLibraryHubProps> = ({
  onNavigate,
  searchQuery = "",
  onClearSearch,
}) => {
  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;

  // Filter branch programs
  const filteredBranchPrograms = isSearching
    ? BRANCH_PROGRAMS.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.desc.toLowerCase().includes(query) ||
          b.code.toLowerCase().includes(query) ||
          (b.tag && b.tag.toLowerCase().includes(query))
      )
    : BRANCH_PROGRAMS;

  // Featured Daily Star Review
  const featuredPress = {
    title: "Dhaka Zine Mela 2026: A celebration of creativity and community",
    byline: "By Sabrina Sazzad • June 11, 2026",
    lead: "On June 6 and 7, 2026, at Goethe-Institut, Dhanmondi, Zine Mela Dhaka 2026 was held, organised by Sister Library (Dhaka) and Colors Publishing. The two-day event brought together independent artists, writers, and creators to celebrate self-publishing, artistic expression, and community engagement.",
    quote: "“Zines are small-circulation booklets that are often made by folding or binding a sheet of paper. Created with minimal expenditure and circulated in non-commercial publishing spaces, zines serve as a medium of expression for artists, allowing them to explore personal experiences, social issues, and creative ideas with greater freedom and nuance.”",
    url: "https://www.thedailystar.net/culture/books-literature/news/news/dhaka-zine-mela-2026-celebration-creativity-and-community-4196396",
  };

  const featuredPressMatches =
    !isSearching ||
    featuredPress.title.toLowerCase().includes(query) ||
    featuredPress.lead.toLowerCase().includes(query) ||
    featuredPress.quote.toLowerCase().includes(query) ||
    query.includes("zine") ||
    query.includes("daily star");

  // Side press articles
  const filteredSidePress = isSearching
    ? SIDE_PRESS_ARTICLES.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.preview.toLowerCase().includes(query) ||
          p.outlet.toLowerCase().includes(query)
      )
    : SIDE_PRESS_ARTICLES;

  // Featured Keynote Video
  const featuredVideo = {
    title: "Post August 5: IN-ZINE",
    year: "2024",
    desc: "30-days after the fall of the Awami League government, after too-many weeks of student clashes and police brutality, Sister Library hosted a zine-making event to reflect and process collectively. In collaboration with Star Books and Literature, Goethe-Institut Bangladesh, and SHALA Neighbourhood Art Space.",
    duration: "48:15",
    videoId: "S8ozfFh9U4E",
    url: "https://www.youtube.com/watch?v=S8ozfFh9U4E&list=PLnK8E1Gtex1OgvybpL3_SXOaVRADD_CMq&index=31",
  };

  const featuredVideoMatches =
    !isSearching ||
    featuredVideo.title.toLowerCase().includes(query) ||
    featuredVideo.desc.toLowerCase().includes(query) ||
    query.includes("august") ||
    query.includes("zine");

  // Filter video recording cards
  const filteredRecordings = isSearching
    ? RECORDING_CARDS.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.desc.toLowerCase().includes(query) ||
          r.year.includes(query)
      )
    : RECORDING_CARDS;

  const totalMatches =
    filteredBranchPrograms.length +
    (featuredPressMatches ? 1 : 0) +
    filteredSidePress.length +
    (featuredVideoMatches ? 1 : 0) +
    filteredRecordings.length;

  return (
    <div className="w-full text-[#1c1c16] font-serif-editorial">
      <main className="w-full max-w-max-content-width mx-auto px-gutter-desktop">
        {/* Search Feedback Banner */}
        {isSearching && (
          <div className="mt-space-lg p-space-md bg-[#ede9fe]/90 border-2 border-[#7e22ce] rounded-xs flex flex-wrap items-center justify-between gap-space-sm font-label-code text-label-code block-shadow-sm">
            <div className="flex items-center space-x-space-xs text-on-surface">
              <span className="font-bold text-[#7e22ce] uppercase">ARCHIVE SEARCH:</span>
              <span>
                Found {totalMatches} matching result{totalMatches !== 1 ? "s" : ""} for{" "}
                <strong className="text-[#ff1493]">"{searchQuery}"</strong>
              </span>
            </div>
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="px-space-sm py-space-3xs bg-[#7e22ce] text-white font-bold text-[11px] uppercase tracking-wider rounded-xs hover:bg-[#6b1cb0] transition-colors cursor-pointer"
              >
                Clear Search ✕
              </button>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            HERO SECTION
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-3xl border-b border-on-surface/20 grid grid-cols-12 gap-gutter-desktop items-start">
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between space-y-space-xl">
            <div className="space-y-space-md">
              <div className="flex items-center space-x-space-sm">
                <span className="font-label-code text-label-code text-[#ff1493] uppercase font-bold tracking-wider">
                  [HERSTORY FOUNDATION EXTENSION]
                </span>
                <span className="text-outline">/</span>
                <span className="font-label-stamp text-label-stamp text-[#7e22ce] uppercase font-semibold">
                  Traveling Reading Room &amp; SELF-Publishing Press
                </span>
              </div>
              <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight leading-tight">
                We read women. We welcome all.&nbsp;
              </h1>
              <blockquote className="space-y-space-sm">
                <p>
                  Powered by female excellence, Sister Library is a space to celebrate female creativity. The library is an evolving participatory project founded by <span className="font-bold bg-gradient-to-r from-[#ff1493] via-[#ff7a00] via-[#7e22ce] to-[#2563eb] bg-clip-text text-transparent underline decoration-[#ff1493]/40 underline-offset-4 tracking-wide inline-block drop-shadow-xs">Aqui Thami</span> in Bombay in 2017. The Dhaka branch is independent and has been hosting readings since 2020 as a collaborative effort of <span className="font-bold bg-gradient-to-r from-[#ff1493] via-[#ff7a00] via-[#7e22ce] to-[#2563eb] bg-clip-text text-transparent underline decoration-[#ff1493]/40 underline-offset-4 tracking-wide inline-block drop-shadow-xs">HerStory Foundation</span> and the <span className="font-bold bg-gradient-to-r from-[#ff1493] via-[#ff7a00] via-[#7e22ce] to-[#2563eb] bg-clip-text text-transparent underline decoration-[#ff1493]/40 underline-offset-4 tracking-wide inline-block drop-shadow-xs">Goethe-Institut</span>. We organise reading circles, discussions, events, theatre and zine-making gatherings. The pink shelf at the Goethe-Institut library is a growing, curated collection of works by women in English, Bangla, German and other languages of Bangladesh.
                </p>
                <p>
                  Zines are small-circulation booklets that are often made by folding or binding a sheet of paper. Created with minimal expenditure and circulated in non-commercial publishing spaces, zines serve as a medium of expression for artists, allowing them to explore personal experiences, social issues, and creative ideas with greater freedom and nuance.
                </p>
                <p>
                  The project brings people together to explore texts, appreciate artistry and celebrate women in the creative world. Through dialogue and promotion we aim to foster interest and understanding of the accomplishments of female writers and artists.
                </p>
              </blockquote>
            </div>

            <div className="grid grid-cols-3 gap-space-sm py-space-sm border-y border-on-surface/20">
              <div className="bg-[#ffffff]/85 backdrop-blur-sm p-space-sm border border-on-surface/30">
                <p className="font-display-hero text-headline-md text-[#ff1493] font-bold">2020</p>
                <p className="font-label-code text-label-code text-on-surface-variant uppercase font-medium">DHAKA BRANCH FOUNDATION</p>
              </div>
              <div className="bg-[#ffffff]/85 backdrop-blur-sm p-space-sm border border-on-surface/30">
                <p className="font-display-hero text-headline-md text-[#7e22ce] font-bold">100%</p>
                <p className="font-label-code text-label-code text-on-surface-variant uppercase font-medium">FREE MEMBERSHIP</p>
              </div>
              <div className="bg-[#ffffff]/85 backdrop-blur-sm p-space-sm border border-on-surface/30">
                <p className="font-display-hero text-headline-md text-[#ff7a00] font-bold">ALL</p>
                <p className="font-label-code text-label-code text-on-surface-variant uppercase font-medium">ARE WELCOME&nbsp;</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-space-md pt-space-xs">
              <a
                className="btn-press px-space-lg py-space-sm bg-[#ff1493] text-white font-body-md font-semibold border-2 border-on-surface block-shadow-dark flex items-center space-x-space-xs hover:bg-[#e10080] transition-colors"
                href="https://www.facebook.com/groups/944131136078290"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>JOIN THE FACEBOOK COMMUNITY</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 relative mt-space-lg lg:mt-0">
            <div className="absolute -top-3 left-1/3 w-32 h-6 paper-tape z-20 stamp-rotate-left"></div>

            <div className="bg-[#fdf9ef]/90 backdrop-blur-md border-2 border-on-surface p-space-lg block-shadow-orange relative z-10">
              {/* Header without orange badge */}
              <div className="flex justify-between items-center border-b border-on-surface/20 pb-space-xs mb-space-md">
                <span className="font-label-code text-label-code text-[#ea580c] uppercase font-bold">
                  FEATURED ORAL ARCHIVE
                </span>
              </div>

              <div className="relative border border-on-surface overflow-hidden mb-space-md aspect-[4/3] bg-surface-container-high">
                <img
                  className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-95"
                  alt="A textured analog documentary photograph of people gathered around a wide rustic oak table in a sunlit library room filled with handmade pamphlets and a vintage two-drum risograph printer."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB188xepQQ570vIkCm8wlYco_Iext5gA8Y3s9ngqSe84YkLZ6_BxWpBZ6mPCnsYiHs93x0IxQZo7lHnn7lRtbYTO05-8ITTicLxu_NCH54pIWIKayf2UWRUDvDmU7ojzXQE8NRTVhG0YfZ77MoaJZvyD78fbm98NPas2VGZ1u-9JbrP6VehsPLaXf_eNnFX9qV_OK9NTHhbcZyjTKFYg3mPt3fOwrV3C9I7pUU4kLR16zKwpa-5Ql6khktyvqaj5o4cZktVDOeXSBSUlmo"
                />
                <div className="absolute inset-0 bg-[#ff1493]/15 pointer-events-none mix-blend-color"></div>
                <span className="absolute bottom-2 left-2 px-space-xs py-space-3xs bg-on-surface text-surface font-label-stamp text-label-stamp uppercase">
                  THE GOOD, THE BAD, THE UNCANNY
                </span>
              </div>

              <div className="space-y-space-xs">
                <div className="flex items-baseline space-x-space-xs">
                  <span className="font-label-code text-label-code text-[#ea580c] font-bold">THE PODCAST</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  PILOT EP OF WOMEN ONLINE DOTBD
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  A deep dive into the lives of women online in Bangladesh, one of the worlds most densely populated netscapes.&nbsp;
                </p>
              </div>
              <div className="mt-space-md pt-space-xs border-t border-on-surface/20 flex justify-between items-center">
                <a
                  className="font-body-sm text-[#ff1493] font-semibold underline underline-offset-4 hover:text-[#e10080]"
                  href="https://www.youtube.com/watch?v=R5O6ESu3EWM&t=3338s"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LISTEN TO THE PODCAST →
                </a>
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full bg-[#ede9fe]/90 border border-on-surface -z-10 stamp-rotate-right"></div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            BRANCH PROGRAMS (R4: Badges removed & typography unified)
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-3xl border-b border-on-surface/20" id="zines">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#7e22ce] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-left font-bold">
                  COMMUNITY
                </span>
                <span className="font-label-code text-label-code text-outline uppercase font-medium">
                  / Events, productions and reading lists
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                SISTER LIBRARY (DHAKA) LEGACY
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs max-w-xl">
                A library is a gathering of ideas and people, where reading is a form of activism and a reason to gather. Where discussion fuels action and where knowledge is shared.&nbsp;
              </p>
            </div>
          </div>

          {filteredBranchPrograms.length === 0 ? (
            <p className="text-on-surface-variant font-body-sm italic py-space-lg">
              No branch programs matching "{searchQuery}".
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
              {filteredBranchPrograms.map((program) => (
                <article
                  key={program.id}
                  onClick={() => onNavigate(program.id)}
                  className={`bg-[#fdf9ef]/90 backdrop-blur-md border-2 border-on-surface p-space-md flex flex-col justify-between ${program.shadowClass} hover:-translate-y-1 transition-transform cursor-pointer group`}
                >
                  <div>
                    <div className="flex justify-between items-center text-outline font-label-stamp text-label-stamp border-b border-on-surface/20 pb-space-2xs mb-space-sm">
                      <span className="font-semibold" style={{ color: program.accentColor }}>
                        {program.code}
                      </span>
                      {program.tag && (
                        <span className="font-bold" style={{ color: program.accentColor }}>
                          {program.tag}
                        </span>
                      )}
                    </div>
                    <div className={`bg-surface-container border border-on-surface/30 mb-space-sm overflow-hidden relative ${program.aspectClass} flex items-center justify-center`}>
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={program.imageAlt}
                        src={program.imageUrl}
                      />
                    </div>
                    <h3
                      className={`font-title-editorial text-title-editorial text-on-surface font-semibold mb-space-2xs uppercase transition-colors ${program.hoverColorClass}`}
                    >
                      {program.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-space-md">
                      {program.desc}
                    </p>
                  </div>
                  <div className="pt-space-sm border-t border-on-surface/20 flex justify-between items-center font-label-code text-label-code">
                    <span className="text-on-surface-variant">{program.date}</span>
                    <span className="hover:underline font-bold" style={{ color: program.accentColor }}>
                      {program.actionText}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ─────────────────────────────────────────────────────────────
            MANIFESTO SECTION (R5: Promoted badge line, removed duplicate)
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-3xl border-b border-on-surface/20" id="manifesto">
          <div className="grid grid-cols-12 gap-gutter-desktop items-center">
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-between space-y-space-lg">
              <div>
                <h2 className="flex items-center space-x-space-xs mb-space-md">
                  <span className="px-space-xs py-space-3xs bg-[#ff1493] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-left font-bold">
                    [MANIFESTO]
                  </span>
                  <span className="font-label-code text-label-code text-outline uppercase font-medium">
                    / WHY WE READ WOMEN
                  </span>
                </h2>
                <div className="space-y-space-md pt-space-xs font-body-lg text-body-lg text-on-surface-variant">
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
                  <span className="font-bold bg-gradient-to-r from-[#ff1493] via-[#ff7a00] via-[#7e22ce] to-[#2563eb] bg-clip-text text-transparent underline decoration-[#ff1493]/40 underline-offset-4 tracking-wide inline-block drop-shadow-xs">
                    Aqui Thami
                  </span>
                  <span className="text-outline">• Mumbai • Dhaka</span>
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
                  <div className="absolute inset-0 bg-[#ff1493]/15 pointer-events-none mix-blend-color"></div>
                </div>
                <div className="pt-space-xs mt-space-2xs flex items-center justify-between text-outline font-label-code text-label-code">
                  <span className="text-on-surface font-medium">BON BIBI - A FEMINIST READING</span>
                </div>
              </div>
              <div className="hidden sm:block absolute -bottom-3 -right-3 w-full h-full bg-[#f1eee4] border border-on-surface -z-10 stamp-rotate-right"></div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            DISPATCHES & PRESS (R6: Spacing & Daily Star Article Preview)
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-3xl border-b border-on-surface/20" id="press">
          <div className="mb-space-xl">
            <span className="px-space-xs py-space-3xs bg-[#ede9fe] text-[#7e22ce] font-label-stamp text-label-stamp uppercase stamp-rotate-left inline-block mb-space-md font-bold border border-[#7e22ce]/30">
              Dispatches &amp; Reviews
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Press About Sister Library (Dhaka)
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-gutter-desktop">
            {/* Featured Large Daily Star Box */}
            {featuredPressMatches ? (
              <div className="col-span-12 lg:col-span-7 bg-[#fdf9ef]/90 backdrop-blur-md border-2 border-on-surface p-space-xl flex flex-col justify-between block-shadow-dark">
                <div className="space-y-space-md">
                  <div className="flex items-center justify-between border-b border-on-surface/20 pb-space-xs mb-space-sm">
                    <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-[#ff1493] font-bold">
                      THE DAILY STAR
                    </span>
                    <span className="font-label-code text-label-code text-outline font-medium">
                      JUNE 11, 2026
                    </span>
                  </div>

                  <div>
                    <h3 className="font-title-editorial text-title-editorial text-on-surface font-semibold text-xl lg:text-2xl mb-space-2xs leading-snug">
                      <a
                        href={featuredPress.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#ff1493] transition-colors"
                      >
                        {featuredPress.title}
                      </a>
                    </h3>
                    <p className="font-label-code text-label-code text-outline mb-space-sm">
                      {featuredPress.byline}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                      {featuredPress.lead}
                    </p>
                    <blockquote className="border-l-4 border-[#ff1493] pl-space-md py-space-2xs italic font-display-hero text-headline-sm text-on-surface bg-[#ffffff]/60 backdrop-blur-xs">
                      {featuredPress.quote}
                    </blockquote>
                  </div>
                </div>

                <div className="pt-space-md border-t border-on-surface/20 flex justify-between items-center font-label-code text-label-code mt-space-md">
                  <span className="text-on-surface-variant">Archival Feature Coverage</span>
                  <a
                    className="text-[#ff1493] hover:underline font-bold flex items-center space-x-1"
                    href={featuredPress.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Read Full Article ↗</span>
                  </a>
                </div>
              </div>
            ) : null}

            {/* Side Press Articles List */}
            <div className={`col-span-12 ${featuredPressMatches ? "lg:col-span-5" : "lg:col-span-12"} space-y-space-md`}>
              {filteredSidePress.length === 0 && !featuredPressMatches ? (
                <p className="text-on-surface-variant font-body-sm italic py-space-md">
                  No press articles matching "{searchQuery}".
                </p>
              ) : (
                filteredSidePress.map((article, idx) => (
                  <article
                    key={idx}
                    className="bg-[#fdf9ef]/90 backdrop-blur-md border border-on-surface p-space-md block-shadow-sm hover:bg-white transition-colors"
                  >
                    <div className="flex justify-between items-start mb-space-2xs">
                      <span
                        className="font-label-code text-label-code font-bold uppercase"
                        style={{ color: article.accentColor }}
                      >
                        {article.outlet}
                      </span>
                      <span className="font-label-stamp text-label-stamp text-outline font-semibold">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-title-editorial text-title-editorial text-on-surface font-semibold mb-space-2xs">
                      {article.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
                      {article.preview}
                    </p>
                    <a
                      className="font-label-code text-label-code font-bold hover:underline"
                      style={{ color: article.accentColor }}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Feature Article ↗
                    </a>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            RECORDINGS & CHANNELS (R7: Vimeo removed & clickable links)
            ───────────────────────────────────────────────────────────── */}
        <section className="py-space-3xl border-b border-on-surface/20" id="videos">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-on-surface text-surface font-label-stamp text-label-stamp uppercase stamp-rotate-left font-bold">
                  Recordings
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                A record of library activities&nbsp;
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs max-w-xl">
                Recordings of online readings during lockdown and video collages of events are on our YouTube channel.
              </p>
            </div>
            {/* R7: Only YouTube channel link, Vimeo removed */}
            <div className="mt-space-md md:mt-0 font-label-code text-label-code text-on-surface-variant font-medium">
              Channels:{" "}
              <a
                className="text-[#ff1493] underline font-bold"
                href="https://www.youtube.com/watch?v=kjHxVvXnmoU&list=PLnK8E1Gtex1OgvybpL3_SXOaVRADD_CMq&index=33"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Featured Keynote Video */}
          {featuredVideoMatches && (
            <div className="bg-[#fdf9ef]/90 backdrop-blur-md border-2 border-on-surface p-space-lg mb-space-2xl block-shadow-pink">
              <div className="grid grid-cols-12 gap-gutter-desktop items-center">
                <div className="col-span-12 lg:col-span-7 relative aspect-video bg-on-surface border border-on-surface overflow-hidden group cursor-pointer">
                  <img
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                    alt="A documentary video frame of a feminist scholar addressing an attentive audience in an intimate low-lit community library."
                    src={`https://img.youtube.com/vi/${featuredVideo.videoId}/maxresdefault.jpg`}
                  />
                  <a
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    href={featuredVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Play Keynote Archive Video on YouTube"
                  >
                    <div className="w-16 h-16 bg-[#ff1493] border-2 border-white flex items-center justify-center text-white block-shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[32px]">play_arrow</span>
                    </div>
                  </a>
                  <div className="absolute bottom-3 left-3 flex items-center space-x-space-xs">
                    <span className="px-space-xs py-space-3xs bg-on-surface/90 text-surface font-label-code text-label-code font-bold">
                      {featuredVideo.duration}
                    </span>
                    <span className="px-space-xs py-space-3xs bg-[#ff1493] text-white font-label-stamp text-label-stamp font-bold">
                      HD / STEREO
                    </span>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-5 space-y-space-md">
                  <div>
                    <span className="font-label-stamp text-label-stamp text-[#ff1493] font-bold uppercase">
                      {featuredVideo.year}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mt-space-3xs">
                      {featuredVideo.title}&nbsp;<br />
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                      {featuredVideo.desc}
                    </p>
                  </div>
                  <div className="pt-space-xs border-t border-on-surface/20">
                    <a
                      href={featuredVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ff1493] font-bold font-label-code text-label-code hover:underline flex items-center space-x-1"
                    >
                      <span>WATCH ARCHIVE EVENT ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3 Video Recording Cards */}
          {filteredRecordings.length === 0 && !featuredVideoMatches ? (
            <p className="text-on-surface-variant font-body-sm italic py-space-md">
              No video recordings matching "{searchQuery}".
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
              {filteredRecordings.map((recording) => (
                <article
                  key={recording.id}
                  className="bg-[#fdf9ef]/90 backdrop-blur-md border border-on-surface p-space-sm block-shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Clickable thumbnail link */}
                    <a
                      className="relative aspect-video bg-on-surface mb-space-sm overflow-hidden group block cursor-pointer"
                      href={recording.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${recording.title} on YouTube`}
                    >
                      <img
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                        alt={recording.imageAlt}
                        src={`https://img.youtube.com/vi/${recording.videoId}/maxresdefault.jpg`}
                      />
                      <span className="absolute bottom-2 left-2 px-space-xs py-space-3xs bg-on-surface text-surface font-label-code text-label-code">
                        {recording.duration}
                      </span>
                      <span className="material-symbols-outlined absolute inset-0 m-auto text-surface text-[36px] opacity-80 group-hover:opacity-100 transition-opacity">
                        play_circle
                      </span>
                    </a>
                    <span
                      className="font-label-stamp text-label-stamp uppercase font-bold"
                      style={{ color: recording.badgeColor }}
                    >
                      {recording.year}
                    </span>
                    <h3 className="font-title-editorial text-title-editorial text-on-surface font-semibold mt-space-3xs">
                      <a
                        href={recording.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors ${recording.hoverColorClass}`}
                      >
                        {recording.title}
                      </a>
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-3xs">
                      {recording.desc}
                    </p>
                  </div>
                  {/* Clickable footer CTA link */}
                  <div
                    className="mt-space-sm pt-space-xs border-t border-on-surface/20 font-label-code text-label-code font-bold"
                    style={{ color: recording.linkColor }}
                  >
                    <a
                      href={recording.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center space-x-1"
                    >
                      <span>WATCH RECORDING ↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ─────────────────────────────────────────────────────────────
            VISITING & HOURS (R3: ID is #pink-shelf)
            ───────────────────────────────────────────────────────────── */}
        <section
          className="py-space-3xl grid grid-cols-12 gap-gutter-desktop items-start"
          id="pink-shelf"
        >
          <div className="col-span-12 lg:col-span-7 bg-[#fdf9ef]/90 backdrop-blur-md border-2 border-on-surface p-space-xl block-shadow-purple space-y-space-lg">
            <div>
              <div className="flex items-center space-x-space-xs mb-space-2xs">
                <span className="px-space-xs py-space-3xs bg-[#7e22ce] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-right font-bold">
                  THE PINK SHELF
                </span>
                <span className="font-label-code text-label-code text-outline font-medium">
                  GOETHE - INSTITUT LIBRARY
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Visiting, Hours &amp; Etiquette
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
                We operate as a safe, slow reading space open to all who respect feminist solidarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md font-body-sm">
              <div className="border border-on-surface/30 p-space-md bg-white/80 backdrop-blur-xs">
                <span className="font-label-stamp text-label-stamp text-[#ff1493] uppercase font-bold block mb-space-2xs">
                  LIBRARY HOURS
                </span>
                <ul className="space-y-space-3xs font-label-code text-label-code text-on-surface">
                  <li className="flex justify-between">
                    <span>Sat - Weds</span>
                  </li>
                  <li className="flex justify-between">
                    <strong>10:00 AM – 5:00 PM</strong>
                  </li>
                </ul>
              </div>
              <div className="border border-on-surface/30 p-space-md bg-white/80 backdrop-blur-xs">
                <span className="font-label-stamp text-label-stamp text-[#7e22ce] uppercase font-bold block mb-space-2xs">
                  LOCATION &amp; TRANSIT
                </span>
                <p className="font-body-sm text-on-surface">
                  Road 9, House 10
                  <div>Dhanmondi</div>
                </p>
                <p className="font-label-code text-label-code text-outline mt-space-xs">
                  <a
                    className="text-[#ff1493] hover:underline font-bold transition-colors"
                    href="https://www.goethe.de/ins/bd/en/kul/bib.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LINK TO THE WEBSITE ↗
                  </a>
                </p>
              </div>
            </div>

            <div className="space-y-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Reading Room Etiquette</h3>
              <div className="space-y-space-2xs font-body-sm text-on-surface-variant">
                <div className="flex items-start space-x-space-xs">
                  <span className="material-symbols-outlined text-[#ff1493] text-[20px] shrink-0">check_box</span>
                  <span>
                    <strong>Free Entry &amp; Open Browsing:</strong> No library card required to sit, read, make tea, or consult the archive.
                  </span>
                </div>

                <div className="flex items-start space-x-space-xs">
                  <span className="material-symbols-outlined text-[#7e22ce] text-[20px] shrink-0">check_box</span>
                  <span>
                    <strong>Delicate Ephemera Handling:</strong> Use paper bookmarks provided; please do not dog-ear or write in self-bound zines.
                  </span>
                </div>
                <div className="flex items-start space-x-space-xs">
                  <span className="material-symbols-outlined text-[#2563eb] text-[20px] shrink-0">check_box</span>
                  <span>
                    <strong>Membership:</strong>&nbsp;Free of charge, membership is open to all. Bring a photo and a valid government ID.&nbsp;
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 bg-[#fdf9ef]/95 backdrop-blur-md border-2 border-on-surface p-space-xl block-shadow-orange relative">
            <span className="absolute -top-3 right-6 px-space-sm py-space-3xs bg-[#ea580c] text-white font-label-stamp text-label-stamp uppercase stamp-rotate-right font-bold shadow-xs">
              MAILING LIST
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-space-2xs">
              Subscribe to The Sister Library Newsletter
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
              Updates, events and the occasional creative writing blast
            </p>

            <form
              className="space-y-space-md"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <label className="block font-label-code text-label-code text-on-surface font-bold uppercase mb-space-3xs">
                  Name / Pseudonym
                </label>
                <input
                  className="w-full bg-white/90 border-2 border-on-surface p-space-sm text-body-md placeholder:text-outline/70 focus:outline-none focus:border-[#ff1493]"
                  placeholder="e.g. Arundhati or Reader #88"
                  type="text"
                />
              </div>
              <div>
                <label className="block font-label-code text-label-code text-on-surface font-bold uppercase mb-space-3xs">
                  Email
                </label>
                <input
                  className="w-full bg-white/90 border-2 border-on-surface p-space-sm text-body-md placeholder:text-outline/70 focus:outline-none focus:border-[#ff1493]"
                  placeholder="comrade@autonomous-spaces.org"
                  type="email"
                />
              </div>
              <div className="space-y-space-2xs pt-space-xs">
                <div className="flex items-center space-x-space-md font-body-sm">
                  <label className="flex items-center space-x-2 cursor-pointer"></label>
                  <label className="flex items-center space-x-2 cursor-pointer"></label>
                </div>
              </div>
              <button
                className="w-full btn-press py-space-sm bg-[#ff1493] text-white font-body-md font-bold border-2 border-on-surface block-shadow-dark flex justify-center items-center space-x-space-xs hover:bg-[#e10080] transition-colors cursor-pointer"
                type="submit"
              >
                <span>JOIN THE SISTERHOOD</span>
                <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
              </button>
            </form>
            <div className="mt-space-md pt-space-sm border-t border-on-surface/20 text-center font-label-code text-label-code text-outline">
              Strictly non-commercial. Unsubscribe at any time. Collective privacy honored.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
