import { ClassCreatedRequest } from '@app/shared/types/api.type';
import { getClassesQueryOptions } from '@app/shared/api/get-classes';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createClass = (payload: ClassCreatedRequest) => {
  return httpClient.post('classes/create', payload);
};

type UseCreateClassOptions = {
  mutationConfig?: MutationConfig<typeof createClass>;
};

export const useCreateClass = ({ mutationConfig }: UseCreateClassOptions = {}) => {
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
    mutationFn: createClass
  });
};
