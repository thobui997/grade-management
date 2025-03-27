import ConfirmDeleteDialog from '@app/components/ui/dialog/confirm-delete-dialog';
import { useNotification } from '@app/contexts/NotificationProvider';
import { useDeleteLecturer } from '../api/delete-lecturer';

type DeleteLecturerProps = {
  id: number;
};

const DeleteLecturer = ({ id }: DeleteLecturerProps) => {
  const { showNotification } = useNotification();

  const deleteLecturerMutation = useDeleteLecturer({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Xóa giảng viên thành công');
      }
    }
  });

  return (
    <ConfirmDeleteDialog
      title='Bạn có chắc chắn muốn xóa giảng viên này?'
      onConfirm={() => deleteLecturerMutation.mutate(id)}
    />
  );
};

export default DeleteLecturer;
