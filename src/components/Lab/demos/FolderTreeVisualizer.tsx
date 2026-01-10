import { useState } from 'react';
import {
  Box, VStack, HStack, Text, Icon,
  Collapse, Badge, Tooltip
} from '@chakra-ui/react';
import {
  FaFolder, FaFolderOpen, FaFileCode,
  FaChevronRight, FaChevronDown, FaCodeBranch, FaSitemap
} from 'react-icons/fa';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  description?: string;
}

const structure: FileNode = {
  name: 'enterprise-app',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'domain',
          type: 'folder',
          description: 'Business logic & entities (Core)',
          children: [
            { name: 'entities', type: 'folder', children: [{ name: 'User.ts', type: 'file' }] },
            { name: 'use-cases', type: 'folder', children: [{ name: 'RegisterUser.ts', type: 'file' }] },
          ]
        },
        {
          name: 'infrastructure',
          type: 'folder',
          description: 'External tools & implementations',
          children: [
            { name: 'database', type: 'folder', children: [{ name: 'PrismaClient.ts', type: 'file' }] },
            { name: 'http', type: 'folder', children: [{ name: 'AxiosClient.ts', type: 'file' }] },
          ]
        },
        {
          name: 'presentation',
          type: 'folder',
          description: 'UI & Controllers',
          children: [
            { name: 'components', type: 'folder' },
            { name: 'pages', type: 'folder' },
            { name: 'controllers', type: 'folder' },
          ]
        },
        { name: 'index.ts', type: 'file' },
      ]
    },
    { name: 'tests', type: 'folder' },
    { name: 'docker-compose.yml', type: 'file' },
    { name: 'package.json', type: 'file' },
  ]
};

const TreeNode = ({ node, depth = 0 }: { node: FileNode, depth?: number }) => {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <Box>
      <Tooltip label={node.description} placement="right" isDisabled={!node.description} openDelay={300}>
        <HStack
          spacing={2}
          p={1}
          pl={depth * 4 + 2}
          cursor="pointer"
          _hover={{ bg: "whiteAlpha.100" }}
          borderRadius="sm"
          onClick={() => hasChildren && setIsOpen(!isOpen)}
          transition="all 0.2s"
        >
          {hasChildren ? (
            <Icon as={isOpen ? FaChevronDown : FaChevronRight} boxSize={2} color="whiteAlpha.400" />
          ) : (
            <Box w={2} />
          )}
          <Icon
            as={node.type === 'folder' ? (isOpen ? FaFolderOpen : FaFolder) : FaFileCode}
            color={node.type === 'folder' ? "cyan.400" : "whiteAlpha.600"}
            boxSize={3}
          />
          <Text fontSize="xs" color={node.type === 'folder' ? "white" : "whiteAlpha.800"} fontFamily="mono">
            {node.name}
          </Text>
          {node.description && <Badge fontSize="8px" colorScheme="purple" variant="subtle">INFO</Badge>}
        </HStack>
      </Tooltip>
      {hasChildren && (
        <Collapse in={isOpen}>
          <Box borderLeft="1px solid" borderColor="whiteAlpha.100" ml={depth * 4 + 3}>
            {node.children!.map((child, i) => (
              <TreeNode key={i} node={child} depth={depth + 1} />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export const FolderTreeVisualizer = () => {
  return (
    <Box
      p={4}
      bg="rgba(0,5,15,0.8)"
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      maxW="400px"
      mx="auto"
      boxShadow="dark-lg"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between" borderBottom="1px solid" borderColor="whiteAlpha.100" pb={2}>
          <HStack>
            <Icon as={FaSitemap} color="purple.400" />
            <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700" letterSpacing="widest">ARCH_FOLDERS_V1</Text>
          </HStack>
          <Badge size="xs" colorScheme="cyan" fontSize="9px">CLEAN ARCH</Badge>
        </HStack>
        <Box h="300px" overflowY="auto" className="custom-scroll">
          <TreeNode node={structure} />
        </Box>
        <HStack pt={2} borderTop="1px solid" borderColor="whiteAlpha.100" justify="start">
          <Icon as={FaCodeBranch} color="green.400" boxSize={2} />
          <Text fontSize="9px" color="whiteAlpha.400">master | 14 repos matched</Text>
        </HStack>
      </VStack>
    </Box>
  );
};
