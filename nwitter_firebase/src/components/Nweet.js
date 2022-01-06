import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    };
    const onChange = (e) => {
        // 값을 할당하는 두가지 방법.
        // 1.
        // const {
        //     target: { value },
        // } = e;
        // 2.
        // const value = e.target.value;
        const {
            target: { value },
        } = e;

        setNewNweet(value);
        //     const value = e.target.value;
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(nweetObj, newNweet);
        const NweetsUpdateDoc = doc(getFirestore(), `nweets/${nweetObj.id}`);
        await updateDoc(NweetsUpdateDoc, { text: newNweet });
        toggleEditing(false);
    };

    const onDeleteClick = () => {
        const ok = window.confirm(
            "Are you sure you wnat to delete this nweet?",
        );
        console.log(ok);
        if (ok) {
            //delete nweet
            const NweetsDelDoc = doc(getFirestore(), `nweets/${nweetObj.id}`);
            deleteDoc(NweetsDelDoc);
        }
    };
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your nweet"
                            value={newNweet}
                            required
                            onChange={onChange}
                        />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>
                                Delete Nweet
                            </button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;
