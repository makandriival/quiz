"use client";
import { useContext } from "react";
import { Button } from "../button/button";
import { useActions } from "@/app/hooks/useActions";
import { MapperContext } from "../steps/stepMapper";

export const Actions = () => {
	const {
		actions: { isBack, isNext, isDownload, isRetake },
		stepId,
		isNextDisabled
	} = useContext(MapperContext);
	const { next, back, download, retake } = useActions(stepId);

	return (
		<div className='flex justify-around gap-3'>
			{isBack && (
				<Button
					type='button'
					onClick={back}
					text='Back'
				/>
			)}
			{isNext && (
				<Button
					type='button'
					onClick={next}
					text='Next'
					isDisabled={isNextDisabled}
				/>
			)}
			{isDownload && (
				<Button
					type='button'
					onClick={download}
					text='Download CSV'
				/>
			)}
			{isRetake && (
				<Button
					type='button'
					onClick={retake}
					text='Retake'
				/>
			)}
		</div>
	);
};
