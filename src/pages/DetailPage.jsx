import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useProjectDetails } from '../hooks/useProjectDetails';
import GemsSection from '../components/GemsSection';
import ResultInputSection from '../components/ResultInputSection';
import ScriptInputSection from '../components/ScriptInputSection';
import NarrationSection from '../components/NarrationSection';

const DetailPage = ({ showModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTaskTitle } = useTasks();
  const { task, details, saveDetail, analyzeScript } = useProjectDetails(id, showModal, updateTaskTitle);

  if (!task) {
    return null;
  }

  return (
    <div id="app">
      <div className="board-container">
        <header className="board-header">
          <div style={{ minWidth: '120px', display: 'flex' }}>
            <Link to="/" className="btn-outline" style={{ padding: '0.6rem 1rem' }}>
              <ChevronLeft size={18} />
              목록으로
            </Link>
          </div>
          <h1 id="current-post-title">{task.title}</h1>
          <div style={{ minWidth: '120px' }}></div>
        </header>

        <main>
          <GemsSection />

          <ResultInputSection
            value={details.gemResultUrl}
            onChange={saveDetail}
          />

          <ScriptInputSection
            value={details.scriptContent}
            onChange={saveDetail}
            onAnalyze={analyzeScript}
          />

          <NarrationSection
            withNames={details.narrationWithNames}
            noNames={details.narrationNoNames}
            onChange={saveDetail}
            showModal={showModal}
          />
        </main>
      </div>
    </div>
  );
};

export default DetailPage;
