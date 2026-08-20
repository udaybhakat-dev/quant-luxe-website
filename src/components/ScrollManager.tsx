import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On every route change: scroll to the element matching the URL hash
 * (e.g. Link to="/#shop") if present, otherwise reset to the top of the
 * new page. Plain <a href="#hash"> works within a page load, but React
 * Router's client-side navigation doesn't trigger the browser's native
 * hash-scroll, so this replaces that behaviour app-wide.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
