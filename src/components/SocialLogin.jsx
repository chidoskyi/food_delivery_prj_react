// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SocialLogin = () => {
  const baseUrl = 'https://food-api-o58i.onrender.com/api';

  const handleSocialLogin = (provider) => {
    window.location.href = `${baseUrl}/accounts/${provider}/login/`;
  };

  return (
    <div className="flex flex-col space-y-4">
      <Button 
        onClick={() => handleSocialLogin('google')}
        variant="outline"
        className="flex items-center justify-center space-x-2 w-full"
      >
        <FaGoogle className="mr-2" />
        <span>Continue with Google</span>
      </Button>
      
      <Button 
        onClick={() => handleSocialLogin('github')}
        variant="outline"
        className="flex items-center justify-center space-x-2 w-full"
      >
        <FaGithub className="mr-2" />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  );
};

export default SocialLogin;



// import React from 'react';
// import { Button } from "@/components/ui/button";
// import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
// const Url = 'http://localhost:8000';


// const SocialLogin = () => {
//   const handleGoogleLogin = () => {
//     window.location.href = `${Url}/accounts/google/login/`;
//   };

//   const handleFacebookLogin = () => {
//     // Implement Facebook login
//     console.log('Facebook login not implemented yet');  
//   };

//   const handleAppleLogin = () => {
//     // Implement Apple login
//     console.log('Apple login not implemented yet');
//   };

//   return (
//     <div className="flex flex-col space-y-4">
//       <Button onClick={handleGoogleLogin} className="flex items-center justify-center space-x-2">
//         <FaGoogle />
//         <span>Continue with Google</span>
//       </Button>
//       <Button onClick={handleFacebookLogin} className="flex items-center justify-center space-x-2">
//         <FaFacebook />
//         <span>Continue with Facebook</span>
//       </Button>
//       <Button onClick={handleAppleLogin} className="flex items-center justify-center space-x-2">
//         <FaApple />
//         <span>Continue with Apple</span>
//       </Button>
//     </div>
//   );
// };

// export default SocialLogin;

