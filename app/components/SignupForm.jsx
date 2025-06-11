'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import router for redirection

export default function MySignupForm() {
  const router = useRouter(); // ✅ Initialize router

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMessage('✅ Registration successful! Redirecting to login...');

      setTimeout(() => {
        router.push('/login'); // ✅ Redirect to login page after 1.5 seconds
      }, 1500);
    } else {
      const errorData = await response.json();
      setMessage('❌ Error: ' + (errorData.error || JSON.stringify(errorData)));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 border rounded-xl space-y-4">
      <h2 className="text-2xl font-bold mb-4">Register a New User</h2>

      <input
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Register
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
