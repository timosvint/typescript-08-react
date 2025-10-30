import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import { AppBar } from "./components/layout/layout";
import { lazy, useEffect } from "react"; 
import { RedirectRoute } from './components/RedirectRoute';
import { RoutePrivate } from './components/PrivateRoute';
import { useAppDispatch, useAppSelector } from './TypeScript-types/redux-types/hookis';
import { isRefreshingSelector, tokenSelector } from './redux/auth/authSelectors';
import { refresh } from './redux/auth/operations';

const HomePage = lazy(() => import('./page/HomePage/HomePage'))
const ContactPage = lazy(() => import('./page/ContactPage/ContactPage'))
const RegisterPage = lazy(() => import('./page/RegisterPage/RegisterPage'))
const LoginPage = lazy(() => import ('./page/LoginPage/LoginPage'))

const App = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(tokenSelector)
  const isRefreshing = useAppSelector(isRefreshingSelector)  
  useEffect(() => {
    if (token) {
      dispatch(refresh())
    }
  }, [dispatch, token])


  return isRefreshing ? <h1>refreshing User...</h1> : (

    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/contact" element={<RoutePrivate component={ContactPage} path="/login" />} ></Route>
          <Route path="/register" element={<RedirectRoute component={RegisterPage} path="/contact"/>}></Route>
          <Route path="/login" element={<RedirectRoute component={LoginPage} path="/contact"/> }></Route>
        </Route>
      </Routes>
  </div>
)

}

export default App 