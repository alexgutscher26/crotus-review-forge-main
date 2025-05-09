import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";

const ApiKeyPage: React.FC = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("sk_test_51NXwpqGUzBgLhC9O2HWP");
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

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

  const maskApiKey = (key: string) => {
    return "•".repeat(key.length);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>API Key</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API key</h1>
        <p className="text-muted-foreground mt-2">
          Collect high-quality reviews on autopilot.
        </p>
      </div>

      {/* API Key Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="font-medium text-gray-700">Your API Key</h2>
            
            <div className="relative">
              <Input
                value={showApiKey ? apiKey : maskApiKey(apiKey)}
                readOnly
                className="pr-20 font-mono text-sm bg-gray-50"
              />
              <div className="absolute inset-y-0 right-0 flex items-center gap-0.5 pr-2">
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Keep your API key secret. Do not share it with others or expose it in any client-side code.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyPage;