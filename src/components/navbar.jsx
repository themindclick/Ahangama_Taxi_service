import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home',     path: '/'         },
  { name: 'Services', path: '/services' },
  { name: 'Our Fleet',path: '/fleet'    },
  { name: 'About Us', path: '/about'    },
  { name: 'Contact',  path: '/contact'  },
];

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top info strip (desktop only) */}
      <div className="hidden md:block w-full bg-[#005acd] text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="opacity-80 tracking-wide">
            📍 Welhengoda Road, Ahangama, Sri Lanka
          </span>
          <a
            href="tel:0719916072"
            className="flex items-center gap-1.5 font-semibold hover:text-[#EAB875] transition-colors"
          >
            <Phone size={12} />
            +94 71 991 6072
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-[#C3E7F1]/60
          ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md shadow-[#005acd]/10' : 'bg-white'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div
                className={`rounded-full overflow-hidden border-2 border-[#EAB875] shadow-sm
                  transition-all duration-300 group-hover:scale-105 group-hover:border-[#005acd]
                  ${scrolled ? 'w-9 h-9' : 'w-11 h-11'}
                `}
              >
                <img
                  src="https://www.shutterstock.com/image-vector/galle-sea-fort-lighthouse-sri-260nw-1663129834.jpg"
                  alt="Taxi Service Ahangama"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-[#005acd] text-base sm:text-lg tracking-tight">
                  TAXI SERVICE
                </span>
                <span
                  className="font-semibold text-xs sm:text-sm text-[#EAB875] uppercase"
                  style={{ letterSpacing: '0.18em' }}
                >
                  Ahangama
                </span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1
                    after:h-0.5 after:rounded-full after:transition-all after:duration-200
                    ${isActive(link.path)
                      ? 'text-[#005acd] after:bg-[#EAB875] after:opacity-100'
                      : 'text-gray-700 hover:text-[#005acd] after:opacity-0 hover:after:opacity-100 hover:after:bg-[#C3E7F1]'
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                className="ml-3 bg-[#005acd] text-white px-5 py-2.5 rounded-full text-sm font-bold
                  hover:bg-[#EAB875] hover:text-[#005acd] transition-all duration-300
                  shadow-lg shadow-[#005acd]/25 hover:shadow-[#EAB875]/40 active:scale-95"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-[#005acd] hover:bg-[#C3E7F1]/40 transition-colors"
            >
              {isOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="bg-white border-t border-[#C3E7F1]/60 px-4 pb-5 pt-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all
                  ${isActive(link.path)
                    ? 'bg-[#005acd]/10 text-[#005acd] font-semibold border-l-4 border-[#EAB875]'
                    : 'text-gray-700 hover:bg-[#C3E7F1]/30 hover:text-[#005acd]'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <Link
                to="/booking"
                className="block w-full text-center bg-[#005acd] text-white px-4 py-3.5 rounded-xl
                  font-bold text-sm hover:bg-[#EAB875] hover:text-[#005acd] transition-all duration-300 shadow-md"
              >
                Book Now
              </Link>
              <a
                href="tel:0719916072"
                className="flex items-center justify-center gap-2 w-full border-2 border-[#C3E7F1]
                  text-[#005acd] px-4 py-3 rounded-xl font-semibold text-sm hover:border-[#005acd] transition-colors"
              >
                <Phone size={15} />
                +94 71 991 6072
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;