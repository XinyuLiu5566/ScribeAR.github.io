import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import TopSpace from './components/TopSpace'
import AzureTopSpace from './components/AzureTopSpace'
import AzureCaptions from './components/AzureCaptions'
import Captions from './components/Captions'
import MiddleSpace from './components/MiddleSpace'
import PlaceHolder from "./components/PlaceHolder"
import { flip_recording, flip_switch_to_azure,
         flip_switchMenus, flip_entered_key,
         flip_correct_azureKey, flip_on_webspeech,
         flip_check_azureKey,
         flip_entered_region } from './redux/actions'
import store from './store'
import './App.css'
import swal from 'sweetalert';
import { resetWarningCache } from 'prop-types';


var i = 0;

export default function App() {
     const dispatch = useDispatch()
     const onWebspeech = useSelector((state) => state.onWebspeech)
     const enteredKey = useSelector((state) => state.enteredKey)
     const enteredRegion = useSelector((state) => state.enteredRegion)
     const correctAzureKey = useSelector((state) => state.correctAzureKey)
     const checkAzureKey = useSelector((state) => state.checkAzureKey)
     // Get global state from Redux. See the React Redux tutorial.
     const textSize = useSelector((state) => state.textSize)
     const recording = useSelector((state) => state.recording)
     const numLines = useSelector((state) => state.numLines)
     const invertColors = useSelector((state) => state.invertColors)
     const switchMenus = useSelector((state)=> state.switchMenus)
     const switchToAzure = useSelector((state) => state.switchToAzure)
     // Convert variables to CSS-friendly strings.
     var sizeString = textSize + 'vh'
     // Size of bottom space (text area) relative to text size and number of lines.
     var botHeight = 43 + 'vh'
     var topHeight = 9 + 'vh'
     var placeHeight = 5 + 'vh'
     var midHeight = 34 + 'vh'
     i = i + 1;
    //-----------------------
    //checks how often user is still on browser
    //currently set to checking every 1 hour(s)
    var timerCheck = 600000;
     //----------------------
     // var topHeight = 9 + 'vh'
     // var placeHeight = 5 + 'vh'
     // var midHeight = 34 + 'vh'
     //-----------------------
     // topHeight + botHeight should always = 100vh because we don't want the full
     // page to scroll (we only want the individual areas to scroll).
     //------------------------
     //checkAzureKey is changed changed HERE in normal return
     //isCorrectKey is done in AzureCaptions
     //azureKeyEntered is done in enter button

     var isRecording = recording ? true : false
     var switchmenus = switchMenus ? false : true
     var isEnteredKey = enteredKey ? true : false
     var isEnteredRegion = enteredRegion ? true : false
     var isCorrectKey = correctAzureKey ? true : false
     var isChecking = checkAzureKey ? true : false
     var wantsWebspeech = onWebspeech ? true : false
     var bgColor = invertColors ? 'white': 'black'
     var color = invertColors ? 'black' : 'white'
     if (store.azureKeyReducer == 'incorrect' && checkAzureKey == true) {
       store.azureKeyReducer = 'empty'
       dispatch(flip_entered_key())
       dispatch(flip_entered_region())
       dispatch(flip_check_azureKey())
     }
     if (store.isSuccessReducer == 'success' && isCorrectKey == false) {
       dispatch(flip_correct_azureKey())
     }
     if (bgColor == 'black') {
     if (checkAzureKey == true || isCorrectKey == true) {
       if (isRecording == true) {
         dispatch(flip_recording());
       }
       if (isCorrectKey == false && wantsWebspeech == true) {
         dispatch(flip_on_webspeech())
       }
      setInterval(checkIfStillHere, timerCheck);
         return (
              <div className="App-1" style={{
                   backgroundColor: 'black',
                   color: 'white',
                   overflow: 'hidden',
                   position: 'fixed',
                  }}>
                  <TopSpace color = {bgColor} />
                  <PlaceHolder color = {bgColor} textSize = {sizeString}/>
                  <MiddleSpace color = {bgColor}/>
                   <AzureCaptions textSize={sizeString} wantWebspeech={wantsWebspeech}/>
                   <Captions height={0} textSize={0} azureCaptionSuccess={wantsWebspeech} />
              </div>
         )
      }
    } else {
      if (checkAzureKey == true || isCorrectKey == true) {
      if (isRecording == true) {
        dispatch(flip_recording())
      }


      setInterval(checkIfStillHere, timerCheck);


        return (
             <div className="App-2" style={{
                  backgroundColor: 'white',
                  color: 'black',
                  overflow: 'hidden',
                  position: 'fixed',
                 }}>
                 <TopSpace color = {bgColor} />
                 <PlaceHolder color = {bgColor} textSize = {sizeString}/>
                 <MiddleSpace color = {bgColor}/>
                  <AzureCaptions  textSize={sizeString} wantWebspeech={wantsWebspeech} />
                  <Captions height={0} textSize={0}  azureCaptionSuccess={wantsWebspeech}/>
                  {/* <DNDTest /> */}
             </div>
        )
     }
   }
      // cases where azureKey is false but isrecording is not????

      if (bgColor == 'black') {
        if (isEnteredKey == true || isEnteredRegion == true) {
          dispatch(flip_check_azureKey())
          if (isRecording == true) {
            dispatch(flip_recording())
          }
        }
        return (
            <div className="App-1" style={{
                 backgroundColor: 'black',
                 color: 'white',
                 overflow: 'hidden',
                 position: 'fixed',
                }}>
                 <TopSpace color = {bgColor}/>
                 <PlaceHolder color = {bgColor} textSize = {sizeString}/>
                 <MiddleSpace color = {bgColor}/>
                 <Captions textSize={sizeString}  azureCaptionSuccess={true}/>


                 {/* <DNDTest /> */}
            </div>
       )
     } else {
       return (
            <div className="App-2" style={{
                 backgroundColor: 'white',
                 color: 'black',
                 overflow: 'hidden',
                 position: 'fixed',
                }}>
                 <TopSpace color = {bgColor} />
                 <PlaceHolder color = {bgColor} textSize = {sizeString}/>
                 <MiddleSpace color = {bgColor}/>
                 <Captions  textSize={sizeString}  azureCaptionSuccess={true}/>
                 {/* <DNDTest /> */}
            </div>
       )
     }
     // You can't comment in JSX.
     // The style tag is the easiest way to set style based on JS variables.

}

var timer = 30
,isTimerStarted = false;
var myTime;
function checkIfStillHere() {
  swal({
    title: 'Are you still here?',
    confirmButtonText: "OK",
    icon: 'warning',
    text: 'If you want to continue using Azure Recogition click ok.  \n You have ' + timer + ' seconds.',
    timer: !isTimerStarted ? timer * 1000 : undefined,

  }
  ).then(function(isConfirm) {
    if (isConfirm) {
      swal({
        title: 'Continue using Azure Recogition.',
        icon: 'success',
        timer: 2000,
        buttons: false,
      });
      timer = 30;
      clearTimeout(myTime);
    }
  });

  isTimerStarted = true;
    if(timer) {
        timer--;
        myTime = setTimeout(checkIfStillHere, 1000);
    } else {
      swal ({
        title: "Reloading...",
        icon: 'error',
        timer: 3000,
        buttons: false,
      });
      window.location.reload(true);
    }

}
