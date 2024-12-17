"use client";
import { useContext } from "react";
import { Button } from "../button/button";
import { useActions } from "@/app/hooks/useActions";
import { MapperContext } from "../stepMapper/stepMapper";
import { useTranslations } from "next-intl";

export const Actions = () => {
	const {
		actions: { isBack, isNext, isDownload, isRetake, isSaveToDb },
		stepId,
		isNextDisabled
	} = useContext(MapperContext);
	const t = useTranslations();
	const { next, back, download, retake, submit } = useActions(stepId);

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
					text={t('Next')}
					isDisabled={isNextDisabled}
				/>
			)}
			{isDownload && (
				<Button
					type='button'
					onClick={download}
					text={t('Download my answers')}
					isDownload={isDownload}
				/>
			)}
			{isRetake && (
				<Button
					type='button'
					onClick={retake}
					text={t('Retake')}
				/>
			)}
			{isSaveToDb && (
				<Button
					type='button'
					onClick={submit}
					text={t('Save to DB')}
				/>
			)}
		</div>
	);
};
