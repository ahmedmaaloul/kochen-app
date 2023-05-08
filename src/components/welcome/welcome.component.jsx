import Typewriter from "typewriter-effect";
import "./welcome.component.scss"
const Welcome = () => {
  const phrases = ["Share Your Dbara", "Show your art","Find your next Dbara"];
  return (
      <div className="container d-flex flex-column align-items-center">
        <h1 className="marketing-text">la meilleure #1 platforme de partages des recettes</h1>
        <h1 className="welcome-title"><span className="logo-name">Kochen.</span></h1>
        <Typewriter 
          options={{
            strings: phrases,
            autoStart: true,
            loop: true,
          }}
        />
      </div>
  );
};

export default Welcome;
