import React, { useState, useEffect } from "react";
import YoutubeComponent from './youtube.component';
import "./player.scss";

function VideoPlayerContainer() {
    const [startPlay, setStartPlay] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [mute, setMute] = useState(false);
    const [payBackSpeed, setPayBackSpeed] = useState(1);
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
    return (
        <div className="video-player-container">
            <ul className="video-item-list">
                <li className="video-item">
                    <YoutubeComponent isStart={startPlay} startTime={startTime} id="kYyaJyTLjpk" isMute={mute} playbackSpeed={payBackSpeed}/>
                    {/* <YoutubePlayer url='https://www.youtube.com/embed/kYyaJyTLjpk' isStart={startPlay} startTime={startTime}></YoutubePlayer> */}
                </li>
                <li className="video-item">
                    <YoutubeComponent isStart={startPlay} startTime={startTime} id="kYyaJyTLjpk" isMute={mute} playbackSpeed={payBackSpeed}/>

                    {/* <YoutubePlayer url='https://www.youtube.com/embed/kYyaJyTLjpk' isStart={startPlay} startTime={startTime}></YoutubePlayer> */}
                </li>
                <li className="video-item">
                    <YoutubeComponent isStart={startPlay} startTime={startTime} id="kYyaJyTLjpk" isMute={mute} playbackSpeed={payBackSpeed}/>
                    {/* <YoutubePlayer url='https://www.youtube.com/embed/kYyaJyTLjpk' isStart={startPlay} startTime={startTime}></YoutubePlayer> */}
                </li>
                <li className="video-item">
                    <YoutubeComponent isStart={startPlay} startTime={startTime} id="kYyaJyTLjpk" isMute={mute} playbackSpeed={payBackSpeed}/>
                    {/* <YoutubePlayer url='https://www.youtube.com/embed/kYyaJyTLjpk' isStart={startPlay} startTime={startTime}></YoutubePlayer>  */}
                </li>
            </ul>
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