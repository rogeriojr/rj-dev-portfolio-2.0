import {
  Box,
  IconButton,
  Image,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Icon,
  Circle,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaRocket, FaSearchPlus } from 'react-icons/fa';
import { css, keyframes } from '@emotion/react';
import { PlanetSpinner } from './PlanetSpinner';

interface StellarImageCarouselProps {
  images: string[];
  onImageClick?: (image: string) => void;
}

const starFieldAnimation = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 0.3; }
  50% { opacity: 1; }
  100% { transform: translateY(-100vh) translateX(50px); opacity: 0.3; }
`;

const planetGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(139, 92, 246, 0.2); }
  50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6), 0 0 60px rgba(139, 92, 246, 0.4); }
`;

const MotionBox = motion(Box);
const MotionImage = motion(Image);

export function StellarImageCarousel({ images, onImageClick }: StellarImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<number>>(new Set());

  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToSlide = (index: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Verificar se a imagem existe antes de marcar como carregando
    if (!imageErrors.has(index)) {
      setImageLoading(prev => new Set(prev).add(index));
    }
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + images.length) % images.length, -1);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % images.length, 1);
  };

  const goToSlideIndex = (index: number) => {
    const dir = index > currentIndex ? 1 : -1;
    goToSlide(index, dir);
  };

  if (!images || images.length === 0) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
    }),
  };

  // Análise inteligente do tipo de imagem
  const currentImage = images[currentIndex] || '';
  const isLogo = currentImage.includes('logo') || currentImage.includes('Logo');
  const isScreenshot = currentImage.includes('screenshot') ||
    currentImage.includes('Screenshot') ||
    currentImage.match(/\.(png|jpg|jpeg)$/i) && !isLogo;

  // Determinar fundo baseado no tipo de imagem
  const getBackgroundColor = () => {
    if (isLogo) return 'white';
    if (isScreenshot) return 'gray.900';
    return 'gray.800';
  };

  const getBackgroundPattern = () => {
    if (isLogo) {
      return 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
    }
    return `linear-gradient(
      135deg,
      rgba(17, 24, 39, 0.95) 0%,
      rgba(31, 41, 55, 0.95) 50%,
      rgba(17, 24, 39, 0.95) 100%
    )`;
  };

  return (
    <Box position="relative" w="full" mb={8}>
      {/* Starfield Background */}
      <Box
        position="absolute"
        inset={0}
        overflow="hidden"
        borderRadius="2xl"
        zIndex={0}
        css={css`
          &::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at 30% 50%,
              rgba(99, 102, 241, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 70% 50%,
              rgba(139, 92, 246, 0.1) 0%,
              transparent 50%
            );
            animation: ${planetGlow} 4s ease-in-out infinite;
          }
        `}
      >
        {[...Array(30)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            css={css`
              top: ${Math.random() * 100}%;
              left: ${Math.random() * 100}%;
              width: ${Math.random() * 2 + 1}px;
              height: ${Math.random() * 2 + 1}px;
              background: white;
              border-radius: 50%;
              opacity: ${Math.random() * 0.5 + 0.3};
              animation: ${starFieldAnimation} ${Math.random() * 10 + 5}s linear infinite;
              animation-delay: ${Math.random() * 2}s;
            `}
          />
        ))}
      </Box>

      {/* Main Carousel Container */}
      <Box
        position="relative"
        w="full"
        h={{ base: '300px', sm: '400px', md: '500px', lg: '600px', xl: '700px' }}
        borderRadius={{ base: 'xl', md: '2xl' }}
        overflow="hidden"
        border={{ base: '1px solid', md: '2px solid' }}
        borderColor={borderColor}
        bg={getBackgroundColor()}
        boxShadow={{ base: 'lg', md: '2xl' }}
        zIndex={1}
        css={css`
          background: ${getBackgroundPattern()};
        `}
      >
        {/* Image Container - Sempre mostra imagem completa */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          w="full"
          h="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor={onImageClick ? 'pointer' : 'default'}
          onClick={() => onImageClick?.(images[currentIndex])}
          p={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
          overflow="hidden"
        >
          <AnimatePresence mode="wait" custom={direction}>
            {imageErrors.has(currentIndex) ? (
              <MotionBox
                key={`error-${currentIndex}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 },
                  rotateY: { duration: 0.3 },
                }}
                w="full"
                h="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                p={8}
              >
                <Icon as={FaRocket} w={16} h={16} color="gray.500" mb={4} />
                <Text color="gray.400" fontSize="sm" textAlign="center">
                  Imagem não encontrada
                </Text>
                <Text color="gray.500" fontSize="xs" textAlign="center" mt={2} maxW="80%">
                  {currentImage.split('/').pop()}
                </Text>
              </MotionBox>
            ) : (
              <MotionImage
                key={`${currentIndex}-${currentImage}`}
                src={images[currentIndex]}
                alt={`Project image ${currentIndex + 1}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 },
                  rotateY: { duration: 0.3 },
                }}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                borderRadius={{ base: 'lg', md: 'xl' }}
                boxShadow={isLogo ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 4px 20px rgba(0, 0, 0, 0.3)'}
                onLoad={() => {
                  setImageLoading(prev => {
                    const next = new Set(prev);
                    next.delete(currentIndex);
                    return next;
                  });
                }}
                onError={() => {
                  console.error(`Failed to load image: ${images[currentIndex]}`);
                  setImageErrors(prev => new Set(prev).add(currentIndex));
                  setImageLoading(prev => {
                    const next = new Set(prev);
                    next.delete(currentIndex);
                    return next;
                  });
                }}
                opacity={imageLoading.has(currentIndex) ? 0 : 1}
                css={{
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
            )}
            {imageLoading.has(currentIndex) && !imageErrors.has(currentIndex) && (
              <Center
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={2}
              >
                <PlanetSpinner size={80} />
              </Center>
            )}
          </AnimatePresence>

          {/* Overlay on Hover */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.5)"
            opacity={0}
            transition="opacity 0.3s"
            _hover={{ opacity: 1 }}
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
            justifyContent="center"
            borderRadius={{ base: 'lg', md: 'xl' }}
            pointerEvents="none"
            zIndex={1}
          >
            <VStack spacing={{ base: 1, md: 2 }}>
              <Icon as={FaSearchPlus} color="white" w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} />
              <Text color="white" fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" textAlign="center">
                Clique para ampliar
              </Text>
            </VStack>
          </Box>
        </Box>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <IconButton
              aria-label="Previous image"
              icon={<FaChevronLeft />}
              position="absolute"
              left={{ base: 2, sm: 3, md: 4 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              size={{ base: 'lg', sm: 'lg', md: 'lg' }}
              minW={{ base: "48px", md: "auto" }}
              minH={{ base: "48px", md: "auto" }}
              borderRadius="full"
              bg="rgba(0, 0, 0, 0.7)"
              color="white"
              _hover={{
                bg: 'rgba(99, 102, 241, 0.9)',
                transform: 'translateY(-50%) scale(1.1)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
              }}
              _active={{
                transform: 'translateY(-50%) scale(0.9)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              transition="all 0.3s"
            />

            <IconButton
              aria-label="Next image"
              icon={<FaChevronRight />}
              position="absolute"
              right={{ base: 2, sm: 3, md: 4 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              size={{ base: 'lg', sm: 'lg', md: 'lg' }}
              minW={{ base: "48px", md: "auto" }}
              minH={{ base: "48px", md: "auto" }}
              borderRadius="full"
              bg="rgba(0, 0, 0, 0.7)"
              color="white"
              _hover={{
                bg: 'rgba(139, 92, 246, 0.9)',
                transform: 'translateY(-50%) scale(1.1)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
              }}
              _active={{
                transform: 'translateY(-50%) scale(0.9)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              transition="all 0.3s"
            />
          </>
        )}

        {/* Slide Counter */}
        {images.length > 1 && (
          <Box
            position="absolute"
            top={{ base: 2, sm: 3, md: 4 }}
            right={{ base: 2, sm: 3, md: 4 }}
            zIndex={2}
            bg="rgba(0, 0, 0, 0.75)"
            px={{ base: 2, sm: 3, md: 4 }}
            py={{ base: 1, sm: 1.5, md: 2 }}
            borderRadius="full"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
          >
            <HStack spacing={{ base: 1, md: 2 }} align="center">
              <Icon as={FaRocket} color="yellow.400" w={{ base: 3, sm: 3.5, md: 4 }} h={{ base: 3, sm: 3.5, md: 4 }} />
              <Text color="white" fontSize={{ base: 'xs', sm: 'sm', md: 'sm' }} fontWeight="bold">
                {currentIndex + 1} / {images.length}
              </Text>
            </HStack>
          </Box>
        )}
      </Box>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <Box
          mt={{ base: 4, sm: 5, md: 6 }}
          w="full"
          overflowX="auto"
          pb={2}
          css={{
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
            },
            '@media (min-width: 48em)': {
              '&::-webkit-scrollbar': {
                height: '6px',
              },
            },
          }}
        >
          <HStack
            spacing={{ base: 2, sm: 3, md: 4 }}
            justify={{ base: 'flex-start', md: 'center' }}
            align="center"
            minW="max-content"
            px={{ base: 1, sm: 2, md: 2 }}
          >
            {images.map((img, index) => {
              const isThumbnailLogo = img.includes('logo');
              const isActive = index === currentIndex;

              return (
                <Box
                  key={index}
                  position="relative"
                  cursor="pointer"
                  onClick={() => goToSlideIndex(index)}
                  borderRadius="lg"
                  overflow="hidden"
                  border="2px solid"
                  borderColor={isActive ? 'purple.400' : 'gray.600'}
                  boxShadow={isActive ? '0 0 20px rgba(139, 92, 246, 0.6)' : '0 0 5px rgba(0, 0, 0, 0.3)'}
                  transform={isActive ? 'scale(1.08)' : 'scale(1)'}
                  transition="all 0.3s ease"
                  _hover={{
                    transform: 'scale(1.12)',
                    borderColor: isActive ? 'purple.300' : 'purple.500',
                    boxShadow: '0 0 25px rgba(139, 92, 246, 0.7)',
                  }}
                  _active={{
                    transform: 'scale(1.05)',
                  }}
                  minW={{ base: '60px', sm: '70px', md: '90px', lg: '100px' }}
                  w={{ base: '60px', sm: '70px', md: '90px', lg: '100px' }}
                  h={{ base: '60px', sm: '70px', md: '90px', lg: '100px' }}
                  bg={isThumbnailLogo ? 'white' : 'gray.800'}
                  p={isThumbnailLogo ? { base: 1, sm: 1.5, md: 2 } : 0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    maxW="full"
                    maxH="full"
                    w="auto"
                    h="auto"
                    objectFit="contain"
                    opacity={isActive ? 1 : 0.7}
                    transition="opacity 0.3s"
                    filter={isActive ? 'none' : 'brightness(0.9)'}
                  />
                  {isActive && (
                    <Box
                      position="absolute"
                      top={{ base: 1, sm: 1.5, md: 2 }}
                      right={{ base: 1, sm: 1.5, md: 2 }}
                      bg="purple.400"
                      borderRadius="full"
                      p={{ base: 0.5, md: 1 }}
                      boxShadow="0 0 10px rgba(139, 92, 246, 0.8)"
                    >
                      <Circle size={{ base: '4px', sm: '5px', md: '6px' }} bg="white" />
                    </Box>
                  )}
                  {/* Hover overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="rgba(139, 92, 246, 0.1)"
                    opacity={0}
                    transition="opacity 0.3s"
                    _hover={{ opacity: 1 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    pointerEvents="none"
                  />
                </Box>
              );
            })}
          </HStack>
        </Box>
      )}

      {/* Progress Indicator */}
      {images.length > 1 && isAutoPlaying && (
        <Box
          mt={{ base: 3, sm: 3, md: 4 }}
          w="full"
          h={{ base: '1.5px', md: '2px' }}
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="full"
          overflow="hidden"
        >
          <MotionBox
            h="full"
            bg="linear-gradient(90deg, #6366f1, #8b5cf6)"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
            key={currentIndex}
          />
        </Box>
      )}
    </Box>
  );
}
