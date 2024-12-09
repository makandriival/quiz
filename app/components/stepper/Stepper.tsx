import React from 'react';
import './stepper.css';

interface Props {
  currentStep: number;
  totalSteps: number;
}

export const Stepper: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className='progress-container'>
      <div
        className='progress-bar'
        style={{ width: `${progressPercentage}%` }}
        >
        {currentStep}/{totalSteps}
      </div>
    </div>
  )};