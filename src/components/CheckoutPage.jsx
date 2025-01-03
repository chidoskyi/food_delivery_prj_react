// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from 'react';
import { Lock, Minus, Plus } from 'lucide-react';
import {CartContext} from '../hooks/CartContext';
import { RemoveFromCartButton } from './RemoveFromCart';
import { ClearCartButton } from './ClearCart';

// Function to format date as "Day, Month Date"
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

// Generate delivery options based on today's date
const getDeliveryOptions = () => {
  const today = new Date();
  return [
    { date: formatDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)), shipping: "FREE Shipping", priceCents: 0 }, // 7 days from today
    { date: formatDate(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)), shipping: "$4.99 - Shipping", priceCents: 499 }, // 3 days from today
    { date: formatDate(new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)), shipping: "$9.99 - Shipping", priceCents: 999 } // 1 day from today
  ];
};

export default function CheckoutPage() {
  const { cartItems, updateCart } = useContext(CartContext);
  const [deliveryOptions] = useState(getDeliveryOptions());

  // Set default delivery date for each item if not already set
  useEffect(() => {
    const updatedCart = cartItems.map(item => ({
      ...item,
      deliveryDate: item.deliveryDate || deliveryOptions[0].date // Set default to the first option
    }));
    updateCart(updatedCart);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateCart(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const updateDeliveryDate = (id, date) => {
    updateCart(cartItems.map(item =>
      item.id === id ? { ...item, deliveryDate: date } : item
    ));
  };

  // Calculate shipping cost based on the selected delivery option
  const calculateShipping = () => {
    return cartItems.reduce((sum, item) => {
      const option = deliveryOptions.find(option => option.date === item.deliveryDate);
      return sum + (option ? option.priceCents : 0);
    }, 0) / 100; // Convert cents to dollars
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = calculateShipping();
  const tax = subtotal * 0.10;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 bg-orange-700 py-4 px-4 text-white">
          <h1 className="text-2xl font-semibold text-white ">Netphixs Store</h1>
          <div className="flex items-center">
            <h2 className="text-xl">Checkout ({cartItems.length} items)</h2>
            <Lock className="ml-2 h-5 w-5 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium mb-6">Review your order</h3>
              <ClearCartButton />
            </div>
              
              <div className="space-y-6 sm:space-y-8">
                {cartItems.map((item) => (
                  <div key={item.uid} className="flex flex-col sm:flex-row  items-center sm:gap-6 gap-6 pb-10 border p-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="sm:w-40 sm:h-40 object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-grow flex-col gap-3 w-full  sm:flex-row flex justify-between">
                      <div>
                        <div className=" ">
                          <h4 className="font-medium text-orange-700">{item.title}</h4>
                          <p className="font-medium text-green-600">${item.price}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-sm font-medium text-gray-600">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-[9px] hover:bg-gray-100 hover:border-orange-600"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-[9px] hover:bg-gray-100 hover:border-orange-600"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          {/* <button className="text-blue-600 text-sm hover:underline border-none">Delete</button> */}
                          <RemoveFromCartButton id={item.uid} item={item} />
                        </div>
                      </div>

                      <div>
                        <h1 className="font-medium pb-4">Delivery date: {item.deliveryDate}</h1>
                        <div className="space-y-2">
                          {deliveryOptions.map((option) => (
                            <label key={option.date} className="flex items-center gap-2 pb-3">
                              <input
                                type="radio"
                                name={`delivery-${item.id}`}
                                checked={item.deliveryDate === option.date}
                                onChange={() => updateDeliveryDate(item.id, option.date)}
                                className="text-blue-600 cursor-pointer"
                              />
                              <span className="text-sm">
                                {option.date} - {option.shipping}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({cartItems.length}):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping & handling:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Total before tax:</span>
                  <span>${(subtotal + shipping).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Order total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="w-full bg-orange-700 hover:bg-orange-600 text-black py-3 px-4 rounded-lg font-medium border-none transition-colors">
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}