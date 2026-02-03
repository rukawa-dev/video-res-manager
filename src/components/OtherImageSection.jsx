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
    <section className="p-8 bg-midnight-card border border-midnight-border rounded-default shadow-lg">
      <div className="flex justify-between items-center gap-8 mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-default bg-midnight-card border border-midnight-border flex items-center justify-center text-amber-400 shadow-sm">
            <Image size={24} color="currentColor" />
          </div>
          <h2 className="text-[1.5rem] font-bold text-white m-0">기타 이미지 프롬프트 입력</h2>
        </div>
        <button
          className="flex items-center px-6 py-3 rounded-default font-bold text-white transition-all bg-gradient-to-br from-orange-400 to-amber-500 shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          onClick={goToGenspark}
        >
          <Image size={18} className="mr-2" />
          젠스파크로 이동
        </button>
      </div>
      <textarea
        className="w-full min-h-[300px] p-6 rounded-default bg-[#16182a]/60 border border-midnight-border text-[#e2e8f0] text-[1rem] leading-relaxed focus:outline-none focus:border-amber-500/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
        placeholder="기타 이미지에 사용할 프롬프트를 입력하세요."
        value={otherImagePrompt}
        onChange={(e) => onChange('otherImagePrompt', e.target.value)}
      />
    </section>
  );
};

export default OtherImageSection;
