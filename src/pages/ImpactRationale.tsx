import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";

interface ImpactData {
  aiInitiative: string;
  supportQueue: string;
  impactPercentage: number;
  rationale: string;
  category: "Copilot Agent" | "Autonomous Agent" | "Robotic Process Automation";
}

const ImpactRationale = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get("url");
  const activity = searchParams.get("activity");
  const count = searchParams.get("count");
  
  const [isLoading, setIsLoading] = useState(true);
  const [impactData, setImpactData] = useState<ImpactData[]>([]);

  useEffect(() => {
    if (!url || !activity) {
      navigate("/");
      return;
    }

    // Simulate LLM analysis to populate impact table
    setIsLoading(true);
    setTimeout(() => {
      const data: ImpactData[] = [
        {
          aiInitiative: "AI Chatbot",
          supportQueue: "Technical Support",
          impactPercentage: 45,
          rationale: "Can handle 45% of common technical queries like password resets, basic troubleshooting, and FAQ responses",
          category: "Copilot Agent"
        },
        {
          aiInitiative: "AI Chatbot",
          supportQueue: "Billing Inquiries",
          impactPercentage: 60,
          rationale: "Most billing questions are straightforward and can be automated - payment status, invoice requests, plan information",
          category: "Copilot Agent"
        },
        {
          aiInitiative: "AI Chatbot",
          supportQueue: "General Support",
          impactPercentage: 70,
          rationale: "General inquiries are ideal for chatbots - product information, hours, contact details, and basic guidance",
          category: "Copilot Agent"
        },
        {
          aiInitiative: "AI Chatbot",
          supportQueue: "Enterprise Support",
          impactPercentage: 25,
          rationale: "Enterprise clients require more personalized attention, but chatbot can still handle initial triage and basic requests",
          category: "Copilot Agent"
        },
        {
          aiInitiative: "Smart Ticket Routing",
          supportQueue: "Technical Support",
          impactPercentage: 80,
          rationale: "AI can analyze technical keywords, urgency, and complexity to route tickets to specialists with 80% accuracy",
          category: "Autonomous Agent"
        },
        {
          aiInitiative: "Smart Ticket Routing",
          supportQueue: "Billing Inquiries",
          impactPercentage: 90,
          rationale: "Billing queries have clear patterns and can be routed very accurately to billing specialists or automated systems",
          category: "Autonomous Agent"
        },
        {
          aiInitiative: "Smart Ticket Routing",
          supportQueue: "General Support",
          impactPercentage: 75,
          rationale: "General support tickets can be categorized and routed effectively based on content analysis and intent recognition",
          category: "Autonomous Agent"
        },
        {
          aiInitiative: "Smart Ticket Routing",
          supportQueue: "Enterprise Support",
          impactPercentage: 95,
          rationale: "Enterprise tickets can be immediately identified and routed to dedicated account managers with high accuracy",
          category: "Autonomous Agent"
        },
        {
          aiInitiative: "Automated Responses",
          supportQueue: "Technical Support",
          impactPercentage: 35,
          rationale: "Can generate automated responses for common technical issues with links to relevant documentation and troubleshooting steps",
          category: "Robotic Process Automation"
        },
        {
          aiInitiative: "Automated Responses",
          supportQueue: "Billing Inquiries",
          impactPercentage: 55,
          rationale: "Standard billing responses can be automated - payment confirmations, plan details, billing cycle information",
          category: "Robotic Process Automation"
        },
        {
          aiInitiative: "Automated Responses",
          supportQueue: "General Support",
          impactPercentage: 50,
          rationale: "Many general inquiries have standard responses that can be automatically generated and customized",
          category: "Robotic Process Automation"
        },
        {
          aiInitiative: "Automated Responses",
          supportQueue: "Enterprise Support",
          impactPercentage: 20,
          rationale: "Enterprise responses require more customization, but some standard acknowledgments and status updates can be automated",
          category: "Robotic Process Automation"
        },
        {
          aiInitiative: "Sentiment Analysis",
          supportQueue: "Technical Support",
          impactPercentage: 65,
          rationale: "Can identify frustrated customers with technical issues and prioritize urgent cases or escalate to senior technicians",
          category: "Autonomous Agent"
        },
        {
          aiInitiative: "Sentiment Analysis",
          supportQueue: "Billing Inquiries",
          impactPercentage: 70,
          rationale: "Billing disputes often involve negative sentiment - AI can flag these for immediate attention from billing specialists",
          category: "Autonomous Agent"
        },
        {
          aiInitiative: "Sentiment Analysis",
          supportQueue: "General Support",
          impactPercentage: 40,
          rationale: "General inquiries typically have neutral sentiment, but can still identify dissatisfied customers for proactive outreach",
          category: "Autonomous Agent"
        },
        {
          aiInitiative: "Sentiment Analysis",
          supportQueue: "Enterprise Support",
          impactPercentage: 85,
          rationale: "Enterprise sentiment analysis is crucial - can immediately identify at-risk accounts and trigger account manager intervention",
          category: "Autonomous Agent"
        },
      ];

      setImpactData(data);
      setIsLoading(false);
    }, 2000);
  }, [url, activity, navigate]);

  const updateImpactPercentage = (index: number, value: string) => {
    const percentage = Math.max(0, Math.min(100, parseInt(value) || 0));
    setImpactData(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, impactPercentage: percentage } : item
      )
    );
  };

  const updateRationale = (index: number, value: string) => {
    setImpactData(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, rationale: value } : item
      )
    );
  };

  const getCategoryColor = (category: ImpactData["category"]) => {
    switch (category) {
      case "Copilot Agent": return "bg-blue-500";
      case "Autonomous Agent": return "bg-green-500";
      case "Robotic Process Automation": return "bg-red-400";
      default: return "bg-gray-500";
    }
  };

  const handleNext = () => {
    navigate(`/productivity?url=${encodeURIComponent(url || "")}&activity=${activity}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[
            { label: `Start (${url})`, href: "/" },
            { label: "Scope (Agentify Customer Support)", href: `/scope?url=${encodeURIComponent(url || "")}` },
            { label: `Support Queues (${count})`, href: `/support-queues?url=${encodeURIComponent(url || "")}&activity=${activity}` },
            { label: "Impact Rationale", current: true }
          ]} />
          
          <div className="mt-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
            <p className="text-muted-foreground mt-4">
              Analyzing impact of AI interventions on support queues...
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
          { label: `Support Queues (${count})`, href: `/support-queues?url=${encodeURIComponent(url || "")}&activity=${activity}` },
          { label: "Impact Rationale", current: true }
        ]} />

        <div className="mt-8 animate-fade-in-down">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              Impact Rationale
            </h1>
            <Button onClick={handleNext} size="lg">
              Next
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Initiative Impact Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {impactData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4 animate-fade-in-up transition-all duration-250 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary/20" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="flex items-center gap-4 border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.category)}`} />
                        <span className="font-medium truncate">{item.aiInitiative}</span>
                      </div>
                      <div className="text-muted-foreground">on</div>
                      <div className="min-w-0 flex-1">
                        <span className="font-medium truncate">{item.supportQueue}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium mb-2">
                          Impact Percentage
                        </label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={item.impactPercentage}
                            onChange={(e) => updateImpactPercentage(index, e.target.value)}
                            className="w-20 transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
                          />
                          <span className="text-muted-foreground">%</span>
                        </div>
                      </div>
                      
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium mb-2">
                          Rationale
                        </label>
                        <Textarea
                          value={item.rationale}
                          onChange={(e) => updateRationale(index, e.target.value)}
                          rows={3}
                          placeholder="Explain why this AI initiative will have this impact on this support queue..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImpactRationale;