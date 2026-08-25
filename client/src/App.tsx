//layout
import RootLayout from "@/RootLayout";

//react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Layout from "@/Layout";
import Home from "@/pages/Home";
import Signup from "@/pages/Signup";
import OTP from "@/pages/OTP";
import SignupProtect from "@/protectRoutes/SignupProtect";
import UsernameSelection from "@/pages/UsernameSelection";
import AuthLayout from "@/pages/AuthLayout";
import NotFound from "@/pages/NotFound";
import SearchPage from "@/pages/SearchPage";
import Notification from "@/pages/Notification";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import PublicLayout from "@/protectRoutes/PublicLayout";
import Bookmark from "@/pages/Bookmark";

//components

//react query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ProtectLayout from "./protectRoutes/ProtectLayout.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: (
          <ProtectLayout>
            <Layout />
          </ProtectLayout>
        ),
        children: [
          {
            path: "/",
            element: <Home />,
          },

          {
            path: "/search",
            element: <SearchPage />,
          },
          // {
          //   path: "/notification",
          //   element: <Notification />,
          // },
          {
            path: "/bookmark",
            element: <Bookmark />,
          },
          {
            path: "/profile/:username",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/auth",
        element: (
          <PublicLayout>
            <AuthLayout />
          </PublicLayout>
        ),
        children: [
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "otp",
            element: (
              <SignupProtect allowedStep="otp">
                <OTP />
              </SignupProtect>
            ),
          },
          {
            path: "username",
            element: (
              <SignupProtect allowedStep="username">
                <UsernameSelection />
              </SignupProtect>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
