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
import IndividualSceneRegenerationSection from '../components/IndividualSceneRegenerationSection';
import UploadReadySection from '../components/UploadReadySection';

import { Trash2 } from 'lucide-react';

const DetailPage = ({ showModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTaskTitle, deleteTask } = useTasks();
  const { task, details, saveDetail, analyzeScript } = useProjectDetails(id, showModal, updateTaskTitle);

  if (!task) {
    return null;
  }

  const handleDeleteTask = () => {
    if (window.confirm('정말 이 작업을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
      deleteTask(id);
      navigate('/');
    }
  };

  return (
    <div id="app" className="min-h-screen bg-midnight-bg text-white font-pretendard">
      <div className="max-w-[1000px] mx-auto p-8 flex flex-col gap-8">
        <header className="flex justify-between items-center gap-8 pt-4">
          <div className="min-w-[120px]">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2.5 rounded-default border border-midnight-border text-midnight-text-secondary hover:text-white hover:border-midnight-accent/40 bg-white/5 transition-all"
            >
              <ChevronLeft size={18} />
              목록으로
            </Link>
          </div>
          <h1 className="text-[2rem] font-bold text-white tracking-tight text-center flex-1 truncate">
            {task.title}
          </h1>
          <div className="min-w-[120px] flex justify-end">
            <button
              onClick={handleDeleteTask}
              className="flex items-center gap-2 px-4 py-2.5 rounded-default border border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/50 transition-all active:scale-[0.98]"
            >
              <Trash2 size={18} />
              이 작업 삭제
            </button>
          </div>
        </header>

        <main className="flex flex-col gap-8">
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

          <IndividualSceneRegenerationSection
            details={details}
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
          <div className="w-full mt-4 rounded-default overflow-hidden border border-midnight-border/30">
            <img
              src={`${import.meta.env.BASE_URL}soft-land-art.jpg`}
              alt="Soft Land Art"
              className="w-full h-auto block opacity-80"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailPage;
