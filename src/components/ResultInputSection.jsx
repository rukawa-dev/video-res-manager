import { Link as LinkIcon } from 'lucide-react';

const ResultInputSection = ({ value, onChange }) => {
  return (
    <section className="result-input-section">
      <div className="result-label-group">
        <div className="result-icon"><LinkIcon size={18} color="#a0a0a0" /></div>
        <span className="result-label">대본 GEM 결과</span>
      </div>
      <input
        type="text"
        className="result-input"
        placeholder="https://gemini.google.com/gem/..."
        value={value}
        onChange={(e) => onChange('gemResultUrl', e.target.value)}
      />
    </section>
  );
};

export default ResultInputSection;
