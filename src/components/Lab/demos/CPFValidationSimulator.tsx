import { useState } from 'react';
import {
  Box, VStack, HStack, Text, Input,
  FormControl, FormLabel, FormErrorMessage,
  Badge, Icon, Collapse, Code
} from '@chakra-ui/react';
import { FaFingerprint, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export const CPFValidationSimulator = () => {
  const [cpf, setCpf] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateCPF = (val: string) => {
    const cleanCpf = val.replace(/\D/g, '');

    if (cleanCpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cleanCpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(10, 11))) return false;

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 11);
    const masked = value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');

    setCpf(masked);

    if (value.length === 11) {
      const valid = validateCPF(value);
      setIsValid(valid);
      setError(valid ? null : 'CPF Inválido (Dígitos verificadores incorretos)');
    } else {
      setIsValid(null);
      setError(value.length > 0 ? 'CPF incompleto' : null);
    }
  };

  return (
    <Box
      p={6}
      bg="rgba(10, 20, 40, 0.7)"
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      maxW="450px"
      mx="auto"
    >
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaFingerprint} color="cyan.400" />
            <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700">CPF_VALIDATOR_ENGINE</Text>
          </HStack>
          <Badge colorScheme={isValid ? 'green' : 'red'} variant="outline">
            {isValid === null ? 'WAITING' : isValid ? 'VALID' : 'INVALID'}
          </Badge>
        </HStack>

        <FormControl isInvalid={!!error}>
          <FormLabel fontSize="2xs" color="whiteAlpha.500">Document Number (CPF)</FormLabel>
          <Input
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleChange}
            bg="blackAlpha.300"
            borderColor="whiteAlpha.200"
            color="white"
            _focus={{ borderColor: 'cyan.500' }}
          />
          <FormErrorMessage fontSize="xs">{error}</FormErrorMessage>
        </FormControl>

        <Collapse in={isValid !== null}>
          <Box p={3} bg="blackAlpha.400" borderRadius="md" borderLeft="2px solid" borderColor={isValid ? 'green.400' : 'red.400'}>
            <HStack mb={2}>
              <Icon as={isValid ? FaCheckCircle : FaExclamationCircle} color={isValid ? 'green.400' : 'red.400'} boxSize={3} />
              <Text fontSize="xs" color="whiteAlpha.800" fontWeight="bold">
                {isValid ? 'Checksum Verified' : 'Checksum Failed'}
              </Text>
            </HStack>
            <Text fontSize="2xs" color="whiteAlpha.500">
              {isValid
                ? 'Os dígitos verificadores conferem com o algoritmo do Ministério da Fazenda.'
                : 'O algoritmo de validação detectou que os dígitos verificadores não correspondem aos dados fornecidos.'}
            </Text>
          </Box>
        </Collapse>

        <Box>
          <Text fontSize="2xs" color="whiteAlpha.400" mb={1}>VALIDATION_LOGIC (JS)</Text>
          <Code display="block" p={2} bg="black" color="green.300" fontSize="10px" borderRadius="md">
            {`const sum = digits.reduce((a, b, i) => a + b * (11 - i), 0);
const remainder = (sum * 10) % 11;`}
          </Code>
        </Box>
      </VStack>
    </Box>
  );
};
