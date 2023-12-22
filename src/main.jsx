import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistedStore } from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  CategorisedItemsPage,
  ItemDetailsPage,
  ViewItemsPage,
  SignUpPage, 
  LogInPage,
  AboutPage,
  ContactPage,
  MyMealsPage,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // home page
      {
        path: "",
        element: <HomePage />,
      },
      // category page
      {
        path: "category/:category/",
        children: [
          {
            path: "",
            element: <CategorisedItemsPage />,
          },
          {
            path: ":item",
            element: <ItemDetailsPage />,
          },
        ],
      },
      // view-items page
      {
        path: "viewitems/",
        children: [
          {
            path: "",
            element: <ViewItemsPage />,
          },
          {
            path: ":item",
            element: <ItemDetailsPage />,
          },
        ],
      },
      // about page
      {
        path: "aboutus",
        element: <AboutPage/>
      },
      // contact page
      {
        path: "contact",
        element: <ContactPage/>
      },
      // my meals page
      {
        path: "mymeals/",
        children: [
          {
            path: "",
            element: <MyMealsPage/>
          },
          {
            path: ":item",
            element: <ItemDetailsPage/>
          }
        ]
      },
      // sign up page
      {
        path: "signup",
        element: <SignUpPage/>
      },
      // log in page
      {
        path: "login",
        element: <LogInPage/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading persistor={persistedStore}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
