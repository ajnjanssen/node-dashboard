import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Topbar from './scenes/global/Topbar'
import Sidebar from './scenes/global/SidebarContainer'
import Dashboard from './scenes/dashboard/'
import Team from './scenes/team/'
import Login from './scenes/login'
import Invoices from './scenes/invoices/'
import Contacts from './scenes/contacts/'
import Bar from './scenes/bar/'
import Form from './scenes/form/'
import Line from './scenes/line/'
import Pie from './scenes/pie/'
import FAQ from './scenes/faq/'
import Geography from './scenes/geography/'
import Calendar from './scenes/calendar/'

function App() {
    return (
        //    <ColorModeContext.Provider>
        //  <ColorModeContext.Provider value={colorMode}>
        //    <ThemeProvider>
        //    <ThemeProvider theme={theme}>
        // <CssBaseline />
        <div className="app font-poppins">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/" element={<Dashboard />} />
                    <Route exact path="/team" element={<Team />} />
                    <Route exact path="/invoices" element={<Invoices />} />
                    <Route exact path="/contacts" element={<Contacts />} />
                    <Route exact path="/form" element={<Form />} />
                    <Route exact path="/faq" element={<FAQ />} />
                    <Route exact path="/calendar" element={<Calendar />} />
                    {/* <Route exact path="/bar" element={<Bar />} />
              <Route exact path="/line" element={<Line />} />
              <Route exact path="/pie" element={<Pie />} />
              <Route exact path="/geography" element={<Geography />} /> */}
                </Routes>
            </main>
        </div>
        //    </ThemeProvider>
        // </ColorModeContext.Provider>
    )
}

export default App
