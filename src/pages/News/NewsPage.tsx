import './NewsPage.css';

/**
 * News page component with featured Spanish article about 360° video
 */
const NewsPage = () => {
  return (
    <div className="news-page">
      <div className="page-header">
        <h1>Lo último...</h1>
      </div>
      
      <div className="news-container">
        <article className="news-card spanish-article featured">
          <div className="card-image">
            <a href="https://www.youtube.com/watch?v=EH3Y3F6RVhU">
              <img src="https://img.youtube.com/vi/EH3Y3F6RVhU/maxresdefault.jpg" alt="Video 360" />
            </a>
            <div className="card-tag">Nuevo</div>
          </div>
          <div className="card-content">
            <h3>¡Nuevo Videoclip en 360° Ya Disponible!</h3>
            <p>
              ¡Estamos emocionados de anunciar el lanzamiento de nuestro nuevo videoclip en formato 360°! 
              Esta experiencia inmersiva para nuestra canción "DIEZMO" permite a los fans 
              sentirse como si estuvieran en medio de uno de nuestros conciertos. 
            </p>
            <p>
              Visita nuestro canal de YouTube para ver el video completo y experimenta 
              la intensidad de PunkD'Bono como nunca antes.
            </p>
            <a href="https://www.youtube.com/watch?v=EH3Y3F6RVhU" className="read-more" target="_blank" rel="noopener noreferrer">Ver Video →</a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsPage;