import { useEffect, useRef, useState } from "react";
import { ReactComponent as CartIcon } from "/src/images/icon-cart.svg";
import clsx from "clsx";

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

  function onDetailBoxOffsetChange(newOffset: number) {
    if (detailBox.current == null) return;
    detailBox.current.style.setProperty(
      "--tw-translate-x",
      `calc(-50% - ${newOffset}px)`
    );
  }

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
    <div className="grid place-items-center">
      <button
        ref={toggleBtn}
        onClick={function () {
          setIsDetailBoxActive(!isDetailBoxActive);
        }}
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

      {/* Cart Details */}
      <div
        ref={detailBox}
        className={clsx(
          {
            hidden: !isDetailBoxActive,
          },
          "absolute -left-3 top-full my-2 grid min-h-[250px] w-[clamp(200px,_100vw-2*theme(margin.3),375px-2*theme(margin.3))] translate-x-[calc(-(_50%_+_200px_))] translate-y-8 grid-rows-[auto,_1fr] rounded-lg bg-white shadow-2xl"
        )}
      >
        <h2 className="border-b border-b-neutral-100 py-4 ps-6 font-bold">
          Cart
        </h2>
        <div className="grid place-items-center font-bold">
          <p className="m-0">Your cart is empty</p>
        </div>
      </div>
    </div>
  );
}
