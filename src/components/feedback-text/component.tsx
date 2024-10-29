import { FeedbackTextProps } from "./types";

const FeedbackText = ({ message, type }: FeedbackTextProps) => {
  return <p className={`FeedbackText FeedbackText--${type}`}>{message}</p>;
};

export default FeedbackText;
