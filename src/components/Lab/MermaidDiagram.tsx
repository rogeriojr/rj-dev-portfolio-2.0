import React, { useEffect, useRef, useState } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { PlanetSpinner } from '../PlanetSpinner';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isDark = useColorModeValue(false, true);
  const [mermaidLoaded, setMermaidLoaded] = useState(false);
  const [mermaid, setMermaid] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadMermaid = async () => {
      try {
        const mermaidModule = await import('mermaid');
        const mermaidLib = mermaidModule.default;
        
        if (isMounted) {
          mermaidLib.initialize({
            startOnLoad: true,
            theme: isDark ? 'dark' : 'default',
            securityLevel: 'loose',
            fontFamily: 'Inter, system-ui, sans-serif',
            themeVariables: {
              primaryColor: '#00B5D8',
              lineColor: '#4A5568',
            }
          });
          setMermaid(mermaidLib);
          setMermaidLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load mermaid:', error);
      }
    };

    loadMermaid();

    return () => {
      isMounted = false;
    };
  }, [isDark]);

  useEffect(() => {
    if (mermaidLoaded && mermaid && ref.current) {
      ref.current.removeAttribute('data-processed');
      mermaid.contentLoaded();
    }
  }, [chart, mermaidLoaded, mermaid]);

  if (!mermaidLoaded) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
        <PlanetSpinner size={100} />
      </Box>
    );
  }

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
