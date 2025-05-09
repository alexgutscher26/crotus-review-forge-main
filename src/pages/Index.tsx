
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DemoSection from "@/components/DemoSection";
import ReviewCollectionSection from "@/components/ReviewCollectionSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

/**
 * Main component rendering the homepage layout.
 */
const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <DemoSection />
        <ReviewCollectionSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
