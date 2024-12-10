import { useRouter } from "next/navigation";
import { steps } from "../components/steps/constants/steps";
import { StorageStep } from "../interfaces/interfaces";
import { useContext } from "react";
import { MapperContext } from "../components/steps/stepMapper";

export const useActions = (stepId: number) => {
	const currentStep = steps.find(step => step.id === stepId);
	const router = useRouter();
	const { errors, setErrors, setIsShowError, setIsNextDisabled, load, lang } =
		useContext(MapperContext);

	const saveStep = (answer: string) => {
		const storageStep: StorageStep = {
			order: stepId,
			title: currentStep?.question || "not found",
			type: currentStep?.type || "not found",
			answer: answer,
		};
		localStorage.setItem(`step-${stepId}`, JSON.stringify(storageStep));
	};

	const validate = (val: any, type: string) => {
		if (type === "email") {
			const emailError = {
				field: "email",
				message: '"Please enter a valid email address"',
			};
			const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
			if (!isValid || !val) {
				if (!errors.find(error => error.field === "email"))
					setErrors([...errors, emailError]);
			} else {
				setErrors(errors.filter(error => error.field !== "email"));
				setIsNextDisabled(false);
			}
		}
	};

	const next = async (newLang?: string) => {
		if (errors.length) {
			setIsShowError(true);
			setIsNextDisabled(true);
			return;
		}
		if (currentStep?.isFinal) await load();
		const doChangeLang = newLang && stepId === 1 && typeof newLang === 'string';
		if (doChangeLang) return router.push(`/${newLang}/quiz/${+stepId + 1}`);

		router.push(`/${lang}/quiz/${+stepId + 1}`);
	};

	const back = () => {
		router.push(`/${lang}/quiz/${+stepId - 1}`);
	};

	const download = () => {
		// this data could be sent to the server
		const quiz: StorageStep[] = Object.keys(localStorage)
			.filter(key => key.includes("step"))
			.map(key => JSON.parse(localStorage.getItem(key) || ""))
			.sort((a, b) => a.order - b.order);
		const csvString =
			"data:text/csv;charset=utf-8," +
			"order,title,type,answer\n" +
			quiz
				.map(
					({ answer, type, title, order }) =>
						`${order},${title},${type},${answer.split(',').join(' - ')}`
				)
				.join("\n");
		const encodedUri = encodeURI(csvString);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "quiz.csv");
		document.body.appendChild(link);
		link.click();
	};

	const retake = () => {
		if (!confirm("Are you sure you want to retake the quiz?")) return;
		localStorage.clear();
		router.push(`/${lang}/quiz/1`);
	};

	return { next, back, download, retake, saveStep, validate };
};