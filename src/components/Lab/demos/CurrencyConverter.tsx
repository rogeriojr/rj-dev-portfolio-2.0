import { useState, useEffect } from 'react';
import { Box, Button, HStack, Text, VStack, Input, Select, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorModeValue } from '@chakra-ui/react';
import { FaExchangeAlt, FaChartLine } from 'react-icons/fa';

const MOCK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  BRL: 5.15,
  GBP: 0.79,
  JPY: 151.4,
};

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('BRL');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const bg = useColorModeValue('white', 'gray.800');

  const calculatedev = () => {
    setLoading(true);
    setTimeout(() => {
      const rate = MOCK_RATES[to] / MOCK_RATES[from];
      setResult(parseFloat(amount) * rate);
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    calculatedev();
  }, [amount, from, to]);

  const toggleCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Box bg={bg} p={6} rounded="xl" shadow="lg" border="1px solid" borderColor="whiteAlpha.200" maxW="400px">
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="lg">Currency Exchange</Text>
          <FaChartLine color="gray" />
        </HStack>

        <HStack>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            size="lg"
            fontWeight="bold"
          />
        </HStack>

        <HStack justify="space-between" align="center">
          <Select value={from} onChange={(e) => setFrom(e.target.value)} size="lg" w="120px" fontWeight="bold">
            {Object.keys(MOCK_RATES).map(c => <option key={c} value={c}>{c}</option>)}
          </Select>

          <Button onClick={toggleCurrencies} rounded="full" colorScheme="cyan" variant="ghost">
            <FaExchangeAlt />
          </Button>

          <Select value={to} onChange={(e) => setTo(e.target.value)} size="lg" w="120px" fontWeight="bold">
            {Object.keys(MOCK_RATES).map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
        </HStack>

        <Box bg="blackAlpha.200" p={4} rounded="lg" position="relative" overflow="hidden">
          {loading ? (
            <Text color="gray.500" fontSize="sm">Updating rates...</Text>
          ) : (
            <Stat>
              <StatLabel>Converted Amount</StatLabel>
              <StatNumber fontSize="3xl" color="green.400">
                {result?.toFixed(2)} <Text as="span" fontSize="lg" color="gray.500">{to}</Text>
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                1 {from} = {(MOCK_RATES[to] / MOCK_RATES[from]).toFixed(4)} {to}
              </StatHelpText>
            </Stat>
          )}
        </Box>

        <Text fontSize="xs" color="gray.500" textAlign="center">
          *Rates simulated for demonstration purposes. Use real API for production.
        </Text>
      </VStack>
    </Box>
  );
};
