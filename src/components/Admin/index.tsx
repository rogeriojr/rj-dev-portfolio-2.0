import { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Project, Certificate } from "../../types";

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: { pt: "", en: "" },
    description: { pt: "", en: "" },
    images: [],
    content: { pt: "", en: "" },
    links: [],
  });
  const [currentCertificate, setCurrentCertificate] = useState<Certificate>({
    titulo: "",
    imagem: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchProjects();
    fetchCertificates();
  }, []);

  const fetchProjects = async () => {
    if (!db) {
      toast({
        title: "Firebase não disponível",
        description: "O banco de dados não está configurado.",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    try {
      const querySnapshot = await getDocs(collection(db, "projetos"));
      if (querySnapshot.empty) {
        console.log("No projects found in the database");
        setProjects([]);
        return;
      }

      const projectsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || { pt: "", en: "" },
          description: data.description || { pt: "", en: "" },
          category: data.category || "",
          images: data.images || [],
          content: data.content || { pt: "", en: "" },
          links: data.links || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Project;
      });

      console.log("Fetched projects:", projectsData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error fetching projects",
        status: "error",
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchCertificates = async () => {
    if (!db) {
      toast({
        title: "Firebase não disponível",
        description: "O banco de dados não está configurado.",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    try {
      const querySnapshot = await getDocs(collection(db, "certificados"));
      const certificatesData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Certificate;
        return {
          id: doc.id,
          titulo: data.titulo || "",
          imagem: data.imagem || "",
        } as Certificate;
      });
      setCertificates(certificatesData);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      toast({
        title: "Error fetching certificates",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleAddProject = async () => {
    if (!db) {
      toast({
        title: "Firebase não disponível",
        description: "O banco de dados não está configurado.",
        status: "error",
        duration: 3000,
      });
      return;
    }
    try {
      await addDoc(collection(db, "projetos"), {
        ...currentProject,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Project added successfully",
        status: "success",
        duration: 3000,
      });
      onClose();
      fetchProjects();
      setCurrentProject({
        title: { pt: "", en: "" },
        description: { pt: "", en: "" },
        category: "development",
        images: [],
        content: { pt: "", en: "" },
        links: [],
      });
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error adding project",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!db) {
      toast({
        title: "Firebase não disponível",
        description: "O banco de dados não está configurado.",
        status: "error",
        duration: 3000,
      });
      return;
    }
    const firestoreDb = db;
    try {
      await deleteDoc(doc(firestoreDb, "projetos", id));
      toast({
        title: "Project deleted successfully",
        status: "success",
        duration: 3000,
      });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error deleting project",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleAddCertificate = async () => {
    if (!db) {
      toast({
        title: "Firebase não disponível",
        description: "O banco de dados não está configurado.",
        status: "error",
        duration: 3000,
      });
      return;
    }
    try {
      await addDoc(collection(db, "certificados"), currentCertificate);
      toast({
        title: "Certificate added successfully",
        status: "success",
        duration: 3000,
      });
      fetchCertificates();
      setCurrentCertificate({
        titulo: "",
        imagem: "",
      });
    } catch (error) {
      console.error("Error adding certificate:", error);
      toast({
        title: "Error adding certificate",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!db) {
      toast({
        title: "Firebase não disponível",
        description: "O banco de dados não está configurado.",
        status: "error",
        duration: 3000,
      });
      return;
    }
    const firestoreDb = db;
    try {
      await deleteDoc(doc(firestoreDb, "certificados", id));
      toast({
        title: "Certificate deleted successfully",
        status: "success",
        duration: 3000,
      });
      fetchCertificates();
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast({
        title: "Error deleting certificate",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Tabs>
        <TabList>
          <Tab>Projects</Tab>
          <Tab>Certificates</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              mb={4}
              onClick={onOpen}
            >
              Add Project
            </Button>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {projects.map((project) => (
                  <Tr key={project.id}>
                    <Td>{project.title.pt}</Td>
                    <Td>{project.category}</Td>
                    <Td>
                      <IconButton
                        aria-label="Delete project"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>Title (PT)</FormLabel>
                      <Input
                        value={currentProject.title?.pt || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            title: {
                              pt: e.target.value,
                              en: currentProject.title?.en || ""
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Title (EN)</FormLabel>
                      <Input
                        value={currentProject.title?.en || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            title: {
                              pt: currentProject.title?.pt || "",
                              en: e.target.value
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description (PT)</FormLabel>
                      <Textarea
                        value={currentProject.description?.pt || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            description: {
                              pt: e.target.value,
                              en: currentProject.description?.en || ""
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description (EN)</FormLabel>
                      <Textarea
                        value={currentProject.description?.en || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            description: {
                              pt: currentProject.description?.pt || "",
                              en: e.target.value
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={currentProject.category || ''}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            category: (e.target.value || null) as Project["category"],
                          })
                        }
                      >
                        <option value="development">Development</option>
                        <option value="design">Design</option>
                        <option value="social-media">Social Media</option>
                        <option value="latest">Latest</option>
                        <option value="popular">Popular</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Content (PT)</FormLabel>
                      <Textarea
                        value={currentProject.content?.pt || ""}
                        rows={6}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            content: {
                              pt: e.target.value,
                              en: currentProject.content?.en || ""
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Content (EN)</FormLabel>
                      <Textarea
                        value={currentProject.content?.en || ""}
                        rows={6}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            content: {
                              pt: currentProject.content?.pt || "",
                              en: e.target.value
                            },
                          })
                        }
                      />
                    </FormControl>
                    <Button colorScheme="blue" onClick={handleAddProject}>
                      Add Project
                    </Button>
                  </Stack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </TabPanel>

          <TabPanel>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  value={currentCertificate.titulo}
                  onChange={(e) =>
                    setCurrentCertificate({
                      ...currentCertificate,
                      titulo: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={currentCertificate.imagem}
                  onChange={(e) =>
                    setCurrentCertificate({
                      ...currentCertificate,
                      imagem: e.target.value,
                    })
                  }
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleAddCertificate}>
                Add Certificate
              </Button>

              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {certificates.map((certificate: any) => (
                    <Tr key={certificate.id}>
                      <Td>{certificate.titulo}</Td>
                      <Td>
                        <IconButton
                          aria-label="Delete certificate"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          size="sm"
                          onClick={() =>
                            handleDeleteCertificate(certificate.id)
                          }
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
