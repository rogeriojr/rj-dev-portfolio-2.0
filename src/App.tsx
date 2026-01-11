import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  UNSAFE_DataRouterContext,
  UNSAFE_DataRouterStateContext,
} from "react-router";
import { Suspense, lazy } from "react";
import theme from "./theme";
import { AdminRoute, Layout, LoadingSpinner } from "./components";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./i18n/LanguageContext";

const Home = lazy(() => import("./components/Home").then(module => ({ default: module.Home })));
const About = lazy(() => import("./components/About").then(module => ({ default: module.About })));
const Contact = lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));
const Certificates = lazy(() => import("./components/Certificates").then(module => ({ default: module.Certificates })));
const CosmicLab = lazy(() => import("./pages/CosmicLab"));
const PortfolioCategory = lazy(() => import("./components/PortfolioCategory").then(module => ({ default: module.PortfolioCategory })));
const ProjectDetails = lazy(() => import("./components/ProjectDetails").then(module => ({ default: module.ProjectDetails })));
const Login = lazy(() => import("./components/Login").then(module => ({ default: module.Login })));
const Admin = lazy(() => import("./components/Admin"));

const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

UNSAFE_DataRouterContext.displayName = "DataRouter";
UNSAFE_DataRouterStateContext.displayName = "DataRouterState";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <LazyRoute>
              <Home />
            </LazyRoute>
          ),
        },
        {
          path: "about",
          element: (
            <LazyRoute>
              <About />
            </LazyRoute>
          ),
        },
        {
          path: "contact",
          element: (
            <LazyRoute>
              <Contact />
            </LazyRoute>
          ),
        },
        {
          path: "certificates",
          element: (
            <LazyRoute>
              <Certificates />
            </LazyRoute>
          ),
        },
        {
          path: "lab",
          element: (
            <LazyRoute>
              <CosmicLab />
            </LazyRoute>
          ),
        },
        {
          path: "portfolio",
          children: [
            {
              path: "development",
              element: (
                <LazyRoute>
                  <PortfolioCategory category="development" />
                </LazyRoute>
              ),
            },
            {
              path: "design",
              element: (
                <LazyRoute>
                  <PortfolioCategory category="design" />
                </LazyRoute>
              ),
            },
            {
              path: "social-media",
              element: (
                <LazyRoute>
                  <PortfolioCategory category="social-media" />
                </LazyRoute>
              ),
            },
            {
              path: ":category/:id",
              element: (
                <LazyRoute>
                  <ProjectDetails />
                </LazyRoute>
              ),
            },
          ],
        },
        {
          path: "login",
          element: (
            <LazyRoute>
              <Login />
            </LazyRoute>
          ),
        },
        {
          path: "admin",
          element: (
            <AdminRoute>
              <LazyRoute>
                <Admin />
              </LazyRoute>
            </AdminRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    } as any,
  }
);

export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;

