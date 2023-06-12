import { slide as Menu } from "react-burger-menu";
import "@/styles/burger-menu.css";

export default function BurgerMenu() {
  return (
    <>
      <Menu right>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="play" className="menu-item" href="/play">
          Play
        </a>
      </Menu>
    </>
  );
}
