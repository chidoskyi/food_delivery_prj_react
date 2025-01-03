import axios from 'axios';


const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";
// const API_URL = 'http://localhost:8000/api'; // Update with Django backend URL.

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    // headers: {
    //     'Content-Type': 'application/json',
    // }
});

// Add response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response, // Return the response if there's no error
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await api.post('/api/token/refresh/', {
          refresh: refreshToken,
        });

        // Update the access token in localStorage
        const { access } = response.data;
        localStorage.setItem('accessToken', access);

        // Update the Authorization header for the original request
        originalRequest.headers['Authorization'] = `Bearer ${access}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Clear auth state and log the user out
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/'; // Redirect to login page
      }
    }

    // If the error is not a 401 or token refresh fails, reject the promise
    return Promise.reject(error);
  }
);

// api.interceptors.request.use(
//   (config) => {
//       const accessToken = localStorage.getItem(ACCESS_TOKEN);
//       if (accessToken) {
//           config.headers.Authorization = `Bearer ${accessToken}`;
//       }

//       const googleAccessToken = localStorage.getItem("GOOGLE_ACCESS_TOKEN");
//       if (googleAccessToken) {
//           config.headers["X-Google-Access-Token"] = googleAccessToken
//       }

//       return config;
//   },

//   (error) => {
//       return Promise.reject(error);
//   }
// );




export const setAuthToken = (token) => {
  if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('accessToken', token);
  } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('accessToken');
  }
};
// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };

// Email verification


export const verifyEmail = async (token) => {
  try {
      const response = await api.get(`verify-email/?token=${token}`);
      return response.data;
  } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
  }
};

// Social Login API calls
export const socialLogin = {
  // Get CSRF token
  getCSRFToken: async () => {
      try {
          await api.get('csrf/');
      } catch (error) {
          console.error('Error fetching CSRF token:', error);
          throw error;
      }
  },

  // Validate Google token
  validateGoogleToken: async (token) => {
      try {
          const response = await api.post('validate_token/', {
              access_token: token
          });
          return response.data;
      } catch (error) {
          console.error('Error validating Google token:', error);
          throw error;
      }
  },

  // Complete social login
  completeSocialLogin: async (accessToken) => {
      try {
          const response = await api.post('social-login-complete/', {
              access_token: accessToken
          });
          return response.data;
      } catch (error) {
          console.error('Error completing social login:', error);
          throw error;
      }
  },

//Meals 
// mealData: async () =>{
//   try {
//     const response = await api.get('meals/')
//     console.log(response.data); // See the data structure in the console
//     return response.data
//   } catch (error) {
//     console.error(ErrorPage);
//     throw error
//   }
// },

// mealDetails: async (id) => {
//   try {
//     const response = await api.get(`meals/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching meal details:', error);
//     throw error;
//   }
// },
  

  // Get user info
  getUserInfo: async () => {
      try {
          const response = await api.get('me/');
          return response.data;
      } catch (error) {
          console.error('Error fetching user info:', error);
          throw error;
      }
  },

  // Initiate social login with provider
  initiateLogin: (provider) => {
      window.location.href = `${import.meta.env.VITE_API_URL}/accounts/${provider}/login/`;
  },

  // Handle social login callback
  handleCallback: async (accessToken) => {
      try {
          // First validate the token
          const validationResponse = await socialLogin.validateGoogleToken(accessToken);
          
          if (!validationResponse.valid) {
              throw new Error('Invalid token');
          }

          // Set the token in axios headers
          setAuthToken(accessToken);

          // Get user info
          const userInfo = await socialLogin.getUserInfo();
          return userInfo;
      } catch (error) {
          console.error('Error handling social login callback:', error);
          setAuthToken(null);
          throw error;
      }
  }
};


export const fetchDashboardStats = async () => {
  try {
    const response = await api.get('/merchants/dashboard_stats/');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

export const fetchTransactions = async (filters = {}) => {
  try {
    const response = await api.get('/payments/merchant_transactions/', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const createApiKey = async (name) => {
  try {
    const response = await api.post('/api-keys/generate/', { name });
    return response.data;
  } catch (error) {
    console.error('Error creating API key:', error);
    throw error;
  }
};

export const updateMerchantSettings = async (settings) => {
  try {
    const response = await api.post('/merchants/update_settings/', settings);
    return response.data;
  } catch (error) {
    console.error('Error updating merchant settings:', error);
    throw error;
  }
};

export const fetchWebhookEvents = async () => {
  try {
    const response = await api.get('/webhook-events/merchant_events/');
    return response.data;
  } catch (error) {
    console.error('Error fetching webhook events:', error);
    throw error;
  }
};

export const getSupportedCurrencies = async () => {
  try {
    const response = await api.get('/merchants/supported_currencies/');
    return response.data;
  } catch (error) {
    console.error('Error fetching supported currencies:', error);
    throw error;
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await api.post('/payments/create_payment/', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentId, txHash) => {
  try {
    const response = await api.post(`/payments/${paymentId}/verify_payment/`, { tx_hash: txHash });
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};


// services/api.js
const API_BASE_URL = 'https://api.yourblog.com';

export const fetchBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  return response.json();
};

export const fetchBlogById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
  return response.json();
};

export const addComment = async (blogId, comment) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  return response.json();
};

export const toggleLike = async (blogId) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/like`, {
    method: 'POST',
  });
  return response.json();
};

export default api;

