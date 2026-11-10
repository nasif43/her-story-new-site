import React, { useState } from "react";
import { SisterSubPage } from "./SisterLibrary/SisterLibraryHub";
import { SisterLibraryHub } from "./SisterLibrary/SisterLibraryHub";
import { SisterLibraryAiTheatre } from "./SisterLibrary/SisterLibraryAiTheatre";
import { SisterLibraryZineMela } from "./SisterLibrary/SisterLibraryZineMela";
import { SisterLibraryWomenOnline } from "./SisterLibrary/SisterLibraryWomenOnline";
import { SisterLibraryReadingCommunity } from "./SisterLibrary/SisterLibraryReadingCommunity";
import { SisterLibrarySubNav } from "./SisterLibrary/SisterLibrarySubNav";
import { SisterLibraryIridescentBg } from "./SisterLibrary/SisterLibraryIridescentBg";

interface SisterLibraryViewProps {
  onGoHome?: () => void;
}

export const SisterLibraryView: React.FC<SisterLibraryViewProps> = ({ onGoHome }) => {
  const [subPage, setSubPage] = useState<SisterSubPage>("hub");
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (page: SisterSubPage) => {
    setSubPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = subPage === "ai-theatre" || subPage === "women-online";

  return (
    <div
      className={`w-full min-h-screen font-body-md relative selection:bg-[#ff1493] selection:text-white flex flex-col transition-colors duration-300 ${
        isDark
          ? subPage === "women-online"
            ? "bg-[#0a0a0e] text-white"
            : "bg-[#0c0d10] text-[#f4f0e7]"
          : "bg-[#fdf9ef] text-on-surface"
      }`}
    >
      {/* 1. Fluid Iridescent Pastel Silk Shader Background (active on cream paper pages) */}
      {!isDark && <SisterLibraryIridescentBg />}

      {/* 2. Top Sub-Navigation with Paper-Tape Bulletin Ticker & Taped Badge */}
      <SisterLibrarySubNav
        currentPage={subPage}
        onNavigate={handleNavigate}
        onGoHome={onGoHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDark={isDark}
      />

      {/* 3. Sub-Page Views */}
      <div className="flex-1 w-full animate-in fade-in duration-300 relative z-10 pb-16">
        {subPage === "hub" && (
          <SisterLibraryHub onNavigate={handleNavigate} />
        )}

        {subPage === "ai-theatre" && (
          <SisterLibraryAiTheatre
            onBack={() => handleNavigate("hub")}
            onNavigate={handleNavigate}
          />
        )}

        {subPage === "zine-mela" && (
          <SisterLibraryZineMela
            onBack={() => handleNavigate("hub")}
            onNavigate={handleNavigate}
          />
        )}

        {subPage === "women-online" && (
          <SisterLibraryWomenOnline
            onBack={() => handleNavigate("hub")}
            onNavigate={handleNavigate}
          />
        )}

        {subPage === "reading-community" && (
          <SisterLibraryReadingCommunity
            onBack={() => handleNavigate("hub")}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </div>
  );
};
