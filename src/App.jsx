import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import Delivery from "./components/Delivery";
import FoodDelivery from "./components/FoodDelivery";
import Featured from "./components/Featured";
import { ToastContainer } from 'react-toastify';
import Footer from "./components/Footer";
import Meals from "./components/Meals";
import Newsletter from "./components/Newsletter";
import { Contact } from './components/Support';
import TopNav from "./components/TopNav";
import TopPicks from "./components/TopPicks";
import SearchPage from './components/SearchPage';
import './index.css'; // Adjust the path if needed
import { Login } from "./components/Login";
import SignUp from './components/SignUp';  // No curly braces around SignUp
import VerifyEmail from "./components/VerifyEmail";
import Profile from "./components/Profile";
import SocialLoginCallback from './components/SocialLoginCallback'; // Added SocialLoginCallback
import { ErrorPage } from './components/ErrorPage';
import FoodDetail from "./components/FoodDetail";
import WishList from "./components/WishList";
import CheckoutPage from "./components/CheckoutPage";
import NotFound from "./components/NotFound";
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    
    <Router>
      <div className="App">
      <ToastContainer /> 
        <TopNav />
        <Routes>
          {/* Route for the SearchPage */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/food-delivery" element={<FoodDelivery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/login/callback" element={<SocialLoginCallback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/meals/:id" element={<FoodDetail />} />
          {/* Default content */}
          <Route
            path="/"
            element={
              <>
                <Featured />
                <Delivery />
                <TopPicks />
                <Meals />
                <Categories />
                <Newsletter />
              </>
            }
          />
          {/* Catch-all route for invalid URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;