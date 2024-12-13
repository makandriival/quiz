"use client";
import { useContext } from "react";
import { Button } from "../button/button";
import { useActions } from "@/app/hooks/useActions";
import { MapperContext } from "../stepMapper/stepMapper";

export const Actions = () => {
	const {
		actions: { isBack, isNext, isDownload, isRetake, isSaveToDb },
		stepId,
		isNextDisabled
	} = useContext(MapperContext);
	const { next, back, download, retake, submit } = useActions(stepId);

	console.log('in actions', isNextDisabled);

	return (
		<div className='flex justify-around gap-3 flex-col md:flex-row'>
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
			{isSaveToDb && (
				<Button
					type='button'
					onClick={submit}
					text='Save to DB'
				/>
			)}
		</div>
	);
};
