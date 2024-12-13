import { Download } from "@/app/icons/download";

interface Props {
	type: "button" | "submit";
  onClick: () => void;
  text: string;
	isDisabled?: boolean;
}

export const Button: React.FC<Props> = ({ type = "submit", onClick, text, isDisabled}) => {
	const isDownload = text === 'Download my answers';

	return (
		<button
			className={`flex items-center gap-2 m-3 px-4 py-2 text-xl font-medium text-white bg-[#E4229C] ${isDownload ? 'bg-transparent' : ''} rounded-xl hover:bg-[#862663]  ${isDisabled ? 'bg-gray-700 hover:bg-slate-800': ''}`}
			type={type}
      onClick={onClick}
			disabled={isDisabled}
		>
			{isDownload && <Download />}
			{text}
		</button>
	);
};
