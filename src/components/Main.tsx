import { ReactComponent as PlusIcon } from "@images/icon-plus.svg";
import { ReactComponent as MinusIcon } from "@images/icon-minus.svg";
import { ReactComponent as CartIcon } from "@images/icon-cart.svg";

import ProductShowCase from "@components/ProductShowCase";

export default function Main() {
  return (
    <main>
      <ProductShowCase />
      <div className="p-6">
        <div className="my-4 text-xs font-bold uppercase tracking-widest text-accent-500">
          Sneaker Company
        </div>
        <h1>Fall Limited Edition Sneakers</h1>
        <p>
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything
          the weather can offer.
        </p>
        <div className="my-6 flex items-center justify-between">
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
        <div className="space-y-4">
          <div className="flex items-center justify-between overflow-hidden rounded-xl bg-neutral-100">
            <button className="p-6 hover:opacity-60" type="button">
              <MinusIcon />
            </button>
            <span className="font-bold">0</span>
            <button className="p-6 hover:opacity-60">
              <PlusIcon />
            </button>
          </div>
          <button className="flex w-full items-center justify-center space-x-4 rounded-xl bg-accent-500 p-4 font-bold text-white hover:bg-accent-500/70">
            <CartIcon className="w-4 stroke-[2]" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </main>
  );
}
