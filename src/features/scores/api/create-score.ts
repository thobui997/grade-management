import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { ScoreCreatedRequest } from '@app/shared/types/api.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createScore = (payload: ScoreCreatedRequest) => {
  return httpClient.post('class-scores', payload);
};

type UseCreateScoreOptions = {
  mutationConfig?: MutationConfig<typeof createScore>;
};

export const useCreateScore = ({ mutationConfig }: UseCreateScoreOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['scores']
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createScore
  });
};
