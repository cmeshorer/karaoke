import { SwitchProps } from "./types";

const Switch = ({ checked, onCheck }: SwitchProps) => {
  return (
    <div
      className={`Switch ${checked ? "Switch--checked" : ""}`}
      onClick={onCheck}
    >
      <div
        className={`Switch-handle ${checked ? "Switch-handle--checked" : ""}`}
      />
      <input
        className="Switch-input"
        type="checkbox"
        checked={checked}
        onChange={onCheck}
      />
    </div>
  );
};
export default Switch;
