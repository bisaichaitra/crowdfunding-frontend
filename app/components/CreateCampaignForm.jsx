// components/CreateCampaignForm.jsx
'use client';
import React, { useState } from 'react';

export default function CreateCampaignForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    goal_amount: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/campaigns/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optional: add token if auth is needed
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert('Campaign created successfully!');
      setForm({ title: '', description: '', goal_amount: '' });
    } else {
      alert('Error creating campaign.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create a New Campaign</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="block w-full border p-2 mb-2 rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="block w-full border p-2 mb-2 rounded"
        required
      />
      <input
        name="goal_amount"
        value={form.goal_amount}
        onChange={handleChange}
        placeholder="Goal Amount"
        type="number"
        className="block w-full border p-2 mb-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
