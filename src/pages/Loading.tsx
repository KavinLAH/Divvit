import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Loading = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Simulate loading delay
      const timer = setTimeout(() => {
        navigate("/home");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

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
