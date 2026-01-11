import { HStack, IconButton, Tooltip, Box, useColorModeValue } from "@chakra-ui/react";
import { FaPagelines, FaInfinity } from "react-icons/fa";
import { motion } from "framer-motion";

export type PaginationMode = 'paged' | 'infinite';

interface PaginationModeSelectorProps {
  mode: PaginationMode;
  onChange: (mode: PaginationMode) => void;
}

const MotionBox = motion(Box);

export function PaginationModeSelector({ mode, onChange }: PaginationModeSelectorProps) {
  const activeBg = useColorModeValue('purple.500', 'purple.400');
  const inactiveBg = useColorModeValue('gray.100', 'whiteAlpha.100');
  const activeColor = 'white';
  const inactiveColor = useColorModeValue('gray.600', 'gray.400');

  const modes = [
    { 
      type: 'paged' as PaginationMode, 
      icon: FaPagelines, 
      label: 'Paginado', 
      tooltip: 'Navegação por páginas' 
    },
    { 
      type: 'infinite' as PaginationMode, 
      icon: FaInfinity, 
      label: 'Infinito', 
      tooltip: 'Scroll infinito' 
    },
  ];

  return (
    <HStack spacing={{ base: 1, md: 2 }} p={{ base: 1.5, md: 2 }} bg={useColorModeValue('white', 'whiteAlpha.50')} borderRadius="xl" boxShadow="md">
      {modes.map(({ type, icon: Icon, label, tooltip }) => {
        const isActive = mode === type;
        return (
          <Tooltip key={type} label={tooltip} placement="top" hasArrow>
            <MotionBox
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                aria-label={label}
                icon={<Icon />}
                onClick={() => onChange(type)}
                bg={isActive ? activeBg : inactiveBg}
                color={isActive ? activeColor : inactiveColor}
                _hover={{
                  bg: isActive ? 'purple.600' : useColorModeValue('gray.200', 'whiteAlpha.200'),
                  transform: 'translateY(-2px)',
                }}
                _active={{
                  transform: 'scale(0.9)',
                }}
                transition="all 0.2s"
                size={{ base: "md", md: "md" }}
                minW={{ base: "44px", md: "auto" }}
                minH={{ base: "44px", md: "auto" }}
                borderRadius="lg"
              />
            </MotionBox>
          </Tooltip>
        );
      })}
    </HStack>
  );
}
