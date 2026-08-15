import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Setting from "./components/core/Dashboard/Setting/index";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse/index";

import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/index";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/catalog/:catalogName" element={<Catalog />}></Route>
        <Route path="/courses/:courseId" element={<CourseDetails />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword />}></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>

        <Route path="/About" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />}></Route>
          <Route path="dashboard/setting" element={<Setting />}></Route>
          <Route
            path="dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          ></Route>

          {
            <>
              user?.accoutType === ACCOUNT_TYPE.STUDENT && (
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              ></Route>
              <Route path="dashboard/cart" element={<Cart />}></Route>)
            </>
          }
          {
            <>
              user?.accoutType === ACCOUNT_TYPE.INSTRUCTOR && (
              <Route
                path="dashboard/add-course"
                element={<AddCourse />}
              ></Route>
              <Route
                path="dashboard/my-courses"
                element={<MyCourses />}
              ></Route>
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              ></Route>
              <Route
                path="dashboard/instructor"
                element={<Instructor />}
              ></Route>
              )
            </>
          }
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          user?.accoutType === ACCOUNT_TYPE.STUDENT && (
          <>
            <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            ></Route>
          </>
          )
        </Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
