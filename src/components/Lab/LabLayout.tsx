import React from 'react';
import { Flex, Box, useDisclosure, Drawer, DrawerOverlay, DrawerContent, IconButton, useColorModeValue, useBreakpointValue, VStack, Text, HStack, Badge } from '@chakra-ui/react';
import { LabSidebar } from './LabSidebar';
import { FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface LabLayoutProps {
  children: React.ReactNode;
  activeCategory: string;
  activeItem: string | null;
  onSelect: (category: string, item: string) => void;
}

export const LabLayout: React.FC<LabLayoutProps> = ({ children, activeCategory, activeItem, onSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sidebarWidth, setSidebarWidth] = React.useState(320);
  const isMobile = useBreakpointValue({ base: true, md: false });

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
    window.addEventListener('cosmic-lab-compact-changed', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cosmic-lab-compact-changed', handleStorageChange);
    };
  }, []);

  // Disable body scroll when drawer is open on mobile
  React.useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else if (isMobile && !isOpen) {
      // Keep body scroll disabled when in Lab on mobile
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      if (!isMobile) {
        document.body.style.overflow = '';
      }
    };
  }, [isMobile, isOpen]);

  // Disable body scroll on mobile when in Lab to prevent double scroll
  React.useEffect(() => {
    if (isMobile) {
      // Prevent body scroll - only Lab content should scroll
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.width = '';
    }
    return () => {
      if (isMobile) {
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.width = '';
      }
    };
  }, [isMobile]);

  const handleSelect = (category: string, item: string) => {
    onSelect(category, item);
    onClose();
  };

  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <Box 
      minH="100vh" 
      pt={{ base: "70px", md: "80px" }} 
      position="relative"
      w="100%"
      maxW="100vw"
      h={isMobile ? "calc(100vh - 70px)" : "auto"}
      overflow="hidden"
      css={{
        // No mobile, garantir que não haja padding extra
        ...(isMobile && {
          paddingTop: '70px',
        }),
      }}
    >
      <Flex 
        w="100%" 
        maxW="100vw"
        h={isMobile ? "100%" : "calc(100vh - 80px)"}
        position="relative"
        direction={{ base: "column", md: "row" }}
      >
        {/* Desktop Sidebar - Fixed Position */}
        <Box 
          display={{ base: 'none', md: 'flex' }}
          position="fixed"
          left={0}
          top="80px"
          bottom={0}
          w={`${sidebarWidth}px`}
          zIndex={20}
          bg={bg}
          borderRight="1px solid"
          borderColor={borderColor}
          overflowY="auto"
          overflowX="hidden"
          transition="width 0.3s ease"
        >
          <LabSidebar activeCategory={activeCategory} activeItem={activeItem} onSelect={handleSelect} />
        </Box>

        {/* Mobile Sidebar Drawer - Bottom Sheet Style */}
        <Drawer 
          isOpen={isOpen} 
          placement="bottom" 
          onClose={onClose}
          size="full"
        >
          <DrawerOverlay zIndex={150} bg="blackAlpha.600" />
          <DrawerContent 
            bg={bg} 
            borderTopRadius="2xl"
            maxH="85vh"
            zIndex={151}
            css={{
              boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
            }}
          >
            <Box
              position="absolute"
              top={2}
              left="50%"
              transform="translateX(-50%)"
              w="40px"
              h="4px"
              bg={useColorModeValue('gray.300', 'gray.600')}
              borderRadius="full"
              cursor="pointer"
              onClick={onClose}
            />
            <Box pt={6} pb={4} px={4} overflowY="auto" maxH="calc(85vh - 20px)">
              <LabSidebar activeCategory={activeCategory} activeItem={activeItem} onSelect={handleSelect} />
            </Box>
          </DrawerContent>
        </Drawer>

        {/* Main Content Area - Single scroll on mobile */}
        <Box 
          flex="1" 
          w="full" 
          maxW="100vw"
          ml={{ base: 0, md: `${sidebarWidth}px` }}
          position="relative"
          overflowY="auto"
          overflowX="hidden"
          h="100%"
          transition="margin-left 0.3s ease"
          css={{
            // Use native scroll, no nested scroll
            WebkitOverflowScrolling: 'touch',
            // Ensure this is the only scrollable element on mobile
            ...(isMobile && {
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              width: '100%',
              maxWidth: '100vw',
              // Remover qualquer padding que empurre conteúdo para baixo
              paddingTop: 0,
              marginTop: 0,
            }),
          }}
        >
          {/* Mobile Top Bar - FIXO abaixo da navbar - COLADO NO TOPO */}
          {isMobile && (
            <Box 
              position="fixed"
              top="70px"
              left={0}
              right={0}
              zIndex={199}
              bg={bg}
              borderBottom="1px solid"
              borderColor={borderColor}
              w="100%"
              maxW="100vw"
              css={{
                top: '70px',
                position: 'fixed',
                left: 0,
                right: 0,
                width: '100%',
                maxWidth: '100vw',
                boxSizing: 'border-box',
                // Fundo completamente opaco
                backgroundColor: bg + ' !important',
                background: bg + ' !important',
                // Garantir que cubra tudo
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                // Forçar opacidade total
                opacity: 1,
                // Garantir que está acima do conteúdo
                isolation: 'isolate',
              }}
            >
              <HStack 
                justify="space-between" 
                align="center" 
                p={3}
                spacing={3}
              >
                <HStack spacing={2} flex={1} minW={0}>
                  <IconButton
                    onClick={onOpen}
                    aria-label="Open Menu"
                    icon={<FaBars />}
                    variant="ghost"
                    size="sm"
                    color={useColorModeValue('gray.700', 'gray.300')}
                  />
                  <VStack align="start" spacing={0} flex={1} minW={0}>
                    <Text 
                      fontSize="xs" 
                      fontWeight="bold" 
                      color={useColorModeValue('gray.600', 'gray.400')}
                      textTransform="uppercase"
                      letterSpacing="wide"
                      noOfLines={1}
                    >
                      Cosmic Lab
                    </Text>
                    <Text 
                      fontSize="sm" 
                      fontWeight="semibold"
                      color={useColorModeValue('gray.800', 'gray.200')}
                      noOfLines={1}
                    >
                      {activeCategory || 'Explorar'}
                    </Text>
                  </VStack>
                </HStack>
                <Badge 
                  colorScheme="cyan" 
                  variant="subtle"
                  fontSize="xs"
                  px={2}
                  py={1}
                >
                  Lab
                </Badge>
              </HStack>
            </Box>
          )}

          {/* Mobile Floating Menu Button - Creative Design */}
          {isMobile && (
            <MotionBox
              position="fixed"
              bottom={4}
              right={4}
              zIndex={100}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <IconButton
                onClick={onOpen}
                aria-label="Open Lab Menu"
                icon={<FaBars />}
                size="lg"
                isRound
                bgGradient="linear(to-r, cyan.400, purple.500)"
                color="white"
                boxShadow="0 4px 20px rgba(66, 153, 225, 0.4)"
                _hover={{
                  bgGradient: "linear(to-r, cyan.500, purple.600)",
                  transform: "scale(1.1)",
                  boxShadow: "0 6px 30px rgba(66, 153, 225, 0.6)",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
                transition="all 0.2s"
              />
            </MotionBox>
          )}

          {/* Content - Começa DEPOIS da barra fixa */}
          <Box 
            p={{ base: 4, md: 4, lg: 8 }} 
            maxW={{ base: "100vw", md: "1200px" }} 
            mx="auto" 
            w="full"
            pb={{ base: 20, md: 4 }}
            css={{
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: '100vw',
              // Garantir que o conteúdo comece DEPOIS da barra fixa no mobile
              ...(isMobile && {
                // Padding top para compensar a altura da barra fixa (aproximadamente 60px)
                paddingTop: '60px',
                marginTop: 0,
                position: 'relative',
                zIndex: 1,
                // Garantir que não apareça por trás da barra fixa
                transform: 'translateZ(0)',
              }),
            }}
          >
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
