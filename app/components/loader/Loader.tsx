import React from "react";
import "./loader.css";

interface Props {
	percentage: number;
}

export const Loader: React.FC<Props> = ({ percentage }) => {
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
        <div>Finding collections for you...</div>
			</div>
		</div>
	);
};
