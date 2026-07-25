import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
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

  const navItems: { id: NavTab; label: string; isHighlight?: boolean }[] = [
    { id: 'dreams', label: 'Dreams' },
    { id: 'books', label: 'Books' },
    { id: 'sister-library', label: 'Sister Library' },
    { id: 'reflections', label: 'Reflections' },
    { id: 'ladyland', label: 'Project Ladyland 2026', isHighlight: true }
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="backdrop-blur-md bg-[#fff8f6]/80 w-full h-20 flex justify-between items-center px-4 md:px-12 max-w-7xl mx-auto z-50 sticky top-0 border-b border-[#ffe9e3] transition-colors">
      {/* Logo / Brand Home Link */}
      <button
        onClick={() => handleNavClick('home')}
        className="h-14 py-2 flex items-center text-left focus:outline-none group cursor-pointer"
        aria-label="HerStory Foundation Home"
      >
        <img
          alt="HerStory Foundation & Publications"
          className="h-full w-auto object-contain transition-transform group-hover:scale-[1.02]"
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
                className={`text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D64E0E] text-white shadow-sm scale-105'
                    : 'bg-[#D64E0E]/15 text-[#D64E0E] hover:bg-[#D64E0E]/25 hover:brightness-95'
                }`}
              >
                <span className="w-2.5 h-2.5 bg-[#D64E0E] rounded-full animate-pulse-dot" />
                {item.label}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#D64E0E] font-semibold border-b-2 border-[#D64E0E] pb-0.5'
                  : 'text-[#594139] hover:text-[#D64E0E]'
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
          className="p-2 text-[#D64E0E] hover:bg-[#ffe9e3] rounded-full transition-colors cursor-pointer"
          aria-label="Search HerStory Foundation"
          title="Search HerStory Foundation (Cmd+K)"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#D64E0E] hover:bg-[#ffe9e3] rounded-full transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#fff8f6] border-b border-[#ffe9e3] shadow-lg p-6 flex flex-col gap-4 font-sans-ui z-50">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left py-2 text-base font-medium ${
              activeTab === 'home' ? 'text-[#D64E0E] font-bold' : 'text-[#261814]'
            }`}
          >
            Home Overview
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left py-2 text-base font-medium flex items-center justify-between ${
                activeTab === item.id ? 'text-[#D64E0E] font-bold' : 'text-[#261814]'
              }`}
            >
              <span>{item.label}</span>
              {item.isHighlight && (
                <span className="w-2 h-2 bg-[#D64E0E] rounded-full animate-pulse-dot" />
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
