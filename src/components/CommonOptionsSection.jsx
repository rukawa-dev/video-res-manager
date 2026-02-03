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
    <section className="p-8 bg-midnight-card border border-midnight-border rounded-default shadow-lg">
      <div className="flex justify-between items-center gap-8 mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-default bg-midnight-card border border-midnight-border flex items-center justify-center text-midnight-teal shadow-sm">
            <Settings size={24} color="currentColor" />
          </div>
          <h2 className="text-[1.5rem] font-bold text-white m-0">프롬프트 공통 옵션 설정</h2>
        </div>
      </div>

      <div className="space-y-8">
        {/* 이미지 비율 */}
        <div>
          <h3 className="text-[1.1rem] font-bold text-[#e2e8f0] mb-5 flex items-center gap-2">
            <div className="w-1 h-4 bg-midnight-accent rounded-full"></div>
            이미지 비율
          </h3>
          <div className="flex flex-wrap gap-4">
            {['16:9', '9:16'].map((ratio) => (
              <label
                key={ratio}
                className={`flex items-center justify-center px-8 py-3.5 rounded-default border font-bold transition-all cursor-pointer select-none min-w-[120px]
                  ${value.imageRatio === ratio
                    ? 'bg-midnight-accent text-white border-midnight-accent shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                    : 'bg-midnight-card/40 text-midnight-text-secondary border-midnight-border hover:border-midnight-accent/40 hover:text-[#e2e8f0]'}`}
              >
                <input
                  type="radio"
                  name="imageRatio"
                  className="hidden"
                  checked={value.imageRatio === ratio}
                  onChange={() => onChange('imageRatio', ratio)}
                />
                {ratio}
              </label>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="w-full bg-[#16182a]/60 border border-white/5 rounded-md py-2.5 px-4 text-midnight-text-secondary text-[0.9rem] focus:outline-none cursor-default"
              readOnly
              value={`이미지 비율은 ${value.imageRatio || '16:9'}.`}
            />
          </div>
        </div>

        {/* 공통 옵션 리스트 */}
        <div className="space-y-4">
          <h3 className="text-[1.1rem] font-bold text-[#e2e8f0] mb-5 flex items-center gap-2">
            <div className="w-1 h-4 bg-midnight-teal rounded-full"></div>
            공통 프리픽스 리스트
          </h3>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex gap-3 group">
                <input
                  type="text"
                  className="flex-1 bg-[#16182a]/60 border border-midnight-border rounded-default py-3.5 px-5 text-white text-[1rem] focus:outline-none focus:border-midnight-teal/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
                  value={option}
                  onChange={(e) => handleUpdateOption(index, e.target.value)}
                  placeholder="공통 프롬프트 내용을 입력하세요."
                />
                <button
                  className="p-3.5 rounded-default border border-white/5 bg-white/5 text-midnight-text-secondary hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5 transition-all"
                  onClick={() => handleDeleteOption(index)}
                  title="삭제"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 py-4 mt-2 rounded-default border border-dashed border-midnight-teal/30 text-midnight-teal font-bold bg-midnight-teal/5 hover:bg-midnight-teal/10 hover:border-midnight-teal/50 transition-all active:scale-[0.99]"
            onClick={handleAddOption}
          >
            <Plus size={18} />
            전체 공통 프리픽스 추가
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommonOptionsSection;
