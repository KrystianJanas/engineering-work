export interface ModalComponentProps {
  title: string;
  description: string;
  cancelButton?: boolean;
  cancelText?: string;
  confirmButton?: boolean;
  confirmText?: string;
  onHide?: () => void;
  onConfirm?: () => void;
  minHeight?: string;
  minWidth?: string;
}
