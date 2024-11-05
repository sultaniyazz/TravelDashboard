import { ImLocation } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { CgExtensionAdd } from "react-icons/cg";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
export const navBars = [
  {
    id: 1,
    title: "destinations",
    icon: ImLocation,
    url: "/",
  },
  {
    id: 2,
    title: "tours",
    icon: GiAirplaneDeparture,
    url: "/tours",
  },
  {
    id: 3,
    title: "create-destinations",
    icon: MdOutlineAddLocationAlt,
    url: "/create-destinations",
  },
  {
    id: 4,
    title: "create-tour",
    icon: CgExtensionAdd,
    url: "/create-tours",
  },
  {
    id: 5,
    title: "users",
    icon: FiUsers,
    url: "/users",
  },
];
