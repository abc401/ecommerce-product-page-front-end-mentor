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
  const [detailBoxOffset, setDetailBoxOffest] = useState(0);
  const [isDetailBoxActive, setIsDetailBoxActive] = useState(false);

  useEffect(
    function () {
      console.log("Window width: ", windowWidth);
      if (
        toggleBtn.current == null ||
        !isDetailBoxActive ||
        detailBox.current == null
      ) {
        return;
      }

      const toggleBtnRect = toggleBtn.current.getBoundingClientRect();
      const toggleBtnCenterX = toggleBtnRect.left;
      const availableSpaceOnRight = windowWidth - toggleBtnCenterX;
      console.log("Available Space: ", availableSpaceOnRight);

      const detailBoxRect = detailBox.current.getBoundingClientRect();
      if (availableSpaceOnRight > detailBoxRect.width / 2) {
        console.log(0);
        setDetailBoxOffest(0);
      } else {
        console.log(
          Math.floor(detailBoxRect.width / 2 - availableSpaceOnRight)
        );
        return setDetailBoxOffest(
          Math.floor(detailBoxRect.width / 2 - availableSpaceOnRight)
        );
      }
    },
    [windowWidth, isDetailBoxActive]
  );

  useEffect(
    function () {
      if (detailBox.current == null) return;
      detailBox.current.style.setProperty(
        "--tw-translate-x",
        `calc(-50% - ${detailBoxOffset}px)`
      );
    },
    [detailBoxOffset]
  );
  ("");
  return (
    <div className="relative grid place-items-center">
      <button
        ref={toggleBtn}
        onClick={function (e) {
          setIsDetailBoxActive(!isDetailBoxActive);
        }}
        className={clsx(
          "text-neutral-500 hover:text-black focus:text-black",
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
          "absolute -left-3 top-full my-2 grid min-h-[250px] w-[clamp(200px,_100vw-2*theme(margin.3),375px-2*theme(margin.3))] translate-x-[calc(-(_50%_+_200px_))] translate-y-8 grid-rows-[auto,_1fr] rounded-lg bg-white"
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
