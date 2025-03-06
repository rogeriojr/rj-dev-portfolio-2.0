import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaBriefcase,
} from "react-icons/fa";

export function Contact() {
  const handleEmailClick = () => {
    window.location.href = "mailto:rogeriojr1100@gmail.com";
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Vi seu portfólio e gostaria de conversar."
    );
    window.open(`https://wa.me/5564981294566?text=${message}`, "_blank");
  };

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={8} align="stretch">
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
            textAlign="center"
            mb={4}
          >
            Contato
          </Heading>
          <Text fontSize="xl" color="gray.300" textAlign="center" mb={8}>
            Vamos trabalhar juntos em algo incrível?
          </Text>
        </Box>

        <VStack
          as={motion.div}
          spacing={6}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: "0.5s", delay: "0.2s" }}
        >
          <Button
            leftIcon={<Icon as={FaEnvelope} />}
            size="lg"
            width="full"
            onClick={handleEmailClick}
            bg="brand.yellow.400"
            color="brand.space.500"
            _hover={{
              bg: "brand.yellow.500",
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            rogeriojr1100@gmail.com
          </Button>

          <Button
            leftIcon={<Icon as={FaWhatsapp} />}
            size="lg"
            width="full"
            onClick={handleWhatsAppClick}
            colorScheme="whatsapp"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            WhatsApp
          </Button>
        </VStack>

        <HStack
          as={motion.div}
          spacing={4}
          justify="center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: "0.5s", delay: "0.4s" }}
        >
          <Button
            as="a"
            href="https://github.com/rogeriojr"
            target="_blank"
            variant="ghost"
            colorScheme="gray"
            leftIcon={<Icon as={FaGithub} />}
            _hover={{ color: "brand.yellow.400" }}
          >
            GitHub
          </Button>
          <Button
            as="a"
            href="https://www.linkedin.com/in/rogério-júnior-174719120/"
            target="_blank"
            variant="ghost"
            colorScheme="gray"
            leftIcon={<Icon as={FaLinkedin} />}
            _hover={{ color: "brand.yellow.400" }}
          >
            LinkedIn
          </Button>
          <Button
            as="a"
            href="https://www.instagram.com/rogeriojr.dev"
            target="_blank"
            variant="ghost"
            colorScheme="gray"
            leftIcon={<Icon as={FaInstagram} />}
            _hover={{ color: "brand.yellow.400" }}
          >
            Instagram
          </Button>
          <Button
            as="a"
            href="https://www.workana.com/freelancer/5aea67e6fd911e0c207642b63c50fb9d"
            target="_blank"
            variant="ghost"
            colorScheme="gray"
            leftIcon={<Icon as={FaBriefcase} />}
            _hover={{ color: "brand.yellow.400" }}
          >
            Workana
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}
