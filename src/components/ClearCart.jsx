import React from 'react';
import  {CartContext}  from '../hooks/CartContext';

export const ClearCartButton = () => {
  const { clearCart } = React.useContext(CartContext);

  return (
    <button 
      onClick={() => clearCart()} 
      className="bg-orange-500 border-none text-white px-4 py-2 mt-2 rounded "
    >
      Clear Cart
    </button>
  );
};

export default ClearCartButton;