"use client";
import { useContext, useEffect, useState } from "react";
import { useActions } from "@/app/hooks/useActions";
import { useTranslations } from "next-intl";
import { MapperContext } from "../../stepMapper/stepMapper";
import { Button } from "../../button/button";

export const Select = () => {
	const { options, type, stepId } = useContext(MapperContext);
	const isMultiSelect = type === "multi-select";
	const hasConditionals = options?.some(({ conditional }) => conditional);
	const savedStep = localStorage.getItem(`step-${stepId}`);
	const [selection, setSelection] = useState<string[]>([]);
	const { next, saveStep } = useActions(stepId);
	const t = useTranslations();

	const handleChange = async (text: string, lang: string, isConditional: boolean) => {
		if (hasConditionals && isConditional) {
			return setSelection([text]);
		}

		if (!isMultiSelect) {
			setSelection([text]);
			saveStep(text);
			return next(lang);
		}

		if (selection.includes(text)) {
			return setSelection(selection.filter(item => item !== text));
		}

		setSelection([...selection.filter(item => item !== text), text]);
	};

	const onConditionalAnswer = (answer: string) => {
		setSelection([...selection, answer]);
		next();
	};

	useEffect(() => {
		if (!selection.length) return;
		saveStep(selection.join(", "));
	}, [selection]);

	useEffect(() => {
		if (savedStep) {
			const { answer } = JSON.parse(savedStep);
			setSelection(answer.split(", "));
		}
	}, []);

	return (
		<div className='flex flex-col gap-3 items-center'>
			{options &&
				options.map(({ text, id, lang, conditional }) => (
					<div key={id}>
						<button
							onClick={() => handleChange(t(text), lang || "", !!conditional?.question)}
							className={`${
								selection.includes(t(text)) ? "bg-orange-400" : "bg-gray-600 hover:bg-blue-700"
							} w-[150px] px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
						>
							{t(text)}
						</button>
						{(hasConditionals && selection.includes(t(text)) && conditional?.question) && (
							<div className='flex gap-1 items-center justify-around m-3 slide-in'>
								<div>{t(conditional?.question)}</div>
								<Button
									type='button'
									text='Yes'
									onClick={() =>
										onConditionalAnswer(`${t(conditional?.question)} - Yes`)
									}
								/>
								<Button
									type='button'
									text='no'
									onClick={() =>
										onConditionalAnswer(`${t(conditional?.question)} - No`)
									}
								/>
							</div>
						)}
					</div>
				))}
		</div>
	);
};
