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
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaBriefcase, FaStar } from "react-icons/fa";
import { IoPlanet, IoTelescope } from "react-icons/io5";
import { Link } from "react-router-dom";
import { StyledProfileImage } from "./StyledProfileImage";
import { LoadingSpinner } from "./LoadingSpinner";
import { useEffect, useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import { useGamificationTracking } from "../hooks/useGamificationTracking";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { trackSocialClick, trackCVDownload } = useGamificationTracking();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box position="relative" minH={{ base: "100vh", md: "calc(100vh - 80px - 120px)" }} h={{ base: "auto", md: "calc(100vh - 80px - 120px)" }}>
      <Container maxW="container.xl" py={{ base: 12, md: 6 }} px={{ base: 4, md: 6 }} position="relative" zIndex={1} h="100%" display="flex" flexDirection="column" justifyContent="center">
        <Box
          position="absolute"
          top="10%"
          right="5%"
          opacity={0.2}
          pointerEvents="none"
          zIndex={0}
          display={{ base: "none", md: "block" }}
        >
          <motion.div
            animate={reducedMotion ? {} : {
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={reducedMotion ? {} : {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            aria-hidden="true"
          >
            <Icon as={IoPlanet} w={{ base: 20, md: 32 }} h={{ base: 20, md: 32 }} color="purple.400" />
          </motion.div>
        </Box>
        
        <Box
          position="absolute"
          top="60%"
          left="5%"
          opacity={0.15}
          pointerEvents="none"
          zIndex={0}
          display={{ base: "none", lg: "block" }}
        >
          <motion.div
            animate={reducedMotion ? {} : {
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={reducedMotion ? {} : {
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          >
            <Icon as={IoTelescope} w={{ base: 16, md: 24 }} h={{ base: 16, md: 24 }} color="cyan.400" />
          </motion.div>
        </Box>

        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 6, md: 8 }}
          position="relative"
          zIndex={2}
          flex={1}
        >
        <Stack spacing={{ base: 6, md: 6 }} maxW={{ base: "100%", lg: "600px" }} w="full" textAlign={{ base: "center", lg: "left" }}>
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 0.5 }}
          >
            <Box>
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              color="brand.yellow.400"
              letterSpacing="tight"
              mb={{ base: 4, md: 3 }}
            >
              {t('hero.title').split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </Heading>
            <Heading
              as="h2"
              size={{ base: "sm", md: "md" }}
              color="gray.500"
              fontWeight="normal"
              mb={{ base: 4, md: 6 }}
            >
              {t('hero.subtitle')}
            </Heading>
            </Box>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 0.5, delay: 0.2 }}
          >
            <Text fontSize={{ base: "md", md: "lg", lg: "lg" }} color="gray.300" lineHeight="tall">
              {t('hero.description')}
            </Text>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 0.5, delay: 0.4 }}
          >
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 3, md: 4 }}
              w={{ base: "full", sm: "auto" }}
              align={{ base: "stretch", sm: "center" }}
              role="group"
              aria-label="Ações principais"
            >
            <Button
              size={{ base: "md", md: "lg" }}
              variant="solid"
              as={Link}
              to="/portfolio/development"
              bg="brand.yellow.400"
              color="brand.space.500"
              w={{ base: "full", sm: "auto" }}
              aria-label="Ver projetos de desenvolvimento"
              _hover={reducedMotion ? {} : {
                bg: "brand.yellow.500",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _focus={{
                outline: '3px solid #4A90E2',
                outlineOffset: '2px',
              }}
            >
              {t('hero.viewProjects')}
            </Button>
            <Button
              size={{ base: "md", md: "lg" }}
              variant="outline"
              as={Link}
              to="/contact"
              borderColor="brand.yellow.400"
              color="brand.yellow.400"
              aria-label="Ir para página de contato"
              _hover={reducedMotion ? {} : {
                bg: "brand.yellow.400",
                color: "brand.space.500",
              }}
              _focus={{
                outline: '3px solid #4A90E2',
                outlineOffset: '2px',
              }}
            >
              {t('hero.contact')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              leftIcon={<FaBriefcase />}
              borderColor="brand.yellow.400"
              color="brand.yellow.400"
              aria-label="Baixar currículo em PDF"
              onClick={(e) => {
                e.preventDefault();
                trackCVDownload();
                const link = document.createElement('a');
                link.href = "./Rogério- Senior Software Engineer.pdf";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              _hover={reducedMotion ? {} : {
                bg: "brand.yellow.400",
                color: "brand.space.500",
              }}
              _focus={{
                outline: '3px solid #4A90E2',
                outlineOffset: '2px',
              }}
            >
              {t('hero.downloadCV')}
            </Button>
            </Stack>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 0.5, delay: 0.6 }}
          >
            <HStack
              spacing={{ base: 6, md: 4 }}
              justify={{ base: "center", md: "flex-start" }}
              flexWrap="wrap"
              w={{ base: "100%", md: "auto" }}
              role="group"
              aria-label="Links de redes sociais"
            >
            <IconButton
              aria-label="Abrir perfil no GitHub em nova aba"
              icon={<FaGithub />}
              variant="ghost"
              fontSize={{ base: "24px", md: "24px" }}
              size={{ base: "lg", md: "lg" }}
              minW={{ base: "56px", md: "auto" }}
              minH={{ base: "56px", md: "auto" }}
              color="gray.400"
              onClick={(e) => {
                e.preventDefault();
                trackSocialClick('github');
                window.open('https://github.com/rogeriojr', '_blank', 'noopener,noreferrer');
              }}
              _hover={reducedMotion ? {} : { color: "brand.yellow.400", transform: "scale(1.1)" }}
              _focus={{
                outline: '3px solid #4A90E2',
                outlineOffset: '2px',
              }}
              _active={{ transform: "scale(0.95)" }}
              transition={reducedMotion ? "none" : "all 0.2s"}
            />
            <IconButton
              aria-label="Abrir perfil no LinkedIn em nova aba"
              icon={<FaLinkedin />}
              variant="ghost"
              fontSize={{ base: "24px", md: "24px" }}
              size={{ base: "lg", md: "lg" }}
              minW={{ base: "56px", md: "auto" }}
              minH={{ base: "56px", md: "auto" }}
              color="gray.400"
              onClick={(e) => {
                e.preventDefault();
                trackSocialClick('linkedin');
                window.open('https://www.linkedin.com/in/rogério-júnior-174719120/', '_blank', 'noopener,noreferrer');
              }}
              _hover={reducedMotion ? {} : { color: "brand.yellow.400", transform: "scale(1.1)" }}
              _focus={{
                outline: '3px solid #4A90E2',
                outlineOffset: '2px',
              }}
              _active={{ transform: "scale(0.95)" }}
              transition={reducedMotion ? "none" : "all 0.2s"}
            />
            <IconButton
              aria-label="Abrir perfil na Workana em nova aba"
              icon={<FaBriefcase />}
              variant="ghost"
              fontSize={{ base: "24px", md: "24px" }}
              size={{ base: "lg", md: "lg" }}
              minW={{ base: "56px", md: "auto" }}
              minH={{ base: "56px", md: "auto" }}
              color="gray.400"
              onClick={(e) => {
                e.preventDefault();
                trackSocialClick('workana');
                window.open('https://www.workana.com/freelancer/5aea67e6fd911e0c207642b63c50fb9d', '_blank', 'noopener,noreferrer');
              }}
              _hover={reducedMotion ? {} : { color: "brand.yellow.400", transform: "scale(1.1)" }}
              _focus={{
                outline: '3px solid #4A90E2',
                outlineOffset: '2px',
              }}
              _active={{ transform: "scale(0.95)" }}
              transition={reducedMotion ? "none" : "all 0.2s"}
            />
            </HStack>
          </motion.div>
        </Stack>

        <Box
          id="interactive-profile-wrapper"
          as={motion.div}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={reducedMotion ? { duration: 0.01 } : { duration: 0.5, delay: 0.6 } as any}
          drag={false}
          whileDrag={reducedMotion ? {} : { scale: 1.1 }}
          whileHover={reducedMotion ? {} : { scale: 1.05 }}
          display="flex"
          justifyContent={{ base: "center", lg: "flex-start" }}
          alignItems="center"
          w={{ base: "100%", lg: "auto" }}
          mb={{ base: 6, lg: 0 }}
          position="relative"
          aria-label="Foto de perfil"
        >
          <StyledProfileImage />
          <Tooltip label="💡 Dica: Clique 3 vezes para descobrir um easter egg!" placement="top">
            <Box
              position="absolute"
              top={{ base: "-5px", lg: "-10px" }}
              right={{ base: "-5px", lg: "-10px" }}
              w={{ base: 5, lg: 6 }}
              h={{ base: 5, lg: 6 }}
              borderRadius="full"
              bg="yellow.400"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              _hover={{ transform: 'scale(1.2)' }}
              transition="all 0.2s"
            >
              <Icon as={FaStar} w={{ base: 2.5, lg: 3 }} h={{ base: 2.5, lg: 3 }} color="gray.800" />
            </Box>
          </Tooltip>
        </Box>
      </Flex>
      
      <Box
        position="absolute"
        bottom={{ base: "20px", md: "10px" }}
        left="50%"
        transform="translateX(-50%)"
        opacity={0.3}
        fontSize="xs"
        color="gray.500"
        textAlign="center"
        zIndex={1}
      >
        <Text>
          {t('hero.subtitle').includes('Desenvolvedor') 
            ? '💡 Tente digitar "HOME" ou "SPACE" para descobrir easter eggs!'
            : '💡 Try typing "HOME" or "SPACE" to discover easter eggs!'}
        </Text>
      </Box>
    </Container>
    </Box>
  );
}
