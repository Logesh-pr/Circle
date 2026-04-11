//components
import NavBar from "./components/NavBar";

//react router
import { Outlet } from "react-router-dom";

//components
import ThemeBtn from "./components/ui/ThemeBtn";

export default function Layout() {
  return (
    <div className="w-full max-w-225 h-full mx-auto flex   min-h-screen box-border">
      <aside className="w-[30%] ">
        <NavBar />
      </aside>
      <main className="w-[70%] ">
        <ThemeBtn />
        <Outlet />
      </main>
    </div>
  );
}
