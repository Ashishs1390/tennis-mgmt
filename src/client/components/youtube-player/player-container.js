import React, { useState, useEffect } from "react";
import YoutubePlayer from './youtube-player';
import "./player.scss";

function VideoPlayerContainer() {
    const [startPlay, setStartPlay] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);
    const [pausetimer, setPausetimer] = useState(null);
    const startAllVideos = () => {
        const pauseTimerObj = setInterval(() => {
            setPauseTime(pauseTime + 1)
        },1000);
        setPausetimer(pauseTimerObj);
        setStartTime(pauseTime === 0 ? 1 : pauseTime);
        setStartPlay(true);
    };

    const pauseAllVideo = () => {
        clearInterval(pausetimer);
        setStartPlay(false);
    }
    return (
        <div className="video-player-container">
            <ul className="video-item-list">
                <li className="video-item">
                    <YoutubePlayer url='https://www.youtube.com/embed/kYyaJyTLjpk' isStart={startPlay} startTime={startTime}></YoutubePlayer>
                </li>
                <li className="video-item">
                    <YoutubePlayer url='https://www.youtube.com/embed/kYyaJyTLjpk' isStart={startPlay} startTime={startTime}></YoutubePlayer>
                </li>
                <li className="video-item">
                    <YoutubePlayer url='https://www.youtube.com/embed/kYyaJyTLjpk' isStart={startPlay} startTime={startTime}></YoutubePlayer>
                </li>
                <li className="video-item">
                    <YoutubePlayer url='https://www.youtube.com/embed/kYyaJyTLjpk' isStart={startPlay} startTime={startTime}></YoutubePlayer> 
                </li>
            </ul>
            <div className="video-player-controls">
            { !startPlay && <button onClick={startAllVideos}>Play</button> }
            { startPlay && <button onClick={pauseAllVideo}>Pause</button> }
            <input type="range" name="vol" min="0" max="5000" onChange={(event) => {
                setStartTime(event.target.value);    
            }}></input><span>{startTime/60}</span>
            </div>
        </div>
    );
}

export default VideoPlayerContainer;