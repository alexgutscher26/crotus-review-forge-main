import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Code2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


interface Review {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  reviewText: string;
  date: string;
  platform: string;
}

/**
 * React component that displays customer reviews with sorting and filtering options.
 * Provides a preview tab for displaying reviews and a code tab for integration instructions.
 */
const wall: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterRating, setFilterRating] = useState<string>("all");

  // Mock data for reviews
  const allReviews: Review[] = [
    {
      id: "1",
      customerName: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      reviewText: "Absolutely love this service! It has streamlined our review collection process and helped us showcase our customer feedback beautifully.",
      date: "2024-01-15",
      platform: "Direct"
    },
    {
      id: "2",
      customerName: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 4,
      reviewText: "Great platform for managing customer reviews. The interface is intuitive and the features are exactly what we needed.",
      date: "2024-01-14",
      platform: "Google"
    },
    {
      id: "3",
      customerName: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      rating: 5,
      reviewText: "This tool has helped us build trust with potential customers by showcasing authentic reviews. Highly recommended!",
      date: "2024-01-13",
      platform: "Direct"
    },
    // Add more mock reviews as needed
  ];

  // Filter and sort reviews
  /**
   * Filters and sorts reviews based on rating and sorting criteria.
   */
  const getFilteredAndSortedReviews = () => {
    let filteredReviews = [...allReviews];

    // Apply rating filter
    if (filterRating !== 'all') {
      filteredReviews = filteredReviews.filter(
        (review) => review.rating === parseInt(filterRating)
      );
    }

    // Apply sorting
    return filteredReviews.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  };

  const reviews = getFilteredAndSortedReviews();

  /**
   * Renders a row of stars based on the given rating.
   */
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const codeExample = `// Example code for integrating the Wall of Love component
import { WallOfLove } from 'crotus/react';

export default function ReviewWall() {
  return (
    <WallOfLove
      projectId="your_project_id"
      theme="light"
      layout="grid"
      perPage={9}
      sorting={{
        enabled: true,
        default: "newest"
      }}
      filtering={{
        enabled: true,
        ratings: true
      }}
    />
  );
}`;

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Wall of Love</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Wall of Love</h1>
        <p className="text-muted-foreground mt-2">
          Showcase your customer reviews and build trust with potential customers.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="preview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterRating} onValueChange={setFilterRating}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={review.avatar}
                  alt={review.customerName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {review.customerName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    {review.platform !== 'Direct' && (
                      <span className="text-xs text-gray-500">
                        via {review.platform}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm line-clamp-4">
                {review.reviewText}
              </p>
              <div className="mt-4 text-xs text-gray-500">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>
        ))}
          </div>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono text-gray-800">
                  {codeExample}
                </code>
              </pre>
              <div className="mt-4 space-y-4">
                <h3 className="font-medium">Integration Steps:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Install the Crotus package using your package manager</li>
                  <li>Import the WallOfLove component from crotus/react</li>
                  <li>Add your project ID from your dashboard settings</li>
                  <li>Customize the appearance using the available props</li>
                  <li>The component will automatically fetch and display your reviews</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default wall;