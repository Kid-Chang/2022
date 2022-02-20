import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ServerSignURL } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const VodItemTemplate = ({ data, getData }) => {
    // console.log(data);

    const { jwt, userIdx } = useSelector((state) => state.LoginReducer);
    const [nowLike, setNowLike] = useState(data.likeStatus);

    const onLikeClick = async () => {
        console.log(jwt);
        const ApiData = await axios.post(
            `${ServerSignURL}/users/${userIdx}/likes`,
            "hola",
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: {
                    positionIdx: data.positionIdx,
                },
            },
        );
        // console.log(ApiData.data.result.likeNum);

        // console.log(ApiData.data.result);
        setNowLike(ApiData.data.result.likeStatus);
        getData();
    };

    // const getPosition = async () => {
    //     const data = await axios.get(
    //         `${ServerSignURL}/companies/position/${data.positionIdx}/${userIdx}`,
    //         {
    //             headers: {
    //                 "X-ACCESS-TOKEN": jwt,
    //             },
    //         },
    //     );

    //     // console.log(data.data.result);
    //     setNowLike(data.data.result.likeStatus);
    // };
    // useEffect(() => (), []);
    return (
        <>
            <VodOuterBox>
                <HeartButton onClick={() => onLikeClick()}>
                    {nowLike === "true" ? (
                        <>
                            <FontAwesomeIcon
                                style={{
                                    color: "#ff415c",
                                    marginRight: "7px",
                                }}
                                icon={faHeart}
                            />

                            {data.likeNum}
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
                            {data.likeNum}
                        </>
                    )}
                </HeartButton>
                <Link to={`/wd/${data.positionIdx}`}>
                    <ImgBoxStyle style={{ position: "relative" }}>
                        <ImgStyle src={data.image} alt="" />
                        <div>{data.time}</div>
                    </ImgBoxStyle>
                    <VodInnerText>
                        <div>{data.title}</div>
                        <div>{data.companyName}</div>
                        {data.responseLevel !== "" ? (
                            <ResopnceLevelLabel>
                                <span>{data.responseLevel}</span>
                            </ResopnceLevelLabel>
                        ) : null}

                        <div>
                            {data.region} . {data.nation}
                        </div>
                    </VodInnerText>
                </Link>
            </VodOuterBox>
        </>
    );
};

const HeartButton = styled.div`
    z-index: 100;
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
    display: flex;
    right: 20px;
    top: 10px;
`;

const ResopnceLevelLabel = styled.div`
    border-radius: 2px;
    background-color: #fff;
    display: inline-block;
    font-size: 10px !important;
    font-weight: 600;
    height: 19px;
    line-height: 19px;
    margin-top: 4px;
    padding: 0 5px;
    border: 1px solid #00aead;
    color: #00aead !important;
`;

const VodInnerText = styled.div`
    margin-top: 14px;
    // & > div {
    //     // font-size: 14px;
    //     // height: 20px;
    //     // font-weight: 600;
    //     // color: #333;
    // }
    & div {
        font-size: 16px;
        margin-top: 5px;
        font-weight: 700;
        color: #333;
    }
    & div + div {
        font-size: 13px;
        margin-top: 8px;
        font-weight: 600;
        // color: #aaa;
    }
    & div + div + div {
        font-size: 13px;
        margin-top: 8px;
        font-weight: 600;
        color: #aaa;
    }
`;

const VodOuterBox = styled.div`
    padding: 0 10px 0 10px;
    height: 320px;
    position: relative;
`;

const ImgBoxStyle = styled.div`
    width: 250px;
    position: relative;
`;

const ImgStyle = styled.img`
    border-radius: 5px;
    object-fit: cover;
    height: 175px;
    width: 100%;

    & + div {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: white;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 5px;
        padding: 2px;
    }
`;

// 본체.
const MiniViewCarousel = ({
    nowX_carousel,
    setNowX_carousel,
    dataList,
    getData,
}) => {
    const slickTrack = useRef();
    // console.log(RefCenterX.current.offsetLeft);
    console.log(dataList);
    useEffect(() => {
        setNowX_carousel(-10);
    }, []);

    useEffect(() => {
        slickTrack.current.style.transform = `translateX(${nowX_carousel}px)`;
        // console.log(nowX_carousel);
    }, [nowX_carousel]);

    return (
        <>
            <VodListOutBoxStyle>
                {/* mapping */}

                <VodListInBoxStyle ref={slickTrack}>
                    {dataList.map((data, idx) => {
                        return (
                            <VodItemTemplate
                                data={data}
                                getData={getData}
                                key={idx}
                            />
                        );
                    })}
                </VodListInBoxStyle>
            </VodListOutBoxStyle>
        </>
    );
};

export default MiniViewCarousel;

const VodListInBoxStyle = styled.div`
    display: flex;
    transition: transform 0.3s;
`;
const VodListOutBoxStyle = styled.div`
    display: flex;
    overflow-x: hidden;
    position: relative;
`;
