import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useState, useEffect } from "react";
import CookieSettings from "./components/CookieSettings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  
  useEffect(() => {
    // Set the title
    document.title = "sbscorp | Building trust and delivering sustained outcomes";
    
    // Add a class to the body for scroll animations
    document.body.classList.add('has-scroll-animations');
    
    // Show cookie settings on first visit
    const hasSeenCookieSettings = localStorage.getItem('hasSeenCookieSettings');
    if (!hasSeenCookieSettings) {
      setCookieSettingsOpen(true);
      localStorage.setItem('hasSeenCookieSettings', 'true');
    }
    
    return () => {
      document.body.classList.remove('has-scroll-animations');
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CookieSettings 
          isOpen={cookieSettingsOpen} 
          onClose={() => setCookieSettingsOpen(false)} 
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
