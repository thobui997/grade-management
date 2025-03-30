import { Student } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { QueryConfig } from '@app/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getStudents = (): Promise<Student[]> => {
  return httpClient.get('students');
};

export const getStudentsQueryOptions = () => {
  return queryOptions({
    queryKey: ['students'],
    queryFn: () => getStudents()
  });
};

type UseStudentsOptions = {
  queryConfig?: QueryConfig<typeof getStudentsQueryOptions>;
};

export const useStudents = ({ queryConfig = {} }: UseStudentsOptions = {}) => {
  return useQuery({
    ...getStudentsQueryOptions(),
    ...queryConfig
  });
};
