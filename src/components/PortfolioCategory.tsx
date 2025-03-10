import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Project } from "../types";
import { LoadingSpinner } from "./LoadingSpinner";
import { UnderConstruction } from "./UnderConstruction";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

interface PortfolioCategoryProps {
  category: string;
}

const MotionBox = motion(Box);

export function PortfolioCategory({ category }: PortfolioCategoryProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectsRef = collection(db, "projetos");
        const querySnapshot = await getDocs(projectsRef);

        const fetchedProjects = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.titulo,
            description: data.descricao,
            category: data.categoria,
            images: data.imagem ? [data.imagem] : [],
            content: data.content || "",
            links: (data.links || []).map((link: any) => ({
              texto: link.texto,
              url: link.url,
            })),
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as Project;
        });

        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [category]);

  const categoryTitles = {
    development: "Desenvolvimento",
    design: "Design",
    "social-media": "Social Media",
  };

  return (
    <MotionBox
      as="section"
      py={12}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" mb={8}>
          Portfólio - {categoryTitles[category as keyof typeof categoryTitles]}
        </Heading>
        {loading ? (
          <LoadingSpinner />
        ) : projects.length === 0 ? (
          <UnderConstruction />
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
            mt={8}
          >
            {projects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </Grid>
        )}
      </Container>
    </MotionBox>
  );
}
