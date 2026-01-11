import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Tooltip,
  HStack,
  Badge,
  Card,
  CardBody,
  Stack,
  Divider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaRocket, FaStar, FaCode } from "react-icons/fa";
import { IoPlanet, IoTelescope, IoRocketOutline } from "react-icons/io5";
import { useTranslation } from "../i18n/useTranslation";
import { FloatingPlanets, FlyingRockets } from "./SpaceAnimations";
import { SpaceBackground } from "./SpaceBackground";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

interface Experience {
  role: {
    pt: string;
    en: string;
  };
  company: string;
  period: string;
  description: {
    pt: string;
    en: string;
  };
  skills: string[];
}

const experiences: Experience[] = [
  {
    role: {
      pt: "Desenvolvedor FullStack & AI Driven",
      en: "FullStack & AI Driven Developer"
    },
    company: "NEO IDEA",
    period: "Apr 2025 - Present",
    description: {
      pt: "Atuação no desenvolvimento de interfaces modernas e performáticas, implementando arquiteturas escaláveis e melhores práticas. Foco em sistemas baseados em IA, Agentes, RAG e integração com LLMs.",
      en: "Development of modern and performant interfaces, implementing scalable architectures and best practices. Focus on AI-based systems, Agents, RAG, and LLM integration."
    },
    skills: ["React", "TypeScript", "Python", "AI Agents", "RAG", "LLM Integration", "Supabase", "PostgreSQL", "Jest", "TailwindCSS"],
  },
  {
    role: {
      pt: "Full Stack Developer (Freelance)",
      en: "Full Stack Developer (Freelance)"
    },
    company: "Workana / Projetos Autônomos",
    period: "Jul 2024 - Apr 2025",
    description: {
      pt: "Desenvolvimento de soluções completas para diversos clientes, desde e-commerces a dashboards administrativos (SaaS). Especialização em integração com IA (OpenAI API), automação e sistemas de pagamento.",
      en: "Development of complete solutions for various clients, from e-commerce to administrative dashboards (SaaS). Specialization in AI integration (OpenAI API), automation, and payment systems."
    },
    skills: ["Next.js", "Node.js", "React", "Firebase", "Stripe", "OpenAI API", "MongoDB", "Auth0", "AWS", "Prisma"],
  },
  {
    role: {
      pt: "Senior Frontend Engineer",
      en: "Senior Frontend Engineer"
    },
    company: "Presence Tecnologia",
    period: "May 2024 - Jul 2024",
    description: {
      pt: "Engenharia de frontend focada em React.js, manutenção de sistemas legados e migração para tecnologias modernas. Implementação de novas features com foco em UX.",
      en: "Frontend engineering focused on React.js, legacy system maintenance, and migration to modern technologies. Implementation of new features with focus on UX."
    },
    skills: ["React", "Redux", "Redux-Saga", "Material UI", "Styled Components", "JavaScript (ES6+)", "Unit Testing", "REST API", "Framer Motion"],
  },
  {
    role: {
      pt: "Desenvolvedor Frontend",
      en: "Frontend Developer"
    },
    company: "CompartilhaClub",
    period: "May 2022 - Mar 2024",
    description: {
      pt: "Responsável pela arquitetura de frontend e liderança técnica em projetos chave. Desenvolvimento de aplicações responsivas e otimizadas para SEO.",
      en: "Responsible for frontend architecture and technical leadership in key projects. Development of responsive and SEO-optimized applications."
    },
    skills: ["Next.js", "SEO", "TailwindCSS", "UI/UX Design", "Headless CMS", "Performance Optimization", "Vercel", "Zustand"],
  },
  {
    role: {
      pt: "Tech Lead & Mobile Developer",
      en: "Tech Lead & Mobile Developer"
    },
    company: "SENSI CONECT",
    period: "Feb 2019 - Mar 2023",
    description: {
      pt: "Liderança no desenvolvimento de um sistema crítico de gestão hospitalar. Desenvolvimento mobile com React Native e Flutter, garantindo estabilidade e performance em ambiente de alta pressão.",
      en: "Leadership in developing a critical hospital management system. Mobile development with React Native and Flutter, ensuring stability and performance in high-pressure environments."
    },
    skills: ["Flutter", "Dart", "React Native", "Native Modules", "Firebase", "HealthTech", "SQL", "Team Leadership", "Agile", "App Store/Play Store"],
  },
];

interface Skill {
  name: string;
  iconUrl: string;
}

const skills: Skill[] = [
  // New/Highlight Skills
  { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Next.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "Supabase", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },

  // Core
  { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "React Native", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },

  // Mobile & Others
  { name: "Flutter", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Dart", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },

  // Backend & DevOps
  { name: "Firebase", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Redis", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },

  // Tools & Design
  { name: "Figma", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Linux", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Jest", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
];

export function About() {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useTranslation();

  const bio = {
    pt: {
      title: "Sobre Mim",
      paragraph1: "Com mais de 8 anos de experiência, sou um Engenheiro de Software Sênior apaixonado por criar soluções inovadoras. Minha jornada combina uma base sólida em Design Gráfico com expertise técnica profunda em desenvolvimento Full Stack e Mobile.",
      paragraph2: "Atualmente, meu foco se expandiu para o ecossistema de Inteligência Artificial, trabalhando com Agentes de IA, RAG (Retrieval-Augmented Generation) e automações inteligentes, integrando essas tecnologias a aplicações React e Node.js escaláveis.",
      paragraph3: "Seja liderando equipes técnicas, arquitetando sistemas complexos ou refinando a interface do usuário pixel-perfect, meu objetivo é sempre entregar excelência técnica com a melhor experiência de usuário possível."
    },
    en: {
      title: "About Me",
      paragraph1: "With over 8 years of experience, I am a Senior Software Engineer passionate about creating innovative solutions. My journey combines a solid foundation in Graphic Design with deep technical expertise in Full Stack and Mobile development.",
      paragraph2: "Currently, my focus has expanded to the Artificial Intelligence ecosystem, working with AI Agents, RAG (Retrieval-Augmented Generation), and intelligent automations, integrating these technologies into scalable React and Node.js applications.",
      paragraph3: "Whether leading technical teams, architecting complex systems, or refining pixel-perfect user interfaces, my goal is always to deliver technical excellence with the best possible user experience."
    }
  };

  const sections = {
    pt: {
      experience: "Experiência Profissional",
      education: "Formação Acadêmica",
      skills: "Tech Stack & Ferramentas",
      educationText: "Design Gráfico - Faculdade de Tecnologia Senac Goiás"
    },
    en: {
      experience: "Professional Experience",
      education: "Academic Background",
      skills: "Tech Stack & Tools",
      educationText: "Graphic Design - Senac Goiás Technology College"
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardBg = useColorModeValue('whiteAlpha.50', 'whiteAlpha.50');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <Box as="section" py={{ base: 8, md: 12 }} overflow="hidden" position="relative" minH="100vh" px={{ base: 4, md: 0 }}>
      <SpaceBackground />
      <FloatingPlanets />
      <FlyingRockets />
      
      <Container maxW="container.xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <VStack spacing={{ base: 8, md: 12 }} align="stretch">
            {/* Intro Section with Space Theme */}
            <Box position="relative">
              {/* Floating Space Elements - Hidden on mobile */}
              <Box
                position="absolute"
                top="-20px"
                right="10%"
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
                  <Icon as={IoPlanet} w={{ base: 16, md: 24 }} h={{ base: 16, md: 24 }} color="purple.400" />
                </motion.div>
              </Box>
              
              <Box
                position="absolute"
                top="50%"
                left="-10%"
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
                  <Icon as={IoTelescope} w={{ base: 16, md: 20 }} h={{ base: 16, md: 20 }} color="cyan.400" />
                </motion.div>
              </Box>

              <VStack spacing={{ base: 4, md: 6 }} align="start" position="relative" zIndex={1}>
                <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap">
                  <Icon as={FaRocket} w={{ base: 6, md: 8 }} h={{ base: 6, md: 8 }} color="cyan.400" />
                  <Heading 
                    as="h1" 
                    size={{ base: "xl", md: "2xl" }}
                    bgGradient="linear(to-r, cyan.400, purple.500, brand.yellow.400)" 
                    bgClip="text"
                    fontFamily="Share Tech Mono"
                    letterSpacing="tight"
                  >
                    {bio[language].title}
                  </Heading>
                </HStack>
                <VStack spacing={{ base: 3, md: 4 }} align="start" maxW="container.lg">
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Text fontSize={{ base: "md", md: "lg" }} lineHeight="tall" color="gray.300">
                    {language === 'pt' ? (
                      <>Com mais de <Text as="span" color="cyan.400" fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>8 anos de experiência</Text>, {bio[language].paragraph1.substring(bio[language].paragraph1.indexOf('sou'))}</>
                    ) : (
                      <>{bio[language].paragraph1.split('8 years of experience')[0]}<Text as="span" color="cyan.400" fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>8 years of experience</Text>{bio[language].paragraph1.split('8 years of experience')[1]}</>
                    )}
                  </Text>
                </MotionBox>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Text fontSize={{ base: "md", md: "lg" }} lineHeight="tall" color="gray.300">
                    {language === 'pt' ? (
                      <>Atualmente, meu foco se expandiu para o ecossistema de <Text as="span" color="purple.400" fontWeight="bold">Inteligência Artificial</Text>, {bio[language].paragraph2.split('Inteligência Artificial')[1]}</>
                    ) : (
                      <>{bio[language].paragraph2.split('Artificial Intelligence')[0]}<Text as="span" color="purple.400" fontWeight="bold">Artificial Intelligence</Text>{bio[language].paragraph2.split('Artificial Intelligence')[1]}</>
                    )}
                  </Text>
                </MotionBox>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Text fontSize={{ base: "md", md: "lg" }} lineHeight="tall" color="gray.300">
                    {bio[language].paragraph3}
                  </Text>
                </MotionBox>
                </VStack>
              </VStack>
            </Box>

            <Divider borderColor="gray.700" />

            {/* Experience Section */}
            <Box position="relative">
              {/* Decorative Rocket - Hidden on mobile */}
              <Box
                position="absolute"
                top="-10px"
                right="5%"
                opacity={0.1}
                pointerEvents="none"
                zIndex={0}
                display={{ base: "none", lg: "block" }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon as={IoRocketOutline} w={{ base: 12, md: 16 }} h={{ base: 12, md: 16 }} color="orange.400" />
                </motion.div>
              </Box>

              <HStack mb={{ base: 6, md: 8 }} spacing={{ base: 2, md: 4 }} position="relative" zIndex={1} flexWrap="wrap">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon as={FaBriefcase} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="cyan.400" />
                </motion.div>
                <Heading 
                  as="h2" 
                  size={{ base: "lg", md: "xl" }}
                  bgGradient="linear(to-r, cyan.400, purple.500)"
                  bgClip="text"
                  fontFamily="Share Tech Mono"
                >
                  {sections[language].experience}
                </Heading>
              </HStack>

              <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                  {experiences.map((exp, index) => (
                    <MotionCard
                      key={index}
                      initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      bg={cardBg}
                      backdropFilter="blur(10px)"
                      borderColor={borderColor}
                      borderWidth="1px"
                      boxShadow="lg"
                      _hover={{
                        borderColor: "cyan.400",
                        transform: { base: "none", md: "translateY(-4px) scale(1.02)" },
                        boxShadow: { base: "lg", md: "0 10px 30px rgba(66, 153, 225, 0.3)" },
                        transition: "all 0.3s"
                      }}
                    >
                    <CardBody p={{ base: 4, md: 6 }}>
                      <Stack direction={{ base: "column", md: "row" }} justify="space-between" mb={2} spacing={{ base: 2, md: 0 }}>
                        <Heading 
                          size={{ base: "sm", md: "md" }}
                          bgGradient="linear(to-r, cyan.400, purple.400)"
                          bgClip="text"
                          wordBreak="break-word"
                        >
                          {exp.role[language]}
                        </Heading>
                        <Badge 
                          colorScheme="cyan" 
                          alignSelf={{ base: "flex-start", md: "start" }}
                          px={{ base: 2, md: 3 }}
                          py={1}
                          borderRadius="full"
                          boxShadow="0 0 10px rgba(66, 153, 225, 0.3)"
                          fontSize={{ base: "xs", md: "sm" }}
                        >
                          {exp.period}
                        </Badge>
                      </Stack>
                      <HStack mb={3} spacing={2} flexWrap="wrap">
                        <Icon as={FaStar} w={{ base: 3, md: 4 }} h={{ base: 3, md: 4 }} color="yellow.400" />
                        <Text fontWeight="bold" color="gray.300" fontSize={{ base: "md", md: "lg" }}>
                          {exp.company}
                        </Text>
                      </HStack>
                      <Text mb={4} color="gray.400" lineHeight="tall" fontSize={{ base: "sm", md: "md" }}>
                        {exp.description[language]}
                      </Text>
                      <HStack spacing={2} wrap="wrap">
                        {exp.skills.map((skill, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge 
                              variant="outline" 
                              colorScheme="cyan" 
                              fontSize={{ base: "2xs", md: "xs" }}
                              px={{ base: 1.5, md: 2 }}
                              py={1}
                              borderRadius="md"
                              borderColor="cyan.500"
                              color="cyan.300"
                              _hover={{
                                bg: "cyan.500",
                                color: "white",
                                borderColor: "cyan.400"
                              }}
                              transition="all 0.2s"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </HStack>
                    </CardBody>
                  </MotionCard>
                  ))}
              </VStack>
            </Box>

            <Divider borderColor="gray.700" />

            {/* Education Section (Brief) */}
            <Box position="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <HStack mb={{ base: 3, md: 4 }} spacing={{ base: 2, md: 4 }} flexWrap="wrap">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon as={FaGraduationCap} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="purple.400" />
                  </motion.div>
                  <Heading 
                    as="h2" 
                    size={{ base: "md", md: "lg" }}
                    bgGradient="linear(to-r, purple.400, pink.400)"
                    bgClip="text"
                    fontFamily="Share Tech Mono"
                  >
                    {sections[language].education}
                  </Heading>
                </HStack>
                <Box
                  p={{ base: 4, md: 6 }}
                  bg={cardBg}
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  border="1px"
                  borderColor={borderColor}
                  boxShadow="md"
                >
                  <Text fontSize={{ base: "md", md: "lg" }} color="gray.300" lineHeight="tall">
                    {sections[language].educationText}
                  </Text>
                </Box>
              </motion.div>
            </Box>

            <Divider borderColor="gray.700" />

            {/* Skills Section */}
            <Box position="relative">
              {/* Decorative Stars - Hidden on mobile */}
              <Box
                position="absolute"
                top="20px"
                right="10%"
                opacity={0.2}
                pointerEvents="none"
                zIndex={0}
                display={{ base: "none", lg: "block" }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon as={FaStar} w={{ base: 8, md: 12 }} h={{ base: 8, md: 12 }} color="yellow.400" />
                </motion.div>
              </Box>

              <HStack mb={{ base: 6, md: 8 }} spacing={{ base: 2, md: 4 }} position="relative" zIndex={1} flexWrap="wrap">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Icon as={FaCode} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="green.400" />
                </motion.div>
                <Heading 
                  as="h2" 
                  size={{ base: "lg", md: "xl" }}
                  bgGradient="linear(to-r, green.400, cyan.400)"
                  bgClip="text"
                  fontFamily="Share Tech Mono"
                >
                  {sections[language].skills}
                </Heading>
              </HStack>

              <Box
                p={{ base: 4, md: 6, lg: 8 }}
                bg={cardBg}
                backdropFilter="blur(10px)"
                borderRadius="2xl"
                border="1px"
                borderColor={borderColor}
                boxShadow="xl"
                position="relative"
                zIndex={1}
              >
                <SimpleGrid
                  columns={{ base: 3, sm: 4, md: 6, lg: 8, xl: 10, "2xl": 12 }}
                  spacing={{ base: 4, md: 6, lg: 8 }}
                >
                  {skills.map((skill, index) => (
                      <Tooltip key={index} label={skill.name} hasArrow placement="top" bg="gray.800" color="white">
                        <MotionBox
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.03,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ 
                            scale: { base: 1.2, md: 1.3 },
                            rotate: [0, -10, 10, -10, 0],
                            y: { base: -5, md: -10 },
                            transition: { duration: 0.3 }
                          }}
                          whileTap={{ scale: 0.9 }}
                          cursor="pointer"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p={{ base: 1.5, md: 2 }}
                          borderRadius="lg"
                          bg="whiteAlpha.50"
                          _hover={{
                            bg: "whiteAlpha.100",
                            boxShadow: { base: "0 0 10px rgba(66, 153, 225, 0.3)", md: "0 0 20px rgba(66, 153, 225, 0.4)" }
                          }}
                        >
                          <Image
                            src={skill.iconUrl}
                            alt={skill.name}
                            h={{ base: "35px", sm: "40px", md: "45px", lg: "50px" }}
                            w={{ base: "35px", sm: "40px", md: "45px", lg: "50px" }}
                            objectFit="contain"
                            filter="grayscale(30%) brightness(0.9)"
                            _hover={{ 
                              filter: "grayscale(0%) brightness(1.2) drop-shadow(0 0 12px rgba(66,153,225,0.6))" 
                            }}
                            transition="all 0.3s"
                          />
                        </MotionBox>
                      </Tooltip>
                    ))}
                </SimpleGrid>
              </Box>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}
