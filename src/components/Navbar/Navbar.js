import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import logo from "../../assets/circles.png";
import useStyles from "./styles";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Navbar = ({ totalItems, wishList }) => {
  const classes = useStyles();
  const [wishListCount, setWishListCount] = useState(0);

  useEffect(() => {
    setWishListCount(window.localStorage.getItem("wishList"));
  }, [wishList]);

  return (
    <div>
      <AppBar
        position="fixed"
        className={`${classes.appBar} px-0 md:px-10`}
        color="inherit"
      >
        <Toolbar>
          <Typography
            component={Link}
            to="/React-Book-Store"
            variant="h5"
            className={`${classes.title} w-fit`}
            color="inherit"
          >
            <img
              src={logo}
              alt="Book Store App"
              height="50px"
              className="w-14"
            />
            <div>BOOKSHOP</div>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/React-Book-Store/wishlist"
              aria-label="Show wish List items"
              color="inherit"
            >
              <Badge
                badgeContent={JSON.parse(wishListCount)?.length}
                color="secondary"
                overlap="rectangular"
              >
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/React-Book-Store/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge
                badgeContent={totalItems}
                color="secondary"
                overlap="rectangular"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
