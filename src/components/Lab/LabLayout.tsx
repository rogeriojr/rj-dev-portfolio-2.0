import React from 'react';
import { Flex, Box, useDisclosure, Drawer, DrawerOverlay, DrawerContent, IconButton, useColorModeValue } from '@chakra-ui/react';
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
  const [sidebarWidth, setSidebarWidth] = React.useState(320);

  // Get sidebar width from localStorage
  React.useEffect(() => {
    const savedCompact = localStorage.getItem('cosmic-lab-compact');
    if (savedCompact) {
      const isCompact = JSON.parse(savedCompact);
      setSidebarWidth(isCompact ? 200 : 320);
    }
  }, []);

  // Listen for storage changes (when compact mode is toggled)
  React.useEffect(() => {
    const handleStorageChange = () => {
      const savedCompact = localStorage.getItem('cosmic-lab-compact');
      if (savedCompact) {
        const isCompact = JSON.parse(savedCompact);
        setSidebarWidth(isCompact ? 200 : 320);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also listen to custom event for same-tab updates
    window.addEventListener('cosmic-lab-compact-changed', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cosmic-lab-compact-changed', handleStorageChange);
    };
  }, []);

  const handleSelect = (category: string, item: string) => {
    onSelect(category, item);
    onClose();
  };

  return (
    <Box minH="100vh" pt={{ base: "70px", md: "80px" }} position="relative">
      <Flex w="100%" h="calc(100vh - 80px)" position="relative" overflow="hidden">
        {/* Desktop Sidebar - Fixed Position */}
        <Box 
          display={{ base: 'none', md: 'flex' }}
          position="fixed"
          left={0}
          top={{ base: "70px", md: "80px" }}
          bottom={0}
          w={`${sidebarWidth}px`}
          zIndex={20}
          bg={useColorModeValue('white', 'gray.900')}
          borderRight="1px solid"
          borderColor={useColorModeValue('gray.200', 'whiteAlpha.100')}
          overflowY="auto"
          overflowX="hidden"
          transition="width 0.3s ease"
        >
          <LabSidebar activeCategory={activeCategory} activeItem={activeItem} onSelect={handleSelect} />
        </Box>

        {/* Mobile Sidebar Drawer */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent bg="gray.900" pt={4}>
            <LabSidebar activeCategory={activeCategory} activeItem={activeItem} onSelect={handleSelect} />
          </DrawerContent>
        </Drawer>

        {/* Main Content Area */}
        <Box 
          flex="1" 
          w="full" 
          ml={{ base: 0, md: `${sidebarWidth}px` }}
          position="relative"
          overflowY="auto"
          overflowX="hidden"
          h="calc(100vh - 80px)"
          transition="margin-left 0.3s ease"
        >
          {/* Mobile Toggle */}
          <Box 
            display={{ base: 'block', md: 'none' }} 
            p={{ base: 3, md: 4 }} 
            borderBottom="1px" 
            borderColor="whiteAlpha.100"
            position="sticky"
            top={0}
            zIndex={15}
            bg={useColorModeValue('white', 'gray.900')}
          >
            <IconButton 
              onClick={onOpen} 
              aria-label="Open Menu" 
              icon={<FaBars />} 
              variant="ghost" 
              size="sm"
            />
          </Box>

          <Box p={{ base: 3, md: 4, lg: 8 }} maxW="1200px" mx="auto" w="full">
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
