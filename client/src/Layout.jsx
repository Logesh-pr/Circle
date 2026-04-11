//components
import NavBar from "./components/NavBar";

//react router
import { Outlet } from "react-router-dom";

//components
import ThemeBtn from "./components/ui/ThemeBtn";

export default function Layout() {
  return (
    <div className="w-full max-w-225 h-full mx-auto flex   min-h-screen box-border">
      <aside className="bg-light dark:bg-dark md:w-[30%] w-full fixed md:static h-[60px] md:h-auto bottom-0 z-50 right-0 left-0 border-t-2 md:border-t-0 border-light-border dark:border-dark-border  md:border-r-1 md:border-light-border md:bg-transparent ">
        <NavBar />
      </aside>
      <main className="w-[70%] ">
        <div className="sticky top-0 left-0 right-0 w-full h-[50px] bg-accent z-50"></div>
        <ThemeBtn />
        <Outlet />
      </main>
    </div>
  );
}
