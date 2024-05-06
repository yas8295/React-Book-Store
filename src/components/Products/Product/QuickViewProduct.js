import React, { useContext, useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Grid, Button } from "@material-ui/core";
import useStyles from "../../ProductView/styles";
import "../../ProductView/style.css";
import { motion } from "framer-motion";
import { AddShoppingCart } from "@material-ui/icons";
import { contexts } from "../../DarkButton/DarkButton";
import { ClipLoader } from "react-spinners";
import Rating from "../../ProductView/Rating";

export default function QuickViewProduct({
  product,
  open,
  setOpen,
  cart,
  handleUpdateCart,
  loading,
  setRatingList,
  setRating,
  inWishList,
  handleUpdateWishList,
}) {
  const { dark } = useContext(contexts);
  const onCloseModal = () => setOpen(false);
  const classes = useStyles();

  const inCart = cart?.line_items?.find((book) => book.name === product?.name);

  const createMarkup = (text) => {
    return { __html: text };
  };

  return (
    <Modal
      blockScroll={true}
      classNames={{
        root: "z-[9999] p-2",
        modal:
          "w-full max-h-[90%] rounded-xl flex flex-col px-2 py-4 m-0 backdrop-blur-2xl border-[1px] border-[#4ea4cd] dark:bg-[#000f29a1] bg-[#ffffffcf] dark:text-white relative",
        modalContainer: "flex justify-center items-center",
        closeButton: "dark:fill-white",
      }}
      open={open}
      onClose={onCloseModal}
      center
    >
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
      <Grid className="image-wrapper flex justify-center grow w-full">
        {(
          <motion.img
            className="object-fill h-[250px] drop-shadow-[-15px_10px_10px_rgba(0,0,0,0.50)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            src={product.image.url}
            alt={product.name}
          />
        ) || <Skeleton />}
      </Grid>
      <Grid className="text px-2">
        <h1 variant="h2">
          <motion.div
            className="p-0 mt-2 text-[22px] text-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <b>{product.name}</b>
          </motion.div>
        </h1>
        <div className="flex items-center justify-start w-full my-2 gap-2">
          <h1 className="text-[17px] font-semibold">Rating:</h1>
          <Rating
            product={product}
            setRatingList={setRatingList}
            setCurrentRating={setRating}
          ></Rating>
        </div>
        <h1 variant="p" />
        <motion.div
          className="text-[15px]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          dangerouslySetInnerHTML={createMarkup(product.description)}
        ></motion.div>
        <h1 variant="h3">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            className="mt-3 text-[18px] text-right text-[#ff3737]"
          >
            Price: <b> {product.price.formatted_with_symbol} </b>
          </motion.div>
        </h1>
        <br />
        <Grid container spacing={0} className="justify-end">
          <Button
            style={{
              border: `${
                dark ? "1px solid rgb(16 180 255)" : "3px solid rgb(16 180 255)"
              }`,
            }}
            endIcon={!loading && <AddShoppingCart />}
            disabled={loading}
            size="large"
            className={`${classes.button} custom-button mt-2 w-full`}
            onClick={() => handleUpdateCart(product.id, 1)}
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
                  <ClipLoader color="white" loading size={25} />
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
    </Modal>
  );
}
