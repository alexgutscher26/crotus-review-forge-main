import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const ApiKeyPage: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchApiKey();
    }
  }, [user]);

  const fetchApiKey = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('api_key')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setApiKey(data.api_key || '');
    } catch (error) {
      console.error('Error fetching API key:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch API key',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const regenerateApiKey = async () => {
    if (!user?.id) return;
    
    try {
      setRegenerating(true);
      const { data, error } = await supabase.rpc('regenerate_api_key', {
        user_id: user.id
      });

      if (error) throw error;
      
      await fetchApiKey();
      toast({
        title: 'Success',
        description: 'API key has been regenerated',
      });
    } catch (error) {
      console.error('Error regenerating API key:', error);
      toast({
        title: 'Error',
        description: 'Failed to regenerate API key',
        variant: 'destructive',
      });
    } finally {
      setRegenerating(false);
      setShowApiKey(false);
    }
  };

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
            
            <div className="space-y-4">
              <div className="relative">
                <Input
                  value={loading ? "Loading..." : (showApiKey ? apiKey : maskApiKey(apiKey))}
                  readOnly
                  className="pr-28 font-mono text-sm bg-gray-50"
                />
                <div className="absolute inset-y-0 right-0 flex items-center gap-0.5 pr-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                    onClick={toggleApiKeyVisibility}
                    disabled={loading}
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
                    disabled={loading}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                    onClick={regenerateApiKey}
                    disabled={loading || regenerating}
                  >
                    <RefreshCw className={`h-4 w-4 ${regenerating ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>

            <p className="text-sm text-gray-500">
              Keep your API key secret. Do not share it with others or expose it in any client-side code.
            </p>
          </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyPage;