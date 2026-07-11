import { Award, Check, CheckCircle2, Droplet, Flame, Home as HomeIcon, Layers, MapPin, ShieldCheck, Sun, Trash2, Wrench } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

interface HomeViewProps {
  setCurrentPage: (page: 'home' | 'services' | 'contact') => void;
  setIsQuoteModalOpen: (value: boolean) => void;
}

export default function HomeView({ setCurrentPage, setIsQuoteModalOpen }: HomeViewProps) {
  return (
    <div className="space-y-16 transition-opacity duration-200">
      <section className="relative h-[550px] w-full text-white overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero_background_video.gif"
            alt="Pressure washing hero background"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
          <div className="max-w-xl space-y-6">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="block text-[#FF5A24]">Clean Done.</span>
              <span className="block text-white text-3xl md:text-4xl mt-2 font-semibold">Bringing your house back.</span>
            </h2>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              Serving Enfield, CT and surrounding communities with premium commercial and residential pressure washing.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setCurrentPage('contact')}
                className="bg-[#FF5A24] hover:bg-[#E54B1A] text-white px-8 py-3.5 rounded-sm font-bold uppercase tracking-wider text-xs shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Get a Quote
              </button>
              <button
                onClick={() => setCurrentPage('services')}
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3.5 rounded-sm font-bold uppercase tracking-wider text-xs shadow-md transition-transform hover:-translate-y-0.5"
              >
                See Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-white border border-gray-100 shadow-sm p-8 md:p-12 rounded-lg flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[#FF5A24] uppercase font-extrabold tracking-widest text-xs">Enfield & Surrounding Areas</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Eco-Friendly Pressure Washing Services</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              We leverage professional biodegradable cleaning agents and variable-pressure technology to restore vinyl siding, concrete, masonry, fences, and patios without damaging your landscaping.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="whitespace-nowrap bg-[#FF5A24] hover:bg-[#E54B1A] text-white px-8 py-4 font-bold uppercase tracking-widest text-xs rounded-sm transition-colors shadow-md"
          >
            Get a Quote
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-gray-900">House Exterior Washing</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              We eliminate years of green algae growth, grey mold, and embedded silt from your vinyl, brick, and stucco siding. Using low-pressure soft wash tactics preserves paint seals and protects the underlying wood frame.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-gray-700">
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} />
                <span>Low-pressure soft wash technology</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} />
                <span>Algae-killing biodegradable solutions</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} />
                <span>100% landscape-safe formulas</span>
              </li>
            </ul>
            <button
              onClick={() => setCurrentPage('services')}
              className="inline-flex items-center justify-center rounded-sm bg-[#FF5A24] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E54B1A]"
            >
              View All Before & After Examples
            </button>
          </div>
          <BeforeAfterSlider imageUrl="/assets/house_siding_beforeafter.png" isSplitImage title="House Vinyl Siding" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="space-y-3 text-center">
          <span className="text-[#FF5A24] uppercase font-bold tracking-widest text-xs">Project Gallery</span>
          <h3 className="text-3xl font-extrabold text-gray-900">Local Work Highlights from Enfield and Surrounding Areas</h3>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Browse photos of recent siding, driveway, deck, patio, and walkway projects that showcase the kind of restoration we deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { src: '/assets/house_siding_beforeafter.png', label: 'House Siding Wash' },
            { src: '/assets/driveway_clean_beforeafter.png', label: 'Driveway Cleaning' },
            { src: '/assets/composite_deck_washed.jpg', label: 'Deck Restoration' },
            { src: '/assets/concrete_patio_beforeafter.jpg', label: 'Patio Renewal' },
            { src: '/assets/patio_dirt_washing.png', label: 'Stone Path Cleaning' },
            { src: '/assets/bricksteps_beforeafter.jpg', label: 'Brick Steps Before & After' },
            { src: '/assets/front_walkway_beforeafter.jpg', label: 'Front Walkway' },
            { src: '/assets/brick_chimney_beforeafter.png', label: 'Chimney Cleaning' },
          ].map((item) => (
            <div key={item.src} className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm bg-white">
              <img src={item.src} alt={item.label} className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105" />
              <div className="p-3 text-xs font-semibold uppercase tracking-widest text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="space-y-2">
            <span className="text-[#FF5A24] uppercase font-bold tracking-widest text-xs">About Us</span>
            <h3 className="text-3xl font-extrabold">Experience and Expertise</h3>
            <p className="text-gray-400 max-w-xl text-sm">
              At Enfield Pressure Washing, we combine state-of-the-art power equipment with seasoned technicians who understand surface tension, compound pressure ratios, and stain extraction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-gray-800">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-[#FF5A24]">
                <MapPin size={24} />
                <h4 className="font-extrabold text-lg text-white">Enfield & Suffield CT</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                We are a hyper-local, community-focused crew based in the Enfield / Suffield corridor. We show up on schedule and treat your home like our family property.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-[#FF5A24]">
                <ShieldCheck size={24} />
                <h4 className="font-extrabold text-lg text-white">Fully Insured</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Enjoy complete peace of mind. We carry comprehensive liability and property-damage coverage, protecting your structures, deck assemblies, and exterior light fixtures.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-[#FF5A24]">
                <Award size={24} />
                <h4 className="font-extrabold text-lg text-white">Commercial Grade</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our machinery works at high flow volumes rather than just brute-force pressure. This delivers a cleaner outcome in half the time without scoring siding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <span className="text-[#FF5A24] uppercase font-bold tracking-widest text-xs">Our Range</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Discover Our Comprehensive Range of Cleaning Solutions</h3>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="bg-[#FF5A24] hover:bg-[#E54B1A] text-white px-6 py-3 font-bold uppercase text-xs tracking-wider rounded-sm transition-colors"
          >
            Get a Quote
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <HomeIcon size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">House Washing</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Layers size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Driveway & Walkway</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Droplet size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Pathway Cleaning</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Wrench size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Multi-Level Exterior</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Sun size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Gutter Clean / Restoration</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Flame size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Commercial Buildings</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Composite Decking</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Trash2 size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Seasonal Cleanup</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
