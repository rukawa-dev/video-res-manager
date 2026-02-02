import { Plus } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import ProjectItem from '../components/ProjectItem';

const HomePage = () => {
  const { tasks, createNewTask } = useTasks();

  return (
    <div id="app">
      <div className="board-container">
        <header className="board-header">
          <h1>My Projects</h1>
          <button className="btn-primary" onClick={createNewTask}>
            <Plus size={18} />
            새 프로젝트 추가
          </button>
        </header>

        <main className="board-list">
          {tasks.map(task => (
            <ProjectItem key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              생성된 프로젝트가 없습니다. '새 프로젝트 추가' 버튼을 눌러 시작하세요.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
