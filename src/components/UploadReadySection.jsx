import { UploadCloud, Copy, Check, Tags, Type } from 'lucide-react';
import { useState, useMemo } from 'react';

const CopyableItem = ({ text, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group flex justify-between items-center gap-6 p-5 mb-3 rounded-lg border transition-all cursor-pointer relative overflow-hidden active:scale-[0.99]
        ${copied
          ? 'bg-midnight-card border-midnight-teal shadow-[0_0_15px_rgba(45,212,191,0.1)]'
          : 'bg-midnight-card/60 border-midnight-accent/20 hover:bg-midnight-accent/10 hover:border-midnight-accent/40 shadow-sm'}`}
      onClick={handleCopy}
    >
      <div className="flex gap-4 items-start flex-1 min-w-0">
        {index !== undefined && (
          <span className="text-midnight-teal font-bold text-[1.1rem] mt-0.5 shrink-0">
            {index + 1}.
          </span>
        )}
        <span className="text-[#e2e8f0] text-[1rem] leading-relaxed break-all whitespace-pre-wrap">
          {text}
        </span>
      </div>
      <div
        className={`flex items-center justify-center p-2.5 rounded-md border shrink-0 transition-colors
          ${copied
            ? 'bg-midnight-teal/10 text-midnight-teal border-midnight-teal/30'
            : 'bg-white/5 text-midnight-text-secondary border-white/10 group-hover:border-midnight-accent/40'}`}
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </div>
    </div>
  );
};

const UploadReadySection = ({ content, additionalDescription, onAdditionalDescriptionChange }) => {
  const data = useMemo(() => {
    if (!content) return null;
    try {
      return JSON.parse(content);
    } catch (e) {
      return null;
    }
  }, [content]);

  return (
    <section className="p-8 bg-midnight-card border border-midnight-border rounded-default shadow-lg">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
        <div className="w-12 h-12 rounded-default bg-midnight-card border border-midnight-border flex items-center justify-center text-blue-500 shadow-sm">
          <UploadCloud size={24} color="currentColor" />
        </div>
        <h2 className="text-[1.5rem] font-bold text-white m-0">업로드 준비</h2>
      </div>

      {!data ? (
        <div className="h-[150px] border border-dashed border-midnight-border rounded-default flex justify-center items-center bg-white/[0.01]">
          <span className="text-midnight-text-secondary text-[1rem]">
            '원문 분석 및 추출' 버튼을 누르면 제목, 키워드, 설명글, 댓글이 여기에 나열됩니다.
          </span>
        </div>
      ) : (
        <div className="space-y-10">
          {/* 추천 제목 */}
          {data.titles && data.titles.length > 0 && (
            <div>
              <div className="flex items-center gap-2.5 mb-5 pl-1">
                <div className="w-1.5 h-6 bg-midnight-teal rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                <h3 className="text-midnight-teal text-[1.2rem] font-bold m-0">추천 제목</h3>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {data.titles.map((title, idx) => (
                  <CopyableItem key={idx} text={title} index={idx} />
                ))}
              </div>
            </div>
          )}

          {/* 추천 키워드 */}
          {data.keywords && (
            <div>
              <div className="flex items-center gap-2.5 mb-5 pl-1">
                <div className="w-1.5 h-6 bg-midnight-accent rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                <h3 className="text-midnight-accent text-[1.2rem] font-bold m-0">추천 키워드</h3>
              </div>
              <CopyableItem text={data.keywords} />
            </div>
          )}

          {/* 설명글 */}
          {data.description && (
            <div>
              <div className="flex items-center gap-2.5 mb-5 pl-1">
                <div className="w-1.5 h-6 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                <h3 className="text-amber-500 text-[1.2rem] font-bold m-0">설명글</h3>
              </div>

              <textarea
                className="w-full min-h-[100px] mb-4 p-5 rounded-default bg-[#16182a]/60 border border-amber-500/20 text-white text-[1rem] focus:outline-none focus:border-amber-500/50 focus:bg-[#1a1c32] transition-all placeholder:text-[#4b4d6a]"
                placeholder="추가 설명글을 입력하세요 (타임라인 등)..."
                value={additionalDescription}
                onChange={(e) => onAdditionalDescriptionChange('additionalDescription', e.target.value)}
              />

              <CopyableItem
                text={additionalDescription ? `${additionalDescription}\n\n${data.description}` : data.description}
              />
            </div>
          )}

          {/* 추천 댓글 */}
          {data.comments && data.comments.length > 0 && (
            <div>
              <div className="flex items-center gap-2.5 mb-5 pl-1">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <h3 className="text-emerald-500 text-[1.2rem] font-bold m-0">추천 댓글</h3>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {data.comments.map((comment, idx) => (
                  <CopyableItem key={idx} text={comment} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UploadReadySection;
