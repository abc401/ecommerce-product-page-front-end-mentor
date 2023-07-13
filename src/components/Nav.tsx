// SVGs
import { ReactComponent as Logo } from "@images/logo.svg";
import { ReactComponent as MenuIcon } from "@images/icon-menu.svg";
import { ReactComponent as CloseIcon } from "@images/icon-close.svg";

// Images
import UserAvatar from "@images/image-avatar.png";

import { useRef, useState } from "react";
import clsx from "clsx";
import Cart from "@partials/Cart";

export default function Nav() {
  const navListToggle = useRef<HTMLButtonElement>(null);
  const navList = useRef<HTMLUListElement>(null);

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
    <nav className="sticky left-0 top-0 z-[8000] flex flex-grow-0 items-center justify-between bg-white p-6">
      <div className="flex flex-shrink-0 items-center space-x-4">
        <button
          ref={navListToggle}
          onClick={function () {
            setIsUlActive(!isUlActive);
          }}
          className="isolate z-[9999]"
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
      <ul
        ref={navList}
        className={clsx({
          "fixed left-0 top-0 z-[9000] m-0 min-h-[100vh] w-[68%] space-y-4 bg-white pl-6 pt-24 font-bold after:fixed after:right-0 after:top-0 after:min-h-[100vh] after:w-[32%] after:bg-black/75 after:content-['']":
            isUlActive,
          hidden: !isUlActive,
        })}
      >
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
      <div className="ml-4 flex flex-shrink-0 flex-grow-0 items-center justify-center space-x-5">
        <Cart className="h-5" />
        <div className="min-w-[1.5rem] max-w-[2.5rem]">
          <img
            className="w-6 rounded-full outline outline-2 outline-transparent transition-[outline-color] ease-in hover:outline-accent-500"
            src={UserAvatar}
            alt="User avatar"
          />
        </div>
      </div>
    </nav>
  );
}
