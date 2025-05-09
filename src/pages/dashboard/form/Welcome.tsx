import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ReviewFormData {
  rating: number;
  comment: string;
  name: string;
  jobTitle: string;
}

/**
 * A React functional component representing a review form with fields for rating, comment, name, and job title.
 */
const ReviewForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    comment: '',
    name: '',
    jobTitle: ''
  });

  /**
   * Handles form submission, prevents default behavior, logs the form data, and closes the modal.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting review:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Rate your experience</h3>
        <div className="space-y-2 text-xs text-gray-500">
          <p>- What's the best thing [product] has done for you?</p>
          <p>- Would you recommend [product] to others?</p>
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

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          disabled={!formData.rating || !formData.comment.trim() || !formData.name.trim()}
        >
          Next
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

/**
 * Welcome page component for a review collection form.
 * This component renders a welcome page with options to record quick videos and write reviews.
 */
const Welcome = () => {
  const [title, setTitle] = useState('Write a review');
  const [greetingText, setGreetingText] = useState(
    'Hey there! 👋 By sharing your honest feedback, you can help other people decide if my product is right for them.'
  );
  const [showGreetingImage, setShowGreetingImage] = useState(true);
  const [showGreetingVideo, setShowGreetingVideo] = useState(false);

  /**
   * Toggles the display of the greeting image and hides the greeting video if the image is shown.
   */
  const handleGreetingImageChange = (checked: boolean) => {
    setShowGreetingImage(checked);
    if (checked) setShowGreetingVideo(false);
  };

  /**
   * Toggles greeting video visibility and hides greeting image if video is enabled.
   */
  const handleGreetingVideoChange = (checked: boolean) => {
    setShowGreetingVideo(checked);
    if (checked) setShowGreetingImage(false);
  };
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  /**
   * Logs the welcome page settings to the console.
   */
  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving welcome page settings:', {
      title,
      greetingText,
      showGreetingImage,
      showGreetingVideo,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Form Section */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/dashboard/collection"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Link>
            <h1 className="text-2xl font-semibold">Welcome Page</h1>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your form title"
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="greeting">Greeting text</Label>
              <Textarea
                id="greeting"
                value={greetingText}
                onChange={(e) => setGreetingText(e.target.value)}
                placeholder="Enter your greeting message"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="greeting-image">Greeting image</Label>
                <Switch
                  id="greeting-image"
                  checked={showGreetingImage}
                  onCheckedChange={handleGreetingImageChange}
                />
              </div>
              {showGreetingImage && (
                <Card 
                  className="p-6 border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    // Handle image drop here
                    console.log('Image dropped');
                  }}
                >
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <ArrowLeft className="w-6 h-6 text-gray-400 rotate-90" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Upload your image</p>
                    <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-400">Supported: JPG, PNG, WEBP</p>
                    <p className="text-xs text-gray-400">Ideal format: 1920×1080</p>
                  </div>
                </Card>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="greeting-video">Greeting video</Label>
                  <p className="text-sm text-gray-500">Allow customers to submit video reviews</p>
                </div>
                <Switch
                  id="greeting-video"
                  checked={showGreetingVideo}
                  onCheckedChange={handleGreetingVideoChange}
                />
              </div>
            </div>

            <Button 
              onClick={handleSave} 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex-1 border-l bg-white p-8 sticky top-0 h-screen overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-6">Live Preview</h2>
          <Card className="overflow-hidden">
            <div className="p-8 space-y-6">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{greetingText}</p>
              {showGreetingImage && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <p className="text-gray-400">Preview image will appear here</p>
                </div>
              )}
              {showGreetingVideo && (
                <div className="mt-4 bg-gray-100 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-gray-200">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                      <ArrowLeft className="w-6 h-6 text-gray-500 rotate-90" />
                    </div>
                    <p className="text-sm text-gray-500">Video review option enabled</p>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-6 border-t space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsQRDialogOpen(true)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Record quick video
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsReviewDialogOpen(true)}
                >
                  Write a review
                </Button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                This is how your customers will see your review collection form
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record a video</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">Scan the QR-code to record a video with your phone :)</p>
            <div className="w-64 h-64 mx-auto bg-emerald-600 rounded-lg flex items-center justify-center">
              <div className="w-56 h-56 bg-white rounded-lg"></div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsQRDialogOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Form Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate your experience</DialogTitle>
          </DialogHeader>
          <ReviewForm onClose={() => setIsReviewDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Welcome;