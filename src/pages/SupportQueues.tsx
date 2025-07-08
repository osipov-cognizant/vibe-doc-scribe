import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";

interface AIIntervention {
  id: string;
  name: string;
  description: string;
  complexity: "Quick Win" | "Moderate" | "High";
  category: "Copilot Agent" | "Autonomous Agent" | "Robotic Process Automation";
}

interface SupportQueue {
  id: string;
  name: string;
  description: string;
}

const SupportQueues = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get("url");
  const activity = searchParams.get("activity");
  
  const [isLoading, setIsLoading] = useState(true);
  const [supportQueues, setSupportQueues] = useState<SupportQueue[]>([]);
  const [aiInterventions, setAiInterventions] = useState<AIIntervention[]>([]);
  const [interventionRelevance, setInterventionRelevance] = useState<Record<string, Record<string, boolean>>>({});

  useEffect(() => {
    if (!url || !activity) {
      navigate("/");
      return;
    }

    // Simulate LLM analysis
    setIsLoading(true);
    setTimeout(() => {
      const queues: SupportQueue[] = [
        { id: "technical", name: "Technical Support", description: "Hardware and software troubleshooting" },
        { id: "billing", name: "Billing Inquiries", description: "Payment and subscription related questions" },
        { id: "general", name: "General Support", description: "Product information and general assistance" },
        { id: "enterprise", name: "Enterprise Support", description: "Dedicated support for enterprise clients" },
      ];

      const interventions: AIIntervention[] = [
        {
          id: "chatbot",
          name: "AI Chatbot",
          description: "Automated first-line customer support",
          complexity: "Quick Win",
          category: "Copilot Agent"
        },
        {
          id: "ticket-routing",
          name: "Smart Ticket Routing",
          description: "Intelligent assignment of tickets to appropriate agents",
          complexity: "Moderate",
          category: "Autonomous Agent"
        },
        {
          id: "auto-responses",
          name: "Automated Responses",
          description: "Generate contextual responses for common inquiries",
          complexity: "Quick Win",
          category: "Robotic Process Automation"
        },
        {
          id: "sentiment-analysis",
          name: "Sentiment Analysis",
          description: "Analyze customer emotions and prioritize urgent cases",
          complexity: "High",
          category: "Autonomous Agent"
        },
      ];

      // Initialize all interventions as relevant to all queues
      const relevance: Record<string, Record<string, boolean>> = {};
      interventions.forEach(intervention => {
        relevance[intervention.id] = {};
        queues.forEach(queue => {
          relevance[intervention.id][queue.id] = true;
        });
      });

      setSupportQueues(queues);
      setAiInterventions(interventions);
      setInterventionRelevance(relevance);
      setIsLoading(false);
    }, 2000);
  }, [url, activity, navigate]);

  const toggleRelevance = (interventionId: string, queueId: string) => {
    setInterventionRelevance(prev => ({
      ...prev,
      [interventionId]: {
        ...prev[interventionId],
        [queueId]: !prev[interventionId]?.[queueId]
      }
    }));
  };

  const updateQueueDescription = (queueId: string, description: string) => {
    setSupportQueues(prev => 
      prev.map(queue => 
        queue.id === queueId ? { ...queue, description } : queue
      )
    );
  };

  const updateInterventionProperty = (
    interventionId: string, 
    property: keyof AIIntervention, 
    value: string
  ) => {
    setAiInterventions(prev =>
      prev.map(intervention =>
        intervention.id === interventionId 
          ? { ...intervention, [property]: value }
          : intervention
      )
    );
  };

  const getCategoryColor = (category: AIIntervention["category"]) => {
    switch (category) {
      case "Copilot Agent": return "bg-blue-500";
      case "Autonomous Agent": return "bg-green-500";
      case "Robotic Process Automation": return "bg-red-400";
      default: return "bg-gray-500";
    }
  };

  const getComplexityMonths = (complexity: AIIntervention["complexity"]) => {
    switch (complexity) {
      case "Quick Win": return "2-4 months";
      case "Moderate": return "4-6 months";
      case "High": return "6-9+ months";
      default: return "";
    }
  };

  const handleNext = () => {
    const activeCount = supportQueues.length;
    navigate(`/impact-rationale?url=${encodeURIComponent(url || "")}&activity=${activity}&count=${activeCount}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[
            { label: `Start (${url})`, href: "/" },
            { label: "Scope (Agentify Customer Support)", href: `/scope?url=${encodeURIComponent(url || "")}` },
            { label: "Support Queues", current: true }
          ]} />
          
          <div className="mt-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
            <p className="text-muted-foreground mt-4">
              Analyzing support structure and generating AI interventions...
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
          { label: "Support Queues", current: true }
        ]} />

        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              Support Queues & AI Interventions
            </h1>
            <Button onClick={handleNext} size="lg">
              Next
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Intervention Relevance Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-3 font-medium">AI Intervention</th>
                      {supportQueues.map(queue => (
                        <th key={queue.id} className="text-center p-3 font-medium min-w-32">
                          {queue.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {aiInterventions.map(intervention => (
                      <tr key={intervention.id} className="border-t">
                        <td className="p-3 font-medium">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getCategoryColor(intervention.category)}`} />
                            {intervention.name}
                          </div>
                        </td>
                        {supportQueues.map(queue => (
                          <td key={queue.id} className="p-3 text-center">
                            <button
                              onClick={() => toggleRelevance(intervention.id, queue.id)}
                              className={`w-8 h-8 rounded-full border-2 transition-colors ${
                                interventionRelevance[intervention.id]?.[queue.id]
                                  ? 'bg-primary border-primary'
                                  : 'bg-background border-muted-foreground'
                              }`}
                            >
                              {interventionRelevance[intervention.id]?.[queue.id] && (
                                <span className="text-primary-foreground text-sm">✓</span>
                              )}
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="queues" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="queues">Support Queues</TabsTrigger>
              <TabsTrigger value="interventions">AI Interventions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="queues" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportQueues.map(queue => (
                  <Card key={queue.id}>
                    <CardHeader>
                      <CardTitle>{queue.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label htmlFor={`queue-${queue.id}`}>Description</Label>
                      <Input
                        id={`queue-${queue.id}`}
                        value={queue.description}
                        onChange={(e) => updateQueueDescription(queue.id, e.target.value)}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="interventions" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiInterventions.map(intervention => (
                  <Card key={intervention.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(intervention.category)}`} />
                        {intervention.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor={`intervention-desc-${intervention.id}`}>Description</Label>
                        <Input
                          id={`intervention-desc-${intervention.id}`}
                          value={intervention.description}
                          onChange={(e) => updateInterventionProperty(intervention.id, 'description', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`intervention-complexity-${intervention.id}`}>Implementation Complexity</Label>
                        <Select
                          value={intervention.complexity}
                          onValueChange={(value) => updateInterventionProperty(intervention.id, 'complexity', value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Quick Win">Quick Win (2-4 months)</SelectItem>
                            <SelectItem value="Moderate">Moderate (4-6 months)</SelectItem>
                            <SelectItem value="High">High (6-9+ months)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor={`intervention-category-${intervention.id}`}>AI Initiative Category</Label>
                        <Select
                          value={intervention.category}
                          onValueChange={(value) => updateInterventionProperty(intervention.id, 'category', value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Copilot Agent">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                Copilot Agent (10% Productivity)
                              </div>
                            </SelectItem>
                            <SelectItem value="Autonomous Agent">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                Autonomous Agent (40% Productivity)
                              </div>
                            </SelectItem>
                            <SelectItem value="Robotic Process Automation">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                RPA (20% Productivity)
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Badge variant="outline">
                          {getComplexityMonths(intervention.complexity)}
                        </Badge>
                        <Badge variant="secondary">
                          {intervention.category === "Copilot Agent" && "10%"}
                          {intervention.category === "Autonomous Agent" && "40%"}
                          {intervention.category === "Robotic Process Automation" && "20%"}
                          {" Productivity"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SupportQueues;