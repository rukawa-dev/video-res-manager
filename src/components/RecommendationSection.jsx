import { ExternalLink } from 'lucide-react';

const RecommendationSection = ({ narrationText }) => {
  const gemUrl = "https://gemini.google.com/gem/6603850f310e";

  const handleCopyAndGo = () => {
    if (narrationText) {
      navigator.clipboard.writeText(narrationText)
        .then(() => {
          // 복사 성공 시 바로 이동
          window.open(gemUrl, '_blank');
        })
        .catch(err => {
          console.error('클립보드 복사 실패:', err);
          // 실패하더라도 일단 이동은 시킴
          window.open(gemUrl, '_blank');
        });
    } else {
      window.open(gemUrl, '_blank');
    }
  };

  return (
    <section className="recommendation-section">
      <button
        className="btn-large-gradient"
        onClick={handleCopyAndGo}
      >
        <ExternalLink size={20} style={{ marginRight: '10px' }} />
        ❤️ 나레이션 기반 썸네일 생성기로 이동
      </button>
    </section>
  );
};

export default RecommendationSection;
