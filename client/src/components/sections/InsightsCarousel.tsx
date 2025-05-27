import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { insights } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const InsightsCarousel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Track when the section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const lineVariant = {
    hidden: { scaleX: 0, transformOrigin: "left" },
    visible: { 
      scaleX: 1, 
      transition: { 
        duration: 1.2, 
        delay: 0.3, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const checkScrollable = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollable);
      // Initial check
      checkScrollable();
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", checkScrollable);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 370; // Approximate width of a card + margin
      if (direction === "left") {
        carouselRef.current.scrollLeft -= scrollAmount;
      } else {
        carouselRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  // Get letters for animated heading
  const letters = "Latest Insights".split("");

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-32 bg-[#f9f3eb] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-secondary/5 blur-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div 
        className="absolute bottom-[15%] left-[10%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 1.8, delay: 0.3 }}
      />

      {/* PwC-style diagonal graphic */}
      <motion.div 
        className="absolute top-0 right-0 w-[30%] h-[40%] bg-secondary/10" 
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <motion.span 
              className="inline-block text-secondary font-medium mb-4 tracking-wide"
              variants={titleVariants}
              initial="hidden"
              animate={controls}
            >
              STAY INFORMED
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl font-light text-[#2d2d2d] mb-6 overflow-hidden">
              {letters.map((letter, index) => (
                <motion.span 
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.03 * index,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h2>
            
            <motion.div 
              className="h-1 w-16 bg-secondary mb-6"
              variants={lineVariant}
              initial="hidden"
              animate={controls}
            />
            
            <motion.p 
              className="text-lg text-[#2d2d2d]/70"
              variants={titleVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.4 }}
            >
              Stay ahead with our latest research, trends and expert perspectives on the most pressing business issues.
            </motion.p>
          </div>
          
          <motion.div 
            className="mt-8 md:mt-0 flex space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button 
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`group w-12 h-12 rounded-full border-2 border-[#2d2d2d] flex items-center justify-center transition-all duration-300 ${
                !canScrollLeft 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:bg-secondary hover:border-secondary"
              }`}
            >
              <i className="ri-arrow-left-s-line text-xl text-[#2d2d2d] group-hover:text-white transition-colors"></i>
            </button>
            
            <button 
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`group w-12 h-12 rounded-full border-2 border-[#2d2d2d] flex items-center justify-center transition-all duration-300 ${
                !canScrollRight 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:bg-secondary hover:border-secondary"
              }`}
            >
              <i className="ri-arrow-right-s-line text-xl text-[#2d2d2d] group-hover:text-white transition-colors"></i>
            </button>
          </motion.div>
        </div>
        
        {/* Card carousel with 3D hover effects */}
        <motion.div 
          className="relative overflow-hidden mb-16"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div 
            ref={carouselRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-8 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {insights.map((insight, index) => (
              <motion.div 
                key={index}
                className="min-w-[320px] md:min-w-[380px] group perspective bg-white overflow-hidden shadow-md"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover="hover"
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className="h-full transform transition-transform duration-500 group-hover:scale-[1.02]">
                  {/* Card image with overlay */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={insight.image} 
                      alt={insight.title} 
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white text-sm font-medium">
                      {insight.type}
                    </div>
                  </div>
                  
                  {/* Card content */}
                  <div className="p-6">
                    <div className="text-sm text-secondary mb-3">
                      {insight.date}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 text-[#2d2d2d] group-hover:text-secondary transition-colors">
                      {insight.title}
                    </h3>
                    
                    <p className="text-[#2d2d2d]/70 mb-6 line-clamp-3">
                      {insight.description}
                    </p>
                    
                    <a 
                      href="#" 
                      className="inline-flex items-center font-medium text-secondary group"
                    >
                      <span className="relative">
                        Read more
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                      </span>
                      <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* View all insights button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a 
            href="#" 
            className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-[#2d2d2d] text-[#2d2d2d] hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 group"
          >
            <span>View all insights</span>
            <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsCarousel;
