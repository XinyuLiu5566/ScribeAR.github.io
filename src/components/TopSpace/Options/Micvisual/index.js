import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './index.css'
import {forward_micVisual, backward_micVisual, prev_page} from '../../../../redux/actions'
import {Button, IconButton} from "@material-ui/core"
import MenuSwitch from"../../../PopMenu/MenuSwitch"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";


// This code only works if the initial state is Off. It's surprisingly way harder
// to get this to work if you want the inital state of the checkbox to be checked.

export default function Micvisual(props) {

    const mic = (state) => state.mic
    const setting = useSelector(mic) // Get current value of recording.
    // useDispatch returns the state modifying function, invoked below.
    const dispatch = useDispatch()
    let result = ""
    let text = ""

    // flip recording when space bar is pressed

     //const setting = useSelector(props.setting)
     // useDispatch returns the state modifying function, invoked below.

     if (setting == 0){
         result = "No Visualization"
         text = "None"
     }else if (setting == 1){
         result = "Line Visualization"
         text = "Line"
     }else if (setting == 2){
         result = "Spectrum Visualization"
         text = "Spectrum"
     }else{
         result = "Circular Visualization"
         text = "Circular"
     }

     return (
         <div className="audio_result">
             MONO
             <div className="audio_visual">
                 <IconButton color = 'inherit' onClick = {()=>(dispatch(backward_micVisual()))}>
                     <ArrowBackIosIcon />
                 </IconButton>
                 {text}
                 <IconButton color = 'inherit' onClick = {()=>(dispatch(forward_micVisual()))}>
                     <ArrowForwardIosIcon />
                 </IconButton>
             </div>
        </div>
         // <MenuSwitch title = {text}/>
          // <div className="audio_result">
          //     {result}
          //      <div className="audio_visual">
          //           <Button className="audio_plus" color = "inherit" variant = "outlined"
          //                onClick={() => dispatch(flip_micVisual())} >{text}
          //           </Button>
          //
          //      </div>
          // </div>
     )
}
