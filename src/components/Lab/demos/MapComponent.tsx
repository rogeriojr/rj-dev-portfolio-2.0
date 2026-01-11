import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaSearch, FaCrosshairs, FaRoute } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export function MapComponent() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locations] = useState<Location[]>([
    { id: '1', name: 'São Paulo, SP', lat: -23.5505, lng: -46.6333, description: 'Cidade mais populosa do Brasil' },
    { id: '2', name: 'Rio de Janeiro, RJ', lat: -22.9068, lng: -43.1729, description: 'Cidade maravilhosa' },
    { id: '3', name: 'Belo Horizonte, MG', lat: -19.9167, lng: -43.9345, description: 'Capital de Minas Gerais' },
    { id: '4', name: 'Brasília, DF', lat: -15.7942, lng: -47.8822, description: 'Capital do Brasil' },
  ]);

  const bg = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.700');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box w="full" maxW="800px" mx="auto">
      <VStack spacing={4} align="stretch">
        <Box
          h="400px"
          bg={bg}
          borderRadius="xl"
          border="2px solid"
          borderColor={borderColor}
          position="relative"
          overflow="hidden"
          bgGradient="linear(to-br, blue.100, green.100)"
        >
          {filteredLocations.map((loc, idx) => (
            <Box
              key={loc.id}
              as={motion.div}
              position="absolute"
              left={`${20 + idx * 25}%`}
              top={`${30 + idx * 15}%`}
              cursor="pointer"
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelectedLocation(loc)}
            >
              <Icon
                as={FaMapMarkerAlt}
                w={8}
                h={8}
                color={selectedLocation?.id === loc.id ? 'red.500' : 'blue.500'}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              />
            </Box>
          ))}

          {userLocation && (
            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
            >
              <Icon
                as={FaCrosshairs}
                w={6}
                h={6}
                color="green.500"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              />
            </Box>
          )}

          <Box
            position="absolute"
            bottom={4}
            left={4}
            bg={cardBg}
            p={3}
            borderRadius="md"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <Text fontSize="xs" fontWeight="bold" color="gray.600">
              {userLocation
                ? `Sua localização: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                : 'Mapa interativo - Clique nos marcadores'}
            </Text>
          </Box>
        </Box>

        <HStack spacing={2} flexWrap="wrap">
          <InputGroup flex={1} minW="200px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Buscar localização..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Button
            leftIcon={<FaCrosshairs />}
            onClick={getCurrentLocation}
            colorScheme="green"
            size="md"
          >
            Minha Localização
          </Button>
          <Button
            leftIcon={<FaRoute />}
            isDisabled={!selectedLocation}
            colorScheme="blue"
            size="md"
          >
            Rota
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
          {filteredLocations.map((loc) => (
            <Card
              key={loc.id}
              bg={cardBg}
              border="1px solid"
              borderColor={selectedLocation?.id === loc.id ? 'blue.400' : borderColor}
              cursor="pointer"
              onClick={() => setSelectedLocation(loc)}
              _hover={{ borderColor: 'blue.400', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <CardBody>
                <HStack justify="space-between" mb={2}>
                  <HStack>
                    <Icon as={FaMapMarkerAlt} color="blue.500" />
                    <Text fontWeight="bold">{loc.name}</Text>
                  </HStack>
                  {selectedLocation?.id === loc.id && (
                    <Badge colorScheme="blue">Selecionado</Badge>
                  )}
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  {loc.description}
                </Text>
                <Text fontSize="xs" color="gray.400" mt={2}>
                  {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
