import { IconButton, Tooltip, useColorModeValue, Box } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { useFloatingButtonsConfig } from '../hooks/useFloatingButtonsConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

const WHATSAPP_NUMBER = '+5564981294566';

const MotionBox = motion(Box);

export function WhatsAppButton() {
  const { language } = useTranslation();
  const { config, getButtonStyle } = useFloatingButtonsConfig();
  const reducedMotion = useReducedMotion();
  const bg = useColorModeValue('#25D366', '#25D366');
  const hoverBg = useColorModeValue('#20BA5A', '#20BA5A');
  const boxShadowColor = useColorModeValue('rgba(37, 211, 102, 0.6)', 'rgba(37, 211, 102, 0.4)');
  const hoverBoxShadowColor = useColorModeValue('rgba(37, 211, 102, 0.8)', 'rgba(37, 211, 102, 0.6)');

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      language === 'pt' 
        ? 'Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.'
        : 'Hello! I saw your portfolio and would like to discuss a project.'
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (!config.whatsapp.enabled) return null;

  const hasCustomPosition = config.whatsapp.position !== 'bottom-right' || 
                            config.whatsapp.customX !== undefined || 
                            config.whatsapp.customY !== undefined;

  return (
    <MotionBox
      style={hasCustomPosition ? getButtonStyle('whatsapp') : undefined}
      position={hasCustomPosition ? undefined : "fixed"}
      bottom={hasCustomPosition ? undefined : { base: '20px', sm: '24px', md: '28px' }}
      right={hasCustomPosition ? undefined : { base: '20px', sm: '24px', md: '28px' }}
      zIndex={hasCustomPosition ? undefined : 9999}
      whileHover={reducedMotion ? {} : { scale: 1.05 }}
      whileTap={reducedMotion ? {} : { scale: 0.95 }}
      css={{ 
        pointerEvents: 'auto',
        isolation: 'isolate'
      }}
    >
      <Tooltip
        label={language === 'pt' ? 'Falar no WhatsApp' : 'Chat on WhatsApp'}
        placement="left"
        hasArrow
      >
        <IconButton
          aria-label={language === 'pt' ? 'Abrir conversa no WhatsApp em nova aba' : 'Open WhatsApp chat in new tab'}
          icon={<FaWhatsapp />}
          onClick={handleWhatsAppClick}
          size="md"
          borderRadius="full"
          minW="40px"
          minH="40px"
          w="40px"
          h="40px"
          boxShadow={`0 4px 20px ${boxShadowColor}, 0 0 0 2px rgba(255, 255, 255, 0.1)`}
          bg={bg}
          color="white"
          _hover={reducedMotion ? {} : {
            bg: hoverBg,
            boxShadow: `0 0 30px ${hoverBoxShadowColor}, 0 0 0 3px rgba(255, 255, 255, 0.2)`,
            transform: 'scale(1.1)',
          }}
          _focus={{
            outline: '3px solid #4A90E2',
            outlineOffset: '2px',
          }}
          _active={{
            transform: 'scale(0.95)',
          }}
          transition={reducedMotion ? "none" : "all 0.2s ease-in-out"}
          cursor="pointer"
          border="2px solid"
          borderColor={useColorModeValue('rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)')}
        />
      </Tooltip>
    </MotionBox>
  );
}
