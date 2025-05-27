
import { useEffect, useRef } from "react";
import { industries } from "@/lib/data";
import { motion } from "framer-motion";

const IndustriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    });

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
    <section ref={sectionRef} className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4 animate-slide-up">Industries we serve</h2>
          <p className="text-lg text-neutral-600 animate-slide-up">
            Specialized expertise across a wide range of industries to help clients navigate their unique challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div 
              key={index}
              className="group relative h-64 overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5
              }}
            >
              <motion.img 
                src={industry.image} 
                alt={industry.title} 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
              
              {/* Title box at bottom border - matching your screenshot */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="bg-white/95 backdrop-blur-sm mx-4 mb-4 rounded-lg shadow-lg p-4 group-hover:bg-white transition-all duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 text-center leading-tight">
                    {industry.title}
                  </h3>
                </div>
              </div>

              {/* Hover description overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-3">{industry.title}</h3>
                  <p className="text-sm leading-relaxed text-white/90">
                    {industry.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-slide-up">
          <a href="#" className="inline-flex items-center text-secondary hover:text-primary font-medium">
            Explore all industries <i className="ri-arrow-right-line ml-1"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
