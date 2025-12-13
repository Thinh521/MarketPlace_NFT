import {useQuery} from '@tanstack/react-query';
import {getAllOwnedProductsRequest} from '~/api/productApi';

export const useOwnedProducts = options => {
  const {enabled = true, staleTime = 5 * 60 * 1000} = options || {};

  const query = useQuery({
    queryKey: ['ownedProducts'],
    queryFn: getAllOwnedProductsRequest,
    enabled,
    staleTime,
    select: res => (Array.isArray(res?.data) ? res.data.slice(1) : []),
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    error: query.error,
  };
};
