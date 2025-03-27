import { BaseResponse, Course, Semester } from '@app/core/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSemestersQueryOptions } from './get-semesters';

export type SemesterCreatedRequest = Omit<Semester, 'id'>;

export const createSemester = (payload: { data: SemesterCreatedRequest }): Promise<BaseResponse<Course>> => {
  return httpClient.post('semesters/create', payload);
};

type UseCreateSemesterOptions = {
  mutationConfig?: MutationConfig<typeof createSemester>;
};

export const useCreateSemester = ({ mutationConfig }: UseCreateSemesterOptions = {}) => {
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
    mutationFn: createSemester
  });
};
