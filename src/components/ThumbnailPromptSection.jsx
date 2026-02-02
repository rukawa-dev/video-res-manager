import { Sparkles, ExternalLink, Link as LinkIcon } from 'lucide-react';

const ThumbnailPromptSection = ({ value, urlValue, onChange, narrationText }) => {
  const gemUrl = "https://gemini.google.com/gem/6603850f310e";

  const handleCopyAndGo = () => {
    if (narrationText) {
      navigator.clipboard.writeText(narrationText)
        .then(() => {
          window.open(gemUrl, '_blank');
        })
        .catch(err => {
          console.error('클립보드 복사 실패:', err);
          window.open(gemUrl, '_blank');
        });
    } else {
      window.open(gemUrl, '_blank');
    }
  };

  return (
    <section className="gems-section">
      <div className="narration-header">
        <div className="gems-icon">
          <Sparkles size={24} color="#a855f7" />
        </div>
        <div className="gems-title-group">
          <h2>썸네일 프롬프트 생성</h2>
        </div>
        <div className="header-buttons">
          <button className="btn-pink" onClick={handleCopyAndGo}>
            <ExternalLink size={18} style={{ marginRight: '8px' }} />
            썸네일 프롬프트 생성
          </button>
        </div>
      </div>

      <div>
        <div className="result-input-section" style={{ padding: '0', background: 'transparent', border: 'none' }}>
          <div className="result-label-group">
            <div className="result-icon"><LinkIcon size={18} color="#a855f7" /></div>
            <span className="result-label">썸네일 GEM 결과</span>
          </div>
          <input
            type="text"
            className="result-input"
            placeholder="결과 URL을 입력하세요..."
            value={urlValue}
            onChange={(e) => onChange('thumbnailGemUrl', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default ThumbnailPromptSection;
