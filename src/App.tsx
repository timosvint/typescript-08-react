import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import { AppBar } from "./components/layout/layout";
import { lazy } from "react"; 

const HomePage = lazy(() => import('./page/HomePage/HomePage'))
const ContactPage = lazy(() => import('./page/ContactPage/ContactPage'))
const RegisterPage = lazy(() => import('./page/RegisterPage/RegisterPage'))
const LoginPage = lazy(() => import ('./page/LoginPage/LoginPage'))

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/contact" element={<ContactPage />} ></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Route>
      </Routes>
  </div>
)

}

export default App 