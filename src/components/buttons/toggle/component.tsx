import { ToggleButtonProps } from "./types";

const ToggleButton = ({ isSelected, onClick, title }: ToggleButtonProps) => {
  return (
    <button
      className={`ToggleButton ${isSelected ? "ToggleButton--selected" : ""}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ToggleButton;
