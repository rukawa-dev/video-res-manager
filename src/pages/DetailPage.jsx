import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useProjectDetails } from '../hooks/useProjectDetails';
import GemsSection from '../components/GemsSection';
import ResultInputSection from '../components/ResultInputSection';
import ScriptInputSection from '../components/ScriptInputSection';
import NarrationSection from '../components/NarrationSection';
import RecommendationSection from '../components/RecommendationSection';
import MainImageSection from '../components/MainImageSection';
import CommonOptionsSection from '../components/CommonOptionsSection';
import SceneImageSection from '../components/SceneImageSection';
import UploadReadySection from '../components/UploadReadySection';

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

          <RecommendationSection narrationText={details.narrationWithNames} />

          <CommonOptionsSection
            value={details}
            onChange={saveDetail}
          />

          <MainImageSection
            details={details}
            onChange={saveDetail}
          />

          <SceneImageSection
            details={details}
            onChange={saveDetail}
          />

          <UploadReadySection content={details.analysisResult} />

          {/* 하단 브랜드 이미지 */}
          <div style={{ width: '100%' }}>
            <img
              src="/soft-land-art.jpg"
              alt="Soft Land Art"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                opacity: 0.8
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailPage;
