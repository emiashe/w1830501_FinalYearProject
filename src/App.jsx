//w1830501
// Main app component with route configuration and layout structure

import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Quiz from './Components/Quiz/Quiz'
import HomePage from './Components/Dashboard/Content/HomePage/HomePage'
import CoursesPage from './Components/Dashboard/Content/CoursesPage/CoursesPage'
import ForumPage from './Components/Dashboard/Content/ForumPage/ForumPage'
import ForumPosts from './Components/Dashboard/Content/ForumPage/ForumPosts/ForumPosts'
import SupportPage from './Components/Dashboard/Content/SupportPage/SupportPage'
import SupportArticle from './Components/Dashboard/Content/SupportPage/SupportArticle/SupportArticle'
import CoursePreview from './Components/Courses/CoursePreview'
import Lesson from './Components/Courses/CodeEditor/Lesson'
import ContentTop from './Components/Dashboard/ContentTop/ContentTop'
import AdminPage from './Components/Dashboard/Content/AdminPage/AdminPage'
import RequireAuth from './Context/requireAuth'
import PersistLogin from './Context/PersistLogin'

import { SidebarProvider } from './Components/Dashboard/Reducer/sidebarContext';
import { Routes, Route } from 'react-router-dom';

// Layout used for protected routes
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

      {/* Public routes */}
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Protected routes with persistent login */}
      <Route element={<PersistLogin />}> 

        {/* Routes for User and Admin roles */}
        <Route element={<RequireAuth allowedRoles={['User', 'Admin']} />}>
          <Route path="homepage" element={<SidebarLayout><HomePage /></SidebarLayout>} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="coursespage" element={<SidebarLayout><CoursesPage /></SidebarLayout>} />
          <Route path="forumpage" element={<SidebarLayout><ForumPage /></SidebarLayout>} />
          <Route path="supportpage" element={<SidebarLayout><SupportPage /></SidebarLayout>} />
          <Route path="/support/:id" element={<SidebarLayout><SupportArticle /></SidebarLayout>} />
          <Route path="forum/post/:slug" element={<SidebarLayout><ForumPosts /></SidebarLayout>} />
          <Route path="/coursepreview/:id" element={<CoursePreview />} />
          <Route path="/lesson/:sectionId" element={<Lesson />} />
        </Route>

        {/* Routes only for Admin and Editor roles */}
        <Route element={<RequireAuth allowedRoles={['Editor', 'Admin']} />}>
          <Route path="adminpage" element={<SidebarLayout><AdminPage /></SidebarLayout>} />
        </Route>

      </Route>

    </Routes>
  )
}

export default App
