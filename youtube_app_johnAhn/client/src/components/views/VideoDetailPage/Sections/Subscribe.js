import axios from "axios";
import React, { useEffect, useState } from "react";

const Subscribe = (props) => {
    const userTo = props.userTo;
    const userFrom = props.userFrom;

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const variables = { userTo, userFrom: localStorage.getItem("userId") };
        axios.post("/api/subscribe/subscribeNumber", variables).then((res) => {
            if (res.data.success) {
                // console.log(res.data);
                setSubscribeNumber(res.data.subscriberNumber);
            } else {
                alert("구독자수 가져오기를 실패");
            }
        });

        axios.post("/api/subscribe/subscribed", variables).then((response) => {
            if (response.data.success) {
                console.log(response.data);
                setSubscribed(response.data.subscribed);
            } else {
                alert("구독했는지 확인할 수 없습니다.");
            }
        });
    }, []);

    const onSubscribe = () => {
        const variables = {
            userTo: userTo,
            userFrom: userFrom,
        };

        if (Subscribed) {
            // already subscribe
            axios.post("/api/subscribe/unsubscribe", variables).then((res) => {
                if (res.data.success) {
                    setSubscribeNumber(SubscribeNumber - 1);
                    setSubscribed(!Subscribed);
                } else {
                    alert("구독 취소를 실패했습니다.");
                }
            });
        } else {
            // didn't subscribe
            axios.post("/api/subscribe/subscribe", variables).then((res) => {
                if (res.data.success) {
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed);
                } else {
                    alert("구독을 실패했습니다.");
                }
            });
        }
    };

    return (
        <div>
            <button
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
                    borderRadius: "4px",
                    color: "white",
                    padding: "10px 16px",
                    fontWeight: "500",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                }}
            >
                {SubscribeNumber} {Subscribed ? "Subscribed" : "subscribe"}
            </button>
        </div>
    );
};

export default Subscribe;
