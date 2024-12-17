import React from "react";
import "./loader.css";
import { useTranslations } from "next-intl";

interface Props {
	percentage: number;
}

export const Loader: React.FC<Props> = ({ percentage }) => {
	const t = useTranslations();

	return (
		<div className="h-[100vh] flex items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<div className={"circular-loader-container"}>
					<div
						className={"circular-loader"}
						style={{ "--percentage": `${percentage}%` } as React.CSSProperties}
					>
						<div className={"percentage animate-ping"}>{percentage}%</div>
					</div>
				</div>
        <div>{t('Finding collections for you')}...</div>
			</div>
		</div>
	);
};
