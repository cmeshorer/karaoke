import { WarningTextProps } from "./types";

const WarningText = ({ text }: WarningTextProps) => {
  return <p className="Warning-text">{text}</p>;
};

export default WarningText;
