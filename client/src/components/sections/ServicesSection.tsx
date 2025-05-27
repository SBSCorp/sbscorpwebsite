import { useRef } from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ServicesSection = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef} className="min-h-screen relative bg-[#f9f3eb] overflow-hidden">
      {/* PwC-style diagonal graphic element */}
      <motion.div 
        className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-secondary/80" 
        style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>
      
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mb-24">
          <h1 className="text-5xl md:text-6xl font-light text-[#2d2d2d] mb-10 leading-tight animate-on-scroll">
            That's where we come in.
          </h1>
          
          <p className="text-xl text-[#2d2d2d]/80 animate-on-scroll delay-100">
            We help businesses transform, grow and succeed in an ever-changing landscape by providing 
            expert advice and innovative solutions tailored to your unique challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Factory of the Future",
              description: "Transforming manufacturing through cutting-edge technology, intelligent processes, and innovative solutions that drive efficiency and competitive advantage.",
              icon: "ri-building-4-line"
            },
            {
              title: "Manufacturing Operations Management",
              description: "Optimize production processes, improve efficiency, and ensure quality through advanced manufacturing execution systems and real-time monitoring.",
              icon: "ri-settings-2-line"
            },
            {
              title: "Product Lifecycle Management",
              description: "Streamline product development from concept to retirement with integrated PLM solutions that enhance collaboration and reduce time-to-market.",
              icon: "ri-refresh-line"
            },
            {
              title: "Digital Manufacturing",
              description: "Leverage IoT, AI, and automation to create smart factories that adapt, learn, and optimize production in real-time.",
              icon: "ri-robot-line"
            },
            {
              title: "SAP Implementation Integration Services",
              description: "Seamlessly integrate SAP solutions to unify business processes, enhance data visibility, and drive operational excellence.",
              icon: "ri-database-2-line"
            },
            {
              title: "Cloud Enablement Migration",
              description: "Migrate manufacturing systems to the cloud for enhanced scalability, security, and accessibility while reducing infrastructure costs.",
              icon: "ri-cloud-line"
            },
            {
              title: "Analytics",
              description: "Transform manufacturing data into actionable insights through advanced analytics, predictive modeling, and business intelligence.",
              icon: "ri-bar-chart-line"
            },
            {
              title: "Intelligent Finance",
              description: "Implement smart financial systems that automate processes, improve accuracy, and provide real-time financial visibility across operations.",
              icon: "ri-money-dollar-circle-line"
            },
            {
              title: "IOT Big Data",
              description: "Harness the power of connected devices and big data analytics to optimize manufacturing processes and enable predictive maintenance.",
              icon: "ri-database-line"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll group"
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div 
                className="text-secondary mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className={`${service.icon} text-5xl`}></i>
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-[#2d2d2d] group-hover:text-secondary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[#2d2d2d]/80 mb-6 leading-relaxed">
                {service.description}
              </p>
              <motion.a 
                href="#" 
                className="inline-flex items-center text-secondary hover:text-[#2d2d2d] transition-all group font-semibold"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Explore Solution 
                <i className="ri-arrow-right-line ml-2 transform transition-transform duration-300 group-hover:translate-x-2"></i>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
