import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Quiz from './Components/Quiz/Quiz'
import HomePage from './Components/Dashboard/Content/HomePage/HomePage'
import CoursesPage from './Components/Dashboard/Content/CoursesPage/CoursesPage'
import ForumPage from './Components/Dashboard/Content/ForumPage/ForumPage'
import ForumPosts from './Components/Dashboard/Content/ForumPage/ForumPosts/ForumPosts'
import GroupProjectsPage from './Components/Dashboard/Content/GroupProjectsPage/GroupProjectsPage'
import SupportPage from './Components/Dashboard/Content/SupportPage/SupportPage'
import CoursePreview from './Components/Courses/CoursePreview'
import CodeEditor from "./Components/Courses/CodeEditor/CodeEditor"
import ContentTop from './Components/Dashboard/ContentTop/ContentTop'

// Import SidebarProvider
import { SidebarProvider } from './Components/Dashboard/Reducer/sidebarContext';


//Import React react dom
import {
  createBrowserRouter,
  RouterProvider, BrowserRouter as Router, Routes, Route
} from 'react-router-dom'


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

//Create a router
const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/quiz',
    element: <div><Quiz/></div>
  },
  {
    path: '/homepage',
    element: 
    <SidebarLayout>
    <div><HomePage/></div>
    </SidebarLayout>
  },
  {
    path: '/coursespage',
    element: 
    <SidebarLayout>
    <div><CoursesPage/></div>
    </SidebarLayout>
  },
  {
    path: '/forumpage',
    element: 
    <SidebarLayout>
    <div><ForumPage/></div>
    </SidebarLayout>
  },
  {
    path: '/groupprojectspage',
    element: 
    <SidebarLayout>
    <div><GroupProjectsPage/></div>
    </SidebarLayout>
  },
  {
    path: '/supportpage',
    element: 
    <SidebarLayout>
    <div><SupportPage/></div>
    </SidebarLayout>
  },
  {
    path: '/coursepreview',
    element: <div><CoursePreview/></div>
  },
  {
    path: '/codeeditor',
    element: <div><CodeEditor/></div>
  },
  {
    path: '/forumposts',
    element: 
      <SidebarLayout>
      <div><ForumPosts/></div>
      </SidebarLayout>
  }
  
])

function App() {
  return (
    
   <div>
    <RouterProvider router={router}/>
   </div>
   

  )
}

export default App
