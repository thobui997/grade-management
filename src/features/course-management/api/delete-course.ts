import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCoursesQueryOptions } from './get-courses';

export const deleteCourse = (id: number) => {
  return httpClient.delete(`courses/${id}`).then((res) => res.data);
};

type UseDeleteCourseOptions = {
  mutationConfig?: MutationConfig<typeof deleteCourse>;
};

export const useDeleteCourse = ({ mutationConfig }: UseDeleteCourseOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCoursesQueryOptions().queryKey
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteCourse
  });
};
