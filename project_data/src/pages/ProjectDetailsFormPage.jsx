import { useState } from "react";
import axios from "axios";
import AccountNavPage from "./AccountNavPage";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
export default function ProjectDetailsFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [technologies, setTechnology] = useState("");
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [databases, setDatabase] = useState("");
  const [infrastructure, setInfrastructure] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/project_details/" + id).then((respone) => {
      const { data } = respone;
      setTitle(data.title);
      setTechnology(data.technologies);
      setFrontend(data.frontend);
      setBackend(data.backend);
      setDatabase(data.databases);
      setInfrastructure(data.infrastructure);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveProject(ev) {
    ev.preventDefault();
    const projectData = {
      title,
      technologies,
      frontend,
      backend,
      databases,
      infrastructure,
    };
    if (id) {
      // update
      await axios.put("/project_details", {
        id,
        ...projectData,
      });
      setRedirect(true);
    } else {
      //new project
      await axios.post("/project_details", projectData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/project_details"} />;
  }

  return (
    <div>
      <AccountNavPage />
      <form onSubmit={saveProject} className="p-6">
        {preInput(
          "Project Title",
          "Title for your project. should be short and catchy as in project"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: Project1"
        />

        {preInput("Project Technologies", "Technologies for this project")}
        <input
          type="text"
          value={technologies}
          onChange={(ev) => setTechnology(ev.target.value)}
          placeholder="technologies"
        />

        {preInput(
          "Technical_Skillset Frontend",
          "Frontend Skills for this project"
        )}
        <input
          type="text"
          value={frontend}
          onChange={(ev) => setFrontend(ev.target.value)}
          placeholder="frontend"
        />

        {preInput(
          "Technical_Skillset Backend",
          "Backend Skills for this project"
        )}
        <input
          type="text"
          value={backend}
          onChange={(ev) => setBackend(ev.target.value)}
          placeholder="backend"
        />

        {preInput(
          "Technical_Skillset Databases",
          "Database Skills for this project"
        )}
        <input
          type="text"
          value={databases}
          onChange={(ev) => setDatabase(ev.target.value)}
          placeholder="databases"
        />

        {preInput(
          "Technical_Skillset Infrastructure",
          "Infrastructure Skills for this project"
        )}
        <input
          type="text"
          value={infrastructure}
          onChange={(ev) => setInfrastructure(ev.target.value)}
          placeholder="Infrastructure"
        />
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
