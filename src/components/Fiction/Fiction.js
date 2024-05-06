import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Product from "../Products/Product/Product.js";
import useStyles from "../Products/styles.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../ProductView/style.css";
import { ClipLoader } from "react-spinners";
import { contexts } from "../DarkButton/DarkButton.js";

const Fiction = ({
  onAddToCart,
  fictionProducts,
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

  if (fictionProducts.length === 0) {
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
            <h3 className={classes.categoryHeader}>
              <span style={{ color: "#f1361d" }}>Fictional&nbsp;</span>Books
            </h3>
            <h3 className={classes.categoryDesc}>
              Browse our Fictional books Collection
            </h3>
            <Grid
              className={classes.categoryFeatured}
              container
              justifyContent="center"
              spacing={3}
            >
              {fictionProducts.map((product) => (
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

export default Fiction;
