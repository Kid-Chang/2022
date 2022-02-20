import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/login";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { PageWrap } from "../../components/common/styled";
// import LargeAddCarousel from "./largeViewCarousel";
import { useEffect, useRef, useState } from "react";
import MatchupGuide from "./matchupGuide";
import WantedPlusList from "./wantedPlus";
import WantedPlusAD from "./wantedPlusAd";
import HireInfo from "./hireInfo";
import ThreeMinArticle from "./threeMinArticleList";
import CareerEvent from "./careerEvent";
import HireTheme from "./hireTheme";
import LargeAddCarousel from "../../components/common/largeCarousel/largeViewCarousel";
import { carousel_data } from "./carousel_data";

const HomePage = () => {
    const { isLogin: LoginState } = useSelector((state) => state.LoginReducer);
    // console.log(LoginState);
    const RefCenterX = useRef();

    return (
        <div>
            <PageWrap>
                <Row className="justify-content-md-center">
                    <LargeAddCarousel
                        RefCenterX={RefCenterX}
                        data={carousel_data}
                    />
                    <Col style={{ maxWidth: "1090px" }} ref={RefCenterX}>
                        <MatchupGuide />
                        <WantedPlusList />
                        <ThreeMinArticle />
                        <WantedPlusAD />
                        <div style={{ height: "460px" }}>
                            원티드Ad 여백 생성용
                        </div>
                        <CareerEvent />
                        <HireInfo />
                        {/* 테마별 채용은 로그인 후에만. */}
                        {LoginState ? <HireTheme /> : null}
                    </Col>
                </Row>
            </PageWrap>
        </div>
    );
};

const IndexText = styled.div`
    font-size: 30px;
    font-weight: 600;
`;

export default HomePage;
