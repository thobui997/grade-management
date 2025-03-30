import { ClassInfo } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { QueryConfig } from '@app/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getClasses = (): Promise<ClassInfo[]> => {
  return httpClient.get('classes');
};

export const getClassesQueryOptions = () => {
  return queryOptions({
    queryKey: ['classes'],
    queryFn: () => getClasses()
  });
};

type UseClassesOptions = {
  queryConfig?: QueryConfig<typeof getClassesQueryOptions>;
};

export const useClasses = ({ queryConfig = {} }: UseClassesOptions = {}) => {
  return useQuery({
    ...getClassesQueryOptions(),
    ...queryConfig
  });
};
