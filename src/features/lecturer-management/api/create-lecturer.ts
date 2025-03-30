import { Course } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getLecturerQueryOptions } from '../../../shared/api/get-lecturers';

export type LecturerCreatedRequest = Omit<Course, 'id'>;

export const createLecturer = (payload: LecturerCreatedRequest) => {
  return httpClient.post('teachers', payload);
};

type UseCreateLecturerOptions = {
  mutationConfig?: MutationConfig<typeof createLecturer>;
};

export const useCreateLecturer = ({ mutationConfig }: UseCreateLecturerOptions = {}) => {
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
    mutationFn: createLecturer
  });
};
