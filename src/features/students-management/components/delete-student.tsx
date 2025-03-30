import ConfirmDeleteDialog from '@app/shared/components/ui/dialog/confirm-delete-dialog';
import { useNotification } from '@app/contexts/NotificationProvider';
import { useDeleteStudent } from '../api/delete-student';

type DeleteStudentProps = {
  id: number;
};

const DeleteStudent = ({ id }: DeleteStudentProps) => {
  const { showNotification } = useNotification();

  const deleteStudentMutation = useDeleteStudent({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Xóa sinh viên thành công');
      }
    }
  });

  return (
    <ConfirmDeleteDialog
      title='Bạn có chắc chắn muốn xóa sinh viên này?'
      onConfirm={() => deleteStudentMutation.mutate(id)}
    />
  );
};

export default DeleteStudent;
