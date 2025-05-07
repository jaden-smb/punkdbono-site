import './AboutPage.css';

/**
 * About page component with band information
 */
const AboutPage = () => {
  const bandMembers = [
    {
      id: 1,
      name: 'Juan Camilo',
      role: 'Cantante', // Singer in Spanish
      image: '/images/members/Juan-Camilo.jpg'
    },
    {
      id: 2,
      name: 'Luisa',
      role: 'Guitarrista', // Guitarist in Spanish
      image: '/images/members/Luisa.jpg'
    },
    {
      id: 3,
      name: 'Daniel',
      role: 'Bajista', // Bassist in Spanish
      image: '/images/members/Daniel.jpg'
    }
  ];
  
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About PunkD'Bono</h1>
      </div>
      
      <section className="band-members">
        <h2>Meet The Band</h2>
        <div className="band-section-container">
          <div className="members-grid">
            {bandMembers.map(member => (
              <div className="member-card member-card-3d" key={member.id}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} className="member-photo-3d" />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;