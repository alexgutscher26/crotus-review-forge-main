
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, ArrowRight } from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  createdAt: Date;
  placeholderCount: number;
}

const EmailsPage: React.FC = () => {
  const [templates] = useState<EmailTemplate[]>([
    {
      id: "friendly",
      name: "Friendly",
      createdAt: new Date("2025-02-27"),
      placeholderCount: 3,
    },
    {
      id: "professional",
      name: "Professional",
      createdAt: new Date("2025-02-27"),
      placeholderCount: 3,
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Automated Emails</h1>
        <p className="text-gray-600">Create and manage email templates, then send them manually or schedule automated delivery using the Crotus SDK.</p>
      </div>

      <h2 className="text-xl font-semibold">Email templates</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <CalendarIcon className="h-4 w-4" />
                {template.createdAt.toLocaleDateString()}
                <span className="mx-2">•</span>
                {template.placeholderCount} placeholders
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">{template.name}</h3>
                <Button variant="ghost" size="sm" className="flex items-center hover:text-emerald-600">
                  Edit Template <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[160px] text-center">
            <h3 className="font-medium text-lg mb-2">Create Template</h3>
            <Button variant="outline" className="mt-2">
              Create New
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailsPage;
