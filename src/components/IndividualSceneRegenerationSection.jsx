import { RefreshCw, List } from 'lucide-react';

const IndividualSceneRegenerationSection = ({ details }) => {
  const { sceneImagePrompt, commonPromptOptions, imageRatio, scenePrefixOptions } = details;
  const prefixes = Array.isArray(scenePrefixOptions) ? scenePrefixOptions : [];

  // 장면 프롬프트 텍스트를 줄 단위로 분리 (빈 줄 제외)
  const sceneLines = sceneImagePrompt
    ? sceneImagePrompt.split('\n').map(line => line.trim()).filter(line => line !== '')
    : [];

  const copyToClipboard = (text) => {
    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    document.body.appendChild(tempArea);
    tempArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempArea);
  };

  const handleRegenerateScene = (sceneLine) => {
    const ratioText = `이미지 비율은 ${imageRatio || '16:9'}.`;
    const commonOptionsText = Array.isArray(commonPromptOptions)
      ? commonPromptOptions.filter(opt => opt.trim()).join('\n')
      : '';
    const scenePrefixText = prefixes.filter(p => p.trim()).join('\n');

    // 줄바꿈을 포함하여 전체 프롬프트 구성 (사용자 요청 포맷 준수)
    const fullPrompt = `${ratioText}\n\n${commonOptionsText}\n\n${scenePrefixText}\n\n${sceneLine}`;

    copyToClipboard(fullPrompt);
    window.open('https://www.genspark.ai/agents?type=image_generation_agent', '_blank');
  };

  if (sceneLines.length === 0) {
    return null; // 표시할 내용이 없으면 섹션을 숨김 (선택 사항)
  }

  return (
    <section className="p-8 bg-midnight-card border border-midnight-border rounded-default shadow-lg">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
        <div className="w-12 h-12 rounded-default bg-midnight-card border border-midnight-border flex items-center justify-center text-midnight-teal shadow-sm">
          <List size={24} color="currentColor" />
        </div>
        <h2 className="text-[1.5rem] font-bold text-white m-0">개별 이미지 재생성</h2>
      </div>

      <div className="space-y-3">
        {sceneLines.map((line, index) => (
          <div key={index} className="flex gap-3 group animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center justify-center w-8 h-auto min-h-[50px] text-sm font-bold text-midnight-text-secondary/50">
              {index + 1}
            </div>
            <div className="flex-1 py-3.5 px-5 bg-midnight-card/40 border border-midnight-border rounded-default text-[#e2e8f0] text-[1rem] leading-relaxed group-hover:bg-[#1a1c32] transition-all">
              {line}
            </div>
            <button
              className="flex items-center gap-1.5 px-4 self-start py-3.5 rounded-default border border-midnight-teal/20 bg-midnight-teal/5 text-midnight-teal hover:bg-midnight-teal/10 hover:border-midnight-teal/40 transition-all font-bold whitespace-nowrap active:scale-[0.98]"
              onClick={() => handleRegenerateScene(line)}
              title="이 장면만 재생성"
            >
              <RefreshCw size={16} />
              재생성
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndividualSceneRegenerationSection;
