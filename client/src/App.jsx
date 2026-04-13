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

//components

//react query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
          ],
        },
        {
          path: "/auth",
          element: <AuthLayout />,
          children: [
            {
              path: "signup",
              element: <Signup />,
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
          paht: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
