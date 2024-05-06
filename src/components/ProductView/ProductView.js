import React, { useContext } from "react";
import { Container, Grid, Button } from "@material-ui/core";
import {
  Link,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min.js";
import { commerce } from "../../lib/commerce";
import { useState, useEffect } from "react";
import "./style.css";
import { ClipLoader } from "react-spinners";
import { AddShoppingCart } from "@material-ui/icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useStyles from "./styles";
import { motion } from "framer-motion";
import Rating from "./Rating";
import { contexts } from "../DarkButton/DarkButton";

const ProductView = ({
  onAddToCart,
  onRemoveFromCart,
  cart,
  setWishList,
  setRatingList,
}) => {
  const { dark } = useContext(contexts);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const classes = useStyles();

  const { url } = useRouteMatch();
  const urlSplit = url.split("/");
  const id = urlSplit[urlSplit.length - 1];

  const createMarkup = (text) => {
    return { __html: text };
  };

  const inCart = cart?.line_items?.find((book) => book.name === product?.name);

  const wishList = window.localStorage.getItem("wishList");
  const inWishList =
    JSON.parse(wishList)?.find((book) => book.name === product?.name) || false;

  const handleUpdateWishList = () => {
    let list = [];
    let productId = "";
    if (inWishList) {
      list = JSON.parse(window.localStorage.getItem("wishList"));
      productId = list?.findIndex((book) => book.name === product.name);
      list.splice(productId, 1);
      window.localStorage.setItem("wishList", JSON.stringify(list));
      setWishList(list);
    } else {
      list = JSON.parse(window.localStorage.getItem("wishList")) || [];
      list.push(product);
      window.localStorage.setItem("wishList", JSON.stringify(list));
      setWishList(list);
    }
  };

  const handleUpdateCart = async (id, count) => {
    setLoading(true);
    if (inCart) {
      await onRemoveFromCart(inCart.id);
    } else {
      await onAddToCart(id, count);
    }
    setLoading(false);
  };

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);
    setProduct(response);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchProduct(id);
  }, []);

  if (!product) {
    return (
      <div className="h-[90vh] w-full flex justify-center items-center dark:bg-[#000a12] dark:text-white">
        <ClipLoader color={`${dark ? "white" : `#140074`}`} loading size={60} />
      </div>
    );
  }

  return (
    <Container className="product-view relative h-full py-4 mb-5 dark:bg-[#001524] dark:border-2 border-[#0a6088]">
      <div
        className="heart-container md:w-16 md:h-16 w-10 h-10 absolute md:left-8 left-5 top-5 z-10 dark:bg-[#000a12!important"
        title="Like"
      >
        <input
          checked={inWishList}
          type="checkbox"
          className="checkbox"
          id="Give-It-An-Id"
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
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper flex justify-center">
          {(
            <motion.img
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              src={product.image.url}
              alt={product.name}
              className="drop-shadow-[-30px_10px_10px_rgba(0,0,0,0.50)]"
            />
          ) || <Skeleton />}
        </Grid>
        <Grid item xs={12} md={6} className="text">
          <h1 className="p-0 text-[30px]" variant="h2">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <b>{product.name}</b>
            </motion.div>
          </h1>
          <div className="flex items-center justify-start w-full my-2 gap-2">
            <h1 className="text-[22px] font-semibold">Rating:</h1>
            <Rating product={product} setRatingList={setRatingList}></Rating>
          </div>
          <h1 variant="p" />
          <motion.div
            className="text-[17px]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            dangerouslySetInnerHTML={createMarkup(product.description)}
          ></motion.div>
          <h1 variant="h3" color="secondary">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
              className="mt-2 text-[red] text-[18px]"
            >
              Price: <b> {product.price.formatted_with_symbol} </b>
            </motion.div>
          </h1>
          <br />
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Button
                style={{
                  border: `${
                    dark
                      ? "1px solid rgb(16 180 255)"
                      : "3px solid rgb(16 180 255)"
                  }`,
                }}
                size="large"
                className="custom-button"
                component={Link}
                to="/"
              >
                <motion.h1
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
                >
                  Continue Shopping
                </motion.h1>
              </Button>
              <Button
                style={{
                  border: `${
                    dark
                      ? "1px solid rgb(16 180 255)"
                      : "3px solid rgb(16 180 255)"
                  }`,
                }}
                endIcon={!loading && <AddShoppingCart />}
                disabled={loading}
                size="large"
                className={`${classes.button} custom-button mt-2 w-full`}
                onClick={() => handleUpdateCart(id[2], 1)}
              >
                {loading ? (
                  <ClipLoader color="white" loading size={25} />
                ) : (
                  <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, delay: 0.6 }}
                  >
                    {loading ? (
                      <ClipLoader
                        color="white"
                        loading
                        size={25}
                        className="mt-2"
                      />
                    ) : inCart ? (
                      "REMOVE FROM CART"
                    ) : (
                      "ADD TO CART"
                    )}
                  </motion.h1>
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductView;
