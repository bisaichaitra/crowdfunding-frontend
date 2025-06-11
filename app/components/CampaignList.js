'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donateAmount, setDonateAmount] = useState({});
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [donating, setDonating] = useState(false);
  const router = useRouter();

  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/campaigns/list/')
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      });
  }, []);

  const handleDonate = async (campaignId) => {
    const amount = parseFloat(donateAmount[campaignId]);
    if (!amount || amount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    setDonating(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://127.0.0.1:8000/api/campaigns/donate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          campaign_id: campaignId,
          amount: amount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for your donation! 🎉');
        setDonateAmount({ ...donateAmount, [campaignId]: '' });
        setSelectedCampaignId(null);

        const updated = await fetch('http://127.0.0.1:8000/api/campaigns/list/').then((res) =>
          res.json()
        );
        setCampaigns(updated);
      } else {
        alert('Donation failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Something went wrong: ' + err.message);
    } finally {
      setDonating(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">No campaigns found.</p>
        {isLoggedIn && (
          <button
            onClick={() => router.push('/campaigns/create')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Create the First Campaign
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📢 Crowdfunding Campaigns</h1>
        {isLoggedIn && (
          <button
            onClick={() => router.push('/campaigns/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Create Campaign
          </button>
        )}
      </div>

      {campaigns.map((campaign) => {
        const progress =
          campaign.goal_amount > 0
            ? Math.min((campaign.amount_raised / campaign.goal_amount) * 100, 100)
            : 0;

        return (
          <div
            key={campaign.id}
            className="border rounded-lg p-4 mb-4 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">{campaign.title}</h2>
            <p className="text-gray-600 mb-2">{campaign.description}</p>
            <p>🎯 Goal: ₹{campaign.goal_amount}</p>
            <p>💰 Donated: ₹{campaign.amount_raised}</p>

            <div className="w-full bg-gray-200 rounded-full h-4 my-2">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>{progress.toFixed(2)}% of goal reached</p>

            {/* Donation Input */}
            {selectedCampaignId === campaign.id && (
              <div className="my-2">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={donateAmount[campaign.id] || ''}
                  onChange={(e) =>
                    setDonateAmount({
                      ...donateAmount,
                      [campaign.id]: e.target.value,
                    })
                  }
                  className="border p-2 rounded mr-2"
                />
                <button
                  onClick={() => handleDonate(campaign.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  disabled={donating}
                >
                  {donating ? 'Processing...' : 'Confirm Donate'}
                </button>
              </div>
            )}

            <button
              onClick={() =>
                setSelectedCampaignId(
                  selectedCampaignId === campaign.id ? null : campaign.id
                )
              }
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {selectedCampaignId === campaign.id ? 'Cancel' : 'Donate'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
