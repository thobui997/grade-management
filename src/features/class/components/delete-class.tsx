import { useNotification } from '@app/contexts/NotificationProvider';
import { useDeleteClass } from '@app/features/class/api/delete-class';
import ConfirmDeleteDialog from '@app/shared/components/ui/dialog/confirm-delete-dialog';

type DeleteClassProps = {
  id: number;
};

const DeleteClass = ({ id }: DeleteClassProps) => {
  const { showNotification } = useNotification();

  const deleteClassMutation = useDeleteClass({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Xóa lớp học thành công');
      }
    }
  });

  return (
    <ConfirmDeleteDialog
      title='Bạn có chắc chắn muốn xóa lớp học này?'
      onConfirm={() => deleteClassMutation.mutate(id)}
    />
  );
};

export default DeleteClass;
