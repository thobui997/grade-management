import { BaseResponse, Course } from '@app/core/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCoursesQueryOptions } from './get-courses';

export type CourseUpdatedRequest = Omit<Course, 'id'>;

export const updateCourse = ({
  course,
  id
}: {
  course: CourseUpdatedRequest;
  id: number;
}): Promise<BaseResponse<Course>> => {
  return httpClient.put(`courses/${id}`, course);
};

type UseUpdateCourseOptions = {
  mutationConfig?: MutationConfig<typeof updateCourse>;
};

export const useUpdateCourse = ({ mutationConfig }: UseUpdateCourseOptions = {}) => {
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
    mutationFn: updateCourse
  });
};
