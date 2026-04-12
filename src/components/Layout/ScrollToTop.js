import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This scrolls the page to the top-left [0,0] coordinate
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every time the URL path changes

  return null;
}

