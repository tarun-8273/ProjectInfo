import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [projectDetails, setProjectDetails] = useState([]);
  useEffect(() => {
    axios.get("/project_details").then((response) => {
      setProjectDetails(response.data);
    });
  }, []);
  return (
    <div>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projectDetails.length > 0 &&
          projectDetails.map((projectdetail) => (
            <Link
              to={"/projectdetail/" + projectdetail._id}
              className="flex flex-col bg-gray-200 p-4 rounded-2xl"
            >
              <h2 className="text-sm truncate text-gray-500">
                {projectdetail.title}
              </h2>
              <h3 className="font-bold">{projectdetail.technologies}</h3>
              <h3 className="font-bold">{projectdetail.frontend}</h3>
              <h3 className="font-bold">{projectdetail.backend}</h3>
              <h3 className="font-bold">{projectdetail.databases}</h3>
              <h3 className="font-bold">{projectdetail.infrastructure}</h3>
            </Link>
          ))}
      </div>
    </div>
  );
}
