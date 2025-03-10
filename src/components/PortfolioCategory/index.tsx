import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  Heading,
  Container,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../ProjectCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const MotionSimpleGrid = motion(SimpleGrid);

interface Project {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  categoria: string;
  links: Array<{
    texto: string;
    url: string;
  }>;
}

interface PortfolioCategoryProps {
  category: string;
}

export default function PortfolioCategory({
  category,
}: PortfolioCategoryProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, "projetos");
        const q = query(projectsRef, where("categoria", "==", category));
        const querySnapshot = await getDocs(q);

        const fetchedProjects: Project[] = [];
        const tagSet = new Set<string>();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const project = {
            id: doc.id,
            titulo: data.titulo || "",
            descricao: data.descricao || "",
            imagem: data.imagem || "",
            categoria: data.categoria || "",
            links: data.links || [],
          } as Project;
          fetchedProjects.push(project);
        });

        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects);
        setTags(Array.from(tagSet));
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [category]);

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.descricao.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "all";
      return matchesSearch && matchesTag;
    });
    setFilteredProjects(filtered);
  }, [searchQuery, selectedTag, projects]);

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Container maxW="container.xl" minH="100vh" w="100%" overflowY="auto">
      <Heading as="h1" size="2xl" mb={8} textAlign="center">
        {categoryTitle} Portfolio
      </Heading>

      <HStack spacing={4} mb={8}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="filled"
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
            _focus={{ bg: "gray.700" }}
          />
        </InputGroup>

        <Select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          variant="filled"
          bg="gray.800"
          _hover={{ bg: "gray.700" }}
          w="200px"
        >
          <option value="all">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </Select>
      </HStack>

      <AnimatePresence>
        <MotionSimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProjectCard
                  key={index}
                  title=""
                  description=""
                  imageUrl=""
                  isLoading={true}
                />
              ))
            : filteredProjects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  title={project.titulo}
                  description={project.descricao}
                  imageUrl={project.imagem}
                  links={project.links}
                />
              ))}
        </MotionSimpleGrid>
      </AnimatePresence>
    </Container>
  );
}
