import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div className="px-4 py-3 space-y-3 bg-neutral-50">
        <div className="border-b border-neutral-200 pb-3">
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="flex items-center justify-between w-full text-neutral-700 font-medium"
          >
            Services <i className={`ri-arrow-${servicesOpen ? 'up' : 'down'}-s-line`}></i>
          </button>
          <div className={`${servicesOpen ? 'block' : 'hidden'} pt-3 pl-4 space-y-2`}>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Audit & Assurance</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Consulting</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Financial Advisory</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Risk Advisory</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Tax & Legal</a>
          </div>
        </div>
        
        <div className="border-b border-neutral-200 pb-3">
          <button
            onClick={() => setIndustriesOpen(!industriesOpen)}
            className="flex items-center justify-between w-full text-neutral-700 font-medium"
          >
            Industries <i className={`ri-arrow-${industriesOpen ? 'up' : 'down'}-s-line`}></i>
          </button>
          <div className={`${industriesOpen ? 'block' : 'hidden'} pt-3 pl-4 space-y-2`}>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Financial Services</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Energy & Resources</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Technology</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Healthcare</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Manufacturing</a>
          </div>
        </div>
        
        <div className="border-b border-neutral-200 pb-3">
          <button
            onClick={() => setInsightsOpen(!insightsOpen)}
            className="flex items-center justify-between w-full text-neutral-700 font-medium"
          >
            Insights <i className={`ri-arrow-${insightsOpen ? 'up' : 'down'}-s-line`}></i>
          </button>
          <div className={`${insightsOpen ? 'block' : 'hidden'} pt-3 pl-4 space-y-2`}>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Reports</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Articles</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Blogs</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Podcasts</a>
            <a href="#" className="block py-2 text-neutral-600 hover:text-primary">Case Studies</a>
          </div>
        </div>
        
        <a href="#" className="block py-2 text-neutral-700 font-medium">Careers</a>
        <a href="#" className="block py-2 text-neutral-700 font-medium">Contact</a>
        
        <div className="pt-4">
          <button className="w-full bg-secondary hover:bg-primary text-white py-3 rounded-md transition-colors">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
