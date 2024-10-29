export enum Type {
  INFO = "info",
  ERROR = "error",
  SUCCESS = "success",
  WARNING = "warning",
}

export interface FeedbackTextProps {
  message: string;
  type: Type;
}
