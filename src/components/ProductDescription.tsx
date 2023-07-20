import { ReactComponent as PlusIcon } from "@images/icon-plus.svg";
import { ReactComponent as MinusIcon } from "@images/icon-minus.svg";
import { ReactComponent as CartIcon } from "@images/icon-cart.svg";
import { useContext, useState } from "react";
import CartContext from "@contexts/CartContext";

interface Props {
  className?: string;
}

export default function ProductDescription(props: Props) {
  const [cartContext, setCartContext] = useContext(CartContext);
  const [nProducts, setNProducts] = useState(0);

  return (
    <div className={props.className}>
      <div className="p-6">
        <div className="my-4 text-xs font-bold uppercase tracking-widest text-accent-500 sm:my-0">
          Sneaker Company
        </div>
        <h1>Fall Limited Edition Sneakers</h1>
        <p>
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything
          the weather can offer.
        </p>
        <div className="my-6 flex flex-wrap items-center justify-between gap-4 xs:flex-col xs:items-start xs:gap-0 ">
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold">$125.00</span>
            <span className="rounded-lg bg-accent-100 px-2 py-[2px] font-bold text-accent-500">
              50%
            </span>
          </div>
          <span className="font-bold text-neutral-200 line-through">
            $250.00
          </span>
        </div>
        <div className="grid gap-4 lg:grid-cols-[auto,_1fr]">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-neutral-100">
            <button
              onClick={function () {
                if (nProducts <= 0) {
                  return;
                }
                setNProducts(nProducts - 1);
              }}
              className="p-6 hover:opacity-60 focus-visible:opacity-60"
              type="button"
            >
              <MinusIcon />
            </button>
            <span className="font-bold">{nProducts}</span>
            <button
              onClick={function () {
                setNProducts(nProducts + 1);
              }}
              className="p-6 hover:opacity-60 focus-visible:opacity-60"
            >
              <PlusIcon />
            </button>
          </div>
          <button
            onClick={function () {
              setCartContext(cartContext + nProducts);
              setNProducts(0);
            }}
            className="btn btn-primary"
          >
            <CartIcon className="w-4" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
