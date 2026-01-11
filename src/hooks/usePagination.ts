import { useState, useMemo, useEffect } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
  scrollContainerRef?: React.RefObject<HTMLElement | HTMLDivElement | null>;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  setItemsPerPage: (items: number) => void;
  itemsPerPage: number;
}

export function usePagination({
  totalItems,
  itemsPerPage: initialItemsPerPage = 9,
  initialPage = 1,
  scrollContainerRef,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

  useEffect(() => {
    if (initialItemsPerPage !== itemsPerPage && initialItemsPerPage > 0) {
      setItemsPerPageState(initialItemsPerPage);
      setCurrentPage(1);
    }
  }, [initialItemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage, totalItems);
  }, [startIndex, itemsPerPage, totalItems]);

  const goToPage = (page: number) => {
    if (totalPages === 0) return;
    
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    if (pageNumber === currentPage) return;
    
    setCurrentPage(pageNumber);

    const scrollToTop = () => {
      if (scrollContainerRef?.current) {
        const element = scrollContainerRef.current;
        if (element.scrollTo) {
          element.scrollTo({ top: 0, behavior: 'smooth' });
        } else if ('scrollTop' in element) {
          element.scrollTop = 0;
        }
      }
      
      const scrollWindow = window.scrollTo;
      if (typeof scrollWindow === 'function') {
        try {
          scrollWindow({ top: 0, behavior: 'smooth' });
        } catch {
          scrollWindow(0, 0);
        }
      }
      
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };

    requestAnimationFrame(() => {
      scrollToTop();
    });
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const previousPage = () => {
    goToPage(currentPage - 1);
  };

  const setItemsPerPage = (items: number) => {
    setItemsPerPageState(items);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (totalPages === 0) {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
      return;
    }
    
    if (currentPage > totalPages) {
      setCurrentPage(1);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages, totalItems]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    previousPage,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
    setItemsPerPage,
    itemsPerPage,
  };
}
