import { Course } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { QueryConfig } from '@app/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCourses = (): Promise<Course[]> => {
  return httpClient.get('courses');
};

export const getCoursesQueryOptions = () => {
  return queryOptions({
    queryKey: ['courses'],
    queryFn: () => getCourses()
  });
};

type UseCoursesOptions = {
  queryConfig?: QueryConfig<typeof getCoursesQueryOptions>;
};

export const useCourses = ({ queryConfig = {} }: UseCoursesOptions = {}) => {
  return useQuery({
    ...getCoursesQueryOptions(),
    ...queryConfig
  });
};
