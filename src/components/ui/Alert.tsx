import React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description: string;
}

const variantStyles = {
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
};

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, description }) => {
  return (
    <div className={cn('p-4 border-l-4 rounded-md', variantStyles[variant])}>
      <div className="flex">
        <div className="flex-shrink-0">
          {/* You can add an icon here based on the variant */}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="mt-2 text-sm">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};