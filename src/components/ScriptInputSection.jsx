import { FileText, Wand2 } from 'lucide-react';

const ScriptInputSection = ({ value, onChange, onAnalyze }) => {
  return (
    <section className="p-8 bg-midnight-card border border-midnight-border rounded-default shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-default bg-midnight-card border border-midnight-border flex items-center justify-center text-blue-500 shadow-sm">
          <FileText size={24} color="currentColor" />
        </div>
        <h2 className="text-[1.5rem] font-bold text-white m-0">대본 입력</h2>
      </div>

      <textarea
        className="w-full min-h-[300px] p-6 mb-6 rounded-default bg-[#16182a]/60 border border-midnight-border text-[#e2e8f0] text-[1rem] leading-relaxed focus:outline-none focus:border-blue-500/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
        placeholder="{{추천 제목}}&#10;1. 제목...&#10;&#10;{{나레이션}}&#10;[이름] 내용..."
        value={value}
        onChange={(e) => onChange('scriptContent', e.target.value)}
      />

      <div className="flex justify-end">
        <button
          className="flex items-center px-8 py-4 rounded-default font-bold text-white transition-all bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          onClick={onAnalyze}
        >
          <Wand2 size={18} className="mr-2" />
          원문 분석 및 추출
        </button>
      </div>
    </section>
  );
};

export default ScriptInputSection;
