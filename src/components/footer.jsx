import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from 'lucide-react';

const footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              T&S <span className="text-red-600">TOURS</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium car rental services in Sri Lanka. We provide reliable, 
              safe, and comfortable vehicles for all your travel needs.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/17zbhKB1mA/?mibextid=wwXIfr" className="p-2 bg-neutral-900 rounded-full hover:bg-red-600 transition-colors">
                <Facebook size={18} />
              </a>
              {/* <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-red-600 transition-colors">
                <Instagram size={18} />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-l-4 border-red-600 pl-3">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/fleet" className="hover:text-red-500 transition-colors">Browse Fleet</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/booking" className="hover:text-red-500 transition-colors">Book Appointment</Link></li>
              <li><Link to="#" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-l-4 border-red-600 pl-3">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="text-red-600 shrink-0" size={18} />
                <span>284/10, Janasavi Rd, Jalthara, Ranala, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-red-600 shrink-0" size={18} />
                <span>+94 76 267 2077</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-red-600 shrink-0" size={18} />
                <span className="break-all">thimeshtharanga071@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-l-4 border-red-600 pl-3">Service Hours</h4>
            <div className="flex items-start space-x-3 text-gray-400 text-sm">
              <Clock className="text-red-600 shrink-0" size={18} />
              <div>
                <p>Monday - Sunday</p>
                <p className="text-white font-medium">24 Hours Delivery</p>
                <p className="mt-2 text-xs text-red-500 uppercase font-bold tracking-wider">Online Booking Open</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} T&S Tours and Rent A Car. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Developed by <span className="text-white">MindClick</span></p>
        </div>
      </div>
    </footer>
  );
};

export default footer;