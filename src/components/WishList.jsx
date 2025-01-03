// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Lock, Minus, Plus } from 'lucide-react';

const initialItems = [
  {
    id: 1,
    name: "Black and Gray Athletic Cotton Socks - 4 Pairs",
    price: 19.99,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
    deliveryDate: "Wednesday, December 25"
  },
  {
    id: 2,
    name: "Intermediate Size Basketball",
    price: 29.95,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
    deliveryDate: "Saturday, December 21"
  },
  {
    id: 3,
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    price: 7.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
    deliveryDate: "Wednesday, December 25"
  }
];

const deliveryOptions = [
  { date: "Wednesday, December 25", shipping: "FREE Shipping" },
  { date: "Saturday, December 21", shipping: "$4.99 - Shipping" },
  { date: "Thursday, December 19", shipping: "$9.99 - Shipping" }
];

export default function WishList() {
  const [cartItems, setCartItems] = useState(initialItems);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateDeliveryDate = (id, date) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, deliveryDate: date } : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4.99;
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Netphire Store</h1>
          <div className="flex items-center">
            <h2 className="text-xl">Checkout ({cartItems.length} items)</h2>
            <Lock className="ml-2 h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-6">Review your order</h3>
              
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="font-medium">${item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button className="text-blue-600 text-sm hover:underline">Delete</button>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Delivery date: {item.deliveryDate}</p>
                        <div className="space-y-2">
                          {deliveryOptions.map((option) => (
                            <label key={option.date} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`delivery-${item.id}`}
                                checked={item.deliveryDate === option.date}
                                onChange={() => updateDeliveryDate(item.id, option.date)}
                                className="text-blue-600"
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
                  <span className="text-gray-600">Estimated tax (13%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Order total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-4 rounded-lg font-medium transition-colors">
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
