import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Collapse,
  Checkbox,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { useTranslation } from "../i18n/useTranslation";
import { useState } from "react";

const MotionBox = motion(Box);

export function CookieConsent() {
  const { showBanner, acceptAll, acceptNecessary, acceptCustom } = useCookieConsent();
  const { t } = useTranslation();
  const [showCustomize, setShowCustomize] = useState(false);
  const [customConsent, setCustomConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (!showBanner) return null;

  return (
    <MotionBox
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={10001}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg={bg}
        borderTop="1px"
        borderColor={borderColor}
        boxShadow="0 -4px 20px rgba(0,0,0,0.1)"
        backdropFilter="blur(10px)"
      >
        <Box maxW="container.xl" mx="auto" px={6} py={5}>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 4, md: 6 }}
            align={{ base: "stretch", md: "center" }}
          >
            <HStack flex={1} align="start" spacing={3}>
              <Text fontSize="2xl">🍪</Text>
              <VStack align="start" spacing={1} flex={1}>
                <Text fontWeight="bold" fontSize="md">
                  {t('cookies.title')}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {t('cookies.description')}
                </Text>
              </VStack>
            </HStack>

            <HStack spacing={2} flexShrink={0}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCustomize(!showCustomize)}
              >
                {t('cookies.customize')}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={acceptNecessary}
              >
                {t('cookies.necessary')}
              </Button>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={acceptAll}
              >
                {t('cookies.acceptAll')}
              </Button>
            </HStack>
          </Stack>

          <Collapse in={showCustomize} animateOpacity>
            <Box mt={4} pt={4} borderTop="1px" borderColor={borderColor}>
              <VStack align="stretch" spacing={3}>
                <Checkbox
                  isChecked={true}
                  isDisabled
                >
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold" fontSize="sm">
                      {t('cookies.necessary')}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {t('cookies.necessaryDesc')}
                    </Text>
                  </VStack>
                </Checkbox>

                <Checkbox
                  isChecked={customConsent.analytics}
                  onChange={(e) =>
                    setCustomConsent({ ...customConsent, analytics: e.target.checked })
                  }
                >
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold" fontSize="sm">
                      {t('cookies.analytics')}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {t('cookies.analyticsDesc')}
                    </Text>
                  </VStack>
                </Checkbox>

                <Checkbox
                  isChecked={customConsent.marketing}
                  onChange={(e) =>
                    setCustomConsent({ ...customConsent, marketing: e.target.checked })
                  }
                >
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold" fontSize="sm">
                      {t('cookies.marketing')}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {t('cookies.marketingDesc')}
                    </Text>
                  </VStack>
                </Checkbox>

                <Button
                  size="sm"
                  colorScheme="blue"
                  mt={2}
                  onClick={() => acceptCustom(customConsent)}
                >
                  {t('cookies.savePreferences')}
                </Button>
              </VStack>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </MotionBox>
  );
}
