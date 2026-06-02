import "./Projects.css";

function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "Personal portfolio built using React.",
    },
    {
      title: "Spring Boot REST API",
      description: "Backend API using Java and Spring Boot.",
    },
    {
      title: "Employee Management System",
      description: "Full stack CRUD application.",
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <h2>My Projects</h2>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>

            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;