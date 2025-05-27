import { useEffect, useRef, useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface SubscriberData {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  acceptsPrivacyPolicy: boolean;
}

const NewsletterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState<SubscriberData>({
    firstName: '',
    lastName: '',
    email: '',
    topic: '',
    acceptsPrivacyPolicy: false
  });

  const subscribeMutation = useMutation({
    mutationFn: (data: SubscriberData) => {
      return apiRequest("POST", "/api/newsletter/subscribe", data);
    },
    onSuccess: () => {
      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our newsletter!",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        topic: '',
        acceptsPrivacyPolicy: false
      });
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error.message || "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate(formData);
  };

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
    <section ref={sectionRef} className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-primary mb-4">Stay informed with our newsletter</h2>
            <p className="text-neutral-600">
              Subscribe to receive the latest insights, industry trends, and expert perspectives.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">First name</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary" 
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">Last name</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary" 
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary" 
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="topic" className="block text-sm font-medium text-neutral-700 mb-1">Topics of interest</label>
              <select 
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary" 
                required
              >
                <option value="" disabled>Select your topics</option>
                <option value="digital">Digital Transformation</option>
                <option value="finance">Financial Advisory</option>
                <option value="strategy">Business Strategy</option>
                <option value="tech">Technology Insights</option>
              </select>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input 
                  id="acceptsPrivacyPolicy" 
                  name="acceptsPrivacyPolicy"
                  type="checkbox"
                  checked={formData.acceptsPrivacyPolicy}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 border border-neutral-300 rounded focus:ring-2 focus:ring-secondary/50" 
                  required
                />
              </div>
              <label htmlFor="acceptsPrivacyPolicy" className="ml-2 text-sm text-neutral-600">
                I agree to receive emails and accept the <a href="#" className="text-secondary hover:text-primary">Privacy Policy</a>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-secondary hover:bg-primary text-white font-medium py-3 px-4 rounded-md transition-colors"
              disabled={subscribeMutation.isPending}
            >
              {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
