import { Link } from 'react-router-dom';

const ProjectItem = ({ task }) => {
  return (
    <Link to={`/detail/${task.id}`} className="board-item">
      <div className="item-info">
        <div className="item-title">{task.title}</div>
        <div className="item-meta">
          <span>Created: {task.date}</span>
          <span>Status: {task.status}</span>
        </div>
      </div>
      <div className="item-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </div>
    </Link>
  );
};

export default ProjectItem;
