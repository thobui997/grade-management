import { FilterOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Popover, Select, Space } from 'antd';
import { useState } from 'react';

type SemesterFilterProps = {
  setTerm: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const SemesterFilter = ({ setTerm }: SemesterFilterProps) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      title='Lọc học kỳ'
      placement='bottomLeft'
      trigger='click'
      arrow={false}
      open={open}
      onOpenChange={handleOpenChange}
      content={
        <Space direction='vertical'>
          <Form layout='vertical' size='large' style={{ width: 300 }} form={form}>
            <Form.Item label='Kỳ học' name='term'>
              <Select
                allowClear
                placeholder='Chọn kỳ học'
                options={[
                  {
                    value: '1',
                    label: 'Học kỳ 1'
                  },
                  {
                    value: '2',
                    label: 'Học kỳ 2'
                  },
                  {
                    value: '3',
                    label: 'Học kỳ 3'
                  }
                ]}
              />
            </Form.Item>
          </Form>

          <Flex justify='end' gap={8}>
            <Button onClick={hide}>Đóng</Button>
            <Button
              type='primary'
              onClick={() => {
                setTerm(form.getFieldValue('term'));
                hide();
              }}
            >
              Áp dụng
            </Button>
          </Flex>
        </Space>
      }
    >
      <Button icon={<FilterOutlined />} size='large'>
        Lọc
      </Button>
    </Popover>
  );
};

export default SemesterFilter;
