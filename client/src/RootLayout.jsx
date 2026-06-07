import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <>
      <div className="w-full min-h-screen  bg-light  dark:bg-dark  text-light-primary dark:text-dark-primary ">
        <ScrollRestoration />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: '"Reddit Sans", sans-serif',
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              className: "!bg-accent !text-white",
            },
            error: {
              className: "!bg-red-400 !text-white",
            },
          }}
        />
        <Outlet />
      </div>
    </>
  );
}
