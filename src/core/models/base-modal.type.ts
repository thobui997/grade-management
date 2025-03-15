import { NotificationType } from '@app/hooks/useNotification';

export interface BaseModalProps<T> {
  open: boolean;
  type?: 'create' | 'update';
  handleCancel?: () => void;
  showNotification?: (type: NotificationType, message: string, description?: string) => void;
  data?: T;
}
