import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Product from "../Products/Product/Product.js";
import useStyles from "../Products/styles.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../ProductView/style.css";
import { ClipLoader } from "react-spinners";
import { contexts } from "../DarkButton/DarkButton.js";

const Biography = ({
  onAddToCart,
  bioProducts,
  setWishList,
  cart,
  onRemoveFromCart,
}) => {
  const { dark } = useContext(contexts);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (bioProducts.length === 0) {
    return (
      <div className="h-[90vh] w-full flex justify-center items-center dark:bg-[#000a12] dark:text-white">
        <ClipLoader color={`${dark ? "white" : `#140074`}`} loading size={60} />
      </div>
    );
  }

  return (
    <>
      <main
        className={`${classes.mainPage} min-h-[80vh] dark:bg-[#000a12!important] dark:text-white pb-5`}
      >
        <div className={classes.toolbar} />

        <>
          <div className={classes.categorySection}>
            <h3 className={classes.categoryHeader}>Biographies</h3>
            <h3 className={classes.categoryDesc}>
              Browse our Biographies Collection
            </h3>
            <Grid
              className={classes.categoryFeatured}
              container
              justify="center"
              spacing={1}
            >
              {bioProducts.map((product) => (
                <Grid
                  className={classes.categoryFeatured}
                  item
                  xs={8}
                  sm={5}
                  md={4}
                  lg={3}
                  id="pro"
                >
                  <Product
                    cart={cart}
                    product={product}
                    onAddToCart={onAddToCart}
                    setWishList={setWishList}
                    onRemoveFromCart={onRemoveFromCart}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      </main>
    </>
  );
};

export default Biography;
