import { Star } from 'lucide-react';

export default function ContactView() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 transition-opacity duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <span className="text-gray-400 font-extrabold uppercase tracking-widest text-sm md:text-base">Get In Touch</span>
          <div className="space-y-3">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-none">get a 30 second text back at</h2>
            <p className="text-[#FF5A24] text-5xl md:text-7xl font-black tracking-tight">(413) 273-6536</p>
          </div>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
            Our team will call you soon after to discuss a free quote. Enter your information below to trigger an instant message.
          </p>

        </div>

        <div>
          <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100 aspect-video md:aspect-square">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80"
              alt="Beautiful clean residential house with garage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Property Highlight</span>
                <p className="text-xs font-bold text-gray-800">Cleaned & Restored Residential Vinyl siding</p>
              </div>
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((count) => (
                  <Star key={count} size={14} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
