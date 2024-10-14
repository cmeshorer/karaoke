import { CSSProperties } from "react";

export type InputProps = {
  onChangeText: (text: string) => void;
  placeholder: string;
  value: string;
  isDisabled?: boolean;
  style?: CSSProperties;
};
