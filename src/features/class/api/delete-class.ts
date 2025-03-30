import { getClassesQueryOptions } from '@app/features/class/api/get-classes';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const deleteClass = (id: number) => {
  return httpClient.delete(`classes/${id}`);
};

type UseDeleteClassOptions = {
  mutationConfig?: MutationConfig<typeof deleteClass>;
};

export const useDeleteClass = ({ mutationConfig }: UseDeleteClassOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getClassesQueryOptions().queryKey
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteClass
  });
};
