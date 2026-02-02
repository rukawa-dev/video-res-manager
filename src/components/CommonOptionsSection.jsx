import { Settings, Plus, Trash2 } from 'lucide-react';

const CommonOptionsSection = ({ value, onChange }) => {
  const options = Array.isArray(value.commonPromptOptions) ? value.commonPromptOptions : [];

  const handleAddOption = () => {
    onChange('commonPromptOptions', [...options, '']);
  };

  const handleUpdateOption = (index, newValue) => {
    const updated = [...options];
    updated[index] = newValue;
    onChange('commonPromptOptions', updated);
  };

  const handleDeleteOption = (index) => {
    const updated = options.filter((_, i) => i !== index);
    onChange('commonPromptOptions', updated);
  };

  return (
    <section className="script-input-section common-options-section">
      <div className="gems-header">
        <div className="gems-icon" style={{ color: '#10b981' }}>
          <Settings size={24} color="currentColor" />
        </div>
        <div className="gems-title-group">
          <h2>프롬프트 공통 옵션 설정</h2>
        </div>
      </div>

      <div className="ratio-group">
        {['16:9', '9:16'].map((ratio) => (
          <div key={ratio} className="ratio-item">
            <input
              type="radio"
              id={`ratio-${ratio}`}
              name="imageRatio"
              checked={value.imageRatio === ratio}
              onChange={() => onChange('imageRatio', ratio)}
            />
            <label htmlFor={`ratio-${ratio}`} className="ratio-label">
              {ratio}
            </label>
          </div>
        ))}
      </div>

      <div className="readonly-input-container">
        <input
          type="text"
          className="readonly-display-input"
          readOnly
          value={`이미지 비율은 ${value.imageRatio || '16:9'}.`}
        />
      </div>

      <div className="options-list">
        {options.map((option, index) => (
          <div key={index} className="option-row">
            <input
              type="text"
              className="option-input"
              value={option}
              onChange={(e) => handleUpdateOption(index, e.target.value)}
              placeholder="공통 프롬프트 내용을 입력하세요."
            />
            <button
              className="option-delete-btn"
              onClick={() => handleDeleteOption(index)}
              title="삭제"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <button className="option-add-btn" onClick={handleAddOption}>
        <Plus size={18} />
        전체 공통 프리픽스 추가
      </button>
    </section>
  );
};

export default CommonOptionsSection;
