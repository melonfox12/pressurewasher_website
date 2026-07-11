import { Star } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { TESTIMONIALS } from '../data';

export default function TestimonialsView() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 transition-opacity duration-200">
      <div className="border-b border-gray-100 pb-8 text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[#FF5A24] font-extrabold uppercase tracking-widest text-xs">The Full Story</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Customer Testimonials</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          At Enfield Pressure Washing, we take pride in delivering top-notch service with eco-friendly solutions. Don't just take our word for it—see what our satisfied customers have to say!
        </p>
      </div>

      <div className="space-y-16">
        {TESTIMONIALS.map((testimonial, idx) => (
          <div key={testimonial.name} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white p-6 md:p-8">
            <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
              <BeforeAfterSlider
                imageUrl={testimonial.image}
                isSplitImage={testimonial.isSplit}
                title={`${testimonial.name} project`}
                aspectRatio="aspect-video"
              />
            </div>
            <div className={`space-y-4 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
              <div className="flex items-center space-x-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((count) => (
                  <Star key={count} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="space-y-3">
                <p className="text-gray-700 italic text-sm leading-relaxed">"{testimonial.text}"</p>
                <cite className="block not-italic">
                  <span className="block font-black text-gray-900 text-base">{testimonial.name}</span>
                  <span className="block text-xs text-gray-400 font-semibold">
                    {testimonial.location} — {testimonial.date}
                  </span>
                </cite>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
