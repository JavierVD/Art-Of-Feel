import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

function Text() {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: "1500" },
      })
    return <div style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
            <animated.div style={styles}>
              <img className="center-main" style={{height: '12vh', width: '17vw'}} src={'/images/splashscreen.png'}/>
            </animated.div>
        </div>
  }

function Welcome() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
          navigate('/HomePanel');
        }, 3000)
      }, [])
    return (
        <div className="col-lg-8 col-xs-12 col-centered" style ={{backgroundColor: '#000'}}>
            <Text/>
        </div>

    );
}

export default Welcome;

if (document.getElementById('welcome')) {
    ReactDOM.render(<Welcome />, document.getElementById('welcome'));
}

