import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface FormConfig {
  title: string;
  greetingText: string;
  showGreetingImage: boolean;
  showGreetingVideo: boolean;
}

const FormEditorPage: React.FC = () => {
  const [formConfig, setFormConfig] = useState<FormConfig>({
    title: "Write a review",
    greetingText: "Hey there! 👋 By sharing your honest feedback, you can help other people decide if my product is right for them.",
    showGreetingImage: false,
    showGreetingVideo: false
  });

  const handleConfigChange = (key: keyof FormConfig, value: string | boolean) => {
    setFormConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/form">Form</BreadcrumbLink>
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