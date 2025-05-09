
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="#features" className="text-muted-foreground hover:text-gray-900 text-sm">Features</Link></li>
              <li><Link to="#pricing" className="text-muted-foreground hover:text-gray-900 text-sm">Pricing</Link></li>
              <li><Link to="#reviews" className="text-muted-foreground hover:text-gray-900 text-sm">Reviews</Link></li>
              <li><Link to="/docs" className="text-muted-foreground hover:text-gray-900 text-sm">Documentation</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-muted-foreground hover:text-gray-900 text-sm">Blog</Link></li>
              <li><Link to="/guides" className="text-muted-foreground hover:text-gray-900 text-sm">Guides</Link></li>
              <li><Link to="/api" className="text-muted-foreground hover:text-gray-900 text-sm">API Reference</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-gray-900 text-sm">Support</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-gray-900 text-sm">About</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-gray-900 text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-gray-900 text-sm">Contact</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-gray-900 text-sm">Privacy</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates and news directly in your inbox.
            </p>
            <Button className="w-full bg-crotus-purple hover:bg-crotus-purple text-white">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold gradient-text">Crotus.io</Link>
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" className="text-muted-foreground hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://github.com" className="text-muted-foreground hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" className="text-muted-foreground hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:hello@crotus.io" className="text-muted-foreground hover:text-gray-900">
              <span className="sr-only">Email</span>
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
