import { AiOutlineClose } from "react-icons/ai";
import { TextFieldProps } from "./types";
import { getStyle } from "../../tools/style";

const TextField = ({
  onChangeText,
  onClearText,
  onSubmit,
  placeholder,
  value,
  className,
  isDisabled,
}: TextFieldProps) => {
  return (
    <div className="TextField">
      <input
        className={className ? `TextField-input--${className}` : ""}
        placeholder={placeholder}
        disabled={isDisabled}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChangeText(event.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) onSubmit();
        }}
      />
      {value === "" ? null : (
        <button className="TextField-clear" onClick={onClearText}>
          <AiOutlineClose size={getStyle("--layout-dimension-icon-small")} />
        </button>
      )}
    </div>
  );
};

export default TextField;
