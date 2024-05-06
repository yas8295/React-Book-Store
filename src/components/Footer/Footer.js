import React from "react";
import logo from "../../assets/circles.png";

const Footer = () => {
  return (
    <div className="bg-[#001524] text-white py-16 px-1 mt-5">
      <div className="text-center text-md-left mt-3 pb-3">
        <h6 className="text-uppercase font-weight-bold flex items-center justify-center text-[30px]">
          <img src={logo} alt="Book Store App" height="50px" width={100} />
          <strong>Book-IT</strong>
        </h6>
        <p className="px-5 text-[18px]">
          Book-IT is an online React web application where the customer can{" "}
          purchase books online. Through this book store the users can search
          <br />
          for a book by its title and later can add to the shopping cart and
          finally purchase using credit card transaction.
        </p>
      </div>
    </div>
  );
};

export default Footer;
