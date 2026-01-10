import { useState } from 'react';
import {
  Box, VStack, HStack, Text, Icon,
  Progress, Badge, IconButton, Image,
  useToast
} from '@chakra-ui/react';
import { FaCloudUploadAlt, FaFileAlt, FaTrash, FaCheckCircle, FaFilePdf } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface FileEntry {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

export const FilePipelineSimulator = () => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const toast = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const simulateUpload = (name: string, type: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newFile: FileEntry = {
      id,
      name,
      type,
      size: (Math.random() * 5).toFixed(1) + ' MB',
      progress: 0,
      status: 'uploading',
      preview: type.startsWith('image/') ? 'https://images.unsplash.com/photo-1557683316-973673baf926?w=200&q=80' : undefined
    };

    setFiles(prev => [newFile, ...prev]);

    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 30;
      if (prog >= 100) {
        prog = 100;
        setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: 100, status: 'completed' } : f));
        clearInterval(interval);
        toast({ title: "Upload Complete", status: "success", duration: 2000, size: "sm" });
      } else {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: prog } : f));
      }
    }, 400);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload('enterprise_doc_01.pdf', 'application/pdf');
  };

  const addMockItem = (type: 'img' | 'pdf') => {
    if (type === 'img') simulateUpload('design_prototype.png', 'image/png');
    else simulateUpload('architecture_report.pdf', 'application/pdf');
  };

  return (
    <Box
      p={6}
      bg="rgba(10, 15, 30, 0.4)"
      borderRadius="xl"
      border="1px dashed"
      borderColor={isDragging ? "cyan.400" : "whiteAlpha.200"}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={onDrop}
      maxW="600px"
      mx="auto"
      transition="all 0.2s"
    >
      <VStack spacing={4} align="stretch">
        <Box
          py={8}
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "whiteAlpha.50" }}
          onClick={() => addMockItem('pdf')}
        >
          <Icon as={FaCloudUploadAlt} boxSize={8} color={isDragging ? "cyan.400" : "whiteAlpha.300"} mb={2} />
          <Text fontSize="sm" color="whiteAlpha.700">Drag & Drop or Click to simulate upload</Text>
          <HStack justify="center" spacing={2} mt={2}>
            <Badge size="xs" colorScheme="blue" variant="outline" onClick={(e) => { e.stopPropagation(); addMockItem('img') }}>IMG</Badge>
            <Badge size="xs" colorScheme="red" variant="outline" onClick={(e) => { e.stopPropagation(); addMockItem('pdf') }}>PDF</Badge>
          </HStack>
        </Box>

        <VStack align="stretch" spacing={3}>
          <AnimatePresence>
            {files.map((file) => (
              <Box
                key={file.id}
                as={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                p={3}
                bg="blackAlpha.300"
                borderRadius="lg"
                border="1px solid"
                borderColor="whiteAlpha.100"
              >
                <HStack spacing={4}>
                  <Box
                    w="40px" h="40px"
                    bg="blackAlpha.400"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    {file.preview ? (
                      <Image src={file.preview} alt="preview" objectFit="cover" />
                    ) : (
                      <Icon as={file.type.includes('pdf') ? FaFilePdf : FaFileAlt} color="cyan.400" />
                    )}
                  </Box>
                  <VStack align="start" flex={1} spacing={0}>
                    <HStack w="100%" justify="space-between">
                      <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.800" isTruncated maxW="200px">
                        {file.name}
                      </Text>
                      <Text fontSize="2xs" color="whiteAlpha.400">{file.size}</Text>
                    </HStack>
                    <Progress
                      value={file.progress}
                      size="xs"
                      w="100%"
                      borderRadius="full"
                      colorScheme={file.status === 'completed' ? 'green' : 'cyan'}
                      bg="whiteAlpha.100"
                      mt={2}
                    />
                  </VStack>
                  <HStack spacing={1}>
                    {file.status === 'completed' ? (
                      <Icon as={FaCheckCircle} color="green.400" boxSize={3} />
                    ) : (
                      <IconButton
                        aria-label="Delete"
                        icon={<FaTrash />}
                        size="xs"
                        variant="ghost"
                        color="whiteAlpha.300"
                        onClick={() => setFiles(prev => prev.filter(f => f.id !== file.id))}
                      />
                    )}
                  </HStack>
                </HStack>
              </Box>
            ))}
          </AnimatePresence>
        </VStack>

        <Text fontSize="9px" color="whiteAlpha.400" textAlign="center" pt={2}>
          S3_STORAGE_BUCKET: asset-pipeline-v4 | REGION: sa-east-1
        </Text>
      </VStack>
    </Box>
  );
};
