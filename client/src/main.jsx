import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import MathGame from "./components/MathGame.jsx";

// const client = new ApolloClient({
//   uri: "https://your-graphql-endpoint.com/graphql",
//   cache: new InMemoryCache(),
// });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/mathgame",
        element: <MathGame />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <ApolloProvider client={client}> {/* Wrap the app with ApolloProvider */}
    <RouterProvider router={router} />
  // </ApolloProvider>
);