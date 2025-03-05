import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
}

export default App;
