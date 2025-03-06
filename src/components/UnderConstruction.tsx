import { Box, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaRocket, FaSpaceShuttle } from "react-icons/fa";
import { css, keyframes } from "@emotion/react";

export function UnderConstruction() {
  const floatAnimation = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  `;

  const starAnimation = keyframes`
    0% { opacity: 0.2; }
    50% { opacity: 1; }
    100% { opacity: 0.2; }
  `;

  return (
    <Box
      minH="60vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        css={css`
          background: radial-gradient(circle at center, rgba(62, 62, 62, 0.1) 0%, transparent 70%);
        `}
      />
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          css={css`
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background-color: white;
            border-radius: 50%;
            animation: ${starAnimation} ${Math.random() * 3 + 2}s infinite;
            animation-delay: ${Math.random() * 2}s;
          `}
        />
      ))}
      <VStack
        spacing={8}
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          css={css`
            animation: ${floatAnimation} 6s ease-in-out infinite;
          `}
        >
          <Icon as={FaRocket} color="yellow.400" boxSize={16} />
        </Box>
        <Heading
          as="h1"
          size="2xl"
          color="yellow.400"
          textAlign="center"
          fontWeight="bold"
        >
          Esta Galáxia está em Formação
        </Heading>
        <Text
          fontSize="xl"
          color="gray.300"
          textAlign="center"
          maxW="600px"
          lineHeight="tall"
        >
          Nossos engenheiros espaciais estão trabalhando arduamente para trazer
          conteúdo incrível para esta dimensão. Aguarde as próximas atualizações!
        </Text>
        <Box
          css={css`
            animation: ${floatAnimation} 8s ease-in-out infinite;
            animation-delay: -3s;
          `}
        >
          <Icon as={FaSpaceShuttle} color="purple.400" boxSize={12} />
        </Box>
      </VStack>
    </Box>
  );
}