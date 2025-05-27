import { useEffect } from "react";
import MainNavigation from "@/components/layout/MainNavigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BusinessChallengesSection from "@/components/sections/BusinessChallengesSection";
import InsightsCarousel from "@/components/sections/InsightsCarousel";
import ClientSuccessSection from "@/components/sections/ClientSuccessSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import AnimatedFlipSection from "@/components/sections/AnimatedFlipSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Home = () => {
  useEffect(() => {
    // Function to handle intersection observer for animations
    const handleIntersection = () => {
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

      // Observe all elements with animate-on-scroll class
      const animatedElements = document.querySelectorAll(".animate-on-scroll, .animate-slide-up, .stagger-text-container");
      animatedElements.forEach((el) => observer.observe(el));

      return () => {
        animatedElements.forEach((el) => observer.unobserve(el));
      };
    };

    // Initialize the observer
    const cleanup = handleIntersection();

    // Add a cookie settings button to the bottom left of the page
    const cookieButton = document.createElement('button');
    cookieButton.className = 'fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-[#2d2d2d] text-white rounded-full shadow-lg hover:bg-secondary hover:scale-110 transition-all duration-300';
    cookieButton.innerHTML = '<i class="ri-file-text-line text-lg" title="Cookie Settings"></i>';
    cookieButton.onclick = () => {
      document.dispatchEvent(new CustomEvent('open-cookie-settings'));
    };
    document.body.appendChild(cookieButton);

    return () => {
      if (cleanup) cleanup();
      if (cookieButton && document.body.contains(cookieButton)) {
        document.body.removeChild(cookieButton);
      }
    };
  }, []);

  return (
    <>
      <MainNavigation />
      <main>
        <HeroSection />
        <AnimatedFlipSection />
        <ServicesSection />
        <BusinessChallengesSection />
        <InsightsCarousel />
        <ClientSuccessSection />
        <IndustriesSection />
        <TestimonialsSection />
        <CTASection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;