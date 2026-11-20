import React, { useState } from 'react';
import { Search, Menu, X, Sparkles } from 'lucide-react';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; isHighlight?: boolean; isRainbow?: boolean }[] = [
    { id: 'dreams', label: 'Dreams' },
    { id: 'books', label: 'Books' },
    { id: 'reflections', label: 'Reflections' },
    { id: 'sister-library', label: 'Sister Library', isRainbow: true },
    { id: 'ladyland', label: 'Project Ladyland 2026', isHighlight: true }
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="backdrop-blur-xl bg-[#0c0d10]/85 w-full h-20 z-50 sticky top-0 border-b border-white/10 shadow-md transition-colors text-white">
      <div className="w-full max-w-7xl mx-auto h-full flex justify-between items-center px-4 md:px-12">
        {/* Logo / Brand Home Link */}
        <button
          onClick={() => handleNavClick('home')}
          className="min-h-[44px] h-16 py-1 flex items-center text-left focus:outline-none group cursor-pointer"
          aria-label="HerStory Foundation Home"
        >
          <img
            alt="HerStory Foundation & Publications"
            className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02] brightness-0 invert"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjg2Qx_aTe8hUg2nAI0OPE_tImw2Nl2ICR0K7pZlASJLhU7n-oxBihz4KIyFuNA7f8pTLisJr1z0OD8YYyFNKdnHLO1BVQpnq44nBjndUukUgJIcWhZfDyUXSiZXUWq5kICJeJfdpexlbUgIdAec_kfQei-KGlGRAp7lDr04FLTCEj8Ryr-sSpz1csXhVnHav0sBWNsAFJKHSZ-iJLvCgRVt1dcBuOP5nvEOJ97Nz4EmMXv_pOy1R1zesAwNy64GMrJ3oVySrCvQ"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 items-center font-sans-ui">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            if (item.isHighlight) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`min-h-[44px] text-base font-bold flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#141414] shadow-sm scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full animate-pulse-dot ${isActive ? 'bg-[#141414]' : 'bg-[#38bdf8]'}`} />
                  {item.label}
                </button>
              );
            }

            if (item.isRainbow) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`min-h-[44px] text-base font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 ${
                    isActive
                      ? 'bg-white/15 font-bold border border-[#ff69b4]/60 shadow-xs text-white'
                      : 'text-white/90 hover:text-white'
                  }`}
                  title="Sister Library — Dhaka Sanctuary Archive"
                >
                  <Sparkles className="w-4 h-4 text-[#ff69b4] animate-sparkle shrink-0" />
                  <span className="font-bold tracking-wide">
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`min-h-[44px] text-base font-bold tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white border-b-2 border-white pb-0.5'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Search & Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Search HerStory Foundation"
            title="Search HerStory Foundation (Cmd+K)"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#0c0d10]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl p-6 flex flex-col gap-3 font-sans-ui z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left min-h-[44px] flex items-center px-3 py-2 text-base font-medium rounded-xs hover:bg-white/10 transition-colors ${
              activeTab === 'home' ? 'text-white font-bold bg-white/10' : 'text-white/80'
            }`}
          >
            Home Overview
          </button>
          {navItems.map((item) => {
            if (item.isRainbow) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left min-h-[44px] px-3 py-2 text-base font-medium flex items-center gap-2 rounded-xs hover:bg-white/10 transition-colors ${
                    activeTab === item.id ? 'font-bold text-white bg-white/10 border border-[#ff69b4]/50' : 'text-white/90'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#ff69b4] animate-sparkle shrink-0" />
                  <span className="font-bold text-white">
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left min-h-[44px] px-3 py-2 text-base font-medium flex items-center justify-between rounded-xs hover:bg-white/10 transition-colors ${
                  activeTab === item.id ? 'text-white font-bold bg-white/10' : 'text-white/80'
                }`}
              >
                <span>{item.label}</span>
                {item.isHighlight && (
                  <span className="w-2 h-2 bg-[#38bdf8] rounded-full animate-pulse-dot" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

