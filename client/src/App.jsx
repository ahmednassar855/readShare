import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import "./App.css";
import AddBook from "./Components/AddBook/AddBook";
import Book from "./Components/Book/Book";
import Home from "./Components/Home/Home";
import IssuedBooks from "./Components/IssuedBooks/IssuedBooks";
import Login from "./Components/Login/Login";
import NonReturnedBooks from "./Components/NonReturnedBooks/NonReturnedBooks";
import Profile from "./Components/Profile/Profile";
import RootLayout from "./Components/RootLayout/RootLayout";
import SignUp from "./Components/SignUp/SignUp";
import UserContextProvider from "./Context/UserContext";
import Layout from "./ui/Layout";
import AddCategory from "./Components/Category/AddCategory";
import AdminLayout from "./ui/AdminLayout";
 import Caetgories from "./Components/Admin/Caetgories";
import TopFive from "./Components/TopFive/TopFive";
import Recommended from "./Components/Recomended/Recommended";

import { loader as BooksLoader } from "./Components/Home/Home";
import { loader as BookReviewsLoader } from "./Components/Book/Book";
import { action as IssueBookAction } from "./Components/Book/Book";

import { loader as NonReturnLoader } from "./Components/NonReturnedBooks/NonReturnedBooks";
import { action as ReturnAction } from "./Components/NonReturnedBooks/NonReturnedBooks";

import { loader as RecommendedBookLoader } from "./Components/Recomended/Recommended";

import { loader as EditCategoryLoader } from "./Components/Admin/EditCategory";
import { action as UpdateCategoryAction } from "./Components/Admin/EditCategory";

import { action as DeleteCategoryAction } from "./Components/Admin/Caetgories";
import { loader as CategoryLoader } from "./Components/Admin/Caetgories";

import { action as CreateBookAction } from "./Components/Category/AddCategory";
import EditCategory from "./Components/Admin/EditCategory";
 
let routers = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <SignUp /> },
      { path: "login", element: <Login /> },
      {
        path: "",
        element: <Layout />,
        children: [
          { path: "home", element: <Home />, loader: BooksLoader },
          { path: "addBook", element: <AddBook /> },
          {
            path: "book/:id",
            element: <Book />,
            loader: BookReviewsLoader,
            action: IssueBookAction,
          },
          { path: "profile", element: <Profile /> },
          {
            path: "none-return-books",
            element: <NonReturnedBooks />,
            loader: NonReturnLoader,
            action: ReturnAction,
          },
          {
            path: "recommended",
            element: <Recommended />,
            loader: RecommendedBookLoader,
          },
          { path: "topFive", element: <TopFive /> },

          { path: "issuedBooks", element: <IssuedBooks /> },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Home />, loader: BooksLoader },
          { path: "Book/:id", element: <Book />, loader: BookReviewsLoader },
          { path: "addCategory", element: <AddCategory />  , action : CreateBookAction},
          {
            path: "categories",
            element: <Caetgories />,
            loader: CategoryLoader,
            action: DeleteCategoryAction,
            children: [
              { index: true, element: <Caetgories /> },
              { path: "delete/:id", element: <Caetgories /> },
            ],
          },
          {
            path: "categories/edit/:id",
            element: <EditCategory />,
            loader: EditCategoryLoader,
            action: UpdateCategoryAction,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <UserContextProvider>
          <RouterProvider router={routers} />
        </UserContextProvider>
      </QueryClientProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
