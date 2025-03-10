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
    title: "",
    description: "",
    images: [],
    content: "",
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
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          images: data.images || [],
          content: data.content || "",
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
        title: "",
        description: "",
        category: "development",
        images: [],
        content: "",
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
    try {
      await deleteDoc(doc(db, "projetos", id));
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
    try {
      await deleteDoc(doc(db, "certificados", id));
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
                    <Td>{project.title}</Td>
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
                      <FormLabel>Title</FormLabel>
                      <Input
                        value={currentProject.title}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            title: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        value={currentProject.description}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            description: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={currentProject.category}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            category: e.target.value as Project["category"],
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
                      <FormLabel>Content</FormLabel>
                      <Textarea
                        value={currentProject.content}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            content: e.target.value,
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
