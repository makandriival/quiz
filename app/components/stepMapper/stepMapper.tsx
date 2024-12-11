"use client";
import { createContext, useEffect, useState } from "react";
import { Actions } from "../actions/actions";
import { Select } from "../inputs/select/select";
import { Text } from "../inputs/text/text";
import { IActions, Option, Step, steps } from "../../constants/steps";
import { Stepper } from "../stepper/Stepper";
import { Loader } from "../loader/Loader";
import { useTranslations } from "next-intl";
import "./stepMapper.css";

interface Props {
	stepId: number;
	lang: string;
}

interface Error {
	field: string;
	message: string;
}

interface MapperContextProps {
	stepId: number;
	type: string;
	options?: Option[];
	actions: IActions;
	errors: Error[];
	setErrors: (errors: Error[]) => void;
	isShowError: boolean;
	setIsShowError: (isShowError: boolean) => void;
	isNextDisabled: boolean;
	setIsNextDisabled: (isNextDisabled: boolean) => void;
	load: () => Promise<void>;
	lang: string;
}

export const MapperContext = createContext({} as MapperContextProps);

export const StepMapper: React.FC<Props> = ({ stepId, lang }) => {
	const [errors, setErrors] = useState<Error[]>([]);
	const [isShowError, setIsShowError] = useState<boolean>(false);
	const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [percentage, setPercentage] = useState<number>(0);
	const t = useTranslations();
	const { question, type, options, actions }: Step =
		steps.find(s => s.id === stepId) || steps[0];
	const isSelect =
		(type === "single-select" || type === "multi-select") && options;
	const isText = type === "text" || type === "email";

	const load = async() => {
		setIsLoading(true);

		const interval = setInterval(() => {
			setPercentage((prev) => prev + 1);
		}, 50);
		

		return new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
				clearInterval(interval);
			}, 5000);
		});
	};

	if (isLoading) {
		return <Loader percentage={percentage} />;
	}

	return (
		<MapperContext.Provider
			value={{
				stepId,
				type,
				options,
				actions,
				errors,
				setErrors,
				isShowError,
				setIsShowError,
				isNextDisabled,
				setIsNextDisabled,
				load,
				lang
			}}
		>
			<div id="step-mapper" className="min-w-64 slide-in">
				<Stepper currentStep={stepId} totalSteps={steps.length} />
				<h1 className='p-1'>{t(question)}</h1>
				<div className='p-1'>
					{isSelect && (
						<Select />
					)}
					{isText && <Text />}
				</div>
				<div className='p-3'>
					<Actions />
				</div>
			</div>
		</MapperContext.Provider>
	);
};
