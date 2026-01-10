import { useState, useEffect } from 'react';
import { Box, Heading, Text, Container, Icon } from '@chakra-ui/react';
import { LabLayout } from '../components/Lab/LabLayout';
import { DocSection } from '../components/Lab/DocSection';
import { LAB_CONTENT } from '../data/lab-content';
import { FaRocket } from 'react-icons/fa';
import { useTranslation } from '../i18n/useTranslation';

const CosmicLab = () => {
  const [activeCategory, setActiveCategory] = useState('architecture');
  const [activeItem, setActiveItem] = useState(LAB_CONTENT[0].items[0].id);
  const { language } = useTranslation();

  // Auto-scroll to section on selection
  useEffect(() => {
    const element = document.getElementById(activeItem);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeItem]);

  const currentCategory = LAB_CONTENT.find(c => c.id === activeCategory) || LAB_CONTENT[0];

  return (
    <LabLayout
      activeCategory={activeCategory}
      activeItem={activeItem}
      onSelect={(cat, item) => {
        setActiveCategory(cat);
        setActiveItem(item);
      }}
    >
      <Container maxW="4xl" py={4}>
        <Box mb={12} textAlign="center">
          <Icon as={FaRocket} w={12} h={12} color="cyan.400" mb={4} />
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            bgGradient="linear(to-r, cyan.400, purple.500)"
            bgClip="text"
            fontFamily="Share Tech Mono"
          >
            {language === 'pt' ? 'LABORATÓRIO CÓSMICO' : 'COSMIC LAB'}
          </Heading>
          <Text fontSize="xl" color="gray.500">
            {language === 'pt'
              ? 'Instalação de pesquisa experimental para padrões avançados de UI, blueprints de arquitetura e protótipos de IA.'
              : 'Experimental research facility for advanced UI patterns, architecture blueprints, and AI prototypes.'}
          </Text>
        </Box>

        <Box position="relative">
          {/* Render all items in the active category so scrolling works naturally */}
          {/* Or render just the active one? Documentation usually renders all in a long list or one by one. 
                 Let's render the list of items for the current category. */}

          {currentCategory.items.map((item) => (
            <DocSection key={item.id} item={item} />
          ))}
        </Box>
      </Container>
    </LabLayout>
  );
};

export default CosmicLab;
