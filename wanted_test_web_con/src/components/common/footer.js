import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const Footer = () => {
    return (
        <div style={{ borderTop: "1px solid #ececec" }}>
            <FooterAllStyle>
                <FooterTop>
                    <FooterTopLeft sm={8}>
                        <div className="NavLinks_logo">
                            <img
                                src="https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/logo_wanted_black.png"
                                alt="logo"
                                height="40px"
                            />
                        </div>
                        <div className="NavLinks_group">
                            <div>
                                <span
                                    data-attribute-id="fnb"
                                    data-fnb-kind="investment"
                                >
                                    <a
                                        href="https://www.wantedlab.com/"
                                        className=""
                                        aria-label=""
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        기업소개
                                    </a>
                                </span>
                                <span
                                    data-attribute-id="fnb"
                                    data-fnb-kind="termsOfUse"
                                >
                                    <a
                                        href="https://help.wanted.co.kr/hc/ko/articles/360035844551"
                                        className=""
                                        aria-label=""
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        이용약관
                                    </a>
                                </span>
                                <span
                                    data-attribute-id="fnb"
                                    data-fnb-kind="privacyPolicy"
                                >
                                    <a
                                        href="https://www.wanted.co.kr/privacy"
                                        className=""
                                        aria-label=""
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        개인정보 처리방침
                                    </a>
                                </span>
                                <span
                                    data-attribute-id="fnb"
                                    data-fnb-kind="FAQ"
                                >
                                    <a
                                        href="https://help.wanted.co.kr/hc/ko/"
                                        className=""
                                        aria-label=""
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        고객센터
                                    </a>
                                </span>
                            </div>
                        </div>
                    </FooterTopLeft>
                    <FooterTopRight sm={4}>
                        <div className="SocialLinks_socialLinksClass SocialLinks_socialLinkKR">
                            <a
                                href="https://www.instagram.com/wantedjobs.kr/"
                                className=""
                                aria-label=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/social_instagram.png"
                                    alt="instagram"
                                />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UC0tGZ6MqieGG2m5lA5PeQsw"
                                className=""
                                aria-label=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/social_youtube.png"
                                    alt="youtube"
                                />
                            </a>
                            <a
                                href="https://www.facebook.com/wantedkr"
                                className=""
                                aria-label=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/social_facebook.png"
                                    alt="facebook"
                                />
                            </a>
                            <a
                                href="https://blog.naver.com/wantedlab"
                                className=""
                                aria-label=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/social_blog.png"
                                    alt="blog"
                                />
                            </a>
                            <a
                                href="https://pf.kakao.com/_XqCIxl"
                                className=""
                                aria-label=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/social_kakao.png"
                                    alt="kakao"
                                />
                            </a>
                            <a
                                href="https://post.naver.com/my.nhn?memberNo=18284175"
                                className=""
                                aria-label=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/social_post.png"
                                    alt="post"
                                />
                            </a>
                            <a
                                href="https://apps.apple.com/kr/app/id1074569961"
                                className=""
                                aria-label=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/social_apple.png"
                                    alt="apple"
                                />
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.wanted.android.wanted"
                                className=""
                                aria-label=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/social_google.png"
                                    alt="google"
                                />
                            </a>
                        </div>
                    </FooterTopRight>
                </FooterTop>

                <FooterBottom>
                    <FooterBottomLeft sm={9}>
                        <p className="Footer_footerText__CTqnd kr">
                            (주)원티드랩 (대표이사:이복기) | 서울특별시 송파구
                            올림픽로 300 롯데월드타워 35층 | 통신판매번호 :
                            2020-서울송파-3147
                            <br />
                            유료직업소개사업등록번호 : (국내)
                            제2020-3230259-14-5-00018호 | (국외)
                            서울동부-유-2020-2 | 사업자등록번호 : 299-86-00021 |
                            02-539-7118
                            <br />© Wantedlab, Inc.
                        </p>
                    </FooterBottomLeft>
                    <FooterBottomRight sm={3}>
                        <div style={{ display: "flex", position: "relative" }}>
                            <img
                                src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/ico_KR.svg"
                                alt=""
                                width="40px"
                                style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: "24px",
                                    height: "17px",
                                }}
                            />
                            <LangSelect>
                                <option value="KR">한국 (한국어)</option>
                                <option value="JP">日本 (日本語)</option>
                                <option value="TW">臺灣 (中文)</option>
                                <option value="WW">Worldwide (English)</option>
                                <option value="SG">Singapore (English)</option>
                            </LangSelect>
                        </div>
                    </FooterBottomRight>
                </FooterBottom>
            </FooterAllStyle>
        </div>
    );
};

export default Footer;

const FooterAllStyle = styled(Container)`
    padding-top: 20px;
    padding-bottom: 65px;
`;

const FooterTopLeft = styled(Col)`
    display: flex;
    align-items: center;
    & > div {
        margin-right: 20px;
    }
    & > div a {
        margin-right: 20px;
    }
`;
const FooterTopRight = styled(Col)`
    display: flex;
    align-items: center;
    justify-content: center;
    & div a {
        margin-right: 20px;
    }
`;

const FooterTop = styled(Row)`
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ececec;
    & a {
        color: black;
    }
`;

const FooterBottomLeft = styled(Col)``;
const FooterBottomRight = styled(Col)``;

const FooterBottom = styled(Row)`
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ececec;
    color: gray;
`;

const LangSelect = styled.select`
    width: 100%;
    height: 40px;
    padding: 0 45px;
    background-color: #f2f4f7;
    border: 0px;
    border-radius: 8px;
`;
