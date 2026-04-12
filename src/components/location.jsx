import React from 'react';
import { MapPin } from 'lucide-react';

const Location = () => {
  const mapUrl = "https://maps.app.goo.gl/bBDKdUiHPFs1JLKi6?g_st=ic";

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-7xl mx-auto mt-16">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group block cursor-pointer"
          >
            {/* Static Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Map Pattern/Grid */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(10)].map((_, i) => (
                  <div key={`h${i}`} className="absolute w-full h-px bg-white" style={{ top: `${i * 10}%` }}></div>
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={`v${i}`} className="absolute h-full w-px bg-white" style={{ left: `${i * 10}%` }}></div>
                ))}
              </div>

              {/* Map Image Overlay */}
              <img
                src="/assets/map.png"
                alt="Map Location"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 grayscale group-hover:grayscale-0"
              />

              {/* Center Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full animate-[bounce_3s_infinite]">
                <div className="relative">
                  <MapPin className="w-16 h-16 text-red-600 fill-red-600 drop-shadow-2xl" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full blur-xl opacity-50"></div>
                </div>
              </div>

              {/* Ripple Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 border-4 border-red-500 rounded-full animate-ping opacity-30"></div>
              </div>
            </div>

            {/* Overlay on Map - City Tag */}
            <div className="absolute top-4 left-4 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="font-bold">Kaduwela, Sri Lanka</span>
            </div>

            {/* Address Info Card */}
            <div className="absolute bottom-10 left-4 right-4 md:left-8 md:w-96 bg-white/95 backdrop-blur-sm text-gray-900 p-6 rounded-xl shadow-xl z-10 transition-transform group-hover:scale-[1.02]">
              <h4 className="font-bold text-xl mb-1">T&S TOURS AND RENT A CAR</h4>
              <p className="text-gray-600 text-sm flex items-start gap-2">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                ⁠284/10, Janasavi Rd, Jalthara, Ranala
              </p>
            </div>

            {/* Hover Instruction Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none z-20">
              <div className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                Click to Open in Google Maps
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Location;