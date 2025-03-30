import { BaseResponse, Student } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudentsQueryOptions } from './get-students';

export type StudentUpdatedRequest = Omit<Student, 'id'>;

export const updateStudent = ({
  student,
  studentId
}: {
  student: StudentUpdatedRequest;
  studentId: number;
}): Promise<BaseResponse<Student>> => {
  return httpClient.put(`students/${studentId}`, student);
};

type UseUpdateStudentOptions = {
  mutationConfig?: MutationConfig<typeof updateStudent>;
};

export const useUpdateStudent = ({ mutationConfig }: UseUpdateStudentOptions = {}) => {
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
    mutationFn: updateStudent
  });
};
