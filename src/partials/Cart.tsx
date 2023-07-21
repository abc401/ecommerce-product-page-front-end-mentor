import { useEffect, useRef, useState, useContext } from "react";
import { ReactComponent as CartIcon } from "/src/images/icon-cart.svg";

import clsx from "clsx";
import CartContext from "@contexts/CartContext";

import ProductThumbnail from "@images/image-product-1-thumbnail.jpg";
import { ReactComponent as TrashIcon } from "@images/icon-delete.svg";

interface Props {
  className?: string;
}

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function onWindowResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(function () {
    window.addEventListener("resize", onWindowResize);
    return function () {
      document.body.removeEventListener("resize", onWindowResize);
    };
  });
  return windowWidth;
}

export default function Cart(props: Props) {
  const windowWidth = useWindowWidth();
  const toggleBtn = useRef<HTMLButtonElement>(null);
  const detailBox = useRef<HTMLDivElement>(null);
  const [isDetailBoxActive, setIsDetailBoxActive] = useState(false);
  const [cartContext, setCartContext] = useContext(CartContext);

  function onDetailBoxOffsetChange(newOffset: number) {
    if (detailBox.current == null) return;
    detailBox.current.style.setProperty(
      "--tw-translate-x",
      `calc(-50% - ${newOffset}px)`
    );
  }

  function detailBoxEventListener(e: Event) {
    if (detailBox.current == null) {
      return;
    }
    if (!(e.target instanceof Node) || !detailBox.current.contains(e.target)) {
      setIsDetailBoxActive(false);
    }
  }

  useEffect(
    function () {
      if (isDetailBoxActive) {
        document.addEventListener("focusin", detailBoxEventListener);
        document.addEventListener("mousedown", detailBoxEventListener);
      } else {
        document.removeEventListener("focusin", detailBoxEventListener);
        document.removeEventListener("mousedown", detailBoxEventListener);
      }
    },
    [isDetailBoxActive]
  );

  useEffect(
    function () {
      if (
        toggleBtn.current == null ||
        !isDetailBoxActive ||
        detailBox.current == null
      ) {
        return;
      }

      const toggleBtnRect = toggleBtn.current.getBoundingClientRect();

      const availableSpaceOnRight = windowWidth - toggleBtnRect.left;

      const detailBoxRect = detailBox.current.getBoundingClientRect();
      if (availableSpaceOnRight > detailBoxRect.width / 2) {
        onDetailBoxOffsetChange(0);
      } else {
        onDetailBoxOffsetChange(
          Math.floor(detailBoxRect.width / 2 - availableSpaceOnRight)
        );
      }
    },
    [windowWidth, isDetailBoxActive]
  );

  return (
    <div className="relative grid place-items-center">
      <button
        ref={toggleBtn}
        onClick={function () {
          setIsDetailBoxActive(!isDetailBoxActive);
        }}
        className={clsx(
          "relative w-full text-neutral-500 hover:text-black focus:text-black",
          props.className
        )}
        type="button"
      >
        {isDetailBoxActive ? (
          <>
            <span className="sr-only">Close Cart Details</span>
            {cartContext > 0 && (
              <span className="sr-only">Your cart is empty</span>
            )}
          </>
        ) : (
          <span className="sr-only">Cart Details</span>
        )}
        <CartIcon className="min-w-[1rem]" />

        {/* Cart Item Count */}
        {cartContext > 0 && (
          <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-[40%] rounded-full bg-accent-500 px-1.5 text-[0.6rem] font-bold text-white">
            {cartContext}
          </span>
        )}
      </button>

      {/* Cart Details */}
      <div
        ref={detailBox}
        className={clsx(
          {
            hidden: !isDetailBoxActive,
          },
          "absolute -left-3 top-full my-2 grid min-h-[200px] w-[clamp(100px,_100vw-2*theme(margin.3),_320px-2*theme(margin.3))] translate-x-[calc(-(_50%_+_200px_))] translate-y-6 grid-rows-[auto,_1fr] rounded-lg bg-white shadow-2xl"
        )}
      >
        <h2 className="border-b border-b-neutral-100 py-4 ps-6 font-bold">
          Cart
        </h2>

        {cartContext > 0 ? (
          <div className="flex flex-col gap-4 p-4">
            <div className="grid w-full grid-cols-[auto,_1fr,_auto] gap-2 text-sm text-neutral-500">
              <img className="w-10 rounded-md" src={ProductThumbnail} alt="" />
              <div>
                <span>Fall Limited Edition Sneakers</span>
                <div>
                  <span>
                    $125.00 x {cartContext}{" "}
                    <span className="font-bold text-black">$375.00</span>
                  </span>
                </div>
              </div>
              <button
                onClick={function () {
                  setCartContext(0);
                }}
              >
                <span className="sr-only">
                  Remove {cartContext} Fall Limited Edition Sneakers from cart
                </span>
                <TrashIcon />
              </button>
            </div>
            <button className="btn btn-primary">Checkout</button>
          </div>
        ) : (
          <div className="grid place-items-center">
            <p className="m-0 font-bold">Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}
