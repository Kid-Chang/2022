import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const CarouselItem = ({ data }) => {
    return (
        <ContentOutboxSytle>
            <img src={data.img} alt="" />
            <ContentInboxSytle>
                <div>
                    <div style={{ fontSize: "20px" }}>{data.title}</div>
                    <div style={{ fontSize: "14px" }}>{data.desc}</div>
                </div>
                <div>
                    <Link to="" style={{ color: "blue" }}>
                        바로가기 {">"}
                    </Link>
                </div>
            </ContentInboxSytle>
        </ContentOutboxSytle>
    );
};
let centerX;
// 본체.
const LargeAddCarousel = ({ RefCenterX, data }) => {
    // console.log(data);
    const slickTrack = useRef();
    // console.log(RefCenterX.current.offsetLeft);
    const [nowX_carousel, setNowX_carousel] = useState(0);

    useEffect(() => {
        // console.log(RefCenterX.current.offsetLeft);
        centerX = RefCenterX.current.offsetLeft;
        setNowX_carousel(centerX - 1100);
        // console.log("centerX: " + centerX);

        // console.log("maybe" + value);
        // slickTrack.current.style.transform = `translateX(${nowX_carousel}px)`;
    }, []);

    useEffect(() => {
        slickTrack.current.style.transform = `translateX(${nowX_carousel}px)`;
        // console.log(nowX_carousel);
    }, [nowX_carousel]);

    return (
        <>
            <CarouselOutBox>
                <CarouselButtonSytle
                    style={{
                        left: `${centerX - 90}px`,
                    }}
                    onClick={() => {
                        nowX_carousel < -15
                            ? setNowX_carousel(nowX_carousel + 1090)
                            : setNowX_carousel(nowX_carousel);
                    }}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </CarouselButtonSytle>
                <CarouselButtonSytle
                    style={{
                        left: `${centerX + 1100}px`,
                    }}
                    onClick={() => {
                        setNowX_carousel(nowX_carousel - 1090);
                    }}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </CarouselButtonSytle>

                <CarouselInBox ref={slickTrack}>
                    {data.map((data, idx) => (
                        <CarouselItem data={data} key={idx} />
                    ))}
                </CarouselInBox>
            </CarouselOutBox>
        </>
    );
};

export default LargeAddCarousel;

const CarouselButtonSytle = styled.div`
    position: absolute;
    top: 140px;
    z-index: 200;
    width: 30px;
    height: 60px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.5);
`;

const CarouselOutBox = styled.div`
    width: 97%;
    padding: 0;
    position: relative;
    padding-top: 25px;
`;

const CarouselInBox = styled.div`
    display: flex;
    transition: transform 0.5s;
`;

const ContentOutboxSytle = styled.div`
    margin-right: 30px;
    position: relative;
`;

const ContentInboxSytle = styled.div`
    position: absolute;
    bottom: 25px;
    left: 20px;
    background-color: white;
    border-radius: 5px;
    width: 330px;
    height: 136px;
    padding: 10px 0 30px 0;
    & > div {
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 10px;
        font-size: 14px;
    }
    & > div + div {
        border-top: 1px solid gray;
        margin-top: 20px;
        padding-top: 10px;
        padding-left: 30px;
        padding-right: 30px;
    }
`;
