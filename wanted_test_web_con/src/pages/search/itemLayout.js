import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ServerSignURL } from "..";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const ItemLayout = ({
    positionIdx,
    imgUrl,
    title,
    companyName,
    region,
    nation,
    reward,
    responceLevel,
    likeNum,
    likeStatus,
    setLikeChange,
    refreshItem,
    limitCount,
}) => {
    console.log(likeStatus);
    const [nowLike, setNowLike] = useState(likeStatus);
    const { jwt, userIdx } = useSelector((state) => state.LoginReducer);
    const onLikeClick = async () => {
        console.log(jwt);
        const data = await axios.post(
            `${ServerSignURL}/users/${userIdx}/likes`,
            "hola",
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: {
                    positionIdx: positionIdx,
                },
            },
        );
        console.log(data.data.result);
        setNowLike(data.data.result.likeStatus);
        refreshItem(limitCount);
    };

    // useEffect(() => console.log(nowLike), [nowLike]);
    return (
        <JobCardOutBox data-cy="job-card">
            <HeartButton onClick={() => onLikeClick()}>
                {likeStatus === "true" ? (
                    <>
                        <FontAwesomeIcon
                            style={{ color: "#ff415c", marginRight: "7px" }}
                            icon={faHeart}
                        />

                        {likeNum}
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon
                            style={{
                                color: "rgba(255,255,255,.3)",
                                marginRight: "7px",
                            }}
                            icon={faHeart}
                        />{" "}
                        {likeNum}
                    </>
                )}
            </HeartButton>
            <Link to={`/wd/${positionIdx}`}>
                <JobCardBox>
                    <header
                        style={{
                            width: "250px",
                            height: "187px",
                            backgroundImage: `url(${imgUrl})`,
                            borderRadius: "5px",
                            backgroundSize: "cover",
                        }}
                    ></header>
                    <div className="body">
                        <div className="job-card-position">{title}</div>
                        <div className="job-card-company-name">
                            {companyName}
                        </div>
                        <div className="Tooltip_container">
                            {responceLevel ? (
                                <button className="Tooltip_label" type="button">
                                    <div className="ResponseLevelLabel_container">
                                        <span>{responceLevel}</span>
                                    </div>
                                </button>
                            ) : null}
                        </div>
                        <div className="job-card-company-location">
                            {region}
                            <span className="addressDot">·</span>
                            <span>{nation}</span>
                        </div>
                        <div className="reward">
                            채용보상금 {reward.toLocaleString()}원
                        </div>
                    </div>
                </JobCardBox>
            </Link>
        </JobCardOutBox>
    );
};
export default ItemLayout;

const HeartButton = styled.div`
    width: 60px;
    height: 30px;
    border-radius: 3px;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    align-items: center;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    right: 30px;
    top: 10px;
`;

const JobCardOutBox = styled.div`
    width: 25%;
    padding: 10 px;
    list-style: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
`;

const JobCardBox = styled.div`
    & .body {
        width: 250px;
        height: 180px;
        position: relative;
        color: #333;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.2;
        max-height: 2.4 em;
        overflow: hidden;
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    & .job-card-company-name {
        font-size: 14px;
        line-height: normal;
        text-align: left;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 10px;
    }
    & .Tooltip_container {
        margin: 5px 0;
    }
    & .Tooltip_label {
        border: 1px solid #00aead;
        color: #00aead;
        border-radius: 2px;
        background-color: #fff;
        display: inline-block;
        font-size: 10px;
        font-weight: 600;
        height: 19px;
        line-height: 19px;
        margin-top: 4px;
        padding: 0 5px;
        margin-bottom: 10 px;
    }
    & .job-card-company-location {
        font-weight: 400;
        color: #999;
        font-size: 14px;
        line-height: normal;
        text-align: left;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    & .reward {
        margin-top: 10 px;
        color: #333;
        font-size: 14px;
        font-weight: 400;
    }
`;
