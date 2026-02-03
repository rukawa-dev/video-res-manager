import { Sparkles } from 'lucide-react';
import gemsOptions from '../../⭐️ 옵션.json';

const GemsSection = () => {
  return (
    <section className="p-8 bg-midnight-card border border-midnight-border rounded-default shadow-lg">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
        <div className="w-12 h-12 rounded-default bg-midnight-card border border-midnight-border flex items-center justify-center text-midnight-teal shadow-sm">
          <Sparkles size={24} color="currentColor" />
        </div>
        <h2 className="text-[1.5rem] font-bold text-white m-0">나의 GEMS 리스트</h2>
      </div>
      <div className="flex flex-wrap gap-4">
        {gemsOptions["나의 GEMS 리스트"]?.map((item, idx) => {
          const iconMatch = item.name.match(/^(\ud83c[\udf00-\uffff]|\ud83d[\udc00-\ude4f\ude80-\udeff]|\ud83e[\udd00-\uddff]|[^\w\s\d])/);
          const icon = iconMatch ? iconMatch[0] : '✨';
          const title = item.name.replace(icon, '').trim();

          return (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 bg-midnight-card/60 border border-midnight-border rounded-default transition-all hover:bg-midnight-accent/10 hover:border-midnight-accent/40 active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              <span className="text-[1.5rem] group-hover:scale-110 transition-transform">{icon}</span>
              <span className="text-[1rem] font-bold text-[#e2e8f0] group-hover:text-white transition-colors">{title}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default GemsSection;
