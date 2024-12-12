"use client";
import { useContext, useEffect, useState } from "react";
import { useActions } from "@/app/hooks/useActions";
import { useTranslations } from "next-intl";
import { MapperContext } from "../../stepMapper/stepMapper";
import { Button } from "../../button/button";

export const Select = () => {
	const { options, type, stepId, flow } = useContext(MapperContext);
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
		<div className={`flex gap-3 items-center w-full ${flow ? '' : 'flex-col'}`}>
			{options &&
				options.map(({ text, id, lang, conditional, icon }) => (
					<div key={id} className="w-full">
						<div
							onClick={() => handleChange(t(text), lang || "", !!conditional?.question)}
							className={`${
								selection.includes(t(text)) ? "bg-[#E4229B33] border-[#E4229B]" : " bg-[#36173D] hover:bg-[#E4229B]"
							} w-full px-3 py-1.5 border border-transparent text-xs font-medium rounded-md cursor-pointer`}
						>
							<div className={`${icon ? 'flex flex-col items-center' : ''}`}>
							{icon && <span className="text-6xl pb-3">{icon}</span>}
							<div >{t(text)}</div>
							</div>
						</div>
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
