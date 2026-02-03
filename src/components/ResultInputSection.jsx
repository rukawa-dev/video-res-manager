import { Link as LinkIcon } from 'lucide-react';

const ResultInputSection = ({ value, onChange }) => {
  return (
    <section className="flex items-center gap-3 w-full">
      <div className="flex items-center gap-3 py-3 px-4 rounded-default bg-midnight-card border border-midnight-border min-w-[170px] justify-center whitespace-nowrap overflow-hidden shadow-sm">
        <div className="flex items-center justify-center text-[#a0a0a0]">
          <LinkIcon size={18} color="currentColor" />
        </div>
        <span className="text-[1rem] font-semibold text-midnight-text-secondary">대본 GEM 결과</span>
      </div>
      <input
        type="text"
        className="flex-1 bg-midnight-card border border-midnight-border rounded-default py-3.5 px-5 text-white text-[1rem] transition-all focus:outline-none focus:border-midnight-accent/50 focus:bg-[#1a1c32] placeholder:text-[#4b4d6a] shadow-sm"
        placeholder="https://gemini.google.com/gem/..."
        value={value}
        onChange={(e) => onChange('gemResultUrl', e.target.value)}
      />
    </section>
  );
};

export default ResultInputSection;
