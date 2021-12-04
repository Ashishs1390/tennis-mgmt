import React, { useState, useEffect,useRef } from "react";
import YoutubeComponent from './youtube.component';
import {post} from "./../../api/axios.api";
import "./player.scss";

function VideoPlayerContainer(props) {
    const nameForm = useRef(null);
    const [startPlay, setStartPlay] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [mute, setMute] = useState(false);
    const [payBackSpeed, setPayBackSpeed] = useState(1);
    const [frames,setFrame] = useState([
        {
            frameId:"frame1",
            src:""
        },
        {
            frameId:"frame2",
            src:""
        },
        {
            frameId:"frame3",
            src:""
        },
        {
            frameId:"frame4",
            src:""
        }
    ]);
    const [youtubeId,setYouTubeId] = useState({})
    const playBackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

    const startAllVideos = () => {
        setStartPlay(true);
    };

    const pauseAllVideo = () => {
        setStartPlay(false);
    }

    const muteUnmute = (mute) => {
        setMute(mute);
    }

    

    const updatePlayBackSpeed = (event) => {
        setStartPlay(true);
        setPayBackSpeed(event.target.value);
    }
    const getIdFromUrl =(url,id)=>{
        var videoid = url.match(
          /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
        );
        if (videoid != null) {
        return {[id]:videoid[1]
        }
        //   console.log("video id = ", videoid[1]);
        } else {
          console.log("The youtube url is not valid.");
        }
    }
    const postVideoUrls = async(postObj)=>{
        let returnedData = await post('/api/tennismgmt/videoanalysis',{...postObj}).catch((err)=>{
            console.log(err);        
        })
        if(returnedData){
            returnedData = returnedData.data.data
            setYouTubeId({...returnedData});
        }
    }

    const submitFrameInfo = () =>{
        const arr = [];
        frames.forEach((frame)=>{
            if(frame.src !== ""){
                const frameObj = getIdFromUrl(frame.src,frame.frameId);
                arr.push(frameObj)
            }
        });
        const finalObj = arr.reduce((acc,cur)=>{
            if(acc){
                acc = {...acc,...cur};
            }
            return acc;
        },{})
        finalObj.date = new Date().toISOString();
        postVideoUrls(finalObj)
    }

    const setDynamicValue = (event) =>{
        const {id,value} = event.target;
            let newFrame = frames.map((f)=>{
                if(id ==f.frameId){
                    f.src = value;
                }
                return f;
            })
        setFrame(newFrame)
    }    
    return (
        <div className="video-player-container">
            <ul className="video-item-list">
                {  frames.map((ele)=>{
                    return(
                        <li className="video-item" key = {ele.frameId}> 
                            <div>
                                <YoutubeComponent isStart={startPlay} startTime={startTime} id={youtubeId[ele.frameId]} isMute={mute} playbackSpeed={payBackSpeed}/>
                            </div>
                            <div>
                              
                                <input id = {ele.frameId} value = {ele.src} onChange= {setDynamicValue}  ></input>
                              
                            </div>
                        </li>
                    )
                   
                })
                   
                }
               
                
            </ul>
            <button onClick={() => submitFrameInfo()}>submit</button>

            <div className="video-player-controls" style={{paddingLeft: '50px'}}>
            { !startPlay && <button onClick={startAllVideos} style={{marginLeft: '10px'}}>Play</button> }
            { startPlay && <button onClick={pauseAllVideo}  style={{marginLeft: '10px'}}>Pause</button> }
            { !mute && <button onClick={ () => {muteUnmute(true)}}  style={{marginLeft: '10px'}}>Mute</button> }
            { mute && <button onClick={() => {muteUnmute(false)}}  style={{marginLeft: '10px'}}>Unmute</button> }
            <select defaultValue={1} onChange={updatePlayBackSpeed}  style={{marginLeft: '10px'}}>
                {
                    playBackSpeeds.map((x, i) => {
                        return <option key={i} value={x}>{x}</option>;
                    })
                }
            </select>
            <input style={{marginLeft: '10px'}} type="range" name="vol" min="0" max="5000" style={{width: '500px'}} onChange={(event) => {
                setStartTime(event.target.value);    
            }}></input><span>{(startTime/60).toFixed(2)} (sec)</span>
            </div>
        </div>
    );
}
  
export default VideoPlayerContainer;
