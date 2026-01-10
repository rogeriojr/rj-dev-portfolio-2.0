import { useState, useEffect } from 'react';
import { Box, Image, Skeleton } from '@chakra-ui/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  fallbackSrc?: string;
}

export function LazyImage({
  src,
  alt,
  width = '100%',
  height = 'auto',
  borderRadius,
  objectFit = 'cover',
  fallbackSrc,
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [imageRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.01,
    freezeOnceVisible: true,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isIntersecting && !imageSrc) {
      setImageSrc(src);
    }
  }, [isIntersecting, src, imageSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <Box ref={imageRef} width={width} height={height} position="relative">
      {!isLoaded && !hasError && (
        <Skeleton
          width={width}
          height={height}
          borderRadius={borderRadius}
          position="absolute"
          top={0}
          left={0}
        />
      )}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          borderRadius={borderRadius}
          objectFit={objectFit}
          onLoad={handleLoad}
          onError={handleError}
          opacity={isLoaded ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
        />
      )}
    </Box>
  );
}
