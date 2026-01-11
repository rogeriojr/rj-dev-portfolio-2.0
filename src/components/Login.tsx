import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaRocket, FaLock } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';
import { useTranslation } from '../i18n/useTranslation';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { language } = useTranslation();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: language === 'pt' ? 'Login realizado com sucesso!' : 'Login successful!',
        description: language === 'pt' ? 'Redirecionando...' : 'Redirecting...',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(
        errorMessage.includes('auth/user-not-found') || errorMessage.includes('auth/wrong-password')
          ? language === 'pt'
            ? 'Email ou senha incorretos'
            : 'Incorrect email or password'
          : language === 'pt'
          ? 'Erro ao fazer login. Tente novamente.'
          : 'Login error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="relative" minH="100vh" py={20}>
      <Container maxW="container.sm" position="relative" zIndex={1}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Icon as={FaRocket} w={16} h={16} color="cyan.400" />
            <Heading
              size="2xl"
              bgGradient="linear(to-r, cyan.400, blue.500)"
              bgClip="text"
            >
              {language === 'pt' ? 'Acesso Administrativo' : 'Admin Access'}
            </Heading>
            <Text color="gray.400">
              {language === 'pt'
                ? 'Entre com suas credenciais para acessar o painel administrativo'
                : 'Enter your credentials to access the admin panel'}
            </Text>
          </VStack>

          <Box
            bg={bg}
            p={8}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="2xl"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <FormControl isRequired>
                  <FormLabel>
                    <Icon as={FaLock} mr={2} />
                    {language === 'pt' ? 'Email' : 'Email'}
                  </FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'pt' ? 'seu@email.com' : 'your@email.com'}
                    size="lg"
                    autoComplete="email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>
                    {language === 'pt' ? 'Senha' : 'Password'}
                  </FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={language === 'pt' ? '••••••••' : '••••••••'}
                    size="lg"
                    autoComplete="current-password"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="cyan"
                  size="lg"
                  isLoading={loading}
                  loadingText={language === 'pt' ? 'Entrando...' : 'Logging in...'}
                  leftIcon={<Icon as={FaRocket} />}
                  w="full"
                >
                  {language === 'pt' ? 'Entrar' : 'Login'}
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
