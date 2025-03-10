import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box as="section" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="start">
          <Heading as="h1" size="2xl" mb={6}>
            Sobre Mim
          </Heading>
          <Text fontSize="lg" lineHeight="tall">
            Sou desenvolvedor fullstack com mais de 7 anos de experiência, especializado em frontend, principalmente com React, React Native e Node.js. Minha formação em Design Gráfico me permite criar interfaces intuitivas e focadas na experiência do usuário, sempre buscando a melhor usabilidade e performance.
          </Text>
          <Text fontSize="lg" lineHeight="tall">
            Tenho forte expertise em JavaScript e em diversos frameworks e bibliotecas como Vue.js, Next.js, React, React Native, Flutter, Chakra UI, Bootstrap e Materialize. Além disso, sou capacitado em Node.js, utilizando Express para criação de APIs e Jest para testes automatizados, incluindo Cypress para testes end-to-end e Jest para testes unitários.
          </Text>
          <Text fontSize="lg" lineHeight="tall">
            Minha experiência no desenvolvimento de interfaces e soluções frontend é complementada com minha atuação em backend, garantindo um desenvolvimento completo e de alto desempenho, tanto em aplicações web quanto mobile. Sempre busco entregar soluções eficientes, com foco na performance e na melhor experiência possível para o usuário.
          </Text>
          <Text fontSize="lg" lineHeight="tall">
            Ao longo da minha carreira, tive a oportunidade de liderar projetos significativos, incluindo o desenvolvimento de um sistema crítico de gestão hospitalar durante a pandemia, onde a eficiência e precisão eram fundamentais. Esta experiência fortaleceu minhas habilidades em trabalho em equipe, comunicação efetiva e gestão de projetos em ambientes de alta pressão.
          </Text>
          <Box mt={8}>
            <Heading as="h2" size="lg" mb={4}>
              Experiência Profissional
            </Heading>
            <VStack spacing={4} align="start">
              <Text fontSize="lg">
                • Desenvolvimento de aplicativos móveis para Android e iOS
              </Text>
              <Text fontSize="lg">
                • Criação de plataformas E-commerce e sistemas administrativos
              </Text>
              <Text fontSize="lg">
                • Implementação de sistemas para área da saúde e educação
              </Text>
              <Text fontSize="lg">
                • Gestão de equipes e projetos em ambientes desafiadores
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}