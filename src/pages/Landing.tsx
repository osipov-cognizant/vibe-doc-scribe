import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Landing = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateUrl = (input: string): boolean => {
    try {
      const urlObj = new URL(input.startsWith('http') ? input : `https://${input}`);
      
      // Check if it's just a domain (no path beyond "/")
      if (urlObj.pathname !== "/" || urlObj.search || urlObj.hash) {
        return false;
      }
      
      // Check if it has a valid domain structure
      if (!urlObj.hostname.includes(".")) {
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a company website URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter only the domain name (e.g., company.com or www.company.com)",
        variant: "destructive",
      });
      return;
    }

    // Clean the URL to ensure consistent format
    const cleanUrl = url.startsWith('http') ? new URL(url).hostname : url;
    
    // Navigate to scope page with URL parameter
    navigate(`/scope?url=${encodeURIComponent(cleanUrl)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      {/* APEX Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-9xl font-bold text-muted-foreground/10 select-none animate-apex-pulse">
          APEX
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in-down">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent animate-text-shimmer">
              Process Excellence Analysis
            </h2>
            <p className="text-muted-foreground">
              Enter a company website to begin analysis
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="company.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
              autoFocus
            />
            <Button type="submit" size="lg" className="transition-all duration-200 hover:scale-105 active:scale-95 relative overflow-hidden">
              Let's Go
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Enter only the domain name (e.g., google.com, www.corp.ibm.com)
          </div>
        </form>
      </div>
    </div>
  );
};

export default Landing;