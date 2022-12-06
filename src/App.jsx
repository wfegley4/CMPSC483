import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blank from './pages/Blank'
import Dashboard from './pages/Dashboard'
import Group from './pages/Group'
import Students from './pages/Students'
import Stats from './pages/Stats'

import MainLayout from './layout/MainLayout'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="Home" element={<Blank />} />
                    <Route path="Group" element={<Group />} />
                    <Route path="Students" element={<Students />} />
                    <Route path="Stats" element={<Stats />} />
                    <Route path="Export" element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
