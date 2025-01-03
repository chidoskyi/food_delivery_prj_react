import React from 'react';
import  {CartContext}  from '../hooks/CartContext';

// eslint-disable-next-line react/prop-types
export const AddToCartButton = ({ item }) => {
  const { addToCart } = React.useContext(CartContext);

  return (
    <button 
      onClick={() => addToCart(item)} 
      className="bg-orange-500 border-none text-white px-4 py-2 mt-2 rounded w-full"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;