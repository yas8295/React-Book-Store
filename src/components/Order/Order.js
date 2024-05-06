import React, { useContext } from "react";
import { contexts } from "../DarkButton/DarkButton";
import { ClipLoader } from "react-spinners";

export default function Order({ order }) {
  const { dark } = useContext(contexts);

  if (!order.order || order.order.length === 0) {
    return (
      <div className="w-full flex justify-center items-center dark:bg-[#000a12] dark:text-white">
        <ClipLoader color={`${dark ? "white" : `#140074`}`} loading size={60} />
      </div>
    );
  }

  return (
    <div className="grid grid-rows-auto rounded-xl shadow-xl backdrop-blur-2xl dark:border-[1px] border-[#4ea4cd] dark:bg-[#000f29a1] bg-[#ffffffcf] dark:text-white w-full mt-3">
      <div className="grid grid-cols-4 sm:px-4 px-3 py-3 rounded-t-xl bg-[#e7f2fd] dark:bg-[#123558] sm:text-[13px] text-[11px] font-semibold">
        <h1 className="col-span-2">ITEM</h1>
        <h1 className="text-right">QUANTITY</h1>
        <h1 className="text-right">AMOUNT</h1>
      </div>
      <div className="py-3">
        {order?.order?.line_items?.map((e, i) => (
          <div className="grid grid-cols-4 sm:px-4 px-3 px- py-1 items-center">
            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <img
                  className="w-16 drop-shadow-[-13px_6px_8px_rgba(0,0,0,0.50)]"
                  src={e.image.url}
                  alt=""
                />
                <h1>{e.product_name}</h1>
              </div>
            </div>
            <h1 className="text-right">{e.quantity}</h1>
            <h1 className="text-right font-semibold">
              {e.price.formatted_with_symbol}
            </h1>
            {i + 1 !== order?.order?.line_items.length && (
              <hr className="col-span-4 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
