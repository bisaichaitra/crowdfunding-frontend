'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCodeCanvas from '../components/QRCodeWrapper';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donateAmount, setDonateAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];

    const userCampaignsWithIds = userCampaigns.map((c, i) => ({
      ...c,
      id: c.id || `user-${i}`,
      goal: typeof c.goal === 'number' ? c.goal : parseInt(c.goal?.replace(/[₹,]/g, '') || '100000'),
      raised: typeof c.raised === 'number' ? c.raised : 0,
    }));

    const sampleCampaigns = [
      {
        id: 'sample-1',
        title: 'Help Build a School in Rural India',
        description: 'Raising funds to construct a school for underprivileged children.',
        goal: 500000,
        raised: 120000,
        upiId: 'example@upi',
      },
      {
        id: 'sample-2',
        title: 'Medical Aid for Stray Animals',
        description: 'Funding emergency surgeries and treatment for injured strays.',
        goal: 200000,
        raised: 80000,
        upiId: 'example@upi',
      },
      {
        id: 'sample-3',
        title: 'Support Women Entrepreneurs',
        description: 'Micro-funding small businesses run by rural women.',
        goal: 100000,
        raised: 10000,
        upiId: 'example@upi',
      },
    ];

    setCampaigns([...userCampaignsWithIds, ...sampleCampaigns]);
  }, []);

  const handleDonate = (campaign) => {
    setSelectedCampaign(campaign);
    setDonateAmount('');
  };

  const upiLink = (upiId, amount, name) =>
    `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

  const handleThankYou = () => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === selectedCampaign.id
          ? { ...c, raised: c.raised + parseInt(donateAmount) }
          : c
      )
    );

    setSelectedCampaign(null);
    setShowThankYou(true);

    setTimeout(() => setShowThankYou(false), 3000);
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <h2 className="text-4xl font-bold text-center mb-8">🎯 Active Campaigns</h2>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push('/campaigns/create')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => {
          const percentRaised = Math.min(
            100,
            Math.round((campaign.raised / campaign.goal) * 100)
          );

          return (
            <div
              key={campaign.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                <p className="text-gray-700 mb-2">{campaign.description}</p>
                <p className="font-medium text-blue-700">
                  Goal: ₹{campaign.goal.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Raised: ₹{campaign.raised.toLocaleString()} ({percentRaised}%)
                </p>

                {/* ✅ Status bar */}
                <div className="w-full h-3 bg-gray-200 rounded mt-2">
                  <div
                    className="h-full bg-green-500 rounded"
                    style={{ width: `${percentRaised}%`, transition: 'width 0.5s' }}
                  />
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  UPI ID: {campaign.upiId || 'N/A'}
                </p>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => alert('You can implement detailed view later!')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDonate(campaign)}
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                >
                  💰 Donate
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Donation Modal */}
      {selectedCampaign && (
        <div
          style={{
            background: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md text-center relative">
            <button
              onClick={() => setSelectedCampaign(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ❌
            </button>
            <h3 className="text-xl font-bold mb-4">
              Donate to "{selectedCampaign.title}"
            </h3>

            <input
              type="number"
              placeholder="Enter amount in ₹"
              value={donateAmount}
              onChange={(e) => setDonateAmount(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
            />

            {donateAmount && selectedCampaign.upiId && (
              <>
                <QRCodeCanvas
                  value={upiLink(
                    selectedCampaign.upiId,
                    donateAmount,
                    selectedCampaign.title
                  )}
                  size={200}
                />
                <p className="text-sm mt-2 text-gray-600">
                  Scan with your UPI app to pay
                </p>
                <button
                  onClick={handleThankYou}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  ✅ Mark as Paid
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Thank You Popup */}
      {showThankYou && (
        <div
          style={{
            background: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-green-700 mb-2">🎉 Thank You!</h3>
            <p className="text-gray-700">We appreciate your support ❤️</p>
          </div>
        </div>
      )}
    </div>
  );
}
