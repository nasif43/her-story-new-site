import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenFooterModal: (modalType: 'contact' | 'privacy' | 'terms' | 'newsletter') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFooterModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#fff1ec]/80 backdrop-blur-sm w-full pt-16 pb-12 border-t border-[#ffe9e3]">
      <div className="flex flex-col items-center px-4 md:px-12 max-w-7xl mx-auto space-y-8 text-center">
        {/* HerStory Foundation Logo */}
        <div className="h-12 w-auto">
          <img
            alt="HerStory Foundation & Publications"
            className="h-full w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjg2Qx_aTe8hUg2nAI0OPE_tImw2Nl2ICR0K7pZlASJLhU7n-oxBihz4KIyFuNA7f8pTLisJr1z0OD8YYyFNKdnHLO1BVQpnq44nBjndUukUgJIcWhZfDyUXSiZXUWq5kICJeJfdpexlbUgIdAec_kfQei-KGlGRAp7lDr04FLTCEj8Ryr-sSpz1csXhVnHav0sBWNsAFJKHSZ-iJLvCgRVt1dcBuOP5nvEOJ97Nz4EmMXv_pOy1R1zesAwNy64GMrJ3oVySrCvQ"
          />
        </div>

        {/* Quick Newsletter Signup Block */}
        <div className="w-full max-w-md bg-[#fff8f6] p-4 rounded-xl border border-[#e2bfb4]">
          <p className="font-serif-editorial text-sm text-[#261814] font-semibold mb-2">
            Subscribe to HerStory Dispatch
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-xs font-sans-ui text-[#812900] bg-[#BAD687]/30 py-2 rounded-lg font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#a53700]" />
              Welcome to the HerStory circle!
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 font-sans-ui">
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 text-xs bg-[#fff1ec] border border-[#e2bfb4] px-3 py-2 rounded-lg focus:outline-none focus:border-[#D64E0E] text-[#261814]"
              />
              <button
                type="submit"
                className="bg-[#D64E0E] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#a53700] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Join
              </button>
            </form>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 font-serif-editorial text-sm">
          <button
            onClick={() => onOpenFooterModal('contact')}
            className="text-[#594139] hover:text-[#D64E0E] hover:underline transition-all cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={() => onOpenFooterModal('privacy')}
            className="text-[#594139] hover:text-[#D64E0E] hover:underline transition-all cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onOpenFooterModal('terms')}
            className="text-[#594139] hover:text-[#D64E0E] hover:underline transition-all cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={() => onOpenFooterModal('newsletter')}
            className="text-[#594139] hover:text-[#D64E0E] hover:underline transition-all cursor-pointer"
          >
            Newsletter Signup
          </button>
        </div>

        {/* Copyright notice */}
        <div className="font-serif-editorial text-xs text-[#8d7167]">
          © {new Date().getFullYear()} HerStory Foundation & Publications. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
