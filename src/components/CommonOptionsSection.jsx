import { Settings } from 'lucide-react';

const CommonOptionsSection = ({ value, onChange }) => {
  return (
    <section className="script-input-section">
      <div className="gems-header">
        <div className="gems-icon" style={{ color: '#10b981' }}><Settings size={24} color="currentColor" /></div>
        <div className="gems-title-group">
          <h2>프롬프트 공통 옵션 설정</h2>
        </div>
      </div>
      <textarea
        className="script-textarea"
        style={{ minHeight: '120px' }}
        placeholder="모든 이미지 생성에 공통으로 적용할 가이드라인이나 스타일 옵션을 입력하세요."
        value={value}
        onChange={(e) => onChange('commonPromptOptions', e.target.value)}
      />
    </section>
  );
};

export default CommonOptionsSection;
