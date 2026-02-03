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
    <section className="gems-section p-8 bg-midnight-card border border-midnight-border rounded-default shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm">
      <div className="flex justify-between items-center gap-8 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-default bg-midnight-card border border-midnight-border flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <Sparkles size={24} color="#a855f7" />
          </div>
          <h2 className="text-[1.5rem] font-bold text-white m-0">썸네일 프롬프트 생성</h2>
        </div>
        <button
          className="flex items-center px-6 py-3 rounded-default font-bold text-white transition-all bg-gradient-to-br from-[#ec4899] to-[#d946ef] shadow-[0_4px_15px_rgba(236,72,153,0.3)] hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(236,72,153,0.4)] active:scale-[0.98]"
          onClick={handleCopyAndGo}
        >
          <ExternalLink size={18} className="mr-2" />
          썸네일 프롬프트 생성
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 py-3 px-4 rounded-default bg-midnight-card border border-midnight-border min-w-[170px] justify-center whitespace-nowrap overflow-hidden">
          <div className="flex items-center justify-center text-midnight-accent">
            <LinkIcon size={18} color="#a855f7" />
          </div>
          <span className="text-[1rem] font-semibold text-midnight-text-secondary">썸네일 GEM 결과</span>
        </div>
        <input
          type="text"
          className="flex-1 bg-midnight-card border border-midnight-border rounded-default py-3 px-5 text-white text-[1rem] transition-all focus:outline-none focus:border-midnight-accent focus:bg-[#1a1c32] placeholder:text-[#4b4d6a]"
          placeholder="결과 URL을 입력하세요..."
          value={urlValue}
          onChange={(e) => onChange('thumbnailGemUrl', e.target.value)}
        />
      </div>
    </section>
  );
};

export default ThumbnailPromptSection;
