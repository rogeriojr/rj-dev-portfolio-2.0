import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Box, useColorModeValue } from '@chakra-ui/react';

interface MermaidDiagramProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif',
});

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isDark = useColorModeValue(false, true);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        theme: isDark ? 'dark' : 'default',
        themeVariables: {
          primaryColor: '#00B5D8',
          lineColor: '#4A5568',
        }
      });

      // Clear existing content and re-render
      ref.current.removeAttribute('data-processed');
      mermaid.contentLoaded();
    }
  }, [chart, isDark]);

  return (
    <Box
      className="mermaid"
      ref={ref}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        background: 'transparent',
        '& svg': {
          maxWidth: '100%',
          height: 'auto',
        }
      }}
    >
      {chart}
    </Box>
  );
};
