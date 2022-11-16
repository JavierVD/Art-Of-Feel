import React, {useState, useEffect, useRef, useCallback} from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Sound from 'react-sound';
import '/css/botonchido.css';
import RootFunction from './MainMenu';
import Brain from './Brain';
import TrainingProgress from './TrainingProgress';
function Welcome() {
    const navigate = useNavigate();
    const [playing, setPlaying] = useState(Sound.status.STOPPED);
    const [window, setWindow] = useState(null);
    const updateWindow = (newState)=>{
        setWindow(newState);
    }
    return (
        <div onClick ={()=>{setPlaying(Sound.status.PLAYING)}}className="center-main" style ={{backgroundColor: '#000'}}>
            <Sound
                url="/audio/soundtrack.mp3"
                playStatus={playing}
                autoLoad={true}
                volume={40}
                loop={true}
                onPlaying={console.log("Playing Audio")}
            />
            <Routes>
                <Route 
                    index
                    element={<RootFunction/>}
                />
                <Route
                    path='/Brain'
                    element={<Brain/>}
                />
                <Route
                    path='/TrainingProgress'
                    element={<TrainingProgress/>}
                />
            </Routes>
        </div>

    );
}

export default Welcome;

