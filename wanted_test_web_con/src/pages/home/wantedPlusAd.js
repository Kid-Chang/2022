import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const WantedPlusAD = () => {
    const [isLogin, setIsLogin] = useState(false);

    const { isLogin: LoginState } = useSelector((state) => state.LoginReducer);
    // console.log(LoginState);
    useEffect(() => setIsLogin(LoginState), [LoginState]);

    return (
        <FullBoxStyle>
            <OuterBoxStyle>
                <OuterUpBoxStyle>
                    <div>Wanted + 이런 걸 할 수 있어요!</div>
                    <div>
                        매주 업데이트되는 콘첸트를 무제한으로 감상하세요. 언제든
                        해지하실 수 있습니다.
                    </div>
                </OuterUpBoxStyle>

                <OuterMidBoxStyle>
                    <div>
                        <img
                            src="https://static.wanted.co.kr/brown/img/careerhome/careerhome-wantedplus-pc-01.png"
                            alt=""
                        />
                        <div>500여편의 영상 콘텐츠</div>
                        <div>현직자들의 실무 인사이트</div>
                    </div>
                    <div>
                        <img
                            src="https://static.wanted.co.kr/brown/img/careerhome/careerhome-wantedplus-pc-02.png"
                            alt=""
                        />
                        <div>3분만에 읽는 커리어 아티클</div>
                        <div>글로 만나는 일잘러들의 이야기</div>
                    </div>
                    <div>
                        <img
                            src="https://static.wanted.co.kr/brown/img/careerhome/careerhome-wantedplus-pc-03.png"
                            alt=""
                        />
                        <div>업계 동료와 함께하는 전문 클래스</div>
                        <div>커리어 성장을 위한 맞춤 커리큘럼</div>
                    </div>
                </OuterMidBoxStyle>

                <div>
                    <div>
                        {isLogin ? (
                            <>
                                <SubBottom style={{ width: "200px" }}>
                                    <div>첫 구독 0원 신청하기</div>
                                </SubBottom>
                            </>
                        ) : (
                            <>
                                <SubBottom style={{ width: "160px" }}>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            style={{ marginRight: "10px" }}
                                        />
                                        {"구독 신청하기"}
                                    </div>
                                </SubBottom>
                            </>
                        )}
                    </div>
                </div>
            </OuterBoxStyle>
        </FullBoxStyle>
    );
};

export default WantedPlusAD;

const FullBoxStyle = styled.div`
    display: flex;
    width: 100%;
`;

const SubBottom = styled.div`
    height: 40px;
    background-color: #3366ff;
    border-radius: 20px;
    color: white;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0px;
`;

const OuterUpBoxStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div {
        font-size: 24px;
        font-weight: 700;
    }
    & div + div {
        font-size: 15px;
        font-weight: 400;
        margin-top: 7px;
    }
`;

const OuterMidBoxStyle = styled.div`
    transform: translateX(3%);
    display: flex;
    width: 1060px;
    justify-content: space-around;
    & div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    & div div {
        font-size: 18px;
        font-weight: 400;
    }
    & div div + div {
        font-size: 14px;
        color: #959595;
    }
    & img {
        width: 100px;
    }
`;

const OuterBoxStyle = styled.div`
    position: absolute;
    width: 100vw;
    padding: 60px 0 60px 0;
    display: flex;
    left: 0;
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;
    & > div {
        margin-bottom: 40px;
    }
    & > div + div + div {
        margin-bottom: 0;
    }
`;
