import {useInfiniteQuery} from '@tanstack/react-query';
import {getAllProductsRequest} from '../api/productApi';

export const useProducts = address => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['allProducts', address],
    queryFn: ({pageParam = 1}) =>
      getAllProductsRequest({
        addressWallet: address,
        page: pageParam,
        limit: 10,
      }),
    getNextPageParam: lastPage => {
      if (!lastPage?.data || !Array.isArray(lastPage.data)) return undefined;

      const paginationInfo = lastPage.data[0];
      if (paginationInfo && paginationInfo.page < paginationInfo.totalPages) {
        return paginationInfo.page + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const allProducts = data?.pages
    ? data.pages.flatMap(page => {
        const list = Array.isArray(page?.data) ? page.data : [];
        return list.slice(1);
      })
    : [];

  const buyNowProducts = allProducts.filter(p => p.type === 'buyNow');
  const auctionProducts = allProducts.filter(p => p.type === 'onAuction');

  return {
    allProducts,
    buyNowProducts,
    auctionProducts,
    isLoading,
    isError,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
