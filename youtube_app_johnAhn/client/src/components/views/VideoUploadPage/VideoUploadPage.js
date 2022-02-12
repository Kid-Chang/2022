import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon, Alert } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    { value: 0, label: "private" },
    { value: 1, label: "public" },
];

const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
    { value: 4, label: "Sports" },
];

const VideoUploadPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("File & Animation");

    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");

    const onChange = (e) => {
        // console.log(e.currentTarget.name);
        if (e.currentTarget.name === "VideoTitle") {
            setVideoTitle(e.currentTarget.value);
        }
        if (e.currentTarget.name === "Description") {
            setDescription(e.currentTarget.value);
        }
        if (e.currentTarget.name === "privateOption") {
            setPrivate(e.currentTarget.value);
        }
        if (e.currentTarget.name === "categoryOption") {
            setPrivate(e.currentTarget.value);
        }
    };

    const onDrop = (files) => {
        const formData = new FormData();
        const config = {
            header: { "content-type": "multipart/form-data" },
        };
        formData.append("file", files[0]);
        console.log("its work");
        axios.post("/api/video/uploadfiles", formData, config).then((res) => {
            if (res.data.success) {
                console.log(res.data);
                let variable = {
                    filePath: res.data.filePath,
                    fileName: res.data.fileName,
                };
                setFilePath(res.data.filePath);

                //gerenate thumbnail with this filepath.

                axios.post("/api/video/thumbnail", variable).then((res) => {
                    if (res.data.success) {
                        console.log(res.data);

                        setDuration(res.data.fileDuration);
                        setThumbnailPath(res.data.filePath);
                    } else {
                        alert("Failed to make the thumbnails");
                    }
                });
            } else {
                alert("failed to save the video in server");
            }
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            Category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        };
        console.log(variables);

        axios.post("/api/video/uploadVideo", variables).then((res) => {
            if (res.data.success) {
                console.log("success");
                message.success("성공적으로 업로드 했습니다.");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                alert("비디오 업로드 실패.");
                console.log(res.data.err);
            }
        });
    };

    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    {/* Drop Zone */}
                    <Dropzone
                        onDrop={onDrop} // When file input the tag, onDrop is work.
                        multiple={false} // if you want to upload multiple files, set true. but, you upload only one file, set false.
                        maxSize={10000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div
                                style={{
                                    width: "300px",
                                    height: "240px",
                                    border: "1px solid lightgray",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <p
                                    style={{
                                        fontSize: "5rem",
                                        position: "relative",
                                        top: "25px",
                                    }}
                                >
                                    +
                                </p>
                            </div>
                        )}
                    </Dropzone>
                    {/* Thumbnail */}

                    {ThumbnailPath && (
                        <div>
                            <img
                                src={`http://localhost:4001/${ThumbnailPath}`}
                                alt="thumbnail"
                            />
                        </div>
                    )}
                </div>

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onChange}
                    name="VideoTitle"
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    value={Description}
                    name="Description"
                    onChange={onChange}
                />
                <br />
                <br />
                <select onChange={onChange} name="privateOption">
                    {PrivateOptions.map((item, idx) => (
                        <option key={idx} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <br />
                <br />

                <select onChange={onChange} name="categoryOption">
                    {CategoryOptions.map((item, idx) => (
                        <option key={idx} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default VideoUploadPage;
