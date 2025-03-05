import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export function About() {
  return (
    <Box as="section" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="start">
          <Heading as="h1" size="2xl" mb={6}>
            Sobre Mim
          </Heading>
          <Text fontSize="lg" lineHeight="tall">
            Eu sou comprometido, leal, dedicado, já tenho anos de experiencia na área e nesse momento da minha vida estou desempregado e necessito muito me realocar no mercado de trabalho, pelo sustento da minha família e filhos, preciso apenas de uma oportunidade pra mostrar meu valor!
          </Text>
          <Text fontSize="lg" lineHeight="tall">
            Já trabalhei em statups fiz vários lançamentos de apps Android e IOS, plataformas E-commerce, Dashboards, Painéis adminitrativos, sistemas de caixa, aplicações de supermercado, plataformas de cursos, aplicações da area da saúde e ensino, mas a experiência mais marcante foi trabalhar em uma aplicação que fazia a gestão hospitalar das escalas médicas durante a pandemia, foi desafiador, eu percebi que meu trabalho é importante e impactava em vidas e podia salvar vidas, cada minuto valia muito, foi preciso fazer horas extras, manter a equipe unida, ter uma boa comunicação para evitar perdas em todos sentidos!
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