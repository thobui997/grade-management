import { BaseResponse, Course } from '@app/core/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { MutationConfig } from '@app/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCoursesQueryOptions } from './get-courses';

export type CourseCreatedRequest = Omit<Course, 'id'>;

export const createCourse = (data: { data: CourseCreatedRequest }): Promise<BaseResponse<Course>> => {
  return httpClient.post('courses/create', data);
};

type UseCreateCourseOptions = {
  mutationConfig?: MutationConfig<typeof createCourse>;
};

export const useCreateCourse = ({ mutationConfig }: UseCreateCourseOptions = {}) => {
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
    mutationFn: createCourse
  });
};
