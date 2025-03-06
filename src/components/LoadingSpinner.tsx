import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { FaRocket } from "react-icons/fa";

export function LoadingSpinner() {
  const { colorMode } = useColorMode();

  const rocketPulse = keyframes`
    0% { transform: scale(1) translateY(0); opacity: 0.7; }
    50% { transform: scale(1.2) translateY(-5px); opacity: 1; }
    100% { transform: scale(1) translateY(0); opacity: 0.7; }
  `;

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      alignItems="center"
      justifyContent="center"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex={9999}
    >
      <Box
        color={colorMode === "dark" ? "yellow.400" : "orange.500"}
        fontSize="40px"
        css={css`
          animation: ${rocketPulse} 2s ease-in-out infinite;
        `}
      >
        <FaRocket />
      </Box>
    </Flex>
  );
}