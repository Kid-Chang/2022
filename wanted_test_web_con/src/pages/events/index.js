import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServerSignURL } from "..";
import TagCarousel from "./tagCarousel";
import { TagListData } from "./taglist_data";

const CarouselItem = ({ data: { tag }, pickTag, onTagClick }) => {
    // console.log(tag, pickTag);
    return (
        <>
            {tag === pickTag ? (
                <ContentOutboxSytle
                    style={{
                        backgroundColor: "white",
                        border: "1px solid #666",
                    }}
                >
                    <Link
                        to=""
                        style={{ color: "#333" }}
                        onClick={() => onTagClick(tag)}
                    >
                        {tag}
                    </Link>
                </ContentOutboxSytle>
            ) : (
                <ContentOutboxSytle>
                    <Link
                        to=""
                        style={{ color: "#333" }}
                        onClick={() => onTagClick(tag)}
                    >
                        {tag}
                    </Link>
                </ContentOutboxSytle>
            )}
        </>
    );
};

// category: "커리어"
// date: "2022-01-28(금)"
// evnetIdx: 1
// image: "https://static.wanted.co.kr/images/events/1718/1063298f.jpg"
// tags: (3) ['커리어', '워크샵', 'StudySalon']
// title: "스터디살롱 : 당신은 정말 리더가 되고 싶지 않을까"
// types: (2) []

const OneEventItem = () => {};

const EventsPage = () => {
    const [showAllTag, setShowAllTag] = useState(false);

    const AllTagIcon = useRef();
    const onAllTagClick = (e) => {
        console.log("event");
        if (showAllTag) {
            AllTagIcon.current.style =
                "margin-left: 60px;width: 50px;height: 50px;display: flex;align-items: center;justify-content: center;border: 1px solid #e1e2e3;border-radius: 8px;";
            setShowAllTag(false);
        } else if (!showAllTag) {
            AllTagIcon.current.style =
                "background-color: #3366FF; color: white;  margin-left: 60px;width: 50px;height: 50px;display: flex;align-items: center;justify-content: center;border: 1px solid #e1e2e3;border-radius: 8px;";
            setShowAllTag(true);
        }
    };
    const {
        jwt,
        userIdx,
        userName: name,
        email,
        phoneNum,
    } = useSelector((state) => state.LoginReducer);
    const [eventList, setEventList] = useState([]);
    const [pickTag, setPickTag] = useState("전체");
    useEffect(() => getEvent(), [pickTag]);
    const getEvent = async () => {
        let paramsData;
        console.log("pick: " + pickTag);
        if (pickTag !== "전체") {
            paramsData = {
                params: {
                    category: `${pickTag}`,
                },
            };
            console.log(paramsData);
        } else {
            paramsData = null;
        }

        const ApiData = await axios.get(
            `${ServerSignURL}/events/event-list`,
            paramsData,
        );
        console.log(ApiData.data.result);
        setEventList(ApiData.data.result);
    };
    useEffect(() => getEvent(), []);

    const onTagClick = (data) => {
        console.log(data);
        // console.log(data);
        setPickTag(data);
        // /companies/tag-serch
        // navigation(`/companies/${data}`);
    };

    return (
        <div>
            <EventTitle />
            {/* 무한스크롤 구현..? */}
            <Row className="justify-content-md-center">
                <Col style={{ maxWidth: "1090px" }}>
                    <div style={{ position: "relative" }}>
                        <TagPickBox>
                            <TagCarousel
                                onTagClick={onTagClick}
                                pickTag={pickTag}
                            />

                            <MoreTagIcon
                                onClick={() => onAllTagClick()}
                                ref={AllTagIcon}
                            >
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </MoreTagIcon>
                        </TagPickBox>
                        {showAllTag ? (
                            <>
                                <AlertWindow>
                                    <ToolKit>
                                        {TagListData.map((data, idx) => (
                                            <CarouselItem
                                                data={data}
                                                key={idx}
                                                onTagClick={onTagClick}
                                                pickTag={pickTag}
                                            />
                                        ))}
                                    </ToolKit>
                                </AlertWindow>
                                <AlertWindowBox>
                                    <AlertWindowOutBox
                                        onClick={() => {
                                            onAllTagClick();
                                        }}
                                    ></AlertWindowOutBox>
                                </AlertWindowBox>
                            </>
                        ) : null}

                        {/* 캐러셀 */}
                    </div>
                    <BodyLayout>
                        {eventList &&
                            eventList.map((item, idx) => {
                                return (
                                    <EventItem to="" key={idx}>
                                        <div
                                            className="thumbImg"
                                            style={{
                                                backgroundImage: `url(${item.image})`,
                                                backgroundSize: "cover",
                                            }}
                                        />
                                        <div className="bodyStyle">
                                            <div className="">
                                                {item.types &&
                                                    item.types.map(
                                                        (type, idx) => {
                                                            return (
                                                                <span
                                                                    className="tagBox"
                                                                    key={idx}
                                                                >
                                                                    <span className="EventKind_text">
                                                                        {type}
                                                                    </span>
                                                                </span>
                                                            );
                                                        },
                                                    )}
                                            </div>
                                            <h2 className="">{item.title}</h2>
                                            <h3 className="">{item.date}</h3>
                                        </div>
                                        <div className="hashtagBox">
                                            <span className="">
                                                {item.tags &&
                                                    item.tags.map(
                                                        (tag, idx) => {
                                                            return (
                                                                <>
                                                                    #{tag}{" "}
                                                                    &nbsp;
                                                                </>
                                                            );
                                                        },
                                                    )}
                                                #크리에이티브 #라이브
                                            </span>
                                        </div>
                                    </EventItem>
                                );
                            })}
                    </BodyLayout>
                </Col>
            </Row>
        </div>
    );
};
const EventItem = styled(Link)`
    position: relative;
    & h2 {
        position: relative;
        height: 50px;
        word-wrap: break-word;
        font-size: 18px;
        font-size: calc(18 / var(--base-font-size) * 1rem);
        color: #333;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    & h3 {
        position: absolute;
        left: 20px;
        bottom: 45px;
        width: calc(100% - 40px);
        margin-bottom: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: break-word;
        font-size: 12px;
        color: #767676;
    }
    & .hashtagBox {
        position: absolute;
        bottom: 20px;
        left: 20px;
        margin-top: 5px;
        height: 20px;
        width: calc(100% - 40px);
        & span {
            display: block;
            font-size: 12px;
            font-weight: 600;
            line-height: 1.67;
            color: #333;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
    & .tagBox {
        margin-bottom: 8px;
        display: inline-flex;
        & .EventKind_text {
            border-color: #1c1c1c;
            background-color: #1c1c1c;
            margin-right: 5px;
            color: #fff;
            align-items: center;
            height: 20px;
            border: 1px solid;
            border-radius: 2px;
            font-size: 11px;
            font-weight: 700;
            line-height: normal;
            padding: 0 6px;
        }
    }
    & .bodyStyle {
        position: relative;
        padding: 20px;
        height: 179px;
        border-top: 1px solid #eee;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    & .bodyStyle {
        position: relative;
        padding: 20px;
        height: 179px;
        border-top: 1px solid #eee;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    & .thumbImg {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 70%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-position: 50%;
        background-size: cover;
        // object-fit: cover;
    }
    float: left;
    width: calc(25% - 20px);
    border: 1px solid #ececec;
    border-radius: 5px;
    margin: 0 10px 20px;
    cursor: pointer;
`;

const BodyLayout = styled.div`
    padding-top: 30px;
    margin: 0 -10px;
`;

export default EventsPage;

const ContentOutboxSytle = styled.div`
    margin-right: 10px;
    position: relative;
    height: 50px;
    background-color: #f2f4f7;
    padding: 0 28px 0 28px;
    display: flex;
    align-items: center;
    line-height: 50px;
    border-radius: 5px;
`;

const AlertWindowOutBox = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
`;

const AlertWindowBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
`;

const PopUpWindowStyle = styled.div`
    background-color: black;
    z-index: 200;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.2),
        0 6px 40px 0 rgba(0, 0, 0, 0.19);

    & {
        background: #ffff;
        border-radius: 5px;
    }
`;

const AlertWindow = styled(PopUpWindowStyle)`
    width: 1000px;
    height: 232px;
    top: 110px;
    position: absolute;
    // right: 300px;
    transform: translateX(2.5%);
    // display: flex;
`;

const ToolKit = styled.div`
    padding: 30px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    width: 100%;
    height: 100%;
    & > div {
        display: block;
        // background-color: black;
    }
`;

const MoreTagIcon = styled.div`
    margin-left: 60px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e1e2e3;
    border-radius: 8px;
`;

const TagPickBox = styled.div`
    padding-top: 50px;
    display: flex;
    align-text: center;
    margin-left: 27px;
`;

const ImgContainerStyle = styled.div`
    background-color: white;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
`;

const EventTitle = styled(ImgContainerStyle)`
    border-top: 50px;
    background-image: url(https://wanted-marketing-image.s3.ap-northeast-2.amazonaws.com/career-biz-banner/event_web__2000x300_pre_onboarding_2022_01.jpg);
    height: 350px;
    border-radius: 3px;
`;
