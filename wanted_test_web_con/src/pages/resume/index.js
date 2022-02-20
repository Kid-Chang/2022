import styled from "styled-components";

const ResumeIntroPage = () => {
    return (
        <>
            <ResumeTitle>
                <TitleText1>
                    <div>이력서 양식 그 이상.</div>
                    <div>
                        채용 전문가들의 조언을 얻어, 이력서를 잘 쓸 수 있는
                        도구를 만들었습니다.
                        <br /> 서류 통과가 잘 되는 원티드 이력서를 쉽고 빠르게
                        작성해 보세요.
                    </div>
                </TitleText1>

                <TitleButtons>
                    {/* 여기서 케이스 분류해야함. 로그인했으면 각각의 Link가 다르고, 비로그인시 둘다 로그인쪽으로. */}
                    <div>이력서 관리</div>
                    <div>새 이력서 작성</div>
                </TitleButtons>
            </ResumeTitle>
            <Resume1></Resume1>
            <Resume2>
                <div>
                    <div>지원에 유리한</div>
                    <div>
                        글로벌 기업에 보편적이고, 성별이나 가족관계 등 차별 금지
                        정책에 맞춰서 제작하였습니다.
                        <br />
                        <br />
                        군더더기 없이, 당신의 진짜 경쟁력을 드러 내 보세요.
                    </div>
                </div>
                <div></div>
            </Resume2>
            <TitleText3Box>
                <TitleText3>
                    <div>본질에 집중한</div>
                    <div>
                        보다 명확한 정보 설계로 당신의 커리어를 돋보이게 만들어
                        드립니다.
                        <br />
                        <br />
                        불필요한 정보 입력을 최소화하고 이력서 작성에 방해가
                        되는 UI 요소들을 제거하였습니다.
                    </div>
                </TitleText3>
            </TitleText3Box>
            <Resume3></Resume3>
            <Resume4>
                <div>
                    <ResumeText>
                        <div>활용이 자유로운</div>
                        <div>
                            PC/모바일 어디에서나 작성할 수 있고, PDF 파일로
                            저장과 활용이 쉽습니다.
                            <br />
                            <br />
                            가독성에 중점을 두고 설계하여, 파일 저장/출력시에도
                            돋보이는 결과물을 얻을 수 있습니다.
                        </div>
                    </ResumeText>
                    <TitleButtons>
                        <div>샘플 다운로드</div>
                        <div>새 이력서 작성</div>
                    </TitleButtons>
                </div>
                <div></div>
            </Resume4>
        </>
    );
};

export default ResumeIntroPage;

const TitleButtons = styled.div`
    // height: 57px;
    display: flex;
    justify-content: center;
    padding-top: 30px;
    & > div {
        border: 1px solid #36f;
        border-radius: 30px;
        padding: 15px 50px 15px 50px;
        color: #36f;
        margin: 0 5px 0 5px;
        font-weight: 600;
    }
    & > div + div {
        background-color: #36f;
        color: white;
    }
`;

const TitleText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    & div {
        font-size: 56px;
    }
    & div + div {
        margin: 20px 0 0;
        font-size: 18px;
        font-weight: 400;
        line-height: 3;
    }
`;
const TitleText1 = styled(TitleText)`
    & div {
        font-size: 56px;
    }
    & div + div {
        margin: 20px 0 0;
        font-size: 18px;
        font-weight: 400;
        line-height: 3;
    }
`;

const ImgContainerStyle = styled.div`
    background-color: white;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
`;

const ResumeTitle = styled.div`
    padding: 100px 0 20px 0;
`;

const Resume1 = styled(ImgContainerStyle)`
    background-image: url(https://s3.ap-northeast-2.amazonaws.com/wanted-public/resume_intro/resume_01_en.png);
    height: 284px;
`;

const Resume2 = styled(ImgContainerStyle)`
    background-image: url(https://s3.ap-northeast-2.amazonaws.com/wanted-public/resume_intro/resume_02.jpg);
    & > div {
        height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        padding: 80px 0 55px 0;
    }
    & > div div {
        font-weight: 600;
        font-size: 40px;
    }
    & > div div + div {
        margin-top: 20px;
        text-align: center;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.5;
    }
    & > div + div {
        height: 284px;
    }
`;

const TitleText3Box = styled.div`
    padding: 80px 0 55px 0;
`;

const TitleText3 = styled(TitleText)`
    & div {
        font-weight: 600;
        font-size: 40px;
    }
    & div + div {
        margin-top: 20px;
        text-align: center;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.5;
    }
`;
const Resume3 = styled(ImgContainerStyle)`
    background-image: url(https://s3.ap-northeast-2.amazonaws.com/wanted-public/resume_intro/resume_03_ko.png);
    height: 284px;
`;

const Resume4 = styled(ImgContainerStyle)`
    background-image: url(https://s3.ap-northeast-2.amazonaws.com/wanted-public/resume_intro/resume_04.jpg);
    & > div {
        height: 367px;
        padding: 80px 0 55px 0;
    }
    & + div {
        height: 284px;
    }
`;

const ResumeText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;

    & > div {
        font-weight: 600;
        font-size: 40px;
    }
    & div + div {
        margin-top: 20px;
        text-align: center;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.5;
    }
`;
