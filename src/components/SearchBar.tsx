import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  useColorModeValue,
  Icon,
  Box,
} from '@chakra-ui/react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useTranslation } from '../i18n/useTranslation';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MotionBox = motion(Box);

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const { t, language } = useTranslation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const focusBorderColor = useColorModeValue('cyan.400', 'cyan.500');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <MotionBox
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none" h="full" pl={{ base: 3, md: 4 }}>
          <Icon as={FaSearch} color={value ? focusBorderColor : 'gray.400'} />
        </InputLeftElement>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || t('projects.search') || (language === 'pt' ? 'Buscar projetos...' : 'Search projects...')}
          bg={bgColor}
          borderColor={borderColor}
          borderWidth="2px"
          fontSize={{ base: "sm", md: "md" }}
          pl={{ base: 12, md: 14 }}
          pr={{ base: value ? 10 : 4, md: value ? 12 : 4 }}
          h={{ base: "48px", md: "56px" }}
          borderRadius="xl"
          _hover={{ 
            borderColor: focusBorderColor,
            bg: hoverBg,
            boxShadow: `0 0 0 1px ${focusBorderColor}40`
          }}
          _focus={{ 
            borderColor: focusBorderColor, 
            boxShadow: `0 0 0 3px ${focusBorderColor}30`,
            bg: hoverBg
          }}
          transition="all 0.2s ease-in-out"
        />
        {value && (
          <InputRightElement h="full" pr={{ base: 2, md: 3 }}>
            <IconButton
              aria-label={language === 'pt' ? 'Limpar busca' : 'Clear search'}
              icon={<FaTimes />}
              size="sm"
              variant="ghost"
              onClick={() => onChange('')}
              colorScheme="gray"
              borderRadius="full"
              _hover={{ 
                bg: useColorModeValue('gray.100', 'gray.600'),
                transform: 'scale(1.1)'
              }}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </MotionBox>
  );
}
