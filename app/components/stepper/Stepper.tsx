import React from "react";
import "./stepper.css";

interface Props {
	currentStep: number;
	totalSteps: number;
}

export const Stepper: React.FC<Props> = ({ currentStep, totalSteps }) => {
	const progressPercentage = (currentStep / totalSteps) * 100;

	return (
		<div className='flex flex-col items-center w-full'>
			<div className='relative top-3'>
				{currentStep} / {totalSteps}
			</div>
			<div className='progress-container'>
				<div
					className='progress-bar'
					style={{ width: `${progressPercentage}%` }}
				></div>
			</div>
		</div>
	);
};
