import React, { useState, useEffect, useRef } from "react";


const PLAYING_DEBOUNCE_TIME = 50;
const WAITING_DEBOUNCE_TIME = 200;

const PlayerSimple = ({src}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const videoElement = useRef(null);
  const isWaitingTimeout = useRef(null);
  const isPlayingTimeout = useRef(null);

  useEffect(() => {
    const video = videoElement.current;

    const handleVideoWaiting = () => {
      clearTimeout(isWaitingTimeout.current);

      isWaitingTimeout.current = setTimeout(() => {
        setIsWaiting(true);
      }, WAITING_DEBOUNCE_TIME);
    };

    const handleVideoPlay = () => {
      clearTimeout(isWaitingTimeout.current);
      clearTimeout(isPlayingTimeout.current);

      isPlayingTimeout.current = setTimeout(() => {
        setIsPlaying(true);
        setIsWaiting(false);
      }, PLAYING_DEBOUNCE_TIME);
    };

    const handleVideoPause = () => {
      clearTimeout(isWaitingTimeout.current);
      clearTimeout(isPlayingTimeout.current);

      isPlayingTimeout.current = setTimeout(() => {
        setIsPlaying(false);
        setIsWaiting(false);
      }, PLAYING_DEBOUNCE_TIME);
    };

    video.addEventListener("waiting", handleVideoWaiting);
    video.addEventListener("play", handleVideoPlay);
    video.addEventListener("playing", handleVideoPlay);
    video.addEventListener("pause", handleVideoPause);

    // Clean up event listeners and timeouts
    return () => {
      clearTimeout(isWaitingTimeout.current);
      clearTimeout(isPlayingTimeout.current);

      video.removeEventListener("waiting", handleVideoWaiting);
      video.removeEventListener("play", handleVideoPlay);
      video.removeEventListener("playing", handleVideoPlay);
      video.removeEventListener("pause", handleVideoPause);
    };
  }, []);

  return (
    <div className="PlayerSimple">
      <video
        style={{ width: 700 }}
        ref={videoElement}
        src={src}
        controls
             controlsList="nodownload"
        // autoPlay
      />
      {/* <div>{isPlaying ? "PLAYING" : "PAUSED"}</div>
      <div>{isWaiting ? "LOADING" : ""}</div> */}
    </div>
  );
};

export default PlayerSimple;
