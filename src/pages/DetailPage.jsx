import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useProjectDetails } from '../hooks/useProjectDetails';
import GemsSection from '../components/GemsSection';
import ResultInputSection from '../components/ResultInputSection';
import ScriptInputSection from '../components/ScriptInputSection';
import NarrationSection from '../components/NarrationSection';
import ThumbnailPromptSection from '../components/ThumbnailPromptSection';
import MainImageSection from '../components/MainImageSection';
import OtherImageSection from '../components/OtherImageSection';
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

          <ThumbnailPromptSection
            value={details.thumbnailPrompt}
            urlValue={details.thumbnailGemUrl}
            onChange={saveDetail}
            narrationText={details.narrationWithNames}
          />

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

          <OtherImageSection
            details={details}
            onChange={saveDetail}
          />

          <section className="gems-section" style={{
            padding: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.1) inset'
          }}>
            <p style={{
              margin: 0,
              fontSize: '1.4rem',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              <span style={{ fontSize: '1.8rem' }}>🎬</span>
              Video Maker 를 열어 비디오를 생성하고, 업로드 준비로 돌아오세요!
              <span style={{ fontSize: '1.8rem' }}>✨</span>
            </p>
          </section>

          <UploadReadySection
            content={details.analysisResult}
            additionalDescription={details.additionalDescription}
            onAdditionalDescriptionChange={saveDetail}
          />

          {/* 하단 브랜드 이미지 */}
          <div style={{ width: '100%' }}>
            <img
              src={`${import.meta.env.BASE_URL}soft-land-art.jpg`}
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
