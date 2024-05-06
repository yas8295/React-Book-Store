import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";
import { ClipLoader } from "react-spinners";
import image from "../../assets/pngwing.com.png";
import { contexts } from "../DarkButton/DarkButton";

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const { dark } = useContext(contexts);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleEmptyCart = async () => {
    setLoading(true);
    await onEmptyCart();
    setLoading(false);
  };

  return (
    <Container className="min-h-[90vh]">
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        <b>Your Shopping Cart</b>
      </Typography>
      <hr />
      {!cart?.line_items && (
        <div className="h-[90vh] w-full flex justify-center items-center">
          <ClipLoader
            color={`${dark ? "white" : `#140074`}`}
            loading
            size={60}
          />
        </div>
      )}
      {cart?.line_items?.length === 0 && (
        <>
          <Typography variant="subtitle1">
            You have no items in your shopping cart,
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
      )}
      {cart?.line_items?.length > 0 && (
        <>
          <Grid container spacing={4} className="mt-2">
            {cart?.line_items.map((lineItem) => (
              <Grid item xs={12} sm={4} key={lineItem.id}>
                <CartItem
                  item={lineItem}
                  onUpdateCartQty={onUpdateCartQty}
                  onRemoveFromCart={onRemoveFromCart}
                />
              </Grid>
            ))}
          </Grid>
          <div className={classes.cardDetails}>
            <Typography variant="h5">
              Subtotal: <b>{cart.subtotal.formatted_with_symbol}</b>
            </Typography>
            <div>
              <Button
                className={`${classes.emptyButton}`}
                disabled={loading}
                size="large"
                type="button"
                variant="contained"
                color="secondary"
                onClick={handleEmptyCart}
              >
                {loading ? (
                  <ClipLoader color="white" loading size={25} />
                ) : (
                  "Empty cart"
                )}
              </Button>
              <Button
                style={{
                  border: `${
                    dark
                      ? "1px solid rgb(16 180 255)"
                      : "3px solid rgb(16 180 255)"
                  }`,
                }}
                className={classes.checkoutButton}
                component={Link}
                to="/checkout"
                size="large"
                type="button"
                variant="contained"
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
