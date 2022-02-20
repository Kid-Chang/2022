import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { EducationEditAction } from "../../../store/actions/resume";
import OneEducationItem from "./academyList";
import OneCareerItem from "./career/careerList";
import SkillBox from "./skill";
import OneAwardItem from "./awardList";
import OneLangItem from "./foreignLanguageList";
import OneLinkItem from "./linkList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faDownload } from "@fortawesome/free-solid-svg-icons";

const CRUDResume = () => {
    const {
        jwt,
        userIdx,
        userName: name,
        email: Emaill,
        phoneNum,
    } = useSelector((state) => state.LoginReducer);
    // 여기에 자료 불러오는 api랑 post api랑 두개가 들어가야함.
    const params = useParams();
    const ResumeIdxx = params.id;
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [resumeTitle, setResumeTitle] = useState("");
    const [introduceMyself, setIntroduceMyself] = useState("");
    const [verifyCode, setVerifyCode] = useState("");

    const onChange = (e) => {
        // console.log(e.target);
        const {
            target: { name, value },
        } = e;

        if (name === "email") {
            setEmail(value);
        } else if (name === "userName") {
            setUserName(value);
        } else if (name === "resumeTitle") {
            setResumeTitle(value);
        } else if (name === "phoneNumber") {
            setPhoneNumber(value);
        } else if (name === "introduceMyself") {
            setIntroduceMyself(value);
        }
    };
    const ref = useRef();
    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = "38px";
        ref.current.style.height = ref.current.scrollHeight + "px";
    }, []);
    // const onSignUp = async () => {
    //     const SURL = `${ServerSignURL}/users`;
    //     console.log(SURL);
    //     const upload = {
    //         name: userName,
    //         email: email,
    //         password: password,
    //         phoneNum: phoneNumber,
    //         agreeClause: "agree",
    //         agreeAd: "agree",
    //     };

    //     // const data = await axios({
    //     //     method: "POST",
    //     //     url: `${ServerSignURL}/users`,

    //     //     data: upload,
    //     // });

    //     const serverValue = await axios.post(`${ServerSignURL}/users`, upload);
    //     const { data: serverData } = serverValue;
    //     console.log(serverData);
    //     if (serverData.isSuccess === true) {
    //         setServerErrMsg("");
    //         onSignClickDataClear();
    //     } else {
    //         setServerErrMsg(serverData.message);
    //     }
    // };
    // const dispatch = useDispatch();
    // const EduValue = useSelector((state) => state.ResumeReducer);
    const [schoolName, setSchoolName] = useState("");
    const [academyList, setAcademyList] = useState([]);
    useEffect(() => console.log(academyList), [academyList]);
    const [eduIdx, setEduIdx] = useState(0);

    const addEdu = () => {
        console.log("add");
        setAcademyList((item) => ({ ...item, eduIdx }));
        setEduIdx(eduIdx + 1);
    };

    const EditEdu = () => {
        console.log("wow");
    };

    const onChanged = (e) => {
        console.log(e.target.name);
        const {
            target: { name, value },
        } = e;
        setSchoolName(value);
    };
    return (
        <div>
            <Row className="justify-content-md-center">
                <Col style={{ maxWidth: "1090px" }}>
                    {/* <button onClick={() => addEdu()}>add</button>
                    <button onClick={() => EditEdu()}>edit</button>

                    {academyList &&
                        academyList.map((e, index) => {
                            return (
                                <>
                                    <OneEducationItem
                                        academy={e}
                                        setAcademyList={setAcademyList}
                                        key={index}
                                    />
                                </>
                            );
                        })} */}

                    {/* / */}

                    {/* / */}
                    {/* / */}

                    <div>{ResumeIdxx}</div>
                    <HeadToolBox>
                        <div className="Lang">
                            <FontAwesomeIcon icon={faGlobe} className="Globe" />
                            <select>
                                <option value="ko">한국어</option>
                                <option value="ja">日本語</option>
                                <option value="tw">繁體中文</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className="twoButton">
                                <div>
                                    <button>
                                        <span style={{ color: "#36f" }}>
                                            합격 / 불합격 단어 가이드
                                        </span>
                                    </button>
                                </div>
                                <div>
                                    <button>
                                        <span>내 이력서 단어 체크</span>
                                    </button>
                                    <label>
                                        <input type="checkbox" />
                                        <span></span>
                                    </label>
                                </div>
                            </div>
                            <button type="button" className="downBtn">
                                <FontAwesomeIcon icon={faDownload} />
                            </button>
                        </div>
                    </HeadToolBox>
                    <ResumeContentList>
                        <HeadBox>
                            <div>
                                <div className="titleBox">
                                    <input
                                        className="title"
                                        type="text"
                                        maxlLegth="100"
                                        placeholder="이력서 제목(필수)"
                                        name="resumeTitle"
                                        value={resumeTitle}
                                        autocomplete="off"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <input
                                className="ResumeInput_name"
                                type="text"
                                maxLength="100"
                                placeholder="이름(필수)"
                                name="userName"
                                value={userName}
                                autocomplete="off"
                                onChange={onChange}
                            />
                            <input
                                className="ResumeInput_email"
                                type="email"
                                maxLength="120"
                                placeholder="이메일(필수)"
                                name="email"
                                value={email}
                                autocomplete="off"
                                onChange={onChange}
                            />
                            <input
                                className="ResumeInput_mobile"
                                type="tel"
                                maxLength="200"
                                placeholder="연락처(필수) ex) 010-0000-0000"
                                name="phoneNumber"
                                value={phoneNumber}
                                autocomplete="off"
                                onChange={onChange}
                            />
                        </HeadBox>
                        <div>
                            <ResumeDetailBody>
                                <div className="about">간단 소개글</div>
                                <p className="guide">
                                    • 본인의 업무 경험을 기반으로 핵심역량과
                                    업무 스킬을 간단히 작성해주세요. <br />•
                                    3~5줄로 요약하여 작성하는 것을 추천합니다!
                                </p>
                                <div className="detailTextArea">
                                    <textarea
                                        onChange={(e) => {
                                            handleResizeHeight();
                                            onChange(e);
                                        }}
                                        ref={ref}
                                        name="introduceMyself"
                                        maxlength="2000"
                                        placeholder="간단한 자기소개를 통해 이력서를 돋보이게 만들어보세요. (3~5줄 권장)"
                                        value={introduceMyself}
                                    ></textarea>
                                </div>
                            </ResumeDetailBody>
                            <ResumeList>
                                <div className="career">
                                    <div className="about">경력</div>
                                    <p className="guide">
                                        • 담당하신 업무 중 우선순위가 높은
                                        업무를 선별하여 최신순으로 작성해주세요.{" "}
                                        <br />• 경력사항이 없는 경우 '신입'으로
                                        작성해주세요.
                                        <br />• 업무 성과는 되도록 구체적인 숫자
                                        혹은 %로 표현해주세요!
                                    </p>

                                    <button className="ResumeInput">
                                        + 추가
                                    </button>
                                    <ul className="SortableList_SortableList__Iecvd">
                                        <OneCareerItem />
                                    </ul>
                                </div>
                                <div className="Education">
                                    <div className="about">학력</div>
                                    <p className="guide">
                                        • 최신순으로 작성해주세요.
                                    </p>
                                    <div className="ResumeContentList">
                                        <button
                                            className="ResumeInput"
                                            onClick=""
                                        >
                                            + 추가
                                        </button>
                                        <ul>
                                            <OneEducationItem />
                                        </ul>
                                    </div>
                                </div>
                                <div className="skill">
                                    <div className="about">스킬</div>
                                    <p className="guide">
                                        • 개발 스택, 디자인 툴, 마케팅 툴 등
                                        가지고 있는 직무와 관련된 스킬을
                                        추가해보세요.
                                        <br />• 데이터 분석 툴이나 협업 툴 등의
                                        사용해본 경험이 있으신 툴들도
                                        추가해보세요.
                                    </p>
                                    <div className="ResumeContentList">
                                        <button className=" ResumeInput">
                                            + 추가
                                        </button>

                                        <SkillBox />
                                    </div>
                                </div>
                                <div className="awardNetc">
                                    <div className="about">수상 및 기타</div>
                                    <p className="guide">
                                        • 수상 이력, 직무 관련 자격증, 수료한
                                        교육이나 참석한 외부활동 등이 있다면
                                        간략히 작성해주세요.
                                        <br />• 지원하는 회사에서 요구하는
                                        경우가 아니라면 운전면허증과 같은
                                        자격증은 생략하는 것이 좋습니다!
                                    </p>
                                    <div className="ResumeContentList">
                                        <button className="ResumeInput">
                                            + 추가
                                        </button>
                                        <ul>
                                            <OneAwardItem />
                                        </ul>
                                    </div>
                                </div>
                                <div className="lang">
                                    <div className="about">외국어</div>
                                    <p className="guide">
                                        • 외국어 자격증을 보유한 경우
                                        작성해주세요.
                                        <br />• 활용 가능한 외국어가 있다면,
                                        어느정도 수준인지 레벨을 선택해주세요.
                                    </p>
                                    <div className="ResumeContentList">
                                        <button className="ResumeInput">
                                            + 추가
                                        </button>
                                        <ul>
                                            <OneLangItem />
                                        </ul>
                                    </div>
                                </div>
                                <div className="link">
                                    <div className="about">링크</div>
                                    <p className="guide">
                                        • 깃헙, 노션으로 작성한 포트폴리오, 구글
                                        드라이브 파일 등 업무 성과를 보여줄 수
                                        있는 링크가 있다면 작성해주세요.
                                    </p>
                                    <div className="ResumeContentList">
                                        <button className="ResumeInput">
                                            + 추가
                                        </button>
                                        <ul>
                                            <OneLinkItem />
                                        </ul>
                                    </div>
                                </div>
                            </ResumeList>
                        </div>
                        <FixedToolBar>
                            <div>
                                <div></div>
                                <div>
                                    <div>
                                        <button>
                                            <span>임시 저장</span>
                                        </button>
                                        <button
                                            style={{
                                                backgroundColor: "#36f",
                                                color: "white",
                                            }}
                                        >
                                            <span>작성 완료</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </FixedToolBar>
                    </ResumeContentList>
                </Col>
            </Row>
        </div>
    );
};

const HeadToolBox = styled.div`
    & .downBtn {
        border: 1px solid #999;
        width: 40px;
        min-width: unset;
        height: 40px;
        padding: 0;
        outline: none !important;
        border-radius: 3px;
    }
    & button {
        border: 0;
        background: none;
        padding: 6px 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        min-width: 64px;
        box-sizing: border-box;
        border-radius: 25px;
        font-weight: 500;
        line-height: normal;
        cursor: pointer;
    }
    & .twoButton {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-color: #fff;
        margin-right: 30px;
    }
    & select {
        color: rgba(0, 0, 0, 0.5);
        font-weight: 400;
    }
    * {
        color: #333333;
    }
    .Globe {
        font-size: 18px;
        left: 10px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    & .Lang {
        padding: 0;
        height: 40px;
        border-radius: 2px;
        border: 1px solid #333;
        background-color: #fff;
        position: relative;
        width: 102px;
        & select {
            background: none;
            appearance: none;
            position: relative;
            width: 100%;
            min-width: 98px;
            height: 100%;
            padding-left: 37px;
            border: #e0e0e0;
            background-color: transparent;
            box-shadow: none;
        }
    }
    position: fixed;
    display: flex;
    flex-wrap: nowrap;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    top: 50px;
    right: 5%;
    left: 5%;
    z-index: 4;
    padding: 20px 0;
`;

const FixedToolBar = styled.div`
    & > div button {
        width: 170px;
        margin-right: 9px;
        height: 50px;
        font-size: 16px;
        color: #36f;
        background-color: #fff;
        border: 1px solid #36f;
        ertical-align: middle;
        min-width: 64px;
        padding: 0 27px;
        box-sizing: border-box;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 700;
        line-height: normal;
        cursor: pointer;
    }
    position: fixed;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0 50px;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
    & > div {
        display: flex;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        width: 100%;
        max-width: 1060px;
        padding: 15px 0;
        margin: 0 auto;
    }
`;

const ResumeContentList = styled.div`
    * {
        color: #333333;
    }
    input:focus {
        outline: none;
    }
    textarea:focus {
        outline: none;
    }
    & {
        color: rgba(0, 0, 0, 0.4);
    }
    & .Period_Period__form_label {
        padding: 0;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
    }
    & .Period_Period__form_checkbox {
        margin: 16px 0 30px;
    }

    & .BtnDelete {
        position: absolute;
        color: #d1d1d1;
        font-size: 25px;
        padding: 15px;
        top: 21px;
        right: 15px;
    }

    & .rightDiv {
        width: 100%;
    }
    & .AttributeContentList {
        font-size: 16px;
        padding: 20px 0;
        color: #36f;
        background-color: transparent;
        width: 100%;
        display: block;
        font-weight: 600;
        text-align: left;
        border-radius: 0;
    }
    & .WorkInput {
        background-color: transparent;
        border: none;
        padding: 0;
        margin-bottom: 3px;
        border-radius: 0;
        height: auto;
        width: 100%;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    & .SearchModalInput {
        cursor: pointer;
        color: #3b3d40;
        font-size: 20px;
        font-weight: 600;
        background-color: transparent;
        border: none;
        padding: 0;
        margin-bottom: 3px;
        border-radius: 0;
        height: auto;
        width: 100%;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    & .leftDiv {
        width: 250px;
    }
    & .Period_Period__form {
        display: inline-block;
    }
    & .Period_Period__form .Period_Period {
        display: inline-block;
    }
    & .Period__form__start {
        display: inline-block;
    }
    & .Period__form {
        display: inline-block;
        margin-top: 0;
    }
    & .Period__datetime {
        position: relative;
    }
    ul {
        list-style: none;
        padding-left: 0px;
    }
    font-size: 14px;
    line-height: 1.42857143;
    color: #333333;
    & .Period__form .Period__form__start {
        display: inline-block;
    }
    & [type="text"].month {
        width: 26px;
        margin-left: 4px;
    }
    & [type="text"].year {
        width: 36px;
    }
    & [type="text"] {
        color: rgba(0, 0, 0, 0.4);
        height: auto;
        padding: 0;
        border: none;
        border-radius: 0;
        font-size: 14px;
        font-weight: 500;
        background-color: transparent;
        box-shadow: none !important;
        resize: none;
    }
    & .clearfix {
        display: flex;
    }
    & .commonBox {
        margin: 0;
        padding: 30px;
        position: relative;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid #f1f1f1;
        background-color: transparent;
        display: block;
    }
`;
const ResumeList = styled.div`
& button{
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
}
& .ResumeInput {
    color: #36f;
    background-color: transparent;
    width: 100%;
    padding: 30px 0;
    display: block;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0;
}
& .about {
    padding: 20px 0 6px;
    font-size: 16px;
    font-weight: 500;
    color: #3b3d40;
    border-bottom: 1px solid #bababa;
}
& .guide {
    white-space: pre-wrap;
    padding: 10px;
    background-color: #f3f9fe;
    font-size: 12px;
    line-height: 1.42;
    letter-spacing: normal;
    color: #666;
    margin-top: 10px;
    }
}`;

const ResumeDetailBody = styled.div` 
margin-bottom: 60px;

& textarea {
    width: 100%;
    height: 34px;
    color: rgb(59, 61, 64);
    margin: 30px 0px 3px;
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    caret-color: #000;
    overflow: hidden;
    line-height: 22px;
    box-shadow: none!important;
    resize: none;
    background-color: transparent;
    border: none;
    padding: 0;
}
& .detailTextArea{
    position: relative;
    overflow-x: hidden;
    
}
& .about {
    padding: 20px 0 6px;
    font-size: 16px;
    font-weight: 500;
    color: #3b3d40;
    border-bottom: 1px solid #bababa;
}
& .guide {
    white-space: pre-wrap;
    padding: 10px;
    background-color: #f3f9fe;
    font-size: 12px;
    line-height: 1.42;
    letter-spacing: normal;
    color: #666;
    margin-top: 10px;
    }
}

`;

const HeadBox = styled.div`
    & input:focus {
        outline: none;
    }
    position: relative;
    padding-bottom: 50px;

    & input[class*="ResumeInput"] {
        background-color: transparent;
        border: none;
        padding: 0;
        margin-bottom: 3px;
        border-radius: 0;
        height: auto;
        width: 100%;
        white-space: pre-wrap;
        word-wrap: break-word;
        margin-top: 10px;
        margin-bottom: 0;
    }
    & .titleBox {
    }
    & .title {
        background-color: black;
        color: #3b3d40;
        font-size: 36px;
        line-height: 36px;
        font-weight: 500;
        margin: 130px 0 50px;
        background-color: transparent;
        border: none;
        padding: 0;
        border-radius: 0;
        height: auto;
        width: 100%;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
`;

export default CRUDResume;

// 이력서 개별 결과. --> 리스트 이용해야함. 복잡네.
// {
//     "isSuccess": true,
//     "code": 1000,
//     "message": "요청에 성공하였습니다.",
//     "result": {
//         "resumeIdx": 1,
//         "resumeName": "  421",
//         "resumeContent": "본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성하였습니다.\r\n간단히 3~5줄로 요약하여 작성하는 것을 추천하기에 짧게 썼습니다! 뽑아주세요!! ",
//         "careerList": [
//             {
//                 "careerIdx": 1,
//                 "careerPeriod": "2020.03-2021.05",
//                 "company": "씨제이올리브영(CJ올리브영)",
//                 "department": "서버개발담당팀",
//                 "isWorking": "false",
//                 "performanceList": [
//                     {
//                         "performanceIdx": 1,
//                         "performanceTitle": "서버 혼자 만듦!!",
//                         "performancePeriod": "2020.04-2020.05",
//                         "performanceContent": "혼자 만듦 대단하죠?"
//                     },
//                     {
//                         "performanceIdx": 2,
//                         "performanceTitle": "스프링 부트를 사용해 서버 구축",
//                         "performancePeriod": "2020.05-2020.07",
//                         "performanceContent": "협업은 경험하지 못했지만 그래도 괜찮다. 나중에 하지 뭐"
//                     },
//                     {
//                         "performanceIdx": 50,
//                         "performanceTitle": "서버 혼자 만듦!!",
//                         "performancePeriod": "2020.04-2020.05",
//                         "performanceContent": "혼자 만듦 대단하죠?"
//                     },
//                     {
//                         "performanceIdx": 51,
//                         "performanceTitle": "서버 혼자 만듦!!",
//                         "performancePeriod": "2020.04-2020.05",
//                         "performanceContent": "혼자 만듦 대단하죠?"
//                     },
//                     {
//                         "performanceIdx": 52,
//                         "performanceTitle": "서버 혼자 만듦!!",
//                         "performancePeriod": "2020.04-2020.05",
//                         "performanceContent": "혼자 만듦 대단하죠?"
//                     },
//                     {
//                         "performanceIdx": 53,
//                         "performanceTitle": "서버 혼자 만듦!!",
//                         "performancePeriod": "2020.04-2020.05",
//                         "performanceContent": "혼자 만듦 대단하죠?"
//                     },
//                     {
//                         "performanceIdx": 54,
//                         "performanceTitle": null,
//                         "performancePeriod": "2020.05-2020.07",
//                         "performanceContent": "협업은 경험하지 못했지만 그래도 괜찮다. 나중에 하지 뭐"
//                     }
//                 ]
//             },
//             {
//                 "careerIdx": 22,
//                 "careerPeriod": "2020.03-2021.05",
//                 "company": "씨제이올리브영(CJ올리브영)",
//                 "department": "서버개발담당팀",
//                 "isWorking": "false",
//                 "performanceList": []
//             }
//         ],
//         "academyList": [
//             {
//                 "academyIdx": 1,
//                 "academyPeriod": "2011.01-2014.02",
//                 "academy": "찐마지막 새 이름2",
//                 "major": "test",
//                 "researchContent": null,
//                 "isAttending": "false"
//             },
//             {
//                 "academyIdx": 2,
//                 "academyPeriod": "2011.01-2014.02",
//                 "academy": "새 이름2",
//                 "major": "test",
//                 "researchContent": null,
//                 "isAttending": "false"
//             }
//         ],
//         "skillList": [
//             {
//                 "skillIdx": 1,
//                 "skill": "Python"
//             },
//             {
//                 "skillIdx": 2,
//                 "skill": "Spring Framework"
//             },
//             {
//                 "skillIdx": 4,
//                 "skill": "Git"
//             }
//         ],
//         "awardList": [
//             {
//                 "awardIdx": 3,
//                 "awardPeriod": "2021.03-2022.03",
//                 "awardTitle": "라이징 캠프",
//                 "awardContent": "라이징캠프를 우수한 성적으로 수료해..."
//             },
//             {
//                 "awardIdx": 4,
//                 "awardPeriod": "2022.01-2022.03",
//                 "awardTitle": "우아한 코스",
//                 "awardContent": "우아한 코스를 우수한 성적으로 수료해..."
//             }
//         ],
//         "foreignLanguageList": [
//             {
//                 "languageIdx": 1,
//                 "language": "영어",
//                 "level": "유창함",
//                 "languageTestList": [
//                     {
//                         "testIdx": 1,
//                         "test": "토익",
//                         "result": "900점",
//                         "languageTestPeriod": "2021.03.12"
//                     },
//                     {
//                         "testIdx": 3,
//                         "test": "토플",
//                         "result": "90점",
//                         "languageTestPeriod": "2020.05.07"
//                     }
//                 ]
//             },
//             {
//                 "languageIdx": 3,
//                 "language": "일본어",
//                 "level": "일상회화",
//                 "languageTestList": []
//             }
//         ],
//         "linkList": [
//             {
//                 "linkIdx": 1,
//                 "link": "https://github.com/mock-rc3/Wanted_Test_Server_Miso"
//             },
//             {
//                 "linkIdx": 2,
//                 "link": "https://github.com/dsad/RisingCamp-edu"
//             },
//             {
//                 "linkIdx": 3,
//                 "link": "https://github.com/dsad/RisingCamp-edu"
//             }
//         ]
//     }
// }
