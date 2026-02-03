import { Plus } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import ProjectItem from '../components/ProjectItem';

const HomePage = () => {
  const { tasks, createNewTask } = useTasks();

  return (
    <div id="app" className="min-h-screen bg-midnight-bg text-white font-pretendard">
      <div className="max-w-[1000px] mx-auto p-8 flex flex-col gap-8">
        <header className="flex justify-between items-center py-6 border-b border-white/5">
          <h1 className="text-[2rem] font-bold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            My Works
          </h1>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-default font-bold text-white transition-all bg-gradient-to-br from-midnight-accent to-purple-600 shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] border border-white/10"
            onClick={createNewTask}
          >
            <Plus size={20} />
            새 작업 추가
          </button>
        </header>

        <main className="grid grid-cols-1 gap-4">
          {tasks.map(task => (
            <ProjectItem key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center p-20 text-center border-2 border-dashed border-midnight-border rounded-default bg-midnight-card/30">
              <p className="text-[1.2rem] text-midnight-text-secondary mb-2">생성된 작업이 없습니다.</p>
              <p className="text-[1rem] text-midnight-text-secondary/60">'새 작업 추가' 버튼을 눌러 시작하세요.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
