import { ReactComponent as CartIcon } from "./icon-cart.svg";

export default function Cart() {
  return (
    <button>
      <CartIcon />

      {/* Cart Item Count */}
      <span>3</span>
    </button>
  );
}
