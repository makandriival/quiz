"use client";
import { useContext, useEffect, useState } from "react";
import { useActions } from "@/app/hooks/useActions";
import { useTranslations } from "next-intl";
import { MapperContext } from "../../stepMapper/stepMapper";
import { Button } from "../../button/button";
import { Checkbox } from "./checkbox";
import { useRouter } from "next/navigation";

export const Select = () => {
	const router = useRouter();
	const { options, type, stepId, flow, setIsNextDisabled, lang} =
		useContext(MapperContext);
	const isMultiSelect = type === "multi-select";
	const hasConditionals = options?.some(({ conditional }) => conditional);
	const savedStep = localStorage.getItem(`step-${stepId}`);
	const [selection, setSelection] = useState<string[]>([]);
	const { next, saveStep } = useActions(stepId);
	const t = useTranslations();
	const isInRow = flow === 'row';
	const isBubbles = flow === 'bubble';

	const handleChange = async (
		text: string,
		lang: string,
		isConditional: boolean
	) => {
		if (hasConditionals && isConditional) {
			return setSelection([text]);
		}

		if (!isMultiSelect) {
			setSelection([text]);
			saveStep(text);
			return next(lang);
		}

		if (selection.includes(text)) {
			const filtered = selection.filter(item => item !== text);
			if (!filtered.length) {
				setIsNextDisabled(true);
				saveStep(null);
			}
			return setSelection(filtered);
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
		if (selection.length) setIsNextDisabled(false); 
	}, [selection]);

	useEffect(() => {
		const step1 = JSON.parse(localStorage.getItem("step-1") || "{}");
		if (step1 && step1.answer) {
			if (t(lang) !== step1.answer) {
				localStorage.clear();
				router.push(`/${lang}/quiz/1`);
				return;
			}
		}
		if (savedStep) {
			const { answer } = JSON.parse(savedStep);
			if (!answer) return;
			setSelection(answer.split(", "));
		}
		
	}, []);

	return (
		<div className={isBubbles ? 'flex gap-5 flex-wrap max-w-[500px]' : `flex gap-3 items-center w-full ${isInRow && !isBubbles ? "" : "flex-col"}`}>
			{options &&
				options.map(({ text, id, lang, conditional, icon }) => (
					<div
						key={id}
						className={isBubbles ? 'bubble-animation' : 'w-full'}
					>
						<div
							onClick={() =>
								handleChange(t(text), lang || "", !!conditional?.question)
							}
							className={`${
								selection.includes(t(text))
									? "bg-[#E4229B33] border-[#E4229B]"
									: " bg-[#36173D] hover:bg-[#E4229B] border-transparent"
							} ${icon ? "" : "h-[76px]"} 
							${isMultiSelect ? "flex justify-between" : ""}
							px-3 py-1.5 border text-xs font-medium rounded-md cursor-pointer flex items-center justify-center
							${isBubbles ? "rounded-full w-36 h-36" : "w-full"}
							`}
						>
							<div 
							className={`flex items-center 
								${icon ? "flex-col" : ""}
								${(isBubbles && icon) ? "relative left-4" : ""}
							`}>
								{icon && <span className='text-6xl pb-3'>{icon}</span>}
								<div className='text-xl '>{t(text)}</div>
							</div>
							<div>
								{(isMultiSelect && !isBubbles) && (
									<Checkbox isSelected={selection.includes(t(text))} />
								)}
							</div>
						</div>
						{hasConditionals &&
							selection.includes(t(text)) &&
							conditional?.question && (
								<div className='flex gap-1 items-center justify-around m-3 slide-in'>
									<div>{t(conditional?.question)}</div>
									<div className='w-[70px]'>
										<Button
											type='button'
											text={t("Yes")}
											onClick={() =>
												onConditionalAnswer(`${t(conditional?.question)} - Yes`)
											}
										/>
									</div>
									<div className='w-[70px]'>
										<Button
											type='button'
											text={t("No")}
											onClick={() =>
												onConditionalAnswer(`${t(conditional?.question)} - No`)
											}
										/>
									</div>
								</div>
							)}
					</div>
				))}
		</div>
	);
};
