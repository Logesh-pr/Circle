//layout
import RootLayout from "./RootLayout";

//react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";

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
          element: <Auth />,
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
