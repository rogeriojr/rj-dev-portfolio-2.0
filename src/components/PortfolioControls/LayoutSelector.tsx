import { HStack, IconButton, Tooltip, Box, useColorModeValue } from "@chakra-ui/react";
import { FaTh, FaList, FaThLarge } from "react-icons/fa";
import { motion } from "framer-motion";

export type LayoutType = 'grid' | 'list' | 'compact';

interface LayoutSelectorProps {
  layout: LayoutType;
  onChange: (layout: LayoutType) => void;
}

const MotionBox = motion(Box);

export function LayoutSelector({ layout, onChange }: LayoutSelectorProps) {
  const activeBg = useColorModeValue('blue.500', 'cyan.500');
  const inactiveBg = useColorModeValue('gray.100', 'whiteAlpha.100');
  const activeColor = 'white';
  const inactiveColor = useColorModeValue('gray.600', 'gray.400');

  const layouts = [
    { type: 'grid' as LayoutType, icon: FaTh, label: 'Grid', tooltip: 'Visualização em grade' },
    { type: 'list' as LayoutType, icon: FaList, label: 'Lista', tooltip: 'Visualização em lista' },
    { type: 'compact' as LayoutType, icon: FaThLarge, label: 'Compacto', tooltip: 'Visualização compacta' },
  ];

  return (
    <HStack spacing={{ base: 1, md: 2 }} p={{ base: 1.5, md: 2 }} bg={useColorModeValue('white', 'whiteAlpha.50')} borderRadius="xl" boxShadow="md">
      {layouts.map(({ type, icon: Icon, label, tooltip }) => {
        const isActive = layout === type;
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
                  bg: isActive ? 'blue.600' : useColorModeValue('gray.200', 'whiteAlpha.200'),
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
