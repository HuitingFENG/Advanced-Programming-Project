// AuthenticatedRoutes.js

import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useUser } from "./context/UserContext";
import Login from "./pages/Common/Login";
import Register from "./pages/Common/Register";
import AdminChat from "./pages/Chat/AdminChat";
// import StudentChat from "./pages/Chat/Studentchat";
import TutorChat from "./pages/Chat/TutorChat";
import AdminEditDeadlines from "./pages/Admin/AdminEditDeadlines";
import AdminViewEdit from "./pages/Admin/AdminViewEdit";
import AdminViewAllFiles from "./pages/Admin/AdminViewAllFiles";
// import AdminViewAllStatus from "./pages/Admin/AdminViewAllStatus";
import AdminManageDeadlines from "./pages/Admin/AdminManageDeadlines";
// import AdminEditNotifications from "./pages/Admin/AdminEditNotifications";
import AdminManageInternships from "./pages/Admin/AdminManageInternships";
import AdminHome from "./pages/Admin/AdminHome";
// import AdminManageNotifications from "./pages/Admin/AdminManageNotifications";
import StudentAddNewInternship from "./pages/Student/StudentAddNewInternship";
import StudentHome from "./pages/Student/StudentHome";
import StudentFill from "./pages/Student/StudentFill";
import StudentManageInternships from "./pages/Student/StudentManageInternships";
import StudentManageMeeting from "./pages/Student/StudentManageMeeting";
import StudentUploadFiles from "./pages/Student/StudentUploadFiles";
import StudentViewAllFiles from "./pages/Student/StudentViewAllFiles";
import TutorManageAllFiles from "./pages/Tutor/TutorManageAllFiles";
import TutorManageMeeting from "./pages/Tutor/TutorManageMeeting";
import TutorManageInternships from "./pages/Tutor/TutorManageInternships";
// import TutorManageAllReports from "./pages/Tutor/TutorManageAllReports";
import TutorHome from "./pages/Tutor/TutorHome";
import Profil from "./pages/Common/Profil";
import Reset from "./pages/Common/Reset";
import StudentChat from "./pages/Chat/StudentChat";

const AuthenticatedRoutes = () => {
  const userContext = useUser();

  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { user } = userContext;

  return (
    <Routes>
      <Route path="/register" element={ <Register />} />
      <Route path="/login" element={ <Login />} />
      {/* <Route path="/" element={ <Login />} /> */}
      <Route path="/" element={user ? <Login /> : <Navigate to="/register" />} />
      {/* <Route path="/" element={user ? <Profil /> : <Navigate to="/login" />} /> */}
      <Route path="/reset" element={<Reset />} />
      {/* <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} /> */}
      {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}

      <Route path="/chat/adminChat" element={<AdminChat />} />
      <Route path="/chat/studentChat" element={<StudentChat />} />
      <Route path="/chat/tutorChat" element={<TutorChat />} />

      <Route path="/admin/editdeadlines" element={<AdminEditDeadlines />} />

      
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/managedeadlines" element={<AdminManageDeadlines />} />
      <Route path="/admin/manageinternships" element={<AdminManageInternships />}  />

      <Route path="/admin/viewallfiles" element={<AdminViewAllFiles />} />
      <Route path="/admin/viewedit" element={<AdminViewEdit />} />


      <Route path="/student/addnewinternship" element={<StudentAddNewInternship />} />
      <Route path="/student/fill" element={<StudentFill />} />
      <Route path="/student/home" element={<StudentHome />} />
      <Route path="/student/manageinternships" element={<StudentManageInternships />} />
      <Route path="/student/managemeeting" element={<StudentManageMeeting />} />
      <Route path="/student/uploadfiles" element={<StudentUploadFiles />} />
      <Route path="/student/viewallfiles" element={<StudentViewAllFiles />} />

      <Route path="/tutor/home" element={<TutorHome />} />
      <Route path="/tutor/manageinternships" element={<TutorManageInternships />} />
      <Route path="/tutor/managemeeting" element={<TutorManageMeeting />} />
      <Route path="/tutor/manageallfiles" element={<TutorManageAllFiles />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
