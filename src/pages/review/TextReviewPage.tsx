import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ReviewFormData {
  rating: number;
  comment: string;
  name: string;
  jobTitle: string;
}

const ReviewPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = React.useState<ReviewFormData>({
    rating: 0,
    comment: '',
    name: '',
    jobTitle: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting review:', { ...formData, reviewId: id });
    // TODO: Implement actual review submission
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Write a review</h1>
          <p className="text-gray-600">
            Hey there! 👋 By sharing your honest feedback, you can help other people
            decide if our product is right for them.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Rate your experience</h3>
            <div className="space-y-2 text-xs text-gray-500">
              <p>- What's the best thing about our product?</p>
              <p>- Would you recommend it to others?</p>
            </div>
          </div>

          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating }))}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors
                  ${formData.rating === rating ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}`}
              >
                <Star className={`w-5 h-5 ${formData.rating >= rating ? 'fill-current' : ''}`} />
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Write something nice ✨</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              className="min-h-[100px]"
              placeholder="Share your experience..."
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Type your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div className="text-xs text-gray-500">
            By submitting, you agree we may share your review in our marketing.
            We appreciate your support!
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={!formData.rating || !formData.comment.trim() || !formData.name.trim()}
          >
            Submit Review
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ReviewPage;