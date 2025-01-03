// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Meals from '../components/Meals';

const SearchPage = () => {
    const [filteredData, setFilteredData] = useState([]); // State for filtered results
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || ''; // Get search query from URL

    useEffect(() => {
        // Filter mealData based on the query
        if (query) {
            const results = Meals.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(results);
        } else {
            setFilteredData(Meals); // Show all items if no query
        }
    }, [query]);

    return (
        <div className="max-w-[1520px]  m-auto px-4 py-20">
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
                            key={item.id}
                            className="border-none shadow-lg hover:scale-105 duration-300"
                        >
                        <Link to={`/meals/${item.uid}`}>
                            <img
                                loading="lazy"
                                className="w-full h-[200px] object-cover rounded-t-lg"
                                src={item.image}
                                alt={item.name}
                            />
                        </Link>
                            <div className="flex justify-between px-2 py-4">
                            <Link to={`/meals/${item.uid}`}>
                                    <p className="font-bold">{item.name}</p>
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
