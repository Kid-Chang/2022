// 여기에 로그인 비로그인 버전 두개 다 만들기,

import styled from "styled-components";

export const NotLoginRecommendJob = () => {
    return (
        <OutStyle>
            <OutBoxStyle>
                <BoxTopStyle>
                    <div>
                        wanted ai 가 제안하는 합격률 높은 포지션
                        <button>
                            <svg width="24" height="24" viewBox="0 0 17 17">
                                <defs>
                                    <filter id="bfoh3u0w3a">
                                        <feColorMatrix
                                            in="SourceGraphic"
                                            values="0 0 0 0 0.600000 0 0 0 0 0.600000 0 0 0 0 0.600000 0 0 0 1.000000 0"
                                        ></feColorMatrix>
                                    </filter>
                                </defs>
                                <g fill="none" fillRule="evenodd">
                                    <g>
                                        <g>
                                            <g transform="translate(-1080 -374) translate(1080 374)">
                                                <g>
                                                    <path
                                                        stroke="#999"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.2"
                                                        d="M9.421 13.334c-.736.277-1.535.43-2.368.43-3.706 0-6.71-3.005-6.71-6.711 0-3.707 3.004-6.71 6.71-6.71 1.853 0 3.53.75 4.745 1.965 1.214 1.214 1.965 2.892 1.965 4.745 0 1.853-.75 3.53-1.965 4.745"
                                                        transform="translate(1 1)"
                                                    ></path>
                                                    <path
                                                        fill="#999"
                                                        d="M6.382 10.408c0-.371.3-.671.67-.671.371 0 .672.3.672.67 0 .372-.3.672-.671.672-.37 0-.671-.3-.671-.671"
                                                        transform="translate(1 1) rotate(-180 7.053 10.408)"
                                                    ></path>
                                                    <path
                                                        stroke="#999"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.2"
                                                        d="M5.04 5.655c0-1.08.901-1.958 2.013-1.958 1.11 0 2.013.877 2.013 1.958 0 1.08-1.007 1.957-2.013 1.957v.783"
                                                        transform="translate(1 1)"
                                                    ></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </BoxTopStyle>
                <div>
                    <EllipseBoxStyle>
                        <div>
                            <div>회원가입하면 포지션을 추천해드려요.</div>
                        </div>
                        <div>
                            <ApplyButtonStyle>
                                <div>지금 시작하기</div>
                            </ApplyButtonStyle>
                        </div>
                    </EllipseBoxStyle>
                </div>
            </OutBoxStyle>
        </OutStyle>
    );
};

const ApplyButtonStyle = styled.div`
    border-radius: 90px;
    background-color: rgb(51, 102, 255);
    width: 127px;
    height: 42px;

    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 16px;
`;

const EllipseBoxStyle = styled.div`
    border-radius: 90px;
    height: 92px;
    background-color: #f3f9fe;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px 25px 50px;

    & > div {
        font-size: 18px;
    }
`;

const BoxTopStyle = styled.div`
    margin-top: 70px;
    font-weight: 600;
    font-size: 22px;
    & > div > button {
        background-color: white;
        border: 0;
    }
`;

const OutBoxStyle = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    & > div + div {
        width: 100%;
    }
`;

const OutStyle = styled.div`
    padding-bottom: 45px;
    border-bottom: 1px solid black;
`;

// export const LoginRecommendJob = () => {
//     return (
//         <OutStyle>
//             <OutBoxStyle>
//                 <BoxTopStyle>
//                     <div>
//                         wanted ai 가 제안하는 합격률 높은 포지션
//                         <button>
//                             <svg width="24" height="24" viewBox="0 0 17 17">
//                                 <defs>
//                                     <filter id="bfoh3u0w3a">
//                                         <feColorMatrix
//                                             in="SourceGraphic"
//                                             values="0 0 0 0 0.600000 0 0 0 0 0.600000 0 0 0 0 0.600000 0 0 0 1.000000 0"
//                                         ></feColorMatrix>
//                                     </filter>
//                                 </defs>
//                                 <g fill="none" fillRule="evenodd">
//                                     <g>
//                                         <g>
//                                             <g transform="translate(-1080 -374) translate(1080 374)">
//                                                 <g>
//                                                     <path
//                                                         stroke="#999"
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                         strokeWidth="1.2"
//                                                         d="M9.421 13.334c-.736.277-1.535.43-2.368.43-3.706 0-6.71-3.005-6.71-6.711 0-3.707 3.004-6.71 6.71-6.71 1.853 0 3.53.75 4.745 1.965 1.214 1.214 1.965 2.892 1.965 4.745 0 1.853-.75 3.53-1.965 4.745"
//                                                         transform="translate(1 1)"
//                                                     ></path>
//                                                     <path
//                                                         fill="#999"
//                                                         d="M6.382 10.408c0-.371.3-.671.67-.671.371 0 .672.3.672.67 0 .372-.3.672-.671.672-.37 0-.671-.3-.671-.671"
//                                                         transform="translate(1 1) rotate(-180 7.053 10.408)"
//                                                     ></path>
//                                                     <path
//                                                         stroke="#999"
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                         strokeWidth="1.2"
//                                                         d="M5.04 5.655c0-1.08.901-1.958 2.013-1.958 1.11 0 2.013.877 2.013 1.958 0 1.08-1.007 1.957-2.013 1.957v.783"
//                                                         transform="translate(1 1)"
//                                                     ></path>
//                                                 </g>
//                                             </g>
//                                         </g>
//                                     </g>
//                                 </g>
//                             </svg>
//                         </button>
//                     </div>
//                 </BoxTopStyle>
//                 <div>
//                     <div>여기에 캐러셀</div>
//                 </div>
//             </OutBoxStyle>
//         </OutStyle>
//     );
// };
