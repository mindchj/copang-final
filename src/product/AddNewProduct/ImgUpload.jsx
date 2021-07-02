//이미지 업로드
import React, { useState } from "react";
import axios from "axios";

const ImgUpload = () => {
  const [img, setImg] = useState(null);

  const onChange = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  //데이터보낼때 imgUrl도 같이 보내줘야함.
  const [imgUrl, setimgUrl] = useState();
  const imgUpload = async () => {
    const formData = new FormData();
    formData.append("image", img);
    const res = await axios.post("https://alconn.co/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    setimgUrl(res.data.data.publicPath);
    console.log(imgUrl);
  };

  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <div className="row">
          <h2>이미지 업로드</h2>
        </div>
        <div className="row">
          <div className="col">
            <div style={{ float: "left" }}>대표이미지</div>
            <br />
            <br />
            <div>
              <input
                style={{ width: "100%", height: "100%" }}
                type="file"
                onChange={onChange}
              />
            </div>
            <br />
            <div
              style={{
                border: "1px solid black",
                width: "300px",
                height: "300px",
              }}
            >
              <img
                style={{
                  border: "1px solid black",
                  width: "100%",
                  height: "100%",
                }}
                alt=""
                src={imgUrl}
              />
            </div>
            <br />
            <div style={{ float: "left" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={imgUpload}
              >
                이미지 등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgUpload;
