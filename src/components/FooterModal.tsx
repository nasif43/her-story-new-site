import React, { useState } from 'react';
import { X, Mail, ShieldCheck, FileText, Send, CheckCircle2 } from 'lucide-react';

interface FooterModalProps {
  type: 'contact' | 'privacy' | 'terms' | 'newsletter' | null;
  onClose: () => void;
}

export const FooterModal: React.FC<FooterModalProps> = ({ type, onClose }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!type) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setContactName('');
      setContactEmail('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#261814]/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] border border-[#e2bfb4] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 font-sans-ui">
        {/* Header */}
        <div className="p-4 border-b border-[#ffe9e3] flex items-center justify-between bg-[#fff1ec]">
          <div className="flex items-center gap-2">
            {type === 'contact' && <Mail className="w-5 h-5 text-[#D64E0E]" />}
            {type === 'privacy' && <ShieldCheck className="w-5 h-5 text-[#BAD687]" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-[#D672CE]" />}
            {type === 'newsletter' && <Send className="w-5 h-5 text-[#D64E0E]" />}
            <h3 className="font-serif-editorial text-lg font-bold text-[#261814]">
              {type === 'contact' && 'Contact HerStory Foundation'}
              {type === 'privacy' && 'Privacy Policy & Ethical Data Commitments'}
              {type === 'terms' && 'Terms of Service & Open Culture License'}
              {type === 'newsletter' && 'Newsletter Dispatch'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#ffe9e3] text-[#8d7167] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh] font-serif-editorial text-sm text-[#261814] space-y-4">
          {type === 'contact' && (
            sent ? (
              <div className="text-center py-8 space-y-3 font-sans-ui">
                <CheckCircle2 className="w-12 h-12 text-[#a53700] mx-auto animate-bounce" />
                <h4 className="text-xl font-bold">Message Sent!</h4>
                <p className="text-xs text-[#594139]">
                  Thank you for reaching out. Our team in Dhaka will respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 font-sans-ui text-xs">
                <div>
                  <label className="block font-bold text-[#261814] uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhana Yasmin"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#fff1ec] border border-[#e2bfb4] p-3 rounded-lg text-sm text-[#261814] focus:outline-none focus:border-[#D64E0E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#261814] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="farhana@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-[#fff1ec] border border-[#e2bfb4] p-3 rounded-lg text-sm text-[#261814] focus:outline-none focus:border-[#D64E0E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#261814] uppercase tracking-wider mb-1">
                    Inquiry / Collaboration Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your interest in book distribution, Sister Library, or Project Ladyland workshops..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#fff1ec] border border-[#e2bfb4] p-3 rounded-lg text-sm text-[#261814] focus:outline-none focus:border-[#D64E0E]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#D64E0E] text-white px-6 py-2.5 rounded-lg font-bold uppercase tracking-wider hover:bg-[#a53700] transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )
          )}

          {type === 'privacy' && (
            <div className="space-y-3">
              <p>
                HerStory Foundation respects the privacy of every reader, story contributor, and artisan. We collect minimal personal information strictly necessary for book deliveries, library loans, and dispatch newsletters.
              </p>
              <h4 className="font-sans-ui font-bold text-xs uppercase tracking-wider text-[#D64E0E]">
                Our Privacy Commitments:
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs font-sans-ui text-[#594139]">
                <li>We never sell or monetize user data with third-party advertisers.</li>
                <li>Oral histories and textile recordings are published with explicit informed consent.</li>
                <li>Subscribers can opt out of newsletters at any time with a single click.</li>
              </ul>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-3">
              <p>
                Unless explicitly stated otherwise, HerStory Foundation publications, educational toolkits, and digital archives are shared under Creative Commons licenses to foster non-commercial knowledge sharing.
              </p>
              <h4 className="font-sans-ui font-bold text-xs uppercase tracking-wider text-[#D64E0E]">
                Open Culture & Copyright Guidelines:
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs font-sans-ui text-[#594139]">
                <li>Schools, reading circles, and community centers may freely print and share our downloadable toolkits.</li>
                <li>Commercial reproduction of artisan textile artwork requires permission to ensure fair wage compensation for craftswomen.</li>
              </ul>
            </div>
          )}

          {type === 'newsletter' && (
            <div className="space-y-3">
              <p>
                The HerStory Dispatch is our monthly journal featuring newly digitised oral histories, upcoming Sister Library reading circles, and performance dates for Project Ladyland 2026.
              </p>
              <p className="text-xs font-sans-ui text-[#594139] italic">
                Delivered twice a month with no spam or commercial clutter.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ffe9e3] bg-[#fff1ec] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#D64E0E] text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#a53700] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
