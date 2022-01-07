import { useEffect, useState, useRef } from "react";
import {
    getFirestore,
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

const Home = ({ userObj }) => {
    useEffect(() => {
        onSnapshot(
            query(collection(getFirestore(), "nweets"), orderBy("createdAt")),
            (snapshot) => {
                console.log(snapshot.docs);
                const nweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    //...doc.data() 하면 doc.data()의 데이터 전체를 뿌려(...)준다.
                }));
                // console.log("arry:");
                // console.log(nweetArray);
                setNweets(nweetArray);
                console.log("its work");
            },
        );
    }, []);
    // const db = getFirestore();
    // console.log(userObj);
    const [nweets, setNweets] = useState([]);

    // const getNweets = async () => {
    //     const dbNweets = await getDocs(collection(getFirestore(), "nweets"));

    //     dbNweets.forEach((docu) => {
    //         // console.log(docu.data());
    //         const nweetObj = {
    //             ...docu.data(),
    //             id: docu.id,
    //         };
    //         setNweets((prev) => [nweetObj, ...prev]);
    //     });
    // };  --> 올드한 방식.

    return (
        <div>
            HOme
            <NweetFactory userObj={userObj} />
            {nweets.map((nweet) => (
                <Nweet
                    key={nweet.id}
                    nweetObj={nweet}
                    isOwner={nweet.creatorId === userObj.uid}
                />
            ))}
        </div>
    );
};
export default Home;
