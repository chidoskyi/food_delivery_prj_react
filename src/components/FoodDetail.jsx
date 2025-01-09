// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import {CartContext} from '../hooks/CartContext';

const FoodDetail = () => {
  const { addToCart } = React.useContext(CartContext);
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for selected quantity
  const { id } = useParams();

  useEffect(() => {
    const fetchFoodDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/meals/${id}/`);
        console.log('Fetching from:', `${import.meta.env.VITE_API_URL}/meals/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch food details');
        }
        const data = await response.json();
        console.log('Food Data:', data); // Debugging
        setFood(data);
      } catch (err) {
        setError('An error occurred while fetching food details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetail();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10)); // Update quantity state
  };

  const handleAddToCart = () => {
    // Add logic to handle adding to cart with the selected quantity
    console.log(`Added ${quantity} ${food.title}(s) to cart`);
    // You can call an API or update a global state here
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!food) {
    return <div className="text-center">Food item not found.</div>;
  }

  return (
    <div className="max-w-8xl mx-auto px-4 py-8 pt-32 ">
      <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back to Meals
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={food.image_url || food.image} 
            alt={food.title} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{food.title}</h1>
          <p className="text-gray-600 mb-4">
            Category: {food.category ? food.category.title : "No category"}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-orange-600 mr-2">
              ${food.price} {/* No need for toFixed(2) since price is a string */}
            </span>
            {/* Rating is optional */}
            {food.rating && (
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className={index < (food.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Description is optional */}
          {food.description && (
            <p className="text-gray-700 mb-6">{food.description}</p>
          )}
          <div className="flex items-center gap-4">
            <select
              value={quantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 rounded-lg cursor-pointer px-3 py-2 focus:outline-none focus:border-orange-600"
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <button
              onClick={() => addToCart({ ...food, quantity })}
              className="bg-orange-600 text-white py-2 px-4 border-none rounded-lg hover:bg-orange-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;