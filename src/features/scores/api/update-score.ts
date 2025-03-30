import { BaseResponse, ScoreCreatedRequest, Semester } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSemestersQueryOptions } from '../../../shared/api/get-semesters';

export type ScoreUpdatedRequest = Omit<ScoreCreatedRequest, 'classId' | 'studentId'>;

const updateScore = ({
  payload,
  id
}: {
  payload: ScoreUpdatedRequest;
  id: number;
}): Promise<BaseResponse<Semester>> => {
  return httpClient.put(`classes-score/${id}`, payload);
};

type UseUpdateScoreOptions = {
  mutationConfig?: MutationConfig<typeof updateScore>;
};

export const useUpdateScore = ({ mutationConfig }: UseUpdateScoreOptions = {}) => {
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
    mutationFn: updateScore
  });
};
