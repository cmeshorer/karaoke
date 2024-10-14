import { ErrorTextProps } from "./types";

const ErrorText = ({ text }: ErrorTextProps) => {
  return <p className="Error-text">{text}</p>;
};

export default ErrorText;
