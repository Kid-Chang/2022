import { useState } from "react";
import styled from "styled-components";

const OneLangItem = ({ setAcademyList, academy }) => {
    // 인덱스id 불러와서 그걸 통해 저장하기.
    // console.log(academy);
    const [startYear, setStartYear] = useState(""); // 지금은 공백이지만 값이 있다면 그거 불러오도록!
    const [startMonth, setStartMonth] = useState("");
    const [endYear, setEndYear] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [checked, setChecked] = useState("");
    const [search, setSearch] = useState("");
    const [workInput, setWorkInput] = useState("");
    const [subject, setSubject] = useState("");

    const onChange = (e) => {
        // console.log(e.target);
        const {
            target: { name, value },
        } = e;

        if (name === "startYear") {
            setStartYear(value);
        } else if (name === "startMonth") {
            setStartMonth(value);
        } else if (name === "endYear") {
            setEndYear(value);
        } else if (name === "endMonth") {
            setEndMonth(value);
        } else if (name === "checked") {
            setChecked(value);
        } else if (name === "search") {
            setSearch(value);
        } else if (name === "WorkInput") {
            setWorkInput(value);
        } else if (name === "subject") {
            setSubject(value);
        }
    };

    return (
        <li className="commonBox careers list-group-item">
            <EduStyle>
                <div className="CareerItem clearfix">
                    <div className="leftDiv">
                        <div className="">
                            <div className="Period__datetime">
                                <div className="Period__form">
                                    <div className="Period__form__start"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rightDiv">
                        <div className="SearchModalInput">
                            <form action=".">
                                <input
                                    onChange={onChange}
                                    type="search"
                                    name="search"
                                    className="SearchModalInput"
                                    placeholder="언어"
                                    value={search}
                                />
                            </form>
                        </div>
                        <div>
                            <input
                                onChange={onChange}
                                className="WorkInput"
                                type="text"
                                maxlength="255"
                                placeholder="수준"
                                name="WorkInput"
                                value={workInput}
                            />
                        </div>
                        <div>
                            <input
                                onChange={onChange}
                                className="subject"
                                type="text"
                                maxlength="255"
                                placeholder="어학시험 추가"
                                name="subject"
                                value={subject}
                            />
                        </div>
                    </div>
                    <button type="button" className="BtnDelete">
                        x
                    </button>
                </div>
            </EduStyle>
        </li>
    );
};

export default OneLangItem;

const EduStyle = styled.div``;
