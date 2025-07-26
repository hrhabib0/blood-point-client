import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
        <p className="text-red-600 font-semibold text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
