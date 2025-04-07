import Footer from '../../components/Footer/Footer';
import './AboutPage.css';

/**
 * About page component with band information
 */
const AboutPage = () => {
  const bandMembers = [
    {
      id: 1,
      name: 'Alex Riot',
      role: 'Lead Vocals & Guitar',
      image: 'https://source.unsplash.com/random/300x300/?punk-singer',
      bio: 'Founding member Alex brings raw energy and poetic lyrics to the band. With a background in classical music, Alex rebels against convention while drawing on traditional techniques.'
    },
    {
      id: 2,
      name: 'Sarah Drums',
      role: 'Drums & Percussion',
      image: 'https://source.unsplash.com/random/300x300/?drummer',
      bio: "The rhythmic backbone of PunkD'Bono, Sarah's innovative beats blend traditional punk with electronic and global influences. Self-taught since age 12, she's known for her marathon performances."
    },
    {
      id: 3,
      name: 'Mike Rebellion',
      role: 'Bass & Backing Vocals',
      image: 'https://source.unsplash.com/random/300x300/?bassist',
      bio: "With a deep foundation in jazz and punk, Mike creates the sonic foundation that bridges the gap between melody and rhythm in our music. His distinctive bass lines are a band signature."
    },
    {
      id: 4,
      name: 'Jess Harmony',
      role: 'Lead Guitar & Synth',
      image: 'https://source.unsplash.com/random/300x300/?guitarist',
      bio: "The newest member of PunkD'Bono brings technical expertise and experimental sound design to our music. Classically trained but street-hardened, Jess pushes our sonic boundaries."
    }
  ];
  
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About PunkD'Bono</h1>
        <p>Get to know the band behind the music</p>
      </div>
      
      <section className="band-story">
        <div className="about-container">
          <div className="about-image">
            <img src="https://source.unsplash.com/random/1000x600/?punk-band" alt="PunkD'Bono Band" />
          </div>
          
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              PunkD'Bono was formed in 2020 when four musicians from different backgrounds came together 
              with a shared vision: to revitalize punk music for the modern era while staying true to its 
              rebellious roots and DIY ethos.
            </p>
            <p>
              What started as late-night jam sessions in a cramped basement quickly evolved into a tight-knit 
              musical collective that caught the attention of the underground scene with our raw energy and 
              thought-provoking lyrics.
            </p>
            <p>
              Our name, PunkD'Bono, represents the duality of our sound—aggressive and uncompromising, yet 
              melodic and purposeful. We draw inspiration from classic punk acts like The Clash and Bad Brains, 
              while incorporating elements of electronic music, post-punk, and global sounds.
            </p>
            <p>
              After releasing our debut EP "First Revolt" in 2021, we embarked on a series of guerilla gigs 
              and pop-up performances, building a dedicated following that resonates with our message of 
              authenticity and resistance to commercialization.
            </p>
            <p>
              Our philosophy is simple: create honest music that challenges the status quo, foster an inclusive 
              community, and never compromise our artistic integrity for commercial success. Every show is 
              an opportunity to connect with our fans and spread the message that music can be a powerful 
              catalyst for personal and social change.
            </p>
          </div>
        </div>
      </section>
      
      <section className="band-members">
        <h2>Meet The Band</h2>
        <div className="members-grid">
          {bandMembers.map(member => (
            <div className="member-card" key={member.id}>
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="philosophy-section">
        <div className="philosophy-container">
          <div className="philosophy-content">
            <h2>Our Philosophy</h2>
            <p>
              At the core of PunkD'Bono is a commitment to authenticity, artistic freedom, and social awareness. 
              We believe that music should challenge listeners, provoke thought, and inspire action.
            </p>
            <p>
              While we honor the traditions of punk rock, we're not bound by its conventions. Our sound 
              is constantly evolving as we experiment with new influences and techniques, always pushing 
              ourselves to grow as artists.
            </p>
            <p>
              We remain proudly independent, handling everything from recording to merchandise design ourselves. 
              This DIY approach allows us to maintain complete creative control and build a direct relationship 
              with our fans.
            </p>
            <p>
              Beyond the music, we're dedicated to creating a safe and inclusive space at our shows where 
              everyone is welcome regardless of background or identity. The punk spirit is about unity in 
              diversity and standing up for what's right.
            </p>
            <p>
              As we look to the future, our goal is to continue challenging ourselves and our audience, 
              using music as a vehicle for connection, expression, and positive change in an increasingly 
              fragmented world.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;