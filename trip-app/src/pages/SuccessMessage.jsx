import React from 'react';

const SuccessMessage = () => {
  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
        <p className="font-bold">Success!</p>
        <p>Your trip has been created successfully.</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
