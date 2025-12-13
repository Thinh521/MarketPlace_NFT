import {useQuery} from '@tanstack/react-query';
import {getProductByCollectionRequest} from '~/api/productCollectionApi';

export const useProductsByCollection = collectionId => {
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['productsByCollection', collectionId],
    queryFn: () => getProductByCollectionRequest(collectionId),
    enabled: !!collectionId,
    select: res => (Array.isArray(res?.data) ? res.data.slice(1) : []),
  });

  return {products, isLoading, isError, refetch};
};
