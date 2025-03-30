import ConfirmDeleteDialog from '@app/shared/components/ui/dialog/confirm-delete-dialog';
import { useNotification } from '@app/contexts/NotificationProvider';
import { useDeleteSemester } from '../api/delete-semeter';

type DeleteSemesterProps = {
  id: number;
};

const DeleteSemester = ({ id }: DeleteSemesterProps) => {
  const { showNotification } = useNotification();

  const deleteSemesterMutation = useDeleteSemester({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Xóa học kỳ thành công');
      }
    }
  });

  return (
    <ConfirmDeleteDialog
      title='Bạn có chắc chắn muốn xóa học kỳ này?'
      onConfirm={() => deleteSemesterMutation.mutate(id)}
    />
  );
};

export default DeleteSemester;
