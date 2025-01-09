import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import Delivery from "./components/Delivery";
import FoodDelivery from "./components/FoodDelivery";
import Featured from "./components/Featured";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Meals from "./components/Meals";
import Newsletter from "./components/Newsletter";
import { Contact } from "./components/Support";
import TopNav from "./components/TopNav";
import TopPicks from "./components/TopPicks";
import SearchPage from "./components/SearchPage";
import { Login } from "./components/Login";
import SignUp from "./components/SignUp";
import VerifyEmail from "./components/VerifyEmail";
import Profile from "./components/Profile";
import SocialLoginCallback from "./components/SocialLoginCallback";
import { ErrorPage } from "./components/ErrorPage";
import FoodDetail from "./components/FoodDetail";
import WishList from "./components/WishList";
import CheckoutPage from "./components/CheckoutPage";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Preloader from "./components/ui/preloader";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"; // Import useState and useEffect

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Show Preloader while loading */}
        {isLoading && <Preloader />}

        {/* Show main content after loading */}
        {!isLoading && (
          <>
            <ToastContainer />
            <TopNav />
            <Routes>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;