import { useState } from 'react';
import { ShoppingCart, CreditCard, Truck, ChevronDown, ChevronUp } from 'lucide-react';

export default function Checkout() {
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const orderItems = [
    { id: 1, name: 'Burger Deluxe', price: 12.99, quantity: 2 },
    { id: 2, name: 'Fries (Large)', price: 4.99, quantity: 1 },
    { id: 3, name: 'Soda', price: 2.49, quantity: 2 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Assuming 8% tax
  const deliveryFee = 2.99;
  const total = subtotal + tax + deliveryFee;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Delivery Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter your delivery address"
                  required
                />
              </div>
              <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Delivery Instructions (optional)
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Any special instructions for delivery?"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={() => setPaymentMethod('credit_card')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Credit Card</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">PayPal</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <button
                onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                className="text-blue-500 hover:text-blue-600"
              >
                {isOrderSummaryOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            {isOrderSummaryOpen && (
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Tax</p>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Delivery Fee</p>
                    <p>${deliveryFee.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg mt-4">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
          >
            <ShoppingCart className="mr-2" />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

