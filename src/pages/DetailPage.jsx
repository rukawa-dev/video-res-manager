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

          <section className="gems-section p-8 text-center border-midnight-accent/30 bg-gradient-to-br from-midnight-accent/[0.15] to-pink-500/[0.15] border shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]">
            <p className="m-0 text-[1.4rem] font-extrabold text-white tracking-tight flex items-center justify-center gap-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              <span className="text-[1.8rem]">🎬</span>
              Video Maker 를 열어 비디오를 생성하고, 업로드 준비로 돌아오세요!
              <span className="text-[1.8rem]">✨</span>
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
