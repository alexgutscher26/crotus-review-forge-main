import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Camera, StopCircle, RefreshCw } from 'lucide-react';

interface VideoReviewData {
  name: string;
  jobTitle: string;
  videoBlob: Blob | null;
}

/**
 * Video review page component allowing users to record and submit video reviews.
 */
const VideoReviewPage = () => {
  const { id } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [formData, setFormData] = useState<VideoReviewData>({
    name: '',
    jobTitle: '',
    videoBlob: null
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  /**
   * Starts recording video from the user's camera.
   */
  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setVideoBlob(blob);
        setFormData(prev => ({ ...prev, videoBlob: blob }));
        stopStream();
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  /**
   * Stops the recording process and updates the recording state.
   */
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  /**
   * Stops all tracks of the current stream and clears it.
   */
  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  /**
   * Resets the video recording by clearing the video blob and form data.
   */
  const resetRecording = () => {
    setVideoBlob(null);
    setFormData(prev => ({ ...prev, videoBlob: null }));
  };

  /**
   * Handles form submission for video reviews.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.videoBlob || !formData.name) return;

    // TODO: Implement actual video review submission
    console.log('Submitting video review:', { ...formData, reviewId: id });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Record your review</h1>
          <p className="text-gray-600">
            Share your experience in a short video. Just be yourself and speak from the heart! 🎥
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
            {!videoBlob ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!isRecording && !stream && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </>
            ) : (
              <video
                src={URL.createObjectURL(videoBlob)}
                controls
                className="w-full h-full"
              />
            )}
          </div>

          <div className="flex justify-center gap-4">
            {!isRecording && !videoBlob && (
              <Button
                type="button"
                onClick={startRecording}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Video className="w-4 h-4 mr-2" />
                Start Recording
              </Button>
            )}

            {isRecording && (
              <Button
                type="button"
                onClick={stopRecording}
                variant="destructive"
              >
                <StopCircle className="w-4 h-4 mr-2" />
                Stop Recording
              </Button>
            )}

            {videoBlob && (
              <Button
                type="button"
                onClick={resetRecording}
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Record Again
              </Button>
            )}
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
            disabled={!videoBlob || !formData.name.trim()}
          >
            Submit Review
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default VideoReviewPage;