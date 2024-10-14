import { ToggleButtonProps } from "./types";

const ToggleButton = ({ isSelected, onClick, title }: ToggleButtonProps) => {
  return (
    <button
      style={isSelected ? { backgroundColor: "orange" } : {}}
      className="Toggle-button"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ToggleButton;
