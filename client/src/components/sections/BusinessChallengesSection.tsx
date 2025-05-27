import { useRef } from "react";
import { motion } from "framer-motion";
import { businessChallenges } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const BusinessChallengesSection = () => {
  const sectionRef = useScrollAnimation();

  // Created staggered letter animation for the heading
  const letters = "Building expertise to solve your most important problems".split("");

  return (
    <section ref={sectionRef} className="py-28 bg-[#1d2330] overflow-hidden relative">
      {/* PwC-style geometric accent */}
      <motion.div 
        className="absolute top-[10%] right-[10%] w-24 h-24 bg-secondary/80" 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      ></motion.div>
      
      {/* PwC-style geometric accent */}
      <motion.div 
        className="absolute bottom-[20%] left-[5%] w-16 h-16 bg-secondary/60" 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      ></motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight overflow-hidden">
              {letters.map((letter, index) => (
                <span 
                  key={index}
                  className="inline-block animate-on-scroll"
                  style={{ 
                    transitionDelay: `${0.03 * index}s`,
                    transform: 'translateY(100%)',
                    opacity: 0,
                    animation: 'letterSlideUp 0.5s forwards'
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h2>
            
            <p className="text-xl text-white/80 mb-10 animate-on-scroll delay-300">
              In today's rapidly evolving business landscape, organizations face unprecedented challenges. Our experts help you navigate through complexity with clarity and confidence.
            </p>
            
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all group animate-on-scroll delay-400"
            >
              Learn how we can help 
              <i className="ri-arrow-right-line ml-2 transform transition-transform duration-300 group-hover:translate-x-1"></i>
            </a>
          </div>
          
          <div>
            <div className="grid grid-cols-1 gap-6">
              {businessChallenges.map((challenge, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-md p-6 border-l-2 border-secondary animate-on-scroll"
                  style={{ transitionDelay: `${0.4 + index * 0.2}s` }}
                >
                  <div className="flex items-start">
                    <div className="text-secondary text-3xl mr-5">
                      <i className={challenge.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">{challenge.title}</h3>
                      <p className="text-white/70">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessChallengesSection;
