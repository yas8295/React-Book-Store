import React, { useState } from "react";
import "./rating.css";

export default function Rating({
  product,
  setRatingList = () => {},
  setCurrentRating = () => {},
}) {
  const [rating, setRating] = useState(() => {
    const list = JSON.parse(window.localStorage.getItem("ratingList"));
    const isRating = list?.find((book) => book.name === product.name);
    return isRating ? Number(isRating.rating) : 0;
  });

  let currentRatingList =
    JSON.parse(window.localStorage.getItem("ratingList")) || [];

  const handleUpdateRatingList = (rate) => {
    const isRating = currentRatingList.find(
      (book) => book.name === product.name
    );
    if (isRating) {
      const newRatingList = currentRatingList.map((book) =>
        book.name === product.name ? { ...book, rating: rate } : book
      );
      window.localStorage.setItem("ratingList", JSON.stringify(newRatingList));
      setRatingList(newRatingList);
    } else {
      const addRatingToProduct = { ...product, rating: rate };
      const newRatingList = [...currentRatingList, addRatingToProduct];
      window.localStorage.setItem("ratingList", JSON.stringify(newRatingList));
      setRatingList(newRatingList);
    }
  };

  return (
    <div className="rating w-fit text-[25px]">
      <input
        checked={rating === 5}
        defaultValue={5}
        name="rate"
        onChange={(e) => {
          setRating(Number(e.target.value));
          handleUpdateRatingList(e.target.value);
          setCurrentRating(e.target.value);
        }}
        id="star5"
        type="radio"
      />
      <label title="text" htmlFor="star5" />
      <input
        checked={rating === 4}
        defaultValue={4}
        name="rate"
        onChange={(e) => {
          setRating(Number(e.target.value));
          handleUpdateRatingList(e.target.value);
          setCurrentRating(e.target.value);
        }}
        id="star4"
        type="radio"
      />
      <label title="text" htmlFor="star4" />
      <input
        checked={rating === 3}
        defaultValue={3}
        name="rate"
        onChange={(e) => {
          setRating(Number(e.target.value));
          handleUpdateRatingList(e.target.value);
          setCurrentRating(e.target.value);
        }}
        id="star3"
        type="radio"
      />
      <label title="text" htmlFor="star3" />
      <input
        checked={rating === 2}
        defaultValue={2}
        name="rate"
        onChange={(e) => {
          setRating(Number(e.target.value));
          handleUpdateRatingList(e.target.value);
          setCurrentRating(e.target.value);
        }}
        id="star2"
        type="radio"
      />
      <label title="text" htmlFor="star2" />
      <input
        checked={rating === 1}
        defaultValue={1}
        name="rate"
        onChange={(e) => {
          setRating(Number(e.target.value));
          handleUpdateRatingList(e.target.value);
          setCurrentRating(e.target.value);
        }}
        id="star1"
        type="radio"
      />
      <label title="text" htmlFor="star1" />
    </div>
  );
}
