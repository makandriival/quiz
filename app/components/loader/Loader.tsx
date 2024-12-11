import React from 'react';
import './loader.css';

interface Props {
  percentage: number;
}

export const Loader: React.FC<Props> = ({ percentage }) => {
  return (
    <div>
      <div className={'circular-loader-container'}>
      <div
        className={'circular-loader'}
        style={{ '--percentage': `${percentage}%` } as React.CSSProperties}
      >
        <div className={'percentage animate-ping'}>{percentage}%</div>
      </div>
    </div>
    </div>
  );
};