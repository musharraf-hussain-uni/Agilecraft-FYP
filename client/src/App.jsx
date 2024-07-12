import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard/Dashboard";
import UserPage from "./pages/UserPage/UserPage";
import ReqGathering from "./pages/Req-Gathering/Req-Gathering";
import Testing from "./pages/Testing/Testing";
import BugTracking from "./pages/Bug-Tracking/BugTracking";
import Reviews from "./pages/Reviews/Reviews";
import Layout from "./components/Layout";
import Login from "./pages/Login/Login";
import AuthContextProvider from "./context/AuthContext.jsx";
import DashboardLayout from "./components/Layout/DashboardLayout.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import { Toaster } from "react-hot-toast";
import ProjectPage from "./pages/Projects/Projects.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import SingleProject from "./pages/Projects/SingleProject.jsx";
import ProjectContextProvider from "./context/ProjectContext.jsx";
import ReqContextProvider from "./context/ReqContext.jsx";
import TestCaseContextProvider from "./context/TestCaseContext.jsx";
import SingleTestCase from "./pages/Testing/SingleTestCase.jsx";
import UpdateTestCase from "./pages/Testing/UpdateTestCase.jsx";
import SingleBugTrack from "./pages/Bug-Tracking/SingleBugTrack.jsx";
import UpdateBugTrack from "./pages/Bug-Tracking/UpdateBugTrack.jsx";
import BugTrackContextProvider from "./context/BugTrackContext.jsx";
import CodeReviewContextProvider from "./context/CodeReviewContext.jsx";
import Reporting from "./pages/Reporting/Reporting.jsx";
import { NotificationProvider } from "./context/Notification-Context.jsx";

const router = createBrowserRouter([
  {
    element: <AuthContextProvider />,
    children: [
      {
        path: "/",
        element: <Layout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            path: "/dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "/dashboard/user",
            element: <UserPage />,
          },
          {
            path: "/dashboard/projects",
            element: <ProjectPage />,
          },
          {
            path: "/dashboard/requirement-gathering",
            element: <ReqGathering />,
          },
          {
            path: "/dashboard/testing",
            element: <Testing />,
          },
          {
            path: "/dashboard/bug-tracking",
            element: <BugTracking />,
          },

          {
            path: "/dashboard/reviews",
            element: <Reviews />,
          },
          {
            path: "/dashboard/reporting",
            element: <Reporting />,
          },
          {
            path: "/dashboard/projects/:id",
            element: <SingleProject />,
          },
          {
            path: "/dashboard/user/:id",
            element: <Reviews />,
          },
          {
            path: "/dashboard/testing/:id",
            element: <SingleTestCase />,
          },
          {
            path: "/dashboard/bug-tracking/:id",
            element: <SingleBugTrack />,
          },
          {
            path: "/dashboard/testing/update/:id",
            element: <UpdateTestCase />,
          },
          {
            path: "/dashboard/bug-tracking/update/:id",
            element: <UpdateBugTrack />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <NotificationProvider>
        <CodeReviewContextProvider>
          <BugTrackContextProvider>
            <TestCaseContextProvider>
              <ReqContextProvider>
                <ProjectContextProvider>
                  <UserContextProvider>
                    <Toaster />
                    <RouterProvider router={router} />
                  </UserContextProvider>
                </ProjectContextProvider>
              </ReqContextProvider>
            </TestCaseContextProvider>
          </BugTrackContextProvider>
        </CodeReviewContextProvider>
      </NotificationProvider>
    </>
  );
};

export default App;
