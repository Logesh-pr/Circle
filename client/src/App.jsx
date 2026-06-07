//layout
import RootLayout from "./RootLayout";

//react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import OTP from "./pages/OTP.jsx";
import SignupProtect from "./protectRoutes/SignupProtect.jsx";
import UsernameSelection from "./pages/usernameSelection.jsx";
import AuthLayout from "./pages/AuthLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Notification from "./pages/Notification.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import PublicLayout from "./protectRoutes/PublicLayout.jsx";
import Bookmark from "./pages/Bookmark.jsx";

//components

//react query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ProtectLayout from "./protectRoutes/ProtectLayout.jsx";

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
