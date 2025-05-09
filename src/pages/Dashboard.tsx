
import React, { useState } from "react";
import { useReviewStats } from "@/hooks/useReviewStats";
import { useReviews } from "@/hooks/useReviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { LayoutDashboard, Star, Share, Users, Settings, ArrowLeft, Search, Plus, Filter, Check, X } from "lucide-react";

const Dashboard: React.FC = () => {
  // Get real-time stats and reviews from Supabase
  const { stats: reviewStats, loading: statsLoading } = useReviewStats();
  const { reviews: allReviews, loading: reviewsLoading } = useReviews();
  const { reviews: pendingReviews } = useReviews('pending');
  const { reviews: approvedReviews } = useReviews('approved');
  const { reviews: rejectedReviews } = useReviews('rejected');

  // Get reviews based on selected tab
  const getReviewsByTab = (tab: string) => {
    switch (tab) {
      case 'pending':
        return pendingReviews;
      case 'approved':
        return approvedReviews;
      case 'rejected':
        return rejectedReviews;
      default:
        return allReviews;
    }
  };

  const [selectedTab, setSelectedTab] = useState('all');

  // Stats for the dashboard
  const stats = [
    { name: "Total Reviews", value: statsLoading ? "--" : String(reviewStats?.totalReviews || 0) },
    { name: "Average Rating", value: statsLoading ? "--" : String(reviewStats?.averageRating || 0) },
    { name: "Response Rate", value: statsLoading ? "--" : `${reviewStats?.responseRate || 0}%` },
    { name: "Conversion Rate", value: statsLoading ? "--" : `${reviewStats?.conversionRate || 0}%` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-white border-r">
        <div className="h-16 flex items-center px-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">Crotus.io</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-crotus-light-purple text-crotus-purple">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-gray-100">
            <Star className="h-5 w-5" />
            <span>Reviews</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-gray-100">
            <Share className="h-5 w-5" />
            <span>Embed</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-gray-100">
            <Users className="h-5 w-5" />
            <span>Customers</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-gray-100">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-10 h-16 flex items-center gap-4 border-b bg-white px-6">
          <Link to="/" className="md:hidden flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">Crotus.io</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden md:flex"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button size="sm" className="bg-crotus-purple hover:bg-crotus-dark-purple">
              Upgrade Plan
            </Button>
          </div>
        </header>
        
        {/* Dashboard content */}
        <div className="flex-1 p-6 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your reviews and see insights</p>
          </div>
          
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-muted-foreground">{stat.name}</div>
                  {statsLoading ? (
                    <div className="h-9 bg-gray-200 animate-pulse rounded mt-2"></div>
                  ) : (
                    <div className="text-3xl font-bold">{stat.value}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Reviews Management */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search reviews..." 
                    className="pl-8 h-9 w-full sm:w-[200px] rounded-md border bg-white px-3 py-1 text-sm shadow-sm" 
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                  <Button size="sm" className="bg-crotus-purple hover:bg-crotus-dark-purple">
                    <Plus className="mr-2 h-4 w-4" /> New Form
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setSelectedTab('all')}>All Reviews</TabsTrigger>
                <TabsTrigger value="pending" onClick={() => setSelectedTab('pending')}>Pending</TabsTrigger>
                <TabsTrigger value="approved" onClick={() => setSelectedTab('approved')}>Approved</TabsTrigger>
                <TabsTrigger value="rejected" onClick={() => setSelectedTab('rejected')}>Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4 space-y-4">
                {reviewsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading reviews...</div>
                ) : getReviewsByTab(selectedTab).map((review) => (
                  <Card key={review.id} className="overflow-hidden">
                    <div className={`h-1 ${
                      review.status === 'approved' 
                        ? 'bg-green-500' 
                        : review.status === 'pending' 
                          ? 'bg-orange-400' 
                          : 'bg-red-500'
                    }`}></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{review.name}</div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              review.status === 'approved' 
                                ? 'bg-green-100 text-green-800' 
                                : review.status === 'pending' 
                                  ? 'bg-orange-100 text-orange-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? "fill-crotus-orange text-crotus-orange" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <p className="text-sm mt-2">{review.comment}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          {review.status !== 'approved' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-green-500 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Check className="mr-1 h-4 w-4" /> Approve
                            </Button>
                          )}
                          {review.status !== 'rejected' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-500 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="mr-1 h-4 w-4" /> Reject
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="pending" className="mt-4">
                {pendingReviews.map((review) => (
                  <Card key={review.id} className="mb-4 overflow-hidden">
                    <div className="h-1 bg-orange-400"></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{review.name}</div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? "fill-crotus-orange text-crotus-orange" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <p className="text-sm mt-2">{review.comment}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-green-500 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="mr-1 h-4 w-4" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-500 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="mr-1 h-4 w-4" /> Reject
                          </Button>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="approved" className="mt-4">
                {approvedReviews.map((review) => (
                  <Card key={review.id} className="mb-4 overflow-hidden">
                    <div className="h-1 bg-green-500"></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{review.name}</div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? "fill-crotus-orange text-crotus-orange" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <p className="text-sm mt-2">{review.comment}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-500 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="mr-1 h-4 w-4" /> Reject
                          </Button>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="rejected" className="mt-4">
                {rejectedReviews.map((review) => (
                  <Card key={review.id} className="mb-4 overflow-hidden">
                    <div className="h-1 bg-red-500"></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{review.name}</div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? "fill-crotus-orange text-crotus-orange" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <p className="text-sm mt-2">{review.comment}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-green-500 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="mr-1 h-4 w-4" /> Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
