import React from 'react';
import Footer from '../../components/Footer/Footer';
import './BlogPage.css';

/**
 * Blog page with blog posts
 */
const BlogPage = () => {
  return (
    <div className="blog-page">
      <div className="page-header">
        <h1>PunkD'Bono Blog</h1>
        <p>Latest updates, stories, and thoughts from the band</p>
      </div>
      
      <div className="blog-container">
        <article className="blog-post">
          <div className="post-header">
            <h2>Tour Diary: European Underground</h2>
            <div className="post-meta">
              <span className="post-date">April 1, 2025</span>
              <span className="post-author">by Mike Rebellion</span>
            </div>
          </div>
          <div className="post-content">
            <p>
              Our recent European tour was nothing short of life-changing. From the crowded basements 
              of Berlin to the historic venues of Barcelona, every night was a testament to the power 
              of punk music to bring people together across cultural and language barriers.
            </p>
            <p>
              The crowd in Prague was particularly memorable. Despite the language differences, everyone 
              sang along to our anthem "Resist the System" with such passion that the venue's foundations 
              were literally shaking. There's something truly magical about seeing hundreds of lighters 
              in the air during our acoustic finale.
            </p>
            <p>
              We also had the chance to collaborate with local bands, incorporating traditional 
              instruments and regional styles into our performances. These impromptu jam sessions 
              often turned into all-night parties that continued long after the venues closed.
            </p>
            <a href="#" className="read-more">Read More →</a>
          </div>
        </article>
        
        <article className="blog-post">
          <div className="post-header">
            <h2>Behind the Scenes: Our New Album Production</h2>
            <div className="post-meta">
              <span className="post-date">March 15, 2025</span>
              <span className="post-author">by Sarah Drums</span>
            </div>
          </div>
          <div className="post-content">
            <p>
              Recording our new album "Anarchy in Harmony" was an intense three-month journey. We chose 
              to work with producer Jack Richards, known for his raw, unfiltered approach to capturing 
              punk authenticity while still delivering a modern sound.
            </p>
            <p>
              The studio became our home - literally. We set up sleeping bags between the equipment and 
              often recorded at 3 AM when inspiration struck. Some of our best tracks emerged from sleep-deprived 
              jam sessions fueled by nothing but coffee and passion.
            </p>
            <p>
              We experimented with vintage analog equipment, including a 1970s mixing console that once 
              belonged to The Clash. The warm, gritty texture it added to our sound became a signature 
              element of the album, bridging the gap between classic punk and our contemporary approach.
            </p>
            <a href="#" className="read-more">Read More →</a>
          </div>
        </article>
        
        <article className="blog-post">
          <div className="post-header">
            <h2>The Politics of Punk in 2025</h2>
            <div className="post-meta">
              <span className="post-date">February 28, 2025</span>
              <span className="post-author">by Alex Riot</span>
            </div>
          </div>
          <div className="post-content">
            <p>
              Punk has always been about challenging the status quo, and in 2025, that mission is more relevant 
              than ever. As corporations continue to dominate the cultural landscape, independent voices like 
              ours become increasingly important as counterpoints to mainstream narratives.
            </p>
            <p>
              Our upcoming single "Digital Resistance" addresses the growing concerns about privacy and 
              surveillance in our hyperconnected world. We believe artists have a responsibility to address 
              these issues and provoke important conversations through our music.
            </p>
            <p>
              But punk isn't just about anger and rebellion - it's about building community and offering 
              alternatives. That's why we've started a series of workshops in disadvantaged neighborhoods, 
              teaching kids how to play instruments and express themselves through music.
            </p>
            <a href="#" className="read-more">Read More →</a>
          </div>
        </article>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPage;