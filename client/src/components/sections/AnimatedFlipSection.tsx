import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import valuesImage from "@assets/values_1748252404665.png";
import missionImage from "@assets/42.png";
import visionImage from "@assets/46.png";

const AnimatedFlipSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Content for each slide
  const slides = [
    {
      id: 1,
      type: "vision",
      title: "Our Vision",
      content: "Our vision is to offer quality services in the fields of Application Development, Enterprise Integration, Business Consulting, and solutions for small, medium, and large businesses to meet their IT & Consulting needs all under one-roof.",
      details: "SBS Corp always focuses on offering value-added services critical to the success of our clients' businesses. We provide our customers with the competitive advantage through the adoption of our core technical & domain expertise and capabilities.",
      // image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&crop=center&q=80"
      image: visionImage

    },
    {
      id: 2,
      type: "mission",
      title: "Our Mission",
      content: "Our mission is to be a specialized Next Generation IT services provider by offering the best in class portfolio of services to our clients.",
      details: "We want to become a global one stop shop to meet all our customers' requirements – offering a combination of simple, cost and time effective benefits to the client.",
      // image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&crop=center&q=80"
      image: missionImage

    },
    {
      id: 3,
      type: "values",
      title: "Our Values",
      content: "Drive business transformation for our clients with a firm commitment towards customer sovereignty, passion for excellence, continuous innovation, transparency and integrity, and people orientation.",
      details: "To ensure continued customer satisfaction, we provide excellent automation products and appertaining services, such as our extensive technical support, high level of technical knowledge and consultancy, effective training, and an enthusiastic sales team.",
      stats: { value: "100%", unit: "", description: "commitment to excellence in everything we do" },
      image: valuesImage
    }
  ];

  // Update scroll progress and current slide with better timing
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
      
      // More precise slide transitions
      let newSlide = 0;
      if (latest <= 0.33) {
        newSlide = 0; // Vision
      } else if (latest <= 0.66) {
        newSlide = 1; // Mission  
      } else {
        newSlide = 2; // Values
      }
      
      setCurrentSlide(newSlide);
    });
  }, [scrollYProgress]);

  // Transform values for parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <div 
      ref={sectionRef} 
      className="min-h-[300vh] relative"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Background Image with enhanced overlays for text visibility */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1,
                rotateY: currentSlide === index ? 0 : 15
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ perspective: 1000 }}
            >
              <img 
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Enhanced overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
            </motion.div>
          ))}
        </div>

        {/* Content Layout - Smooth transitions between slides */}
        <div className="relative z-10 h-full">
          
          {/* Slide 1 - Vision: Full screen centered with flip effect */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-center"
            animate={{ 
              opacity: currentSlide === 0 ? 1 : 0,
              scale: currentSlide === 0 ? 1 : 0.9,
              rotateX: currentSlide === 0 ? 0 : 20,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <div className="max-w-4xl px-8">
              <motion.span 
                className="inline-block text-secondary font-bold mb-6 tracking-widest text-sm uppercase backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-secondary/30"
                animate={{ 
                  y: currentSlide === 0 ? 0 : 30, 
                  opacity: currentSlide === 0 ? 1 : 0,
                  rotateY: currentSlide === 0 ? 0 : -45,
                  scale: currentSlide === 0 ? 1 : 0.8
                }}
                transition={{ duration: 0.7, delay: currentSlide === 0 ? 0.2 : 0 }}
                style={{ 
                  textShadow: '0 0 20px rgba(255, 111, 15, 0.8), 0 0 40px rgba(255, 111, 15, 0.4)',
                  filter: 'drop-shadow(0 4px 12px rgba(255, 111, 15, 0.3))'
                }}
              >
                {slides[0].type}
              </motion.span>
              <motion.h1 
                className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight"
                animate={{ 
                  y: currentSlide === 0 ? 0 : 40, 
                  opacity: currentSlide === 0 ? 1 : 0,
                  rotateX: currentSlide === 0 ? 0 : 30,
                  scale: currentSlide === 0 ? 1 : 0.8
                }}
                transition={{ duration: 0.8, delay: currentSlide === 0 ? 0.4 : 0 }}
                style={{ 
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 8px 40px rgba(0, 0, 0, 0.4)',
                  filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.5))'
                }}
              >
                {slides[0].title}
              </motion.h1>
              <motion.p 
                className="text-2xl text-white font-light max-w-3xl mx-auto mb-8 leading-relaxed"
                animate={{ 
                  y: currentSlide === 0 ? 0 : 25, 
                  opacity: currentSlide === 0 ? 1 : 0,
                  scale: currentSlide === 0 ? 1 : 0.9
                }}
                transition={{ duration: 0.6, delay: currentSlide === 0 ? 0.6 : 0 }}
                style={{ 
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(2px)'
                }}
              >
                {slides[0].content}
              </motion.p>
              <motion.p 
                className="text-lg text-white/80 max-w-2xl mx-auto backdrop-blur-sm bg-black/20 p-6 rounded-xl border border-white/10"
                animate={{ 
                  y: currentSlide === 0 ? 0 : 30, 
                  opacity: currentSlide === 0 ? 1 : 0,
                  rotateX: currentSlide === 0 ? 0 : -15
                }}
                transition={{ duration: 0.7, delay: currentSlide === 0 ? 0.8 : 0 }}
                style={{ 
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                {slides[0].details}
              </motion.p>
            </div>
          </motion.div>

          {/* Slide 2 - Mission: Left side content with flip animations */}
          <motion.div 
            className="absolute inset-0 flex items-center"
            animate={{ 
              opacity: currentSlide === 1 ? 1 : 0,
              x: currentSlide === 1 ? 0 : -80,
              rotateY: currentSlide === 1 ? 0 : -25,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <div className="w-full lg:w-1/2 p-8 lg:p-16">
              <motion.div 
                className="max-w-lg backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-white/20"
                animate={{
                  scale: currentSlide === 1 ? 1 : 0.9,
                  rotateX: currentSlide === 1 ? 0 : 20,
                }}
                transition={{ duration: 0.7, delay: currentSlide === 1 ? 0.2 : 0 }}
                style={{ 
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 8px 25px rgba(0, 0, 0, 0.3)'
                }}
              >
                <motion.span 
                  className="inline-block text-secondary font-bold mb-6 tracking-widest text-sm uppercase backdrop-blur-sm bg-secondary/20 px-4 py-2 rounded-full border border-secondary/50"
                  animate={{ 
                    y: currentSlide === 1 ? 0 : 30,
                    opacity: currentSlide === 1 ? 1 : 0,
                    rotateX: currentSlide === 1 ? 0 : 45
                  }}
                  transition={{ duration: 0.6, delay: currentSlide === 1 ? 0.3 : 0 }}
                  style={{ 
                    textShadow: '0 0 15px rgba(255, 111, 15, 0.6)',
                    filter: 'drop-shadow(0 4px 8px rgba(255, 111, 15, 0.2))'
                  }}
                >
                  {slides[1].type}
                </motion.span>
                <motion.h2 
                  className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
                  animate={{ 
                    y: currentSlide === 1 ? 0 : 40,
                    opacity: currentSlide === 1 ? 1 : 0,
                    rotateY: currentSlide === 1 ? 0 : 20
                  }}
                  transition={{ duration: 0.7, delay: currentSlide === 1 ? 0.4 : 0 }}
                  style={{ 
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 6px 15px rgba(0, 0, 0, 0.4))'
                  }}
                >
                  {slides[1].title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-white/95 mb-8 leading-relaxed font-light"
                  animate={{ 
                    y: currentSlide === 1 ? 0 : 25,
                    opacity: currentSlide === 1 ? 1 : 0,
                    scale: currentSlide === 1 ? 1 : 0.95
                  }}
                  transition={{ duration: 0.6, delay: currentSlide === 1 ? 0.6 : 0 }}
                  style={{ 
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {slides[1].content}
                </motion.p>
                <motion.p 
                  className="text-lg text-white/80 leading-relaxed"
                  animate={{ 
                    y: currentSlide === 1 ? 0 : 30,
                    opacity: currentSlide === 1 ? 1 : 0,
                    rotateX: currentSlide === 1 ? 0 : -10
                  }}
                  transition={{ duration: 0.6, delay: currentSlide === 1 ? 0.8 : 0 }}
                  style={{ 
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {slides[1].details}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Slide 3 - Values: Split layout with advanced flip animations */}
          <motion.div 
            className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2"
            animate={{ 
              opacity: currentSlide === 2 ? 1 : 0,
              rotateY: currentSlide === 2 ? 0 : 15,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1200 }}
          >
            {/* Left side - Content with enhanced animations */}
            <motion.div 
              className="flex items-center justify-center p-8 lg:p-16 relative"
              style={{ 
                background: 'linear-gradient(135deg, rgba(245, 241, 235, 0.98) 0%, rgba(245, 241, 235, 0.95) 100%)',
                backdropFilter: 'blur(10px)'
              }}
              animate={{
                x: currentSlide === 2 ? 0 : -100,
                rotateY: currentSlide === 2 ? 0 : -20,
                scale: currentSlide === 2 ? 1 : 0.9,
              }}
              transition={{ duration: 0.9, delay: currentSlide === 2 ? 0.1 : 0 }}
            >
              <motion.div 
                className="max-w-lg"
                animate={{ 
                  y: currentSlide === 2 ? 0 : 30,
                  opacity: currentSlide === 2 ? 1 : 0,
                  rotateX: currentSlide === 2 ? 0 : 15
                }}
                transition={{ duration: 0.8, delay: currentSlide === 2 ? 0.3 : 0 }}
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1))'
                }}
              >
                <motion.span 
                  className="inline-block text-secondary font-bold mb-6 tracking-widest text-sm uppercase bg-secondary/10 px-6 py-3 rounded-full border-2 border-secondary/30"
                  animate={{ 
                    scale: currentSlide === 2 ? 1 : 0.8,
                    rotateZ: currentSlide === 2 ? 0 : -10,
                    opacity: currentSlide === 2 ? 1 : 0
                  }}
                  transition={{ duration: 0.6, delay: currentSlide === 2 ? 0.4 : 0 }}
                  style={{ 
                    textShadow: '0 0 15px rgba(255, 111, 15, 0.4)',
                    boxShadow: '0 4px 20px rgba(255, 111, 15, 0.2)'
                  }}
                >
                  {slides[2].type}
                </motion.span>
                <motion.h2 
                  className="text-5xl md:text-6xl font-black text-[#2d2d2d] mb-8 leading-tight"
                  animate={{ 
                    y: currentSlide === 2 ? 0 : 40,
                    opacity: currentSlide === 2 ? 1 : 0,
                    rotateX: currentSlide === 2 ? 0 : 25
                  }}
                  transition={{ duration: 0.8, delay: currentSlide === 2 ? 0.5 : 0 }}
                  style={{ 
                    textShadow: '0 4px 20px rgba(45, 45, 45, 0.3)',
                    filter: 'drop-shadow(0 6px 15px rgba(45, 45, 45, 0.1))'
                  }}
                >
                  {slides[2].title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-[#2d2d2d]/90 mb-8 leading-relaxed font-light"
                  animate={{ 
                    y: currentSlide === 2 ? 0 : 25,
                    opacity: currentSlide === 2 ? 1 : 0,
                    scale: currentSlide === 2 ? 1 : 0.95
                  }}
                  transition={{ duration: 0.7, delay: currentSlide === 2 ? 0.6 : 0 }}
                >
                  {slides[2].content}
                </motion.p>
                
                {/* Statistics with flip animation */}
                <motion.div 
                  className="mb-8 p-6 bg-white/60 rounded-2xl border border-secondary/20"
                  animate={{
                    rotateY: currentSlide === 2 ? 0 : 180,
                    scale: currentSlide === 2 ? 1 : 0.8,
                    opacity: currentSlide === 2 ? 1 : 0
                  }}
                  transition={{ duration: 0.8, delay: currentSlide === 2 ? 0.7 : 0 }}
                  style={{ 
                    boxShadow: '0 8px 30px rgba(255, 111, 15, 0.15)',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  <div className="flex items-baseline space-x-2 mb-3">
                    <span className="text-7xl md:text-8xl font-black text-secondary">
                      {slides[2].stats?.value}
                    </span>
                  </div>
                  <p className="text-[#2d2d2d]/80 text-lg font-medium">
                    {slides[2].stats?.description}
                  </p>
                </motion.div>
                
                <motion.p 
                  className="text-lg text-[#2d2d2d]/70 leading-relaxed"
                  animate={{ 
                    y: currentSlide === 2 ? 0 : 30,
                    opacity: currentSlide === 2 ? 1 : 0,
                    rotateX: currentSlide === 2 ? 0 : -15
                  }}
                  transition={{ duration: 0.7, delay: currentSlide === 2 ? 0.9 : 0 }}
                >
                  {slides[2].details}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Right side - Enhanced image display */}
            <motion.div 
              className="relative overflow-hidden"
              animate={{
                x: currentSlide === 2 ? 0 : 100,
                rotateY: currentSlide === 2 ? 0 : 20,
                scale: currentSlide === 2 ? 1 : 1.1,
              }}
              transition={{ duration: 0.9, delay: currentSlide === 2 ? 0.2 : 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/5 to-black/20 z-10" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: currentSlide === 2 ? 1 : 1.2,
                  opacity: currentSlide === 2 ? 1 : 0.8
                }}
                transition={{ duration: 1.2, delay: currentSlide === 2 ? 0.3 : 0 }}
              >
                <img 
                  src={valuesImage}
                  alt="Our Values"
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1) saturate(1.2)'
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-8 flex flex-col items-center space-y-2 z-20">
          <div className="w-px h-16 bg-white/30 relative overflow-hidden">
            <motion.div 
              className="w-full bg-secondary absolute bottom-0"
              style={{ 
                height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
              }}
            />
          </div>
          <span className="text-white/60 text-xs font-medium">SCROLL</span>
        </div>

        {/* Progress indicators */}
        <div className="absolute bottom-8 right-8 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className="w-8 h-1 bg-white/20 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <motion.div
                className="h-full bg-secondary rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: currentSlide === index ? 1 : 0 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedFlipSection;