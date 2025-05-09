
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShinyButton } from "@/components/shiny-button"

/**
 * A React functional component representing a hero section with branding and call-to-action elements.
 */
const HeroSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
          <p className="text-sm text-white bg-crotus-purple hover:bg-crotus-purple px-6 py-3 text-base font-medium mb-4">SaaS Reviews in Seconds</p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-gray-900 mb-6">
            Collect, Manage & Embed<br />
            High-Quality Reviews As Code
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mb-10">
            Gain full control of your brand's reputation with static, pre-optimized review
            components. Simply copy & paste to showcase compelling reviews on your site.
          </p>
          
          <div className="mb-8">
            <ShinyButton 
              className="bg-crotus-purple hover:bg-crotus-purple text-white px-6 py-3 text-base font-medium"
              to="/pricing"
            >
              Start for free today
            </ShinyButton>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 text-crotus-purple fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Join 1,000+ indie developers & freelancers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
