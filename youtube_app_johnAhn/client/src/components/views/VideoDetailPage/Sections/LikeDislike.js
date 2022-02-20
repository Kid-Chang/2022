import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import Icon, {
    LikeFilled,
    LikeOutlined,
    DislikeFilled,
    DislikeOutlined,
} from "@ant-design/icons";
import axios from "axios";
const LikeDislike = (props) => {
    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);
    let variable = {};
    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId };
    } else {
        variable = { commentId: props.commentId, userId: props.userId };
    }
    useEffect(() => {
        axios.post("/api/like/getLikes", variable).then((res) => {
            if (res.data.success) {
                // how many like clicked.
                setLikes(res.data.likes.length);
                // check i cliked like.
                res.data.likes.map((dislike) => {
                    if (dislike.usrId === props.userId) {
                        setLikeAction("liked");
                    }
                });
            } else {
                alert("좋아요값 불러오기 실패.");
            }
        });

        axios.post("/api/like/getDislikes", variable).then((res) => {
            if (res.data.success) {
                // how many dislike clicked.
                setDislikes(res.data.dislikes.length);
                // check i cliked dislike.
                res.data.dislikes.map((like) => {
                    if (like.usrId === props.userId) {
                        setDislikeAction("disliked");
                    }
                });
            } else {
                alert("싫어요값 불러오기 실패.");
            }
        });
    });

    const onLike = () => {
        if (LikeAction === null) {
            axios.post("/api/like/upLike", variable).then((res) => {
                if (res.data.success) {
                    setLikes(Likes + 1);
                    setLikeAction("liked");
                    if (DislikeAction !== null) {
                        setDislikes(Dislikes - 1);
                        setDislikeAction(null);
                    }
                } else {
                    alert("upLike 실패");
                }
            });
        } else {
            axios.post("/api/like/unLike", variable).then((res) => {
                if (res.data.success) {
                    setLikes(Likes - 1);
                    setLikeAction(null);
                } else {
                    alert("unLike 실패");
                }
            });
        }
    };

    const onDisLike = () => {
        if (DislikeAction !== null) {
            axios.post("/api/like/unDisLike", variable).then((response) => {
                if (response.data.success) {
                    setDislikes(Dislikes - 1);
                    setDislikeAction(null);
                } else {
                    alert("Failed to decrease dislike");
                }
            });
        } else {
            axios.post("/api/like/upDisLike", variable).then((response) => {
                if (response.data.success) {
                    setDislikes(Dislikes + 1);
                    setDislikeAction("disliked");

                    //If dislike button is already clicked
                    if (LikeAction !== null) {
                        setLikeAction(null);
                        setLikes(Likes - 1);
                    }
                } else {
                    alert("Failed to increase dislike");
                }
            });
        }
    };

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    {LikeAction !== null ? (
                        <LikeFilled onClick={onLike} />
                    ) : (
                        <LikeOutlined onClick={onLike} />
                    )}
                </Tooltip>
                <span style={{ paddingLeft: "8px", cursor: "auto" }}>
                    {Likes}
                </span>
            </span>
            &nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {DislikeAction !== null ? (
                        <DislikeFilled onClick={onDisLike} />
                    ) : (
                        <DislikeOutlined onClick={onDisLike} />
                    )}
                </Tooltip>
                <span style={{ paddingLeft: "8px", cursor: "auto" }}>
                    {Dislikes}
                </span>
            </span>
        </React.Fragment>
    );
};

export default LikeDislike;
