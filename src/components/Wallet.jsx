import { useState } from 'react';
import { CreditCard, DollarSign } from 'lucide-react';

export default function Wallet() {
  const [balance, setBalance] = useState(100);
  const [amount, setAmount] = useState('');

  const handleAddMoney = (e) => {
    e.preventDefault();
    setBalance(prevBalance => prevBalance + Number(amount));
    setAmount('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Wallet</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600 dark:text-gray-300">Current Balance</p>
            <h2 className="text-3xl font-semibold">${balance.toFixed(2)}</h2>
          </div>
          <CreditCard size={48} className="text-blue-500" />
        </div>
        
        <form onSubmit={handleAddMoney} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Money
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Funds
          </button>
        </form>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        <ul className="space-y-2">
          {/* Placeholder for transaction history */}
          <li className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span>Food Order #1234</span>
            <span className="text-red-500">-$25.99</span>
          </li>
          <li className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span>Added Funds</span>
            <span className="text-green-500">+$50.00</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

