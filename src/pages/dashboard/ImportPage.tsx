
import React, { useState } from "react";

const ImportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'x' | 'youtube'>('x');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Import Reviews</h1>
      <p className="text-gray-600 mb-8">Import your existing reviews from other platforms.</p>
      
      {/* Platform Selection Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('x')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'x' ? 'bg-crotus-light-purple text-crotus-dark-purple' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Import from X
        </button>
        <button
          onClick={() => setActiveTab('youtube')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'youtube' ? 'bg-crotus-light-purple text-crotus-dark-purple' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Import from YouTube
        </button>
      </div>

      {/* Platform-specific Import Forms */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === 'x' ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Import X Reviews</h2>
            <p className="text-gray-600 mb-6">Connect your X account to import your reviews.</p>
            <button className="bg-[#1DA1F2] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1a8cd8] transition-colors">
              Connect X Account
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Import YouTube Reviews</h2>
            <p className="text-gray-600 mb-6">Connect your YouTube account to import your video reviews.</p>
            <button className="bg-[#FF0000] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#d90000] transition-colors">
              Connect YouTube Account
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-crotus-light-purple text-crotus-dark-purple text-sm">
        New Feature 🎉
      </div>
    </div>
  );
};

export default ImportPage;
