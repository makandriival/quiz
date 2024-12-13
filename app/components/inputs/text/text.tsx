"use client";
import { useActions } from "@/app/hooks/useActions";
import { useContext, useEffect, useState } from "react";
import { MapperContext } from "../../stepMapper/stepMapper";

export const Text: React.FC = () => {
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
		value ? setIsNextDisabled(false) : setIsNextDisabled(true);
	}, [value]);

	return (
		<>
			<input
				value={savedStep ? JSON.parse(savedStep).answer : value}
				onChange={onChange}
				type={type}
				placeholder={`Your ${type}`}
				className={`w-[100%] px-3 py-1.5 text-xs font-medium rounded-lg shadow-sm text-white bg-[#36173D] h-[76px] ${isShowError && errors.length ? 'border border-red-500' : 'border border-transparent'}`}
			/>
			{(isShowError && errors) && errors.map(({message}) => (
				<p key={message} className='text-red-500 text-xs'>{message}</p>
			))}
		</>
	);
};
