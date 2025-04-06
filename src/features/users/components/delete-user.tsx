import { useNotification } from '@app/contexts/NotificationProvider';
import { useDeleteUser } from '@app/features/users/api/delete-user';
import ConfirmDeleteDialog from '@app/shared/components/ui/dialog/confirm-delete-dialog';

type DeleteUserProps = {
  id: number;
};

const DeleteUser = ({ id }: DeleteUserProps) => {
  const { showNotification } = useNotification();

  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Xóa người dùng thành công');
      }
    }
  });

  return (
    <ConfirmDeleteDialog
      title='Bạn có chắc chắn muốn xóa người dùng này?'
      onConfirm={() => deleteUserMutation.mutate(id)}
    />
  );
};

export default DeleteUser;
