import { Box, Container, Heading, Text, Stack, Image, Button, Flex, IconButton, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaBehance } from 'react-icons/fa';

export function Home() {
  return (
    <Container maxW="container.xl" py={20}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
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
              bgGradient="linear(to-r, brand.yellow.400, brand.yellow.500)"
              bgClip="text"
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
              Transformando ideias em experiências digitais extraordinárias através de
              código e design inovador.
            </Text>
          </Box>

          <Stack
            as={motion.div}
            direction={{ base: 'column', sm: 'row' }}
            spacing={4}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: "0.5s", delay: "0.4s" }}
          >
            <Button size="lg" variant="solid">
              Ver Projetos
            </Button>
            <Button
              size="lg"
              variant="outline"
              borderColor="brand.yellow.400"
              color="brand.yellow.400"
              _hover={{
                bg: 'brand.yellow.400',
                color: 'brand.space.500'
              }}
            >
              Contato
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
              href="https://github.com/yourusername"
              target="_blank"
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="ghost"
              fontSize="24px"
              color="gray.400"
              _hover={{ color: 'brand.yellow.400' }}
            />
            <IconButton
              as="a"
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              fontSize="24px"
              color="gray.400"
              _hover={{ color: 'brand.yellow.400' }}
            />
            <IconButton
              as="a"
              href="https://instagram.com/yourusername"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              fontSize="24px"
              color="gray.400"
              _hover={{ color: 'brand.yellow.400' }}
            />
            <IconButton
              as="a"
              href="https://behance.net/yourusername"
              target="_blank"
              aria-label="Behance"
              icon={<FaBehance />}
              variant="ghost"
              fontSize="24px"
              color="gray.400"
              _hover={{ color: 'brand.yellow.400' }}
            />
          </HStack>
        </Stack>

        <Box
          as={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: "0.5s", delay: "0.6s" }}
          position="relative"
        >
          <Box
            as={motion.div}
            position="absolute"
            inset={0}
            borderRadius="full"
            bg="brand.yellow.400"
            filter="blur(40px)"
            opacity={0.2}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: "3s",
              repeat: "infinite",
              ease: "linear"
            }}
          />
          <Image
            src="/src/assets/imgs/pp-social.png"
            alt="Rogério Júnior"
            w={{ base: "300px", md: "400px" }}
            h={{ base: "300px", md: "400px" }}
            borderRadius="full"
            objectFit="cover"
            zIndex={1}
            position="relative"
          />
        </Box>
      </Flex>
    </Container>
  );
}
