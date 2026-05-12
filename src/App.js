import { useEffect, useState } from 'react';
import RecommendationCard from './components/RecommendationCard';
import menuData from './data/menus.json';

function isValidMenu(menu) {
  return (
    menu &&
    typeof menu.id === 'string' &&
    typeof menu.name === 'string' &&
    typeof menu.category === 'string' &&
    typeof menu.description === 'string' &&
    typeof menu.imageUrl === 'string'
  );
}

function getRandomMenu(menus, previousMenuId) {
  if (menus.length === 1) {
    return menus[0];
  }

  const nextCandidates = menus.filter((menu) => menu.id !== previousMenuId);
  const targetMenus = nextCandidates.length > 0 ? nextCandidates : menus;
  const randomIndex = Math.floor(Math.random() * targetMenus.length);

  return targetMenus[randomIndex];
}

function App() {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!Array.isArray(menuData)) {
      setStatus('error');
      setErrorMessage('메뉴 데이터를 읽는 형식이 올바르지 않습니다.');
      return;
    }

    if (menuData.length === 0) {
      setMenus([]);
      setStatus('empty');
      return;
    }

    if (!menuData.every(isValidMenu)) {
      setStatus('error');
      setErrorMessage('메뉴 데이터에 필수 항목이 누락되었습니다.');
      return;
    }

    setMenus(menuData);
    setStatus('idle');
  }, []);

  const handleRecommendClick = () => {
    if (menus.length === 0) {
      setStatus('empty');
      setSelectedMenu(null);
      return;
    }

    const nextMenu = getRandomMenu(menus, selectedMenu?.id);

    setSelectedMenu(nextMenu);
    setStatus('ready');
  };

  const renderResult = () => {
    if (status === 'loading') {
      return (
        <div className="status-card">
          <p className="status-label">데이터 준비 중</p>
          <h2>메뉴 목록을 불러오는 중입니다.</h2>
          <p>정적 JSON 데이터를 확인한 뒤 추천을 시작합니다.</p>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="status-card status-card-error">
          <p className="status-label">데이터 오류</p>
          <h2>추천을 진행할 수 없습니다.</h2>
          <p>{errorMessage}</p>
        </div>
      );
    }

    if (status === 'empty') {
      return (
        <div className="status-card">
          <p className="status-label">메뉴 없음</p>
          <h2>추천할 메뉴가 아직 없습니다.</h2>
          <p>`src/data/menus.json`에 메뉴를 추가하면 바로 추천할 수 있습니다.</p>
        </div>
      );
    }

    if (status === 'ready' && selectedMenu) {
      return <RecommendationCard menu={selectedMenu} />;
    }

    return (
      <div className="status-card">
        <p className="status-label">추천 대기</p>
        <h2>버튼 한 번으로 오늘 점심을 골라보세요.</h2>
        <p>필터 UI 없이 메뉴 목록에서 무작위로 하나를 추천합니다.</p>
      </div>
    );
  };

  return (
    <main className="app">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Lunch Menu Recommendation</p>
          <h1>점심 메뉴 추천 v2</h1>
          <p className="description">
            버튼 한 번으로 메뉴를 추천합니다.
          </p>
        </div>

        <div className="action-panel">
          <button
            className="recommend-button"
            type="button"
            onClick={handleRecommendClick}
            disabled={status === 'loading' || status === 'error'}
          >
            메뉴 추천받기
          </button>
          <p className="helper-text">
            현재 버전은 필터 없이 랜덤 추천만 지원합니다.
          </p>
        </div>
      </section>

      <section className="result-panel" aria-live="polite">
        {renderResult()}
      </section>
    </main>
  );
}

export default App;
