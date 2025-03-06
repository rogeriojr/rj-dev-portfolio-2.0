import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    yellow: {
      50: '#FFF9E5',
      100: '#FFE9B3',
      200: '#FFD980',
      300: '#FFC94D',
      400: '#FFB91A',
      500: '#E6A300',
      600: '#B38000',
      700: '#805C00',
      800: '#4D3700',
      900: '#1A1300'
    },
    space: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#1A202C',
      500: '#171923',
      600: '#0D1117',
      700: '#0A0C10',
      800: '#050608',
      900: '#000000'
    }
  }
};

const fonts = {
  heading: '"Space Grotesk", sans-serif',
  body: '"Inter", sans-serif'
};

const styles = {
  global: (props: { colorMode: string }) => ({
    'html, body': {
      backgroundColor: props.colorMode === 'dark' ? 'brand.space.500' : 'brand.space.50',
      color: props.colorMode === 'dark' ? 'white' : 'brand.space.500',
      minHeight: '100vh',
      overflowX: 'hidden'
    },
    '.chakra-ui-dark': {
      '--chakra-colors-chakra-body-bg': 'brand.space.500',
      '--chakra-colors-chakra-body-text': 'white'
    },
    '.chakra-ui-light': {
      '--chakra-colors-chakra-body-bg': 'brand.space.50',
      '--chakra-colors-chakra-body-text': 'brand.space.500'
    }
  })
};

const components = {
  Button: {
    variants: {
      solid: (props: { colorMode: string }) => ({
        bg: props.colorMode === 'dark' ? 'brand.yellow.400' : 'brand.space.400',
        color: props.colorMode === 'dark' ? 'brand.space.500' : 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.yellow.500' : 'brand.space.500',
          transform: 'translateY(-2px)',
          boxShadow: 'lg'
        },
        transition: 'all 0.2s'
      })
    }
  },
  Link: {
    baseStyle: (props: { colorMode: string }) => ({
      color: props.colorMode === 'dark' ? 'brand.yellow.400' : 'brand.space.400',
      _hover: {
        textDecoration: 'none',
        color: props.colorMode === 'dark' ? 'brand.yellow.500' : 'brand.space.500'
      }
    })
  }
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components
});

export default theme;