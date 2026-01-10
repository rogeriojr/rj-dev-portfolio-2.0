import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { Project } from "../types";
import { LoadingSpinner } from "./LoadingSpinner";
import { UnderConstruction } from "./UnderConstruction";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useTranslation } from "../i18n/useTranslation";

interface PortfolioCategoryProps {
  category: string;
}

const MotionBox = motion(Box);

import { PROJECT_OVERRIDES, NEW_STATIC_PROJECTS } from "../data/projects";

export function PortfolioCategory({ category }: PortfolioCategoryProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchProjects() {
      try {
        let fetchedProjects: Project[] = [];

        try {
          const projectsRef = collection(db, "projetos");
          const querySnapshot = await getDocs(projectsRef);

          fetchedProjects = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const originalTitle = data.titulo || "";
            const normTitle = originalTitle.toLowerCase().replace(/\s+/g, '');

            let finalProject = {
              id: doc.id,
              title: {
                pt: originalTitle,
                en: originalTitle // Firestore projects default to PT for both
              },
              description: {
                pt: data.descricao,
                en: data.descricao
              },
              category: data.categoria,
              images: data.imagem ? [data.imagem] : [],
              content: {
                pt: data.content || "",
                en: data.content || ""
              },
              links: (data.links || [])
                .filter((link: any) => !link.url?.toLowerCase().includes("instagram"))
                .map((link: any) => ({
                  texto: link.texto,
                  url: link.url,
                })),
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Project;

            // Apply overrides if match found
            // We check for exact match in keys or simple inclusion logic
            let overrideData = PROJECT_OVERRIDES[normTitle];

            // Fallback for rough matching if key not identical
            if (!overrideData) {
              if (normTitle.includes("jornada") && normTitle.includes("ser")) overrideData = PROJECT_OVERRIDES["jornadaser"];
              else if (normTitle.includes("metodo") && normTitle.includes("cis")) overrideData = PROJECT_OVERRIDES["metodocis"];
            }

            if (overrideData) {
              finalProject = { ...finalProject, ...overrideData };
              // Ensure we don't lose links if override didn't specify them (which it doesn't)
              // But if we wanted to ADD links, we would need to merge. 
              // Currently overrideData doesn't have links, so finalProject.links (from DB) are preserved.
            }

            return finalProject;
          });
        } catch (e) {
          console.warn("Firestore access issue", e);
        }

        const relevantStatic = NEW_STATIC_PROJECTS.filter(p => p.category === category);

        // Filter out fetched projects if they are already in static list (e.g. NeoIdea if it was in DB?)
        // The user said "duplicates", implying NeoIdea might not be in DB, but Jornada IS.
        // We merged Jornada, so we KEEP it.
        // We just need to make sure we don't show "NeoIdea" twice if it happens to be in DB.

        const staticTitles = new Set(relevantStatic.map(p => p.title.pt.toLowerCase().replace(/\s+/g, '')));

        const filteredFetched = fetchedProjects.filter(p => {
          const normTitle = p.title.pt.toLowerCase().replace(/\s+/g, '');
          if (staticTitles.has(normTitle)) return false;
          // Check if it's the "Old" NeoIdea that we want to hide in favor of our new Static one? 
          if (normTitle.includes("inovaplastica")) return false;
          return true;
        });

        setProjects([...relevantStatic, ...filteredFetched]);

      } catch (error) {
        console.error("Error setting projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [category]);

  return (
    <MotionBox
      as="section"
      py={12}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" mb={8} color="white">
          {t('projects.title')}
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
                onViewDetails={(p) => navigate(`/portfolio/${category}/${p.id}`)}
              />
            ))}
          </Grid>
        )}
      </Container>
    </MotionBox>
  );
}
