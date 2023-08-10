const { Project, Stack } = require('../database/models');

const getAllProjects = async () => {
  const projects = await Project.findAll({
    include: [{
      model: Stack,
      through: { attributes: [] },
    }],
  });

  if (!projects) {
    return null;
  }

  return projects.map(project => project);
};

const getProjectById = async (id) => {
  const project = await Project.findByPk(
    Number(id),
    {
      include: [
        {
          model: Stack,
          through: { attributes: [] },
        }
      ],
    },
  );

  if (!project) return null;

  return project.dataValues;
};

const createProject = async (project) => {
  const newProject = await Project.create(project);

  if (!newProject) return null;

  return newProject.dataValues;
};

const updateProject = async (id, project) => {
  const projectToUpdate = await getProjectById(id);
  if (!projectToUpdate) return null;

  const updatedProject = await Project.update(project, { where: { id } });

  if (!updatedProject) return null;

  return updatedProject;
};

const deleteProject = async (id) => {
  const projectToDelete = await getProjectById(id);
  if (!projectToDelete) return null;

  const deletedProject = await Project.destroy({ where: { id } });

  if (!deletedProject) return null;

  return deletedProject;
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};