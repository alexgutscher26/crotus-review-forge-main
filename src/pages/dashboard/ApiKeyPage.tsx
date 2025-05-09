
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff, Key, RefreshCw } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ApiKeyPage: React.FC = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to generate a new API key
  const generateApiKey = async () => {
    setIsGenerating(true);
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newKey = `crotus_${Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')}`;
      setApiKey(newKey);
      setShowApiKey(true);
      toast({
        title: "New API key generated",
        description: "Make sure to copy your API key now. You won't be able to see it again!",
      });
    } catch (error) {
      toast({
        title: "Error generating API key",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to copy API key to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopied(true);
      toast({
        title: "API key copied",
        description: "The API key has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Function to toggle API key visibility
  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  // Mask the API key
  const maskApiKey = (key: string) => {
    if (!key) return "";
    const prefix = key.slice(0, 7); // Show 'crotus_'
    const suffix = key.slice(-4); // Show last 4 characters
    return `${prefix}${'•'.repeat(20)}${suffix}`;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>API Key</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">API Key</h1>
        <p className="text-muted-foreground mt-2">
          Generate and manage your API key to integrate with our services.
        </p>
      </div>

      {/* API Key Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-gray-500" />
              <h2 className="font-medium text-gray-700">Your API Key</h2>
            </div>
            
            {apiKey ? (
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex">
                    <div className="relative flex-grow">
                      <Input
                        value={showApiKey ? apiKey : maskApiKey(apiKey)}
                        readOnly
                        className="pr-24 font-mono text-sm bg-gray-50 border-gray-200"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center gap-0.5 pr-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                                onClick={toggleApiKeyVisibility}
                              >
                                {showApiKey ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{showApiKey ? "Hide API key" : "Show API key"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                                onClick={copyToClipboard}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy to clipboard</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <Button
                    variant="outline"
                    onClick={generateApiKey}
                    disabled={isGenerating}
                    className="flex items-center gap-2 border-amber-300 hover:bg-amber-100 hover:text-amber-900"
                  >
                    <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate Key
                  </Button>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-800">
                      Warning: This action cannot be undone
                    </p>
                    <p className="text-sm text-amber-700 mt-0.5">
                      Regenerating will immediately invalidate your existing API key
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  You haven't generated an API key yet. Generate one to get started with our API.
                </p>
                <Button
                  onClick={generateApiKey}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  <Key className="h-4 w-4" />
                  Generate API Key
                </Button>
              </div>
            )}
          </div>

          {/* API Documentation Section */}
          <div className="mt-8 space-y-4">
            <h3 className="font-medium text-gray-700">Using Your API Key</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Include your API key in the headers of your HTTP requests:
              </p>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </pre>
            </div>
            <div className="pt-4">
              <Button variant="outline" asChild>
                <a href="/docs/api" target="_blank" rel="noopener noreferrer">
                  View API Documentation
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyPage;
