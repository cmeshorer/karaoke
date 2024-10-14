import { InputProps } from "./types";

const Input = ({
  onChangeText,
  placeholder,
  value,
  isDisabled,
  style,
}: InputProps) => {
  return (
    <input
      className="Input"
      placeholder={placeholder}
      disabled={isDisabled}
      style={style}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChangeText(event.target.value)
      }
    />
  );
};

export default Input;
