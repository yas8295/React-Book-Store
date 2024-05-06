import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";
import Manga from "./components/Manga/Manga";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loadingImg from "./assets/loader.gif";
import "./style.css";
import Fiction from "./components/Fiction/Fiction";
import Biography from "./components/Bio/Biography";
import WishList from "./components/WishList/WishList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkButton, { Context } from "./components/DarkButton/DarkButton";
import Tostify from "./components/Toatify/Tostify";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  const [ratingList, setRatingList] = useState(
    window.localStorage.getItem("ratingList" || [])
  );
  const [wishList, setWishList] = useState(
    window.localStorage.getItem("wishList" || [])
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [mangaProducts, setMangaProducts] = useState([]);
  const [fictionProducts, setFictionProducts] = useState([]);
  const [bioProducts, setBioProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMangaProducts = async () => {
    try {
      const { data } = await commerce.products.list({
        category_slug: ["manga"],
      });
      setMangaProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFeatureProducts = async () => {
    try {
      const { data } = await commerce.products.list({
        category_slug: ["featured"],
      });
      setFeatureProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFictionProducts = async () => {
    try {
      const { data } = await commerce.products.list({
        category_slug: ["fiction"],
      });
      setFictionProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchBioProducts = async () => {
    try {
      const { data } = await commerce.products.list({
        category_slug: ["biography"],
      });
      setBioProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await commerce.cart.retrieve();
      setCart(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const item = await commerce.cart.add(productId, quantity);
      if (!item) {
        toast.error("failed to add book to cart");
        throw new Error("something went wrong");
      }
      toast.success("added book to cart successfully");
      setCart(item);
    } catch (error) {
      toast.error("failed to add book to cart");
    }
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    try {
      const response = await commerce.cart.update(lineItemId, { quantity });
      if (!response) {
        toast.error("failed to update cart");
        throw new Error("something went wrong");
      }
      toast.success("Updated cart successfully");
      setCart(response);
    } catch (error) {
      toast.error("failed to update cart");
    }
  };

  const handleRemoveFromCart = async (lineItemId) => {
    try {
      const response = await commerce.cart.remove(lineItemId);
      if (!response) {
        toast.error("failed to add book to cart");
        throw new Error("something went wrong");
      }
      toast.success("Removed book from cart successfully");
      setCart(response);
    } catch (error) {
      toast.error("failed to remove book from cart");
    }
  };

  const handleEmptyCart = async () => {
    try {
      const response = await commerce.cart.empty();
      if (!response) {
        toast.error("failed to clear cart");
        throw new Error("something went wrong");
      }
      toast.success("Clear cart successfully");
      setCart(response);
    } catch (error) {
      toast.error("failed to clear cart");
    }
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFeatureProducts();
    fetchCart();
    fetchMangaProducts();
    fetchFictionProducts();
    fetchBioProducts();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Context>
      <Tostify></Tostify>
      <DarkButton></DarkButton>
      <div className="dark:bg-[#000a12] dark:text-white">
        {products.length > 0 ? (
          <>
            <Router>
              <div className="flex flex-col dark:bg-[#000a12] dark:text-white">
                <CssBaseline />
                <Navbar
                  wishList={wishList}
                  totalItems={cart?.total_items}
                  handleDrawerToggle={handleDrawerToggle}
                />
                <Switch>
                  <Route exact path="/">
                    <Products
                      cart={cart}
                      products={products}
                      setWishList={setWishList}
                      featureProducts={featureProducts}
                      onAddToCart={handleAddToCart}
                      handleUpdateCartQty
                      onRemoveFromCart={handleRemoveFromCart}
                      setRatingList={setRatingList}
                    />
                  </Route>
                  <Route exact path="/React-Book-Store">
                    <Products
                      cart={cart}
                      products={products}
                      setWishList={setWishList}
                      featureProducts={featureProducts}
                      onAddToCart={handleAddToCart}
                      handleUpdateCartQty
                      onRemoveFromCart={handleRemoveFromCart}
                      setRatingList={setRatingList}
                    />
                  </Route>
                  <Route exact path="/cart">
                    <Cart
                      cart={cart}
                      onUpdateCartQty={handleUpdateCartQty}
                      onRemoveFromCart={handleRemoveFromCart}
                      onEmptyCart={handleEmptyCart}
                    />
                  </Route>
                  <Route exact path="/wishlist">
                    <WishList
                      cart={cart}
                      onAddToCart={handleAddToCart}
                      onRemoveFromCart={handleRemoveFromCart}
                    />
                  </Route>
                  <Route path="/checkout" exact>
                    <Checkout
                      cart={cart}
                      order={order}
                      onCaptureCheckout={handleCaptureCheckout}
                      error={errorMessage}
                    />
                  </Route>
                  <Route path="/product-view/:id" exact>
                    <ProductView
                      onAddToCart={handleAddToCart}
                      setWishList={setWishList}
                      onRemoveFromCart={handleRemoveFromCart}
                      cart={cart}
                      setRatingList={setRatingList}
                    />
                  </Route>
                  <Route path="/manga" exact>
                    <Manga
                      cart={cart}
                      mangaProducts={mangaProducts}
                      onAddToCart={handleAddToCart}
                      handleUpdateCartQty
                      setWishList={setWishList}
                      onRemoveFromCart={handleRemoveFromCart}
                    />
                  </Route>
                  <Route path="/fiction" exact>
                    <Fiction
                      cart={cart}
                      fictionProducts={fictionProducts}
                      onAddToCart={handleAddToCart}
                      handleUpdateCartQty
                      setWishList={setWishList}
                      onRemoveFromCart={handleRemoveFromCart}
                    />
                  </Route>
                  <Route path="/biography" exact>
                    <Biography
                      cart={cart}
                      bioProducts={bioProducts}
                      onAddToCart={handleAddToCart}
                      handleUpdateCartQty
                      setWishList={setWishList}
                      onRemoveFromCart={handleRemoveFromCart}
                    />
                  </Route>
                  <Route path="*">
                    <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
                      <NotFound />
                    </div>
                  </Route>
                </Switch>
              </div>
            </Router>
            <Footer />
          </>
        ) : (
          <div className="loader bg-white">
            <img src={loadingImg} alt="Loading" />
          </div>
        )}
      </div>
    </Context>
  );
};

export default App;
