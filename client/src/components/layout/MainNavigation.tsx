
import { useState, useEffect } from "react";
import { Link } from "wouter";
import MobileMenu from "./MobileMenu";
import sbsLogo from "../../assets/sbscorp-logo.png";

const MainNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header>
      <div className={`sticky top-0 z-40 w-full bg-white shadow-sm`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-[70px]">
            <Link href="/" className="flex items-center">
              <img src={sbsLogo} alt="SBSCorp Logo" className="h-10" />
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden focus:outline-none text-[#2d2d2d]"
            >
              <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
            </button>

            <nav className="hidden lg:flex items-center">
              <div className="flex space-x-8">
                <div className="group relative">
                  <button className="py-[26px] font-normal text-[#2d2d2d] hover:text-secondary border-b-2 border-transparent hover:border-secondary transition-colors">
                    Industries
                  </button>
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <ul className="space-y-2">
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Financial Services</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Energy & Resources</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Technology</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Healthcare</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Manufacturing</a></li>
                    </ul>
                  </div>
                </div>

                <div className="group relative">
                  <button className="py-[26px] font-normal text-[#2d2d2d] hover:text-secondary border-b-2 border-transparent hover:border-secondary transition-colors">
                    Services
                  </button>
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <ul className="space-y-2">
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Audit & Assurance</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Consulting</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Financial Advisory</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Risk Advisory</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Tax & Legal</a></li>
                    </ul>
                  </div>
                </div>

                <div className="group relative">
                  <button className="py-[26px] font-normal text-[#2d2d2d] hover:text-secondary border-b-2 border-transparent hover:border-secondary transition-colors">
                    Issues
                  </button>
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <ul className="space-y-2">
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Climate Change</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Digital Transformation</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">Cybersecurity</a></li>
                      <li><a href="#" className="block py-2 text-[#2d2d2d] hover:text-secondary">ESG</a></li>
                    </ul>
                  </div>
                </div>

                <a href="#" className="py-[26px] font-normal text-[#2d2d2d] hover:text-secondary border-b-2 border-transparent hover:border-secondary transition-colors">
                  About us
                </a>

                <a href="#" className="py-[26px] font-normal text-[#2d2d2d] hover:text-secondary border-b-2 border-transparent hover:border-secondary transition-colors">
                  Careers
                </a>

                <div className="ml-8 flex items-center">
                  <button className="text-[#2d2d2d] hover:text-secondary">
                    <i className="ri-search-line text-xl"></i>
                  </button>
                  <div className="ml-6">
                    <button className="flex items-center space-x-1 text-[#2d2d2d] hover:text-secondary">
                      <span>Global</span>
                      <i className="ri-arrow-down-s-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} />
    </header>
  );
};

export default MainNavigation;
