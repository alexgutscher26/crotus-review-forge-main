
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Renders a sticky navigation bar with logo, navigation links, and sign-in/get started buttons.
 */
const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#800080"/>
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#800080"/>
            </svg>
            <span className="text-black">crotus</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {/* Navigation items moved to the right side */}
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Sign in
          </Link>
          <Link to="/pricing">
            <Button size="sm" className="bg-crotus-purple rounded-md px-4 py-2">
              Get started →
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
