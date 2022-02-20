import styled from "styled-components";
import { WantedPlus_data } from "./wantedPlus_data";
import { useEffect, useRef } from "react";

const VodItemTemplate = ({ data }) => {
    // console.log(data);

    return (
        <VodOuterBox>
            <ImgBoxStyle style={{ position: "relative" }}>
                <ImgStyle src={data.img} alt="" />
                <div>{data.time}</div>
            </ImgBoxStyle>
            <VodInnerText>
                <div>{data.who}</div>
                <div>{data.title}</div>
                <div>{data.desc}</div>
            </VodInnerText>
        </VodOuterBox>
    );
};

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
    padding: 0 10px 0 10px;
    height: 264px;
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
const MiniViewCarousel = ({ nowX_carousel, setNowX_carousel }) => {
    const slickTrack = useRef();
    // console.log(RefCenterX.current.offsetLeft);

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
                    {WantedPlus_data.map((data, idx) => {
                        return <VodItemTemplate data={data} key={idx} />;
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
