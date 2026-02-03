import { Link } from 'react-router-dom';

const ProjectItem = ({ task }) => {
  return (
    <Link
      to={`/detail/${task.id}`}
      className="group flex items-center justify-between p-6 bg-midnight-card/60 border border-midnight-border rounded-default transition-all hover:bg-midnight-card hover:border-midnight-accent/30 hover:shadow-[0_4px_20px_rgba(168,85,247,0.1)] active:scale-[0.99]"
    >
      <div className="flex flex-col gap-1">
        <div className="text-[1.2rem] font-bold text-white group-hover:text-midnight-accent transition-colors">
          {task.title}
        </div>
        <div className="flex gap-4 text-sm text-midnight-text-secondary">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-midnight-teal"></span>
            Created: {task.date}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Status: {task.status}
          </span>
        </div>
      </div>
      <div className="text-midnight-text-secondary group-hover:text-white group-hover:translate-x-1 transition-all">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </div>
    </Link>
  );
};

export default ProjectItem;
