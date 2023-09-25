import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProjectsPage() {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/project_details/${id}`).then((response) => {
      setProjectDetails(response.data);
    });
  }, [id]);

  if (!projectDetails) return "";

  return (
    <div>
      <div className="mt-4 bg-gray-300 -mx-8 px-8 pt-8 mx-10 my-10">
        <p>Title</p>
        <h2 className="text-xl">{projectDetails.title}</h2>

        <p className="mt-4">Project.Technologies</p>
        <h2 className="text-xl">{projectDetails.technologies}</h2>

        <p className="mt-4">Technical_Skillset.Frontend</p>
        <h2 className="text-xl">{projectDetails.frontend}</h2>

        <p className="mt-4">Technical_Skillset.Backend</p>
        <h2 className="text-xl">{projectDetails.backend}</h2>

        <p className="mt-4">Technical_Skillset.Databases</p>
        <h2 className="text-xl">{projectDetails.databases}</h2>

        <p className="mt-4">Technical_Skillset.Infrastructure</p>
        <h2 className="text-xl">{projectDetails.infrastructure}</h2>

        <button className="primary mt-4 mb-4">
          Buy Project
        </button>
      </div>
    </div>
  );
}
