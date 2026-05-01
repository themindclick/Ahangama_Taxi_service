import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Clock, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white pt-16 pb-8 border-t-2 border-[#EAB875]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              TAXI SERVICE <span className="text-[#EAB875]">AHANGAMA</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional, ethical, and reliable transport solutions managed by Uresh Ruchika. 
              Providing secure travel experiences for the international community in Sri Lanka for over 10 years.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/17zbhKB1mA/?mibextid=wwXIfr" 
                 className="p-2 bg-neutral-900 rounded-full hover:bg-[#005acd] transition-colors border border-neutral-800">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-l-4 border-[#EAB875] pl-3">Navigation</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/fleet" className="hover:text-[#EAB875] transition-colors">Our Premium Fleet</Link></li>
              <li><Link to="/about" className="hover:text-[#EAB875] transition-colors">About Uresh Ruchika</Link></li>
              <li><Link to="/packages" className="hover:text-[#EAB875] transition-colors">Safari & Tours</Link></li>
              <li><Link to="/services" className="hover:text-[#EAB875] transition-colors">Core Services</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-l-4 border-[#EAB875] pl-3">Get In Touch</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="text-[#EAB875] shrink-0" size={18} />
                <span>Welhengoda Road, Ahangama, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-[#EAB875] shrink-0" size={18} />
                <span>+94 71 991 6072</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-[#EAB875] shrink-0" size={18} />
                <span className="break-all text-xs">taxiserviceahangama@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Service Standards */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-l-4 border-[#EAB875] pl-3">Excellence</h4>
            <div className="flex items-start space-x-3 text-gray-400 text-sm">
              <Clock className="text-[#EAB875] shrink-0" size={18} />
              <div>
                <p>Available 24 / 7</p>
                <p className="text-white font-medium">Global Traveler Verified</p>
                <div className="mt-4 flex flex-col gap-2">
                    <span className="text-[10px] bg-[#005acd]/20 text-[#005acd] border border-[#005acd] px-2 py-1 rounded-md uppercase font-bold tracking-tighter">
                        SLTDA Registered
                    </span>
                    <span className="text-[10px] bg-[#EAB875]/10 text-[#EAB875] border border-[#EAB875] px-2 py-1 rounded-md uppercase font-bold tracking-tighter">
                        Zero Alcohol Policy
                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} Taxi Service Ahangama. Professional • Ethical • Reliable.</p>
          <p className="mt-2 md:mt-0 uppercase tracking-widest">
            Developed by <span className="text-[#e6d624] font-bold">MindClick</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;