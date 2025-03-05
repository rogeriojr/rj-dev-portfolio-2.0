import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiWorkplace } from "react-icons/si";

export function Home() {
  return (
    <Box as="section" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="center" textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Rogério Júnior
          </Heading>
          <Text fontSize="xl" maxW="2xl" mb={8}>
            Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e
            impactantes. Especializado em desenvolvimento web, mobile e design
            de interfaces.
          </Text>
          <Button
            as="a"
            href="/resume.pdf"
            target="_blank"
            colorScheme="blue"
            size="lg"
            mb={8}
          >
            Visualizar Currículo
          </Button>
          <HStack spacing={6}>
            <Link
              href="https://www.linkedin.com/in/rogério-júnior-174719120/"
              isExternal
            >
              <Icon
                as={FaLinkedin}
                w={8}
                h={8}
                color="blue.500"
                _hover={{ color: "blue.600" }}
              />
            </Link>
            <Link href="https://github.com/rogeriojr" isExternal>
              <Icon as={FaGithub} w={8} h={8} _hover={{ color: "gray.600" }} />
            </Link>
            <Link
              href="https://www.workana.com/freelancer/5aea67e6fd911e0c207642b63c50fb9d"
              isExternal
            >
              <Icon
                as={SiWorkplace}
                w={8}
                h={8}
                color="green.500"
                _hover={{ color: "green.600" }}
              />
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
