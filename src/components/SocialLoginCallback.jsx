// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from "@/hooks/use-toast";

const SocialLoginCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSocialLoginCallback, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the access token from URL parameters
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('access_token');
        const error = params.get('error');

        if (error) {
            console.error('Received error in callback:', error);
            throw new Error(`Authentication error: ${error}`);
          }

        if (!accessToken) {
            console.error('No access token received in callback');
            throw new Error('No access token received');
          }
        console.log("AccessToken found: ", accessToken);
        // Process the social login
        await handleSocialLoginCallback(accessToken);
        console.log('User data:', accessToken);
        toast({
          title: "Login Successful",
          description: "You have been successfully logged in.",
          variant: "success",
        });

        // Redirect to dashboard
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Social login callback error:', error);
        toast({
          title: "Login Failed",
          description: error.message || "An error occurred during login.",
          variant: "destructive",
        });
        navigate('/login', { replace: true });
      }
    };

    if (!isAuthenticated) {
      handleCallback();
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate, location, handleSocialLoginCallback,isAuthenticated, toast]);


  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Processing Login</h2>
        <p className="text-gray-600">Please wait while we complete your login...</p>
      </div>
    </div>
  );
};

export default SocialLoginCallback;




