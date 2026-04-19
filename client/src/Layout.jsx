//components
import NavBar from "./components/NavBar";

//react router
import { Outlet } from "react-router-dom";

//components
import ThemeBtn from "./components/ui/ThemeBtn";

export default function Layout() {
  return (
    <div className="w-full max-w-[1200px]  mx-auto flex min-h-screen  box-border">
      {/* <div className="  h-[70px]  border border-green-500"></div>
      <div className="h-full px-2 md:px-4 lg:px-6 overflow-y-scroll border border-red-500">
        <Outlet />
      </div>
      <div className="  h-[70px]  border border-amber-500"></div> */}
      <aside className=" bg-light dark:bg-dark md:w-[30%] xl:w-[25%] w-full overflow-y-scroll fixed md:sticky md:top-0 h-[60px] md:min-h-screen bottom-0 z-50 right-0 left-0 border-t md:border-t-0 border-light-border dark:border-dark-border  md:border-r md:border-light-border md:bg-transparent ">
        <NavBar />
      </aside>
      <main className="w-full md:w-[70%] xl:w-[50%] ">
        <div className="sticky top-0 left-0 right-0 w-full bg-light dark:bg-dark h-[50px] z-40 border-b border-light-border dark:border-dark-border">
          <div className="absolute right-[10px] top-[15px]">
            <ThemeBtn />
          </div>
        </div>
        <div className="w-full h-auto overflow-scroll px-2 md:px-4 lg:px-6">
          <Outlet />
        </div>
      </main>
      <div className="hidden xl:block xl:w-[25%]"></div>
    </div>
  );
}
