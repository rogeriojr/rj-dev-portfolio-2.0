import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import { FaRocket } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';
import { useTranslation } from '../i18n/useTranslation';

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();
  const { language } = useTranslation();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        flexDirection="column"
        gap={4}
      >
        <Spinner size="xl" color="cyan.400" thickness="4px" />
        <VStack spacing={2}>
          <Icon as={FaRocket} w={8} h={8} color="cyan.400" />
          <Text color="gray.400">
            {language === 'pt' ? 'Verificando autenticação...' : 'Verifying authentication...'}
          </Text>
        </VStack>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;
