'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function DonatePage() {
  const params = useSearchParams();
  const campaign = params.get('campaign');
  const [amount, setAmount] = useState('');

  const handleDonate = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    alert(`Thank you for donating ₹${amount} to "${campaign}"! ❤️`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Donate to <span className="text-green-700">{campaign}</span>
        </h2>
        <p className="mb-6 text-gray-700">Every contribution makes a difference.</p>
        <input
          type="number"
          min="1"
          placeholder="Enter amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleDonate}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
        >
          Donate ₹{amount || '0'}
        </button>
      </div>
    </div>
  );
}
