import React, { useState } from 'react';
import { Volume2, Sparkles, Calendar, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProjectLadylandView: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [workshopName, setWorkshopName] = useState('');
  const [workshopEmail, setWorkshopEmail] = useState('');
  const [workshopCity, setWorkshopCity] = useState('Dhaka');
  const [roleInterest, setRoleInterest] = useState('Ensemble Performer');
  const [workshopSubmitted, setWorkshopSubmitted] = useState(false);

  const handleWorkshopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkshopSubmitted(true);
    setTimeout(() => {
      setWorkshopSubmitted(false);
      setWorkshopName('');
      setWorkshopEmail('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 space-y-16 animate-in fade-in duration-300">
      {/* Banner / Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#261814] text-white shadow-xl border border-[#e2bfb4]">
        <img
          alt="Project Ladyland 2026"
          className="w-full h-80 md:h-[420px] object-cover opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU4aZVt8vA20tP37J-b_8mCNyQemm0TIsZ_beAvnCdRQ9xIwso-g47rLiHSKhHrR_cccEpSKvC4BRlVdubuM-t2q7pUJvge_1703GZuQmpY-mhU3bnKRO5ZJc1RTtqT00H0xCtwa_lyhV0NageMwgdLhka5lUDr431BNone2mfbLxCi2R_3wo6dXDkW_bYQRsRJatnQN55-zhumt75ThY9sMwFjUCw7WTBsH7w3ALH9Hs_C7ULgXmU9fOCrdI_np_JB8l7UjEPRZvf"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#261814] via-[#261814]/50 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 font-sans-ui text-xs">
            <span className="bg-[#BAD687] text-[#261814] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              British Council & WOW Grantee
            </span>
            <span className="bg-[#D672CE]/30 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              Participatory Performance 2024 - 2026
            </span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl md:text-6xl text-white font-bold leading-tight">
            Project Ladyland 2026
          </h1>

          <p className="font-serif-editorial text-base sm:text-lg text-white/90 leading-relaxed">
            Reimagining Rokeya Sakhawat Hosein's pioneering 1905 feminist science fiction novella *Sultana's Dream* into a living, participatory performance, audio archive, and climate justice laboratory.
          </p>
        </div>
      </div>

      {/* Audio Reader & Excerpt Section */}
      <div className="bg-[#fff1ec] border border-[#e2bfb4] p-6 md:p-8 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2 space-y-3 font-serif-editorial">
          <span className="font-sans-ui text-xs font-bold text-[#D672CE] uppercase tracking-widest block">
            SUITE 1: SULTANA'S DREAM NOVELLA EXCERPT
          </span>
          <h3 className="text-2xl font-bold text-[#261814]">
            "In Ladyland, science is used to cook without smoke and gather rain from clouds."
          </h3>
          <p className="text-sm text-[#594139] italic">
            "\'Where are the men?\' I asked Sister Sara. She laughed heartily. \'They are in their proper places, in the mardana, where they belong! While they were busy inventing deadly weapons, the women converted solar heat into energy and conquered nature through harmony.\'"
          </p>
        </div>

        <div className="bg-[#fff8f6] p-5 rounded-xl border border-[#e2bfb4] flex flex-col items-center text-center space-y-3 font-sans-ui">
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="w-14 h-14 rounded-full bg-[#D64E0E] text-white flex items-center justify-center hover:bg-[#a53700] transition-colors shadow-md cursor-pointer"
          >
            <Volume2 className={`w-7 h-7 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
          </button>
          <div>
            <p className="text-xs font-bold text-[#261814]">
              {isPlayingAudio ? 'Now Playing: Soundscape & Dramatic Reading' : 'Listen to Audio Excerpt'}
            </p>
            <p className="text-[11px] text-[#8d7167]">
              Ensemble recorded in Dhaka with traditional instruments
            </p>
          </div>
        </div>
      </div>

      {/* Core Themes Bento */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-sans-ui text-xs font-bold text-[#D64E0E] uppercase tracking-widest block mb-1">
            CORE PILARS
          </span>
          <h2 className="font-serif-editorial text-3xl font-bold text-[#261814]">
            What happens in Ladyland?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#fff8f6] border border-[#e2bfb4] p-6 rounded-2xl space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#D64E0E]/15 text-[#D64E0E] font-sans-ui text-xs font-bold flex items-center justify-center">
              01
            </span>
            <h3 className="font-serif-editorial text-xl font-bold text-[#261814]">Solar Energy Balloons</h3>
            <p className="font-serif-editorial text-xs text-[#594139] leading-relaxed">
              Harvesting solar heat above the clouds to generate clean energy for cooking and illumination without smoke or toxic waste.
            </p>
          </div>

          <div className="bg-[#fff8f6] border border-[#e2bfb4] p-6 rounded-2xl space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#D672CE]/15 text-[#D672CE] font-sans-ui text-xs font-bold flex items-center justify-center">
              02
            </span>
            <h3 className="font-serif-editorial text-xl font-bold text-[#261814]">Cloud Condensers</h3>
            <p className="font-serif-editorial text-xs text-[#594139] leading-relaxed">
              Gentle atmospheric water-collection systems that water agricultural fields and eliminate drought without damming rivers.
            </p>
          </div>

          <div className="bg-[#fff8f6] border border-[#e2bfb4] p-6 rounded-2xl space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#BAD687]/30 text-[#261814] font-sans-ui text-xs font-bold flex items-center justify-center">
              03
            </span>
            <h3 className="font-serif-editorial text-xl font-bold text-[#261814]">Female Governance</h3>
            <p className="font-serif-editorial text-xs text-[#594139] leading-relaxed">
              Dismantling militarism and replace arms manufacturing with universal education, botanical gardens, and shared carecraft.
            </p>
          </div>

          <div className="bg-[#fff8f6] border border-[#e2bfb4] p-6 rounded-2xl space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#a53700]/15 text-[#a53700] font-sans-ui text-xs font-bold flex items-center justify-center">
              04
            </span>
            <h3 className="font-serif-editorial text-xl font-bold text-[#261814]">Participatory Ensemble</h3>
            <p className="font-serif-editorial text-xs text-[#594139] leading-relaxed">
              Inviting local audiences, students, and weavers to become performers, shaping the script and soundscapes in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Tour & Workshop Registration */}
      <div className="bg-gradient-to-br from-[#ffe9e3] via-[#fff1ec] to-[#fde3da] border border-[#e2bfb4] rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="font-sans-ui text-xs font-bold text-[#D672CE] uppercase tracking-widest block">
            PARTICIPATE IN THE PERFORMANCE
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#261814] leading-tight">
            Join the Project Ladyland Ensemble Workshops
          </h2>
          <p className="font-serif-editorial text-sm text-[#594139] leading-relaxed">
            We are holding participatory workshops across Bangladesh and the UK for writers, sound designers, set builders, and community actors of all backgrounds.
          </p>

          <div className="space-y-3 font-sans-ui text-xs font-semibold text-[#261814]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D64E0E]" />
              <span>Workshop Cycle 1: Oct 12 – Nov 20, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D672CE]" />
              <span>Locations: Dhaka Shilpakala, Sylhet Town Hall, London Southbank</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#BAD687]" />
              <span>Grant supported by British Council & Women of the World (WOW)</span>
            </div>
          </div>
        </div>

        {/* Form Box */}
        <div className="bg-[#fff8f6] p-6 md:p-8 rounded-2xl border border-[#e2bfb4] shadow-md font-sans-ui text-xs">
          {workshopSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#BAD687] mx-auto animate-bounce" />
              <h3 className="font-serif-editorial text-xl font-bold text-[#261814]">
                Registration Received!
              </h3>
              <p className="font-serif-editorial text-xs text-[#594139]">
                We have saved your details. Our workshop coordinators will contact you with schedule details and preparation materials.
              </p>
            </div>
          ) : (
            <form onSubmit={handleWorkshopSubmit} className="space-y-4">
              <h3 className="font-serif-editorial text-lg font-bold text-[#261814]">
                Ensemble Registration Form
              </h3>

              <div>
                <label className="block font-bold text-[#261814] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Nusrat Jahan"
                  value={workshopName}
                  onChange={(e) => setWorkshopName(e.target.value)}
                  className="w-full bg-[#fff1ec] border border-[#e2bfb4] p-3 rounded-lg text-xs text-[#261814] focus:outline-none focus:border-[#D64E0E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#261814] uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="nusrat@example.com"
                  value={workshopEmail}
                  onChange={(e) => setWorkshopEmail(e.target.value)}
                  className="w-full bg-[#fff1ec] border border-[#e2bfb4] p-3 rounded-lg text-xs text-[#261814] focus:outline-none focus:border-[#D64E0E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#261814] uppercase tracking-wider mb-1">
                    City
                  </label>
                  <select
                    value={workshopCity}
                    onChange={(e) => setWorkshopCity(e.target.value)}
                    className="w-full bg-[#fff1ec] border border-[#e2bfb4] p-3 rounded-lg text-xs text-[#261814] focus:outline-none focus:border-[#D64E0E]"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="London">London</option>
                    <option value="Online">Online / Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#261814] uppercase tracking-wider mb-1">
                    Interest Area
                  </label>
                  <select
                    value={roleInterest}
                    onChange={(e) => setRoleInterest(e.target.value)}
                    className="w-full bg-[#fff1ec] border border-[#e2bfb4] p-3 rounded-lg text-xs text-[#261814] focus:outline-none focus:border-[#D64E0E]"
                  >
                    <option value="Ensemble Performer">Ensemble Performer</option>
                    <option value="Sound & Instrument">Sound & Instrument</option>
                    <option value="Set & Textile Design">Set & Textile Design</option>
                    <option value="Writing & Translation">Writing & Translation</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D64E0E] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider hover:bg-[#a53700] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Register for Workshop
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
