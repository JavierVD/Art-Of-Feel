import React from "react";
import butterchurn from "butterchurn";
import { useNavigate } from "react-router-dom";
import butterchurnPresets from "butterchurn-presets";
import '/css/botonchido.css';

export default function RootFunction (){
  const navigation = useNavigate(); // extract navigation prop here 
  
   return <MainMenu navigation={navigation} /> //pass to your component.
  
}
class MainMenu extends React.Component {
  constructor(props){
    super(props);
    this.clickSound = this.clickSound.bind(this);
  }
  state={
    label: "HOLA",
    audio: null,
    cssClass: 'fade-in'
  };
  state = {
    visualizer: null,
    audioContext: null,
    canvas: null,
  };
  state = {
    visualizer: null,
    audioContext: null,
    canvas: null,
    width: "",
    height: "",
    fullscreen: false,
    presets: ['yin - 191 - Temporal singularities',
    'suksma - uninitialized variabowl (hydroponic chronic)',
    'suksma - Rovastar - Sunflower Passion (Enlightment Mix)_Phat_edit + flexi und martin shaders - circumflex in character classes in regular expression',
    'suksma - heretical crosscut playpen',
    'shifter - escape (sigur ros)',
    'shifter - dark tides bdrv mix 2',
    'martin - stormy sea (2010 update)',
    'martin [shadow harlequins shape code] - fata morgana',
    'martin - glass corridor',
    'martin - castle in the air']
  };
  clickSound = (dir)=>{
    this.state.audio.play();
    this.setState({cssClass: 'fadeOut'});
    setTimeout(() => {this.props.navigation(dir)}, 1000);
    
  }
  
  componentDidMount = () => {
    this.setState({ presets: butterchurnPresets.getPresets() });
    this.setState({label: "", audio: new Audio('/audio/click1.wav'), cssClass: 'fadeIn' });
    //get width of screen we will make this auto adjust later.
    const width = 270;
    const height = 350;

    //get state of canvas visualizer and audio context
    let { canvas, visualizer, audioContext } = this.state;

    //get canvas
    canvas = document.getElementById("canvas");

    //set width and height of canvas
    canvas.width = width;
    canvas.height = height;

    //create a new audio context
    audioContext = new AudioContext();

    //create visualizer with butterchurn
    visualizer = butterchurn.createVisualizer(audioContext, canvas, {
      width: width,
      height: height
    });

    //intialize with default values
    this.visualizerIntializer(visualizer, audioContext, canvas, width, height);

  };

  visualizerIntializer = async (
    visualizer,
    audioContext,
    canvas,
    width,
    height
  ) => {
    visualizer.setRendererSize(width, height);
    this.setState({
      visualizer,
      audioContext,
      canvas,
      width,
      height
    });
    this.renderFrames();
    await setTimeout(() => {}, 500);

    this.randomPresets(visualizer);
  };
  renderFrames = () => {
    let { visualizer } = this.state;
    if (visualizer) {
      visualizer.render();
    }
    setTimeout(() => {
      this.renderFrames(visualizer);
    }, 1000 / 120);
  };
  randomPresets = (visualizer) => {
    let { presets } = this.state;
    let tempPresets = presets;

    console.log(Object.keys(tempPresets).length);

    if (Object.keys(tempPresets).length === 0) {
      tempPresets = butterchurnPresets.getPresets();
    }
    const selected = ['yin - 191 - Temporal singularities',
    'suksma - Rovastar - Sunflower Passion (Enlightment Mix)_Phat_edit + flexi und martin shaders - circumflex in character classes in regular expression',
    'suksma - heretical crosscut playpen',
    'shifter - escape (sigur ros)',
    'shifter - dark tides bdrv mix 2',
    'martin - stormy sea (2010 update)',
    'martin [shadow harlequins shape code] - fata morgana',
    'martin - glass corridor',
    'martin - castle in the air'];
    let randomPreset = this.randomProperty(selected);
    console.log("Random: " + randomPreset);
    if (visualizer) {
      visualizer.loadPreset(tempPresets[selected[randomPreset]], 2); // 2nd argument is the number of seconds to blend presets
    }
    setTimeout(() => {
      return this.randomPresets(visualizer);
    }, 3000);
  };
  randomProperty = (obj) => {
    const key = Object.keys(obj);
    return key[Math.floor(Math.random() * key.length)];
  };



  render() {
    return (
      <div className={this.state.cssClass}>

        <div className="main-container">
          <div onClick={()=>{this.clickSound('Brain')}} onMouseOver={()=> this.setState({label: 'Brain'})} className="zoom appear-text">
            <canvas className="fit-to-div" id="canvas" />
          </div>
          <div onClick={()=>this.clickSound('/Brain')} onMouseOver={()=> this.setState({label: 'Feelings'})} className="zoom appear-text">
              <img  className="fit-to-div" src="/images/musicanalyzer.png" />
          </div>
          <div onClick={()=>this.clickSound('/Brain')} onMouseOver={()=> this.setState({label: 'Player'})} className="zoom appear-text">
            <img className="fit-to-div" src="/images/learning.png" />
          </div>


        </div>
        <div className="hide-text">
            {this.state.label}
        </div>

      </div>

    );
  }
}
