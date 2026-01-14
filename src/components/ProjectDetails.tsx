import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Button,
  Divider,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon
} from '@chakra-ui/react';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const ReactMarkdown = lazy(() => import('react-markdown'));
import { Project } from '../types';
import { FaArrowLeft, FaExternalLinkAlt, FaSearchPlus, FaRocket } from 'react-icons/fa';
import { PROJECT_OVERRIDES, NEW_STATIC_PROJECTS } from '../data/projects';
import { useTranslation } from '../i18n/useTranslation';
import { StellarImageCarousel } from './StellarImageCarousel';
import { useGamificationTracking } from '../hooks/useGamificationTracking';
import { PlanetSpinner } from './PlanetSpinner';
import { useProjectImageBackground } from '../utils/projectUtils';

const STATIC_PROJECTS_DATA: Record<string, Project> = {};
NEW_STATIC_PROJECTS.forEach(p => {
  STATIC_PROJECTS_DATA[p.id] = p;
});

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const { t, language } = useTranslation();
  const { trackProjectView } = useGamificationTracking();
  
  useEffect(() => {
    if (id) {
      trackProjectView(id);
    }
  }, [id, trackProjectView]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const projectId: string = id;

    async function fetchProject() {
      if (projectId in STATIC_PROJECTS_DATA) {
        setProject(STATIC_PROJECTS_DATA[projectId]);
        setLoading(false);
        return;
      }

      if (projectId in PROJECT_OVERRIDES) {
        const override = PROJECT_OVERRIDES[projectId];
        setProject({
          id: projectId,
          title: override.title || { pt: "Sem Título", en: "Untitled" },
          description: override.description || { pt: "Sem descrição", en: "No description" },
          category: override.category || "development",
          images: override.images || [],
          content: override.content || { pt: "", en: "" },
          links: override.links || [],
          tags: override.tags || [],
          createdAt: override.createdAt || new Date(),
          updatedAt: override.updatedAt || new Date(),
          ...override
        } as Project);
        setLoading(false);
        return;
      }

      if (db) {
        try {
          const docRef = doc(db, "projetos", projectId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const originalTitle = data.titulo || "";
            const normTitle = originalTitle.toLowerCase().replace(/\s+/g, '');

            let fetchedProject = {
              id: docSnap.id,
              title: originalTitle,
              description: data.descricao,
              category: data.categoria,
              images: data.imagem ? [data.imagem] : [],
              content: data.content || "",
              links: (data.links || [])
                .filter((link: { url?: string; texto?: string }) => !link.url?.toLowerCase().includes("instagram"))
                .map((link: { texto: string; url: string }) => ({
                  texto: link.texto || '',
                  url: link.url || '',
                })),
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Project;

            let overrideData = PROJECT_OVERRIDES[normTitle];
            if (!overrideData) {
              if (normTitle.includes("jornada") && normTitle.includes("ser")) overrideData = PROJECT_OVERRIDES["jornadaser"];
              else if (normTitle.includes("metodo") && normTitle.includes("cis")) overrideData = PROJECT_OVERRIDES["metodocis"];
              else if (normTitle.includes("plantao") && normTitle.includes("extra")) overrideData = PROJECT_OVERRIDES["plantaoextra"];
              else if (normTitle.includes("portal") && normTitle.includes("poder")) overrideData = PROJECT_OVERRIDES["portaltempoderquemage"];
              else if (normTitle.includes("simerpay")) overrideData = PROJECT_OVERRIDES["simerpay"];
            }

            if (overrideData) {
              fetchedProject = { ...fetchedProject, ...overrideData };
            }

            setProject(fetchedProject);
          } else {
            setProject(null);
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    onOpen();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
        <PlanetSpinner size={120} />
      </Box>
    );
  }

  if (!project) {
    return (
      <Container maxW="container.md" py={20} textAlign="center">
        <VStack spacing={8} justify="center" minH="50vh">
          <Box position="relative">
            <Icon as={FaRocket} w={32} h={32} color="gray.700" transform="rotate(135deg)" opacity={0.5} />
            <Icon as={FaSearchPlus} w={12} h={12} color="red.500" position="absolute" top="0" right="0" />
          </Box>

          <VStack spacing={2}>
            <Heading
              size="2xl"
              bgGradient="linear(to-r, red.400, orange.400)"
              bgClip="text"
              fontFamily="monospace"
            >
              ERRO 404
            </Heading>
            <Heading size="lg" color="white">
              {t('projects.notFound') || "Missão perdida no espaço"}
            </Heading>
            <Text color="gray.400" fontSize="lg" maxW="lg">
              {language === 'pt'
                ? 'As coordenadas que você acessou apontam para um setor inexplorado ou um buraco negro.'
                : 'The coordinates you accessed point to an unexplored sector or a black hole.'}
            </Text>
          </VStack>

          <Button
            size="lg"
            colorScheme="purple"
            onClick={() => navigate(-1)}
            leftIcon={<FaArrowLeft />}
            bgGradient="linear(to-r, purple.500, blue.500)"
            _hover={{
              bgGradient: "linear(to-r, purple.600, blue.600)",
              boxShadow: "0 0 20px rgba(128, 90, 213, 0.6)"
            }}
          >
            {t('projects.back') || "Retornar à Base"}
          </Button>
        </VStack>
      </Container>
    );
  }

  const coverImage = project.images && project.images.length > 0 ? project.images[0] : '';
  const imageBgColor = project ? useProjectImageBackground(project, "white", "gray.800") : "white";

  return (
    <Box as="section" py={{ base: 4, md: 6, lg: 8 }} minH="100vh" px={{ base: 2, sm: 4, md: 0 }}>
      <Container maxW="container.xl" px={{ base: 2, sm: 4, md: 6 }} w="100%">
        <Button
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          mb={{ base: 4, md: 6, lg: 8 }}
          size={{ base: "sm", md: "md" }}
          fontSize={{ base: "xs", sm: "sm", md: "md" }}
          onClick={() => navigate(-1)}
          _hover={{ bg: "transparent", color: "brand.yellow.400" }}
          _focus={{
            outline: '3px solid #4A90E2',
            outlineOffset: '2px',
          }}
          w={{ base: "100%", sm: "auto" }}
          aria-label="Voltar para lista de projetos"
        >
          {t('projects.backToList')}
        </Button>

        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "minmax(280px, 350px) 1fr" }}
          gap={{ base: 4, sm: 6, md: 8, lg: 12 }}
          w="100%"
        >
          <VStack align="start" spacing={{ base: 4, md: 6 }} w="100%" minW={0}>
            <Box
              p={{ base: 3, sm: 4, md: 6, lg: 8 }}
              bg={bgColor}
              borderRadius="2xl"
              boxShadow="2xl"
              border="1px solid"
              borderColor={borderColor}
              w="full"
              textAlign="center"
              position={{ base: "relative", lg: "sticky" }}
              top={{ base: 0, lg: "100px" }}
              maxW="100%"
            >
              {coverImage && (
                <Box
                  bg={imageBgColor}
                  borderRadius="lg"
                  p={{ base: 2, sm: 3, md: 4 }}
                  mb={{ base: 3, sm: 4, md: 6 }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minH={{ base: "80px", sm: "100px", md: "120px", lg: "150px" }}
                  w="100%"
                  overflow="hidden"
                >
                  <Image
                    src={coverImage}
                    alt={`Logo do projeto ${project.title[language]}`}
                    maxH={{ base: "80px", sm: "100px", md: "120px", lg: "150px" }}
                    maxW="100%"
                    mx="auto"
                    objectFit="contain"
                    cursor="pointer"
                    onClick={() => handleImageClick(coverImage)}
                    role="img"
                    aria-label={`Logo do projeto ${project.title[language]}. Clique para ampliar`}
                  />
                </Box>
              )}
              <Heading 
                size={{ base: "sm", sm: "md", md: "lg" }} 
                mb={2} 
                bgGradient="linear(to-r, blue.400, purple.600)" 
                bgClip="text" 
                wordBreak="break-word"
                px={{ base: 2, sm: 0 }}
              >
                {project.title[language]}
              </Heading>
              <Badge colorScheme="purple" px={{ base: 2, md: 3 }} py={1} borderRadius="full" mb={4} fontSize={{ base: "2xs", sm: "xs", md: "sm" }}>
                {project.category}
              </Badge>
              <Text 
                color="gray.500" 
                mb={{ base: 4, md: 6 }} 
                fontSize={{ base: "xs", sm: "sm", md: "md" }} 
                lineHeight="tall"
                px={{ base: 2, sm: 0 }}
                wordBreak="break-word"
              >
                {project.description[language]}
              </Text>

              {project.tags && project.tags.length > 0 && (
                <VStack align="start" width="full" mb={{ base: 4, md: 6 }} px={{ base: 2, sm: 0 }}>
                  <Text fontWeight="bold" fontSize={{ base: "2xs", sm: "xs", md: "sm" }} color="gray.400" mb={2}>{t('projects.tags')}</Text>
                  <HStack wrap="wrap" spacing={{ base: 1, sm: 1.5, md: 2 }} justify="center" w="full">
                    {project.tags.map((tag, idx) => (
                      <Badge 
                        key={idx} 
                        colorScheme="blue" 
                        variant="subtle" 
                        px={{ base: 1.5, sm: 2, md: 2 }} 
                        py={0.5} 
                        borderRadius="md" 
                        fontSize={{ base: "2xs", sm: "xs", md: "xs" }}
                        maxW="100%"
                        wordBreak="break-word"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>
              )}

              {project.links && project.links.length > 0 && (
                <VStack width="full" spacing={{ base: 2, md: 3 }} px={{ base: 2, sm: 0 }}>
                  <Text fontWeight="bold" fontSize={{ base: "2xs", sm: "xs", md: "sm" }} color="gray.400" w="full" textAlign="left">{t('projects.links')}</Text>
                  {project.links.map((link, idx) => (
                    <Button
                      key={idx}
                      as="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      colorScheme="blue"
                      width="full"
                      size={{ base: "xs", sm: "sm", md: "md" }}
                      fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                      leftIcon={<FaExternalLinkAlt />}
                      _hover={{ bg: "blue.50" }}
                      _focus={{
                        outline: '3px solid #4A90E2',
                        outlineOffset: '2px',
                      }}
                      wordBreak="break-word"
                      whiteSpace="normal"
                      textAlign="center"
                      px={{ base: 2, sm: 4 }}
                      aria-label={`Abrir ${link.texto} em nova aba`}
                    >
                      {link.texto}
                    </Button>
                  ))}
                </VStack>
              )}
            </Box>
          </VStack>

          <VStack align="start" spacing={{ base: 4, sm: 6, md: 8, lg: 10 }} w="100%" minW={0}>
            {project.images && project.images.length > 0 && (
              <Box w="full" overflow="hidden">
                <Heading 
                  size={{ base: "xs", sm: "sm", md: "md" }}
                  mb={{ base: 3, sm: 4, md: 6 }}
                  borderBottom="2px solid" 
                  borderColor="blue.400" 
                  pb={2} 
                  display="inline-block" 
                  color="white"
                  position="relative"
                  w={{ base: "100%", sm: "auto" }}
                >
                  <HStack spacing={2} align="center" flexWrap="wrap">
                    <Icon as={FaRocket} color="yellow.400" w={{ base: 3, sm: 4, md: 5 }} h={{ base: 3, sm: 4, md: 5 }} />
                    <Text fontSize={{ base: "xs", sm: "sm", md: "md" }}>{t('projects.gallery') || 'Galeria Estelar'}</Text>
                  </HStack>
                </Heading>
                <StellarImageCarousel 
                  images={project.images} 
                  onImageClick={handleImageClick}
                  project={project}
                />
              </Box>
            )}

            <Divider borderColor="gray.700" w="100%" />

            <Box 
              w="full" 
              className="project-markdown" 
              color="white" 
              overflow="hidden" 
              minW={0}
              role="article"
              aria-label={`Conteúdo detalhado do projeto ${project.title[language]}`}
            >
              <Suspense fallback={
                <Box display="flex" justifyContent="center" alignItems="center" py={8} aria-label="Carregando conteúdo">
                  <PlanetSpinner size={80} />
                </Box>
              }>
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => <Heading as="h1" size={{ base: "md", sm: "lg", md: "xl" }} mt={{ base: 4, sm: 6, md: 8 }} mb={3} {...props} color="white" wordBreak="break-word" />,
                    h2: ({ ...props }) => <Heading as="h2" size={{ base: "sm", sm: "md", md: "lg" }} mt={{ base: 4, sm: 6, md: 8 }} mb={3} color="blue.400" {...props} wordBreak="break-word" />,
                    h3: ({ ...props }) => <Heading as="h3" size={{ base: "xs", sm: "sm", md: "md" }} mt={{ base: 3, sm: 4, md: 6 }} mb={2} color="purple.400" {...props} wordBreak="break-word" />,
                    p: ({ ...props }) => <Text as="p" fontSize={{ base: "sm", sm: "md", md: "lg" }} lineHeight="1.8" mb={{ base: 3, sm: 4, md: 6 }} color="gray.200" {...props} wordBreak="break-word" />,
                    ul: ({ ...props }) => <Box as="ul" pl={{ base: 3, sm: 4, md: 6 }} mb={{ base: 3, sm: 4, md: 6 }} role="list" {...props} />,
                    li: ({ ...props }) => <Box as="li" mb={2} fontSize={{ base: "sm", sm: "md", md: "lg" }} color="gray.200" role="listitem" {...props} wordBreak="break-word" />,
                    strong: ({ ...props }) => <Text as="strong" fontWeight="bold" color="white" {...props} />,
                    img: ({ src, alt, ...props }) => <Image src={src || ''} alt={alt || 'Imagem do projeto'} maxW="100%" h="auto" borderRadius="md" my={4} role="img" {...props} />,
                  }}
                >
                  {project.content[language]}
                </ReactMarkdown>
              </Suspense>
            </Box>
          </VStack>
        </Box>
      </Container>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size={{ base: "full", sm: "xl", md: "4xl", lg: "6xl" }} 
        isCentered
        returnFocusOnClose={true}
        trapFocus={true}
        closeOnOverlayClick={true}
        closeOnEsc={true}
      >
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.800" />
        <ModalContent 
          bg="transparent" 
          boxShadow="none" 
          m={{ base: 1, sm: 2, md: 4 }} 
          maxW="95vw"
          role="dialog"
          aria-modal="true"
          aria-labelledby="image-modal-title"
        >
          <ModalCloseButton
            color="white"
            size={{ base: "sm", sm: "md", md: "lg" }}
            zIndex={2}
            position="fixed"
            top={{ base: "8px", sm: "10px", md: "20px" }}
            right={{ base: "8px", sm: "10px", md: "20px" }}
            bg="blackAlpha.600"
            borderRadius="full"
            _hover={{ bg: "blackAlpha.800" }}
            aria-label={language === 'pt' ? 'Fechar imagem ampliada' : 'Close enlarged image'}
            minW="44px"
            minH="44px"
          />
          <ModalBody p={{ base: 1, sm: 2, md: 0 }} display="flex" justifyContent="center" alignItems="center" minH={{ base: "80vh", sm: "85vh", md: "90vh" }}>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={project 
                  ? (language === 'pt' 
                      ? `Imagem ampliada do projeto ${project.title[language]}` 
                      : `Enlarged image of project ${project.title[language]}`)
                  : (language === 'pt' ? "Imagem ampliada" : "Enlarged image")}
                maxH={{ base: "80vh", sm: "85vh", md: "90vh" }}
                maxW="100%"
                w="auto"
                h="auto"
                borderRadius="lg"
                objectFit="contain"
                role="img"
                aria-label={project 
                  ? (language === 'pt' 
                      ? `Imagem ampliada do projeto ${project.title[language]}` 
                      : `Enlarged image of project ${project.title[language]}`)
                  : (language === 'pt' ? "Imagem ampliada" : "Enlarged image")}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}