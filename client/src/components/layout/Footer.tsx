import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import sbsLogo from "@/assets/sbscorp-logo-footer.png";

const Footer = () => {
  const sectionRef = useScrollAnimation();
  const [isVisible, setIsVisible] = useState(false);

  // Track when footer is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const footerElement = sectionRef.current;
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  // Variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <footer
      ref={sectionRef}
      className="bg-gradient-to-b from-[#1d2330] to-[#151a24] text-white pt-16 pb-8 relative overflow-hidden"
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-secondary"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-[10%] right-[5%] w-32 h-32 bg-secondary/10 rounded-full blur-3xl"
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <motion.div
        className="absolute bottom-[30%] left-[10%] w-24 h-24 bg-secondary/20 rounded-full blur-2xl"
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Logo and tagline */}
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center mb-4">
            <motion.img
              src={sbsLogo}
              alt="SBSCorp Logo"
              className="h-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                isVisible
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            />
          </div>
          <p className="text-white/80 text-center max-w-xl">
            Building trust and delivering sustained outcomes in a changing world
          </p>
        </motion.div>

        {/* Main footer sections */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          {/* Careers Section */}
          <motion.div variants={item} className="group">
            <h2 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors duration-300">
              Careers
            </h2>
            <p className="text-gray-300 mb-6">
              SBSCorp is all about you. Whether you're just starting out or are
              an experienced professional, your future starts here.
            </p>
            <a
              href="#"
              className="relative inline-block px-6 py-2 overflow-hidden group-hover:text-white transition-colors duration-300"
            >
              <span className="absolute inset-0 border border-secondary group-hover:border-opacity-0 transition-all duration-300"></span>
              <span className="absolute inset-0 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
              <span className="relative z-10">Explore SBSCorp Careers</span>
            </a>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={item} className="group">
            <h2 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors duration-300">
              Quick Links
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#services" className="hover:text-secondary transition-colors duration-300 flex items-center">
                  <i className="ri-arrow-right-s-line mr-2"></i>
                  Our Services
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-secondary transition-colors duration-300 flex items-center">
                  <i className="ri-arrow-right-s-line mr-2"></i>
                  Industries We Serve
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-secondary transition-colors duration-300 flex items-center">
                  <i className="ri-arrow-right-s-line mr-2"></i>
                  Latest Insights
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-secondary transition-colors duration-300 flex items-center">
                  <i className="ri-arrow-right-s-line mr-2"></i>
                  Client Testimonials
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company Section */}
          <motion.div variants={item} className="group">
            <h2 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors duration-300">
              Company
            </h2>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li>
                <a href="#vision" className="hover:text-secondary transition-colors duration-300 flex items-center">
                  <i className="ri-arrow-right-s-line mr-2"></i>
                  Our Vision
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-secondary transition-colors duration-300 flex items-center">
                  <i className="ri-arrow-right-s-line mr-2"></i>
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#values" className="hover:text-secondary transition-colors duration-300 flex items-center">
                  <i className="ri-arrow-right-s-line mr-2"></i>
                  Our Values
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary transition-colors duration-300 flex items-center">
                  <i className="ri-arrow-right-s-line mr-2"></i>
                  Contact Us
                </a>
              </li>
            </ul>
            
            {/* Headquarters Section */}
            <div className="border-t border-gray-600 pt-6">
              <h3 className="text-lg font-semibold mb-3 text-secondary">
                <i className="ri-building-line mr-2"></i>
                USA Headquarters
              </h3>
              <div className="text-gray-300 text-sm leading-relaxed">
                <p className="mb-1">5757 Flewellen Oaks Lane</p>
                <p className="mb-1">Suite 704</p>
                <p className="mb-1">Fulshear, TX 77441</p>
                <p>United States</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Links with hover effects */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-xl mb-6 relative inline-block">
            <span>Follow us</span>
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-secondary"
              initial={{ width: 0 }}
              animate={isVisible ? { width: "100%" } : { width: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </h3>
          <div className="flex justify-center space-x-6">
            {[
              "ri-twitter-x-fill",
              "ri-facebook-fill",
              "ri-linkedin-fill",
              "ri-youtube-fill",
            ].map((icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <i className={`${icon} text-2xl`}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Links with animated underline */}
        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-4 md:mb-0">
              {[
                "Office locations",
                "Site map",
                "Contact us",
                "Privacy policy",
                "Terms of use",
              ].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm text-gray-300 hover:text-white relative group"
                >
                  {link}
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-secondary group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-300">
              © 2023 - 2024 SBSCorp. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
