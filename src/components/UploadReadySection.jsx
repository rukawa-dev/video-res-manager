import { UploadCloud, Copy, Check, Tags, Type } from 'lucide-react';
import { useState, useMemo } from 'react';

const CopyableItem = ({ label, text, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="analysis-item"
      onClick={handleCopy}
      style={{
        background: 'rgba(20, 22, 40, 0.6)',
        border: copied ? '1px solid var(--teal-accent)' : '1px solid rgba(168, 85, 247, 0.2)',
        borderRadius: '8px',
        padding: '1.2rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '0.75rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(20, 22, 40, 0.6)';
        e.currentTarget.style.borderColor = copied ? 'var(--teal-accent)' : '1px solid rgba(168, 85, 247, 0.2)';
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flex: 1 }}>
        {index !== undefined && (
          <span style={{ color: 'var(--teal-accent)', fontWeight: '700', fontSize: '1.1rem', marginTop: '0.1rem' }}>
            {index + 1}.
          </span>
        )}
        <span style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: '1.6', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
          {text}
        </span>
      </div>
      <div
        style={{
          background: copied ? 'rgba(45, 212, 191, 0.1)' : 'rgba(255, 255, 255, 0.05)',
          color: copied ? 'var(--teal-accent)' : 'var(--text-secondary)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.6rem',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s ease'
        }}
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
    <section className="script-input-section upload-ready-section" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2rem' }}>
      <div className="narration-header" style={{ marginBottom: '2rem' }}>
        <div className="gems-icon" style={{ color: '#3b82f6' }}>
          <UploadCloud size={24} color="currentColor" />
        </div>
        <div className="gems-title-group">
          <h2>업로드 준비</h2>
        </div>
      </div>

      {!data ? (
        <div
          className="upload-placeholder"
          style={{
            minHeight: '150px',
            border: '1px dashed var(--border-color)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.01)'
          }}
        >
          <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            '원문 분석 및 추출' 버튼을 누르면 제목, 키워드, 설명글, 댓글이 여기에 나열됩니다.
          </span>
        </div>
      ) : (
        <div className="analysis-results">
          {/* 추천 제목 */}
          {data.titles && data.titles.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <div style={{ width: '4px', height: '18px', background: 'var(--teal-accent)', borderRadius: '2px' }}></div>
                <h3 style={{ color: 'var(--teal-accent)', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>추천 제목</h3>
              </div>
              {data.titles.map((title, idx) => (
                <CopyableItem key={idx} text={title} index={idx} />
              ))}
            </div>
          )}

          {/* 추천 키워드 */}
          {data.keywords && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <div style={{ width: '4px', height: '18px', background: 'var(--accent-color)', borderRadius: '2px' }}></div>
                <h3 style={{ color: 'var(--accent-color)', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>추천 키워드</h3>
              </div>
              <CopyableItem text={data.keywords} />
            </div>
          )}

          {/* 설명글 */}
          {data.description && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <div style={{ width: '4px', height: '18px', background: '#f59e0b', borderRadius: '2px' }}></div>
                <h3 style={{ color: '#f59e0b', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>설명글</h3>
              </div>

              <textarea
                className="narration-textarea"
                style={{
                  minHeight: '80px',
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  borderColor: 'rgba(245, 158, 11, 0.2)'
                }}
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
            <div style={{ marginBottom: '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <div style={{ width: '4px', height: '18px', background: '#10b981', borderRadius: '2px' }}></div>
                <h3 style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>추천 댓글</h3>
              </div>
              {data.comments.map((comment, idx) => (
                <CopyableItem key={idx} text={comment} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UploadReadySection;
