import React from 'react';
import {CartContext} from '../hooks/CartContext';
import { Trash } from "lucide-react"; // Import the Trash icon

// eslint-disable-next-line react/prop-types
export const RemoveFromCartButton = ({ item }) => {
  const { removeFromCart } = React.useContext(CartContext);
  return (
    <button 
      // eslint-disable-next-line react/prop-types
      onClick={() => removeFromCart(item.id)} 
      type="button"
      className="text-orange-500 border-none  px-4 py-2"
    >
      <Trash size={20} /> 
    </button>
  );
};

export default RemoveFromCartButton;