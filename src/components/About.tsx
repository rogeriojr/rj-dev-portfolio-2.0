import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

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
            Sou desenvolvedor fullstack com mais de 7 anos de experiência,
            especializado em frontend, principalmente com React, React Native e
            Node.js. Minha formação em Design Gráfico me permite criar
            interfaces intuitivas e focadas na experiência do usuário, sempre
            buscando a melhor usabilidade e performance.
          </Text>
          <Text fontSize="lg" lineHeight="tall">
            Tenho forte expertise em JavaScript e em diversos frameworks e
            bibliotecas como Vue.js, Next.js, React, React Native, Flutter,
            Chakra UI, Bootstrap e Materialize. Além disso, sou capacitado em
            Node.js, utilizando Express para criação de APIs e Jest para testes
            automatizados, incluindo Cypress para testes end-to-end e Jest para
            testes unitários.
          </Text>
          <Text fontSize="lg" lineHeight="tall">
            Minha experiência no desenvolvimento de interfaces e soluções
            frontend é complementada com minha atuação em backend, garantindo um
            desenvolvimento completo e de alto desempenho, tanto em aplicações
            web quanto mobile. Sempre busco entregar soluções eficientes, com
            foco na performance e na melhor experiência possível para o usuário.
          </Text>
          <Text fontSize="lg" lineHeight="tall">
            Ao longo da minha carreira, tive a oportunidade de liderar projetos
            significativos, incluindo o desenvolvimento de um sistema crítico de
            gestão hospitalar durante a pandemia, onde a eficiência e precisão
            eram fundamentais. Esta experiência fortaleceu minhas habilidades em
            trabalho em equipe, comunicação efetiva e gestão de projetos em
            ambientes de alta pressão.
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
          <Box mt={8}>
            <Heading as="h2" size="lg" mb={6}>
              Hard Skills
            </Heading>
            <SimpleGrid
              columns={{ base: 4, sm: 6, md: 8, lg: 12, xl: 14 }}
              spacing={6}
            >
              <Tooltip label="JavaScript" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                  alt="javascript"
                  h="40px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="TypeScript" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                  alt="typescript"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="React" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="react"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="HTML5" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                  alt="html5"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="CSS3" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                  alt="css3"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Firebase" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
                  alt="firebase"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Flutter" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
                  alt="flutter"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Linux" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
                  alt="linux"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Material UI" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg"
                  alt="materialui"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Photoshop" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg"
                  alt="photoshop"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Redux" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
                  alt="redux"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="VS Code" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
                  alt="vscode"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Vue.js" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                  alt="vuejs"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Yarn" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg"
                  alt="yarn"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Xcode" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg"
                  alt="xcode"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Windows" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg"
                  alt="windows8"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Storybook" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg"
                  alt="storybook"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="npm" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg"
                  alt="npm"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Node.js" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                  alt="nodejs"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Next.js" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                  alt="nextjs"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Illustrator" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg"
                  alt="illustrator"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Git" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                  alt="git"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="FileZilla" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg"
                  alt="filezilla"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Figma" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                  alt="figma"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Devicon" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg"
                  alt="devicon"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Dart" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg"
                  alt="dart"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Bootstrap" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
                  alt="bootstrap"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Apple" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
                  alt="apple"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
              <Tooltip label="Android" hasArrow>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg"
                  alt="android"
                  h="30px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Tooltip>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
