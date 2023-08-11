import { useEffect, useState } from 'react';
import { getProjects } from '../helpers/projectsApi';
import { ProjectsContext } from './Contexts';

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [project, setProject] = useState({
    title: '',
    description: '',
    snapshot: '',
    projectUrl: '',
    startDate: '',
    finishDate: '',
  });

  const getProjectsFromApi = async () => {
    const data = await getProjects();
    setProjects(data);
    return data;
  };

  useEffect(() => {
    getProjectsFromApi();
  }, []);

  let mappedProjects = projects.map((project) => project);

  const contextValue = {
    projects,
    project,
    mappedProjects,
    isUpdating,
    setProjects,
    setProject,
    setIsUpdating,
    getProjectsFromApi,
  };

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
