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
  IconButton
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
    <Box position="relative" overflow="hidden" py={{ base: 8, md: 12, lg: 20 }}>
      <Box 
        position="absolute" 
        top="10%" 
        right="5%" 
        opacity={0.2} 
        animation="float 10s ease-in-out infinite"
        display={{ base: "none", md: "block" }}
      >
        <Icon as={IoPlanet} w={{ base: 24, md: 32, lg: 40 }} h={{ base: 24, md: 32, lg: 40 }} color="purple.500" />
      </Box>

      <Container maxW="container.lg" position="relative" zIndex={1} px={{ base: 4, md: 6 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10, lg: 12 }}>

          <VStack spacing={{ base: 6, md: 8 }} align="stretch" justify="center">
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HStack mb={2} flexWrap="wrap">
                <Icon as={FaSatellite} color="cyan.400" w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} />
                <Text fontSize={{ base: "xs", md: "sm" }} letterSpacing="widest" color="cyan.400" fontWeight="bold">
                  CANAL DE COMUNICAÇÃO
                </Text>
              </HStack>
              <Heading
                as="h1"
                size={{ base: "xl", md: "2xl", lg: "3xl" }}
                bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
                bgClip="text"
                fontWeight="extrabold"
                mb={{ base: 4, md: 6 }}
              >
                Vamos Construir o Futuro?
              </Heading>
              <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} color="gray.400" lineHeight="tall">
                Se você tem uma ideia inovadora ou um desafio técnico complexo, meu radar está ligado. Vamos conectar nossas frequências e criar algo extraordinário.
              </Text>
            </MotionBox>

            <VStack spacing={{ base: 3, md: 4 }} align="stretch">
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                leftIcon={<Icon as={FaWhatsapp} />}
                size={{ base: "md", md: "lg" }}
                colorScheme="whatsapp"
                onClick={handleWhatsAppClick}
                justifyContent="flex-start"
                h={{ base: "50px", md: "60px" }}
                fontSize={{ base: "md", md: "lg" }}
              >
                Iniciar Chat WhatsApp
              </MotionButton>

              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                leftIcon={<Icon as={FaEnvelope} />}
                size={{ base: "md", md: "lg" }}
                bg="purple.600"
                color="white"
                _hover={{ bg: "purple.500" }}
                onClick={handleEmailClick}
                justifyContent="flex-start"
                h={{ base: "50px", md: "60px" }}
                fontSize={{ base: "md", md: "lg" }}
              >
                Enviar Sinal via Email
              </MotionButton>
            </VStack>

            <HStack spacing={{ base: 4, md: 4 }} mt={4} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
              <SocialBtn icon={FaGithub} href="https://github.com/rogeriojr" label="GitHub" />
              <SocialBtn icon={FaLinkedin} href="https://www.linkedin.com/in/rogério-júnior-174719120/" label="LinkedIn" />
              <SocialBtn icon={FaBriefcase} href="https://www.workana.com/freelancer/5aea67e6fd911e0c207642b63c50fb9d" label="Workana" />
            </HStack>
          </VStack>

          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box
              bg={bgForm}
              p={{ base: 4, md: 6, lg: 8 }}
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
                <VStack spacing={{ base: 4, md: 6 }}>
                  <Heading size={{ base: "sm", md: "md" }} alignSelf="flex-start" mb={2}>
                    Transmissão Direta
                  </Heading>

                  <FormControl id="name" isRequired>
                    <FormLabel fontSize={{ base: "sm", md: "md" }}>Codinome (Nome)</FormLabel>
                    <Input 
                      placeholder="Comandante Shepard" 
                      bg="whiteAlpha.50" 
                      border="none" 
                      _focus={{ border: "1px solid", borderColor: "cyan.400", bg: "whiteAlpha.100" }} 
                      h={{ base: "44px", md: "50px" }}
                      fontSize={{ base: "sm", md: "md" }}
                    />
                  </FormControl>

                  <FormControl id="email" isRequired>
                    <FormLabel fontSize={{ base: "sm", md: "md" }}>Frequência (Email)</FormLabel>
                    <Input 
                      type="email" 
                      placeholder="shepard@normandy.sra" 
                      bg="whiteAlpha.50" 
                      border="none" 
                      _focus={{ border: "1px solid", borderColor: "cyan.400", bg: "whiteAlpha.100" }} 
                      h={{ base: "44px", md: "50px" }}
                      fontSize={{ base: "sm", md: "md" }}
                    />
                  </FormControl>

                  <FormControl id="message" isRequired>
                    <FormLabel fontSize={{ base: "sm", md: "md" }}>Dados da Missão (Mensagem)</FormLabel>
                    <Textarea 
                      placeholder="Detalhes do projeto, prazos e objetivos..." 
                      bg="whiteAlpha.50" 
                      border="none" 
                      _focus={{ border: "1px solid", borderColor: "cyan.400", bg: "whiteAlpha.100" }} 
                      rows={5}
                      minH={{ base: "120px", md: "140px" }}
                      fontSize={{ base: "sm", md: "md" }}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="cyan"
                    size={{ base: "md", md: "lg" }}
                    w="full"
                    rightIcon={<Icon as={FaPaperPlane} />}
                    mt={4}
                    fontSize={{ base: "sm", md: "md" }}
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
      icon={<Icon as={icon} w={{ base: 6, md: 6 }} h={{ base: 6, md: 6 }} />}
      size={{ base: "lg", md: "lg" }}
      minW={{ base: "56px", md: "auto" }}
      minH={{ base: "56px", md: "auto" }}
      variant="ghost"
      color="gray.400"
      _hover={{ color: "cyan.400", bg: "whiteAlpha.100", transform: "scale(1.1)" }}
      _active={{ transform: "scale(0.95)" }}
    />
  )
}
