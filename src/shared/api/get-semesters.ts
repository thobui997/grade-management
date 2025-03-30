import { Semester } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { QueryConfig } from '@app/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getSemesters = (): Promise<Semester[]> => {
  return httpClient.get('semesters');
};

export const getSemestersQueryOptions = () => {
  return queryOptions({
    queryKey: ['semesters'],
    queryFn: () => getSemesters()
  });
};

type UseSemestersOptions = {
  queryConfig?: QueryConfig<typeof getSemestersQueryOptions>;
};

export const useSemsters = ({ queryConfig = {} }: UseSemestersOptions = {}) => {
  return useQuery({
    ...getSemestersQueryOptions(),
    ...queryConfig
  });
};
