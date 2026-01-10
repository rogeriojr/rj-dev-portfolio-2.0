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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { useTranslation } from "../i18n/useTranslation";

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box as="section" py={12} overflow="hidden">
      <Container maxW="container.xl">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <VStack spacing={12} align="stretch">
            {/* Intro Section */}
            <Box>
              <Heading as="h1" size="2xl" mb={6} bgGradient="linear(to-r, brand.yellow.400, brand.yellow.200)" bgClip="text">
                {bio[language].title}
              </Heading>
              <VStack spacing={4} align="start" maxW="container.lg">
                <Text fontSize="lg" lineHeight="tall" color="gray.300">
                  {language === 'pt' ? (
                    <>Com mais de <Text as="span" color="brand.yellow.400" fontWeight="bold">8 anos de experiência</Text>, {bio[language].paragraph1.substring(bio[language].paragraph1.indexOf('sou'))}</>
                  ) : (
                    <>{bio[language].paragraph1.split('8 years of experience')[0]}<Text as="span" color="brand.yellow.400" fontWeight="bold">8 years of experience</Text>{bio[language].paragraph1.split('8 years of experience')[1]}</>
                  )}
                </Text>
                <Text fontSize="lg" lineHeight="tall" color="gray.300">
                  {language === 'pt' ? (
                    <>Atualmente, meu foco se expandiu para o ecossistema de <Text as="span" color="brand.yellow.400" fontWeight="bold">Inteligência Artificial</Text>, {bio[language].paragraph2.split('Inteligência Artificial')[1]}</>
                  ) : (
                    <>{bio[language].paragraph2.split('Artificial Intelligence')[0]}<Text as="span" color="brand.yellow.400" fontWeight="bold">Artificial Intelligence</Text>{bio[language].paragraph2.split('Artificial Intelligence')[1]}</>
                  )}
                </Text>
                <Text fontSize="lg" lineHeight="tall" color="gray.300">
                  {bio[language].paragraph3}
                </Text>
              </VStack>
            </Box>

            <Divider borderColor="gray.700" />

            {/* Experience Section */}
            <Box>
              <HStack mb={8} spacing={4}>
                <Icon as={FaBriefcase} w={6} h={6} color="brand.yellow.400" />
                <Heading as="h2" size="xl">
                  {sections[language].experience}
                </Heading>
              </HStack>

              <VStack spacing={6} align="stretch">
                {experiences.map((exp, index) => (
                  <MotionCard
                    key={index}
                    variants={itemVariants}
                    bg="rgba(255, 255, 255, 0.05)"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderWidth="1px"
                    _hover={{
                      borderColor: "brand.yellow.400",
                      transform: "translateY(-2px)",
                      transition: "all 0.2s"
                    }}
                  >
                    <CardBody>
                      <Stack direction={{ base: "column", md: "row" }} justify="space-between" mb={2}>
                        <Heading size="md" color="brand.yellow.400">
                          {exp.role[language]}
                        </Heading>
                        <Badge colorScheme="yellow" alignSelf="start" px={2} py={1} borderRadius="md">
                          {exp.period}
                        </Badge>
                      </Stack>
                      <Text fontWeight="bold" mb={3} color="gray.400">
                        {exp.company}
                      </Text>
                      <Text mb={4} color="gray.300">
                        {exp.description[language]}
                      </Text>
                      <HStack spacing={2} wrap="wrap">
                        {exp.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" colorScheme="gray" fontSize="xs">
                            {skill}
                          </Badge>
                        ))}
                      </HStack>
                    </CardBody>
                  </MotionCard>
                ))}
              </VStack>
            </Box>

            <Divider borderColor="gray.700" />

            {/* Education Section (Brief) */}
            <Box>
              <HStack mb={4} spacing={4}>
                <Icon as={FaGraduationCap} w={6} h={6} color="brand.yellow.400" />
                <Heading as="h2" size="lg">
                  {sections[language].education}
                </Heading>
              </HStack>
              <Text fontSize="lg" color="gray.300">
                {sections[language].educationText}
              </Text>
            </Box>

            <Divider borderColor="gray.700" />

            {/* Skills Section */}
            <Box>
              <Heading as="h2" size="xl" mb={8}>
                {sections[language].skills}
              </Heading>
              <SimpleGrid
                columns={{ base: 4, sm: 6, md: 8, lg: 10, xl: 12 }}
                spacing={8}
              >
                {skills.map((skill, index) => (
                  <Tooltip key={index} label={skill.name} hasArrow placement="top">
                    <MotionBox
                      variants={itemVariants}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      cursor="pointer"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={skill.iconUrl}
                        alt={skill.name}
                        h="45px"
                        w="45px"
                        objectFit="contain"
                        filter="grayscale(20%)"
                        _hover={{ filter: "grayscale(0%) drop-shadow(0 0 8px rgba(255,215,0,0.3))" }}
                        transition="all 0.2s"
                      />
                    </MotionBox>
                  </Tooltip>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}
