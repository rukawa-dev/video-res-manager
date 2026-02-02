import { Sparkles } from 'lucide-react';
import gemsOptions from '../assets/gems-options.json';

const GemsSection = () => {
  return (
    <section className="gems-section">
      <div className="gems-header">
        <div className="gems-icon"><Sparkles size={24} color="#2dd4bf" /></div>
        <div className="gems-title-group">
          <h2>GEMS Script Generation</h2>
          <p>원하시는 랜드 테마를 선택하여 대본을 생성해보세요.</p>
        </div>
      </div>
      <div className="selection-grid">
        {gemsOptions["나의 GEMS 리스트"]?.map((item, idx) => {
          const iconMatch = item.name.match(/^(\ud83c[\udf00-\uffff]|\ud83d[\udc00-\ude4f\ude80-\udeff]|\ud83e[\udd00-\uddff]|[^\w\s\d])/);
          const icon = iconMatch ? iconMatch[0] : '✨';
          const title = item.name.replace(icon, '').trim();

          return (
            <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="selection-card">
              <span className="card-icon">{icon}</span>
              <span className="card-text">{title}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default GemsSection;
