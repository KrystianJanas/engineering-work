export interface SendMessageSectionTypes {
  label: string;
  onSubmit: (message: string) => void;
  disabledButton?: boolean;
}
