import { Box, Button, HStack, VStack, IconButton, Text, Select, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';

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
  const { language } = useTranslation();
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

    if (totalPages <= 0) {
      return [];
    }

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

  // Don't render if no pages
  if (totalPages <= 0) {
    return null;
  }

  return (
    <Box mt={{ base: 8, md: 12 }} py={{ base: 3, md: 4 }} borderTop="1px solid" borderColor={useColorModeValue('gray.200', 'whiteAlpha.100')}>
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between" wrap="wrap" spacing={{ base: 2, md: 4 }} align="center">
          {/* Items per page selector */}
          <HStack spacing={2} flexWrap="wrap">
            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium" color="gray.500" whiteSpace="nowrap">
              {language === 'pt' ? 'Missões/Setor:' : 'Items/Page:'}
            </Text>
            <Select
              size={{ base: "sm", md: "sm" }}
              width={{ base: "60px", md: "70px" }}
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              borderRadius="md"
              variant="filled"
              bg={inactiveBg}
              minH={{ base: "44px", md: "auto" }}
              fontSize={{ base: "xs", md: "sm" }}
              _focus={{ borderColor: 'cyan.400' }}
            >
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
              <option value="18">18</option>
            </Select>
          </HStack>

          {/* Page info */}
          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" fontWeight="medium" whiteSpace="nowrap">
            {startItem}-{endItem} / {totalItems}
          </Text>

          {/* Pagination controls */}
          <HStack spacing={{ base: 1, md: 2 }} flexWrap="wrap" justify="center">
          <Tooltip label={language === 'pt' ? "Setor Anterior" : "Previous Sector"} hasArrow>
            <IconButton
              aria-label={language === 'pt' ? "Página anterior" : "Previous page"}
              icon={<FaChevronLeft />}
              size={{ base: "md", md: "sm" }}
              minW={{ base: "44px", md: "auto" }}
              minH={{ base: "44px", md: "auto" }}
              onClick={() => onPageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              variant="ghost"
              rounded="full"
              _hover={{ bg: hoverBg, transform: 'translateX(-2px)' }}
              _active={{ transform: 'scale(0.9)' }}
            />
          </Tooltip>

          {getPageNumbers().map((page, index) => (
            <Box key={index}>
              {page === '...' ? (
                <Text px={{ base: 1, md: 2 }} color="gray.500" fontSize={{ base: "xs", md: "sm" }}>...</Text>
              ) : (
                <MotionButton
                  size={{ base: "sm", md: "sm" }}
                  variant={page === currentPage ? 'solid' : 'ghost'}
                  bg={page === currentPage ? activeBg : 'transparent'}
                  color={page === currentPage ? activeColor : 'inherit'}
                  onClick={() => onPageChange(page as number)}
                  rounded="full"
                  fontWeight="bold"
                  fontSize={{ base: "xs", md: "sm" }}
                  minW={{ base: "44px", md: "32px" }}
                  minH={{ base: "44px", md: "32px" }}
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

          <Tooltip label={language === 'pt' ? "Próximo Setor" : "Next Sector"} hasArrow>
            <IconButton
              aria-label={language === 'pt' ? "Próxima página" : "Next page"}
              icon={<FaChevronRight />}
              size={{ base: "md", md: "sm" }}
              minW={{ base: "44px", md: "auto" }}
              minH={{ base: "44px", md: "auto" }}
              onClick={() => onPageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              variant="ghost"
              rounded="full"
              _hover={{ bg: hoverBg, transform: 'translateX(2px)' }}
              _active={{ transform: 'scale(0.9)' }}
            />
          </Tooltip>
        </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}
