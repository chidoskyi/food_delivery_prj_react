import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {Link} from "react-router-dom"
import "@splidejs/react-splide/css"; // Import default styles
import axios from "axios";
import {CartContext} from '../hooks/CartContext';

const TopPicks = () => {
  const [topPicks, setTopPicks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
 
  const { addToCart } = React.useContext(CartContext);


  // Fetch top picks
  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/meals/`);
        setTopPicks(response.data.toppicks); // Set topPicks to the toppicks array
      } catch (error) {
        console.error('Error fetching top picks:', error);
        setError('Failed to fetch top picks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopPicks();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (topPicks.length === 0) {
    return <div className="text-center py-4">No top picks available.</div>;
  }

    return (
        <>
            <h1 className=" justify-center text-orange-500 font-bold text-center text-3xl py-2">
                Top Picks
            </h1>
            <div className=" lg:flex md:flex  max-w-[1520px] m-auto py-2  px-2">
                <Splide options={{
                        perPage: 4, gap: "1rem", drag: "free", arrows: false, breakpoints: {
                        900: {
                          perPage: 2, 
                        },
                        600: {
                          perPage: 1, 
                        },
                      },}}>
                    {
                        topPicks.map((item) => (
                            
                            <SplideSlide key={item.uid}>
                            <div className="relative rounded-3xl" key={item.uid}>
                                {/* Overlay */}
                                <div className="absolute cursor-pointer text-white bg-black/50 rounded-3xl w-full h-full">
                                    <p className="px-2 pt-4  font-bold">{item.title}</p>
                                    <p className="px-2 font-bold text-2xl pt-4">${item.price}</p>
                                    
                                    <button className="border-dotted text-white border-white absolute  bottom-4  rounded-md mx-2" onClick={() => addToCart(item)}>
                                        Add To Cart
                                    </button>
                                </div>
                                {/* Image */}
                                <Link to={`/meals/${item.uid}`}>
                                <img
                                loading="lazy" 
                                    className="h-[150px] w-full object-cover rounded-3xl cursor-pointer ease-out duration-300 hover:scale-105"
                                    src={item.image_url || item.image}
                                    alt={item.title}
                                />
                                </Link>
                            </div>
                            </SplideSlide>
                        ))
                    }
                </Splide>
            </div>
        </>
    );
};

export default TopPicks;
