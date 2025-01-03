// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMessage, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import api from '../services/api';

export const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'verified' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Verification token:", token); // Add this line
    if (!token) {
      setStatus('error');
      setErrorMessage('No verification token provided');
      toast({
        title: "Invalid Token",
        description: "No verification token provided.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const verifyEmail = async () => {
        try {
          const response = await api.get(`verify-email/${token}`, {
            headers: {
              'Accept': 'application/json',
            },
          });

        if (response.status === 200) {
          setStatus('verified');
          toast({
            title: "Email Verified",
            description: "Your email has been successfully verified. You can now log in.",
            variant: "success",
            duration: 3000,
          });
          // Automatically redirect to login after 3 seconds
          setTimeout(() => navigate('/login'), 5000);
        }
      } catch (error) {
        setStatus('error');
        const message = error.response?.data?.error || 'Failed to verify email. Please try again.';
        setErrorMessage(message);
        toast({
          title: "Verification Failed",
          description: message,
          variant: "destructive",
          duration: 3000,
        });
      }
    };

    verifyEmail();
  }, [token, toast, navigate]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Verifying your email address...</p>
          </div>
        );
      
      case 'verified':
        return (
          <Alert className="border-green-500 bg-green-500/10">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your email has been verified. You will be redirected to the login page...
            </AlertDescription>
          </Alert>
        );
      
      case 'error':
        return (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardMessage>
            {status === 'verifying' ? 'Please wait while we verify your email' : 'Email verification status'}
          </CardMessage>
        </CardHeader>
        
        <CardContent>
          {renderContent()}
        </CardContent>

        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant={status === 'verified' ? 'default' : 'outline'}>
            <Link to="/login">Go to Login</Link>
          </Button>
          {status === 'error' && (
            <Button asChild variant="outline">
              <Link to="/resend-verification">Resend Verification</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;