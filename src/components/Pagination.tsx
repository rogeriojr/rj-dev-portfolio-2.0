import { Box, Button, HStack, IconButton, Text, Select, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
  totalItems: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const activeBg = useColorModeValue('cyan.500', 'cyan.400');
  const activeColor = 'white';
  const inactiveBg = useColorModeValue('gray.100', 'whiteAlpha.100');
  const hoverBg = useColorModeValue('gray.200', 'whiteAlpha.200');

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Box mt={12} py={4} borderTop="1px solid" borderColor={useColorModeValue('gray.200', 'whiteAlpha.100')}>
      <HStack justify="space-between" wrap="wrap" spacing={4}>
        {/* Items per page selector */}
        <HStack>
          <Text fontSize="sm" fontWeight="medium" color="gray.500">Missões/Setor:</Text>
          <Select
            size="sm"
            width="70px"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            borderRadius="md"
            variant="filled"
            bg={inactiveBg}
            _focus={{ borderColor: 'cyan.400' }}
          >
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="18">18</option>
          </Select>
        </HStack>

        {/* Page info */}
        <Text fontSize="sm" color="gray.500" fontWeight="medium">
          {startItem}-{endItem} / {totalItems}
        </Text>

        {/* Pagination controls */}
        <HStack spacing={2}>
          <Tooltip label="Setor Anterior" hasArrow>
            <IconButton
              aria-label="Página anterior"
              icon={<FaChevronLeft />}
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              variant="ghost"
              rounded="full"
              _hover={{ bg: hoverBg, transform: 'translateX(-2px)' }}
            />
          </Tooltip>

          {getPageNumbers().map((page, index) => (
            <Box key={index}>
              {page === '...' ? (
                <Text px={2} color="gray.500">...</Text>
              ) : (
                <MotionButton
                  size="sm"
                  variant={page === currentPage ? 'solid' : 'ghost'}
                  bg={page === currentPage ? activeBg : 'transparent'}
                  color={page === currentPage ? activeColor : 'inherit'}
                  onClick={() => onPageChange(page as number)}
                  rounded="full"
                  fontWeight="bold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  _hover={{
                    bg: page === currentPage ? activeBg : hoverBg,
                    boxShadow: page === currentPage ? '0 0 10px rgba(0, 255, 255, 0.4)' : 'none'
                  }}
                >
                  {page}
                </MotionButton>
              )}
            </Box>
          ))}

          <Tooltip label="Próximo Setor" hasArrow>
            <IconButton
              aria-label="Próxima página"
              icon={<FaChevronRight />}
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              variant="ghost"
              rounded="full"
              _hover={{ bg: hoverBg, transform: 'translateX(2px)' }}
            />
          </Tooltip>
        </HStack>
      </HStack>
    </Box>
  );
}
