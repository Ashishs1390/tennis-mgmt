import React, { useState, useEffect,useRef } from "react";
import YoutubeComponent from './youtube.component';
import { connect } from "react-redux";
import {post} from "./../../../api/axios.api";
import "./player.scss";
import { useLocation,useParams } from "react-router-dom";
import {fetchVideo}  from "./../../../redux/index";

function VideoPlayerContainer(props) {
    const {fetchVideo,videoInfo:{videoData},error, videoAnalysis, showPlayerVideo} = props;
    const [startPlay, setStartPlay] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [mute, setMute] = useState(false);
    const [payBackSpeed, setPayBackSpeed] = useState(1);
    const {from} = useParams();
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
    const [youtubeId,setYouTubeId] = useState({});
    

    const [errMsg,setErrorMsg] = useState({})
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


    useEffect(()=>{
        fetchVideo();
    },[])

    useEffect(()=>{
        if(from == "analysis" && !showPlayerVideo){
            if(videoData && videoData.length != 0){
                setYouTubeId({...videoData})
                pauseAllVideo();

            }else{
                setErrorMsg({...error})
            }
        }
    },[videoData]);

    useEffect(() => {
        
        if(from == "strockanalysislist" || showPlayerVideo){
            let framesData = [...videoAnalysis.selectedVideos];
            framesData = framesData.map(x => {
                return {frameId: x.src, src: 0};
            });
            framesData.length > 0 && setFrame(framesData);
        }
       

    }, [videoAnalysis.selectedVideos]);

    useEffect(()=>{
       
    },[youtubeId])

    
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
        } else {
          console.log("The youtube url is not valid.");
        }
    }
    const postVideoUrls = async(postObj)=>{
        let returnedData = await post('/api/tennismgmt/videoanalysis',{...postObj}).catch((err)=>{
            console.log(err);        
        })
        if(returnedData){
            setFrame([
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
            ])
            returnedData = returnedData.data.data;
            returnedData = JSON.parse(JSON.stringify(returnedData))
            setYouTubeId({...returnedData});
        }else{
            console.log("error")
        }
    }
    const submitFrameInfo = () =>{
        const arr = [];
        console.log("----------------------------")
        console.log(frames);
        console.log(youtubeId)

        frames.forEach((frame)=>{
            // console.log(youtubeId[yt])
            console.log(frame.src);
            console.log(!frame.src.includes(youtubeId[frame.frameId]))
            if(!frame.src.includes(youtubeId[frame.frameId])){
                if(frame.src !== ""){
                    const frameObj = getIdFromUrl(frame.src,frame.frameId);
                    arr.push(frameObj)
                }         
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
        console.log(event.target)
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
            
                {  frames.map((ele, i)=>{
                    return(
                        <li className="video-item" key = {ele.frameId + i}> 
                            <div>
                                <YoutubeComponent isStart={startPlay} startTime={startTime} id={ele.src !== 0 ? youtubeId[ele.frameId] : ele.frameId} isMute={mute} playbackSpeed={payBackSpeed}/>
                            </div>
                            <div>
                                {ele.src !== 0 && <input id = {ele.frameId} value = {ele.src} onChange= {setDynamicValue}  ></input>}
                            </div>
                        </li>
                    )
                   
                })
                   
                }
               
                
            </ul>
            { !showPlayerVideo && <button onClick={() => submitFrameInfo()}>submit</button>}

                {!(errMsg && Object.keys(errMsg).length === 0 
              && Object.getPrototypeOf(errMsg ) === Object.prototype) 
              &&
              <div className="errorDiv">
                  <p>{errMsg.errMsg}</p>
               {/* <p>{errMsg.msg}</p> */}
          </div>}
            <p>{startPlay}</p>
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
                console.log(event.target.value);
                setStartTime(event.target.value);    
            }}></input><span>{(startTime/60).toFixed(2)} (sec)</span>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVideo: () =>{
            dispatch(fetchVideo())
        }
    };
  };
  
  const mapStateToProps = (state = {}) => {
      
    return {
        videoInfo: state.videoInfo,
        videoAnalysis: state.videoAnalysis
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerContainer);
