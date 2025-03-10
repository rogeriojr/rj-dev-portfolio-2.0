import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StyledProfileImage } from "./StyledProfileImage";
import { LoadingSpinner } from "./LoadingSpinner";
import { useEffect, useState } from "react";

export function Home() {
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
    <Container maxW="container.xl" py={20}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="space-between"
        gap={10}
      >
        <Stack spacing={8} maxW="600px">
          <Box
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: "0.5s" }}
          >
            <Heading
              as="h1"
              size="2xl"
              color="brand.yellow.400"
              letterSpacing="tight"
              mb={4}
            >
              Desenvolvedor Full Stack &
              <br />
              Designer Digital
            </Heading>
            <Heading
              as="h2"
              size="md"
              color="gray.500"
              fontWeight="normal"
              mb={6}
            >
              Transformando ideias em realidade digital
            </Heading>
          </Box>

          <Box
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: "0.5s", delay: "0.2s" }}
          >
            <Text fontSize="xl" color="gray.300">
              Transformando ideias em experiências digitais extraordinárias
              através de código e design inovador.
            </Text>
          </Box>

          <Stack
            as={motion.div}
            direction={{ base: "column", sm: "row" }}
            spacing={4}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: "0.5s", delay: "0.4s" }}
          >
            <Button
              size="lg"
              variant="solid"
              as={Link}
              to="/portfolio/development"
              bg="brand.yellow.400"
              color="brand.space.500"
              _hover={{
                bg: "brand.yellow.500",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Ver Projetos
            </Button>
            <Button
              size="lg"
              variant="outline"
              as={Link}
              to="/contact"
              borderColor="brand.yellow.400"
              color="brand.yellow.400"
              _hover={{
                bg: "brand.yellow.400",
                color: "brand.space.500",
              }}
            >
              Contato
            </Button>
            <Button
              size="lg"
              variant="outline"
              as="a"
              href="./cv-rj.pdf"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaBriefcase />}
              borderColor="brand.yellow.400"
              color="brand.yellow.400"
              _hover={{
                bg: "brand.yellow.400",
                color: "brand.space.500",
              }}
            >
              Ver Currículo
            </Button>
          </Stack>

          <HStack
            as={motion.div}
            spacing={4}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: "0.5s", delay: "0.6s" }}
          >
            <IconButton
              as="a"
              href="https://github.com/rogeriojr"
              target="_blank"
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="ghost"
              fontSize="24px"
              color="gray.400"
              _hover={{ color: "brand.yellow.400" }}
            />
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/rogério-júnior-174719120/"
              target="_blank"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              fontSize="24px"
              color="gray.400"
              _hover={{ color: "brand.yellow.400" }}
            />
            <IconButton
              as="a"
              href="https://www.instagram.com/rogeriojr.dev"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              fontSize="24px"
              color="gray.400"
              _hover={{ color: "brand.yellow.400" }}
            />
            <IconButton
              as="a"
              href="https://www.workana.com/freelancer/5aea67e6fd911e0c207642b63c50fb9d"
              target="_blank"
              aria-label="Workana"
              icon={<FaBriefcase />}
              variant="ghost"
              fontSize="24px"
              color="gray.400"
              _hover={{ color: "brand.yellow.400" }}
            />
          </HStack>
        </Stack>

        <Box
          as={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: "0.5s", delay: "0.6s" }}
          position="relative"
          drag
          dragConstraints={{
            top: -100,
            left: -100,
            right: 100,
            bottom: 100,
          }}
          whileDrag={{ scale: 1.1 }}
        >
          <StyledProfileImage />
        </Box>
      </Flex>
    </Container>
  );
}
