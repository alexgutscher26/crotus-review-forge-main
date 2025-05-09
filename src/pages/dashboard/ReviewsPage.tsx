import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Settings, Star, Check, X, ArrowRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  avatar: string;
  role: string;
  company?: string;
  rating: number;
  comment: string;
  date: string;
  status: "approved" | "pending" | "rejected";
  optimized: boolean;
}

const ReviewsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Mock data for reviews - 10 reviews total for pagination example
  const allReviews: Review[] = [
    {
      id: 1,
      name: "Mollie",
      avatar: "",
      role: "Sr. Software Engineer",
      rating: 5,
      comment: "As a software engineer, I'm pretty picky about my tools. Yours has a clean UI, syncs like a charm, and actually gets how we work.",
      date: "Feb 27, 2025",
      status: "approved",
      optimized: true
    },
    {
      id: 2,
      name: "Vincent",
      avatar: "",
      role: "Marketing Lead",
      company: "at Eightball",
      rating: 5,
      comment: "This app changed my productivity game. The interface is super intuitive, and I love how it syncs across all my devices.",
      date: "Feb 27, 2025",
      status: "approved",
      optimized: true
    },
    {
      id: 3,
      name: "Sarah Chen",
      avatar: "",
      role: "UX Designer",
      company: "at Designify",
      rating: 4,
      comment: "Great experience overall! The tool has most features I need, though I'd love to see more customization options.",
      date: "Feb 25, 2025",
      status: "pending",
      optimized: false
    },
    {
      id: 4,
      name: "James Wilson",
      avatar: "",
      role: "Product Manager",
      rating: 5,
      comment: "Absolutely game-changing for our team's workflow. The interface is clean and the learning curve is minimal.",
      date: "Feb 24, 2025",
      status: "approved",
      optimized: true
    },
    {
      id: 5,
      name: "Elena Rodriguez",
      avatar: "",
      role: "Front-end Developer",
      company: "at TechWave",
      rating: 3,
      comment: "Good tool with potential, but has some performance issues when handling larger projects.",
      date: "Feb 23, 2025",
      status: "pending",
      optimized: false
    },
    {
      id: 6,
      name: "Michael Brown",
      avatar: "",
      role: "CTO",
      company: "at Startup Hub",
      rating: 5,
      comment: "This solution drastically improved our team's productivity. The integrations are seamless.",
      date: "Feb 22, 2025",
      status: "approved",
      optimized: true
    },
    {
      id: 7,
      name: "Lisa Park",
      avatar: "",
      role: "Content Strategist",
      rating: 4,
      comment: "Very helpful for organizing our content calendar. I wish the export options were more flexible though.",
      date: "Feb 21, 2025",
      status: "approved",
      optimized: false
    },
    {
      id: 8,
      name: "David Thompson",
      avatar: "",
      role: "Data Analyst",
      company: "at DataDrive",
      rating: 5,
      comment: "The reporting features are outstanding. Makes data visualization so much easier for our team.",
      date: "Feb 20, 2025",
      status: "pending",
      optimized: true
    },
    {
      id: 9,
      name: "Aisha Johnson",
      avatar: "",
      role: "Project Manager",
      rating: 4,
      comment: "Solid tool that's helped us streamline our processes. The learning curve was a bit steeper than expected.",
      date: "Feb 19, 2025",
      status: "approved",
      optimized: true
    },
    {
      id: 10,
      name: "Robert Kim",
      avatar: "",
      role: "Engineering Lead",
      company: "at TechCorp",
      rating: 5,
      comment: "Best in class for developer experience. The API documentation and integrations are top-notch.",
      date: "Feb 18, 2025",
      status: "approved",
      optimized: false
    }
  ];

  // Pagination settings
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allReviews.length / itemsPerPage);
  
  // Get current reviews
  const getCurrentReviews = () => {
    const indexOfLastReview = currentPage * itemsPerPage;
    const indexOfFirstReview = indexOfLastReview - itemsPerPage;
    return allReviews.slice(indexOfFirstReview, indexOfLastReview);
  };
  
  const currentReviews = getCurrentReviews();

  // Reviews count for display
  const reviewsCount = allReviews.length;

  // Open review details dialog
  const openDetails = (review: Review) => {
    setSelectedReview(review);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reviews</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Your reviews</h1>
          <Badge variant="outline" className="text-sm">{reviewsCount}</Badge>
        </div>
        <p className="text-muted-foreground mt-2 text-lg">
          Manage all your reviews in one place and approve the ones you like.
        </p>
      </div>
      
      {/* Review Cards */}
      <div className="space-y-6 mt-8">
        {currentReviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Avatar and User Info */}
              <div className="flex flex-col items-center w-full md:w-auto">
                <Avatar className="h-20 w-20 mb-2">
                  {review.avatar ? (
                    <AvatarImage src={review.avatar} alt={review.name} />
                  ) : (
                    <AvatarFallback className="text-xl">
                      {review.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h3 className="font-medium text-center">{review.name}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {review.role} {review.company && review.company}
                </p>
              </div>

              {/* Review Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < review.rating ? "#F59E0B" : "none"}
                      className={`h-5 w-5 ${i < review.rating ? "text-crotus-orange" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                
                <p className="text-base">{review.comment}</p>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {review.date}
                  </span>
                  {review.optimized && (
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      Optimized
                    </span>
                  )}
                </div>
              </div>

              {/* Review Actions */}
              <div className="flex flex-col items-end gap-2">
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" /> Options
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48" align="end">
                      <div className="grid gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                          onClick={() => openDetails(review)}
                        >
                          Details
                        </Button>
                        {review.status !== "rejected" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4 mr-2" /> Reject
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start text-destructive hover:text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="mt-1">
                  <Badge 
                    variant={review.status === "approved" ? "default" : "outline"} 
                    className={`${
                      review.status === "approved" 
                        ? "bg-green-100 hover:bg-green-100 text-green-800 border-green-200" 
                        : review.status === "pending" 
                          ? "bg-yellow-100 hover:bg-yellow-100 text-yellow-800 border-yellow-200" 
                          : "bg-red-100 hover:bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {review.status === "approved" && <Check className="h-3 w-3 mr-1" />}
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)} {review.status === "approved" && "🎉"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    setCurrentPage(prev => prev - 1);
                  }
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink 
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    setCurrentPage(prev => prev + 1);
                  }
                }}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Review Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedReview && (
            <>
              <DialogHeader>
                <DialogTitle>Review Details</DialogTitle>
                <DialogDescription>
                  Full details for review by {selectedReview.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {selectedReview.avatar ? (
                      <AvatarImage src={selectedReview.avatar} alt={selectedReview.name} />
                    ) : (
                      <AvatarFallback>{selectedReview.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{selectedReview.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedReview.role} {selectedReview.company && selectedReview.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < selectedReview.rating ? "#F59E0B" : "none"}
                      className={`h-4 w-4 ${i < selectedReview.rating ? "text-crotus-orange" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {selectedReview.date}
                  </span>
                </div>
                
                <p className="text-base">{selectedReview.comment}</p>
                
                <div className="flex gap-3 pt-4 border-t">
                  {selectedReview.status !== "approved" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-1" /> Approve
                    </Button>
                  )}
                  {selectedReview.status !== "rejected" && (
                    <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsPage;
