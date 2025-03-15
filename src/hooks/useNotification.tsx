import { notification } from 'antd';
import { useCallback } from 'react';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = useCallback(
    (type: NotificationType, message: string, description?: string) => {
      setTimeout(() => {
        api[type]({
          message,
          description
        });
      }, 0);
    },
    [api]
  );

  return { showNotification, contextHolder };
}

export default useNotification;
