import { useState, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Progress,
  Image,
  Badge,
  IconButton,
  Code,
} from '@chakra-ui/react';
import { FaUpload, FaFile, FaImage, FaFilePdf, FaTrash, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  preview?: string;
  uploaded: boolean;
}

const MotionBox = motion(Box);

export function FileUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const dragBorderColor = useColorModeValue('blue.400', 'blue.500');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return FaImage;
    if (file.type === 'application/pdf') return FaFilePdf;
    return FaFile;
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    Array.from(fileList).forEach((file) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        file,
        progress: 0,
        uploaded: false,
      };

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFiles((prev) =>
            prev.map((f) => (f.id === newFile.id ? { ...f, preview: e.target?.result as string } : f))
          );
        };
        reader.readAsDataURL(file);
      }

      setFiles((prev) => [...prev, newFile]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id
              ? { ...f, progress, uploaded: progress >= 100 }
              : f
          )
        );

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Box w="full" maxW="800px" mx="auto">
      <VStack spacing={6} align="stretch">
        <Box
          p={8}
          bg={bg}
          borderRadius="xl"
          border="2px dashed"
          borderColor={isDragging ? dragBorderColor : borderColor}
          textAlign="center"
          cursor="pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          transition="all 0.2s"
          _hover={{ borderColor: dragBorderColor, bg: cardBg }}
        >
          <VStack spacing={4}>
            <Icon as={FaUpload} w={12} h={12} color="blue.500" />
            <VStack spacing={1}>
              <Text fontSize="lg" fontWeight="bold">
                Arraste arquivos aqui ou clique para selecionar
              </Text>
              <Text fontSize="sm" color="gray.500">
                Suporta imagens, PDFs e outros arquivos
              </Text>
            </VStack>
            <Button colorScheme="blue" size="md">
              Selecionar Arquivos
            </Button>
          </VStack>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </Box>

        {files.length > 0 && (
          <VStack spacing={3} align="stretch">
            <Text fontSize="md" fontWeight="bold">
              Arquivos ({files.length})
            </Text>
            <AnimatePresence>
              {files.map((file) => {
                const FileIcon = getFileIcon(file.file);
                return (
                  <MotionBox
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    p={4}
                    bg={cardBg}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between" spacing={3}>
                        <HStack spacing={3} flex={1} minW={0}>
                          {file.preview ? (
                            <Image
                              src={file.preview}
                              alt={file.file.name}
                              w="60px"
                              h="60px"
                              objectFit="cover"
                              borderRadius="md"
                            />
                          ) : (
                            <Icon as={FileIcon} w={8} h={8} color="blue.500" />
                          )}
                          <VStack align="start" spacing={0} flex={1} minW={0}>
                            <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                              {file.file.name}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {formatFileSize(file.file.size)} • {file.file.type || 'Tipo desconhecido'}
                            </Text>
                          </VStack>
                        </HStack>
                        <HStack spacing={2}>
                          {file.uploaded ? (
                            <Badge colorScheme="green">
                              <HStack spacing={1}>
                                <Icon as={FaCheck} />
                                <Text>Concluído</Text>
                              </HStack>
                            </Badge>
                          ) : (
                            <Badge colorScheme="blue">Enviando...</Badge>
                          )}
                          <IconButton
                            aria-label="Remover"
                            icon={<FaTrash />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => removeFile(file.id)}
                          />
                        </HStack>
                      </HStack>
                      {!file.uploaded && (
                        <Progress
                          value={file.progress}
                          colorScheme="blue"
                          size="sm"
                          borderRadius="full"
                        />
                      )}
                    </VStack>
                  </MotionBox>
                );
              })}
            </AnimatePresence>
          </VStack>
        )}

        <Box p={4} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
          <HStack spacing={2}>
            <Icon as={FaUpload} color="blue.500" />
            <Text fontSize="xs" color="blue.700">
              <Code fontSize="xs">File API</Code> + <Code fontSize="xs">Drag & Drop</Code> para upload de
              arquivos com preview, progresso e validação
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
