import { useEffect } from 'react';
import { FormInstance } from 'antd';

const useSetFormValuesOnOpen = <T extends object>(open: boolean, form: FormInstance, values: T) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (open) {
      timeoutId = setTimeout(() => {
        form.setFieldsValue(values);
      });
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open, form, values]);
};

export default useSetFormValuesOnOpen;
