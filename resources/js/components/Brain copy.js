import '/css/brain.css';
import React, {useRef, useState, useCallback} from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import requestPromise from 'request-promise';

const MySwal = withReactContent(Swal);

function BackgroundParticles ({shapeForm, arr}){
    const options = {
        fpsLimit: 120,
        fullScreen: {
          enable: true
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            resize: true
          },
          modes: {
            bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
            grab: { distance: 400, links: { opacity: 1 } },
            push: { quantity: 4 },
            remove: { quantity: 2 },
            repulse: { distance: 200, duration: 0.4 }
          }
        },
        particles: {
          color: { value: "#ffffff"},
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            bounce: false,
            direction: "none",
            enable: true,
            out_mode: "out",
            random: false,
            speed: 3,
            straight: false
          },
          number: { density: { enable: true, area: 800 }, value: 100 },
          opacity: {
            animation: { enable: true, minimumValue: 0.3, speed: 1, sync: false },
            random: true,
            value: 1
          },
          shape: {
            character: [
              {
                fill: true,
                font: "Verdana",
                value: ['my shit'],
                style: "",
                weight: 400
              }
            ],
            polygon: { nb_sides: 5 },
            stroke: { color: "white", width: 1 },
            type:  'circle'
          },
          size: {
            value: { min: 1, max: 6 },
          }
        },
        detectRetina: true
    }
    const options2 = {
        fpsLimit: 120,
        fullScreen: {
          enable: true
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            resize: true
          },
          modes: {
            bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
            grab: { distance: 400, links: { opacity: 1 } },
            push: { quantity: 4 },
            remove: { quantity: 2 },
            repulse: { distance: 200, duration: 0.4 }
          }
        },
        particles: {
          color: { value: "#ffffff"},
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            bounce: false,
            direction: "none",
            enable: true,
            out_mode: "out",
            random: false,
            speed: 3,
            straight: false
          },
          number: { density: { enable: true, area: 800 }, value: 100 },
          opacity: {
            animation: { enable: true, minimumValue: 0.3, speed: 1, sync: false },
            random: true,
            value: 1
          },
          shape: {
            character: [
              {
                fill: true,
                font: "Verdana",
                value: arr,
                style: "",
                weight: 400
              }
            ],
            polygon: { nb_sides: 5 },
            stroke: { color: "white", width: 1 },
            type:  'char'
          },
          size: {
            value: { min: 1, max: 6 },
          }
        },
        detectRetina: true
    }
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
      }, []);
    
      const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
        console.log(shapeForm)
      }, []);

    return(
        <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={!shapeForm? options:options2}
      />
    );
}
export default function Brain(){
    const inputFile = useRef(null);
    const musicfile = useRef(null)
    const [cssClass, setcssClass] = useState('fadeIn')
    const navigate = useNavigate();
    const reader = new FileReader();
    const [shape, setShape] = useState(false);
    const [string, setString] =useState([]);
    const [playlist, setPlaylist] = useState("");
    const fileChange = e => {
        const file = e.target.files[0];
        console.log(file.type)
        if(file === undefined) {
            MySwal.fire({
                icon: 'error',
                title: 'Incorrect File',
                text: 'Only CSV Files!',
                
              })
        
        } else if(file.type === "text/csv") {
            reader.readAsText(file);
            reader.onload = function(e) {
                const str = e.target.result, delim =",";
                const headers = str.slice(0,str.indexOf('\n')).split(delim);
                const rows = str.slice(str.indexOf('\n')+1).split('\n');
        
                const newArray = rows.map( row => {
                    const values = row.split(delim);
                    const eachObject = headers.reduce((obj, header, i) => {
                        obj[header] = values[i];
                        return obj;
                    }, {})
                    return eachObject;
                });
                var counter = 0;
                var stringTemp = [];

                for (const element of newArray){
                    if(counter <100)
                        stringTemp.push(element['title'])
                    else
                        break;
                    counter++;

                };
                console.log(stringTemp);
                setShape(true);
                setString(stringTemp);
            }
            
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Incorrect File',
                text: 'Only CSV Files!',
                
              })
        }
    }
    const loadPlaylist = (playlistUri)=>{
      
    }
    return(
        <div className={cssClass + " brain-background"}>
            <BackgroundParticles shapeForm={shape} arr={string}/>
            <input type='file' id='file' onChange={fileChange} ref={inputFile} style={{display: 'none'}}/>
            <div className="brain"></div>
            <div className='center-brain-buttons'>
                <a onClick={()=> {Swal.fire({
                  imageUrl: '/images/spotify_logo.png',
                  imageWidth: 340,
                  imageHeight: 100,
                  input: 'text',
                  inputAttributes: {
                    color: '#fff'
                  },
                  preConfirm: (playlistUri)=>{
                    loadPlaylist(playlistUri);
                    
                  },
                  confirmButtonColor: '#206078',
                  confirmButtonText: 'OK',  
                  background: '#000',
                  backdrop: `
                  rgba(0,0,0,0.4)
                `
                })}}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Spotify
                </a>
                <a onClick={()=> {musicfile.current.click()}}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Load Music
                </a>
                <a onClick={()=> {setcssClass('fadeOut'), setTimeout(()=>{navigate('/HomePanel/TrainingProgress')}, 1000)}}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Start training
                </a>
                <a onClick={()=> {setcssClass('fadeOut'), setTimeout(()=>{navigate('/HomePanel')}, 1000)}}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Back
                </a>
            </div>

        </div>

    );
}