import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ServerSignURL } from "..";
import { Link } from "react-router-dom";

const VodItemTemplate = ({ data, getData }) => {
    // console.log(data);

    const { jwt, userIdx } = useSelector((state) => state.LoginReducer);
    const [nowFollow, setNowFollow] = useState(data.followStatus);

    const onLikeClick = async () => {
        console.log(jwt);
        const ApiData = await axios.post(
            `${ServerSignURL}/users/${userIdx}/follows`,
            "hola",
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: {
                    companyIdx: data.companyIdx,
                },
            },
        );
        // console.log(ApiData.data.result.likeNum);

        console.log(ApiData.data.result);
        setNowFollow(ApiData.data.result.followStatus);
        getData();
    };

    return (
        <VodOuterBox>
            {nowFollow === "true" ? (
                <>
                    <HeartButton
                        onClick={() => onLikeClick()}
                        style={{
                            backgroundColor: "#f2f4f7",
                            color: "#ccc",
                            border: "0",
                        }}
                    >
                        <div>팔로잉</div>
                    </HeartButton>
                </>
            ) : (
                <>
                    <HeartButton onClick={() => onLikeClick()}>
                        <div>팔로우</div>
                    </HeartButton>
                </>
            )}
            <Link to={`/company/${data.companyIdx}`}>
                <ImgBoxStyle style={{ position: "relative" }}>
                    <ImgStyle src={data.image} alt="" />
                </ImgBoxStyle>
                <VodInnerText>
                    {/* <div style={{ display: "flex" }}>
                    {data.desc.map((data, idx) => {
                        return <DescItemStyle key={idx}>hello</DescItemStyle>;
                    })}
                </div> */}
                    {/* <div>{data.desc}</div> */}
                    <LogoBox>
                        <LogoImg
                            role="img"
                            style={{
                                backgroundImage: `url("${data.logo}")`,
                                backgroundSize: "cover",
                            }}
                        ></LogoImg>
                        <div>{data.companyName}</div>
                    </LogoBox>
                </VodInnerText>
            </Link>
        </VodOuterBox>
    );
};

const LogoBox = styled.div`
    height: 30px;
    margin-top: 17px;
    display: flex;
`;

const LogoImg = styled.div`
    width: 42px;
    height: 42px;
    flex-grow: 0;
    flex-shrink: 0;
    background-size: contain;
    background-position: 50%;
    margin-right: 12px;
`;

const HeartButton = styled.div`
    z-index: 100;
    width: 90px;
    height: 40px;
    border-radius: 25px;
    position: absolute;
    color: #36f;
    font-size: 15px;
    font-weight: 700;
    justify-content: center;
    align-items: center;
    display: flex;
    right: 20px;
    bottom: 45px;
    border: 1px solid #e1e2e3;
`;

const DescItemStyle = styled.p`
    padding: 2px 4px 2px 4px;
    margin-right: 3px;
    border: 1px solid black;
    border-radius: 3px;
    height: 20px;
    font-size: 11px;
`;
const VodInnerText = styled.div`
    margin-top: 14px;
    & > div {
        font-size: 14px;
        height: 20px;
        font-weight: 600;
        color: #333;
    }
    & div + div {
        font-size: 16px;
        margin-top: 5px;
        font-weight: 700;
        color: #333;
    }
    & div + div + div {
        font-size: 13px;
        margin-top: 8px;
        font-weight: 600;
        color: #aaa;
    }
`;

const VodOuterBox = styled.div`
    position: relative;
    padding: 0 10px 0 10px;
    height: 380px;
`;

const ImgBoxStyle = styled.div`
    width: 522px;
    position: relative;
    height: 273px;
`;

const ImgStyle = styled.img`
    border-radius: 5px;
    object-fit: cover;
    height: 273px;
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
const MidViewCarousel = ({
    nowX_carousel,
    setNowX_carousel,
    inputData,
    getData,
}) => {
    // console.log(inputData);
    const slickTrack = useRef();
    // console.log(RefCenterX.current.offsetLeft);
    const [usingData, setUsingData] = useState([]);

    useEffect(() => {
        setUsingData(inputData);

        // console.log(usingData);
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
                    {inputData.map((data, idx) => {
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

export default MidViewCarousel;

const VodListInBoxStyle = styled.div`
    display: flex;
    transition: transform 0.3s;
`;
const VodListOutBoxStyle = styled.div`
    display: flex;
    overflow-x: hidden;
    position: relative;
`;
