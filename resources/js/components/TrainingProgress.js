import React, {useState, useEffect, useRef, useCallback} from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Sound from 'react-sound';
import '/css/trainingProgress.css';
import '/css/brain.css';
export default function TrainingProgress (){
    const [cssClass, setcssClass] = useState('fadeIn');

    

    return(
    <div className={cssClass }>
        <div className="brain">
            <div class="circles">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
                <div class="circle5"></div>
                <div class="circle6"></div>
                <div class="circle7"></div>
                <div class="circle8"></div>
                <div class="circle9"></div>
                <div class="circle10"></div>
                <div class="circle11"></div>
                <div class="circle12"></div>
                <div class="circle13"></div>
                <div class="circle14"></div>
                <div class="circle15"></div>
            </div>
        </div>
    </div>
    );
}