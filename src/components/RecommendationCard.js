import { useEffect, useState } from 'react';
import placeholderImage from '../assets/menu-placeholder.svg';

function RecommendationCard({ menu }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [menu.id, menu.imageUrl]);

  return (
    <article className="recommendation-card">
      <div className="card-media">
        <img
          src={imageFailed ? placeholderImage : menu.imageUrl}
          alt={`${menu.name} 메뉴 이미지`}
          onError={() => setImageFailed(true)}
        />
        {imageFailed ? (
          <span className="image-badge">이미지 대체 표시</span>
        ) : (
          <span className="image-badge">추천 메뉴</span>
        )}
      </div>

      <div className="card-body">
        <p className="card-category">{menu.category}</p>
        <h2>{menu.name}</h2>
        <p className="card-description">{menu.description}</p>
      </div>
    </article>
  );
}

export default RecommendationCard;
