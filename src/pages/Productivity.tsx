import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";

interface ProductivityData {
  aiInitiative: string;
  supportQueue: string;
  category: "Copilot Agent" | "Autonomous Agent" | "Robotic Process Automation";
  impactPercentage: number;
  productivityGain: number;
  finalProductivity: number;
}

const Productivity = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get("url");
  const activity = searchParams.get("activity");
  
  const [isLoading, setIsLoading] = useState(true);
  const [productivityData, setProductivityData] = useState<ProductivityData[]>([]);

  useEffect(() => {
    if (!url || !activity) {
      navigate("/");
      return;
    }

    // Simulate backend calculation with softmax and productivity gains
    setIsLoading(true);
    setTimeout(() => {
      // Sample impact data from previous step
      const impactData = [
        { aiInitiative: "AI Chatbot", supportQueue: "Technical Support", impactPercentage: 45, category: "Copilot Agent" as const },
        { aiInitiative: "AI Chatbot", supportQueue: "Billing Inquiries", impactPercentage: 60, category: "Copilot Agent" as const },
        { aiInitiative: "AI Chatbot", supportQueue: "General Support", impactPercentage: 70, category: "Copilot Agent" as const },
        { aiInitiative: "AI Chatbot", supportQueue: "Enterprise Support", impactPercentage: 25, category: "Copilot Agent" as const },
        { aiInitiative: "Smart Ticket Routing", supportQueue: "Technical Support", impactPercentage: 80, category: "Autonomous Agent" as const },
        { aiInitiative: "Smart Ticket Routing", supportQueue: "Billing Inquiries", impactPercentage: 90, category: "Autonomous Agent" as const },
        { aiInitiative: "Smart Ticket Routing", supportQueue: "General Support", impactPercentage: 75, category: "Autonomous Agent" as const },
        { aiInitiative: "Smart Ticket Routing", supportQueue: "Enterprise Support", impactPercentage: 95, category: "Autonomous Agent" as const },
        { aiInitiative: "Automated Responses", supportQueue: "Technical Support", impactPercentage: 35, category: "Robotic Process Automation" as const },
        { aiInitiative: "Automated Responses", supportQueue: "Billing Inquiries", impactPercentage: 55, category: "Robotic Process Automation" as const },
        { aiInitiative: "Automated Responses", supportQueue: "General Support", impactPercentage: 50, category: "Robotic Process Automation" as const },
        { aiInitiative: "Automated Responses", supportQueue: "Enterprise Support", impactPercentage: 20, category: "Robotic Process Automation" as const },
        { aiInitiative: "Sentiment Analysis", supportQueue: "Technical Support", impactPercentage: 65, category: "Autonomous Agent" as const },
        { aiInitiative: "Sentiment Analysis", supportQueue: "Billing Inquiries", impactPercentage: 70, category: "Autonomous Agent" as const },
        { aiInitiative: "Sentiment Analysis", supportQueue: "General Support", impactPercentage: 40, category: "Autonomous Agent" as const },
        { aiInitiative: "Sentiment Analysis", supportQueue: "Enterprise Support", impactPercentage: 85, category: "Autonomous Agent" as const },
      ];

      // Group by AI initiative for softmax calculation
      const initiativeGroups = impactData.reduce((acc, item) => {
        if (!acc[item.aiInitiative]) {
          acc[item.aiInitiative] = [];
        }
        acc[item.aiInitiative].push(item);
        return acc;
      }, {} as Record<string, typeof impactData>);

      // Calculate softmax and apply productivity gains
      const productivityResults: ProductivityData[] = [];

      Object.entries(initiativeGroups).forEach(([initiative, items]) => {
        // Calculate softmax for this initiative
        const total = items.reduce((sum, item) => sum + item.impactPercentage, 0);
        
        items.forEach(item => {
          const softmaxFactor = total > 0 ? (item.impactPercentage / total) * 100 : 0;
          
          // Apply productivity gain based on category
          const productivityGain = item.category === "Copilot Agent" ? 10 :
                                 item.category === "Autonomous Agent" ? 40 :
                                 20; // RPA
          
          const finalProductivity = (softmaxFactor * productivityGain) / 100;
          
          productivityResults.push({
            aiInitiative: item.aiInitiative,
            supportQueue: item.supportQueue,
            category: item.category,
            impactPercentage: item.impactPercentage,
            productivityGain,
            finalProductivity
          });
        });
      });

      setProductivityData(productivityResults);
      setIsLoading(false);
    }, 2000);
  }, [url, activity, navigate]);

  const getCategoryColor = (category: ProductivityData["category"]) => {
    switch (category) {
      case "Copilot Agent": return "bg-blue-500";
      case "Autonomous Agent": return "bg-green-500";
      case "Robotic Process Automation": return "bg-red-400";
      default: return "bg-gray-500";
    }
  };

  const handleStartNew = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[
            { label: `Start (${url})`, href: "/" },
            { label: "Scope (Agentify Customer Support)", href: `/scope?url=${encodeURIComponent(url || "")}` },
            { label: "Support Queues", href: `/support-queues?url=${encodeURIComponent(url || "")}&activity=${activity}` },
            { label: "Impact Rationale", href: `/impact-rationale?url=${encodeURIComponent(url || "")}&activity=${activity}` },
            { label: "Productivity", current: true }
          ]} />
          
          <div className="mt-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
            <p className="text-muted-foreground mt-4">
              Calculating final productivity impact using softmax and productivity gains...
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
          { label: "Scope (Agentify Customer Support)", href: `/scope?url=${encodeURIComponent(url || "")}` },
          { label: "Support Queues", href: `/support-queues?url=${encodeURIComponent(url || "")}&activity=${activity}` },
          { label: "Impact Rationale", href: `/impact-rationale?url=${encodeURIComponent(url || "")}&activity=${activity}` },
          { label: "Productivity", current: true }
        ]} />

        <div className="mt-8 animate-fade-in-down">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              Final Productivity Analysis
            </h1>
            <Button onClick={handleStartNew} variant="outline">
              Start New Analysis
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Card className="animate-fade-in-up">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary animate-count-up">
                  {productivityData.length}
                </div>
                <p className="text-muted-foreground">
                  Impact Scenarios
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 animate-count-up">
                  {productivityData.filter(item => item.category === "Autonomous Agent").length}
                </div>
                <p className="text-muted-foreground">
                  Autonomous Agents
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600 animate-count-up">
                  {productivityData.filter(item => item.category === "Copilot Agent").length}
                </div>
                <p className="text-muted-foreground">
                  Copilot Agents
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-500 animate-count-up">
                  {productivityData.filter(item => item.category === "Robotic Process Automation").length}
                </div>
                <p className="text-muted-foreground">
                  RPA Solutions
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Final Productivity Impact Calculation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">AI Initiative</th>
                      <th className="text-left p-3 font-medium">Support Queue</th>
                      <th className="text-center p-3 font-medium">Category</th>
                      <th className="text-center p-3 font-medium">Impact %</th>
                      <th className="text-center p-3 font-medium">Productivity Gain</th>
                      <th className="text-center p-3 font-medium">Final Productivity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productivityData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50 animate-fade-in-right" style={{ animationDelay: `${500 + index * 50}ms` }}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.category)}`} />
                            <span className="font-medium">{item.aiInitiative}</span>
                          </div>
                        </td>
                        <td className="p-3">{item.supportQueue}</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline">
                            {item.category}
                          </Badge>
                        </td>
                        <td className="p-3 text-center font-mono">
                          {item.impactPercentage}%
                        </td>
                        <td className="p-3 text-center font-mono">
                          {item.productivityGain}%
                        </td>
                        <td className="p-3 text-center">
                          <span className="font-mono text-lg font-semibold text-primary">
                            {item.finalProductivity.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Calculation Methodology</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">1. Softmax Normalization</h4>
                <p className="text-muted-foreground text-sm">
                  Impact percentages for each AI initiative are normalized across all support queues 
                  to ensure the sum equals 100% for each initiative.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">2. Productivity Gain Application</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Copilot Agent: 10% productivity gain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Autonomous Agent: 40% productivity gain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <span>RPA: 20% productivity gain</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">3. Final Calculation</h4>
                <p className="text-muted-foreground text-sm">
                  Final Productivity = (Normalized Impact Factor × Productivity Gain) ÷ 100
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Productivity;