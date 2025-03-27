import { Lecturer } from '@app/core/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getLecturerQueryOptions } from './get-lecturers';

export type LecturerCreatedRequest = Omit<Lecturer, 'id'>;

export const updateLecturer = ({ payload, id }: { payload: LecturerCreatedRequest; id: number }) => {
  return httpClient.put(`teachers/${id}`, payload);
};

type UseUpdateLecturerOptions = {
  mutationConfig?: MutationConfig<typeof updateLecturer>;
};

export const useUpdateLecturer = ({ mutationConfig }: UseUpdateLecturerOptions = {}) => {
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
    mutationFn: updateLecturer
  });
};
