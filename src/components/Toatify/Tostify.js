import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { contexts } from "../DarkButton/DarkButton";
import { Flip } from "react-toastify";

export default function Tostify() {
  const { dark } = useContext(contexts);

  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={`${dark ? "dark" : "light"}`}
      toastClassName="dark:bg-[#0d1b25!important] bg-white md:text-[22px] text-nowrap mx-auto w-fit text-black dark:text-[white!important]"
      transition={Flip}
    />
  );
}
