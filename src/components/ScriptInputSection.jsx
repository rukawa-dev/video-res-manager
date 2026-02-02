import { FileText, Wand2 } from 'lucide-react';

const ScriptInputSection = ({ value, onChange, onAnalyze }) => {
  return (
    <section className="script-input-section">
      <div className="gems-header" style={{ marginBottom: 0 }}>
        <div className="gems-icon"><FileText size={24} color="#3b82f6" /></div>
        <div className="gems-title-group">
          <h2>대본 입력</h2>
          <p>영상 대본이나 원문 내용을 입력해 주세요.</p>
        </div>
      </div>
      <textarea
        className="script-textarea"
        placeholder="{{추천 제목}}&#10;1. 제목...&#10;&#10;{{나레이션}}&#10;[이름] 내용..."
        value={value}
        onChange={(e) => onChange('scriptContent', e.target.value)}
      ></textarea>
      <div className="button-row">
        <button className="btn-gradient" onClick={onAnalyze}>
          <Wand2 size={18} style={{ marginRight: '8px' }} />
          원문 분석 및 추출
        </button>
      </div>
    </section>
  );
};

export default ScriptInputSection;
