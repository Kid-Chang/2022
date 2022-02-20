import { useSelector } from "react-redux";
import styled from "styled-components";

const MatchupGuide = () => {
    const { isLogin: LoginState } = useSelector((state) => state.LoginReducer);

    return (
        <>
            {LoginState ? (
                <BlueBoxStyle>
                    <div></div>
                    <div>
                        프로필에 이력서 추가하고, 인사담당자에게 직접 면접 제안
                        받으세요
                    </div>
                    <div>
                        <ResemeButtonSytle>이력서 강화하기</ResemeButtonSytle>
                    </div>
                </BlueBoxStyle>
            ) : (
                <BlueBoxStyle>
                    <div>
                        프로필 작성 3분이면, 10,000개 기업 당신을 찾아갑니다.
                    </div>
                    <div>
                        <div>프로필 등록하기</div>
                    </div>
                </BlueBoxStyle>
            )}
        </>
    );
};
export default MatchupGuide;

const ResemeButtonSytle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 41px;
    width: 174px;
    background-color: whitesmoke;
    color: rgb(37, 139, 246);
    border-radius: 5px;
`;

const BlueBoxStyle = styled.div`
    margin-top: 60px;
    width: 100%;
    background-color: rgb(37, 139, 246);
    color: white;
    display: flex;
    height: 90px;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 0 30px; 
`;
