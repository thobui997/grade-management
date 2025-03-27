import { BaseResponse, Semester } from '@app/core/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSemestersQueryOptions } from './get-semesters';

export type SemesterUpdatedRequest = Omit<Semester, 'id'>;

const updateSemester = ({
  semester,
  id
}: {
  semester: SemesterUpdatedRequest;
  id: number;
}): Promise<BaseResponse<Semester>> => {
  return httpClient.put(`semesters/${id}`, semester);
};

type UseUpdateSemesterOptions = {
  mutationConfig?: MutationConfig<typeof updateSemester>;
};

export const useUpdateSemester = ({ mutationConfig }: UseUpdateSemesterOptions = {}) => {
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
    mutationFn: updateSemester
  });
};
