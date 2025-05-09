import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Code2, Search, Filter, ChevronDown, ChevronUp, Calendar, ExternalLink } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface Review {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  reviewText: string;
  date: string;
  platform: string;
  verified?: boolean;
}

const WallPage = () => {
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterPlatform, setFilterPlatform] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [platformFilters, setPlatformFilters] = useState<Record<string, boolean>>({
    All: true,
    Google: true,
    Trustpilot: true,
    Yelp: true,
    Direct: true,
  });
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<string>("grid");

  // Mock data for reviews - expanded with more examples and variations
  const allReviews: Review[] = [
    {
      id: "1",
      customerName: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      reviewText: "Absolutely love this service! It has streamlined our review collection process and helped us showcase our customer feedback beautifully. The interface is so intuitive that even our less tech-savvy team members got the hang of it quickly.",
      date: "2024-02-15",
      platform: "Direct",
      verified: true
    },
    {
      id: "2",
      customerName: "Michael Chen",
      avatar: "/api/placeholder/40/40",
      rating: 4,
      reviewText: "Great platform for managing customer reviews. The interface is intuitive and the features are exactly what we needed. I especially appreciate the export options and analytics dashboard.",
      date: "2024-02-08",
      platform: "Google"
    },
    {
      id: "3",
      customerName: "Emma Davis",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      reviewText: "This tool has helped us build trust with potential customers by showcasing authentic reviews. Highly recommended! Our conversion rate improved by 27% within the first month of implementation.",
      date: "2024-01-29",
      platform: "Direct",
      verified: true
    },
    {
      id: "4",
      customerName: "James Wilson",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      reviewText: "The Wall of Love feature has significantly increased our conversion rates. Customers trust us more when they see real reviews. The customization options are extensive and allowed us to match our brand perfectly.",
      date: "2024-01-22",
      platform: "Trustpilot"
    },
    {
      id: "5",
      customerName: "Olivia Martinez",
      avatar: "/api/placeholder/40/40",
      rating: 4,
      reviewText: "Easy to set up and customize. We've integrated it into our homepage and it looks fantastic. Would like to see more animation options in the future.",
      date: "2024-01-14",
      platform: "Yelp"
    },
    {
      id: "6",
      customerName: "Daniel Kim",
      avatar: "/api/placeholder/40/40",
      rating: 3,
      reviewText: "Good service overall. Would like to see more customization options for the display layout. The customer support was responsive when I had questions about implementation.",
      date: "2024-01-05",
      platform: "Direct"
    },
    {
      id: "7",
      customerName: "Alexandra Wong",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      reviewText: "I've tried several review management tools and this is by far the best. The Wall of Love component integrates seamlessly with our existing design and the automatic review collection saves us hours of work every week.",
      date: "2024-01-12",
      platform: "Google",
      verified: true
    },
    {
      id: "8",
      customerName: "Robert Garcia",
      avatar: "/api/placeholder/40/40",
      rating: 4,
      reviewText: "Very satisfied with the functionality and ease of use. The only thing I'd suggest improving is adding more advanced filtering options for larger review volumes.",
      date: "2024-01-18",
      platform: "Trustpilot"
    },
    {
      id: "9",
      customerName: "Sophia Lee",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      reviewText: "This platform transformed how we display testimonials on our site. The analytics provided give us valuable insights into which reviews resonate most with our visitors.",
      date: "2024-02-01",
      platform: "Yelp",
      verified: true
    }
  ];

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle expanding/collapsing review text
  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  // Filter and sort reviews
  const getFilteredAndSortedReviews = () => {
    let filteredReviews = [...allReviews];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredReviews = filteredReviews.filter(
        (review) => 
          review.customerName.toLowerCase().includes(query) ||
          review.reviewText.toLowerCase().includes(query)
      );
    }

    // Apply rating filter
    if (filterRating !== 'all') {
      filteredReviews = filteredReviews.filter(
        (review) => review.rating === parseInt(filterRating)
      );
    }

    // Apply platform filters
    if (filterPlatform !== 'all') {
      filteredReviews = filteredReviews.filter(
        (review) => review.platform === filterPlatform
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
  const uniquePlatforms = Array.from(new Set(allReviews.map(review => review.platform)));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderReviewCard = (review: Review, isExpanded: boolean) => {
    const isLongText = review.reviewText.length > 150;
    const displayText = isLongText && !isExpanded 
      ? `${review.reviewText.substring(0, 150)}...` 
      : review.reviewText;
      
    return (
      <Card key={review.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <img
              src={review.avatar}
              alt={`${review.customerName}'s avatar`}
              className="w-12 h-12 rounded-full bg-gray-100"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900 truncate">
                  {review.customerName}
                  {review.verified && (
                    <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 text-xs">Verified</Badge>
                  )}
                </h3>
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(review.date)}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">{renderStars(review.rating)}</div>
                {review.platform !== 'Direct' && (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    via {review.platform}
                    <ExternalLink className="h-3 w-3" />
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-700 text-sm">
              {displayText}
            </p>
            {isLongText && (
              <button 
                onClick={() => toggleReviewExpansion(review.id)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="h-3 w-3 ml-1" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="h-3 w-3 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
          
          {/* Platform badge */}
          <div className="mt-4 flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`${
                review.platform === 'Google' 
                  ? 'bg-blue-50 text-blue-600' 
                  : review.platform === 'Trustpilot' 
                  ? 'bg-green-50 text-green-600'
                  : review.platform === 'Yelp'
                  ? 'bg-red-50 text-red-600'
                  : 'bg-purple-50 text-purple-600'
              }`}
            >
              {review.platform}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSkeletonCard = (index: number) => (
    <Card key={`skeleton-${index}`} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-2" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4" />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-6 w-20" />
        </div>
      </CardContent>
    </Card>
  );

  const codeExample = `// Example code for integrating the improved Wall of Love component
import { WallOfLove } from '@crotus/react';

export default function ReviewWall() {
  return (
    <WallOfLove
      projectId="your_project_id"
      theme="light" // Options: light, dark, auto
      layout="grid" // Options: grid, list, carousel, masonry
      perPage={9}
      sorting={{
        enabled: true,
        default: "newest" // Options: newest, oldest, highest, lowest
      }}
      filtering={{
        enabled: true,
        ratings: true,
        platforms: true, // Filter by review source
        search: true, // Enable text search
        verified: true // Filter by verified status
      }}
      animation={{
        enabled: true,
        type: "fade", // Options: fade, slide, scale
        duration: 300
      }}
      customization={{
        borderRadius: "0.5rem",
        cardBackground: "#ffffff",
        textColor: "#333333",
        starColor: "#FFD700",
        fontFamily: "inherit",
        shadows: true,
        hover: true
      }}
      analytics={{
        enabled: true, // Track interactions
        clickEvents: true, // Track when reviews are clicked
        filterEvents: true // Track filter usage
      }}
    />
  );
}`;

  const installationCommand = `pnpm add @crotus/react`;

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
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Wall of Love</h1>
          <p className="text-muted-foreground mt-2">
            Showcase your customer reviews and build trust with potential customers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-600 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Connected
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-600">
            {reviews.length} Reviews
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="preview" className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:w-[400px]">
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
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search reviews..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-shrink-0"
                >
                  Grid
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-shrink-0"
                >
                  List
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
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
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Rating" />
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

              <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  {uniquePlatforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="default" className="gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuCheckboxItem
                    checked={platformFilters.All}
                    onCheckedChange={(checked) => 
                      setPlatformFilters(prev => ({ ...prev, All: checked }))}
                  >
                    All Platforms
                  </DropdownMenuCheckboxItem>
                  {uniquePlatforms.map((platform) => (
                    <DropdownMenuCheckboxItem
                      key={platform}
                      checked={platformFilters[platform]}
                      onCheckedChange={(checked) => 
                        setPlatformFilters(prev => ({ ...prev, [platform]: checked }))}
                    >
                      {platform}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Reviews Grid/List */}
          <div className={`
            ${viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-6"}
          `}>
            {isLoading 
              ? Array.from({ length: 6 }).map((_, index) => renderSkeletonCard(index))
              : reviews.length > 0 
                ? reviews.map((review) => renderReviewCard(review, !!expandedReviews[review.id]))
                : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-gray-100 rounded-full p-4 mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium">No reviews found</h3>
                    <p className="text-muted-foreground mt-1">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                )
            }
          </div>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">1. Install the package</h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono text-gray-800">
                  {installationCommand}
                </code>
              </pre>
              
              <h3 className="font-medium mt-6 mb-4">2. Import and use the component</h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono text-gray-800">
                  {codeExample}
                </code>
              </pre>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Integration Features:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-600">Display Options</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Grid, list, carousel, and masonry layouts</li>
                      <li>Responsive design with mobile optimization</li>
                      <li>Custom animation effects</li>
                      <li>Light/dark/auto theming</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-green-600">Data Management</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Automatic review collection from multiple platforms</li>
                      <li>Review moderation tools</li>
                      <li>Review insights and analytics</li>
                      <li>API for custom integration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-purple-600">User Experience</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Advanced filtering and sorting options</li>
                      <li>Full text search capability</li>
                      <li>Expandable review content</li>
                      <li>Keyboard navigation support</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-orange-600">Analytics</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Review engagement tracking</li>
                      <li>Filter usage analytics</li>
                      <li>Conversion rate impact analysis</li>
                      <li>Custom event tracking</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> Your reviews are automatically synced from your Crotus dashboard. 
                    Any new reviews collected will appear in your Wall of Love without requiring code changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WallPage;