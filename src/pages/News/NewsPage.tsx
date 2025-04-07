import React from 'react';
import Footer from '../../components/Footer/Footer';
import './NewsPage.css';

/**
 * News page component with articles
 */
const NewsPage = () => {
  return (
    <div className="news-page">
      <div className="page-header">
        <h1>Latest News</h1>
        <p>Stay updated with the latest from PunkD'Bono</p>
      </div>
      
      <div className="news-container">
        <article className="news-article featured">
          <div className="article-image">
            <img src="https://source.unsplash.com/random/1200x600/?concert" alt="New Album" />
            <div className="article-tag">Just Announced</div>
          </div>
          
          <div className="article-content">
            <h2>New Album "Anarchy in Harmony" Coming This Summer</h2>
            <div className="article-meta">
              <span className="date">April 1, 2025</span>
              <span className="category">Albums</span>
            </div>
            
            <p className="article-excerpt">
              PunkD'Bono is thrilled to announce our new album "Anarchy in Harmony" will be
              released on July 15, 2025. This 12-track masterpiece represents our most ambitious
              work to date, blending our signature punk sound with experimental elements.
            </p>
            
            <p>
              Recorded over three months in the legendary Underground Studios, the album features
              collaborations with several underground artists and showcases our evolution as musicians.
              The first single "Digital Rebellion" will be released next month along with a 
              groundbreaking visual experience.
            </p>
            
            <p>
              "This album is our response to the chaotic world we live in," says lead vocalist Alex Riot.
              "We wanted to create something that captures both the anger and the hope of our generation."
            </p>
            
            <p>
              The album will be available on all major streaming platforms, with limited edition
              vinyl featuring exclusive artwork by renowned street artist VisionX. Pre-orders start
              next week, with special packages including signed merchandise and exclusive digital content.
            </p>
            
            <p>
              Following the album release, we'll be embarking on a global tour covering 20 cities
              across Europe and North America. Fan club members will get early access to tickets starting
              May 1st, with general sales beginning May 5th.
            </p>
          </div>
        </article>
        
        <div className="news-grid">
          <article className="news-card">
            <div className="card-image">
              <img src="https://source.unsplash.com/random/600x400/?tour" alt="Tour Announcement" />
            </div>
            <div className="card-content">
              <h3>Summer Tour Dates Announced</h3>
              <div className="card-meta">
                <span className="date">March 25, 2025</span>
                <span className="category">Tours</span>
              </div>
              <p>
                Get ready for our biggest tour yet! We're hitting 20 cities across Europe and North America
                starting this August.
              </p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </article>
          
          <article className="news-card">
            <div className="card-image">
              <img src="https://source.unsplash.com/random/600x400/?award" alt="Award Nomination" />
            </div>
            <div className="card-content">
              <h3>Nominated for Underground Music Awards</h3>
              <div className="card-meta">
                <span className="date">March 15, 2025</span>
                <span className="category">Awards</span>
              </div>
              <p>
                PunkD'Bono has been nominated for "Best Punk Act" and "Most Innovative Sound" at this year's
                Underground Music Awards.
              </p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </article>
          
          <article className="news-card">
            <div className="card-image">
              <img src="https://source.unsplash.com/random/600x400/?collaboration" alt="Collaboration" />
            </div>
            <div className="card-content">
              <h3>Surprise Collaboration with Electronic Artist DigitalRiot</h3>
              <div className="card-meta">
                <span className="date">February 28, 2025</span>
                <span className="category">Music</span>
              </div>
              <p>
                We've teamed up with electronic music producer DigitalRiot for a genre-bending EP to be
                released exclusively on vinyl and digital platforms.
              </p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </article>
          
          <article className="news-card">
            <div className="card-image">
              <img src="https://source.unsplash.com/random/600x400/?documentary" alt="Documentary" />
            </div>
            <div className="card-content">
              <h3>Documentary "Punk Revolution" to Feature PunkD'Bono</h3>
              <div className="card-meta">
                <span className="date">February 15, 2025</span>
                <span className="category">Media</span>
              </div>
              <p>
                An upcoming documentary about the modern punk revival will feature exclusive interviews
                and behind-the-scenes footage of our band.
              </p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </article>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NewsPage;