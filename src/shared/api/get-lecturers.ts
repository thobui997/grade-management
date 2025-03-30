import { Lecturer } from '@app/shared/types/api.type';
import { httpClient } from '@app/lib/http-client';
import { QueryConfig } from '@app/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getLecturers = (): Promise<Lecturer[]> => {
  return httpClient.get('teachers');
};

export const getLecturerQueryOptions = () => {
  return queryOptions({
    queryKey: ['lecturers'],
    queryFn: () => getLecturers()
  });
};

type UseLecturersOptions = {
  queryConfig?: QueryConfig<typeof getLecturerQueryOptions>;
};

export const useLecturers = ({ queryConfig = {} }: UseLecturersOptions = {}) => {
  return useQuery({
    ...getLecturerQueryOptions(),
    ...queryConfig
  });
};
