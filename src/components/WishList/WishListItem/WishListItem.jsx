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
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import { AddShoppingCart } from "@material-ui/icons";
import { contexts } from "../../DarkButton/DarkButton";

const WishListItem = ({ item, onAddToCart, cart, onRemoveFromCart }) => {
  const { dark } = useContext(contexts);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const inCart = cart?.line_items?.find((book) => book.name === item.name);

  const handleUpdateCart = async (id, count) => {
    setLoading(true);
    if (inCart) {
      await onRemoveFromCart(inCart.id);
    } else {
      await onAddToCart(id, count);
    }
    setLoading(false);
  };

  return (
    <ProductTransition>
      <Card className="cart-item relative dark:border-[0.2px] dark:border-[#10b4ff] grow h-full self-stretch">
        <Link to={`/product-view/${item.id}`}>
          <CardMedia
            image={item.image?.url}
            alt={item.name}
            className={`${classes.media} dark:bg-[#05090c!important] bg-white hover:scale-105 duration-500`}
          />
        </Link>
        <CardContent className="dark:bg-[#0d1b25] grow dark:text-white flex justify-between items-center">
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="h6" color="secondary">
            {item.price.formatted_with_symbol}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          className={`${classes.cardActions} dark:bg-[#05090c!important]`}
        >
          <Button
            style={{
              border: `${
                dark ? "1px solid rgb(16 180 255)" : "3px solid rgb(16 180 255)"
              }`,
            }}
            disabled={loading}
            variant="contained"
            className={`${classes.button} h-full self-end text-nowrap`}
            endIcon={!loading && <AddShoppingCart />}
            onClick={() => {
              handleUpdateCart(item.id, 1);
            }}
          >
            <b className="h-full text-pretty">
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

export default WishListItem;
