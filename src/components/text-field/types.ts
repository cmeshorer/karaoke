export type TextFieldProps = {
  onChangeText: (text: string) => void;
  onClearText: () => void;
  placeholder: string;
  value: string;
  className?: string;
  isDisabled?: boolean;
  onSubmit?: () => void;
};
