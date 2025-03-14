import './Projects.css'
import { projectsData } from './../../../../Data/Data'

const  Projects = () => {
  return (
    <div>
      <ul className="project-list">
        {projectsData.map((project, index) => (
          <li className="grid-one-item grid-common grid-c1" key={index}>
            <span className="grid-c-title">
              <h3 className="grid-c-title-text">Module: {project.module}</h3>
            </span>
            <p className="text text-sm text-white">Current lesson: {project.module}</p>
            <span className="grid-c1-content">
              <p>{project.level}</p>
              <span className="lg-value">{project.title}</span>
              <span className="card-wrapper">
                <span className="card-pin-hidden">{project.description}</span>
              </span>
              <span className="card-logo-wrapper">
                <span>
                  <p className="text text-silver-v1 expiry-text">----</p>
                  <p className="text text-sm text-white">Includes {project.modulesCount} modules</p>
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Projects