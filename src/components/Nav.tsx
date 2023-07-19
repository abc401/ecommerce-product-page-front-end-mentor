// SVGs
import { ReactComponent as Logo } from "@images/logo.svg";
import { ReactComponent as MenuIcon } from "@images/icon-menu.svg";
import { ReactComponent as CloseIcon } from "@images/icon-close.svg";

// Images
import UserAvatar from "@images/image-avatar.png";

import { useRef, useState } from "react";
import clsx from "clsx";
import Cart from "@partials/Cart";

interface Props {
  className?: string;
}

export default function Nav(props: Props) {
  const navListToggle = useRef<HTMLButtonElement>(null);
  const navList = useRef<HTMLDivElement>(null);

  const [isUlActive, setIsUlActive] = useState(false);

  document.addEventListener("focusin", function (e) {
    if (
      navListToggle.current == null ||
      navList.current == null ||
      e.target == null ||
      !(e.target instanceof Node)
    ) {
      return;
    }

    const target = e.target as Node;

    if (
      e.target === navListToggle.current ||
      navList.current.contains(target)
    ) {
      return;
    }

    setIsUlActive(false);
  });

  return (
    <nav
      className={clsx(
        "sticky left-0 top-0 z-[8000] grid w-full grid-cols-[max-content,_1fr,_auto] gap-4 bg-white p-6 sm:border-b sm:border-b-neutral-200/75 sm:px-0 sm:py-8 md:grid-cols-[max-content,_auto,_1fr,_auto] md:gap-14",
        props.className
      )}
    >
      <div className="grid grid-flow-col items-center gap-4">
        <button
          ref={navListToggle}
          onClick={function () {
            setIsUlActive(!isUlActive);
          }}
          className="isolate z-[9010] w-max md:hidden"
        >
          {(function () {
            if (isUlActive) {
              return <CloseIcon />;
            }
            return <MenuIcon />;
          })()}
        </button>
        <Logo />
      </div>
      <div
        ref={navList}
        className={clsx("md:flex md:items-center", {
          "fixed left-0 right-0 top-0 z-[9000] m-0 grid min-h-[100vh] grid-cols-[auto,minmax(1rem,_8rem)] font-bold after:bg-black/75 md:static md:min-h-[auto]":
            isUlActive,
          hidden: !isUlActive,
        })}
      >
        <ul className="flex flex-col gap-9 bg-white px-6 pt-24 md:flex-row md:p-0 md:text-sm md:text-neutral-500">
          <li>
            <a href="#">Collections</a>
          </li>
          <li>
            <a href="#">Men</a>
          </li>
          <li>
            <a href="#">Women</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div className="col-end-[-1] grid w-fit grid-cols-[theme(width.4),_theme(width.6),theme(width.6)] sm:grid-cols-[minmax(theme(width.4),_theme(width.5)),minmax(theme(width.6),_theme(width.12)),minmax(theme(width.6),_theme(width.12))]">
        <Cart className="" />
        <button className="hover-outline | col-start-3 aspect-square rounded-full">
          <img src={UserAvatar} alt="User avatar" />
        </button>
      </div>
    </nav>
  );
}
