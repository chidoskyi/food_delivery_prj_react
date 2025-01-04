import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
  const [filteredData, setFilteredData] = useState([]); // State for filtered results
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; // Get search query from URL
  const [mealsCache, setMealsCache] = useState([]); // Cache for meal data
  const [meals, setMeals] = useState([]); // State to store all meals

  // Fetch all meals from the API (only if cache is empty)
  useEffect(() => {
    const fetchMeals = async () => {
      if (mealsCache.length === 0) { // Fetch only if cache is empty
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/meals/`);
          setMealsCache(response.data.meals); // Store data in cache
          setMeals(response.data.meals); // Set initial data
        } catch (error) {
          console.error('Error fetching meals:', error);
        }
      } else {
        setMeals(mealsCache); // Use cached data
      }
    };

    fetchMeals();
  }, [mealsCache]);

  // Filter meals based on the search query
  useEffect(() => {
    if (query) {
      const results = mealsCache.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData(mealsCache); // Show all meals if no query
    }
  }, [query, mealsCache]);

  return (
    <div className="max-w-[1520px] m-auto px-4 py-20">
      <h1 className="text-orange-500 font-bold text-center text-3xl py-2">
        Search Results
      </h1>
      <p className="text-gray-400">
        Showing results for: <strong>{query}</strong>
      </p>

      {/* Search results grid */}
      <div className="grid md:grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.uid}
              className="border-none shadow-lg hover:scale-105 duration-300"
            >
              <Link to={`/meals/${item.uid}`}>
                <img
                  loading="lazy"
                  className="w-full h-[200px] object-cover rounded-t-lg"
                  src={item.image_url || item.image}
                  alt={item.title}
                />
              </Link>
              <div className="flex justify-between px-2 py-4">
                <Link to={`/meals/${item.uid}`}>
                  <p className="font-bold">{item.title}</p>
                </Link>
                <p className="bg-orange-500 border-8 font-bold text-white py-4 px-2 rounded-full -mt-10">
                  ${item.price}
                </p>
              </div>
              <div className="px-2 py-4 -mt-7">
                <Link to={`/meals/${item.uid}`}>
                  <p className="flex text-indigo-500 items-center">
                    View Meal
                    <ArrowRight className="ml-2" size={18} />
                  </p>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No results found for `<strong>{query}</strong>`
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;