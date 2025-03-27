import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudentsQueryOptions } from './get-students';

export const deleteStudent = (studentId: number) => {
  return httpClient.delete(`students/${studentId}`).then((res) => res.data);
};

type UseDeleteStudentOptions = {
  mutationConfig?: MutationConfig<typeof deleteStudent>;
};

export const useDeleteStudent = ({ mutationConfig }: UseDeleteStudentOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getStudentsQueryOptions().queryKey
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteStudent
  });
};
