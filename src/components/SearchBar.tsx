import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useTranslation } from '../i18n/useTranslation';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const { t } = useTranslation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <FaSearch color="gray" />
      </InputLeftElement>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t('projects.search') || 'Buscar projetos...'}
        bg={bgColor}
        borderColor={borderColor}
        _hover={{ borderColor: 'blue.400' }}
        _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
      />
      {value && (
        <InputRightElement>
          <IconButton
            aria-label="Limpar busca"
            icon={<FaTimes />}
            size="sm"
            variant="ghost"
            onClick={() => onChange('')}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
