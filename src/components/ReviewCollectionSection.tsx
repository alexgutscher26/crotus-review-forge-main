import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormData {
  rating: number;
  comment: string;
}

// Demo for the Landing Page Dont make it work
const ReviewCollectionSection: React.FC = () => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    comment: ""
  });

  const handleRatingClick = (index: number) => {
    setFormData(prev => ({ ...prev, rating: index + 1 }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting review:", formData);
    // Reset form after submission
    setFormData({ rating: 0, comment: "" });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-24">
          {/* Collect Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-green-600 font-medium text-sm">Collect</div>

              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-gray-900">
                Inspire Customers To<br />
                Leave Authentic Feedback
              </h2>

              <p className="text-gray-600">
                Customize your review collection form and share it with a few clicks.
                Greet customers with a welcome message that inspires thoughtful
                feedback. Showcase your strengths & uncover opportunities for
                iteration.
              </p>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-green-600 font-medium">*</div>
                  <div className="text-right text-xs text-gray-400">*</div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Rate your experience</h3>
                    <div className="space-y-2 text-xs text-gray-500">
                      <p>- What's the best thing about our service for you?</p>
                      <p>- Would you recommend us to others?</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 my-4">
                    {['😔', '😐', '🙂', '😊', '😍'].map((emoji, i) => (
                      <div
                        key={i}
                        onClick={() => handleRatingClick(i)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors
                        ${formData.rating === i + 1 ? 'bg-green-100 ring-2 ring-green-500' : 'hover:bg-gray-100'}`}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="comment" className="text-sm font-medium">
                      Your feedback
                    </label>
                    <Textarea
                      id="comment"
                      placeholder="Share your experience with us..."
                      value={formData.comment}
                      onChange={handleCommentChange}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="text-xs text-gray-600 mb-8">
                    <p>Help us get your review noticed by my crazy boss! 😉</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={!formData.rating || !formData.comment.trim()}
                    >
                      Submit Review
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* TODO Change to the right images */}
          {/* Manage Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-green-600 font-medium text-sm">Manage</div>

              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-gray-900">
                Keep Less-Than-Stellar<br />
                Feedback Private
              </h2>

              <p className="text-gray-600">
                Manage your reviews with a powerful dashboard. Keep sensitive feedback
                private while showcasing your best testimonials. Use insights to improve
                your product and customer experience.
              </p>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Review Dashboard</h3>
                    <span className="text-sm text-gray-500">Last 30 days</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">4.8</div>
                      <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">127</div>
                      <div className="text-sm text-gray-600">Total Reviews</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">92%</div>
                      <div className="text-sm text-gray-600">Response Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* TODO Change to the right images */}
          {/* Embed Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-green-600 font-medium text-sm">Embed</div>

              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-gray-900">
                Image & Video Reviews That<br />
                Won't Slow Your Site Down
              </h2>

              <p className="text-gray-600">
                No one likes a slow website. Keep your site freakishly fast with visual
                reviews optimized for instant delivery and minimal load. Support for images
                and video reviews with automatic optimization.
              </p>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Optimized for fast loading</span>
                    <span>Auto-compressed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCollectionSection;
