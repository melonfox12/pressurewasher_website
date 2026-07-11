import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Calculator, Check, ChevronRight, MapPin, X } from 'lucide-react';
import HomeView from './views/HomeView';
import ServicesView from './views/ServicesView';
import ContactView from './views/ContactView';
import { QuoteServiceType, DirtLevelType, SERVICE_OPTIONS } from './data';

type Page = 'home' | 'services' | 'contact';

type ChatMessage = {
  sender: 'bot' | 'user';
  text: string;
};

const navItems: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const MIN_JOB_FEE = 99;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteService, setQuoteService] = useState<QuoteServiceType>('house');
  const [quoteSqFt, setQuoteSqFt] = useState(1500);
  const [quoteDirtLevel, setQuoteDirtLevel] = useState<DirtLevelType>('medium');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(350);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Hi there! Welcome to Enfield Pressure Washing. Let us know if you have any questions or would like a quick quote!',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const quoteCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setEstimatedCost(Math.max(MIN_JOB_FEE, calc));
  }, [quoteService, quoteSqFt, quoteDirtLevel]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  useEffect(() => {
    return () => {
      if (chatTimerRef.current) {
        clearTimeout(chatTimerRef.current);
      }
      if (quoteCloseTimerRef.current) {
        clearTimeout(quoteCloseTimerRef.current);
      }
    };
  }, []);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedInput = chatInput.trim();
    if (!trimmedInput) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: trimmedInput }]);
    setChatInput('');

    if (chatTimerRef.current) {
      clearTimeout(chatTimerRef.current);
    }

    chatTimerRef.current = window.setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "Thanks for writing! We're wrapping up a job nearby in Enfield. Send your phone number or text us directly at (413) 273-6536 for an instant booking request!",
        },
      ]);
      chatTimerRef.current = null;
    }, 1200);
  };

  const submitQuoteRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!quotePhone.trim()) return;

    setQuoteSubmitted(true);
    if (quoteCloseTimerRef.current) {
      clearTimeout(quoteCloseTimerRef.current);
    }

    quoteCloseTimerRef.current = window.setTimeout(() => {
      setIsQuoteModalOpen(false);
      setQuoteSubmitted(false);
      setQuotePhone('');
      quoteCloseTimerRef.current = null;
    }, 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#2C2C2C] font-sans flex flex-col relative selection:bg-[#FF5A24] selection:text-white">
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div
            className="border-[3px] border-[#6D6D6D] bg-[#555555] px-4 py-2 text-white text-center cursor-pointer transition-transform hover:scale-105"
            onClick={() => setCurrentPage('home')}
          >
            <h1 className="text-xl font-bold tracking-wider uppercase leading-none">Enfield</h1>
            <p className="text-[10px] tracking-widest uppercase font-medium mt-1 text-gray-300">Pressure Washing</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center -space-x-[1px] rounded-sm overflow-hidden border border-gray-300 text-sm font-semibold">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-5 py-3 transition-colors duration-150 border-r border-gray-300 ${
                  currentPage === item.id ? 'bg-white text-gray-900' : 'bg-[#6D6D6D] hover:bg-[#5E5E5E] text-white'
                } ${index === navItems.length - 1 ? 'border-r-0' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3 bg-[#FF5A24] hover:bg-[#E54B1A] text-white transition-colors duration-150 font-bold tracking-wide uppercase shadow-inner"
            >
              Instant Quote
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {currentPage === 'home' && <HomeView setCurrentPage={setCurrentPage} setIsQuoteModalOpen={setIsQuoteModalOpen} />}
        {currentPage === 'services' && <ServicesView setIsQuoteModalOpen={setIsQuoteModalOpen} />}
        {currentPage === 'contact' && <ContactView />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16 pt-16 pb-8 text-sm text-[#2C2C2C]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-100">
            <div className="flex flex-col space-y-4">
              <div className="border-2 border-gray-800 bg-white p-3 inline-block self-start">
                <span className="block text-xl font-bold tracking-wider text-gray-900 uppercase leading-none">Enfield</span>
                <span className="block text-[9px] tracking-widest text-gray-500 uppercase mt-1">Pressure Washing</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-base text-gray-900">Location</h4>
              <p className="text-gray-600">(413) 273 - 6536</p>
              <div className="space-y-2">
                <p className="text-gray-600 hover:text-[#FF5A24] transition-colors">
                  <a href="/privacy policy.html">Privacy Policy</a>
                </p>
                <p className="text-gray-600 hover:text-[#FF5A24] transition-colors">
                  <a href="/not qulaified.html">Not Qualified</a>
                </p>
              </div>
              <div className="pt-2 flex items-center space-x-1 text-[#FF5A24]">
                <MapPin size={16} />
                <span className="font-medium text-xs">Enfield, CT & Surrounding Areas</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-base text-gray-900">Inquiries</h4>
              <p className="text-gray-600 leading-relaxed">
                For any inquiries, questions or commendations, please call:
                <strong className="text-gray-900 block mt-1">(413) 273-6536</strong>
              </p>
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full bg-[#FF5A24] hover:bg-[#E54B1A] text-white py-3 px-6 font-bold uppercase transition-colors duration-150 tracking-wider text-xs rounded-sm"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-gray-500">
            <p>© 2035 by EcoZen Pressure Washing.</p>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-[#FF5A24] font-semibold transition-colors mt-4 sm:mt-0"
            >
              <span>Go Up</span>
              <ArrowUp size={14} />
            </button>
          </div>
          <div className="sr-only">
            <a href="/privacy policy.html">Privacy Policy</a>
            <a href="/not qulaified.html">Not Qualified</a>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border border-gray-800"
            title="Chat with us"
          >
            <div className="w-6 h-6 bg-[#FF5A24] rounded-sm flex items-center justify-center relative">
              <span className="block w-3.5 h-0.5 bg-black rounded-full mb-1 absolute top-1.5"></span>
              <span className="block w-2.5 h-0.5 bg-black rounded-full mb-1 absolute top-2.5"></span>
              <div className="absolute bottom-0 right-1 translate-y-1/2 rotate-45 w-1.5 h-1.5 bg-[#FF5A24]" />
            </div>
          </button>
        ) : (
          <div className="w-80 sm:w-96 h-[450px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-transform duration-200">
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
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

            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50 text-xs">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg leading-relaxed ${
                      message.sender === 'user'
                        ? 'bg-[#FF5A24] text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type a message..."
                className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF5A24]"
              />
              <button type="submit" className="bg-[#FF5A24] text-white px-3 py-2 rounded-lg font-bold hover:bg-[#E54B1A] transition-colors">
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative transition-transform duration-150">
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
              <p className="text-xs text-gray-400 mt-1">
                Get an immediate ballpark pressure washing estimate based on your dimensions.
              </p>
            </div>

            <div className="p-6">
              {!quoteSubmitted ? (
                <form onSubmit={submitQuoteRequest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Select Service</label>
                    <select
                      value={quoteService}
                      onChange={(event) => setQuoteService(event.target.value as QuoteServiceType)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-[#FF5A24]"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

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
                      onChange={(event) => setQuoteSqFt(Number(event.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5A24]"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>Small Deck / Drive (300 sq.ft)</span>
                      <span>Large Estate (5,000 sq.ft)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Mold / Algae / Dirt Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['light', 'medium', 'heavy'] as DirtLevelType[]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setQuoteDirtLevel(level)}
                          className={`py-2 px-3 text-xs font-bold rounded-lg border capitalize transition-all ${
                            quoteDirtLevel === level
                              ? 'border-[#FF5A24] bg-orange-50 text-[#FF5A24]'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 text-center">
                    <span className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">Calculated Ballpark Estimate</span>
                    <div className="text-4xl font-extrabold text-gray-900 mt-1">
                      ${estimatedCost - 30} - ${estimatedCost + 40}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Based on local CT pressure washing averages and overhead.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Phone Number for 30-Sec Text Confirmation</label>
                    <input
                      type="tel"
                      required
                      placeholder="(413) 273-6536"
                      value={quotePhone}
                      onChange={(event) => setQuotePhone(event.target.value)}
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
                    We just sent a simulation notification to our team! Expect your confirmation text at{' '}
                    <span className="font-bold text-gray-900">{quotePhone}</span> shortly.
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
