import { ClassCreatedRequest } from '@app/shared/types/api.type';
import { getClassesQueryOptions } from '@app/shared/api/get-classes';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateClass = ({ payload, id }: { payload: ClassCreatedRequest; id: number }) => {
  return httpClient.put(`classes/${id}`, payload);
};

type UseUpdateClassOptions = {
  mutationConfig?: MutationConfig<typeof updateClass>;
};

export const useUpdateClass = ({ mutationConfig }: UseUpdateClassOptions = {}) => {
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
    mutationFn: updateClass
  });
};
