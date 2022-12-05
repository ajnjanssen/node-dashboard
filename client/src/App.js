import { ColorModeContext, useMode } from './theme'
import { CssBaseline, Switch, ThemeProvider } from '@mui/material'
import { Routes, Route, Router, PrivateRoute } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Topbar from './scenes/global/Topbar'
import Sidebar from './scenes/global/SidebarContainer'
import Dashboard from './scenes/dashboard/'
import Team from './scenes/team/'
import Login from './scenes/login'
import Signup from './scenes/signup'
import Invoices from './scenes/invoices/'
import Contacts from './scenes/contacts/'
import Bar from './scenes/bar/'
import Form from './scenes/form/'
import Line from './scenes/line/'
import Pie from './scenes/pie/'
import FAQ from './scenes/faq/'
import Geography from './scenes/geography/'
import Calendar from './scenes/calendar/'
import PrivateRoutes from './utils/PrivateRoutes'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './service/AuthContext'
import ForgotPassword from './scenes/forgot-password'
import Profile from './scenes/profile'

function App() {
    const SidebarLayout = () => (
        <>
            <div className="flex w-full">
                <div className="">
                    <Sidebar />
                </div>
                <div className="w-screen">
                    <Topbar />
                    <Outlet />
                </div>
            </div>
        </>
    )

    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <div className="app font-poppins">
            <main className="content">
                <AuthProvider>
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            <Route element={<SidebarLayout />}>
                                <Route
                                    index
                                    exact
                                    path="/"
                                    element={<Dashboard />}
                                />

                                <Route
                                    exact
                                    path="/profile"
                                    element={<Profile />}
                                />

                                <Route exact path="/team" element={<Team />} />
                                <Route
                                    exact
                                    path="/invoices"
                                    element={<Invoices />}
                                />
                                <Route
                                    exact
                                    path="/contacts"
                                    element={<Contacts />}
                                />
                                <Route exact path="/form" element={<Form />} />
                                <Route exact path="/faq" element={<FAQ />} />
                                <Route
                                    exact
                                    path="/calendar"
                                    element={<Calendar />}
                                />
                            </Route>
                        </Route>
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route
                            element={<ForgotPassword />}
                            path="/forgot-password"
                        />
                    </Routes>
                </AuthProvider>
            </main>
        </div>
    )
}

export default App

//    <ColorModeContext.Provider>
//  <ColorModeContext.Provider value={colorMode}>
//    <ThemeProvider>
//    <ThemeProvider theme={theme}>
// <CssBaseline />
