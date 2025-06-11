'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // if not logged in, redirect to login
      router.push('/login');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {username}! 🎉</h1>
        <p className="text-gray-700 mb-6">
          We're glad to have you here. This platform allows you to explore and support crowdfunding campaigns.
        </p>
        <button
          onClick={() => router.push('/campaigns')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Exploring Campaigns
        </button>
      </div>
    </div>
  );
}
