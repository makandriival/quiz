interface Props {
	type: "button" | "submit";
  onClick: () => void;
  text: string;
	isDisabled?: boolean;
}

export const Button: React.FC<Props> = ({ type = "submit", onClick, text, isDisabled}) => {
	return (
		<button
			className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700  ${isDisabled ? 'bg-gray-700 hover:bg-slate-800': ''} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
			type={type}
      onClick={onClick}
			disabled={isDisabled}
		>
			{text}
		</button>
	);
};
