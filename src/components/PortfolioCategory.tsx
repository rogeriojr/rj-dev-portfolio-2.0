import { Box, Container, Grid, Heading, Image, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Project } from '../types';

interface PortfolioCategoryProps {
  category: 'development' | 'design' | 'social-media';
}

export function PortfolioCategory({ category }: PortfolioCategoryProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, where('category', '==', category));
        const querySnapshot = await getDocs(q);
        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate()
        })) as Project[];
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [category]);

  const categoryTitles = {
    'development': 'Desenvolvimento',
    'design': 'Design',
    'social-media': 'Social Media'
  };

  return (
    <Box as="section" py={12}>
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" mb={8}>
          Portfólio - {categoryTitles[category]}
        </Heading>
        {loading ? (
          <Text>Carregando projetos...</Text>
        ) : (
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
            {projects.map((project) => (
              <LinkBox key={project.id} as="article" borderRadius="lg" overflow="hidden" boxShadow="md" _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}>
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  objectFit="cover"
                  height="200px"
                  width="100%"
                />
                <VStack p={4} align="start" spacing={2}>
                  <LinkOverlay as={RouterLink} to={`/portfolio/${category}/${project.id}`}>
                    <Heading as="h3" size="md">
                      {project.title}
                    </Heading>
                  </LinkOverlay>
                  <Text noOfLines={2}>{project.description}</Text>
                </VStack>
              </LinkBox>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}