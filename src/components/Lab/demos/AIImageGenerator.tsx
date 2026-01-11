import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Textarea,
  Select,
  useColorModeValue,
  Icon,
  Badge,
  Progress,
  SimpleGrid,
  Image,
  Code,
} from '@chakra-ui/react';
import { FaImage, FaMagic, FaDownload, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface GeneratedImage {
  id: string;
  prompt: string;
  style: string;
  url: string;
  timestamp: Date;
}

const STYLES = [
  { value: 'realistic', label: 'Realista' },
  { value: 'artistic', label: 'Artístico' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'minimalist', label: 'Minimalista' },
  { value: 'futuristic', label: 'Futurista' },
];

export function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const bg = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.700');

  const generateImage = () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt,
        style,
        url: `https://picsum.photos/seed/${Date.now()}/512/512`,
        timestamp: new Date(),
      };

      setGeneratedImages([newImage, ...generatedImages]);
      setIsGenerating(false);
      setProgress(100);
      clearInterval(interval);

      setTimeout(() => setProgress(0), 1000);
    }, 2000);
  };

  return (
    <Box w="full" maxW="900px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Generator Panel */}
        <Box p={6} bg={cardBg} borderRadius="xl" border="1px solid" borderColor={borderColor}>
          <VStack spacing={4} align="stretch">
            <HStack spacing={2}>
              <Icon as={FaMagic} color="purple.500" />
              <Text fontSize="lg" fontWeight="bold">
                Gerador de Imagens com IA
              </Text>
            </HStack>

            <Textarea
              placeholder="Descreva a imagem que deseja gerar... (ex: 'Um astronauta flutuando no espaço com estrelas ao fundo')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              resize="vertical"
            />

            <HStack spacing={3}>
              <Select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                flex={1}
                maxW="200px"
              >
                {STYLES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Select>

              <Button
                leftIcon={<FaImage />}
                onClick={generateImage}
                isDisabled={!prompt.trim() || isGenerating}
                colorScheme="purple"
                isLoading={isGenerating}
                loadingText="Gerando..."
                flex={1}
              >
                Gerar Imagem
              </Button>
            </HStack>

            {isGenerating && (
              <Box>
                <Progress value={progress} colorScheme="purple" size="sm" borderRadius="full" />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Processando com IA... {progress}%
                </Text>
              </Box>
            )}
          </VStack>
        </Box>

        {/* Generated Images Gallery */}
        {generatedImages.length > 0 && (
          <Box>
            <HStack mb={4} spacing={2}>
              <Icon as={FaStar} color="purple.500" />
              <Text fontSize="md" fontWeight="bold">
                Imagens Geradas ({generatedImages.length})
              </Text>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {generatedImages.map((img) => (
                <MotionBox
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  p={4}
                  bg={cardBg}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <VStack spacing={3} align="stretch">
                    <Box
                      position="relative"
                      w="full"
                      h="200px"
                      borderRadius="lg"
                      overflow="hidden"
                      bg={bg}
                    >
                      <Image
                        src={img.url}
                        alt={img.prompt}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="medium" noOfLines={2}>
                        {img.prompt}
                      </Text>
                      <HStack spacing={2} flexWrap="wrap">
                        <Badge colorScheme="purple" fontSize="xs">
                          {STYLES.find((s) => s.value === img.style)?.label}
                        </Badge>
                        <Text fontSize="xs" color="gray.500">
                          {img.timestamp.toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                    <Button
                      leftIcon={<FaDownload />}
                      size="sm"
                      variant="outline"
                      colorScheme="purple"
                      w="full"
                    >
                      Download
                    </Button>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Info */}
        <Box p={4} bg="purple.50" borderRadius="md" border="1px" borderColor="purple.200">
          <HStack spacing={2}>
            <Icon as={FaStar} color="purple.500" />
            <Text fontSize="xs" color="purple.700">
              <Code fontSize="xs">AI Image Generation</Code> usando modelos de difusão (Stable Diffusion, DALL-E)
              para criar imagens a partir de descrições textuais
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
