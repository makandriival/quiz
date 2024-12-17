"use client";
import { createContext, useEffect, useState } from "react";
import { Actions } from "../actions/actions";
import { Select } from "../inputs/select/select";
import { Text } from "../inputs/text/text";
import { IActions, Option, Step, steps } from "../../constants/steps";
import { Stepper } from "../stepper/Stepper";
import { Loader } from "../loader/Loader";
import { useTranslations } from "next-intl";
import { Error } from "@/app/interfaces/interfaces";
import { useRouter } from "next/navigation";

interface Props {
	stepId: number;
	lang: string;
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
	flow?: string;
}

export const MapperContext = createContext({} as MapperContextProps);

export const StepMapper: React.FC<Props> = ({ stepId, lang }) => {
	const router = useRouter();
	const [errors, setErrors] = useState<Error[]>([]);
	const [isShowError, setIsShowError] = useState<boolean>(false);
	const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [percentage, setPercentage] = useState<number>(0);
	const t = useTranslations();
	const { question, type, options, actions, helperText, flow }: Step =
		steps.find(s => s.id === stepId) || steps[0];
	const isSelect =
		(type === "single-select" || type === "multi-select") && options;
	const isText = type === "text" || type === "email";
	const quizLength = steps.length - 2;
	const isQuizEnded = stepId > quizLength;

	const load = async () => {
		setIsLoading(true);

		const interval = setInterval(() => {
			setPercentage(prev => prev + 1);
		}, 50);

		return new Promise<void>(resolve => {
			setTimeout(() => {
				resolve();
				clearInterval(interval);
			}, 5000);
		});
	};

	useEffect(() => {
		if (stepId === 1) {
		const step1 = JSON.parse(localStorage.getItem("step-1") || "{}");
		if (step1 && step1.answer) {
			if (t(lang) !== step1.answer) {
				localStorage.clear();
			}
		}
	}
	}, []);

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
				lang,
				flow,
			}}
		>
			<div className='min-w-64 slide-in flex flex-col justify-between h-[100vh] p-4'>
				<div
					id='step-mapper'
					className='flex flex-col items-center p-3'
				>
					{!isQuizEnded && (
						<Stepper
							currentStep={stepId}
							totalSteps={quizLength}
						/>
					)}
					<h1
						className={`p-1 text-3xl font-bold ${
							isQuizEnded ? "" : ""
						} ${stepId === steps.length ? 'font-niconne italic' : ''} my-10`}
					>
						{t(question)}
					</h1>
					{helperText && (
						<h3 className='p-1 text-sm font-thin text-[#C4C8CC] mb-3'>
							{t(helperText)}
						</h3>
					)}
					{isSelect && <Select />}
					{isText && <Text />}
				</div>
				<div className='mb-8'>
					<Actions />
				</div>
			</div>
		</MapperContext.Provider>
	);
};
