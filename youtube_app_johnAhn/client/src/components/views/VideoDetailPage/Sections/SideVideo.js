import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideVideo = () => {
    const [SideVideos, setSideVideos] = useState([]);
    useEffect(() => {
        axios.get("/api/video/getVideos").then((res) => {
            if (res.data.success) {
                // console.log(res.data);
                setSideVideos(res.data.videos);
            } else {
                alert("비디오 가져오기 실패.");
            }
        });
    }, []);

    const RenderSideVideo = SideVideos.map((video, idx) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);
        return (
            <div
                style={{
                    display: "flex",
                    marginBottom: "1rem",
                    padding: "0 2rem",
                }}
                key={idx}
            >
                <div
                    style={{
                        width: "40%",
                        marginBottm: "1rem",
                        marginRight: "1rem",
                    }}
                >
                    <a href={`/video/${video._id}`}>
                        <img
                            style={{ width: "100%" }}
                            src={`http://localhost:4001/${video.thumbnail}`}
                            alt=""
                        />
                    </a>
                </div>
                <div style={{ width: "50%", color: "gray" }}>
                    <Link to={`/video/${video._id}`} style={{ color: "gray" }}>
                        <h3>{video.title}</h3>
                        <span>{video.writer.name}</span>
                        <br />
                        <span>{video.views}</span>
                        <br />
                        <span>
                            {minutes}:{seconds}
                        </span>
                        <br />
                    </Link>
                </div>
            </div>
        );
    });
    return <>{RenderSideVideo}</>;
};

export default SideVideo;
