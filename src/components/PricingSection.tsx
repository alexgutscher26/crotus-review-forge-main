import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const pricingData = {
    monthly: [
      {
        name: "Premium",
        price: "$29",
        originalPrice: "$39",
        description: "Perfect for freelancers and small businesses",
        features: [
          { name: "Up to 100 reviews per month", included: true, tooltip: "Collect and display up to 100 customer reviews monthly" },
          { name: "Review moderation", included: true, tooltip: "Filter and approve reviews before they go live" },
          { name: "Basic embedding options", included: true, tooltip: "Add reviews to your website with simple embed codes" },
          { name: "Email support", included: true, tooltip: "Get help within 24 hours via email" },
          { name: "Fast global media hosting", included: true, tooltip: "Store review images and videos on our global CDN" },
          { name: "Advanced analytics dashboard", included: false, tooltip: "In-depth metrics and insights about your reviews" },
          { name: "White-label options", included: false, tooltip: "Remove Crotus branding from your review widgets" }
        ],
        popular: false,
        buttonText: "Start Premium Trial",
        accentColor: "bg-blue-500"
      },
      {
        name: "Business",
        price: "$79",
        originalPrice: "$99",
        description: "For growing businesses with higher volumes",
        features: [
          { name: "Unlimited reviews", included: true, tooltip: "Collect as many reviews as you need with no monthly limits" },
          { name: "Advanced moderation tools", included: true, tooltip: "AI-powered review screening and bulk moderation features" },
          { name: "Custom embedding options", included: true, tooltip: "Fully customize how reviews appear on your site" },
          { name: "Priority support", included: true, tooltip: "Get help within 4 hours via email or live chat" },
          { name: "Enhanced analytics", included: true, tooltip: "Comprehensive review statistics and sentiment analysis" },
          { name: "White-label options", included: true, tooltip: "Remove all Crotus branding from your review widgets" },
          { name: "Fast global media hosting", included: true, tooltip: "Store review images and videos on our premium global CDN" }
        ],
        popular: true,
        buttonText: "Start Business Trial",
        accentColor: "bg-crotus-purple"
      }
    ],
    annual: [
      {
        name: "Premium",
        price: "$25",
        originalPrice: "$39",
        description: "Perfect for freelancers and small businesses",
        features: [
          { name: "Up to 100 reviews per month", included: true, tooltip: "Collect and display up to 100 customer reviews monthly" },
          { name: "Review moderation", included: true, tooltip: "Filter and approve reviews before they go live" },
          { name: "Basic embedding options", included: true, tooltip: "Add reviews to your website with simple embed codes" },
          { name: "Email support", included: true, tooltip: "Get help within 24 hours via email" },
          { name: "Fast global media hosting", included: true, tooltip: "Store review images and videos on our global CDN" },
          { name: "Advanced analytics dashboard", included: false, tooltip: "In-depth metrics and insights about your reviews" },
          { name: "White-label options", included: false, tooltip: "Remove Crotus branding from your review widgets" }
        ],
        popular: false,
        buttonText: "Start Premium Trial",
        accentColor: "bg-crotus-purple hover:bg-crotus-purple"
      },
      {
        name: "Business",
        price: "$67",
        originalPrice: "$99",
        description: "For growing businesses with higher volumes",
        features: [
          { name: "Unlimited reviews", included: true, tooltip: "Collect as many reviews as you need with no monthly limits" },
          { name: "Advanced moderation tools", included: true, tooltip: "AI-powered review screening and bulk moderation features" },
          { name: "Custom embedding options", included: true, tooltip: "Fully customize how reviews appear on your site" },
          { name: "Priority support", included: true, tooltip: "Get help within 4 hours via email or live chat" },
          { name: "Enhanced analytics", included: true, tooltip: "Comprehensive review statistics and sentiment analysis" },
          { name: "White-label options", included: true, tooltip: "Remove all Crotus branding from your review widgets" },
          { name: "Fast global media hosting", included: true, tooltip: "Store review images and videos on our premium global CDN" }
        ],
        popular: true,
        buttonText: "Start Business Trial",
        accentColor: "bg-crotus-purple hover:bg-crotus-purple"
      }
    ]
  };

  const currentPlans = pricingData[billingPeriod];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="pricing">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <Badge className="bg-crotus-purple hover:bg-crotus-purple px-3 py-1 text-sm font-medium text-white">
              Pre-Optimized Review Components
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text from-crotus-purple">
              Boost Your Brand's Reputation
            </h2>
            <p className="max-w-[900px] text-gray-600 text-lg md:text-xl mt-4">
              See why indie developers prefer Crotus to increase reviews & boost social proof.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Tabs 
            defaultValue="monthly" 
            value={billingPeriod}
            onValueChange={setBillingPeriod}
            className="w-full max-w-md"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annual">
                  Annual Billing
                  <span className="ml-2 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                    Save 15%
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
        
        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {currentPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-crotus-purple shadow-lg shadow-crotus-purple/20' 
                  : 'hover:border-blue-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -rotate-45 text-white font-bold py-1 left-[-40px] top-[32px] w-[170px] text-center text-sm" style={{ backgroundColor: "#7928ca" }}>
                  MOST POPULAR
                </div>
              )}
              <CardHeader className={`pb-8 ${plan.popular ? 'bg-gradient-to-r from-crotus-purple/10 to-purple-100/30' : ''}`}>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className="ml-1 text-gray-500">/month</span>
                  {plan.originalPrice && (
                    <span className="ml-2 text-gray-400 line-through text-sm">
                      {plan.originalPrice}
                    </span>
                  )}
                </div>
                <CardDescription className="mt-2 text-gray-600">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className={`rounded-full p-1 ${plan.popular ? 'bg-crotus-purple text-white' : 'bg-crotus-purple hover:bg-crotus-purple text-white'}`}>
                          <Check className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="rounded-full p-1 bg-gray-200 text-gray-400">
                          <X className="h-4 w-4" />
                        </div>
                      )}
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                        {feature.name}
                      </span>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help transition-colors duration-200" />
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            align="center"
                            className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 animate-in fade-in-0 zoom-in-95"
                          >
                            <p className="w-64 text-sm text-gray-700">{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-2 pb-8 px-6">
                <Button 
                  className={`w-full py-6 text-base font-medium shadow-lg transition-all hover:shadow-xl ${
                    plan.popular 
                      ? 'bg-crotus-purple hover:bg-crotus-purple/90 text-white' 
                      : 'bg-crotus-purple hover:bg-crotus-purple text-white'
                  }`}
                >
                  {plan.buttonText}
                </Button>
                <p className="w-full text-center text-xs text-gray-500 mt-4">
                  14-day free trial. No credit card required.
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Need a custom enterprise plan?</h3>
            <p className="text-gray-600 mb-4">
              Get a tailored solution for your specific business needs with dedicated support and custom integrations.
            </p>
            <Button className=" bg-crotus-purple hover:bg-crotus-purple px-8 py-6 text-base font-medium">
              Contact Sales Team
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <p className="text-lg font-medium text-gray-700">
            "Crotus helped us increase our product reviews by 320% in just two months."
          </p>
          <p className="mt-2 text-gray-500">
            — Sarah Johnson, Founder at PixelPerfect
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
              },
              {
                q: "Is there a free trial?",
                a: "Yes! All our plans come with a 14-day free trial with no credit card required to get started."
              },
              {
                q: "How do I cancel my subscription?",
                a: "You can cancel your subscription anytime from your account dashboard. We don't lock you into long-term contracts."
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-lg border border-gray-100 bg-white">
                <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;