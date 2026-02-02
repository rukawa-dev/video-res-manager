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
    <section className="narration-section">
      <div className="narration-header">
        <div className="gems-icon"><Volume2 size={24} color="#a855f7" /></div>
        <div className="gems-title-group">
          <h2>Narration Content</h2>
          <p>대본 구성에 맞춰 추출된 나레이션 데이터를 관리하세요.</p>
        </div>
        <div className="header-buttons">
          <button className="btn-pink" onClick={goToTypecast}>
            <Volume2 size={18} style={{ marginRight: '8px' }} />
            타입캐스트로 이동
          </button>
        </div>
      </div>

      <div className="narration-grid">
        <div className="narration-col">
          <div className="col-header">
            <div className="col-label"><span className="label-dot" style={{ background: '#a855f7' }}></span>이름 있는 버전</div>
            <button className="icon-btn" onClick={() => copyToClipboard(withNames)}>
              <Copy size={14} />
              복사하기
            </button>
          </div>
          <textarea
            className="narration-textarea"
            placeholder="이름 태그가 포함된 나레이션..."
            value={withNames}
            onChange={(e) => onChange('narrationWithNames', e.target.value)}
          ></textarea>
        </div>
        <div className="narration-col">
          <div className="col-header">
            <div className="col-label"><span className="label-dot" style={{ background: '#2dd4bf' }}></span>이름 없는 버전</div>
            <button className="icon-btn" onClick={() => copyToClipboard(noNames)}>
              <Copy size={14} />
              복사하기
            </button>
          </div>
          <textarea
            className="narration-textarea"
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
