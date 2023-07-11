import Cart from "../../partials/Cart/Cart";
import { ReactComponent as Logo } from "./logo.svg";
import UserAvatar from "./image-avatar.png";

export default function Nav() {
  return (
    <nav>
      <Logo />
      <ul>
        <li>Collections</li>
        <li>Men</li>
        <li>Women</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <Cart />
      <div>
        <img src={UserAvatar} alt="User avatar" />
      </div>
    </nav>
  );
}
