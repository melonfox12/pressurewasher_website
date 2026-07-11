import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  X, 
  Check, 
  Calculator, 
  Star, 
  ArrowUp, 
  Award, 
  ShieldCheck, 
  Home as HomeIcon, 
  Layers, 
  Droplet, 
  Wrench,
  Sun,
  Flame,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export default function App() {
  // Navigation states: 'home', 'services', 'contact', 'testimonials'
  const [currentPage, setCurrentPage] = useState('home');
  const [wixBannerVisible, setWixBannerVisible] = useState(true);
  
  // Interactive Modal state for Quote
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('house');
  const [quoteSqFt, setQuoteSqFt] = useState(1500);
  const [quoteDirtLevel, setQuoteDirtLevel] = useState('medium'); // light, medium, heavy
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(350);

  // Wix Live Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi there! Welcome to Enfield Pressure Washing. Let us know if you have any questions or would like a quick quote!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  // Calculate quote estimate whenever inputs change
  useEffect(() => {
    let basePricePerSqFt = 0.15;
    if (quoteService === 'driveway') basePricePerSqFt = 0.12;
    if (quoteService === 'deck') basePricePerSqFt = 0.22;
    if (quoteService === 'fence') basePricePerSqFt = 0.18;
    if (quoteService === 'full_package') basePricePerSqFt = 0.35;

    let multiplier = 1.0;
    if (quoteDirtLevel === 'light') multiplier = 0.85;
    if (quoteDirtLevel === 'heavy') multiplier = 1.25;

    const calc = Math.round(quoteSqFt * basePricePerSqFt * multiplier);
    setEstimatedCost(calc < 99 ? 99 : calc); // Minimum job fee
  }, [quoteService, quoteSqFt, quoteDirtLevel]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: chatInput }];
    setChatMessages(newMsgs);
    setChatInput('');

    // Simulated quick friendly response from Enfield Team
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: "Thanks for writing! We're wrapping up a job nearby in Enfield. Send your phone number or text us directly at (413) 273-6536 for an instant booking request!" 
        }
      ]);
    }, 1200);
  };

  const submitQuoteRequest = (e) => {
    e.preventDefault();
    if (!quotePhone) return;
    setQuoteSubmitted(true);
    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setQuoteSubmitted(false);
      setQuotePhone('');
    }, 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#2C2C2C] font-sans flex flex-col relative selection:bg-[#FF5A24] selection:text-white">
      
      {/* Wix Banner Block at top (As seen in screenshots) */}
      {wixBannerVisible && (
        <div className="w-full bg-white border-b border-gray-200 py-2.5 px-4 flex items-center justify-between text-xs sm:text-sm text-gray-700 z-50">
          <div className="flex items-center space-x-2 mx-auto sm:mx-0">
            <span className="font-extrabold tracking-widest text-[#116DFF] text-sm">WIX</span>
            <span className="text-gray-300">|</span>
            <span>This website was built on Wix. Create yours today.</span>
          </div>
          <button 
            onClick={() => window.open('https://wix.com', '_blank')}
            className="hidden sm:inline-block border border-[#116DFF] text-[#116DFF] hover:bg-[#116DFF] hover:text-white transition-colors duration-200 px-4 py-1 rounded-full font-medium text-xs"
          >
            Get Started
          </button>
          <button 
            onClick={() => setWixBannerVisible(false)}
            className="text-gray-400 hover:text-gray-600 ml-4 p-1"
            title="Dismiss Wix Banner"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Header / Navigation Bar (Fidelity match to Enfield Header Layout) */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Logo Brand Box */}
          <div className="border-[3px] border-[#6D6D6D] bg-[#555555] px-4 py-2 text-white text-center cursor-pointer transition-transform hover:scale-105" onClick={() => setCurrentPage('home')}>
            <h1 className="text-xl font-bold tracking-wider uppercase leading-none">Enfield</h1>
            <p className="text-[10px] tracking-widest uppercase font-medium mt-1 text-gray-300">Pressure Washing</p>
          </div>

          {/* Navigation Links Grid */}
          <nav className="flex flex-wrap items-center justify-center -space-x-[1px] rounded-sm overflow-hidden border border-gray-300 text-sm font-semibold">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-5 py-3 transition-colors duration-150 border-r border-gray-300 ${currentPage === 'home' ? 'bg-white text-gray-900' : 'bg-[#6D6D6D] hover:bg-[#5E5E5E] text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('services')}
              className={`px-5 py-3 transition-colors duration-150 border-r border-gray-300 ${currentPage === 'services' ? 'bg-white text-gray-900' : 'bg-[#6D6D6D] hover:bg-[#5E5E5E] text-white'}`}
            >
              Services
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`px-5 py-3 transition-colors duration-150 border-r border-gray-300 ${currentPage === 'contact' ? 'bg-white text-gray-900' : 'bg-[#6D6D6D] hover:bg-[#5E5E5E] text-white'}`}
            >
              Contact
            </button>
            <button 
              onClick={() => setCurrentPage('testimonials')}
              className={`px-5 py-3 transition-colors duration-150 ${currentPage === 'testimonials' ? 'bg-white text-gray-900' : 'bg-[#6D6D6D] hover:bg-[#5E5E5E] text-white'}`}
            >
              Testimonials
            </button>
            
            {/* Red-Orange highlighted Quote Button */}
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-6 py-3 bg-[#FF5A24] hover:bg-[#E54B1A] text-white transition-colors duration-150 font-bold tracking-wide uppercase shadow-inner"
            >
              Instant Quote
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && <HomeView setCurrentPage={setCurrentPage} setIsQuoteModalOpen={setIsQuoteModalOpen} />}
        {currentPage === 'services' && <ServicesView setIsQuoteModalOpen={setIsQuoteModalOpen} />}
        {currentPage === 'contact' && <ContactView />}
        {currentPage === 'testimonials' && <TestimonialsView />}
      </main>

      {/* Site Footer Block (Accurate reproduction of footer on all screenshots) */}
      <footer className="bg-white border-t border-gray-200 mt-16 pt-16 pb-8 text-sm text-[#2C2C2C]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-100">
            
            {/* Footer Column 1: Logo */}
            <div className="flex flex-col space-y-4">
              <div className="border-2 border-gray-800 bg-white p-3 inline-block self-start">
                <span className="block text-xl font-bold tracking-wider text-gray-900 uppercase leading-none">Enfield</span>
                <span className="block text-[9px] tracking-widest text-gray-500 uppercase mt-1">Pressure Washing</span>
              </div>
            </div>

            {/* Footer Column 2: Location */}
            <div className="space-y-3">
              <h4 className="font-bold text-base text-gray-900">Location</h4>
              <p className="text-gray-600">123-456-7890</p>
              <p className="text-gray-600 hover:text-[#FF5A24] transition-colors"><a href="mailto:info@mysite.com">info@mysite.com</a></p>
              <div className="pt-2 flex items-center space-x-1 text-[#FF5A24]">
                <MapPin size={16} />
                <span className="font-medium text-xs">Enfield, CT & Surrounding Areas</span>
              </div>
            </div>

            {/* Footer Column 3: Socials */}
            <div className="space-y-3">
              <h4 className="font-bold text-base text-gray-900">Socials</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#facebook" className="hover:text-[#FF5A24] transition-colors">Facebook</a></li>
                <li><a href="#instagram" className="hover:text-[#FF5A24] transition-colors">Instagram</a></li>
                <li><a href="#linkedin" className="hover:text-[#FF5A24] transition-colors">LinkedIn</a></li>
              </ul>
            </div>

            {/* Footer Column 4: Inquiries */}
            <div className="space-y-4">
              <h4 className="font-bold text-base text-gray-900">Inquiries</h4>
              <p className="text-gray-600 leading-relaxed">
                For any inquiries, questions or commendations, please call: <strong className="text-gray-900 block mt-1">(413) 273-6536</strong>
              </p>
              <button 
                onClick={() => setCurrentPage('contact')} 
                className="w-full bg-[#FF5A24] hover:bg-[#E54B1A] text-white py-3 px-6 font-bold uppercase transition-colors duration-150 tracking-wider text-xs"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Bottom copyright alignment */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-gray-500">
            <p>© 2035 by EcoZen Pressure Washing. Powered and secured by <a href="https://wix.com" target="_blank" rel="noreferrer" className="underline hover:text-gray-700">Wix</a></p>
            <button 
              onClick={scrollToTop} 
              className="flex items-center space-x-1 hover:text-[#FF5A24] font-semibold transition-colors mt-4 sm:mt-0"
            >
              <span>Go Up</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Wix Live Chat Icon (Bottom Right, matches screenshots) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group border border-gray-800"
            title="Chat with us"
          >
            <div className="w-6 h-6 bg-[#FF5A24] rounded-sm flex items-center justify-center relative">
              <span className="block w-3.5 h-0.5 bg-black rounded-full mb-1 absolute top-1.5"></span>
              <span className="block w-2.5 h-0.5 bg-black rounded-full mb-1 absolute top-2.5"></span>
              <div className="absolute bottom-0 right-1 translate-y-1/2 rotate-45 w-1.5 h-1.5 bg-[#FF5A24]"></div>
            </div>
          </button>
        ) : (
          <div className="w-80 sm:w-96 h-[450px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
            {/* Chat Header */}
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div>
                  <h3 className="font-bold text-sm">Enfield Support</h3>
                  <p className="text-[10px] text-gray-400">Usually replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Message Scroll */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50 text-xs">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#FF5A24] text-white rounded-br-none' 
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF5A24]"
              />
              <button 
                type="submit" 
                className="bg-[#FF5A24] text-white px-3 py-2 rounded-lg font-bold hover:bg-[#E54B1A] transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Instant Quote Estimator Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="bg-gray-900 text-white p-6 relative">
              <button 
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={22} />
              </button>
              <div className="flex items-center space-x-3">
                <Calculator className="text-[#FF5A24]" size={28} />
                <h3 className="text-xl font-bold">Instant Price Estimator</h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">Get an immediate ballpark pressure washing estimate based on your dimensions.</p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!quoteSubmitted ? (
                <form onSubmit={submitQuoteRequest} className="space-y-4">
                  {/* Service Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Select Service</label>
                    <select 
                      value={quoteService} 
                      onChange={(e) => setQuoteService(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-[#FF5A24]"
                    >
                      <option value="house">House Siding Wash</option>
                      <option value="driveway">Driveway & Walkway Clean</option>
                      <option value="deck">Deck & Patio Restorations</option>
                      <option value="fence">Fence Pressure Washing</option>
                      <option value="full_package">Full House Exterior Makeover</option>
                    </select>
                  </div>

                  {/* Size Slider Input */}
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase text-gray-700 mb-1">
                      <span>Area Size</span>
                      <span className="text-[#FF5A24] font-extrabold">{quoteSqFt} sq. ft.</span>
                    </div>
                    <input 
                      type="range" 
                      min="300" 
                      max="5000" 
                      step="100"
                      value={quoteSqFt} 
                      onChange={(e) => setQuoteSqFt(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5A24]"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>Small Deck/Drive (300 sq.ft)</span>
                      <span>Large Estate (5,000 sq.ft)</span>
                    </div>
                  </div>

                  {/* Dirt Level Select */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Mold / Algae / Dirt Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['light', 'medium', 'heavy'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setQuoteDirtLevel(lvl)}
                          className={`py-2 px-3 text-xs font-bold rounded-lg border capitalize transition-all ${
                            quoteDirtLevel === lvl 
                              ? 'border-[#FF5A24] bg-orange-50 text-[#FF5A24]' 
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Result Bracket Display */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 text-center">
                    <span className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">Calculated Ballpark Estimate</span>
                    <div className="text-4xl font-extrabold text-gray-900 mt-1">
                      ${estimatedCost - 30} - ${estimatedCost + 40}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Based on local CT pressure washing averages and overhead.</p>
                  </div>

                  {/* Lead Generation Phone submission */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Phone Number for 30-Sec Text Confirmation</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(413) 273-6536"
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-[#FF5A24]"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#FF5A24] hover:bg-[#E54B1A] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors shadow-lg"
                  >
                    Lock in Quote & Text Me Back
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500">
                    <Check size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Ballpark Quote Locked In!</h4>
                  <p className="text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
                    We just sent a simulation notification to our team! Expect your confirmation text at <span className="font-bold text-gray-900">{quotePhone}</span> shortly.
                  </p>
                  <p className="text-[11px] text-gray-400 italic">This modal will close in a few seconds...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Mapping of your local assets to live-streaming web equivalents for browser preview capability
const FALLBACK_ASSETS = {
  'house_siding_beforeafter.jpg': 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
  'driveway_clean_beforeafter.jpg': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  'composite_deck_washed.jpg': 'https://images.unsplash.com/photo-1595514535315-99df946892e8?auto=format&fit=crop&w=1200&q=80',
  'concrete_patio_beforeafter.jpg': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'patio_dirt_washing.jpg': 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=1200&q=80',
  'bricksteps_beforeafter.jpg': 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80',
  'front_walkway_beforeafter.jpg': 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
  'brick_chimney_beforeafter.jpg': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  'hero_background_video.MOV': 'https://assets.mixkit.co/videos/preview/mixkit-man-cleaning-the-entrance-of-his-house-with-pressure-washer-40156-large.mp4'
};

/**
 * Custom Interactive Before/After Drag Slider
 */
function BeforeAfterSlider({ 
  imageUrl, 
  isSplitImage = true, 
  dirtyOverlayClass = "",
  aspectRatio = "aspect-video",
  title = "Project Showcase"
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [currentSrc, setCurrentSrc] = useState(imageUrl);

  // Fallback handler if local file fails to load in preview environment
  const handleImageError = () => {
    if (FALLBACK_ASSETS[imageUrl]) {
      setCurrentSrc(FALLBACK_ASSETS[imageUrl]);
    }
  };

  useEffect(() => {
    setCurrentSrc(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1 || e.type === 'touchmove') {
      handleMove(e.clientX || e.touches[0].clientX);
    }
  };

  const handleMouseDown = (e) => {
    handleMove(e.clientX);
  };

  return (
    <div className="space-y-2">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        className={`relative ${aspectRatio} w-full overflow-hidden rounded-lg shadow-md border border-gray-200 select-none cursor-ew-resize`}
      >
        {/* AFTER LAYER (Clean) */}
        {isSplitImage ? (
          <div className="absolute inset-0">
            <img 
              src={currentSrc} 
              alt={`${title} Clean`}
              onError={handleImageError}
              className="absolute top-0 right-0 h-full object-cover pointer-events-none"
              style={{
                width: '200%',
                maxWidth: 'none',
                transform: 'translateX(0%)',
                objectPosition: 'right'
              }}
            />
          </div>
        ) : (
          <img 
            src={currentSrc} 
            alt={`${title} Clean`}
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
        <div className="absolute top-3 right-3 bg-green-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-1 rounded shadow-sm z-10 pointer-events-none">
          Cleaned
        </div>

        {/* BEFORE LAYER (Dirty - Width controlled by slider state) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none border-r border-white/50 z-10"
          style={{ width: `${sliderPosition}%` }}
        >
          {isSplitImage ? (
            <div 
              className="absolute top-0 left-0 h-full"
              style={{ width: containerWidth }}
            >
              <img 
                src={currentSrc} 
                alt={`${title} Dirty`}
                onError={handleImageError}
                className="absolute inset-0 h-full object-cover pointer-events-none"
                style={{
                  width: '200%',
                  maxWidth: 'none',
                  objectPosition: 'left'
                }}
              />
            </div>
          ) : (
            <div 
              className="absolute top-0 left-0 h-full"
              style={{ width: containerWidth }}
            >
              <img 
                src={currentSrc} 
                alt={`${title} Dirty`}
                onError={handleImageError}
                className={`absolute inset-0 h-full w-full object-cover filter ${dirtyOverlayClass}`}
              />
              <div 
                className="absolute inset-0 bg-repeat opacity-40 pointer-events-none mix-blend-multiply" 
                style={{ 
                  backgroundImage: `radial-gradient(circle, rgba(40,60,20,0.85) 4%, transparent 12%), radial-gradient(circle, rgba(20,30,10,0.9) 2%, transparent 8%)`,
                  backgroundSize: '30px 30px'
                }}
              ></div>
            </div>
          )}
          
          <div className="absolute top-3 left-3 bg-[#FF5A24] text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-1 rounded shadow-sm z-10 pointer-events-none">
            Before Wash
          </div>
        </div>

        {/* Slider Bar Divider & Drag Handle */}
        <div 
          className="absolute inset-y-0 w-1 bg-white shadow-2xl pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-200 font-bold text-xs select-none">
            ↔
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium px-1">
        <span>◀ Slide to reveal original grime level</span>
        <span>Drag right to clean! ▶</span>
      </div>
    </div>
  );
}

/**
 * Home Page View
 */
function HomeView({ setCurrentPage, setIsQuoteModalOpen }) {
  return (
    <div className="space-y-16 animate-in fade-in duration-200">
      
      {/* Hero Section with Looping Background Video & Format Fallback */}
      <section className="relative h-[550px] w-full bg-slate-900 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-70"
          >
            {/* 1st option: Local MOV file path */}
            <source src="hero_background_video.MOV" type="video/quicktime" />
            {/* 2nd option: Live streaming MP4 web fallback for browser compatibility */}
            <source src={FALLBACK_ASSETS['hero_background_video.MOV']} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent"></div>
        </div>

        {/* Hero Text Content overlay */}
        <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
          <div className="max-w-xl space-y-6">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="block text-[#FF5A24]">Clean Done.</span>
              <span className="block text-white text-3xl md:text-4xl mt-2 font-semibold">Bringing your house back.</span>
            </h2>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              Serving Enfield, CT and surrounding communities with premium commercial and residential pressure washing. High-powered mildew, algae, and grime extraction.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-[#FF5A24] hover:bg-[#E54B1A] text-white px-8 py-3.5 rounded-sm font-bold uppercase tracking-wider text-xs shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Get a Quote
              </button>
              <button 
                onClick={() => setCurrentPage('services')}
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3.5 rounded-sm font-bold uppercase tracking-wider text-xs shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                See Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Hero Intro block */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-white border border-gray-100 shadow-sm p-8 md:p-12 rounded-lg flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[#FF5A24] uppercase font-extrabold tracking-widest text-xs">Enfield & Surrounding Areas</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Eco-Friendly Pressure Washing Services</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              We leverage professional biodegradable cleaning agents and variable-pressure technology to restore vinyl siding, concrete, masonry, fences, and patios without damaging your landscaping or structural material.
            </p>
          </div>
          <button 
            onClick={() => setIsQuoteModalOpen(true)}
            className="whitespace-nowrap bg-[#FF5A24] hover:bg-[#E54B1A] text-white px-8 py-4 font-bold uppercase tracking-widest text-xs rounded-sm transition-colors shadow-md"
          >
            Get a Quote
          </button>
        </div>
      </section>

      {/* Alternating Panels Section with true-aligned before/after file assets */}
      <section className="max-w-6xl mx-auto px-4 space-y-16">
        
        {/* Row 1: House Siding Wash */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-gray-900">House Exterior Washing</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              We eliminate years of green algae growth, grey mold, and embedded silt from your vinyl, brick, and stucco siding. Using low-pressure "soft wash" tactics, we preserve paint seals and protect the underlying wood frame.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-gray-700">
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} /> <span>Low-Pressure Soft Wash Technology</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} /> <span>Algae-killing Bio-solutions</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} /> <span>100% Landscape-safe formulas</span>
              </li>
            </ul>
          </div>
          <BeforeAfterSlider 
            imageUrl="house_siding_beforeafter.jpg" 
            isSplitImage={true}
            title="House Vinyl Siding"
          />
        </div>

        {/* Row 2: Driveway and Sidewalk Cleaning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="md:order-2 space-y-4">
            <h3 className="text-2xl font-extrabold text-gray-900">Driveway & Sidewalk Cleaning</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Our professional rotary surface cleaners scour away stubborn motor oil slicks, heavy rust drip-stains, and slippery black mildew lines from your concrete, flagstone walkways, and block paving.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-gray-700">
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} /> <span>High PSI Rotary Surfacing Scourers</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} /> <span>Full Oil Stain Breakdown Pre-treatments</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} /> <span>Restores original bright limestone-concrete glow</span>
              </li>
            </ul>
          </div>
          <div className="md:order-1">
            <BeforeAfterSlider 
              imageUrl="driveway_clean_beforeafter.jpg" 
              isSplitImage={true}
              title="Concrete Driveway"
            />
          </div>
        </div>

        {/* Row 3: Deck and Patio Cleaning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-gray-900">Deck & Patio Cleaning</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Restore the rich, warm natural colors of your composite or hardwood decking. We wash away decaying leaf detritus, mold spores, and peeling sealers, preparing your surface perfectly for subsequent stains or waterproofing.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-gray-700">
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} /> <span>Revitalizes composite wood decking cleanly</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} /> <span>Stops wood mold rot and slippage hazards</span>
              </li>
            </ul>
          </div>
          <BeforeAfterSlider 
            imageUrl="composite_deck_washed.jpg" 
            isSplitImage={false}
            dirtyOverlayClass="brightness-40 sepia contrast-110 hue-rotate-[15deg]"
            title="Wood Deck Patio"
          />
        </div>

      </section>

      {/* Experience and Expertise Badges */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="space-y-2">
            <span className="text-[#FF5A24] uppercase font-bold tracking-widest text-xs">About Us</span>
            <h3 className="text-3xl font-extrabold">Experience and Expertise</h3>
            <p className="text-gray-400 max-w-xl text-sm">
              At Enfield Pressure Washing, we combine state-of-the-art power-equipment with seasoned technicians who understand molecular surface tension, compound pressure ratios, and stain extraction.
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
                Our machinery works at high flow volumes (GPM) rather than just brute-force pressure (PSI). This delivers a cleaner outcome in half the time without scoring siding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Cleaning Solutions Grid (8 card items matching screenshot layout) */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <span className="text-[#FF5A24] uppercase font-bold tracking-widest text-xs">Our Range</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Discover Our Comprehensive Range of Cleaning Solutions</h3>
          </div>
          <button 
            onClick={() => setIsQuoteModalOpen(true)}
            className="bg-[#FF5A24] hover:bg-[#E54B1A] text-white px-6 py-3 font-bold uppercase text-xs tracking-wider rounded-sm transition-colors shrink-0"
          >
            Get a Quote
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-xs flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <HomeIcon size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">House Washing</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-xs flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Layers size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Driveway and Walkway</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-xs flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Droplet size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Pathway Cleaning</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-xs flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Wrench size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Multi Level Exterior</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-xs flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Sun size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Gutter Clean/Restoration</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-xs flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <Flame size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Commercial Buildings</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-xs flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
            <div className="p-3 bg-orange-50 text-[#FF5A24] rounded-full group-hover:scale-110 transition-transform">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="font-bold text-sm text-gray-800">Composite Decking</h4>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-xs flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-all">
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

/**
 * Services Page View
 * Corresponds to "maximillianhanson3.wixsite.com_my-site-1_services.jpg"
 */
function ServicesView({ setIsQuoteModalOpen }) {
  const serviceList = [
    {
      title: "House Washing",
      desc: "Our low pressure chemical soft wash relies on specialized bio-degradable detergents to safely melt away moss, thick black molds, and green roof/siding algae. Perfect for vinyl, cedar shakes, wood panels, and hardie planks.",
      img: "house_siding_beforeafter.jpg",
      isSplit: true
    },
    {
      title: "Driveway and Sidewalk Cleaning",
      desc: "High-powered surface clean machinery spins intense water jets directly against ground surfaces to evenly extract deep grimy grey mud, dark grease stains, weeds in joint lines, and weathered concrete shadows.",
      img: "driveway_clean_beforeafter.jpg",
      isSplit: true
    },
    {
      title: "Deck and Patio Cleaning",
      desc: "Restore composite decks and stained wood components safely. By optimizing the distance and water-to-soap ratio, we remove slippage risks, green algae layers, and decaying organic foliage elements cleanly.",
      img: "concrete_patio_beforeafter.jpg",
      isSplit: true
    },
    {
      title: "Pathway & Stone Wash detailing",
      desc: "Our high PSI rotary surface scoured pathways return weathered stone, pathways and garden steps to pristine condition. Programmatically cleans away years of moss.",
      img: "patio_dirt_washing.jpg",
      isSplit: false,
      overlay: "brightness-50 sepia saturate-150 contrast-125"
    },
    {
      title: "Before and After Showcases",
      desc: "Browse our active local client showcases in Enfield and Suffield. Witness how simple, routine maintenance protects property appraisals and creates high-curb value instantly.",
      img: "bricksteps_beforeafter.jpg",
      isSplit: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Services Title Head */}
      <div className="border-b border-gray-100 pb-8 text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[#FF5A24] font-extrabold uppercase tracking-widest text-xs">Our Services</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">We Offer a Range of Services to Meet Your Needs</h2>
        <p className="text-gray-500 text-sm">Professional power washing & siding detailing solutions using eco-friendly cleansers.</p>
      </div>

      {/* Services Interlaced Layout (Matches Services.jpg screenshot layout structure) */}
      <div className="space-y-16">
        {serviceList.map((svc, idx) => (
          <div 
            key={idx} 
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
              idx % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Service Text details */}
            <div className={`md:col-span-5 space-y-4 ${idx % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 text-[#FF5A24] rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">{svc.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center space-x-2 text-[#FF5A24] font-extrabold text-xs uppercase tracking-wider hover:text-[#E54B1A]"
              >
              </button>
            </div>

            {/* Drag Before After Display Box */}
            <div className={`md:col-span-7 ${idx % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
              <BeforeAfterSlider 
                imageUrl={svc.img}
                isSplitImage={svc.isSplit}
                dirtyOverlayClass={svc.overlay}
                title={svc.title}
                aspectRatio="aspect-video"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Contact Page View
 * Corresponds to "maximillianhanson3.wixsite.com_my-site-1_contact.jpg"
 */
function ContactView() {
  const [leadPhone, setLeadPhone] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadMsg, setLeadMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmitContact = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setLeadPhone('');
      setLeadName('');
      setLeadMsg('');
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-in fade-in duration-200">
      
      {/* Two Column Layout exactly matching Contact Image layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column Content */}
        <div className="space-y-6">
          <span className="text-gray-400 font-extrabold uppercase tracking-widest text-xs">Get In Touch</span>
          
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-none">
              get a 30 second text back at
            </h2>
            <p className="text-[#FF5A24] text-4xl md:text-5xl font-black tracking-tight">
              (413) 273-6536
            </p>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            Our team will call you soon after to discuss a free quote. Enter your information below to trigger an instant message.
          </p>

          {/* High-fidelity Contact Input panel */}
          <form onSubmit={handleSubmitContact} className="space-y-4 pt-4 border-t border-gray-100 max-w-md">
            {isSent ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-xs font-semibold">
                ✓ Message sent! One of our team members will call or text you in under 30 seconds.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#FF5A24] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Your Phone</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(413) 273-6536"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#FF5A24] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Brief Description of work</label>
                  <textarea 
                    rows="3"
                    value={leadMsg}
                    onChange={(e) => setLeadMsg(e.target.value)}
                    placeholder="e.g., Need driveway and vinyl siding cleaned before next week."
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#FF5A24] focus:outline-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#FF5A24] hover:bg-[#E54B1A] text-white py-3 px-6 rounded-lg font-bold uppercase tracking-wider text-xs transition-colors"
                >
                  Send Callback Request
                </button>
              </>
            )}
          </form>
        </div>

        {/* Right Column: High Quality Residence matching original visual asset */}
        <div>
          <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100 aspect-video md:aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80" 
              alt="Beautiful clean residential house with garage" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-lg flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Property Highlight</span>
                <p className="text-xs font-bold text-gray-800">Cleaned & Restored Residential Vinyl siding</p>
              </div>
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Testimonials Page View
 * Corresponds to "maximillianhanson3.wixsite.com_my-site-1_about-3.jpg"
 */
function TestimonialsView() {
  const testimonials = [
    {
      name: "Jason Mathews",
      location: "Cape Cod, Ma resident",
      date: "July 2026",
      text: "Max and his crew did a solid job on my patio. Didn't think it would ever come clean, but it looks brand new now. They showed up on time, got the work done, and didn't leave a mess. Definitely recommend if you need your place cleaned up.",
      image: "concrete_patio_beforeafter.jpg",
      isSplit: true
    },
    {
      name: "Tyler Mcarthy",
      location: "Cape Cod, Ma resident",
      date: "June 2026",
      text: "Called them up to handle the front walkway. They came through and got the stone looking sharp again. Huge difference from how it looked before. Nice guys, showed up when they said they would, and got it finished without any hassle. Probably going to use them again when I need a touch-up.",
      image: "front_walkway_beforeafter.jpg",
      isSplit: true
    },
    {
      name: "Jack Sweeney",
      location: "Somers CT resident",
      date: "June 2026",
      text: "Pretty stoked with how the chimney turned out. Was definitely skeptical at first because it was pretty neglected, but it looks awesome now. Solid work, quick turnaround, and no BS. I'll definitely have them back out when it gets dirty again.",
      image: "brick_chimney_beforeafter.jpg",
      isSplit: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Testimonials header */}
      <div className="border-b border-gray-100 pb-8 text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[#FF5A24] font-extrabold uppercase tracking-widest text-xs">The Full Story</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Customer Testimonials</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          At Enfield Pressure Washing, we take pride in delivering top-notch service with eco-friendly solutions. Don't just take our word for it—see what our satisfied customers have to say!
        </p>
      </div>

      {/* Grid Stack matching about-3.jpg design flow with exact matches */}
      <div className="space-y-16">
        {testimonials.map((t, idx) => (
          <div 
            key={idx} 
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center border border-gray-150 rounded-xl overflow-hidden shadow-xs bg-white p-6 md:p-8"
          >
            {/* Column: Image Slider Side */}
            <div className={`${idx % 2 === 1 ? 'md:order-2' : ''}`}>
              <BeforeAfterSlider 
                imageUrl={t.image}
                isSplitImage={t.isSplit}
                title={`${t.name}'s project`}
                aspectRatio="aspect-video"
              />
            </div>

            {/* Column: Review Content Side */}
            <div className={`space-y-4 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
              <div className="flex items-center space-x-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="space-y-3">
                <p className="text-gray-700 italic text-sm leading-relaxed">
                  "{t.text}"
                </p>
                <cite className="block not-italic">
                  <span className="block font-black text-gray-900 text-base">{t.name}</span>
                  <span className="block text-xs text-gray-400 font-semibold">{t.location} — {t.date}</span>
                </cite>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}