import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getLecturerQueryOptions } from './get-lecturers';

export const deleteLecturer = (id: number) => {
  return httpClient.delete(`teachers/${id}`).then((res) => res.data);
};

type UseDeleteLecturerOptions = {
  mutationConfig?: MutationConfig<typeof deleteLecturer>;
};

export const useDeleteLecturer = ({ mutationConfig }: UseDeleteLecturerOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getLecturerQueryOptions().queryKey
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteLecturer
  });
};
