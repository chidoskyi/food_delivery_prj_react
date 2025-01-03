import { MapPin, Clock, Truck } from 'lucide-react';

export default function FoodDelivery() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Delivery</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Order</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="mr-2 text-blue-500" />
            <span>Delivery Address: 123 Main St, Anytown, USA</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 text-blue-500" />
            <span>Estimated Delivery Time: 30-45 minutes</span>
          </div>
          <div className="flex items-center">
            <Truck className="mr-2 text-blue-500" />
            <span>Order Status: On the way</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span>Burger Deluxe</span>
            <span>$12.99</span>
          </li>
          <li className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span>Fries (Large)</span>
            <span>$4.99</span>
          </li>
          <li className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span>Soda</span>
            <span>$2.49</span>
          </li>
          <li className="flex justify-between items-center p-2 font-semibold">
            <span>Total</span>
            <span>$20.47</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

