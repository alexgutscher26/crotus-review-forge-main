import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, ArrowRight, ExternalLink, CheckCircle, Share2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

/**
 * This component renders a dashboard for managing review forms, including tabs for video settings,
 * integration options, and customization. It provides functionality to copy embed codes and download QR codes.
 *
 * @component ReviewDashboard
 * @returns {JSX.Element} The JSX element representing the review dashboard.
 */
const CollectionPage = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [formLink, setFormLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    pendingReviews: 3,
    completedReviews: 27,
    averageRating: 4.7
  });
  
  useEffect(() => {
    // Get username from profile context
    const username = profile?.username || "user";
    setFormLink(`https://crotus.io/${username}/review`);
    
    // Reset copied state after 2 seconds
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  /**
   * Copies the form link to the clipboard and shows a success toast.
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formLink).then(() => {
      setCopied(true);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this link with your customers.",
      });
    });
  };

  /**
   * Shares a form link using the Web Share API or copies it to the clipboard if not supported.
   */
  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Review Collection Form',
        text: 'Please leave a review for my business',
        url: formLink,
      })
      .then(() => {
        toast({
          title: "Link shared successfully",
        });
      })
      .catch((error) => {
        toast({
          title: "Error sharing link",
          description: "Please copy the link manually.",
          variant: "destructive"
        });
      });
    } else {
      copyToClipboard();
    }
  };

  /**
   * Opens a new browser tab with the form link.
   */
  const handlePreview = () => {
    window.open(formLink, '_blank', 'noopener,noreferrer');
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
            <BreadcrumbPage>Review Collection</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Review Collection</h1>
          <p className="text-muted-foreground mt-2">
            Share your custom form link with customers to collect valuable feedback.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handlePreview} variant="outline" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" /> Preview Form
          </Button>
          <Button onClick={shareLink} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700">
            <Share2 className="h-4 w-4" /> Share Form
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-emerald-600">Average Rating</h3>
            <div className="mt-2 flex items-center">
              <span className="text-3xl font-bold">{stats.averageRating}</span>
              <div className="ml-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${star <= Math.round(stats.averageRating) ? "text-amber-400" : "text-gray-300"}`}
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">/ 5.0</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-gray-500">Completed Reviews</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">{stats.completedReviews}</span>
              <span className="ml-2 text-sm text-emerald-600">+3 this week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-gray-500">Pending Reviews</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">{stats.pendingReviews}</span>
              <span className="ml-1 text-sm text-gray-500">requests sent</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Link Section */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <h2 className="font-medium text-gray-700 mb-4">Your collection form link</h2>
          <div className="flex items-center gap-2">
            <Input 
              value={formLink} 
              readOnly 
              className="bg-gray-50 font-mono text-sm"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={copyToClipboard} 
                    className={copied ? "text-emerald-600 border-emerald-600" : ""}
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Share this link with your customers to collect reviews. The form works on all devices and browsers.
          </p>
        </CardContent>
      </Card>
      
      {/* Tabs for Review Collection Pages */}
      <div className="mt-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Form Overview</TabsTrigger>
            <TabsTrigger value="customize">Customize Form</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Welcome Page Card */}
              <Card className="overflow-hidden bg-white hover:shadow-md transition-shadow group">
                <div className="p-6">
                  <div className="bg-gray-100 rounded-md p-4 h-40 mb-4 flex items-center justify-center">
                    <div className="text-center w-full">
                      <div className="bg-gray-200 w-28 h-28 mx-auto rounded-full mb-4 flex items-center justify-center overflow-hidden">
                        <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className="bg-emerald-600 h-4 w-24 rounded mx-auto"></div>
                      <div className="bg-gray-300 h-4 w-32 rounded mx-auto mt-2"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">Welcome page</h3>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard/form/welcome" className="flex items-center group-hover:text-emerald-600">
                        Edit <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Customize your brand's first impression</p>
                </div>
              </Card>

              {/* Video Review Card */}
              <Card className="overflow-hidden bg-white hover:shadow-md transition-shadow group">
                <div className="p-6">
                  <div className="bg-gray-100 rounded-md p-4 h-40 mb-4 flex items-center justify-center">
                    <div className="w-24 h-40 bg-black rounded-2xl border-4 border-black mx-auto flex items-center justify-center relative">
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                      </div>
                      <div className="text-white text-center">
                        <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <div className="text-xs mt-1">rec</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">Video review</h3>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard/form/video" className="flex items-center group-hover:text-emerald-600">
                        Edit <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Collect authentic video testimonials</p>
                </div>
              </Card>

              {/* Text Review Card */}
              <Card className="overflow-hidden bg-white hover:shadow-md transition-shadow group">
                <div className="p-6">
                  <div className="bg-gray-100 rounded-md p-4 h-40 mb-4 flex items-center justify-center">
                    <div className="text-center w-full">
                      <h4 className="font-medium mb-4">Rate your experience</h4>
                      <div className="flex items-center justify-center space-x-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star}
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-amber-400" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <div className="w-full bg-gray-200 h-16 rounded flex items-center justify-center">
                        <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">Text review</h3>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard/form/text" className="flex items-center group-hover:text-emerald-600">
                        Edit <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Gather written feedback and ratings</p>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="customize" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Form Customization</h3>
                <p className="text-gray-500">Customize your form appearance and questions to match your brand and collect the feedback you need.</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/dashboard/form/branding" className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">Brand Settings</h4>
                        <p className="text-sm text-gray-500">Colors, logo, and fonts</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/dashboard/form/questions" className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">Questions</h4>
                        <p className="text-sm text-gray-500">Customize your survey questions</p>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integration" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Integration Options</h3>
                <p className="text-gray-500">Embed your form or add it to your website for seamless review collection.</p>
                
                <div className="mt-6 space-y-4">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium flex items-center">
                      <svg className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Embed Code
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 mb-3">
                      Add this code to your website to display the review form
                    </p>
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                      &lt;iframe src="{formLink}" width="100%" height="600" frameBorder="0"&gt;&lt;/iframe&gt;
                    </div>
                    <Button variant="outline" size="sm" className="mt-3" onClick={copyToClipboard}>
                      Copy Code
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium flex items-center">
                      <svg className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      QR Code
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 mb-3">
                      Download and print this QR code for in-person review collection
                    </p>
                    <div className="bg-white p-4 w-40 h-40 border flex items-center justify-center">
                      <div className="text-sm text-gray-400 text-center">
                        QR Code<br/>Preview
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      Download QR
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CollectionPage;