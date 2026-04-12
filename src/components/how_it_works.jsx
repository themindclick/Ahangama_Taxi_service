import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  MapPin, 
  Sparkles, 
  UserPlus, 
  CalendarCheck, 
  UserCheck, 
  Coffee 
} from 'lucide-react';

const how_it_works = () => {
  const [activeTab, setActiveTab] = useState('self-drive');
  const whatsappNumber = '94762672077';

  const steps = {
    'self-drive': [
      { number: '01', title: 'Pick Your Car', desc: 'Browse our premium fleet of sedans, SUVs, and luxury vehicles.', icon: <Search size={24} /> },
      { number: '02', title: 'Quick Booking', desc: 'Book in 60 seconds via our site or a quick WhatsApp message.', icon: <MessageSquare size={24} /> },
      { number: '03', title: 'We Deliver', desc: 'Get your car delivered to your hotel, airport, or home for free.', icon: <MapPin size={24} /> },
      { number: '04', title: 'Start Journey', desc: 'Enjoy Sri Lanka with full insurance and 24/7 road assistance.', icon: <Sparkles size={24} /> }
    ],
    'with-driver': [
      { number: '01', title: 'Select Service', desc: 'Choose a car and let us know you need a professional chauffeur.', icon: <UserPlus size={24} /> },
      { number: '02', title: 'Confirm Trip', desc: 'Share your itinerary and we’ll match you with a local expert.', icon: <CalendarCheck size={24} /> },
      { number: '03', title: 'VIP Pickup', desc: 'Your driver arrives early, helps with bags, and ensures comfort.', icon: <UserCheck size={24} /> },
      { number: '04', title: 'Relax & Explore', desc: 'Forget the traffic; just sit back and enjoy the scenic views.', icon: <Coffee size={24} /> }
    ]
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tighter">
            Your Journey in <span className="text-red-600">4 Steps</span>
          </h2>
          
          <div className="inline-flex p-1 bg-gray-100 rounded-2xl">
            {['self-drive', 'with-driver'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-8 py-2.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${
                  activeTab === tab ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab === 'self-drive' ? 'Self Drive' : 'With Driver'}
              </button>
            ))}
          </div>
        </div>

        {/* Path Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* THE LINE: Mobile (Left side) | Desktop (Center) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-gray-200 to-transparent md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {steps[activeTab].map((step, index) => (
              <div key={index} className={`relative flex items-start md:items-center justify-between group`}>
                
                {/* 1. Desktop Left Content (Empty on even steps) */}
                <div className={`hidden md:block w-[42%] ${index % 2 === 0 ? 'text-right' : 'opacity-0 pointer-events-none'}`}>
                   <StepContent step={step} align="right" />
                </div>

                {/* 2. The Number Bubble (Stationary Reference Point) */}
                <div className="relative z-20 flex-shrink-0 w-9 h-9 md:w-12 md:h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white border-4 border-red-600 rounded-full group-hover:bg-red-600 transition-colors duration-500"></div>
                  <span className="relative text-xs md:text-sm font-black text-black group-hover:text-white transition-colors duration-500">
                    {step.number}
                  </span>
                </div>

                {/* 3. Mobile Content + Desktop Right Content */}
                <div className={`w-full md:w-[42%] pl-8 md:pl-0 ${index % 2 !== 0 ? 'md:text-left' : 'md:opacity-0 md:pointer-events-none'}`}>
                   <StepContent step={step} align="left" />
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component to keep code clean
const StepContent = ({ step, align }) => (
  <div className="group">
    <div className={`inline-flex p-3 rounded-xl bg-red-50 text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-500`}>
      {step.icon}
    </div>
    <h3 className="text-xl md:text-2xl font-extrabold text-black mb-2">
      {step.title}
    </h3>
    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
      {step.desc}
    </p>
  </div>
);

export default how_it_works;