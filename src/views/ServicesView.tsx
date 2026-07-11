import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { SERVICE_DETAILS } from '../data';

interface ServicesViewProps {
  setIsQuoteModalOpen: (value: boolean) => void;
}

export default function ServicesView({ setIsQuoteModalOpen }: ServicesViewProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 transition-opacity duration-200">
      <div className="border-b border-gray-100 pb-8 text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[#FF5A24] font-extrabold uppercase tracking-widest text-xs">Our Services</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">We Offer a Range of Services to Meet Your Needs</h2>
        <p className="text-gray-500 text-sm">Professional power washing & siding detailing solutions using eco-friendly cleansers.</p>
      </div>

      <div className="space-y-16">
        {SERVICE_DETAILS.map((service, idx) => {
          const overlayClass = 'overlay' in service ? (service as { overlay?: string }).overlay ?? '' : '';

          return (
          <div key={service.title} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className={`md:col-span-5 space-y-4 ${idx % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 text-[#FF5A24] rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">{service.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center space-x-2 text-[#FF5A24] font-extrabold text-xs uppercase tracking-wider hover:text-[#E54B1A]"
              >
              </button>
            </div>
            <div className={`md:col-span-7 ${idx % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
              <BeforeAfterSlider
                imageUrl={service.image}
                beforeImageUrl={
                  service.title === 'Driveway and Sidewalk Cleaning'
                    ? '/assets/driveway_before.png'
                    : service.title === 'Patio Cleaning'
                    ? '/assets/patio_before.png'
                    : service.title === 'Pathway & Stone Wash Detailing'
                    ? '/assets/front_walkway_before.jpg'
                    : undefined
                }
                afterImageUrl={
                  service.title === 'Driveway and Sidewalk Cleaning'
                    ? '/assets/driveway_after.png'
                    : service.title === 'Patio Cleaning'
                    ? '/assets/patio_after.png'
                    : service.title === 'Pathway & Stone Wash Detailing'
                    ? '/assets/front_walkway_after.jpg'
                    : undefined
                }
                isSplitImage={service.isSplit}
                dirtyOverlayClass={overlayClass}
                title={service.title}
                aspectRatio="aspect-video"
              />
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
