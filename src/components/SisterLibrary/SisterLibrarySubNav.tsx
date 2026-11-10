import React from "react";
import { SisterSubPage } from "./SisterLibraryHub";
import { Search, ArrowLeft } from "lucide-react";

interface SisterLibrarySubNavProps {
  currentPage: SisterSubPage;
  onNavigate: (page: SisterSubPage) => void;
  onGoHome?: () => void;
  onOpenSearch?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  isDark?: boolean;
}

interface NavLink {
  key: SisterSubPage;
  label: string;
  badge?: string;
  badgeColor?: string;
}

const NAV_LINKS: NavLink[] = [
  { key: "hub", label: "Overview" },
  { key: "ai-theatre", label: "AI Theatre", badge: "Live", badgeColor: "#ff1493" },
  { key: "zine-mela", label: "Dhaka Zine Mela", badge: "2026", badgeColor: "#ea580c" },
  { key: "women-online", label: "Women Online", badge: "Dot BD", badgeColor: "#2563eb" },
  { key: "reading-community", label: "Reading Community", badge: "Lending", badgeColor: "#7e22ce" },
];

const BULLETIN_ITEMS = [
  "Currently reading: Collective Memory & Zine Praxis",
  "Reading Room open Thu–Sun 2PM–8PM",
  "Next Zine Jam: 14th Oct",
  "Autonomous Feminist Print Spaces Open",
  "Dhaka Sanctuary Archive Est. 2019",
  "Vol. 08 Dispatch: Cyber-Feminism & Data Sovereignty",
  "South Asian Women's Literature & Pamphleteering",
];

export const SisterLibrarySubNav: React.FC<SisterLibrarySubNavProps> = ({
  currentPage,
  onNavigate,
  onGoHome,
  searchQuery = "",
  onSearchChange,
  isDark = false,
}) => {
  const tickerText = BULLETIN_ITEMS.join("  ✦  ") + "  ✦  ";

  return (
    <header
      className={`w-full sticky top-0 z-40 transition-colors duration-300 shadow-sm ${
        isDark
          ? "bg-[#0f1117]/95 backdrop-blur-md border-b border-[#232738] text-white"
          : "bg-[#fdf9ef]/95 backdrop-blur-md border-b-2 border-on-surface/20 text-on-surface"
      }`}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. PAPER-TAPE BULLETIN TICKER (Continuous Left-to-Right Marquee)
          ───────────────────────────────────────────────────────────── */}
      <div
        className={`w-full py-1.5 px-4 text-xs font-label-code overflow-hidden border-b transition-colors flex items-center ${
          isDark
            ? "bg-[#14161d] border-[#252836] text-[#c8cde0]"
            : "bg-[#f5f0e2] border-on-surface/15 text-on-surface"
        }`}
      >
        <div className="max-w-max-content-width mx-auto w-full flex items-center gap-3">
          {/* Static Bulletin Badge on the Left */}
          <div className="shrink-0 flex items-center gap-1.5 z-10">
            <span className="px-2 py-0.5 bg-[#ea580c] text-white font-bold uppercase text-[10px] tracking-wider rounded-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              BULLETIN
            </span>
          </div>

          {/* Marquee Track moving from Left to Right */}
          <div className="relative overflow-hidden flex-1 mask-fade select-none">
            <div
              className="animate-marquee-ltr flex items-center whitespace-nowrap cursor-default"
              title="Continuous Bulletin Dispatch — Hover to Pause"
            >
              <span className="inline-block text-[11px] sm:text-xs font-medium tracking-wide pr-8">
                {tickerText}
              </span>
              <span className="inline-block text-[11px] sm:text-xs font-medium tracking-wide pr-8">
                {tickerText}
              </span>
            </div>
          </div>

          {/* Right Status Badge */}
          <div
            className={`hidden md:flex items-center space-x-2 text-[10px] shrink-0 font-label-code uppercase tracking-wider ${
              isDark ? "text-white/60" : "text-outline"
            }`}
          >
            <span className="text-[#ff1493] font-bold">VOL. 08 DISPATCH</span>
            <span>|</span>
            <span>SANCTUARY LIVE</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. LEVEL 1: BRANDING, SEARCH & CTA
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-max-content-width mx-auto px-4 md:px-gutter-desktop py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Brand & Origin Mark */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Back to HerStory Main Site (Exact same behavior as Project Ladyland) */}
          {onGoHome && (
            <button
              onClick={onGoHome}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-label-code font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer border ${
                isDark
                  ? "bg-[#181b24] border-white/20 text-[#c8cde0] hover:text-white hover:border-[#ff1493]"
                  : "bg-white border-on-surface/20 text-on-surface hover:text-[#ff1493] hover:border-[#ff1493]"
              }`}
              title="Return to HerStory Foundation Main Site"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#ff1493]" />
              <span className="hidden sm:inline">HerStory</span>
            </button>
          )}

          {/* SISTER LIBRARY Wordmark */}
          <button
            onClick={() => {
              onNavigate("hub");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2.5 text-left cursor-pointer group"
          >
            <div className="flex flex-col">
              <span
                className={`font-display-hero text-2xl sm:text-3xl font-bold tracking-tight leading-none group-hover:text-[#ff1493] transition-colors ${
                  isDark ? "text-white" : "text-on-surface"
                }`}
              >
                SISTER LIBRARY
              </span>
              <span
                className={`font-label-code text-[9px] uppercase tracking-widest mt-0.5 ${
                  isDark ? "text-white/60" : "text-outline"
                }`}
              >
                DHAKA SANCTUARY
              </span>
            </div>
          </button>

          {/* Taped Archive Stamp */}
          <div
            className={`hidden lg:inline-flex items-center px-2 py-0.5 font-label-stamp text-[10px] uppercase stamp-rotate-left border ${
              isDark
                ? "bg-[#191d28] border-white/20 text-white/90"
                : "bg-[#f1eee4] border-on-surface/20 text-on-surface"
            }`}
          >
            <span>EST. 2019 • ARCHIVE</span>
          </div>
        </div>

        {/* Search Input & Primary CTA Button */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {onSearchChange && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search catalog & archives..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-36 sm:w-52 md:w-64 px-3 py-1.5 pl-8 border rounded-xs text-xs font-label-code focus:outline-none focus:border-[#ff1493] transition-colors ${
                  isDark
                    ? "bg-[#14161d] border-white/20 text-white placeholder:text-white/40"
                    : "bg-[#ffffff] border-on-surface/30 text-on-surface placeholder:text-outline"
                }`}
              />
              <Search
                className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${
                  isDark ? "text-white/40" : "text-outline"
                }`}
              />
            </div>
          )}

          <button
            onClick={() => {
              onNavigate("reading-community");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#ff1493] text-white font-label-code text-xs font-bold uppercase tracking-wider border-2 border-on-surface block-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer whitespace-nowrap"
          >
            Support &amp; Visit
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. LEVEL 2: ALL MENU ITEMS (Clean Horizontal Tab Row)
          ───────────────────────────────────────────────────────────── */}
      <div
        className={`w-full border-t transition-colors ${
          isDark
            ? "border-[#232738] bg-[#0c0e14]"
            : "border-on-surface/10 bg-[#f7f3e8]"
        }`}
      >
        <div className="max-w-max-content-width mx-auto px-4 md:px-gutter-desktop">
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2">
            {NAV_LINKS.map((link) => {
              const isActive = currentPage === link.key;
              return (
                <button
                  key={link.key}
                  onClick={() => {
                    onNavigate(link.key);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-body-md transition-all cursor-pointer whitespace-nowrap rounded-xs flex items-center gap-2 ${
                    isActive
                      ? isDark
                        ? "font-bold text-white bg-[#191d28] border-2 border-[#ff1493] shadow-[2px_2px_0px_#ff1493]"
                        : "font-bold text-on-surface bg-[#ffffff] border-2 border-on-surface shadow-[2px_2px_0px_#ff1493]"
                      : isDark
                      ? "font-medium text-[#c8cde0] hover:text-white hover:bg-white/10"
                      : "font-medium text-on-surface-variant hover:text-on-surface hover:bg-[#eae5d8]"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`font-label-code text-[9px] px-1.5 py-0.5 rounded-xs font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-[#ff1493] text-white"
                          : isDark
                          ? "bg-white/15 text-white"
                          : "bg-on-surface/10 text-on-surface"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
