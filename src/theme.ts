import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "white",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          transform: "scale(1.05)",
          transition: "all 0.2s ease-in-out",
        },
      },
      variants: {
        solid: {
          bg: "orange.400",
          color: "white",
          _hover: {
            bg: "orange.500",
          },
        },
        outline: {
          borderColor: "orange.400",
          color: "orange.400",
          _hover: {
            bg: "orange.400",
            color: "white",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
          color: "orange.400",
          transform: "scale(1.05)",
          transition: "all 0.2s ease-in-out",
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "white",
        marginBottom: "4",
      },
    },
    Text: {
      baseStyle: {
        color: "gray.300",
      },
    },
  },
  colors: {
    brand: {
      primary: "#F6AD55",
      secondary: "#4A5568",
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
});

export default theme;