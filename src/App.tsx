import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  UNSAFE_DataRouterContext,
  UNSAFE_DataRouterStateContext,
} from "react-router";
import theme from "./theme";
import {
  Home,
  About,
  Login,
  AdminRoute,
  ProjectDetails,
  PortfolioCategory,
  Layout,
  Admin,
  Contact,
} from "./components";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./i18n/LanguageContext";

// Configure future flags for React Router v7
UNSAFE_DataRouterContext.displayName = "DataRouter";
UNSAFE_DataRouterStateContext.displayName = "DataRouterState";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        {
          path: "portfolio",
          children: [
            {
              path: "development",
              element: <PortfolioCategory category="development" />,
            },
            {
              path: "design",
              element: <PortfolioCategory category="design" />,
            },
            {
              path: "social-media",
              element: <PortfolioCategory category="social-media" />,
            },
            { path: ":category/:id", element: <ProjectDetails /> },
          ],
        },
        { path: "login", element: <Login /> },
        {
          path: "admin",
          element: (
            <AdminRoute>
              <Admin />
            </AdminRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
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

