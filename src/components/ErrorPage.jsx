// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state?.error || 'An unexpected error occurred';

  const getErrorMessage = () => {
    switch (error) {
      case 'NoSocialAccount':
        return 'No social account was found associated with your login.';
      case 'NoGoogleToken':
        return 'Unable to retrieve Google authentication token.';
      case 'InvalidToken':
        return 'The authentication token is invalid or has expired.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-16 w-16 text-red-500" />
          <h1 className="text-3xl font-bold text-foreground">
            Authentication Error
          </h1>
          <p className="text-lg text-muted-foreground">
            {getErrorMessage()}
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Button
            onClick={() => navigate('/login')}
            className="w-full"
            variant="default"
          >
            Return to Login
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="w-full"
            variant="outline"
          >
            Go to Home
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          If this error persists, please contact support for assistance.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;