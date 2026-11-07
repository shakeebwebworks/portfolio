import { useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "../utils/scroll";

// Scrolls to a section on the home page, or goes home first if you are on another page.
export default function useGoTo() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (id) => {
    if (pathname === "/") scrollToId(id);
    else navigate("/", { state: { scrollTo: id } });
  };
}
