import { Outlet, ScrollRestoration } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className="w-full min-h-screen p-2 bg-black text-white drak:text-white ">
        <ScrollRestoration />
        <Outlet />
      </div>
    </>
  );
}
