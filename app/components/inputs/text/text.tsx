"use client";
import { useActions } from "@/app/hooks/useActions";
import { useContext, useEffect, useState } from "react";
import { MapperContext } from "../../stepMapper/stepMapper";
import { useTranslations } from "next-intl";

export const Text: React.FC = () => {
	const t = useTranslations();
  const { stepId, type, errors, isShowError, setIsNextDisabled } = useContext(MapperContext);
	const [value, setValue] = useState<string>("");
	const savedStep = localStorage.getItem(`step-${stepId}`);
	const {saveStep, validate} = useActions(stepId);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
    saveStep(e.target.value);
		validate(e.target.value, type);
	};
	
	useEffect(() => {
		const parsedStep = savedStep ? JSON.parse(savedStep) : null;
		if (parsedStep && parsedStep.answer) {
			setValue(savedStep ? JSON.parse(savedStep).answer : value);
			setIsNextDisabled(false)
		} else setIsNextDisabled(true);
	}, [value]);

	return (
		<>
			<input
				value={value}
				onChange={onChange}
				type={type}
				placeholder={t(`Your ${type}`)}
				className={`w-[100%] px-3 py-1.5 text-xs font-medium rounded-lg shadow-sm text-white bg-[#36173D] h-[76px] ${isShowError && errors.length ? 'border border-red-500' : 'border border-transparent'}`}
			/>
			{(isShowError && errors) && errors.map(({message}) => (
				<p key={message} className='text-red-500 text-xs'>{message}</p>
			))}
		</>
	);
};
