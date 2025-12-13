import {useQuery} from '@tanstack/react-query';
import {getProductCollectionAllRequest} from '~/api/productCollectionApi';

export const useProductCollections = () => {
  const {
    data: collectionData = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['collections'],
    queryFn: getProductCollectionAllRequest,
    staleTime: 5 * 60 * 1000,
    select: res => res.data,
    retry: 1,
  });

  return {
    collectionData,
    isLoading,
    error,
    refetch,
    isFetching,
  };
};
