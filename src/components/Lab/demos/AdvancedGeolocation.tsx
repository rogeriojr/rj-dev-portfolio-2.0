import { useState, useEffect } from 'react';
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
import { FaMapMarkerAlt, FaSearch, FaCrosshairs, FaRoute, FaLocationArrow, FaCompass } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  distance?: number;
}

const MotionBox = motion(Box);

export function AdvancedGeolocation() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  
  const [locations] = useState<Location[]>([
    { id: '1', name: 'São Paulo, SP', lat: -23.5505, lng: -46.6333, description: 'Cidade mais populosa do Brasil' },
    { id: '2', name: 'Rio de Janeiro, RJ', lat: -22.9068, lng: -43.1729, description: 'Cidade maravilhosa' },
    { id: '3', name: 'Belo Horizonte, MG', lat: -19.9167, lng: -43.9345, description: 'Capital de Minas Gerais' },
    { id: '4', name: 'Brasília, DF', lat: -15.7942, lng: -47.8822, description: 'Capital do Brasil' },
    { id: '5', name: 'Salvador, BA', lat: -12.9714, lng: -38.5014, description: 'Primeira capital do Brasil' },
    { id: '6', name: 'Curitiba, PR', lat: -25.4284, lng: -49.2733, description: 'Cidade modelo' },
  ]);

  const bg = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.700');

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setAccuracy(position.coords.accuracy);
          if (position.coords.heading !== null) setHeading(position.coords.heading);
          if (position.coords.speed !== null) setSpeed(position.coords.speed);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  };

  const startTracking = () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setAccuracy(position.coords.accuracy);
          if (position.coords.heading !== null) setHeading(position.coords.heading);
          if (position.coords.speed !== null) setSpeed(position.coords.speed);
        },
        (error) => {
          console.error('Error tracking location:', error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      setWatchId(id);
    }
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const locationsWithDistance = locations.map(loc => {
    if (userLocation) {
      const distance = calculateDistance(userLocation.lat, userLocation.lng, loc.lat, loc.lng);
      return { ...loc, distance };
    }
    return loc;
  }).sort((a, b) => {
    if (a.distance === undefined) return 1;
    if (b.distance === undefined) return -1;
    return a.distance - b.distance;
  });

  const filteredLocations = locationsWithDistance.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box w="full" maxW="1000px" mx="auto">
      <VStack spacing={4} align="stretch">
        {/* Map Canvas (Simulated) */}
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
          {/* Simulated Map Markers */}
          {filteredLocations.map((loc, idx) => (
            <MotionBox
              key={loc.id}
              as="div"
              position="absolute"
              left={`${15 + (idx % 3) * 30}%`}
              top={`${20 + Math.floor(idx / 3) * 30}%`}
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
              {loc.distance !== undefined && (
                <Badge
                  position="absolute"
                  top="-8px"
                  right="-8px"
                  colorScheme="green"
                  fontSize="xs"
                >
                  {loc.distance.toFixed(1)}km
                </Badge>
              )}
            </MotionBox>
          ))}

          {/* User Location Marker */}
          {userLocation && (
            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
            >
              <Icon
                as={FaCrosshairs}
                w={8}
                h={8}
                color="green.500"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                transform={heading ? `rotate(${heading}deg)` : undefined}
                transition="transform 0.3s"
              />
              {accuracy && (
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w={`${(accuracy / 1000) * 2}px`}
                  h={`${(accuracy / 1000) * 2}px`}
                  borderRadius="full"
                  border="2px dashed"
                  borderColor="green.400"
                  opacity={0.5}
                />
              )}
            </Box>
          )}

          {/* Map Info Overlay */}
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
            <VStack align="start" spacing={1}>
              {userLocation ? (
                <>
                  <Text fontSize="xs" fontWeight="bold" color="gray.600">
                    Sua Localização
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </Text>
                  {accuracy && (
                    <Text fontSize="xs" color="gray.500">
                      Precisão: {accuracy.toFixed(0)}m
                    </Text>
                  )}
                  {heading !== null && (
                    <HStack spacing={1}>
                      <Icon as={FaCompass} w={3} h={3} />
                      <Text fontSize="xs" color="gray.500">
                        Direção: {heading.toFixed(0)}°
                      </Text>
                    </HStack>
                  )}
                  {speed !== null && speed > 0 && (
                    <Text fontSize="xs" color="gray.500">
                      Velocidade: {(speed * 3.6).toFixed(1)} km/h
                    </Text>
                  )}
                </>
              ) : (
                <Text fontSize="xs" color="gray.500">
                  Clique em "Minha Localização" para começar
                </Text>
              )}
            </VStack>
          </Box>
        </Box>

        {/* Controls */}
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
          {watchId === null ? (
            <Button
              leftIcon={<FaLocationArrow />}
              onClick={startTracking}
              colorScheme="blue"
              size="md"
            >
              Rastrear
            </Button>
          ) : (
            <Button
              leftIcon={<FaLocationArrow />}
              onClick={stopTracking}
              colorScheme="red"
              size="md"
            >
              Parar Rastreamento
            </Button>
          )}
          <Button
            leftIcon={<FaRoute />}
            isDisabled={!selectedLocation || !userLocation}
            colorScheme="purple"
            size="md"
          >
            Calcular Rota
          </Button>
        </HStack>

        {/* Location List */}
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
                <Text fontSize="sm" color="gray.500" mb={2}>
                  {loc.description}
                </Text>
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.400">
                    {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                  </Text>
                  {loc.distance !== undefined && (
                    <Badge colorScheme="green" fontSize="xs">
                      {loc.distance.toFixed(1)} km de distância
                    </Badge>
                  )}
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
