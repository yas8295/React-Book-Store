import React, { createContext, useContext, useEffect, useState } from "react";

const contexts = createContext();

function Context({ children }) {
  const [dark, setDark] = useState(
    localStorage.theme === "dark" ? true : false
  );

  return (
    <contexts.Provider value={{ dark, setDark }}>{children}</contexts.Provider>
  );
}

export { contexts, Context };

export default function DarkButton({ className }) {
  const { dark, setDark } = useContext(contexts);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <label className="fixed right-0 top-1/2 rotate-90 origin-top-right z-[999999] inline-flex items-center cursor-pointer">
      <input
        checked={localStorage.theme === "light"}
        type="checkbox"
        onChange={() => {
          localStorage.theme === "dark"
            ? localStorage.setItem("theme", "light")
            : localStorage.setItem("theme", "dark");
          setDark((dark) => !dark);
        }}
        className="sr-only peer"
      />
      <div className="w-16 h-6 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-5 before:w-5 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#4c99a6] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-5 after:h-5 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-[-1px]" />
    </label>
  );
}
