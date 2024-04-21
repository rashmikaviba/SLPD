import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error!</p>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
