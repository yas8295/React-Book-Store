import React, { useState, useRef, useContext, Suspense } from "react";
import { Grid, InputAdornment, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import logo1 from "../../assets/Bookshop.gif";
import logo2 from "../../assets/BookshopDark.png";
import notFoundBook from "../../assets/no-record.png";
import "../ProductView/style.css";
import mangaBg from "../../assets/maxresdefault.jpg";
import bioBg from "../../assets/biography.jpg";
import fictionBg from "../../assets/fiction.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { contexts } from "../DarkButton/DarkButton.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

const Products = ({
  cart,
  onRemoveFromCart,
  products,
  onAddToCart,
  featureProducts,
  setWishList,
  setRatingList,
}) => {
  const { dark } = useContext(contexts);
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef(null);

  const handleInputClick = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      className={`${classes.mainPage} dark:bg-[#000a12] dark:text-white pb-5`}
    >
      <div className="flex flex-col justify-center items-center mt-16 dark:bg-[#000a12!important] bg-white">
        <motion.img
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="object-cover"
          src={dark ? logo2 : logo1}
          width={600}
        />

        <div className={`${classes.heroCont} dark:text-[white!important] mt-5`}>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
            className={`${classes.heroHeader} dark:text-[white!important]`}
          >
            Discover Your Next Favorite Book Here.
          </motion.h1>
          <motion.h3
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            className={`${classes.heroDesc} dark:text-[white!important]`}
            ref={sectionRef}
          >
            Explore our curated collection of new and popular books to find your
            next literary adventure.
          </motion.h3>
          <div className={classes.searchs}>
            <Input
              className={`${classes.searchb} text-[black!important]`}
              type="text"
              placeholder="Which book are you looking for?"
              onClick={handleInputClick}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </div>
      </div>

      {searchTerm === "" && (
        <div
          id="products"
          className={`${classes.categorySection} dark:bg-[#000a12!important] bg-white`}
        >
          <h1
            className={`${classes.categoryHeader} dark:text-[white!important] `}
          >
            Categories
          </h1>
          <h3 className={`${classes.categoryDesc} dark:text-[white!important]`}>
            Browse our featured categories
          </h3>
          <div
            className={`${classes.buttonSection} dark:bg-[#000a12!important] dark:text-[white!important]`}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Link to="/React-Book-Store/manga">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${mangaBg})` }}
                ></button>
              </Link>
              <div className={`${classes.categoryName} dark:text-[white]`}>
                Manga
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link to="/React-Book-Store/biography">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${bioBg})` }}
                ></button>
              </Link>
              <div className={`${classes.categoryName} dark:text-[white]`}>
                Biography
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link to="/React-Book-Store/fiction">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${fictionBg})` }}
                ></button>
              </Link>
              <div className={`${classes.categoryName} dark:text-[white]`}>
                Fiction
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <div
        className={`${classes.carouselSection} dark:bg-[#000a12!important] dark:text-[white!important]`}
      >
        <Carousel
          showIndicators={true}
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="manga">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${mangaBg})` }}
              ></button>
            </Link>
            <div className={`${classes.categoryName} dark:text-[white]`}>
              Manga
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="biography">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${bioBg})` }}
              ></button>
            </Link>
            <div className={`${classes.categoryName} dark:text-[white]`}>
              Biography
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="fiction">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${fictionBg})` }}
              ></button>
            </Link>
            <div className={`${classes.categoryName} dark:text-[white]`}>
              Fiction
            </div>
          </motion.div>
        </Carousel>
      </div>

      {searchTerm === "" && (
        <>
          <div>
            <h3 className={classes.contentHeader}>
              Best <span style={{ color: "#f1361d" }}>Sellers</span>
            </h3>
            <Grid
              className={classes.contentFeatured}
              container
              justifyContent="center"
              spacing={1}
            >
              {featureProducts.length === 0 ? (
                <h1 className="w-full h-full flex justify-center items-center">
                  <ClipLoader color="white" loading size={60} />
                </h1>
              ) : (
                featureProducts.map((product) => (
                  <Grid
                    className={classes.contentFeatured}
                    item
                    xs={6}
                    sm={5}
                    md={3}
                    lg={2}
                    id="pro"
                    key={product.id}
                  >
                    <Product
                      cart={cart}
                      onRemoveFromCart={onRemoveFromCart}
                      setWishList={setWishList}
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </>
      )}

      <div>
        {searchTerm === "" && (
          <>
            <h1 className={`${classes.booksHeader} dark:text-[white]`}>
              Discover <span style={{ color: "#f1361d" }}>Books</span>
            </h1>
            <h3 className={`${classes.booksDesc} dark:text-[white]`}>
              Explore our comprehensive collection of books.
            </h3>
          </>
        )}
        <div className={classes.mobileSearch}>
          <div className={classes.mobSearchs}>
            <Input
              className={classes.mobSearchb}
              type="text"
              placeholder="Search for books"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </div>
        {!products.find((e) => e.name.includes(searchTerm)) ? (
          <div className="flex flex-col gap-5 px-2 justify-center items-center mb-4 w-full h-full dark:bg-[#000a12!important] bg-white">
            <h1 className="md:text-[30px] text-[20px] font-semibold">
              ⛔ Not found book with this title...!
            </h1>
            <img src={notFoundBook} alt="" />
          </div>
        ) : (
          <Grid
            className={classes.content}
            container
            justifyContent="center"
            spacing={2}
          >
            {products
              .filter((product) => {
                if (searchTerm === "") {
                  return product;
                } else if (
                  product.name
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                ) {
                  return product;
                }
              })
              .map((product) => (
                <Grid
                  className={classes.content}
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  id="pro"
                  key={product.id}
                >
                  <Product
                    cart={cart}
                    onRemoveFromCart={onRemoveFromCart}
                    setWishList={setWishList}
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    setRatingList={setRatingList}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </div>
    </main>
  );
};

export default Products;
