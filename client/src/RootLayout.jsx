import { Outlet, ScrollRestoration } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className="w-full min-h-screen p-2 bg-light  dark:bg-dark  text-light-text dark:text-dark-test ">
        <ScrollRestoration />
        <Outlet />
      </div>
    </>
  );
}
