//components
import NavBar from "./components/NavBar";

//react router
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full max-w-225 h-full mx-auto flex  border border-zinc-500 min-h-screen box-border">
      <aside className="w-[30%] ">
        <NavBar />
      </aside>
      <main className="w-[70%] ">
        <Outlet />
      </main>
    </div>
  );
}
