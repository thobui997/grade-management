import { httpClient } from '@app/lib/http-client';
import { QueryConfig } from '@app/lib/react-query';
import { Score } from '@app/shared/types/api.type';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getScores = (classId: number): Promise<Score[]> => {
  return httpClient.get(`class-scores/${classId}/class`).then((res) => res.data);
};

export const getScoresQueryOptions = (classId: number | null) => {
  return queryOptions({
    queryKey: ['scores', classId],
    queryFn: () => getScores(classId!),
    enabled: classId !== null
  });
};

type UseScoresOptions = {
  classId: number | null;
  queryConfig?: QueryConfig<typeof getScoresQueryOptions>;
};

export const useScores = ({ classId, queryConfig = {} }: UseScoresOptions) => {
  return useQuery({
    ...getScoresQueryOptions(classId),
    ...queryConfig
  });
};
