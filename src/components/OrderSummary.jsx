import { deliveryOptions } from "./data/deliveryOption";




export default function OrderSummary({ cartItems }) {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 4.99;
    const tax = subtotal * 0.13;
    const total = subtotal + shipping + tax;

    return (
<>
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
    
    <button className="w-full bg-orange-700 hover:bg-orange-600 text-black py-3 px-4 rounded-lg font-medium border-none transition-colors">
      Place your order
    </button>
  </div>
</div>
</div>

</>
)}