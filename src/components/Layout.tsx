import { Outlet } from "react-router-dom";
import { Navigation } from "./sections/Navigation";
import { NewsletterFooter } from "./sections/NewsletterFooter";
import { ScrollManager } from "./ScrollManager";

export function Layout() {
  return (
    <>
      <ScrollManager />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <NewsletterFooter />
    </>
  );
}
