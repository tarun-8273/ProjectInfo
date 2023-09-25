import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProjectDetailsFormPage from "./pages/ProjectDetailsFormPage";
import ProjectsPage from "./pages/ProjectsPage";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route
            path="/account/project_details"
            element={<ProjectDetailsPage />}
          />
          <Route
            path="/account/project_details/new"
            element={<ProjectDetailsFormPage />}
          />
        </Route>
        <Route
          path="/account/project_details/:id"
          element={<ProjectDetailsFormPage />}
        />

        <Route path="/projectdetail/:id" element={<ProjectsPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
