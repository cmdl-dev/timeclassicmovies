import React, { useState, useEffect } from 'react';
import videojs from 'video.js';

const Video = () => {
    const [video, setVideo] = useState(null);

    const playerOptions = {
        autoplay: true,
        controls: true,
        sources: [
            {
                src: 'https://s3.amazonaws.com/tcm-stream-out/Afgrunden_1910.mp4',
                type: 'video/mp4'
            }
        ]
    };
    useEffect(() => {
        setupPlayer();
        return function cleanup() {
            destroyPlayer();
        };
    }, []);
    const setupPlayer = () => {
        videojs('video-player', playerOptions, function() {
            console.log(this, 'got setup');
            setVideo(this);
        });
    };
    const destroyPlayer = () => {
        if (video != null) {
            video.dispose();
            setVideo(null);
        }
    };
    return <div id="video-player" />;
};
export default Video;
