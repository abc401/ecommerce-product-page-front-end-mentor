import { ReactComponent as PlusIcon } from "./icon-plus.svg";
import { ReactComponent as MinusIcon } from "./icon-minus.svg";
import ProductShowCase from "../ProductShowCase";

export default function Main() {
  return (
    <main>
      <ProductShowCase />
      <div>
        <div>Sneaker Company</div>
        <h1>Fall Limited Edition Sneakers</h1>
        <p>
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything
          the weather can offer.
        </p>
        <div>
          <span>$125.00</span>
          <span>50%</span>
          <span>$250.00</span>
        </div>
        <div>
          <MinusIcon />
          <span>0</span>
          <PlusIcon />
        </div>
        <button>Add to cart</button>
      </div>
    </main>
  );
}
