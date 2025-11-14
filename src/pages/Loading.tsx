import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Loading = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, session } = useAuth();
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;

    // If user exists, redirect after short delay
    if (user && session) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 2000);

      return () => clearTimeout(timer);
    }

    // If no user after auth has loaded, check if email confirmation is needed
    if (!authLoading && !user) {
      // Wait a bit to see if session comes through
      const checkTimer = setTimeout(() => {
        // Check session one more time
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            navigate("/home");
          } else {
            // No session - likely needs email confirmation
            setTimeoutReached(true);
          }
        });
      }, 3000);

      return () => clearTimeout(checkTimer);
    }
  }, [user, session, authLoading, navigate]);

  // If timeout reached and no user, show message about email confirmation
  if (timeoutReached && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary via-primary/90 to-primary/80 px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-primary-foreground">
            <h2 className="text-2xl font-bold mb-4">Check your email!</h2>
            <p className="text-lg mb-6">
              We've sent you a confirmation email. Please click the link in the email to verify your account.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary via-primary/90 to-primary/80">
      <div className="text-center space-y-6">
        {/* Loading Circle Animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-4 border-primary-foreground/30"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-4 border-primary-foreground border-t-transparent animate-spin"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <p className="text-primary-foreground text-lg font-medium">
          Loading your next bill split...
        </p>
      </div>
    </div>
  );
};

export default Loading;
