import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikeDislike from "./Sections/LikeDislike";
const VideoDetailPage = () => {
    const { videoId } = useParams();
    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([]);

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

        axios.post("/api/comment/getComments", variables).then((res) => {
            if (res.data.success) {
                console.log("getCOmments");
                console.log(res.data.comments);
                setComments(res.data.comments);
            } else {
                window.alert("전체 코멘트 가져오기 실패");
                console.log("전체 코멘트 가져오기 실패");
            }
        });
    }, []);

    const refreshFunc = (newComment) => {
        setComments(Comments.concat(newComment));
    };

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
                            <>
                                <List.Item
                                    actions={[
                                        <LikeDislike
                                            video
                                            userId={localStorage.getItem(
                                                "userId",
                                            )}
                                            videoId={videoId}
                                        />,
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
                                <Comment
                                    refreshFunc={refreshFunc}
                                    commentLists={Comments}
                                />
                            </>
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
