import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReplyComment from "./ReplyComment";
import SingleComment from "./SingleComment";
const Comment = ({ commentLists, refreshFunc }) => {
    const { videoId } = useParams();

    const [CommentValue, setCommentValue] = useState("");
    const user = useSelector((state) => state.user);

    const handleClick = (e) => {
        setCommentValue(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (CommentValue === "") {
            return alert("입력해주세요!");
        }

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId,
        };
        console.log(variables);
        axios.post("/api/comment/saveComment", variables).then((res) => {
            if (res.data.success) {
                console.log(res.data);
                setCommentValue("");
                refreshFunc(res.data.result);
            } else {
                console.log(res);
                alert("코멘트 저장 실패");
            }
        });
    };

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />
            {/* Comment Lists */}

            {commentLists &&
                commentLists.map((comment, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            {!comment.responseTo && (
                                <>
                                    <SingleComment
                                        refreshFunc={refreshFunc}
                                        postId={videoId}
                                        comment={comment}
                                    />
                                    <ReplyComment
                                        refreshFunc={refreshFunc}
                                        commentLists={commentLists}
                                        parentCommentId={comment._id}
                                        postId={videoId}
                                    />
                                </>
                            )}
                        </React.Fragment>
                    );
                })}

            {/* Root Comment Form */}

            <form style={{ display: "flex" }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: "100%", borderRadius: "5px" }}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder="typing your comment"
                />
                <br />
                <button
                    style={{ width: "20%", height: "52px" }}
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Comment;
