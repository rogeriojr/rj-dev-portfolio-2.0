import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Icon,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  SimpleGrid,
  useToast,
  IconButton // Explicitly import IconButton
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaBriefcase,
  FaPaperPlane,
  FaSatellite,
} from "react-icons/fa";
import { IoPlanet } from "react-icons/io5";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export function Contact() {
  const bgForm = useColorModeValue("white", "whiteAlpha.100");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const toast = useToast();

  const handleEmailClick = () => {
    window.location.href = "mailto:rogeriojr1100@gmail.com";
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto."
    );
    window.open(`https://wa.me/5564981294566?text=${message}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transmissão Enviada! 🚀",
      description: "Sua mensagem está viajando pelo hiperespaço. Entrarei em contato em breve.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right"
    });
  };

  return (
    <Box position="relative" overflow="hidden" py={20}>
      {/* Decorative Orbiting Elements */}
      <Box position="absolute" top="10%" right="5%" opacity={0.2} animation="float 10s ease-in-out infinite">
        <Icon as={IoPlanet} w={40} h={40} color="purple.500" />
      </Box>

      <Container maxW="container.lg" position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>

          {/* Left Side: Info & Titles */}
          <VStack spacing={8} align="stretch" justify="center">
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HStack mb={2}>
                <Icon as={FaSatellite} color="cyan.400" />
                <Text fontSize="sm" letterSpacing="widest" color="cyan.400" fontWeight="bold">
                  CANAL DE COMUNICAÇÃO
                </Text>
              </HStack>
              <Heading
                as="h1"
                size="3xl"
                bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
                bgClip="text"
                fontWeight="extrabold"
                mb={6}
              >
                Vamos Construir o Futuro?
              </Heading>
              <Text fontSize="xl" color="gray.400" lineHeight="tall">
                Se você tem uma ideia inovadora ou um desafio técnico complexo, meu radar está ligado. Vamos conectar nossas frequências e criar algo extraordinário.
              </Text>
            </MotionBox>

            <VStack spacing={4} align="stretch">
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                leftIcon={<Icon as={FaWhatsapp} />}
                size="lg"
                colorScheme="whatsapp"
                onClick={handleWhatsAppClick}
                justifyContent="flex-start"
                h="60px"
                fontSize="lg"
              >
                Iniciar Chat WhatsApp
              </MotionButton>

              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                leftIcon={<Icon as={FaEnvelope} />}
                size="lg"
                bg="purple.600"
                color="white"
                _hover={{ bg: "purple.500" }}
                onClick={handleEmailClick}
                justifyContent="flex-start"
                h="60px"
                fontSize="lg"
              >
                Enviar Sinal via Email
              </MotionButton>
            </VStack>

            <HStack spacing={4} mt={4}>
              <SocialBtn icon={FaGithub} href="https://github.com/rogeriojr" label="GitHub" />
              <SocialBtn icon={FaLinkedin} href="https://www.linkedin.com/in/rogério-júnior-174719120/" label="LinkedIn" />
              <SocialBtn icon={FaBriefcase} href="https://www.workana.com/freelancer/5aea67e6fd911e0c207642b63c50fb9d" label="Workana" />
            </HStack>
          </VStack>

          {/* Right Side: Holographic Form */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box
              bg={bgForm}
              p={8}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="2xl"
              backdropFilter="blur(12px)"
              position="relative"
            >
              <Box
                position="absolute" top="-2px" left="-2px" right="-2px" bottom="-2px"
                bgGradient="linear(to-r, cyan.400, purple.500)"
                zIndex={-1}
                borderRadius="2xl"
                opacity={0.3}
              />

              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <Heading size="md" alignSelf="flex-start" mb={2}>
                    Transmissão Direta
                  </Heading>

                  <FormControl id="name" isRequired>
                    <FormLabel>Codinome (Nome)</FormLabel>
                    <Input placeholder="Comandante Shepard" bg="whiteAlpha.50" border="none" _focus={{ border: "1px solid", borderColor: "cyan.400", bg: "whiteAlpha.100" }} h="50px" />
                  </FormControl>

                  <FormControl id="email" isRequired>
                    <FormLabel>Frequência (Email)</FormLabel>
                    <Input type="email" placeholder="shepard@normandy.sra" bg="whiteAlpha.50" border="none" _focus={{ border: "1px solid", borderColor: "cyan.400", bg: "whiteAlpha.100" }} h="50px" />
                  </FormControl>

                  <FormControl id="message" isRequired>
                    <FormLabel>Dados da Missão (Mensagem)</FormLabel>
                    <Textarea placeholder="Detalhes do projeto, prazos e objetivos..." bg="whiteAlpha.50" border="none" _focus={{ border: "1px solid", borderColor: "cyan.400", bg: "whiteAlpha.100" }} rows={5} />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="cyan"
                    size="lg"
                    w="full"
                    rightIcon={<Icon as={FaPaperPlane} />}
                    mt={4}
                    _hover={{ transform: "translateY(-2px)", boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)" }}
                  >
                    Transmitir Mensagem
                  </Button>
                </VStack>
              </form>
            </Box>
          </MotionBox>

        </SimpleGrid>
      </Container>
    </Box>
  );
}

function SocialBtn({ icon, href, label }: { icon: any, href: string, label: string }) {
  return (
    <IconButton
      as="a"
      href={href}
      target="_blank"
      aria-label={label}
      icon={<Icon as={icon} w={6} h={6} />}
      size="lg"
      variant="ghost"
      color="gray.400"
      _hover={{ color: "cyan.400", bg: "whiteAlpha.100", transform: "scale(1.1)" }}
    />
  )
}
