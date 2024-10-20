import React, { useState } from 'react';

const Streak: React.FC<{ totalPY: number; setTotalPY: (amount: number) => void }> = ({
  totalPY,
  setTotalPY,
}) => {
  const [isClaimed, setIsClaimed] = useState(false); // Track if claim has been made
  const [showPopup, setShowPopup] = useState(false); // Track if the popup/modal is shown

  // Function to handle the claim
  const handleClaimClick = () => {
    setIsClaimed(true);
    setShowPopup(false);
    setTotalPY(totalPY + 10); // Add 10PY to the totalPY
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-64 text-white flex flex-col items-center">
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center">
          {/* Droplet Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v12a3 3 0 100 6 3 3 0 100-6V3z"
            />
          </svg>
        </div>
        <div className="text-xl font-bold">1</div>
        <div>Day Streak</div>
      </div>

      <div className="flex justify-between w-full mb-4">
        <div className="text-sm text-gray-400">M</div>
        <div className="text-sm text-gray-400">T</div>
        <div className="text-sm text-gray-400">W</div>
        <div className="text-sm text-gray-400">T</div>
        <div className="text-sm text-gray-400">F</div>
        <div
          className="text-sm text-gray-400 cursor-pointer"
          onClick={() => !isClaimed && setShowPopup(true)} // Only show popup if not claimed
        >
          S
        </div>
        <div className="text-sm text-gray-400">S</div>
      </div>

      <div className="flex justify-between w-full mb-4">
        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
        <div className={`w-6 h-6 rounded-full ${isClaimed ? 'bg-green-500' : 'bg-gray-600'}`}></div>
        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
      </div>

      {/* Visible Claim Button */}
      <button
        className={`mt-4 px-4 py-2 rounded-lg ${
          isClaimed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'
        } text-white`}
        onClick={handleClaimClick}
        disabled={isClaimed}
      >
        {isClaimed ? 'Claimed' : 'Claim 10PY'}
      </button>

      <a href="#" className="text-xs text-gray-400 mt-2 underline">
        Missing a streak?
      </a>
    </div>
  );
};

export default Streak;
