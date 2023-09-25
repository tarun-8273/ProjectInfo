import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountNavPage from "./AccountNavPage";

export default function ProjectDetailsPage() {
  const [projectDetails, setProjectDetails] = useState([]);
  useEffect(() => {
    axios.get("/user-project_details").then(({ data }) => {
      setProjectDetails(data);
    });
  }, []);
  return (
    <div>
      <AccountNavPage />

      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/project_details/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Project
        </Link>
      </div>
      <div className="mt-4">
        {projectDetails.length > 0 &&
          projectDetails.map((projectdetail) => (
            <Link
              to={"/account/project_details/" + projectdetail._id}
              className="flex flex-col cursor-pointer bg-gray-300 p-4 rounded-2xl"
            >
              <p>Title</p>
              <h2 className="text-xl">{projectdetail.title}</h2>

              <p className="mt-4">Project.Technologies</p>
              <h2 className="text-xl">{projectdetail.technologies}</h2>

              <p className="mt-4">Technical_Skillset.Frontend</p>
              <h2 className="text-xl">{projectdetail.frontend}</h2>

              <p className="mt-4">Technical_Skillset.Backend</p>
              <h2 className="text-xl">{projectdetail.backend}</h2>

              <p className="mt-4">Technical_Skillset.Databases</p>
              <h2 className="text-xl">{projectdetail.databases}</h2>

              <p className="mt-4">Technical_Skillset.Infrastructure</p>
              <h2 className="text-xl">{projectdetail.infrastructure}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}
