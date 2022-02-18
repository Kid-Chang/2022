import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Comment = () => {
    const { videoId } = useParams();

    const [CommentValue, setCommentValue] = useState("");
    const user = useSelector((state) => state.user);

    const handleClick = (e) => {
        setCommentValue(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId,
        };
        console.log(variables);
        axios.post("/api/comment/saveComment", variables).then((res) => {
            if (res.data.success) {
                console.log(res.data);
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
