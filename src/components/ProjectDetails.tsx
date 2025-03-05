import { Box, Container, Heading, Text, Image, Grid, VStack, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { db } from '../config/firebase';
import { Project } from '../types';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        if (!id) return;
        const projectRef = doc(db, 'projects', id);
        const projectDoc = await getDoc(projectRef);
        if (projectDoc.exists()) {
          setProject({
            id: projectDoc.id,
            ...projectDoc.data(),
            createdAt: projectDoc.data().createdAt.toDate(),
            updatedAt: projectDoc.data().updatedAt.toDate()
          } as Project);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!project) {
    return (
      <Box py={12}>
        <Container maxW="container.xl">
          <Text>Projeto não encontrado.</Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box as="section" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="start">
          <Heading as="h1" size="2xl">
            {project.title}
          </Heading>
          <Text fontSize="xl" color="gray.600">
            {project.description}
          </Text>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4} w="full">
            {project.images.map((image, index) => (
              <Box key={index} borderRadius="lg" overflow="hidden" boxShadow="md">
                <Image
                  src={image}
                  alt={`${project.title} - Imagem ${index + 1}`}
                  objectFit="cover"
                  w="full"
                  h="300px"
                />
              </Box>
            ))}
          </Grid>
          <Box className="markdown-content" w="full">
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}