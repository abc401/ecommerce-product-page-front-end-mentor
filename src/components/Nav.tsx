import Cart from "../partials/Cart";

// SVGs
import { ReactComponent as Logo } from "@images/logo.svg";
import { ReactComponent as MenuIcon } from "@images/icon-menu.svg";

// Images
import UserAvatar from "@images/image-avatar.png";

export default function Nav() {
  return (
    <nav className="relative flex flex-grow-0 items-center justify-between space-x-4 p-6">
      <div className="flex flex-shrink-0 items-center space-x-4">
        <button>
          <MenuIcon />
        </button>
        <Logo />
      </div>
      <ul className="absolute hidden opacity-0">
        <li>Collections</li>
        <li>Men</li>
        <li>Women</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="flex flex-grow-0 items-center justify-center space-x-5">
        <Cart className="h-5" />
        <div className="min-w-[1.5rem] max-w-[2.5rem]">
          <img
            className="rounded-full outline outline-2 outline-transparent transition-[outline-color] ease-in hover:outline-accent-500"
            src={UserAvatar}
            alt="User avatar"
          />
        </div>
      </div>
    </nav>
  );
}
