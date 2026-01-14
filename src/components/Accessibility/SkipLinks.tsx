import { Box, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n/useTranslation';

export function SkipLinks() {
  const location = useLocation();
  const { t } = useTranslation();
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
        aria-label={t('accessibility.skipToContent')}
        _hover={{
          bg: 'blue.700',
        }}
      >
        {t('accessibility.skipToContent')}
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
            aria-label={t('accessibility.skipToNavigation')}
            _hover={{
              bg: 'blue.700',
            }}
          >
            {t('accessibility.skipToNavigation')}
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
            aria-label={t('accessibility.skipToFooter')}
            _hover={{
              bg: 'blue.700',
            }}
          >
            {t('accessibility.skipToFooter')}
          </Link>
        </>
      )}
    </Box>
  );
}
