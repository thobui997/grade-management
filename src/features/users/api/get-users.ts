import { User } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { QueryConfig } from '@app/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getUsers = (): Promise<User[]> => {
  return httpClient.get('admin/users').then(res => res.data);
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: () => getUsers()
  });
};

type UseUserssOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({ queryConfig = {} }: UseUserssOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig
  });
};
