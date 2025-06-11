'use client';
import React, { useEffect, useState } from 'react';
import CreateCampaignForm from './CreateCampaignForm';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = () => {
    fetch('http://127.0.0.1:8000/api/campaigns/list/')
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch((err) => console.error("Error fetching campaigns:", err));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📢 Crowdfunding Campaigns</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="border rounded-xl shadow-md p-5">
            <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
            <p className="text-sm text-gray-700 mb-2">{campaign.description}</p>
            <p><strong>🎯 Goal:</strong> ₹{campaign.goal_amount}</p>
            <p><strong>💰 Donated:</strong> ₹{campaign.total_donated}</p>
          </div>
        ))}
      </div>

      {/* Campaign Creation Form */}
      <CreateCampaignForm onCampaignCreated={fetchCampaigns} />
    </div>
  );
}
