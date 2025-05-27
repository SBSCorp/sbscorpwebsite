import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white relative overflow-hidden pwc-diagonal-shape-left">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#2d2d2d] mb-6">
              What our clients say
            </h2>
            <div className="w-20 h-1 bg-secondary"></div>
          </motion.div>
          
          <div className="relative">
            <div className="grid grid-cols-1 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === activeIndex ? 1 : 0,
                    x: index === activeIndex ? 0 : index < activeIndex ? -30 : 30
                  }}
                  transition={{ duration: 0.6 }}
                  className={`${index === activeIndex ? 'block' : 'hidden'} bg-[#f9f3eb] p-10 md:p-16`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-10">
                    <div className="md:w-1/3">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-secondary/10"></div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <blockquote className="text-xl md:text-2xl text-[#2d2d2d] leading-relaxed mb-8 font-light">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <p className="text-lg font-medium text-[#2d2d2d]">{testimonial.name}</p>
                        <p className="text-secondary">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-10 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-secondary w-8' : 'bg-[#d1d1d1]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
