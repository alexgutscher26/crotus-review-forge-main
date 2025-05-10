import React, { useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> c67b1c6ca365df357e090dfddbce93b0c88c5fae
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
<<<<<<< HEAD
import { Save } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
=======
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
>>>>>>> c67b1c6ca365df357e090dfddbce93b0c88c5fae

interface FormConfig {
  title: string;
  greetingText: string;
  showGreetingImage: boolean;
  showGreetingVideo: boolean;
}

<<<<<<< HEAD
interface SaveStatus {
  saving: boolean;
  saved: boolean;
}

const FormEditorPage: React.FC = () => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({ saving: false, saved: false });
  const [formConfig, setFormConfig] = useState<FormConfig>({
    title: "Write a review",
    greetingText: "Hey there! 👋 By sharing your honest feedback, you can help other people decide if my product is right for them.",
    showGreetingImage: true,
=======
const FormEditorPage: React.FC = () => {
  const [formConfig, setFormConfig] = useState<FormConfig>({
    title: "Write a review",
    greetingText: "Hey there! 👋 By sharing your honest feedback, you can help other people decide if my product is right for them.",
    showGreetingImage: false,
>>>>>>> c67b1c6ca365df357e090dfddbce93b0c88c5fae
    showGreetingVideo: false
  });

  const handleConfigChange = (key: keyof FormConfig, value: string | boolean) => {
<<<<<<< HEAD
    setFormConfig(prev => {
      // If enabling video, disable image and vice versa
      if (key === 'showGreetingVideo' && value === true) {
        return { ...prev, showGreetingVideo: true, showGreetingImage: false, [key]: value };
      }
      if (key === 'showGreetingImage' && value === true) {
        return { ...prev, showGreetingImage: true, showGreetingVideo: false, [key]: value };
      }
      return { ...prev, [key]: value };
    });
    setSaveStatus({ saving: false, saved: false });
  };

  const handleSave = async () => {
    setSaveStatus({ saving: true, saved: false });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveStatus({ saving: false, saved: true });
    // Reset saved status after 2 seconds
    setTimeout(() => setSaveStatus({ saving: false, saved: false }), 2000);
=======
    setFormConfig(prev => ({
      ...prev,
      [key]: value
    }));
>>>>>>> c67b1c6ca365df357e090dfddbce93b0c88c5fae
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
<<<<<<< HEAD
            <Link to="/dashboard" className="text-sm font-medium hover:underline">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/dashboard/form" className="text-sm font-medium hover:underline">Form</Link>
=======
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/form">Form</BreadcrumbLink>
>>>>>>> c67b1c6ca365df357e090dfddbce93b0c88c5fae
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Welcome</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formConfig.title}
                  onChange={(e) => handleConfigChange('title', e.target.value)}
                  placeholder="Enter form title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Greeting text</label>
                <Textarea
                  value={formConfig.greetingText}
                  onChange={(e) => handleConfigChange('greetingText', e.target.value)}
                  placeholder="Enter greeting message"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Greeting image</label>
                  <Switch
                    checked={formConfig.showGreetingImage}
                    onCheckedChange={(checked) => handleConfigChange('showGreetingImage', checked)}
                  />
                </div>

                {formConfig.showGreetingImage && (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="text-sm text-gray-500">Click to upload or drag & drop</div>
                    <div className="text-xs text-gray-400 mt-1">Supported: JPG, PNG, WEBP</div>
                    <div className="text-xs text-gray-400 mt-1">Ideal format: 1920×1080</div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Greeting video</label>
                  <Switch
                    checked={formConfig.showGreetingVideo}
                    onCheckedChange={(checked) => handleConfigChange('showGreetingVideo', checked)}
                  />
                </div>

                {formConfig.showGreetingVideo && (
                  <Button className="w-full" variant="outline">
                    Record quick video
                  </Button>
                )}
              </div>
<<<<<<< HEAD
              <div className="pt-6 border-t">
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleSave}
                  disabled={saveStatus.saving}
                >
                  <Save className="h-4 w-4" />
                  {saveStatus.saving ? 'Saving...' : saveStatus.saved ? 'Saved!' : 'Save changes'}
                </Button>
              </div>
=======
>>>>>>> c67b1c6ca365df357e090dfddbce93b0c88c5fae
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-8 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">{formConfig.title}</h1>
                <p className="text-gray-600">{formConfig.greetingText}</p>

                {formConfig.showGreetingImage && (
                  <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                    <div className="text-gray-400">Preview image</div>
                  </div>
                )}

                {formConfig.showGreetingVideo && (
                  <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                    <div className="text-gray-400">Preview video</div>
                  </div>
                )}

                <div className="pt-4 flex gap-3">
                  <Button className="flex-1" variant="outline">
                    Record quick video
                  </Button>
                  <Button className="flex-1">
                    Write a review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormEditorPage;