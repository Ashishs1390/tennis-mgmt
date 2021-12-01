import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import "./player.scss";

export const YoutubeComponent = (props) => {
    let player = null;
    const playerCtr = useRef(null);    
    useEffect(() => {
        if(playerCtr.current) {
            const player = playerCtr.current.internalPlayer;
            props.isStart ? player.playVideo() : player.pauseVideo();
        }
    }, [props.isStart])

    useEffect(() => {
        if(playerCtr.current) {
            const player = playerCtr.current.internalPlayer;
            player.seekTo(props.startTime);
        }
    }, [props.startTime])

    useEffect(() => {
        if(playerCtr.current) {
            const player = playerCtr.current.internalPlayer;
            props.isMute ? player.mute() :  player.unMute();
        }
    }, [props.isMute])

    useEffect(() => {
        if(playerCtr.current) {
            const player = playerCtr.current.internalPlayer;
            player.setPlaybackRate(+props.playbackSpeed)
        }
    }, [props.playbackSpeed])
    

    const onReady = (event) => {
        event.target.pauseVideo();
        console.log(event, playerCtr.current, playerCtr.current.internalPlayer);
      }
    const opts = {
        height: '300',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    return (
        <div className="video-player" style={{width: '100%', height: '100%'}}>
            <YouTube videoId={props.id} opts={opts} onReady={onReady} ref={playerCtr} />
        </div>
    )
};

export default YoutubeComponent;