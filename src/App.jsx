import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Quiz from './Components/Quiz/Quiz'
import HomePage from './Components/Dashboard/Content/HomePage/HomePage'
//import CoursesPage from './Components/Dashboard/Content/CoursesPage/CoursesPage'
import ForumPage from './Components/Dashboard/Content/ForumPage/ForumPage'
import ForumPosts from './Components/Dashboard/Content/ForumPage/ForumPosts/ForumPosts'
import GroupProjectsPage from './Components/Dashboard/Content/GroupProjectsPage/GroupProjectsPage'
import SupportPage from './Components/Dashboard/Content/SupportPage/SupportPage'
import CoursePreview from './Components/Courses/CoursePreview'
//import CodeEditor from "./Components/Courses/CodeEditor/CodeEditor"
import Lesson from './Components/Courses/CodeEditor/Lesson'
import ContentTop from './Components/Dashboard/ContentTop/ContentTop'
import AdminPage from './Components/Dashboard/Content/AdminPage/AdminPage'
import RequireAuth from './Context/RequireAuth'
import PersistLogin from './Context/PersistLogin'


// Import SidebarProvider
import { SidebarProvider } from './Components/Dashboard/Reducer/sidebarContext';

//Import React routes
import { Routes, Route } from 'react-router-dom';


// Sidebar layout for specific routes
const SidebarLayout = ({ children }) => (
  <SidebarProvider>
    <div className="app">
      <Dashboard />
      <div className='main-content'>
        <ContentTop />
        {children}
        </div>
    </div>
  </SidebarProvider>
);

function App() {
  return (
    
      <Routes>
        
        {/* Public Routes */}
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />


        {/* Protected routes */}
        
        <Route element={<PersistLogin />}> 

          {/* User routes */}

          <Route element={<RequireAuth  allowedRoles={['User', 'Admin']} />}>
        
            <Route
              path="homepage"
              element={
                <SidebarLayout>
                  <HomePage />
                </SidebarLayout>
              }
            />
            <Route path="quiz" element={<Quiz />} />
 {/* 
            <Route
              path="coursespage"
              element={
                <SidebarLayout>
                  <CoursesPage />
                </SidebarLayout>
              }
            />
            */}
            <Route
              path="forumpage"
              element={
                <SidebarLayout>
                  <ForumPage />
                </SidebarLayout>
              }
            />
            <Route
              path="groupprojectspage"
              element={
                <SidebarLayout>
                  <GroupProjectsPage />
                </SidebarLayout>
              }
            />
            <Route
              path="supportpage"
              element={
                <SidebarLayout>
                  <SupportPage />
                </SidebarLayout>
              }
            />
            <Route
              path="forumposts"
              element={
                <SidebarLayout>
                  <ForumPosts />
                </SidebarLayout>
              }
            />
            <Route path="/coursepreview/:id"  element={<CoursePreview />} />
            <Route path="/lesson/:sectionId" element={<Lesson />} />

          
          </Route>

          {/* Only Admin routes */}
          <Route element={<RequireAuth  allowedRoles={['Editor', 'Admin']} />}>
          <Route
              path="adminpage"
              element={
                <SidebarLayout>
                  <AdminPage />
                </SidebarLayout>
              }
            />

          </Route>

          {/* Catch-all for unmatched routes */}

        </Route>

          
          
        
      </Routes>
    
  )
}


export default App
