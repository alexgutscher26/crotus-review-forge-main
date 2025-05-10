
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/DashboardLayout";
import CollectionPage from "./pages/dashboard/CollectionPage";
import EmailsPage from "./pages/dashboard/EmailsPage";
import ImportPage from "./pages/dashboard/ImportPage";
import ReviewsPage from "./pages/dashboard/ReviewsPage";
import WallPage from "./pages/dashboard/WallPage";
import SingleReviewPage from "./pages/dashboard/SingleReviewPage";
import ApiKeyPage from "./pages/dashboard/ApiKeyPage";
import OnboardingPage from "./pages/Onboarding";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import FormEditorPage from "./pages/dashboard/FormEditorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/dashboard/reviews" replace />} />
                <Route path="collection" element={<CollectionPage />} />
                <Route path="emails" element={<EmailsPage />} />
                <Route path="import" element={<ImportPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="wall" element={<WallPage />} />
                <Route path="single" element={<SingleReviewPage />} />
                <Route path="api" element={<ApiKeyPage />} />
                <Route path="form/welcome" element={<FormEditorPage />} />
              </Route>
              <Route path="/onboarding" element={<OnboardingPage />} />
            </Route>

        
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
