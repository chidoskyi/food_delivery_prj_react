// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { AddToCartButton } from './AddToCart';

export const Meals = () => {
  const [foodData, setFoodData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  // Filter meals by category
  const filterCategory = (category) => {
    const updatedList = originalData.filter((item) => item.category.title === category);
    setFoodData(updatedList);
  };

  // Reset to all meals
  const resetToAll = () => {
    setFoodData(originalData);
  };

  // Fetch all meals
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/meals/`);
        setFoodData(response.data.meals);
        setOriginalData(response.data.meals);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchFoodData();
  }, []);

  return (
    <div className='max-w-[1520px] m-auto px-4 py-12'>
      <h1 className="text-orange-500 font-bold text-center text-3xl py-2">
        Our Meals
      </h1>
      <div className='flex flex-col lg:flex-row justify-center'>
        <div className='flex justify-center md:justify-center'>
          <button onClick={resetToAll} className='m-1 border-orange-700 text-white bg-orange-700 transition-all hover:bg-white hover:text-orange-700 hover:border-orange-700'>All</button>
          <button onClick={() => filterCategory('Pizza')} className='m-1 border-orange-700 text-white bg-orange-700 transition-all hover:bg-white hover:text-orange-700 hover:border-orange-700'>Pizza</button>
          <button onClick={() => filterCategory('Pasta')} className='m-1 border-orange-700 text-white bg-orange-700 transition-all hover:bg-white hover:text-orange-700 hover:border-orange-700'>Pasta</button>
          <button onClick={() => filterCategory('Burger')} className='m-1 border-orange-700 text-white bg-orange-700 transition-all hover:bg-white hover:text-orange-700 hover:border-orange-700'>Burger</button>
          <button onClick={() => filterCategory('Shawarma')} className='m-1 border-orange-700 text-white bg-orange-700 transition-all hover:bg-white hover:text-orange-700 hover:border-orange-700'>Shawarma</button>
        </div>
      </div>
      <div className='grid md:grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-4'>
        {foodData.map((item) => (
          <div key={item.uid} className='border-none shadow-lg hover:scale-105 duration-300'>
            <Link to={`/meals/${item.uid}`}>
              <img loading="lazy" className='w-full h-[200px] object-cover rounded-t-lg' src={item.image_url || item.image} alt={item.title} />
            </Link>
            <div className='flex justify-between px-2 py-4'>
              <Link to={`/meals/${item.uid}`}>
                <p className='font-bold'>{item.title}</p>
              </Link>
              <p className='bg-orange-500 border-8 font-bold text-white py-4 px-2 rounded-full -mt-10'>${item.price}</p>
            </div>
            <div className='px-2 py-4 -mt-7'>
              <p className='flex text-orange-500 items-center'>
                <Link to={`/meals/${item.uid}`} className="text-orange-500 flex items-center">
                  View More
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </p>
              <AddToCartButton item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;