
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [username, setUsername] = useState<string>("");
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [debouncedUsername, setDebouncedUsername] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateProfile } = useAuth();
  const { supabase } = useAuth();
  
  const handleNext = () => {
    setStep(2);
  };
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (username.trim()) {
        setDebouncedUsername(username);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  useEffect(() => {
    if (debouncedUsername) {
      validateUsername(debouncedUsername);
    }
  }, [debouncedUsername]);

  const validateUsername = async (username: string) => {
    setIsChecking(true);
    setErrorMessage("");
    setIsValid(false);

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setErrorMessage("Username is required");
      setIsChecking(false);
      return false;
    }

    if (trimmedUsername.length < 3) {
      setErrorMessage("Username must be at least 3 characters long");
      setIsChecking(false);
      return false;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      setErrorMessage("Username can only contain letters, numbers, underscores, and hyphens");
      setIsChecking(false);
      return false;
    }

    try {
      // Check username uniqueness
      const { data, error } = await supabase
        .from('users')
        .select('username')
        .eq('username', trimmedUsername)
        .single();

      if (data) {
        setErrorMessage("This username is already taken");
        setIsChecking(false);
        return false;
      }

      setIsValid(true);
      return true;
    } catch (error) {
      console.error('Error checking username:', error);
      setErrorMessage("Error checking username availability");
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const handleComplete = async () => {
    if (!await validateUsername(username)) {
      toast({
        title: "Invalid username",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    try {
      // Update user profile in Supabase
      const { error } = await updateProfile({
        username: username,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      // Redirect to reviews page
      toast({
        title: "Onboarding complete",
        description: "Your collection link is ready to share!",
      });

      navigate("/dashboard/reviews");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update username. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg p-8">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg p-8 flex justify-center">
              <div className="bg-white border rounded-md w-4/5 p-6 flex flex-col items-center">
                <div className="flex space-x-1 text-emerald-600">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <div className="bg-gray-200 h-4 w-3/4 rounded mt-4"></div>
                <div className="bg-gray-200 h-4 w-2/3 rounded mt-2"></div>
                
                <div className="flex items-center mt-6">
                  <div className="bg-emerald-600 h-5 w-5 rounded-full"></div>
                  <div className="bg-gray-200 h-4 w-24 rounded ml-2"></div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Welcome to crotus! 🎉</h1>
              <p className="text-gray-600">I'm glad to have you onboard. Let's get you up and running.</p>
            </div>

            <div className="flex justify-center space-x-2 pt-8">
              <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
              <div className="h-2 w-2 rounded-full bg-gray-200"></div>
            </div>

            <Button 
              onClick={handleNext} 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Next
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-50 p-4 rounded-full">
                <Link className="h-6 w-6 text-emerald-600" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Choose your username</h1>
              <p className="text-gray-600">This will be your public collection link.</p>
            </div>

            <div className="mt-6">
              <div className="flex">
                <div className="bg-gray-100 border-y border-l rounded-l-md px-3 py-2 text-gray-500">
                  crotus.io/
                </div>
                <Input 
                  value={username}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUsername(value);
                    if (!value.trim()) {
                      setIsValid(true);
                      setErrorMessage("");
                    }
                  }}
                  placeholder="username"
                  className={`rounded-l-none ${!isValid ? 'border-red-500' : ''}`}
                  disabled={isChecking}
                />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your shareable URL to collect reviews
                </p>
                {username && isValid && !isChecking && (
                  <p className="text-sm text-emerald-600 mt-1 font-medium">
                    crotus.io/{username}
                  </p>
                )}
                {errorMessage && (
                  <p className="text-sm text-red-500 mt-1">
                    {errorMessage}
                  </p>
                )}
                {isChecking && (
                  <p className="text-sm text-gray-500 mt-1">
                    Checking username availability...
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center space-x-2 pt-8">
              <div className="h-2 w-2 rounded-full bg-gray-200"></div>
              <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
            </div>

            <Button 
              onClick={handleComplete} 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Complete
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default OnboardingPage;
