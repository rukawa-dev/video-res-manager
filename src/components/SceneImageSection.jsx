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
    <section className="p-8 bg-midnight-card border border-midnight-border rounded-default shadow-lg">
      <div className="flex justify-between items-center gap-8 mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-default bg-midnight-card border border-midnight-border flex items-center justify-center text-midnight-teal shadow-sm">
            <Images size={24} color="currentColor" />
          </div>
          <h2 className="text-[1.5rem] font-bold text-white m-0">장면별 이미지 프롬프트 입력</h2>
        </div>
        <button
          className="flex items-center px-6 py-3 rounded-default font-bold text-white transition-all bg-gradient-to-br from-orange-400 to-amber-500 shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          onClick={goToGenspark}
        >
          <Images size={18} className="mr-2" />
          젠스파크로 이동
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {prefixes.map((prefix, index) => (
          <div key={index} className="flex gap-3 group">
            <input
              type="text"
              className="flex-1 bg-[#16182a]/60 border border-midnight-border rounded-default py-3.5 px-5 text-white text-[1rem] focus:outline-none focus:border-midnight-teal/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
              value={prefix}
              onChange={(e) => handleUpdatePrefix(index, e.target.value)}
              placeholder="장면별 프리픽스를 입력하세요."
            />
            <button
              className="p-3.5 rounded-default border border-white/5 bg-white/5 text-midnight-text-secondary hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5 transition-all"
              onClick={() => handleDeletePrefix(index)}
              title="삭제"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 py-4 mb-8 rounded-default border border-dashed border-midnight-teal/30 text-midnight-teal font-bold bg-midnight-teal/5 hover:bg-midnight-teal/10 hover:border-midnight-teal/50 transition-all active:scale-[0.99]"
        onClick={handleAddPrefix}
      >
        <Plus size={18} />
        프리픽스 항목 추가
      </button>

      <textarea
        className="w-full min-h-[300px] p-6 rounded-default bg-[#16182a]/60 border border-midnight-border text-[#e2e8f0] text-[1rem] leading-relaxed focus:outline-none focus:border-amber-500/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
        placeholder="장면별 이미지에 사용할 프롬프트를 입력하세요."
        value={sceneImagePrompt}
        onChange={(e) => onChange('sceneImagePrompt', e.target.value)}
      />
    </section>
  );
};

export default SceneImageSection;
