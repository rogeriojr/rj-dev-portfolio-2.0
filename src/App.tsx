import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import { useEffect } from "react";
import {
  Home,
  About,
  Login,
  AdminRoute,
  ProjectDetails,
  PortfolioCategory,
  Layout,
  Admin,
} from "./components";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  useEffect(() => {
    document.title = `RJ-DEV - ${
      window.location.pathname.split("/")[1] || "Home"
    }`;
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="portfolio">
                <Route
                  path="development"
                  element={<PortfolioCategory category="development" />}
                />
                <Route
                  path="design"
                  element={<PortfolioCategory category="design" />}
                />
                <Route
                  path="social-media"
                  element={<PortfolioCategory category="social-media" />}
                />
                <Route path=":category/:id" element={<ProjectDetails />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route
                path="admin"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
