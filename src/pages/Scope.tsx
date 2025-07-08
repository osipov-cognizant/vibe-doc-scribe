import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Plus } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useToast } from "@/hooks/use-toast";

const Scope = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const url = searchParams.get("url");
  
  const [companyName, setCompanyName] = useState("");
  const [scopeDescription, setScopeDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!url) {
      navigate("/");
      return;
    }

    // Simulate LLM analysis
    setIsLoading(true);
    setTimeout(() => {
      setCompanyName(`${url.split('.')[0].toUpperCase()} Corp`);
      setScopeDescription(
        `${url} appears to be a technology company offering various software solutions and services. The company provides enterprise-level applications, cloud services, and digital transformation solutions to help businesses optimize their operations and improve customer experience.`
      );
      setIsLoading(false);
    }, 2000);
  }, [url, navigate]);

  const handleActivityClick = (activity: string) => {
    if (activity === "agentify") {
      navigate(`/support-queues?url=${encodeURIComponent(url || "")}&activity=${activity}`);
    } else {
      toast({
        title: "Coming Soon",
        description: "This feature will be available in a future update.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[
            { label: `Start (${url})`, href: "/" },
            { label: "Scope", current: true }
          ]} />
          
          <div className="mt-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-2/3 mx-auto mb-8"></div>
              <div className="h-32 bg-muted rounded mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
            </div>
            <p className="text-muted-foreground mt-4">
              Analyzing website and generating scope description...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb items={[
          { label: `Start (${url})`, href: "/" },
          { label: "Scope", current: true }
        ]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {companyName}
          </h1>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-2">
              Scope Description
            </label>
            <Textarea
              value={scopeDescription}
              onChange={(e) => setScopeDescription(e.target.value)}
              rows={4}
              className="w-full"
              placeholder="Edit the company scope description..."
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Process Excellence Activities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Agentify Customer Support - Active */}
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow border-primary/20"
                onClick={() => handleActivityClick("agentify")}
              >
                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-primary">
                      Agentify Customer Support
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast({
                          title: "Configuration",
                          description: "Configuration options will be available when implementing specific interventions.",
                        });
                      }}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Transform customer support with AI-powered agents and automation
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Transform Go To Market - Inactive */}
              <Card 
                className="cursor-pointer opacity-60 hover:opacity-80 transition-opacity"
                onClick={() => handleActivityClick("go-to-market")}
              >
                <CardHeader>
                  <CardTitle className="text-muted-foreground">
                    Transform Go To Market
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Optimize sales and marketing processes with AI insights
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Add More - Inactive */}
              <Card 
                className="cursor-pointer opacity-60 hover:opacity-80 transition-opacity border-dashed"
                onClick={() => handleActivityClick("add-more")}
              >
                <CardHeader>
                  <CardTitle className="text-muted-foreground flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Add more process excellence activities
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scope;