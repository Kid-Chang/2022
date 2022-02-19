import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const { TextArea } = Input;
const SingleComment = ({ postId, comment, refreshFunc }) => {
    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");
    const user = useSelector((state) => state.user);
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    };

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value);
        // console.log(CommentValue);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: postId,
            responseTo: comment._id,
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

    const actions = [
        <span onClick={onClickReplyOpen} key={"comment-basic-reply-to"}>
            Reply to
        </span>,
    ];

    return (
        <div>
            <Comment
                actions={actions}
                author={comment.writer.name}
                avatar={<Avatar src={comment.writer.image} alt />}
                content={<p>{comment.content}</p>}
            />
            {OpenReply && (
                <form style={{ display: "flex" }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: "100%", borderRadius: "5px" }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="typing your comment"
                    />
                    <br />
                    <Button
                        style={{ width: "20%", height: "52px" }}
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </form>
            )}
        </div>
    );
};

export default SingleComment;
