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

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { trackSocialClick, trackCVDownload } = useGamificationTracking();

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
    <Box position="relative" minH="100vh">
      <Container maxW="container.xl" py={{ base: 12, md: 20 }} px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        {/* Floating Space Elements - Hidden on mobile */}
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
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
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
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon as={IoTelescope} w={{ base: 16, md: 24 }} h={{ base: 16, md: 24 }} color="cyan.400" />
          </motion.div>
        </Box>

        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 6, md: 10 }}
          position="relative"
          zIndex={2}
        >
        <Stack spacing={{ base: 6, md: 8 }} maxW={{ base: "100%", lg: "600px" }} w="full" textAlign={{ base: "center", lg: "left" }}>
          <Box
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: "0.5s" }}
          >
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              color="brand.yellow.400"
              letterSpacing="tight"
              mb={4}
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

          <Box
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: "0.5s", delay: "0.2s" }}
          >
            <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} color="gray.300" lineHeight="tall">
              {t('hero.description')}
            </Text>
          </Box>

          <Stack
            as={motion.div}
            direction={{ base: "column", sm: "row" }}
            spacing={{ base: 3, md: 4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: "0.5s", delay: "0.4s" }}
            w={{ base: "full", sm: "auto" }}
            align={{ base: "stretch", sm: "center" }}
          >
            <Button
              size={{ base: "md", md: "lg" }}
              variant="solid"
              as={Link}
              to="/portfolio/development"
              bg="brand.yellow.400"
              color="brand.space.500"
              w={{ base: "full", sm: "auto" }}
              _hover={{
                bg: "brand.yellow.500",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              {t('hero.viewProjects')}
            </Button>
            <Button
              size={{ base: "md", md: "lg" }}
              variant="outline"
              as={Link}
              to="/contact" // Assuming /contact route exists or redirects correctly. If not, maybe scroll to contact section.
              borderColor="brand.yellow.400"
              color="brand.yellow.400"
              _hover={{
                bg: "brand.yellow.400",
                color: "brand.space.500",
              }}
            >
              {t('hero.contact')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              as="a"
              href="./Rogerio_Junior_Desenvolvedor_Senior.pdf"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaBriefcase />}
              borderColor="brand.yellow.400"
              color="brand.yellow.400"
              onClick={trackCVDownload}
              _hover={{
                bg: "brand.yellow.400",
                color: "brand.space.500",
              }}
            >
              {t('hero.downloadCV')}
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
              onClick={() => trackSocialClick('github')}
              _hover={{ color: "brand.yellow.400" }}
            />
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/rogério-júnior-174719120/"
              target="_blank"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              fontSize={{ base: "20px", md: "24px" }}
              size={{ base: "md", md: "lg" }}
              color="gray.400"
              onClick={() => trackSocialClick('linkedin')}
              _hover={{ color: "brand.yellow.400" }}
            />
            <IconButton
              as="a"
              href="https://www.workana.com/freelancer/5aea67e6fd911e0c207642b63c50fb9d"
              target="_blank"
              aria-label="Workana"
              icon={<FaBriefcase />}
              variant="ghost"
              fontSize={{ base: "20px", md: "24px" }}
              size={{ base: "md", md: "lg" }}
              color="gray.400"
              onClick={() => trackSocialClick('workana')}
              _hover={{ color: "brand.yellow.400" }}
            />
          </HStack>
        </Stack>

        <Box
          id="interactive-profile-wrapper"
          as={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: "0.5s", delay: "0.6s" }}
          position="relative"
          drag={typeof window !== 'undefined' && window.innerWidth >= 768}
          dragConstraints={{
            top: -100,
            left: -100,
            right: 100,
            bottom: 100,
          }}
          whileDrag={{ scale: 1.1 }}
          whileHover={{ scale: 1.05 }}
          display={{ base: "none", lg: "block" }}
          maxW={{ base: "200px", lg: "none" }}
          mx={{ base: "auto", lg: 0 }}
        >
          <StyledProfileImage />
          {/* Easter Egg: Click 3 times on profile */}
          <Tooltip label="💡 Dica: Clique 3 vezes para descobrir um easter egg!" placement="top">
            <Box
              position="absolute"
              top="-10px"
              right="-10px"
              w={6}
              h={6}
              borderRadius="full"
              bg="yellow.400"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              _hover={{ transform: 'scale(1.2)' }}
              transition="all 0.2s"
            >
              <Icon as={FaStar} w={3} h={3} color="gray.800" />
            </Box>
          </Tooltip>
        </Box>
      </Flex>
      
      {/* Secret Message */}
      <Box
        position="absolute"
        bottom="20px"
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
