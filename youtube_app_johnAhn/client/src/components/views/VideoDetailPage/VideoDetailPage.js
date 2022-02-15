import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
const VideoDetailPage = () => {
    const { videoId } = useParams();
    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        const variables = { videoId: videoId };
        console.log(videoId);
        axios.post("/api/video/getVideoDetail", variables).then((res) => {
            if (res.data.success) {
                console.log(res.data);
                setVideoDetail(res.data.videoDetail);
            } else {
                alert("디테일정보 가져오기 실패");
            }
        });
    }, []);
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: "100%", padding: "3rem 4rem" }}>
                        {VideoDetail.filePath && (
                            <video
                                style={{ width: "100%" }}
                                src={`http://localhost:4001/${VideoDetail.filePath}`}
                                controls
                            />
                        )}

                        {VideoDetail.writer && (
                            <List.Item
                                actions={[
                                    <Subscribe
                                        userTo={VideoDetail.writer._id}
                                        userFrom={localStorage.getItem(
                                            "userId",
                                        )}
                                    />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={VideoDetail.writer.image}
                                        />
                                    }
                                    title={VideoDetail.writer.name}
                                    description={VideoDetail.description}
                                />
                            </List.Item>
                        )}
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <div style={{ height: "100px" }}></div>
                    <SideVideo />
                </Col>
            </Row>
        </div>
    );
};

export default VideoDetailPage;
