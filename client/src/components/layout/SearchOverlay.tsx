import { useEffect, useRef } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={`search-overlay fixed w-full bg-white shadow-lg z-50 p-6 ${isOpen ? 'open' : ''}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-primary">Search our site</h3>
          <button onClick={onClose} className="text-neutral-600 hover:text-primary">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
        <div className="relative">
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="What are you looking for?" 
            className="w-full border-b-2 border-secondary py-3 px-2 text-lg focus:outline-none focus:border-primary" 
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary">
            <i className="ri-search-line text-2xl"></i>
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Popular searches</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary hover:text-primary">Annual report</a></li>
              <li><a href="#" className="text-secondary hover:text-primary">Digital transformation</a></li>
              <li><a href="#" className="text-secondary hover:text-primary">Tax services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary hover:text-primary">Audit & Assurance</a></li>
              <li><a href="#" className="text-secondary hover:text-primary">Consulting</a></li>
              <li><a href="#" className="text-secondary hover:text-primary">Financial Advisory</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Industries</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary hover:text-primary">Financial Services</a></li>
              <li><a href="#" className="text-secondary hover:text-primary">Healthcare</a></li>
              <li><a href="#" className="text-secondary hover:text-primary">Technology</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
