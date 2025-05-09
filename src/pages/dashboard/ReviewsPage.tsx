import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Settings, 
  Star, 
  Check, 
  X, 
  MoreVertical, 
  Calendar, 
  Search, 
  Filter, 
  Zap,
  Trash,
  Eye,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

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
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | "delete" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending" | "rejected">("all");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");

  // Mock data for reviews
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

  // Filter and search reviews
  const filteredReviews = useMemo(() => {
    return allReviews.filter(review => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (review.company && review.company.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Status filter
      const matchesStatus = statusFilter === "all" || review.status === statusFilter;
      
      // Rating filter
      const matchesRating = ratingFilter === "all" || review.rating === ratingFilter;
      
      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [allReviews, searchQuery, statusFilter, ratingFilter]);

  // Pagination settings
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  
  // Get current reviews
  const currentReviews = useMemo(() => {
    const indexOfLastReview = currentPage * itemsPerPage;
    const indexOfFirstReview = indexOfLastReview - itemsPerPage;
    return filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  }, [filteredReviews, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, ratingFilter]);

  // Open review details dialog
  const openDetails = (review: Review) => {
    setSelectedReview(review);
    setDetailsOpen(true);
  };

  // Handle review actions
  const handleAction = (review: Review, action: "approve" | "reject" | "delete") => {
    setSelectedReview(review);
    setActionType(action);
    setConfirmDialogOpen(true);
  };

  // Confirm action
  const confirmAction = () => {
    if (!selectedReview || !actionType) return;
    
    // In a real app, you would make API calls here
    console.log(`${actionType} review with id: ${selectedReview.id}`);
    
    // Close dialogs
    setConfirmDialogOpen(false);
    setDetailsOpen(false);
    
    // Reset states
    setSelectedReview(null);
    setActionType(null);
  };

  // Get status badge variant
  const getStatusBadge = (status: "approved" | "pending" | "rejected") => {
    switch (status) {
      case "approved":
        return { 
          bg: "bg-green-100", 
          text: "text-green-800", 
          border: "border-green-200",
          icon: <CheckCircle2 className="h-3 w-3 mr-1" />
        };
      case "pending":
        return { 
          bg: "bg-yellow-100", 
          text: "text-yellow-800", 
          border: "border-yellow-200",
          icon: <AlertTriangle className="h-3 w-3 mr-1" />
        };
      case "rejected":
        return { 
          bg: "bg-red-100", 
          text: "text-red-800", 
          border: "border-red-200",
          icon: <X className="h-3 w-3 mr-1" />
        };
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    console.log("Exporting reviews to CSV");
    // Implementation would go here
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reviews</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Your reviews</h1>
            <Badge variant="outline" className="text-sm">{filteredReviews.length}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Manage customer feedback and testimonials in one place
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToCSV}
            className="text-sm"
          >
            Export
          </Button>
          <Button size="sm" className="text-sm">
            Add testimonial
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search reviews..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select 
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as any)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={ratingFilter.toString()}
                onValueChange={(value) => setRatingFilter(value === "all" ? "all" : parseInt(value))}
              >
                <SelectTrigger className="w-32">
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
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Review Cards */}
      <div className="space-y-4">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <Card key={review.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* Avatar and User Info */}
                    <div className="flex flex-col items-center md:w-48">
                      <Avatar className="h-16 w-16 mb-2">
                        {review.avatar ? (
                          <AvatarImage src={review.avatar} alt={review.name} />
                        ) : (
                          <AvatarFallback className="text-lg bg-primary/10">
                            {review.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <h3 className="font-medium text-center">{review.name}</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">
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
                            className={`h-4 w-4 ${i < review.rating ? "text-amber-500" : "text-muted-foreground"}`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      
                      <p className="text-sm">{review.comment}</p>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {review.date}
                        </span>
                        {review.optimized && (
                          <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-50">
                            <Zap className="h-3 w-3" />
                            Optimized
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Review Status and Actions */}
                    <div className="flex md:flex-col justify-between items-end md:w-32">
                      <Badge 
                        variant="outline" 
                        className={`${getStatusBadge(review.status).bg} ${getStatusBadge(review.status).text} ${getStatusBadge(review.status).border} flex items-center`}
                      >
                        {getStatusBadge(review.status).icon}
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => openDetails(review)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View details
                          </DropdownMenuItem>
                          {review.status !== "approved" && (
                            <DropdownMenuItem onClick={() => handleAction(review, "approve")}>
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {review.status !== "rejected" && (
                            <DropdownMenuItem onClick={() => handleAction(review, "reject")}>
                              <X className="h-4 w-4 mr-2 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleAction(review, "delete")}
                            className="text-red-600"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
            <Search className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No reviews found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Empty state when no reviews match filters */}
      {filteredReviews.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 bg-muted/20 border border-dashed rounded-lg">
          <div className="mb-4 p-3 bg-primary/10 rounded-full">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-1">No reviews found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            We couldn't find any reviews matching your current filters. 
            Try adjusting your search criteria or clear filters.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setRatingFilter("all");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
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
            
            {[...Array(totalPages)].map((_, index) => {
              // Show first page, last page, and pages around current page
              if (
                index === 0 || 
                index === totalPages - 1 || 
                (index >= currentPage - 2 && index <= currentPage)
              ) {
                return (
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
                );
              } else if (
                index === 1 && currentPage > 3 || 
                index === totalPages - 2 && currentPage < totalPages - 2
              ) {
                return (
                  <PaginationItem key={index}>
                    <span className="px-2">...</span>
                  </PaginationItem>
                );
              }
              return null;
            })}
            
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
                  <Avatar className="h-12 w-12">
                    {selectedReview.avatar ? (
                      <AvatarImage src={selectedReview.avatar} alt={selectedReview.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10">{selectedReview.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{selectedReview.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedReview.role} {selectedReview.company && selectedReview.company}
                    </p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={`ml-auto ${getStatusBadge(selectedReview.status).bg} ${getStatusBadge(selectedReview.status).text} ${getStatusBadge(selectedReview.status).border} flex items-center`}
                  >
                    {getStatusBadge(selectedReview.status).icon}
                    {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < selectedReview.rating ? "#F59E0B" : "none"}
                      className={`h-4 w-4 ${i < selectedReview.rating ? "text-amber-500" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {selectedReview.date}
                  </span>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-md">
                  <p className="text-base italic">"{selectedReview.comment}"</p>
                </div>
                
                {selectedReview.optimized && (
                  <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                    <Zap className="h-4 w-4" />
                    <span>This review has been optimized for marketing materials</span>
                  </div>
                )}
                
                <DialogFooter className="flex gap-3 sm:justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => handleAction(selectedReview, "delete")}
                  >
                    <Trash className="h-4 w-4 mr-1" /> Delete
                  </Button>
                  
                  <div className="flex gap-2">
                    {selectedReview.status !== "rejected" && (
                      <Button 
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleAction(selectedReview, "reject")}
                      >
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    )}
                    {selectedReview.status !== "approved" && (
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAction(selectedReview, "approve")}
                      >
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                    )}
                  </div>
                </DialogFooter>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve Review"}
              {actionType === "reject" && "Reject Review"}
              {actionType === "delete" && "Delete Review"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" && "Are you sure you want to approve this review? It will be published on your website."}
              {actionType === "reject" && "Are you sure you want to reject this review? It will be hidden from your website."}
              {actionType === "delete" && "Are you sure you want to delete this review? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex sm:justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </DialogClose>
            <Button 
              size="sm"
              className={
                actionType === "approve" ? "bg-green-600 hover:bg-green-700" :
                actionType === "reject" ? "bg-amber-600 hover:bg-amber-700" :
                "bg-red-600 hover:bg-red-700"
              }
              onClick={confirmAction}
            >
              {actionType === "approve" && <Check className="h-4 w-4 mr-1" />}
              {actionType === "reject" && <X className="h-4 w-4 mr-1" />}
              {actionType === "delete" && <Trash className="h-4 w-4 mr-1" />}
              {actionType?.charAt(0).toUpperCase() + actionType?.slice(1)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsPage;