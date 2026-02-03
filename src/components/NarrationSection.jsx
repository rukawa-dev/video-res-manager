import { Volume2, Copy } from 'lucide-react';

const NarrationSection = ({ withNames, noNames, onChange, showModal }) => {
  const copyToClipboard = (text) => {
    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    document.body.appendChild(tempArea);
    tempArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempArea);
  };

  const goToTypecast = () => {
    if (!withNames) {
      showModal('복사할 나레이션 내용이 없습니다.');
      return;
    }
    copyToClipboard(withNames);
    window.open('https://typecast.ai/', '_blank');
  };

  return (
    <section className="p-8 bg-midnight-card border border-midnight-border rounded-default shadow-lg">
      <div className="flex justify-between items-center gap-8 mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-default bg-midnight-card border border-midnight-border flex items-center justify-center shadow-sm">
            <Volume2 size={24} color="#a855f7" />
          </div>
          <h2 className="text-[1.5rem] font-bold text-white m-0">
            나레이션
            <span className="ml-3 text-[1.1rem] text-[#ff4d4d] font-bold">
              총 {withNames ? withNames.split('\n').filter(line => line.trim() !== '').length : 0}개
            </span>
          </h2>
        </div>
        <button
          className="flex items-center px-6 py-3 rounded-default font-bold text-white transition-all bg-gradient-to-br from-[#ec4899] to-[#d946ef] shadow-[0_4px_15px_rgba(236,72,153,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          onClick={goToTypecast}
        >
          <Volume2 size={18} className="mr-2" />
          타입캐스트로 이동
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 이름 있는 버전 */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2.5 text-[1rem] font-semibold text-[#e2e8f0]">
              <span className="w-2.5 h-2.5 rounded-full bg-midnight-accent"></span>
              이름 있는 버전
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-[0.85rem] text-midnight-text-secondary hover:text-white transition-colors bg-white/5 rounded-md border border-white/5 hover:border-white/10"
              onClick={() => copyToClipboard(withNames)}
            >
              <Copy size={14} />
              복사하기
            </button>
          </div>
          <textarea
            className="w-full h-[300px] p-5 rounded-default bg-[#16182a]/60 border border-midnight-border text-[#e2e8f0] text-[1rem] leading-relaxed focus:outline-none focus:border-midnight-accent/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
            placeholder="이름 태그가 포함된 나레이션..."
            value={withNames}
            onChange={(e) => onChange('narrationWithNames', e.target.value)}
          ></textarea>
        </div>

        {/* 이름 없는 버전 */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2.5 text-[1rem] font-semibold text-[#e2e8f0]">
              <span className="w-2.5 h-2.5 rounded-full bg-midnight-teal"></span>
              이름 없는 버전
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-[0.85rem] text-midnight-text-secondary hover:text-white transition-colors bg-white/5 rounded-md border border-white/5 hover:border-white/10"
              onClick={() => copyToClipboard(noNames)}
            >
              <Copy size={14} />
              복사하기
            </button>
          </div>
          <textarea
            className="w-full h-[300px] p-5 rounded-default bg-[#16182a]/60 border border-midnight-border text-[#e2e8f0] text-[1rem] leading-relaxed focus:outline-none focus:border-midnight-teal/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
            placeholder="이름 태그가 제거된 나레이션..."
            value={noNames}
            onChange={(e) => onChange('narrationNoNames', e.target.value)}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default NarrationSection;
