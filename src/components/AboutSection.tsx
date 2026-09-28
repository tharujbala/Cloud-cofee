import { Coffee, MapPin, Clock, Award, Users } from 'lucide-react';

export function AboutSection() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 space-y-16">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8C6D58]">
          Our Craft & Origin
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#241711]">
          Dedicated to the Sacred Chemistry of Coffee
        </h1>
        <p className="text-sm text-[#6B5E55] leading-relaxed">
          Founded in 2021 by a collective of Q-graders and master baristas, Aura Coffee was born out of an obsession with terroir, slow roasting, and precise micro-layer extraction.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#F4ECE1] border border-[#EBE3D5] shadow-md">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
            alt="Coffee Roasting Machine"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E6747]">
              01. Direct Fair-Trade Sourcing
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#241711]">
              High Elevation Volcanic Soils
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E55] leading-relaxed">
              We partner directly with small-scale family estates across Ethiopia, Colombia, Guatemala, and Kenya at altitudes exceeding 1,800 meters. Every harvest is certified organic, ethically compensated above fair-trade thresholds, and hand-picked at peak ripeness.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E6747]">
              02. Drum Roasting Profile
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#241711]">
              Micro-Batches Every 48 Hours
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E55] leading-relaxed">
              Our Loring S15 Kestrel roaster utilizes convection thermodynamic profiles to highlight delicate floral aromatics without harsh acrid bitterness. The result is pure, silky body with natural sweetness.
            </p>
          </div>
        </div>
      </div>

      {/* Values & Standards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
        <div className="p-6 bg-white rounded-2xl border border-[#EBE3D5] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#4A2F22] border border-[#EBE3D5] flex items-center justify-center">
            <Award className="w-5 h-5 text-[#9E6747]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#241711]">SCA 88+ Rated Beans</h3>
          <p className="text-xs text-[#7A6A5E] leading-relaxed">
            Only coffees meeting Specialty Coffee Association scores of 88 points or above earn entry into our seasonal lineup.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#EBE3D5] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#4A2F22] border border-[#EBE3D5] flex items-center justify-center">
            <Coffee className="w-5 h-5 text-[#9E6747]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#241711]">Precision Layering</h3>
          <p className="text-xs text-[#7A6A5E] leading-relaxed">
            Every drink in our Visualizer is calibrated with specific fluid densities, temperatures, and micro-foam ratios.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#EBE3D5] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#4A2F22] border border-[#EBE3D5] flex items-center justify-center">
            <Users className="w-5 h-5 text-[#9E6747]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#241711]">Master Baristas</h3>
          <p className="text-xs text-[#7A6A5E] leading-relaxed">
            Our team undergoes rigorous latte art, sensory tasting, and temperature profiling certifications twice a year.
          </p>
        </div>
      </div>

      {/* Locations & Roastery Hours */}
      <div className="bg-white rounded-3xl border border-[#EBE3D5] p-8 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#241711] mb-6 text-center">
          Visit Our Roastery & Coffee Bars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#F4ECE1]">
          <div className="space-y-4 md:pr-6">
            <div className="flex items-center gap-2 text-[#4A2F22] font-semibold text-sm">
              <MapPin className="w-4 h-4 text-[#9E6747]" />
              <span>Flagship Roastery & Lab</span>
            </div>
            <p className="text-xs text-[#6B5E55]">
              742 Roasting Boulevard, Artisan District<br />
              San Francisco, CA 94107
            </p>
            <div className="flex items-start gap-2 text-xs text-[#7A6A5E] pt-2">
              <Clock className="w-4 h-4 text-[#8C6D58] shrink-0 mt-0.5" />
              <div>
                <p>Monday – Friday: 6:30 AM – 7:00 PM</p>
                <p>Saturday – Sunday: 7:30 AM – 8:00 PM</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 text-[#4A2F22] font-semibold text-sm">
              <MapPin className="w-4 h-4 text-[#9E6747]" />
              <span>Downtown Espresso Bar</span>
            </div>
            <p className="text-xs text-[#6B5E55]">
              128 Market Promenade, Suite 104<br />
              San Francisco, CA 94103
            </p>
            <div className="flex items-start gap-2 text-xs text-[#7A6A5E] pt-2">
              <Clock className="w-4 h-4 text-[#8C6D58] shrink-0 mt-0.5" />
              <div>
                <p>Monday – Friday: 7:00 AM – 6:00 PM</p>
                <p>Saturday: 8:00 AM – 5:00 PM (Sunday Closed)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
