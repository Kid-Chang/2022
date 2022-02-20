import { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import LargeAddCarousel from "../../components/common/largeCarousel/largeViewCarousel";
import { PageWrap } from "../../components/common/styled";

import JobPosting from "./jobPosting";
import { large_carousel_data } from "./largeCarouselData";
import { NotLoginRecommendJob } from "./recommandJob";
import MatchedJobList from "./matchedJob";
import UserActionJob from "./userActionJob";
import FeaturedJob from "./featuredJob";
import TagCollectList from "./tagCollectList";
import { TagList_data } from "./tagList";

function randomValueFromArray(array) {
    const random1 = Math.floor(Math.random() * array.length);
    const random2 = Math.ceil(Math.random() * array.length);
    return [array[random1], array[random2]];
}

const JobsFeedPage = () => {
    const RefCenterX = useRef();
    const { isLogin: LoginState } = useSelector((state) => state.LoginReducer);
    // console.log(TagList_data);

    const PickedTag = randomValueFromArray(TagList_data);
    console.log(PickedTag[0]);
    console.log(PickedTag[1]);
    // 여기서 무작위로 태그 2개 고르고 이걸 프롭스로 전달해주자.

    return (
        <div>
            <PageWrap>
                <Row className="justify-content-md-center">
                    <LargeAddCarousel
                        RefCenterX={RefCenterX}
                        data={large_carousel_data}
                    />
                    <Col style={{ maxWidth: "1090px" }} ref={RefCenterX}>
                        <div style={{ marginTop: "80px" }}></div>
                        <JobPosting />

                        {/* 매치드잡-> 에이아이추천 */}
                        {LoginState ? (
                            <>
                                <UserActionJob />
                                {/* 유저액션-> 박창현님 지원해볼까요? */}
                                <MatchedJobList />
                                {/* <LoginRecommendJob /> */}
                            </>
                        ) : (
                            <>
                                <NotLoginRecommendJob />
                            </>
                        )}

                        <TagCollectList PickedTag={PickedTag[0]} idx="0" />
                        <TagCollectList PickedTag={PickedTag[1]} idx="1" />
                        {/* 태그 프롭스에 태그 추가할 예정. */}
                        <FeaturedJob />
                    </Col>
                </Row>
            </PageWrap>
        </div>
    );
};

export default JobsFeedPage;
