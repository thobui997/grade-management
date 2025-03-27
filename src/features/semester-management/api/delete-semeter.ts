import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSemestersQueryOptions } from './get-semesters';

export const deleteSemester = (id: number) => {
  return httpClient.delete(`semesters/${id}`);
};

type UseDeleteSemesterOptions = {
  mutationConfig?: MutationConfig<typeof deleteSemester>;
};

export const useDeleteSemester = ({ mutationConfig }: UseDeleteSemesterOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getSemestersQueryOptions().queryKey
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteSemester
  });
};
