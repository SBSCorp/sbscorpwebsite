import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const sectionRef = useScrollAnimation();
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const words = ["optimize", "transform", "excel"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentWord = words[currentWordIndex];
      if (displayedText.length < currentWord.length) {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
      } else {
        setTimeout(() => {
          setDisplayedText("");
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [displayedText, currentWordIndex, words]);

  return (
    <section ref={sectionRef} className="relative bg-[#1d2330] overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')] bg-cover bg-center opacity-10"></div>
      
      {/* Enhanced diagonal graphic element */}
      <motion.div 
        className="absolute bottom-0 right-0 w-[60%] h-[65%] bg-secondary/90" 
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>
      
      <div className="container mx-auto px-6 py-24 md:py-40 relative z-10">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-light text-white/90 mb-6 animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            We turn your <span className="text-secondary font-semibold">IT challenges</span> into opportunities
          </motion.h2>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight animate-on-scroll delay-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            so you can
          </motion.h1>
          
          <motion.div
            className="text-4xl md:text-6xl font-bold mb-10 animate-on-scroll delay-200 min-h-[80px] flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-secondary">
              {displayedText}
              <motion.span
                className="inline-block w-1 h-[60px] bg-secondary ml-2"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              />
            </span>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl font-light text-white/80 mb-12 max-w-3xl leading-relaxed animate-on-scroll delay-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            With decades of expertise, SBS Corp delivers tailored solutions and hands-on support to drive efficiency, innovation, and sustainable growth for your business.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-12 animate-on-scroll delay-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="mailto:bizdev@mysbscorp.com" className="bg-transparent border border-white text-white font-normal px-8 py-3 transition-colors hover:bg-white hover:text-[#1d2330]">
              Let’s solve your challenges
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full py-4 z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-white/60 text-center"
        >
          <motion.i 
            className="ri-arrow-down-line text-2xl"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
