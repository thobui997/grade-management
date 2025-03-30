import ConfirmDeleteDialog from '@app/shared/components/ui/dialog/confirm-delete-dialog';
import { useNotification } from '@app/contexts/NotificationProvider';
import { useDeleteCourse } from '../api/delete-course';

type DeleteCourseProps = {
  id: number;
};

const DeleteCourse = ({ id }: DeleteCourseProps) => {
  const { showNotification } = useNotification();

  const deleteCourseMutation = useDeleteCourse({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Xóa môn học thành công');
      }
    }
  });

  return (
    <ConfirmDeleteDialog
      title='Bạn có chắc chắn muốn xóa môn học này?'
      onConfirm={() => deleteCourseMutation.mutate(id)}
    />
  );
};

export default DeleteCourse;
