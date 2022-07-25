import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import './App.css';
import Landing from './components/layout/Landing';
import Auth from "./views/Auth.js"
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import NavbarMenu from "./components/layout/NavbarMenu";
import About from "./views/About";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <Routes>
              <Route 
                path="/" 
                element={<Landing />}
              />
              <Route 
                path="/login" 
                element={<Auth authRoute="login" />} 
              />
              <Route 
                path="/register" 
                element={<Auth authRoute="register" />}
              />
              <Route
                path="/dashboard"
                element ={
                  <ProtectedRoute>
                    <NavbarMenu />
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/about"
                element ={
                  <ProtectedRoute>
                    <NavbarMenu />
                    <About />
                  </ProtectedRoute>
                }
              />

          </Routes>
        </BrowserRouter>
      </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App;
