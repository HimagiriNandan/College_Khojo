//React file imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// services
import { paths } from '../../Application/Services';

//css and animations imports
import '../Styles/Paths.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

//Path Component

const Path = ({ index, path }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  return (
    <div onClick={()=>{navigate("/exam/"+index); window.scrollTo(0,0)}} className="path">
      <h2>{path.name}</h2>
      <div className="path-infor">
        <h2>Duration</h2>
        <p className="tag">{path.duration}</p>
      </div>
      <div className="path-infor">
        <h2>Months</h2>
        {path.months.map((month, index) => {
          return <p key={index} className="tag">{month}</p>;
        })}
      </div>
      <h1 className="path-explanation">{path.description.length<400 ? path.description : path.description.slice(0,400)}</h1>
    </div>
  );
};

const Paths = () => {

  const [pathdata, setPathData] = useState(paths);

  const showMorePaths = () => {
    if (pathdata.length !== paths.length) {
      setPathData(paths.slice(0, pathdata.length + 1));
    }
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out'
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setPathData(paths.slice(0, 2));
      } else {
        setPathData(paths.length > 4 ? paths.slice(0, 4) : paths);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="paths-cont" data-aos="fade-up">
          {pathdata.map((pat, index) => {
            return (
              <Path index={index} path={pat} />
            );
          })}
        </div>
      </div>
      {
        (pathdata.length === paths.length) ? null : <button id="path-show-btn" data-aos="fade-up" onClick={showMorePaths} className="herobutton">Show more</button>
      }
    </div>
  );
};

export default Paths;
