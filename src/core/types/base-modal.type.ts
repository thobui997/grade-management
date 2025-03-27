export interface BaseModalProps<T> {
  open: boolean;
  type?: 'create' | 'update';
  handleCancel?: () => void;
  data?: T;
}
