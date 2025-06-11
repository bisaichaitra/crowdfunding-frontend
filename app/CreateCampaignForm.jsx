'use client';
import React, { useState } from 'react';

export default function CreateCampaignForm({ onCampaignCreated }) {
  // State variables for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/campaigns/create/', {
      method: 'POST', // POST method to create new campaign
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),  // 🔐 Add JWT token here
      },
      body: JSON.stringify({
        title: title,
        description: description,
        goal_amount: goalAmount,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to create campaign');
        }
        return res.json(); // Parse JSON response
      })
      .then((data) => {
        // Clear form fields after successful creation
        setTitle('');
        setDescription('');
        setGoalAmount('');
        // Notify parent or refresh campaign list
        if (onCampaignCreated) {
          onCampaignCreated();
        }
      })
      .catch((err) => {
        // Log errors to console for debugging
        console.error('Error:', err);
        alert('Failed to create campaign. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 border p-6 rounded-xl">
      <h2 className="text-xl font-semibold">➕ Create New Campaign</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Goal Amount (₹)"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
        className="w-full border p-2 rounded"
        required
        min="0"
        step="0.01"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Create Campaign
      </button>
    </form>
  );
}
