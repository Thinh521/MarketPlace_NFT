import {useQuery} from '@tanstack/react-query';
import {getAllArtistApi} from '../api/artistApi';

export const useArtists = ({
  timeRange = '24h',
  sortBy = 'all',
  page = 1,
  limit = 10,
}) => {
  return useQuery({
    queryKey: ['artists', timeRange, sortBy, page, limit],
    queryFn: () =>
      getAllArtistApi({
        timeRange,
        sortBy,
        page,
        limit,
      }),
    staleTime: 5 * 60 * 1000,
    select: res => (Array.isArray(res?.data) ? res.data.slice(1) : []),
    retry: 1,
  });
};
