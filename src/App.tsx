import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/home/Home'
import LandingPage from './pages/landingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import Page404 from './pages/page404/Page404';
import RegisterForm from './pages/form/RegisterForm'
import LoginForm from './pages/form/LoginForm'
import ProtectRoutes from './components/ProtectRoutes'
import JobForm from './pages/form/JobForm'

function App() {
 

  return (
    <>
      <div className='container'>
        

        <Routes>
          <Route path='/' element={<LandingPage/>}/>
        
          <Route path='/register' element={<RegisterForm/>}/>
           <Route path='/login' element={<LoginForm/>}/>
          <Route path='/*' element={<Page404/>}/>

{/* Protect routes and components */}
          <Route path='/home' element={
              <ProtectRoutes>
                {/* This is where the children will be rendered components wraaped inside */}
                      <Home/>  
              </ProtectRoutes>
         }/>
         {/* Protect routes and components  */}
<Route path='/create-jobs' element={
              <ProtectRoutes>
                {/* This is where the children will be rendered components wraaped inside */}
                      <JobForm/>  
              </ProtectRoutes>
         }/>





         
        </Routes>
        <Toaster/>
       </div>
    </>
  )
}

export default App
