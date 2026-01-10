import { useState } from 'react';
import {
  Box, VStack, HStack, Text, Input,
  FormControl, FormLabel,
  Badge, Icon, Collapse, Code, Select
} from '@chakra-ui/react';
import {
  FaCheckCircle, FaExclamationCircle, FaPhone,
  FaEnvelope, FaLock, FaCreditCard, FaGlobe,
  FaFileSignature, FaShieldAlt, FaCalendarAlt
} from 'react-icons/fa';

type ValidationType =
  | 'phone' | 'email' | 'cnpj' | 'password'
  | 'credit-card' | 'ipv4' | 'url' | 'hex-color'
  | 'date' | 'postal-code';

interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const ValidationSuiteSimulator = () => {
  const [type, setType] = useState<ValidationType>('phone');
  const [value, setValue] = useState('');

  const validate = (val: string, t: ValidationType): ValidationResult => {
    if (!val) return { isValid: false, message: 'Campo vazio' };

    switch (t) {
      case 'phone':
        const phoneRegex = /^\([1-9]{2}\) (?:9[1-9][0-9]{3}|[2-9][0-9]{3})-[0-9]{4}$/;
        return {
          isValid: phoneRegex.test(val),
          message: phoneRegex.test(val) ? 'Telefone BR válido' : 'Formato: (XX) 9XXXX-XXXX'
        };
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
          isValid: emailRegex.test(val),
          message: emailRegex.test(val) ? 'Email válido' : 'Email inválido'
        };
      case 'cnpj':
        const cnpjClean = val.replace(/\D/g, '');
        return {
          isValid: cnpjClean.length === 14,
          message: cnpjClean.length === 14 ? 'CNPJ formato válido' : 'CNPJ deve ter 14 dígitos'
        };
      case 'password':
        const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return {
          isValid: strongPass.test(val),
          message: strongPass.test(val) ? 'Senha Forte' : 'Mín. 8 chars, Maiúsculo, Número e Simbol'
        };
      case 'credit-card':
        const ccRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
        return {
          isValid: ccRegex.test(val),
          message: ccRegex.test(val) ? 'Visa/Master válido' : 'Cartão inválido'
        };
      case 'ipv4':
        const ipv4Regex = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return {
          isValid: ipv4Regex.test(val),
          message: ipv4Regex.test(val) ? 'IP Adress válido' : 'IPv4 inválido'
        };
      case 'url':
        try { new URL(val); return { isValid: true, message: 'URL válida' }; }
        catch { return { isValid: false, message: 'URL inválida' }; }
      case 'hex-color':
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return {
          isValid: hexRegex.test(val),
          message: hexRegex.test(val) ? 'Hex Válido' : 'Ex: #FFFFFF'
        };
      case 'date':
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return {
          isValid: dateRegex.test(val),
          message: dateRegex.test(val) ? 'Data válida' : 'Formato: DD/MM/AAAA'
        };
      case 'postal-code':
        const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
        return {
          isValid: cepRegex.test(val),
          message: cepRegex.test(val) ? 'CEP Válido' : 'Formato: 00000-000'
        };
      default:
        return { isValid: false, message: '' };
    }
  };

  const result = validate(value, type);
  const iconMap: Record<ValidationType, any> = {
    phone: FaPhone, email: FaEnvelope, cnpj: FaFileSignature,
    password: FaLock, 'credit-card': FaCreditCard, ipv4: FaGlobe,
    url: FaGlobe, 'hex-color': FaShieldAlt, date: FaCalendarAlt,
    'postal-code': FaGlobe
  };

  return (
    <Box
      p={6}
      bg="rgba(10, 20, 45, 0.6)"
      borderRadius="2xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      maxW="500px"
      mx="auto"
      boxShadow="2xl"
    >
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <HStack>
            <Icon as={iconMap[type]} color="cyan.400" />
            <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700" letterSpacing="widest">VALIDATION_MASTER_V1</Text>
          </HStack>
          <Badge colorScheme={result.isValid ? 'green' : 'red'} variant="subtle" px={2}>
            {result.isValid ? 'MATCH' : 'MISMATCH'}
          </Badge>
        </HStack>

        <FormControl>
          <FormLabel fontSize="2xs" color="whiteAlpha.500">TYPE_SELECTOR</FormLabel>
          <Select
            size="sm"
            bg="blackAlpha.300"
            borderColor="whiteAlpha.200"
            color="white"
            value={type}
            onChange={(e) => { setType(e.target.value as any); setValue(''); }}
            sx={{
              option: {
                bg: 'gray.800',
                color: 'white'
              }
            }}
          >
            <option value="phone">Phone (BR)</option>
            <option value="email">Email</option>
            <option value="cnpj">CNPJ</option>
            <option value="password">Password Strength</option>
            <option value="credit-card">Credit Card (Visa/Master)</option>
            <option value="ipv4">IPv4 Address</option>
            <option value="url">URL</option>
            <option value="hex-color">HEX Color</option>
            <option value="date">Date (DD/MM/AAAA)</option>
            <option value="postal-code">Postal Code (CEP)</option>
          </Select>
        </FormControl>

        <FormControl isInvalid={!result.isValid && value.length > 0}>
          <FormLabel fontSize="2xs" color="whiteAlpha.500">INPUT_BUFFER</FormLabel>
          <Input
            placeholder="Interacting with validation engine..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            bg="blackAlpha.400"
            borderColor="whiteAlpha.200"
            color="white"
            fontSize="sm"
            _focus={{ borderColor: 'cyan.500' }}
          />
        </FormControl>

        <Collapse in={value.length > 0}>
          <Box
            p={3}
            borderRadius="lg"
            bg={result.isValid ? "rgba(72, 187, 120, 0.1)" : "rgba(245, 101, 101, 0.1)"}
            border="1px solid"
            borderColor={result.isValid ? "green.700" : "red.700"}
          >
            <HStack>
              <Icon as={result.isValid ? FaCheckCircle : FaExclamationCircle} color={result.isValid ? "green.400" : "red.400"} />
              <Text fontSize="xs" fontWeight="bold" color="white">{result.message}</Text>
            </HStack>
          </Box>
        </Collapse>

        <Box>
          <Text fontSize="9px" color="whiteAlpha.400" mb={1}>ENGINE_CODE_PREVIEW</Text>
          <Code display="block" p={3} bg="black" color="cyan.300" fontSize="10px" borderRadius="md" variant="unstyled">
            {`// ${type.toUpperCase()} logic\nif (${type === 'url' ? 'new URL(v)' : 'regex.test(v)'}) {\n  return status.SUCCESS;\n}`}
          </Code>
        </Box>
      </VStack>
    </Box>
  );
};
