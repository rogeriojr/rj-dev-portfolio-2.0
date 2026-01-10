import { useState, useMemo, useEffect } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
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
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

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
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const previousPage = () => {
    goToPage(currentPage - 1);
  };

  const setItemsPerPage = (items: number) => {
    setItemsPerPageState(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Reset to page 1 if current page exceeds total pages (e.g., filtering reduces items)
  useEffect(() => {
    if ((currentPage > totalPages && totalPages > 0) || (totalItems > 0 && currentPage === 0)) {
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
