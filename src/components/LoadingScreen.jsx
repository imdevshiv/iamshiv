import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [showIam, setShowIam] = useState(false);
  const [showShiv, setShowShiv] = useState(false);
  const [startTransition, setStartTransition] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowIam(true);
    }, 500);

    setTimeout(() => {
      setShowShiv(true);
    }, 1500);

    setTimeout(() => {
      setStartTransition(true);
    }, 2500);

    setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 3500);
  }, [onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-1000 ${startTransition ? 'opacity-0' : 'opacity-100'}`}
    >
      <h1 
        className={`text-4xl md:text-6xl font-bold
          transition-all duration-1000 transform
          ${startTransition ? 'scale-50 -translate-y-[40vh]' : 'scale-100'}`}
      >
        <span 
          className={`text-purple-500 transition-opacity duration-500 ${
            showIam ? 'opacity-100' : 'opacity-0'
          }`}
        >
          iam
        </span>
        <span 
          className={`text-white transition-opacity duration-500 ${
            showShiv ? 'opacity-100' : 'opacity-0'
          }`}
        >
          shiv
        </span>
      </h1>
    </div>
  );
};

export default LoadingScreen; 