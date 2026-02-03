import { Images, RefreshCw } from 'lucide-react';

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

  const handleUpdatePrefix = (index, newValue) => {
    const updated = [...prefixes];
    updated[index] = newValue;
    onChange('scenePrefixOptions', updated);
  };

  const handleRegenerateScene = (index) => {
    const scenePrompt = prefixes[index];
    if (!scenePrompt) {
      alert('재생성할 프롬프트 내용이 없습니다.');
      return;
    }

    const ratioText = `이미지 비율은 ${imageRatio || '16:9'}.`;
    const commonOptionsText = Array.isArray(commonPromptOptions)
      ? commonPromptOptions.filter(opt => opt.trim()).join('\n')
      : '';

    // 개별 장면 프롬프트 생성 (비율 + 공통 + 해당 장면)
    const fullPrompt = `${ratioText}\n${commonOptionsText}\n\n${scenePrompt}`;

    copyToClipboard(fullPrompt);
    window.open('https://www.genspark.ai/agents?type=image_generation_agent', '_blank');
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

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    if (!pastedText) return;

    const lines = pastedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');

    if (lines.length > 1) {
      e.preventDefault();
      onChange('scenePrefixOptions', lines);
      onChange('sceneImagePrompt', '');
    }
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

      <div className="space-y-6">
        <div className="relative">
          <textarea
            className="w-full min-h-[300px] p-6 rounded-default bg-[#16182a]/60 border border-midnight-border text-[#e2e8f0] text-[1rem] leading-relaxed focus:outline-none focus:border-amber-500/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
            placeholder="장면별 이미지에 사용할 프롬프트 덩어리를 붙여넣으세요. (한 줄에 한 장면씩 자동 분리)"
            value={sceneImagePrompt}
            onChange={(e) => onChange('sceneImagePrompt', e.target.value)}
            onPaste={handlePaste}
          />
        </div>

        <div className="pt-4 border-t border-white/5">
          <h3 className="text-[1rem] font-bold text-midnight-text-secondary mb-4 flex items-center gap-2">
            <div className="w-1 h-3 bg-midnight-teal rounded-full"></div>
            분리된 장면 리스트
          </h3>

          <div className="space-y-3 mb-6">
            {prefixes.map((prefix, index) => (
              <div key={index} className="flex gap-3 group animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center justify-center w-8 h-12 text-sm font-bold text-midnight-text-secondary/50">
                  {index + 1}
                </div>
                <input
                  type="text"
                  className="flex-1 bg-[#16182a]/60 border border-midnight-border rounded-default py-3.5 px-5 text-white text-[1rem] focus:outline-none focus:border-midnight-teal/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
                  value={prefix}
                  onChange={(e) => handleUpdatePrefix(index, e.target.value)}
                  placeholder="장면 프롬프트"
                />
                <button
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-default border border-midnight-teal/20 bg-midnight-teal/5 text-midnight-teal hover:bg-midnight-teal/10 hover:border-midnight-teal/40 transition-all font-bold whitespace-nowrap active:scale-[0.98]"
                  onClick={() => handleRegenerateScene(index)}
                  title="이미지 재생성"
                >
                  <RefreshCw size={16} />
                  재생성
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SceneImageSection;
