import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sbsLogo from '../assets/sbscorp-logo.png';

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookieSettings = ({ isOpen: propIsOpen, onClose }: CookieSettingsProps) => {
  const [isOpen, setIsOpen] = useState(propIsOpen);
  const [analyticalCookies, setAnalyticalCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [activeSetting, setActiveSetting] = useState<string | null>(null);
  
  // Update local state when prop changes
  useEffect(() => {
    setIsOpen(propIsOpen);
  }, [propIsOpen]);
  
  // Listen for custom event to open cookie settings
  useEffect(() => {
    const handleOpenCookieSettings = () => {
      setIsOpen(true);
    };
    
    document.addEventListener('open-cookie-settings', handleOpenCookieSettings);
    return () => {
      document.removeEventListener('open-cookie-settings', handleOpenCookieSettings);
    };
  }, []);
  
  // Close on escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen]);
  
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleClose = () => {
    setIsOpen(false);
    // Call parent onClose after animation completes
    setTimeout(() => onClose(), 300);
  };
  
  const acceptAll = () => {
    setAnalyticalCookies(true);
    setMarketingCookies(true);
    handleClose();
  };
  
  const rejectAll = () => {
    setAnalyticalCookies(false);
    setMarketingCookies(false);
    handleClose();
  };
  
  const saveChoices = () => {
    // In a real implementation, we would save these preferences
    handleClose();
  };
  
  // Animation for section focus
  const highlightSection = (section: string) => {
    setActiveSetting(section);
    setTimeout(() => setActiveSetting(null), 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
        
          {/* Cookie settings drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 overflow-y-auto shadow-2xl"
          >
            <div className="p-6 sm:p-8">
              <motion.div 
                className="mb-6 flex justify-between items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="flex items-center">
                  <motion.img 
                    src={sbsLogo}
                    alt="SBSCorp Logo"
                    className="h-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  />
                </div>
                <motion.button 
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#2d2d2d] hover:text-secondary hover:bg-gray-100 transition-all"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="ri-close-line text-2xl"></i>
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-2">Cookies:</h2>
                <h3 className="text-3xl font-bold mb-4">The choice is yours</h3>
                
                <p className="text-[#2d2d2d] mb-4">
                  We use cookies to make our site work well for you and so we can 
                  continually improve it. The cookies that are necessary to keep the
                  site functioning are always on. We use analytics and marketing
                  cookies to help us understand what content is of most interest and
                  to personalise your user experience.
                </p>
                
                <p className="text-[#2d2d2d] mb-6">
                  It's your choice to accept these or not. You can either click the 'I
                  accept all cookies' or 'Reject all non-essential cookies' button
                  below or use the switches to choose and save your choices.
                </p>
                
                <p className="text-[#2d2d2d] mb-8">
                  For detailed information on how we use cookies and other tracking
                  technologies, please visit our <a href="#" className="text-secondary underline hover:text-secondary/80">cookies information page</a>.
                </p>
                
                <motion.button 
                  onClick={acceptAll}
                  className="w-full py-3 mb-4 bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  I accept all cookies
                </motion.button>
              </motion.div>
              
              <motion.div 
                key="necessary-section"
                className={`border-t border-neutral-200 pt-6 mb-6 ${activeSetting === 'necessary' ? 'bg-secondary/5 -mx-8 px-8' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: 0.4,
                      duration: 0.5
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                style={{
                  backgroundColor: activeSetting === 'necessary' ? 'rgba(220, 107, 31, 0.05)' : 'rgba(220, 107, 31, 0)'
                }}
              >
                <h4 className="font-bold mb-3">Necessary Cookies</h4>
                <p className="text-[#2d2d2d] mb-4">
                  These cookies are necessary for the website to operate. Our website
                  cannot function without these cookies and they can only be disabled
                  by changing your browser preferences.
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#2d2d2d] font-medium">Always Active</span>
                  <div className="w-12 h-6 bg-secondary rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.div 
                key="analytical-section"
                className={`border-t border-neutral-200 pt-6 mb-6 ${activeSetting === 'analytical' ? 'bg-secondary/5 -mx-8 px-8' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: 0.5,
                      duration: 0.5
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                style={{
                  backgroundColor: activeSetting === 'analytical' ? 'rgba(220, 107, 31, 0.05)' : 'rgba(220, 107, 31, 0)'
                }}
                onClick={() => highlightSection('analytical')}
              >
                <h4 className="font-bold mb-3">Analytical/Performance Cookies</h4>
                <p className="text-[#2d2d2d] mb-4">
                  These cookies allow us to measure and report on website activity by
                  tracking page visits, visitor locations and how visitors move around
                  the site.
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#2d2d2d] font-medium">Allow Analytical Cookies</span>
                  <motion.button 
                    onClick={() => setAnalyticalCookies(!analyticalCookies)} 
                    className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${analyticalCookies ? 'bg-secondary justify-end' : 'bg-gray-300 justify-start'}`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-white"
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    ></motion.div>
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div 
                key="marketing-section"
                className={`border-t border-neutral-200 pt-6 mb-8 ${activeSetting === 'marketing' ? 'bg-secondary/5 -mx-8 px-8' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: 0.6,
                      duration: 0.5
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                style={{
                  backgroundColor: activeSetting === 'marketing' ? 'rgba(220, 107, 31, 0.05)' : 'rgba(220, 107, 31, 0)'
                }}
                onClick={() => highlightSection('marketing')}
              >
                <h4 className="font-bold mb-3">Marketing Cookies</h4>
                <p className="text-[#2d2d2d] mb-4">
                  These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#2d2d2d] font-medium">Allow Marketing Cookies</span>
                  <motion.button 
                    onClick={() => setMarketingCookies(!marketingCookies)} 
                    className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${marketingCookies ? 'bg-secondary justify-end' : 'bg-gray-300 justify-start'}`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-white"
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    ></motion.div>
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <motion.button 
                  onClick={rejectAll}
                  className="w-full py-3 border border-[#2d2d2d] text-[#2d2d2d] font-medium hover:bg-neutral-100 transition-colors"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(220, 107, 31, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reject all non-essential cookies
                </motion.button>
                
                <motion.button 
                  onClick={saveChoices}
                  className="w-full py-3 border border-[#2d2d2d] text-[#2d2d2d] font-medium hover:bg-neutral-100 transition-colors"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(220, 107, 31, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save my cookie choices and close
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieSettings;