import React from 'react';
import { Flex, Box, useDisclosure, Drawer, DrawerOverlay, DrawerContent, IconButton } from '@chakra-ui/react';
import { LabSidebar } from './LabSidebar';
import { FaBars } from 'react-icons/fa';

interface LabLayoutProps {
  children: React.ReactNode;
  activeCategory: string;
  activeItem: string | null;
  onSelect: (category: string, item: string) => void;
}

export const LabLayout: React.FC<LabLayoutProps> = ({ children, activeCategory, activeItem, onSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (category: string, item: string) => {
    onSelect(category, item);
    onClose();
  };

  return (
    <Flex minH="100vh" pt="80px"> {/* Offset for Main Navbar */}
      {/* Desktop Sidebar */}
      <Box display={{ base: 'none', md: 'block' }}>
        <LabSidebar activeCategory={activeCategory} activeItem={activeItem} onSelect={handleSelect} />
      </Box>

      {/* Mobile Sidebar Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900" pt={4}>
          <LabSidebar activeCategory={activeCategory} activeItem={activeItem} onSelect={handleSelect} />
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box flex="1" w="full" position="relative">
        {/* Mobile Toggle */}
        <Box display={{ base: 'block', md: 'none' }} p={4} borderBottom="1px" borderColor="whiteAlpha.100">
          <IconButton onClick={onOpen} aria-label="Open Menu" icon={<FaBars />} variant="ghost" />
        </Box>

        <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
