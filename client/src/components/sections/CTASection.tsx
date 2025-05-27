import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const animatedElements = sectionRef.current?.querySelectorAll(".animate-slide-up");
    if (animatedElements) {
      animatedElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#1d2330] relative overflow-hidden">
      {/* PwC-style orange geometric shape */}
      <motion.div 
        className="absolute bottom-0 right-0 w-[70%] h-[60%]" 
        style={{ 
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          background: 'linear-gradient(135deg, hsla(12, 83%, 55%, 0.7) 0%, hsla(12, 83%, 55%, 0.9) 100%)'
        }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
              Ready to make <br className="hidden md:block" />
              an impact?
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl">
              Connect with our team of experts to discuss how we can help you address your business challenges and achieve meaningful results.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <a 
                href="#" 
                className="px-8 py-3 bg-secondary text-white hover:bg-white hover:text-[#1d2330] transition-colors"
              >
                Contact us
              </a>
              
              <a 
                href="#" 
                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-[#1d2330] transition-colors"
              >
                Explore careers
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
