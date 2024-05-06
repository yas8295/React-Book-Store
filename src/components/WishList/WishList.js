import React, { useEffect } from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import useStyles from "./styles";
import image from "../../assets/7893960.png";
import WishListItem from "./WishListItem/WishListItem";

const WishList = ({ onAddToCart, cart, onRemoveFromCart }) => {
  const classes = useStyles();

  const wishList = window.localStorage.getItem("wishList");
  const wishListItems = JSON.parse(wishList);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Container className="min-h-[90vh]">
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        <b>Your Wishlist Books</b>
      </Typography>
      <hr />

      {!wishListItems || wishListItems?.length === 0 ? (
        <>
          <Typography variant="subtitle1">
            You have no Books in your wishlist,
            <Link className={classes.link} to="/">
              {" "}
              start adding some
            </Link>
            !
          </Typography>
          <div className="w-full h-full flex justify-center items-center">
            <img src={image} alt="" className="w-[600px]" />
          </div>
        </>
      ) : (
        ""
      )}
      {wishListItems && (
        <>
          <Grid container spacing={4} className="mt-2">
            {wishListItems?.map((wishListItem) => (
              <Grid
                item
                xs={12}
                sm={4}
                key={wishListItem.id}
                className="grow h-full self-baseline"
              >
                <WishListItem
                  item={wishListItem}
                  cart={cart}
                  onAddToCart={onAddToCart}
                  onRemoveFromCart={onRemoveFromCart}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default WishList;
