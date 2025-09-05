import NavItem from "./NavItem";

//icons
import { AiFillHome } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { RiAddBoxLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";

interface NavBarProps {
  pathname: string;
}

export default function NavigationBar({ pathname }: NavBarProps) {
  return (
    <nav className="fixed w-full  h-10  bg-white shadow-sm z-50 bottom-0 md:top-0 md:bottom-auto flex justify-around py-2">
      <NavItem
        href="/"
        //label="Home"
        icon={<AiFillHome className="h-6 w-6" />}
        isActive={/^\/[a-z]{2}$/.test(pathname)}
      />
      <NavItem
        href="/feed"
        //label="Feed"
        icon={<BiNews className="h-6 w-6" />}
        isActive={pathname.endsWith(`/${"/feed"}`)}
      />
      <NavItem
        href="/add"
        // label="Add"
        icon={<RiAddBoxLine className="h-6 w-6" />}
        isActive={pathname.endsWith(`/${"/add"}`)}
      />
      <NavItem
        href="/alert"
        //label="Alert"
        icon={<FaRegBell className="h-6 w-6" />}
        isActive={pathname.endsWith(`/${"/alert"}`)}
      />
      <NavItem
        href="/user"
        //label="User"
        icon={<FiUser className="h-6 w-6" />}
        isActive={pathname.endsWith(`/${"/user"}`)}
      />
    </nav>
  );
}
