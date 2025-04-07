import './LoadingSpinner.css';

/**
 * LoadingSpinner component displayed while the 3D model is loading
 * Includes punk-themed loading animation
 */
const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="logo-spinner">
          <span className="letter">P</span>
          <span className="letter">u</span>
          <span className="letter">n</span>
          <span className="letter">k</span>
          <span className="letter">D</span>
          <span className="letter">'</span>
          <span className="letter">B</span>
          <span className="letter">o</span>
          <span className="letter">n</span>
          <span className="letter">o</span>
        </div>
        
        <div className="guitar-loader">
          <div className="guitar-body"></div>
          <div className="guitar-neck"></div>
          <div className="guitar-strings">
            <div className="string"></div>
            <div className="string"></div>
            <div className="string"></div>
            <div className="string"></div>
            <div className="string"></div>
            <div className="string"></div>
          </div>
        </div>
        
        <h3 className="loading-text">Loading Diorama</h3>
        <p className="loading-subtext">Get ready to rock...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;