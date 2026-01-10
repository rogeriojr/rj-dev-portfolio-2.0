import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Grid,
  VStack,
  HStack,
  Badge,
  Button,
  Divider,
  useColorModeValue,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { db } from '../config/firebase';
import { Project } from '../types';
import { FaArrowLeft, FaExternalLinkAlt, FaSearchPlus, FaRocket } from 'react-icons/fa';
import { PROJECT_OVERRIDES, NEW_STATIC_PROJECTS } from '../data/projects';
import { useTranslation } from '../i18n/useTranslation';

// Create a lookup map for static projects for easy detail access
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

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;

      // 1. Check if it's one of our explicit static projects
      if (STATIC_PROJECTS_DATA[id]) {
        setProject(STATIC_PROJECTS_DATA[id]);
        setLoading(false);
        return;
      }

      // 2. Check overrides directly (for legacy projects not in Firestore)
      if (PROJECT_OVERRIDES[id]) {
        const override = PROJECT_OVERRIDES[id];
        setProject({
          id: id,
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

      // 3. Try fetching from Firestore
      try {
        const docRef = doc(db, "projetos", id);
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
              .filter((link: any) => !link.url?.toLowerCase().includes("instagram"))
              .map((link: any) => ({
                texto: link.texto,
                url: link.url,
              })),
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as Project;

          // Apply Overrides
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
        console.error("Error fetching project:", error);
      } finally {
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
        <Spinner size="xl" color="brand.yellow.400" />
      </Box>
    );
  }

  if (!project) {
    return (
      <Container maxW="container.md" py={20} textAlign="center">
        <VStack spacing={8} justify="center" minH="50vh">
          <Box position="relative">
            <Icon as={FaRocket} w={32} h={32} color="gray.700" transform="rotate(135deg)" opacity={0.5} />
            <Icon as={FaSearchPlus} w={12} h={12} color="red.500" position="absolute" top="0" right="0" animation="pulse 2s infinite" />
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

  const coverImage = project.images[0];

  return (
    <Box as="section" py={8} minH="100vh">
      <Container maxW="container.xl">
        <Button
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          mb={8}
          onClick={() => navigate(-1)}
          _hover={{ bg: "transparent", color: "brand.yellow.400" }}
        >
          {t('projects.backToList')}
        </Button>

        <Grid templateColumns={{ base: "1fr", lg: "350px 1fr" }} gap={12}>
          {/* Sidebar / Info */}
          <VStack align="start" spacing={6}>
            <Box
              p={8}
              bg={bgColor}
              borderRadius="2xl"
              boxShadow="2xl"
              border="1px solid"
              borderColor={borderColor}
              w="full"
              textAlign="center"
              position="sticky"
              top="100px"
            >
              <Image
                src={coverImage}
                alt={`${project.title[language]} Logo`}
                maxH="150px"
                mx="auto"
                mb={6}
                objectFit="contain"
                cursor="pointer"
                onClick={() => handleImageClick(coverImage)}
              />
              <Heading size="lg" mb={2} bgGradient="linear(to-r, blue.400, purple.600)" bgClip="text">
                {project.title[language]}
              </Heading>
              <Badge colorScheme="purple" px={3} py={1} borderRadius="full" mb={4}>
                {project.category}
              </Badge>
              <Text color="gray.500" mb={6} fontSize="md">
                {project.description[language]}
              </Text>

              {project.tags && project.tags.length > 0 && (
                <VStack align="start" width="full" mb={6}>
                  <Text fontWeight="bold" fontSize="sm" color="gray.400" mb={2}>{t('projects.tags')}</Text>
                  <HStack wrap="wrap" spacing={2}>
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} colorScheme="blue" variant="subtle" px={2} borderRadius="md">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>
              )}

              {project.links && project.links.length > 0 && (
                <VStack width="full" spacing={3}>
                  <Text fontWeight="bold" fontSize="sm" color="gray.400" w="full" textAlign="left">{t('projects.links')}</Text>
                  {project.links.map((link, idx) => (
                    <Button
                      key={idx}
                      as="a"
                      href={link.url}
                      target="_blank"
                      variant="outline"
                      colorScheme="blue"
                      width="full"
                      leftIcon={<FaExternalLinkAlt />}
                      _hover={{ bg: "blue.50" }}
                    >
                      {link.texto}
                    </Button>
                  ))}
                </VStack>
              )}
            </Box>
          </VStack>

          {/* Main Content */}
          <VStack align="start" spacing={10}>
            {/* Screenshots Gallery */}
            {project.images.length > 1 && (
              <Box w="full">
                <Heading size="md" mb={6} borderBottom="2px solid" borderColor="blue.400" pb={2} display="inline-block" color="white">
                  {t('projects.gallery')}
                </Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                  {project.images.map((img, idx) => (
                    <Box
                      key={idx}
                      borderRadius="xl"
                      overflow="hidden"
                      boxShadow="xl"
                      transition="all 0.3s"
                      _hover={{ transform: "scale(1.03)", boxShadow: "2xl" }}
                      border="1px solid"
                      borderColor={borderColor}
                      position="relative"
                      cursor="pointer"
                      onClick={() => handleImageClick(img)}
                      role="group"
                    >
                      <Image
                        src={img}
                        alt={`Screenshot ${idx + 1}`}
                        w="full"
                        h="300px"
                        objectFit={img.includes('logo') ? "contain" : "cover"}
                        bg={img.includes('logo') ? "white" : "gray.800"}
                        p={img.includes('logo') ? 8 : 0}
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="rgba(0,0,0,0.4)"
                        opacity={0}
                        transition="opacity 0.3s"
                        _groupHover={{ opacity: 1 }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FaSearchPlus} color="white" w={8} h={8} />
                      </Box>
                    </Box>
                  ))}
                </Grid>
              </Box>
            )}

            <Divider borderColor="gray.700" />

            {/* Markdown Description */}
            <Box w="full" className="project-markdown" color="white">
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <Heading size="xl" mt={8} mb={4} {...props} color="white" />,
                  h2: ({ ...props }) => <Heading size="lg" mt={8} mb={4} color="blue.400" {...props} />,
                  h3: ({ ...props }) => <Heading size="md" mt={6} mb={3} color="purple.400" {...props} />,
                  p: ({ ...props }) => <Text fontSize="lg" lineHeight="1.8" mb={6} color="gray.200" {...props} />,
                  ul: ({ ...props }) => <Box as="ul" pl={6} mb={6} {...props} />,
                  li: ({ ...props }) => <Box as="li" mb={3} fontSize="lg" color="gray.200" {...props} />,
                  strong: ({ ...props }) => <Text as="span" fontWeight="bold" color="white" {...props} />,
                }}
              >
                {project.content[language]}
              </ReactMarkdown>
            </Box>
          </VStack>
        </Grid>
      </Container>

      {/* Lightbox Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.800" />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton
            color="white"
            size="lg"
            zIndex={2}
            position="fixed"
            top="20px"
            right="20px"
            bg="blackAlpha.600"
            borderRadius="full"
            _hover={{ bg: "blackAlpha.800" }}
          />
          <ModalBody p={0} display="flex" justifyContent="center">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Enlarged view"
                maxH="90vh"
                borderRadius="lg"
                objectFit="contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}