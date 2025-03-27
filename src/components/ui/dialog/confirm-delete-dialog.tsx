import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ComponentProps } from 'react';

const ConfirmDeleteDialog = (props: ComponentProps<typeof Popconfirm>) => {
  return (
    <Popconfirm {...props} description='Hành động này không thể hoàn tác' okText='Xóa' cancelText='Hủy'>
      <Button icon={<DeleteOutlined />} danger type='text' size='large' />
    </Popconfirm>
  );
};

export default ConfirmDeleteDialog;
