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
    <header className="backdrop-blur-xl bg-white/20 w-full h-20 flex justify-between items-center px-4 md:px-12 max-w-7xl mx-auto z-50 sticky top-0 border-b border-white/20 shadow-sm transition-colors">
      {/* Logo / Brand Home Link */}
      <button
        onClick={() => handleNavClick('home')}
        className="h-16 py-1 flex items-center text-left focus:outline-none group cursor-pointer"
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
                className={`text-base font-bold flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#141414] shadow-sm scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse-dot ${isActive ? 'bg-[#141414]' : 'bg-white'}`} />
                {item.label}
              </button>
            );
          }

          if (item.isRainbow) {
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-base font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/20 ${
                  isActive
                    ? 'bg-white/20 font-bold border border-[#ff69b4]/60 shadow-xs'
                    : ''
                }`}
                title="Sister Library — Dhaka Sanctuary Archive"
              >
                <Sparkles className="w-4 h-4 text-[#ff69b4] animate-sparkle shrink-0" />
                <span className="rainbow-text-gradient font-bold tracking-wide">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-base font-bold tracking-wide transition-colors duration-200 cursor-pointer ${
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

      {/* Action Controls: Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSearch}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          aria-label="Search HerStory Foundation"
          title="Search HerStory Foundation (Cmd+K)"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg p-6 flex flex-col gap-4 font-sans-ui z-50">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left py-2 text-base font-medium ${
              activeTab === 'home' ? 'text-[#141414] font-bold' : 'text-[#141414]/70'
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
                  className={`text-left py-2 text-base font-medium flex items-center gap-2 ${
                    activeTab === item.id ? 'font-bold' : ''
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#ff69b4] animate-sparkle shrink-0" />
                  <span className="rainbow-text-gradient font-bold">
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 text-base font-medium flex items-center justify-between ${
                  activeTab === item.id ? 'text-[#141414] font-bold' : 'text-[#141414]/70'
                }`}
              >
                <span>{item.label}</span>
                {item.isHighlight && (
                  <span className="w-2 h-2 bg-[#141414] rounded-full animate-pulse-dot" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

