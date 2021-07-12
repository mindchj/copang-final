import axios from "axios";
import React, { useState } from "react";

const Test = () => {
  const [res, setRes] = useState();
  const [input, setInput] = useState();
  const [data, setData] = useState();

  const getProductList = async () => {
    const result = await axios.get("https://alconn.co/api/item/list/0");
    setRes(result.data.data);
  };
  const getProductId = async () => {
    const result = await axios.get(
      "https://alconn.co/api/item/list/itemid=" + input
    );
    setRes(result.data.data);
  };
  const getProductReview = async () => {
    const result = await axios.get("https://alconn.co/api/review/" + input);
  };
  const getProductCategory = async () => {
    const result = await axios.get(
      "https://alconn.co/api/item/list/categoryid=" + input
    );
    setRes(result.data.data);
  };
  const getUserInfo = async () => {
    const result = await axios.get("https://alconn.co/api/user");
    setRes(result.data.data);
  };
  const getUserOrder = async () => {
    const result = await axios.get("https://alconn.co/api/orders/client");
    setRes(result.data.data);
  };
  const getUserCart = async () => {
    const result = await axios.get("https://alconn.co/api/cart");
    setRes(result.data.data);
  };
  const getUserReview = async () => {
    const result = await axios.get("https://alconn.co/api/review/user");
    setRes(result.data.data);
  };
  const getCategoryMain = async () => {
    const result = await axios.get("https://alconn.co/api/category/main");
    setRes(result.data.data);
  };
  const getCategoryList = async () => {
    const result = await axios.get("https://alconn.co/api/category/list");
    setRes(result.data.data);
  };

  const reviewData = {
    content: "content 수정!",
    rating: 2,
  };
  const updateReview = async () => {
    const result = await axios.put(
      "https://alconn.co/api/review/" + input,
      reviewData
    );
    setData(reviewData);
    setRes(result.data.data);
  };

  const addOptionData = {
    itemId: 53,
    itemName: "1122",
    itemComment: "상품설명입니다",
    detailForm: {
      price: 100,
      stockQuantity: 20,
      optionName: "색상",
      optionValue: "검은색",
      mainImg: "양말사진",
      subImg: "양말추가사진",
    },
  };

  const addOption = async () => {
    const result = await axios.post(
      "https://alconn.co/api/item/add/detail",
      addOptionData
    );
    setData(addOptionData);
    setRes(result.data.data);
  };
  const deleteOption = async () => {
    const result = await axios.delete(
      "https://alconn.co/api/item/delete/item-detail/" + 1183
    );
    setRes(result.data.data);
  };

  const updateOptionData = {
    itemId: 53,
    itemName: "신발",
    itemComment: "신발설명",
    categoryId: 18,
    detailUpdateClass: {
      itemDetailId: 54,
      price: 10000,
      stockQuantity: 10,
      optionName: "색상",
      optionValue: "초록",
      mainImg: "신발초록색사진",
      subImg: "추가옵션사진",
    },
  };

  const updateOption = async () => {
    const result = await axios.put(
      "https://alconn.co/api/item/update",
      updateOptionData
    );
    setData(updateOptionData);
    setRes(result.data.data);
  };

  const updateOptionListData = {
    itemId: 53,
    itemName: "상품명",
    itemComment: "상품설명",
    categoryId: 18,
    itemDetailUpdateClassList: [
      {
        itemDetailId: 54,
        price: 20000,
        stockQuantity: 30,
        optionName: "수정",
        optionValue: "수정테스트",
        mainImg: "수정사진",
        subImg: "수정이미지",
      },
    ],
  };
  const updateOptionList = async () => {
    const result = await axios.put(
      "https://alconn.co/api/item/update/list",
      updateOptionListData
    );
    setData(updateOptionListData);
    setRes(result.data.data);
  };

  const proceedOrder = async () => {
    const result = await axios.patch(
      "https://alconn.co/api/orders/" + 83 + "/proceed"
    );
    setRes(result.data.data);
  };
  const getOrderOne = async () => {
    const result = await axios.get("https://alconn.co/api/orders/" + 83);
    setRes(result.data.data);
  };

  const question = {
    content: "상품 문의",
    itemDetailId: 54,
  };
  const addQuestion = async () => {
    const result = await axios.post("https://alconn.co/api/inquiry", question);
    setData(question);
    setRes(result.data.data);
  };
  const getQuestionUser = async () => {
    const result = await axios.get("https://alconn.co/api/inquiry/client");
    setRes(result.data.data);
  };
  const getQuestionSeller = async () => {
    const result = await axios.get("https://alconn.co/api/inquiry/seller");
    setRes(result.data.data);
  };
  const getQuestionProduct = async () => {
    const result = await axios.get(
      "https://alconn.co/api/inquiry/" + 53 + "/item"
    );
    setRes(result.data.data);
  };

  const reply = { content: "문의사항에 대한 답변" };
  const addReply = async () => {
    const result = await axios.post(
      "https://alconn.co/api/inquiry/" + 151 + "/reply",
      reply
    );
    setData(reply);
    setRes(result.data.data);
  };

  const question2 = { content: "문의 수정3333" };
  const updateQuestion = async () => {
    const result = await axios.put(
      "https://alconn.co/api/inquiry/" + 151,
      question2
    );
    setData(question2);
    setRes(result.data.data);
  };

  const reply2 = { content: "답변 수정" };
  const updateReply = async () => {
    const result = await axios.put(
      "https://alconn.co/api/inquiry/" + 151 + "/reply",
      reply2
    );
    setData(reply2);
    setRes(result.data.data);
  };

  return (
    <div>
      서버 API 응답 테스트
      <br />
      input 입력: <input onChange={(e) => setInput(e.target.value)} />
      <br />
      <button
        onClick={() => {
          setRes();
          setData();
        }}
      >
        결과창 비우기
      </button>
      <button onClick={getProductList}>상품목록</button>
      <button onClick={getProductId}>상품byID</button>
      <button onClick={getProductReview}>리뷰by상품ID</button>
      <button onClick={getProductCategory}>상품byCategoryID</button>
      <br />
      <button onClick={getUserInfo}>유저정보</button>
      <button onClick={getUserOrder}>유저주문</button>
      <button onClick={getUserCart}>유저카트</button>
      <button onClick={getUserReview}>유저리뷰</button>
      <br />
      <button onClick={getCategoryMain}>카테고리 대소분류</button>
      <button onClick={getCategoryList}>카테고리 목록</button>
      <button onClick={updateReview}>리뷰 수정by reviewID</button>
      <br />
      <button onClick={addOption}>상품 옵션 추가</button>
      <button onClick={deleteOption}>상품 옵션 삭제</button>
      <button onClick={updateOption}>상품 옵션 수정</button>
      <button onClick={updateOptionList}>상품 옵션 다중 수정</button>
      <br />
      <button onClick={proceedOrder}>주문 진행</button>
      <button onClick={getOrderOne}>주문 단건 조회</button>
      <button onClick={addQuestion}>문의 등록</button>
      <button onClick={getQuestionUser}>문의 조회(유저)</button>
      <button onClick={getQuestionSeller}>문의 조회(셀러)</button>
      <button onClick={getQuestionProduct}>문의 조회(상품)</button>
      <button onClick={addReply}>문의 답변</button>
      <button onClick={updateQuestion}>문의 수정</button>
      <button onClick={updateReply}>답변 수정</button>
      <br />
      넘겨준 값: <br />
      {JSON.stringify(data)}
      <br />
      <br />
      결과값:
      <br />
      {res && JSON.stringify(res)}
    </div>
  );
};

export default Test;
