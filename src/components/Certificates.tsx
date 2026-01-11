import { Box, SimpleGrid, Container, Heading, Text, VStack, Badge, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { LazyImage } from './LazyImage';
import { certificates } from '../data/certificates';
import { useTranslation } from '../i18n/useTranslation';
import { FaAward, FaCalendarAlt, FaClock, FaUniversity, FaCertificate } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export function Certificates() {
  const { t, language } = useTranslation();
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');

  const categoryColors: Record<string, string> = {
    web: 'cyan',
    mobile: 'purple',
    backend: 'green',
    design: 'pink',
    other: 'gray',
  };

  return (
    <Box position="relative" minH="100vh">
      <Container maxW="container.xl" py={20} position="relative" zIndex={1}>
        <VStack spacing={12} align="stretch">
          <MotionBox
            textAlign="center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Icon as={FaAward} w={16} h={16} color="yellow.400" mb={4} filter="drop-shadow(0 0 10px rgba(236, 201, 75, 0.6))" />
            <Heading
              size="2xl"
              mb={4}
              bgGradient="linear(to-r, yellow.400, orange.500)"
              bgClip="text"
              fontWeight="extrabold"
            >
              {t('certificates.title')}
            </Heading>
            <Text fontSize="xl" color="gray.400">
              {language === 'pt'
                ? `Conquistas desbloqueadas: ${certificates.length} missões completadas.`
                : `Achievements unlocked: ${certificates.length} missions completed.`}
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {certificates.map((cert, index) => (
              <MotionBox
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  boxShadow: `0 0 30px ${categoryColors[cert.category]}.500`,
                }}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="2xl"
                overflow="hidden"
                bg={useColorModeValue('rgba(255,255,255,0.8)', 'rgba(26,32,44,0.6)')}
                boxShadow="xl"
                backdropFilter="blur(16px)"
                position="relative"
                role="group"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: `linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.1) 50%, transparent 55%)`,
                  backgroundSize: '200% 200%',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
                _hover={{
                  _before: { opacity: 1, animation: 'holo-sweep 2s linear infinite' }
                }}
              >
                <Box position="relative" overflow="hidden">
                  <LazyImage
                    src={cert.image}
                    alt={cert.title[language]}
                    height="200px"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    top={0} left={0} right={0} bottom={0}
                    bgGradient="linear(to-b, transparent 60%, blackAlpha.800)"
                    opacity={0.8}
                    transition="0.3s"
                  />
                  <Box position="absolute" top={4} right={4}>
                    <Icon as={FaCertificate} color="yellow.400" w={6} h={6} filter="drop-shadow(0 0 5px orange)" />
                  </Box>
                </Box>

                <Box p={6} position="relative">
                  <VStack align="start" spacing={4}>
                    <Badge
                      colorScheme={categoryColors[cert.category]}
                      borderRadius="full"
                      px={3}
                      py={1}
                      variant="solid"
                      boxShadow={`0 0 15px ${categoryColors[cert.category]}.400`}
                    >
                      {cert.category.toUpperCase()}
                    </Badge>

                    <Heading size="md" lineHeight="short" bgGradient={`linear(to-r, ${categoryColors[cert.category]}.300, ${categoryColors[cert.category]}.500)`} bgClip="text">
                      {cert.title[language]}
                    </Heading>

                    <HStack fontSize="sm" color="gray.500" spacing={1}>
                      <Icon as={FaUniversity} color={categoryColors[cert.category] + ".400"} />
                      <Text fontWeight="medium">{cert.institution}</Text>
                    </HStack>

                    <HStack width="full" justify="space-between" pt={4} borderTopWidth="1px" borderColor={borderColor}>
                      <HStack fontSize="xs" color="gray.500">
                        <Icon as={FaClock} />
                        <Text fontWeight="bold">{cert.hours}h</Text>
                      </HStack>
                      <HStack fontSize="xs" color="gray.500">
                        <Icon as={FaCalendarAlt} />
                        <Text>{cert.year}</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
