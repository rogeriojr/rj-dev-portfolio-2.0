import { Box, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export function SkipLinks() {
  const location = useLocation();
  const isInLab = location.pathname.startsWith('/lab');

  return (
    <Box position="absolute" top={0} left={0} zIndex={10000} w="100%">
      <Link
        href="#main-content"
        className="skip-link"
        bg="blue.600"
        color="white"
        px={4}
        py={2}
        borderRadius="md"
        fontWeight="bold"
        _focus={{
          top: 0,
          position: 'absolute',
        }}
        _hover={{
          bg: 'blue.700',
        }}
      >
        Pular para conteúdo principal
      </Link>
      {!isInLab && (
        <>
          <Link
            href="#navigation"
            className="skip-link"
            bg="blue.600"
            color="white"
            px={4}
            py={2}
            borderRadius="md"
            fontWeight="bold"
            ml={2}
            _focus={{
              top: 0,
              position: 'absolute',
            }}
            _hover={{
              bg: 'blue.700',
            }}
          >
            Pular para navegação
          </Link>
          <Link
            href="#footer"
            className="skip-link"
            bg="blue.600"
            color="white"
            px={4}
            py={2}
            borderRadius="md"
            fontWeight="bold"
            ml={2}
            _focus={{
              top: 0,
              position: 'absolute',
            }}
            _hover={{
              bg: 'blue.700',
            }}
          >
            Pular para rodapé
          </Link>
        </>
      )}
    </Box>
  );
}
