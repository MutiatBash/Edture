import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoComponent = ({ url }) => {
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			const player = videojs(videoRef.current, {
				controls: true,
				autoplay: false,
				preload: "auto",
				responsive: true,
				fluid: true,
				sources: [{ src: url, type: "video/mp4" }],
			});

			player.ready(() => {
				console.log("Player is ready");
			});

			return () => {
				if (player) {
					player.dispose();
				}
			};
		}
	}, [url, videoRef.current]);

	return (
		<div className="video-container">
			<video ref={videoRef} className="video-js"></video>
		</div>
	);
};

export default VideoComponent;
