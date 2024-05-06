import React, { useContext, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
import ProductTransition from "../../Products/Product/ProductTransition";
import { ClipLoader } from "react-spinners";
import { contexts } from "../../DarkButton/DarkButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const { dark } = useContext(contexts);
  const [loadingClearCart, setLoadingClearCart] = useState(false);
  const [loadingUpdateCart, setLoadingUpdateCart] = useState(false);
  const classes = useStyles();

  const handleUpdateCartQty = async (lineItemId, newQuantity) => {
    setLoadingUpdateCart(true);
    await onUpdateCartQty(lineItemId, newQuantity);
    setLoadingUpdateCart(false);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    setLoadingClearCart(true);
    await onRemoveFromCart(lineItemId);
    setLoadingClearCart(false);
  };

  return (
    <ProductTransition>
      <Card className="cart-item relative dark:border-[0.2px] dark:border-[#10b4ff]">
        <Link to={`/React-Book-Store/product-view/${item.product_id}`}>
          <CardMedia
            image={item.image.url}
            alt={item.name}
            className={`${classes.media} dark:bg-[#05090c!important] bg-white hover:scale-105 duration-500`}
          />
        </Link>
        <CardContent className="dark:bg-[#0d1b25] grow dark:text-white flex justify-between items-center">
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="h6" color="secondary">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          className={`${classes.cardActions} dark:bg-[#05090c!important]`}
        >
          <div className={`${classes.buttons} dark:text-white text-[black]`}>
            <Button
              disabled={loadingUpdateCart}
              type="button"
              size="large"
              onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
              className="dark:text-white text-[black]"
            >
              -
            </Button>
            {loadingUpdateCart ? (
              <ClipLoader
                color={`${dark ? "white" : "black"}`}
                loading
                size={20}
              />
            ) : (
              <h1>&nbsp;{item.quantity}&nbsp;</h1>
            )}
            <Button
              disabled={loadingUpdateCart}
              type="button"
              size="large"
              onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
              className="dark:text-white text-[black]"
            >
              +
            </Button>
          </div>
          <Button
            disabled={loadingClearCart}
            className={classes.button}
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => handleRemoveFromCart(item.id)}
          >
            {loadingClearCart ? (
              <ClipLoader color="white" loading size={25} />
            ) : (
              "Remove"
            )}
          </Button>
        </CardActions>
      </Card>
    </ProductTransition>
  );
};

export default CartItem;
