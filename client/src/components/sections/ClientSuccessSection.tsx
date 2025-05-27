import { useEffect, useRef } from "react";

const ClientSuccessSection = () => {
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4 animate-slide-up">Client success stories</h2>
          <p className="text-lg text-neutral-600 animate-slide-up">
            See how we've helped organizations like yours overcome challenges and achieve their goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-slide-up">
            <div className="max-w-xl">
              <span className="inline-block bg-secondary/10 text-secondary font-medium px-3 py-1 rounded-md mb-4">Financial Services</span>
              <h3 className="text-2xl font-semibold mb-4">Global bank transforms digital customer experience</h3>
              <p className="text-neutral-600 mb-6">
                A leading global bank wanted to revolutionize its digital banking platform to improve customer experience and operational efficiency. Our team of experts helped develop and implement a comprehensive digital transformation strategy.
              </p>
              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <div className="text-accent mt-1 mr-3">
                    <i className="ri-check-line text-xl"></i>
                  </div>
                  <p className="text-neutral-600">30% increase in customer satisfaction scores within 6 months</p>
                </div>
                <div className="flex items-start mb-4">
                  <div className="text-accent mt-1 mr-3">
                    <i className="ri-check-line text-xl"></i>
                  </div>
                  <p className="text-neutral-600">25% reduction in operational costs through automation</p>
                </div>
                <div className="flex items-start">
                  <div className="text-accent mt-1 mr-3">
                    <i className="ri-check-line text-xl"></i>
                  </div>
                  <p className="text-neutral-600">15% growth in digital banking users year-over-year</p>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-secondary hover:text-primary font-medium">
                Read full case study <i className="ri-arrow-right-line ml-1"></i>
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animate-slide-up">
            <img 
              src="https://adria-bt.com/wp-content/uploads/2024/04/BK.jpg" 
              alt="Business professionals in a modern office" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSuccessSection;
