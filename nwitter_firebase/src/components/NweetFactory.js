import { useEffect, useState, useRef } from "react";

import {
    getDownloadURL,
    getStorage,
    ref,
    uploadString,
} from "firebase/storage";
import { v4 } from "uuid";
import {
    getFirestore,
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

const NweetFactory = ({ userObj }) => {
    const fileInput = useRef();
    const [nweet, setNweet] = useState("");
    const [attachment, setActtachment] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentURL = "";

        if (attachment !== "") {
            const attachmentRef = ref(getStorage(), `${userObj.uid}/${v4()}`);
            const response = await uploadString(
                attachmentRef,
                attachment,
                "data_url",
            );
            attachmentURL = await getDownloadURL(response.ref);
        }
        console.log(attachmentURL);
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL,
        };

        const docRef = await addDoc(collection(getFirestore(), "nweets"), {
            ...nweetObj,
        });
        console.log("Document written with ID: ", docRef.id);
        setNweet("");
        setActtachment("");
        fileInput.current.value = null;

        // const docRef = await addDoc(collection(getFirestore(), "nweets"), {
        //     text: nweet,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid,
        // });
        // console.log("Document written with ID: ", docRef.id);
        // setNweet("");

        // 업로드 방식 변경.

        //  *** 업로드 로직:
        // 만약 이미지가 있다면 이미지를 파이어베이스의 스토리지에 올리고 그 url을 nweet에 담아서 저장.
        // 이게 RC에서 들었던 업로드 로직인듯.
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
        // console.log(value);
    };

    // console.log(nweets);

    const onFileChange = (e) => {
        console.log(e.target.files);
        const {
            target: { files },
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            console.log("read finish");
            const {
                currentTarget: { result },
            } = finishedEvent;
            setActtachment(result);
            console.log("result:");
            console.log(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachmentClick = () => {
        setActtachment(null);
        fileInput.current.value = null;
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="What's on your mind?"
                maxLength="120"
                value={nweet}
                onChange={onChange}
            />
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                ref={fileInput}
            />
            <input type="submit" value="Nweet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" alt="" />
                    <button onClick={onClearAttachmentClick}>Clear</button>
                </div>
            )}
        </form>
    );
};
export default NweetFactory;
