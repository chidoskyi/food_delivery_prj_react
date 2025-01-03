// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Toast = ({ title, description, duration = 3000, onDismiss, variant = 'default' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      default:
        return 'bg-white text-gray-800 border-gray-200';
    }
  };

  const getProgressBarColor = () => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 min-w-[200px] max-w-md rounded-lg shadow-lg overflow-hidden border ${getVariantStyles()}`}>
      <div className="p-4">
        <div className="text-sm font-medium">
          {title}
        </div>
        {description && (
          <div className="mt-1 text-sm opacity-90">
            {description}
          </div>
        )}
      </div>
      <div className="h-1 w-full bg-gray-100">
        <div 
          className={`h-full ${getProgressBarColor()} transition-all duration-[3000ms] ease-linear`}
          style={{
            width: '100%',
            animation: `shrink ${duration}ms linear forwards`
          }}
        />
      </div>
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;