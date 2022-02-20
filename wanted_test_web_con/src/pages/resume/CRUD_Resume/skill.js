import { useEffect, useState } from "react";
import styled from "styled-components";

const OneSkillItem = ({ skillText, setSkills, skills }) => {
    const DeleteSkillItem = () => {
        setSkills((items) => items.filter((item) => item !== skillText));
    };

    return (
        <ResumeSkillInput className="ResumeSkillInput" data-skill-name="Python">
            {skillText}
            <button
                type="button"
                className="skillDeleteButton"
                onClick={DeleteSkillItem}
            >
                <svg
                    width="16.59751037344398"
                    height="16.59751037344398"
                    viewBox="0 0 24 24"
                    color="#939393"
                >
                    <path
                        fill="currentColor"
                        d="M17.97 19.03a.75.75 0 001.06-1.06l-6.5-6.5a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 13.06l5.97 5.97zM12 10.94L6.03 4.97a.75.75 0 00-1.06 1.06l6.5 6.5a.75.75 0 001.06 0l6.5-6.5a.75.75 0 00-1.06-1.06L12 10.94z"
                    ></path>
                </svg>
            </button>
        </ResumeSkillInput>
    );
};

const ResumeSkillInput = styled.span`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f5f8;
    border-radius: 19px;
    margin-right: 10px;
    height: 38px;
    padding: 0 17px;
    margin-top: 10px;
    & button {
        margin-left: 10px;
        margin-top: -4px;
    }
`;

const PickSkillItem = ({ skill, setSkills, skills }) => {
    const addSkill = () => {
        if (skills.indexOf(skill) === -1) {
            setSkills((item) => [...item, skill]);
        }
    };
    return (
        <SkillBtn onClick={addSkill}>
            <span>{skill}</span>
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                >
                    <g fill="none" fill-rule="evenodd">
                        <g fill="#939393">
                            <g>
                                <path
                                    d="M3.151 3.151c.202-.201.53-.201.732 0L8 7.27l4.117-4.118c.202-.201.53-.201.732 0 .201.202.201.53 0 .732L8.73 8l4.118 4.117c.18.18.199.458.06.66l-.06.072c-.202.201-.53.201-.732 0L8 8.73 3.883 12.85c-.202.201-.53.201-.732 0-.201-.202-.201-.53 0-.732L7.27 8 3.151 3.883c-.18-.18-.199-.458-.06-.66z"
                                    transform="translate(-156 -497) translate(156 497) rotate(-45 8 8)"
                                ></path>
                            </g>
                        </g>
                    </g>
                </svg>
            </span>
        </SkillBtn>
    );
};

//메인 SkillBox
const SkillBox = () => {
    const [skills, setSkills] = useState([]);
    useEffect(() => console.log(skills), [skills]);
    return (
        <OuterBox>
            <RecommandSkilllBox>
                <div className="recommendSkillContainer">
                    <span>많이 쓰는 인기 스킬을 추가해보세요!</span>

                    <button type="button">닫기</button>
                </div>
                <p>
                    {skillList.map((skill, idx) => {
                        return (
                            <PickSkillItem
                                setSkills={setSkills}
                                skill={skill}
                                key={idx}
                                skills={skills}
                            />
                        );
                    })}
                </p>
            </RecommandSkilllBox>
            <p className="ResumeSkillInput" style={{ marginTop: "6px" }}>
                {skills.map((skillName, idx) => {
                    return (
                        <OneSkillItem
                            skillText={skillName}
                            setSkills={setSkills}
                            key={idx}
                            skills={skills}
                        />
                    );
                })}
            </p>
        </OuterBox>
    );
};

export default SkillBox;

const SkillBtn = styled.button` 
& span:nth-child(1){
    margin-right:9px;
}
    display: inline-flex !important;
    justify-content: center !important;
    align-items: center !important;
    background-color: #e4f4ec !important;
    border-radius: 19px !important;
    margin-right: 10px !important;
    height: 38px !important;
    padding: 0 17px !important;
    margin-top: 10px !important;
}
`;

const RecommandSkilllBox = styled.div`
    & .recommendSkillContainer span {
        color: #333;
        font-size: 13px;
        line-height: 27px;
        letter-spacing: 0;
        margin-bottom: 2px;
    }

    display: flex;
    background-color: #f5fcf8;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 18px 21px 18px 17px;
`;
const OuterBox = styled.div`
    .recommendSkillContainer {
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
`;

const skillList = [
    "Python",
    "Spring Framework",
    "AWS",
    "Git",
    "iOS",
    "HTML",
    "JavaScript",
    "MySQL",
    "SQL",
    "리눅스",
    "Android",
    "Kotlin",
    "Swift",
    "C / C++",
    "PHP",
    "Docker",
];
