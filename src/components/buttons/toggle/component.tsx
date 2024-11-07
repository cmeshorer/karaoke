import { ToggleProps } from "./types";

const Toggle = ({ isSelected, onClick, title }: ToggleProps) => {
  return (
    <button
      className={`Toggle ${isSelected ? "Toggle--selected" : ""}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Toggle;
