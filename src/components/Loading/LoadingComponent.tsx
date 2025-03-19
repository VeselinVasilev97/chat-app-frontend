// src/components/LoadingScreen.tsx
import React from 'react';
import './LoadingScreen.css';

const LoadingComponent: React.FC = () => {
  return (
    <div className='loadingWrapper'>
      <span className="loader"></span>
    </div>
  );
};

export default LoadingComponent;