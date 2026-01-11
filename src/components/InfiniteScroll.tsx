import { useEffect, useRef, useCallback } from 'react';
import { Box } from '@chakra-ui/react';

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  children: React.ReactNode;
}

export function InfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 200,
  children,
}: InfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observerRef.current.observe(currentSentinel);
    }

    return () => {
      if (observerRef.current && currentSentinel) {
        observerRef.current.unobserve(currentSentinel);
      }
    };
  }, [handleObserver, threshold]);

  return (
    <>
      {children}
      {hasMore && (
        <Box
          ref={sentinelRef}
          h="20px"
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={4}
        >
          {isLoading && (
            <Box
              w="40px"
              h="40px"
              border="4px solid"
              borderColor="blue.200"
              borderTopColor="blue.500"
              borderRadius="full"
              animation="spin 1s linear infinite"
            />
          )}
        </Box>
      )}
    </>
  );
}
