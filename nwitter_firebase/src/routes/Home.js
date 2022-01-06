import { useEffect, useState } from "react";
import {
    getFirestore,
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import Nweet from "../components/Nweet";

const Home = ({ userObj }) => {
    // const db = getFirestore();
    console.log(userObj);
    const [nweet, setNweet] = useState("");
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

    useEffect(() => {
        onSnapshot(
            query(collection(getFirestore(), "nweets"), orderBy("createdAt")),
            (snapshot) => {
                // console.log(snapshot.docs);
                const nweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    //...doc.data() 하면 doc.data()의 데이터 전체를 뿌려(...)준다.
                }));
                console.log("arry:");
                console.log(nweetArray);
                setNweets(nweetArray);
            },
        );
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        const docRef = await addDoc(collection(getFirestore(), "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        setNweet("");
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
        // console.log(value);
    };

    // console.log(nweets);

    return (
        <div>
            HOme
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength="120"
                    value={nweet}
                    onChange={onChange}
                />
                <input type="submit" value="Nweet" />
            </form>
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
