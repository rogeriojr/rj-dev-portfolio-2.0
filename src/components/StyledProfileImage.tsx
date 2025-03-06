import { Box, Image } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { useColorMode } from "@chakra-ui/react";

export function StyledProfileImage() {
  const { colorMode } = useColorMode();

  const glowKeyframes = keyframes`
    0% { box-shadow: 0 0 10px ${colorMode === "dark" ? "#FFD700" : "#DAA520"},
                    0 0 20px ${colorMode === "dark" ? "#FFD700" : "#DAA520"},
                    0 0 30px ${colorMode === "dark" ? "#FFD700" : "#DAA520"}; }
    50% { box-shadow: 0 0 20px ${colorMode === "dark" ? "#FFD700" : "#DAA520"},
                     0 0 30px ${colorMode === "dark" ? "#FFD700" : "#DAA520"},
                     0 0 40px ${colorMode === "dark" ? "#FFD700" : "#DAA520"}; }
    100% { box-shadow: 0 0 10px ${colorMode === "dark" ? "#FFD700" : "#DAA520"},
                      0 0 20px ${colorMode === "dark" ? "#FFD700" : "#DAA520"},
                      0 0 30px ${colorMode === "dark" ? "#FFD700" : "#DAA520"}; }
  `;

  return (
    <Box
      position="relative"
      width="300px"
      height="300px"
      borderRadius="full"
      overflow="hidden"
      css={css`
        &::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: ${colorMode === "dark" ? "#FFD700" : "#DAA520"};
          border-radius: inherit;
          animation: ${glowKeyframes} 3s ease-in-out infinite;
        }
      `}
    >
      <Image
        src="/profile.jpg"
        alt="Profile"
        width="100%"
        height="100%"
        objectFit="cover"
        borderRadius="full"
      />
    </Box>
  );
}