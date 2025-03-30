import { BaseResponse, Student } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { getStudentsQueryOptions } from '../../../shared/api/get-students';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type StudentCreatedRequest = Omit<Student, 'id'>;

export const createStudent = (student: StudentCreatedRequest) => {
  return httpClient.post<BaseResponse<Student>>('students', student).then((res) => res.data);
};

type UseCreateStudentOptions = {
  mutationConfig?: MutationConfig<typeof createStudent>;
};

export const useCreateStudent = ({ mutationConfig }: UseCreateStudentOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getStudentsQueryOptions().queryKey
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createStudent
  });
};
