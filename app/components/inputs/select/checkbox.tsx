import { CheckboxContainer, Checkmark } from "@/app/icons/checkbox";

interface Props {
  isSelected: boolean;
}

export const Checkbox: React.FC<Props> = ({isSelected}) => {
  return (
    <div className="relative">
      <CheckboxContainer />
      {isSelected && (
        <div className="absolute bottom-0">
          <Checkmark />
        </div>
      )}
    </div>
  )
};