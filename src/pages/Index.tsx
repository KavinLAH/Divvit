import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import googleIcon from "@/assets/google-icon.png";
import appleIcon from "@/assets/apple-icon.png";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (isSignUp && !fullName) {
      toast({
        title: "Error",
        description: "Please enter your full name",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = isSignUp 
        ? await signUp(email, password, fullName)
        : await signIn(email, password);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Divvy Logo" className="h-16 w-16" />
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {isSignUp ? "Create your account" : "Login to your account"}
          </h1>
          <p className="text-base text-muted-foreground">
            Let's start splitting with Divvy!
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Input (Sign Up Only) */}
          {isSignUp && (
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-input-focus">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border-input-focus focus:border-input-focus"
              />
            </div>
          )}
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-input-focus">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-input-focus focus:border-input-focus"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-input focus:border-input-focus"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold rounded-xl"
          >
            {isLoading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
          </Button>

          {/* Toggle Sign Up/Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground">
              or sign up with
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            type="button"
            className="h-12 border-border hover:bg-secondary"
          >
            <img src={googleIcon} alt="Google" className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            type="button"
            className="h-12 border-border bg-black hover:bg-black/90"
          >
            <img src={appleIcon} alt="Apple" className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
