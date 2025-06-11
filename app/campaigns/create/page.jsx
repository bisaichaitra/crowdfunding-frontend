'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCampaignPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [upiId, setUpiId] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCampaign = {
      id: Date.now(), // simple unique ID
      title,
      description,
      goal,
      upiId,
    };

    // Get existing campaigns from localStorage
    const existing = JSON.parse(localStorage.getItem('campaigns')) || [];
    const updated = [...existing, newCampaign];

    localStorage.setItem('campaigns', JSON.stringify(updated));
    alert('🎉 Campaign Created Successfully!');
    router.push('/campaigns');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Campaign 🚀</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Campaign Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Fundraising Goal (₹)</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">UPI ID for Donations</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              placeholder="e.g., 9347978813@ybl"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            🎯 Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
}
