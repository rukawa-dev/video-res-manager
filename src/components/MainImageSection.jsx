import { Image } from 'lucide-react';

const MainImageSection = ({ value, onChange }) => {
  return (
    <section className="script-input-section">
      <div className="gems-header">
        <div className="gems-icon" style={{ color: '#fbbf24' }}><Image size={24} color="currentColor" /></div>
        <div className="gems-title-group">
          <h2>대표 이미지 프롬프트 입력</h2>
        </div>
      </div>
      <textarea
        className="script-textarea"
        style={{ minHeight: '120px' }}
        placeholder="대표 이미지에 사용할 프롬프트를 입력하세요."
        value={value}
        onChange={(e) => onChange('mainImagePrompt', e.target.value)}
      />
    </section>
  );
};

export default MainImageSection;
