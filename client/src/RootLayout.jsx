import { Outlet, ScrollRestoration } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className="w-full min-h-screen  bg-light  dark:bg-dark  text-light-primary dark:text-dark-primary ">
        <ScrollRestoration />
        <Outlet />
      </div>
    </>
  );
}
