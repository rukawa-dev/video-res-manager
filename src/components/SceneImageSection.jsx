import { Images, Plus, Trash2 } from 'lucide-react';

const SceneImageSection = ({ details, onChange }) => {
  const { sceneImagePrompt, commonPromptOptions, imageRatio, scenePrefixOptions } = details;
  const prefixes = Array.isArray(scenePrefixOptions) ? scenePrefixOptions : [];

  const copyToClipboard = (text) => {
    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    document.body.appendChild(tempArea);
    tempArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempArea);
  };

  const handleAddPrefix = () => {
    onChange('scenePrefixOptions', [...prefixes, '']);
  };

  const handleUpdatePrefix = (index, newValue) => {
    const updated = [...prefixes];
    updated[index] = newValue;
    onChange('scenePrefixOptions', updated);
  };

  const handleDeletePrefix = (index) => {
    const updated = prefixes.filter((_, i) => i !== index);
    onChange('scenePrefixOptions', updated);
  };

  const goToGenspark = () => {
    if (!sceneImagePrompt) {
      alert('복사할 프롬프트 내용이 없습니다.');
      return;
    }

    const ratioText = `이미지 비율은 ${imageRatio || '16:9'}.`;
    const commonOptionsText = Array.isArray(commonPromptOptions)
      ? commonPromptOptions.filter(opt => opt.trim()).join('\n')
      : '';
    const scenePrefixText = prefixes.filter(p => p.trim()).join('\n');

    const fullPrompt = `${ratioText}\n${commonOptionsText}\n${scenePrefixText}\n\n${sceneImagePrompt}`;

    copyToClipboard(fullPrompt);
    window.open('https://www.genspark.ai/agents?type=image_generation_agent', '_blank');
  };

  return (
    <section className="script-input-section scene-image-section">
      <div className="narration-header">
        <div className="gems-icon" style={{ color: '#10b981' }}>
          <Images size={24} color="currentColor" />
        </div>
        <div className="gems-title-group">
          <h2>장면별 이미지 프롬프트 입력</h2>
        </div>
        <div className="header-buttons">
          <button className="btn-pink" onClick={goToGenspark} style={{ background: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)' }}>
            <Images size={18} style={{ marginRight: '8px' }} />
            젠스파크로 이동
          </button>
        </div>
      </div>

      <div className="options-list scene-prefixes-list">
        {prefixes.map((prefix, index) => (
          <div key={index} className="option-row">
            <input
              type="text"
              className="option-input"
              value={prefix}
              onChange={(e) => handleUpdatePrefix(index, e.target.value)}
              placeholder="장면별 프리픽스를 입력하세요."
            />
            <button
              className="option-delete-btn"
              onClick={() => handleDeletePrefix(index)}
              title="삭제"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <button
        className="option-add-btn"
        onClick={handleAddPrefix}
        style={{ color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.2)', background: 'rgba(45, 212, 191, 0.05)', marginBottom: '1.5rem' }}
      >
        <Plus size={18} />
        프리픽스 항목 추가
      </button>

      <textarea
        className="script-textarea"
        style={{ minHeight: '300px' }}
        placeholder="장면별 이미지에 사용할 프롬프트를 입력하세요."
        value={sceneImagePrompt}
        onChange={(e) => onChange('sceneImagePrompt', e.target.value)}
      />
    </section>
  );
};

export default SceneImageSection;
