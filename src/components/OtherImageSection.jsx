import { Image } from 'lucide-react';

const OtherImageSection = ({ details, onChange }) => {
  const { otherImagePrompt, commonPromptOptions, imageRatio } = details;

  const copyToClipboard = (text) => {
    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    document.body.appendChild(tempArea);
    tempArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempArea);
  };

  const goToGenspark = () => {
    if (!otherImagePrompt) {
      alert('복사할 프롬프트 내용이 없습니다.');
      return;
    }

    const ratioText = `이미지 비율은 ${imageRatio || '16:9'}.`;
    const commonOptionsText = Array.isArray(commonPromptOptions)
      ? commonPromptOptions.filter(opt => opt.trim()).join('\n')
      : '';

    const fullPrompt = `${ratioText}\n${commonOptionsText}\n\n${otherImagePrompt}`;

    copyToClipboard(fullPrompt);
    window.open('https://www.genspark.ai/agents?type=image_generation_agent', '_blank');
  };

  return (
    <section className="script-input-section">
      <div className="narration-header">
        <div className="gems-icon" style={{ color: '#fbbf24' }}>
          <Image size={24} color="currentColor" />
        </div>
        <div className="gems-title-group">
          <h2>기타 이미지 프롬프트 입력</h2>
        </div>
        <div className="header-buttons">
          <button className="btn-pink" onClick={goToGenspark} style={{ background: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)' }}>
            <Image size={18} style={{ marginRight: '8px' }} />
            젠스파크로 이동
          </button>
        </div>
      </div>
      <textarea
        className="script-textarea"
        style={{ minHeight: '300px' }}
        placeholder="기타 이미지에 사용할 프롬프트를 입력하세요."
        value={otherImagePrompt}
        onChange={(e) => onChange('otherImagePrompt', e.target.value)}
      />
    </section>
  );
};

export default OtherImageSection;
