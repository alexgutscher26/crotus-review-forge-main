import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * This component represents a section that showcases testimonials or reviews for a product, service, or project.
 * It includes a main testimonial from a user (John Doe) who provides detailed feedback and an overall rating.
 * Additionally, it features three shorter testimonials from other users, each highlighting specific aspects of the subject being reviewed.
 *
 * @returns {JSX.Element} - A React JSX element representing the section layout with embedded testimonials.
 */
const DemoSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  /**
   * Copies embed script to clipboard and shows copied status.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(`<script src="https://cdn.crotus.io/reviews.js"></script>
<div data-crotus-collection="featured" data-theme="light"></div>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-gray-900 mb-12">
          See crotus in action
        </h2>
        
        <div className="relative max-w-3xl mx-auto rounded-lg overflow-hidden bg-purple-50 p-8 shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-medium mb-6">Simple integration</p>
            
            <div className="w-full bg-gray-900 rounded-md p-4 mb-6 relative">
              <pre className="text-left text-purple-400 font-mono text-sm overflow-x-auto">
                <code>{`<script src="https://cdn.crotus.io/reviews.js"></script>
<div data-crotus-collection="featured" data-theme="light"></div>`}</code>
              </pre>
              <button 
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700 transition-colors"
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-purple-400" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            
            <div className="w-full bg-white rounded-md p-6 shadow-sm">
              <div className="flex items-start space-x-4 mb-4 text-left">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">JD</div>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-gray-900">John Doe</h4>
                    <span className="ml-2 text-sm text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex my-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700">"Crotus has transformed how we showcase customer feedback. The integration was seamless and the performance is outstanding!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
          <div className="flex flex-col items-center">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 text-purple-600 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-700 font-medium">"Can't wait to integrate it"</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 text-purple-600 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-700 font-medium">"This UI is crazy! Well done"</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 text-purple-600 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-700 font-medium">"Looks super cool man"</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
