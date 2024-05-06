import React, { useContext, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CardActionArea,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart, RemoveRedEye } from "@material-ui/icons";
import useStyles from "./styles";
import ProductTransition from "./ProductTransition";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ClipLoader } from "react-spinners";
import "./wishIcon.css";
import { Rating } from "@material-ui/lab";
import { contexts } from "../../DarkButton/DarkButton.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import QuickViewProduct from "./QuickViewProduct.js";
import { toast } from "react-toastify";

const Product = ({
  cart,
  product,
  onAddToCart,
  onRemoveFromCart,
  setWishList,
  setRatingList,
}) => {
  const [open, setOpen] = useState(false);
  const { dark } = useContext(contexts);
  const [rating, setRating] = useState(() => {
    const list = JSON.parse(window.localStorage.getItem("ratingList"));
    const isRating = list?.find((book) => book.name === product.name) || false;
    return isRating ? Number(isRating.rating) : 0;
  });
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const inCart = cart?.line_items?.find((book) => book.name === product.name);
  const wishList = window.localStorage.getItem("wishList");
  const inWishList =
    JSON.parse(wishList)?.find((book) => book.name === product.name) || false;

  const handleUpdateWishList = () => {
    let list = [];
    let productId = "";
    if (inWishList) {
      list = JSON.parse(window.localStorage.getItem("wishList"));
      productId = list?.findIndex((book) => book.name === product.name);
      list.splice(productId, 1);
      setWishList(list);
      toast.success("removed book from wishlist successfully", {
        autoClose: 300,
        hideProgressBar: true,
      });
      window.localStorage.setItem("wishList", JSON.stringify(list));
    } else {
      list = JSON.parse(window.localStorage.getItem("wishList")) || [];
      list.push(product);
      setWishList(list);
      toast.success("added book to wishlist successfully", {
        autoClose: 300,
        hideProgressBar: true,
      });
      window.localStorage.setItem("wishList", JSON.stringify(list));
    }
  };

  const onOpenModal = () => setOpen(true);

  const handleUpdateCart = async (id, count) => {
    setLoading(true);
    if (inCart) {
      await onRemoveFromCart(inCart.id);
    } else {
      await onAddToCart(id, count);
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <ProductTransition>
      <Card
        className={`${classes.root} h-full flex flex-col justify-between relative dark:border-[0.2px] dark:border-[#10b4ff]`}
      >
        <Rating
          style={{ position: "absolute" }}
          className="md:left-4 top-4 left-0 md:scale-100 scale-75 z-10 flex flex-col"
          name="read-only"
          value={rating}
          readOnly
        />
        <Tooltip
          onClick={onOpenModal}
          title="Quick View"
          className="z-10 md:right-1 right-[-5px] md:top-8 top-3 text-[40px] Quick-View"
          style={{
            position: "absolute",
            fontSize: "35px!important",
            width: "40px",
          }}
        >
          <IconButton>
            <RemoveRedEye style={{ fontSize: "25px" }}></RemoveRedEye>
          </IconButton>
        </Tooltip>
        <QuickViewProduct
          product={product}
          open={open}
          setOpen={setOpen}
          setRatingList={setRatingList}
          setRating={setRating}
          cart={cart}
          handleUpdateCart={handleUpdateCart}
          loading={loading}
          inWishList={inWishList}
          handleUpdateWishList={handleUpdateWishList}
        ></QuickViewProduct>
        <div
          className="heart-container md:w-7 md:h-7 w-4 h-4 absolute md:right-2 right-1 top-1 z-10"
          title="Like"
        >
          <input
            type="checkbox"
            className="checkbox"
            checked={inWishList}
            onChange={handleUpdateWishList}
          />
          <div className="svg-container">
            <svg
              viewBox="0 0 24 24"
              className="svg-outline"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="svg-filled"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
            <svg
              className="svg-celebrate"
              width={100}
              height={100}
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="10,10 20,20" />
              <polygon points="10,50 20,50" />
              <polygon points="20,80 30,70" />
              <polygon points="90,10 80,20" />
              <polygon points="90,50 80,50" />
              <polygon points="80,80 70,70" />
            </svg>
          </div>
        </div>
        <Link to={`/React-Book-Store/product-view/${product.id}`}>
          <CardActionArea>
            <CardMedia
              className={`${classes.media} dark:bg-[#05090c!important] bg-white hover:scale-105 duration-500`}
              image={product.image.url || <Skeleton />}
              title={product.name || <Skeleton />}
            />
          </CardActionArea>
        </Link>
        <CardContent className="dark:bg-[#0d1b25] grow">
          <div className={classes.cardContent}>
            <p className={`${classes.cardContentName} dark:text-white`}>
              {product.name || <Skeleton />}
            </p>
          </div>
          <div className={classes.cardContent}>
            <p className={classes.cardContentPrice}>
              <b>{product.price.formatted_with_symbol || <Skeleton />}</b>
            </p>
          </div>
        </CardContent>
        <CardActions
          disableSpacing
          className={`${classes.cardActions} dark:bg-[#05090c!important]`}
        >
          <Button
            disabled={loading}
            style={{
              border: `${
                dark ? "1px solid rgb(16 180 255)" : "3px solid rgb(16 180 255)"
              }`,
            }}
            variant="contained"
            className={`${classes.button} h-full md:my-2 self-end text-nowrap dark:border-[1px] p-0 dark:border-[#2da1cf]`}
            endIcon={!loading && <AddShoppingCart />}
            onClick={() => {
              handleUpdateCart(product.id, 1);
            }}
          >
            <b className="h-full md:text-[16px] text-[10px] text-pretty">
              {loading ? (
                <ClipLoader color="white" loading size={25} className="mt-2" />
              ) : inCart ? (
                "REMOVE FROM CART"
              ) : (
                "ADD TO CART"
              )}
            </b>
          </Button>
        </CardActions>
      </Card>
    </ProductTransition>
  );
};

export default Product;
