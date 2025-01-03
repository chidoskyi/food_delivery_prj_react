// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';

const FoodDetail = () => {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchFoodDetail = async () => {
      setLoading(true);
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/foods/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food details');
        }
        const data = await response.json();
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/meals" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back to Meals
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={food.image} 
            alt={food.name} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
          <p className="text-gray-600 mb-4">{food.category}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-orange-600 mr-2">${food.price.toFixed(2)}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={index < food.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 mb-6">{food.description}</p>
          <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
          <ul className="list-disc list-inside mb-6">
            {food.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
          <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;