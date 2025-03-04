import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Auth/login";
import Register from "./Auth/Register";
import Home from "./Page/Home";
import UserDashboard from "./Page/User/UserDashboard";
import AllCourses from "./Page/User/AllCourses";
import EnrolledCourseDetails from "./Page/User/EnrolledCourseDetails";
import CourseDetails from "./Page/User/CourseDetails";
import MyLearning from "./Page/User/MyLearning";
import ProfilePage from "./Page/User/ProfilePage";
import EditProfile from "./Page/User/EditProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Pages */}
        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<AllCourses />} />

          <Route
            path="/user/enrolled-course/:courseId"
            element={<EnrolledCourseDetails />}
          />

          <Route path="/user/course/:courseId" element={<CourseDetails />} />

          <Route path="/user/my-learning" element={<MyLearning />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
