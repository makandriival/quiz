"use client";
import { useEffect, useState } from "react";
import { Option } from "../../steps/constants/steps";
import { useActions } from "@/app/hooks/useActions";
import { useTranslations } from "next-intl";
import { useUtils } from "@/app/hooks/useUtils";
import { useRouter } from "next/router";

interface Props {
	stepId: number;
	type: string;
	options: Option[];
}

export const Select: React.FC<Props> = ({ options, type, stepId }) => {
	const isMultiSelect = type === "multi-select";
	const savedStep = localStorage.getItem(`step-${stepId}`);
	const [selection, setSelection] = useState<string[]>([]);
	const {next, saveStep} = useActions(stepId);
	const { mapValueIntoLang } = useUtils();
	const t = useTranslations();
	const router = useRouter();

	const handleChange = (value: string) => {
		if (!isMultiSelect) {
			const lang = mapValueIntoLang(value);
			//TODO save the selected language in cookies

			setSelection([value]);
			saveStep(value);
			return next();
		}

    if (selection.includes(value)) {
      return setSelection(selection.filter(item => item !== value));
    }

		setSelection([...selection.filter(item => item !== value), value]);
	};

	useEffect(() => {
		if (!selection.length) return;
		saveStep(selection.join(', '));
	}, [selection]);

	useEffect(() => {
		if (savedStep) {
			const { answer } = JSON.parse(savedStep);
			setSelection(answer.split(', '));
		}
	}, []);
	
	return (
    <div className="flex flex-col gap-3">
			{options.map(({ text, id }) => (
				<button
					key={id}
          onClick={() => handleChange(t(text))}
          className={`${selection.includes(t(text)) ? 'bg-orange-400' : 'bg-gray-600'} px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white hover:bg-blue-700`}
				>
					{t(text)}
				</button>
			))}
    </div>
	);
};
