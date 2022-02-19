import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleComment from "./SingleComment";

const ReplyComment = ({
    commentLists,
    refreshFunc,
    parentCommentId,
    videoId,
}) => {
    const [ChildCOmmentNumber, setChildCOmmentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);
    useEffect(() => {
        let commentNum = 0;
        commentLists &&
            commentLists.map((comment) => {
                if (comment.responseTo === parentCommentId) commentNum++;
                setChildCOmmentNumber(commentNum);
            });
    });

    const renderReplyComment = () =>
        commentLists &&
        commentLists.map((comment, idx) => {
            return (
                <React.Fragment key={idx}>
                    <>
                        {comment.responseTo === parentCommentId && (
                            <div
                                style={{
                                    width: "80%",
                                    marginLeft: "40px",
                                }}
                            >
                                <SingleComment
                                    refreshFunc={refreshFunc}
                                    postId={videoId}
                                    comment={comment}
                                />
                                <ReplyComment
                                    CommentLists={commentLists}
                                    parentCommentId={comment._id}
                                    postId={videoId}
                                    refreshFunction={refreshFunc}
                                />
                            </div>
                        )}
                    </>
                </React.Fragment>
            );
        });

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    };

    return (
        <div>
            {ChildCOmmentNumber > 0 && (
                <p
                    style={{ fontSize: "14px", margin: 0, color: "gray" }}
                    onClick={onHandleChange}
                >
                    View {ChildCOmmentNumber} more comment(s)
                </p>
            )}
            {OpenReplyComments && renderReplyComment()}
        </div>
    );
};

export default ReplyComment;
