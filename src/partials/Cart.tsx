import { ReactComponent as CartIcon } from "/src/images/icon-cart.svg";
import clsx from "clsx";

interface Props {
  className?: string;
}

export default function Cart(props: Props) {
  return (
    <button
      className={clsx(
        "relative text-neutral-500 hover:text-black focus:text-black",
        props.className
      )}
      type="button"
    >
      <CartIcon className="h-full min-w-[1rem]" />

      {/* Cart Item Count */}
      <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-[40%] rounded-full bg-accent-500 px-1.5 text-[0.6rem] font-bold text-white">
        4
      </span>
    </button>
  );
}
